import OrderDetailsPageClient from './OrderDetailsPageClient';

// Static params generation for static export
export async function generateStaticParams() {
  return [];
}

export default function OrderDetailsPage() {
  return <OrderDetailsPageClient />;
}