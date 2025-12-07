import {
  tailoredSelections,
  featuredProducts,
  newArrivals,
  hotProducts,
  topRated,
  bestSelling,
  luxuryProducts,
  ecoProducts,
  travelEssentials,
  securityProducts,
  topDeals,
  gridProducts,
} from "../../data/products";
import CategoryClient from "./CategoryClient";

export async function generateStaticParams() {
  return tailoredSelections.map((selection) => ({
    slug: selection.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // Find the category
  const category = tailoredSelections.find((s) => s.slug === slug);

  if (!category) {
    return <div>Category not found</div>;
  }

  // Get all products
  const allProducts = [
    ...featuredProducts,
    ...newArrivals,
    ...hotProducts,
    ...topRated,
    ...bestSelling,
    ...luxuryProducts,
    ...ecoProducts,
    ...travelEssentials,
    ...securityProducts,
    ...topDeals,
    ...gridProducts,
  ];

  // Filter products by category
  const categoryProducts = allProducts.filter((product) => {
    // Match by category or tags
    if (product.category === category.category) return true;
    if (
      product.tags &&
      product.tags.some(
        (tag) =>
          category.label.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(category.label.toLowerCase())
      )
    )
      return true;
    return false;
  });

  return <CategoryClient category={category} products={categoryProducts} />;
}
