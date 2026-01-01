import { fetchProductsBySupplierType } from '../../utils/fetchProductsBySupplierType';
import SupplierTypeClient from './SupplierTypeClient';

export async function generateStaticParams() {
  return [
    { type: 'supplier' },
    { type: 'manufacturer' }
  ];
}

export default async function SupplierTypePage({ params }) {
  const { type } = await params;

  // Validate type
  if (type !== 'supplier' && type !== 'manufacturer') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Invalid Supplier Type</h1>
        <p>The requested supplier type does not exist.</p>
      </div>
    );
  }

  // Fetch products for this supplier type
  const { products, total } = await fetchProductsBySupplierType(type, 50, 0);

  const title = type === 'supplier' ? 'Suppliers' : 'Manufacturers';
  const description = type === 'supplier' 
    ? 'Browse products from suppliers and distributors'
    : 'Browse products directly from manufacturers';

  return (
    <SupplierTypeClient 
      type={type}
      title={title}
      description={description}
      initialProducts={products}
      totalProducts={total}
    />
  );
}

