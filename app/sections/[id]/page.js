import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import SectionDetailClient from './SectionDetailClient';
import { fetchProductsForSectionById } from '../../utils/fetchSectionProducts';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const { data: section } = await supabase
      .from('home_sections')
      .select('display_name, description')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (!section) {
      return {
        title: 'Section Not Found',
      };
    }

    return {
      title: `${section.display_name || 'Section'} - Townssy`,
      description: section.description || `Browse all products in ${section.display_name || 'this section'}`,
    };
  } catch (error) {
    return {
      title: 'Section - Townssy',
    };
  }
}

export default async function SectionDetailPage({ params }) {
  const { id } = await params;

  try {
    // Fetch section details
    const { data: section, error: sectionError } = await supabase
      .from('home_sections')
      .select('id, name, display_name, description, section_type, is_active')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (sectionError || !section) {
      notFound();
    }

    // Fetch all products for this section (no limit - pass null to get all)
    const products = await fetchProductsForSectionById(id, null); // null = fetch all products

    return (
      <SectionDetailClient 
        section={section} 
        products={products}
      />
    );
  } catch (error) {
    console.error('Error fetching section:', error);
    notFound();
  }
}

