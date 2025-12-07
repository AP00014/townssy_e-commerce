import {
  getProductDetails,
  featuredProducts,
  topProducts,
  accessories,
  newArrivals,
  hotProducts,
  topRated,
  bestSelling,
  luxuryProducts,
  ecoProducts,
  travelEssentials,
  securityProducts,
  topDeals,
  topRanking,
  gridProducts,
} from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const allProducts = [
    ...featuredProducts,
    ...topProducts,
    ...accessories,
    ...newArrivals,
    ...hotProducts,
    ...topRated,
    ...bestSelling,
    ...luxuryProducts,
    ...ecoProducts,
    ...travelEssentials,
    ...securityProducts,
    ...topDeals,
    ...topRanking,
    ...gridProducts,
  ];
  const uniqueIds = [...new Set(allProducts.map((p) => p.id))];
  return uniqueIds.map((id) => ({ id: id.toString() }));
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductDetails(id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <h2>Product not found</h2>
          <button
            onClick={() => window.history.back()}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              background: "var(--primary-color)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
