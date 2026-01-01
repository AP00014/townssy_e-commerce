-- =====================================================
-- FIX PRODUCT AUDIT TRIGGER
-- Removes reference to non-existent "status" field on products table
-- =====================================================

-- Drop the existing trigger
DROP TRIGGER IF EXISTS audit_product_changes ON products;

-- Recreate the function without status field reference for products
CREATE OR REPLACE FUNCTION public.log_important_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if significant fields changed
  IF TG_OP = 'UPDATE' THEN
    -- For products table, only check verification_status and is_active (no status field)
    IF TG_TABLE_NAME = 'products' THEN
      IF (
        OLD.verification_status IS DISTINCT FROM NEW.verification_status OR
        OLD.is_active IS DISTINCT FROM NEW.is_active
      ) THEN
        INSERT INTO audit_logs (user_id, action, entity_type, entity_id, changes)
        VALUES (
          auth.uid(),
          TG_OP,
          TG_TABLE_NAME,
          NEW.id,
          jsonb_build_object(
            'old', jsonb_build_object(
              'verification_status', OLD.verification_status,
              'is_active', OLD.is_active
            ),
            'new', jsonb_build_object(
              'verification_status', NEW.verification_status,
              'is_active', NEW.is_active
            )
          )
        );
      END IF;
    -- For other tables (vendors, orders), check status field
    ELSE
      IF (
        OLD.verification_status IS DISTINCT FROM NEW.verification_status OR
        OLD.is_active IS DISTINCT FROM NEW.is_active OR
        (TG_TABLE_NAME IN ('vendors', 'orders') AND OLD.status IS DISTINCT FROM NEW.status)
      ) THEN
        INSERT INTO audit_logs (user_id, action, entity_type, entity_id, changes)
        VALUES (
          auth.uid(),
          TG_OP,
          TG_TABLE_NAME,
          NEW.id,
          jsonb_build_object(
            'old', jsonb_build_object(
              'verification_status', OLD.verification_status,
              'is_active', OLD.is_active,
              'status', CASE 
                WHEN TG_TABLE_NAME IN ('vendors', 'orders') 
                THEN OLD.status 
                ELSE NULL 
              END
            ),
            'new', jsonb_build_object(
              'verification_status', NEW.verification_status,
              'is_active', NEW.is_active,
              'status', CASE 
                WHEN TG_TABLE_NAME IN ('vendors', 'orders') 
                THEN NEW.status 
                ELSE NULL 
              END
            )
          )
        );
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger for products
CREATE TRIGGER audit_product_changes 
  AFTER UPDATE ON products
  FOR EACH ROW 
  EXECUTE FUNCTION public.log_important_changes();

-- Verify the trigger was created
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'products'
  AND trigger_name = 'audit_product_changes';
