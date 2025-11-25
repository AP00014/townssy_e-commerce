import { getProductDetails } from '../../data/products';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  // Generate all possible product IDs from 1 to 34 based on the data
  const ids = [];
  for (let i = 1; i <= 34; i++) {
    ids.push({ id: i.toString() });
  }
  return ids;
}

export default function ProductDetailPage({ params }) {
  const product = getProductDetails(params.id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <button onClick={() => window.history.back()} style={{ marginTop: '20px', padding: '12px 24px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

