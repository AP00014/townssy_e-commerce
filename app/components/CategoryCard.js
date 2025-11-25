'use client';

export default function CategoryCard({ image, label }) {
  return (
    <div className="category-card">
      <div className="category-image-wrapper">
        <img
          src={image}
          alt={label}
          className="category-image"
        />
      </div>
      <div className="category-label">{label}</div>
    </div>
  );
}

