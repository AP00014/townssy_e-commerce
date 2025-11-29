"use client";

import Link from "next/link";

export default function SectionHeader({
  title,
  showViewAll = true,
  onViewAll,
  href,
}) {
  const titleElement = href ? (
    <Link href={href} className="section-title-link">
      <h2 className="section-title">{title}</h2>
    </Link>
  ) : (
    <h2 className="section-title">{title}</h2>
  );

  return (
    <div className="section-header">
      {titleElement}
      {showViewAll && (
        <div className="view-all-link" onClick={onViewAll}>
          View All →
        </div>
      )}
    </div>
  );
}
