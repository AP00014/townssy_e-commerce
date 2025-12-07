import UserDetailsPageClient from './UserDetailsPageClient';

// Static params generation for static export
export async function generateStaticParams() {
  return [];
}

export default function UserDetailsPage() {
  return <UserDetailsPageClient />;
}