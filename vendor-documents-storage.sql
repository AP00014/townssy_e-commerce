-- Create storage bucket for vendor documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('vendor-documents', 'vendor-documents', false);

-- Set up RLS policies for vendor documents bucket
CREATE POLICY "Vendors can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'vendor-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Vendors can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'vendor-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all vendor documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'vendor-documents'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- Allow public access to view documents (for admin review)
CREATE POLICY "Public read access for vendor documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'vendor-documents');