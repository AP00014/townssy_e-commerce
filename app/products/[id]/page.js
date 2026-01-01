import { fetchProductById, fetchAllProductIds } from "../../utils/fetchHomeProducts";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const productIds = await fetchAllProductIds();
    return productIds.map((id) => ({ id: id.toString() }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  
  try {
    const product = await fetchProductById(id);

    if (!product) {
      notFound();
    }

    // Determine if product was created by admin (no vendor_id)
    const isAdminCreated = !product.vendor_id;
    const vendorInfo = product.vendor;
    const adminInfo = product.admin_creator;

    // Transform product data to match ProductDetailClient format
    const transformedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      comparePrice: product.compare_price ? parseFloat(product.compare_price) : null,
      images: product.images && Array.isArray(product.images) ? product.images : [],
      location: product.location,
      region: product.region,
      delivery: product.delivery,
      deliveryOptions: product.delivery_options,
      supplierWhatsapp: product.supplier_whatsapp,
      supplierType: product.supplier_type,
      specifications: product.specifications || {},
      stockQuantity: product.stock_quantity || 0,
      sku: product.sku,
      category: product.category,
      vendor: vendorInfo,
      adminCreator: adminInfo,
      isAdminCreated: isAdminCreated,
      vendorId: product.vendor_id,
      vendorName: product.vendor_name, // Vendor name from products table
      adminName: product.admin_name, // Admin name from products table
      isFeatured: product.is_featured,
      viewCount: product.view_count || 0,
      salesCount: product.sales_count || 0,
      createdAt: product.created_at
    };

    return <ProductDetailClient product={transformedProduct} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
