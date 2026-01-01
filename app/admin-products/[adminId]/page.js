import { fetchProductsByAdminId } from '../../utils/fetchProductsByAdminId';
import { fetchAdminProfile } from '../../utils/fetchAdminProfile';
import AdminProductsClient from './AdminProductsClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // For now, return empty array - we can enhance this later
  return [];
}

export default async function AdminProductsPage({ params }) {
  const { adminId } = await params;
  
  try {
    const [admin, products] = await Promise.all([
      fetchAdminProfile(adminId),
      fetchProductsByAdminId(adminId)
    ]);

    if (!admin) {
      notFound();
    }

    return <AdminProductsClient admin={admin} initialProducts={products} />;
  } catch (error) {
    console.error('Error fetching admin products:', error);
    notFound();
  }
}

