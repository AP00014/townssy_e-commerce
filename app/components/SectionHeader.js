'use client';

export default function SectionHeader({ title, showViewAll = true, onViewAll }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {showViewAll && (
        <div className="view-all-link" onClick={onViewAll}>
          View All →
        </div>
      )}
    </div>
  );
}

