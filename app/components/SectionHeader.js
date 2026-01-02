"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Star, 
  TrendingUp, 
  Zap, 
  Award, 
  Flame,
  Gift,
  ShoppingBag,
  Heart,
  Crown,
  Rocket,
  Gem
} from "lucide-react";

// Icon mapping for different section types
const getSectionIcon = (title) => {
  const titleLower = title?.toLowerCase() || '';
  
  // Hot products should have fire icon - check this first
  if (titleLower.includes('hot') || titleLower.includes('hot product')) {
    return <Flame className="section-icon" />;
  }
  if (titleLower.includes('featured') || titleLower.includes('popular')) {
    return <Star className="section-icon" />;
  }
  if (titleLower.includes('new') || titleLower.includes('arrival')) {
    return <Sparkles className="section-icon" />;
  }
  if (titleLower.includes('trending')) {
    return <TrendingUp className="section-icon" />;
  }
  if (titleLower.includes('deal') || titleLower.includes('sale')) {
    return <Zap className="section-icon" />;
  }
  if (titleLower.includes('best') || titleLower.includes('selling')) {
    return <Award className="section-icon" />;
  }
  if (titleLower.includes('top') || titleLower.includes('ranking')) {
    return <Crown className="section-icon" />;
  }
  if (titleLower.includes('luxury') || titleLower.includes('premium')) {
    return <Gem className="section-icon" />;
  }
  if (titleLower.includes('gift') || titleLower.includes('special')) {
    return <Gift className="section-icon" />;
  }
  if (titleLower.includes('favorite') || titleLower.includes('loved')) {
    return <Heart className="section-icon" />;
  }
  if (titleLower.includes('flash') || titleLower.includes('limited')) {
    return <Flame className="section-icon" />;
  }
  if (titleLower.includes('collection') || titleLower.includes('shop')) {
    return <ShoppingBag className="section-icon" />;
  }
  
  // Default icon
  return <Rocket className="section-icon" />;
};

export default function SectionHeader({
  title,
  showViewAll = true,
  onViewAll,
  href,
  viewAllHref,
  icon,
}) {
  const sectionIcon = icon || getSectionIcon(title);
  const isHotSection = title?.toLowerCase().includes('hot');
  
  const titleElement = href ? (
    <Link href={href} className="section-title-link">
      <div className="section-title-wrapper">
        <div className={`section-icon-container ${isHotSection ? 'fire-icon-container' : ''}`}>
          {sectionIcon}
        </div>
        <h2 className="section-title">{title}</h2>
      </div>
    </Link>
  ) : (
    <div className="section-title-wrapper">
      <div className={`section-icon-container ${isHotSection ? 'fire-icon-container' : ''}`}>
        {sectionIcon}
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
  );

  // Use viewAllHref if provided, otherwise fall back to onViewAll
  const viewAllElement = showViewAll && (viewAllHref ? (
    <Link href={viewAllHref} className="view-all-link">
      View All <span>→</span>
    </Link>
  ) : onViewAll ? (
    <div className="view-all-link" onClick={onViewAll}>
      View All <span>→</span>
    </div>
  ) : null);

  return (
    <div className="section-header">
      {titleElement}
      {viewAllElement}
    </div>
  );
}
