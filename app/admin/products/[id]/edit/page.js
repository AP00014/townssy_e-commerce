import EditProductPageClient from './EditProductPageClient';

// Static params generation for static export
export async function generateStaticParams() {
  return [];
}

export default function EditProductPage() {
  return <EditProductPageClient />;
}