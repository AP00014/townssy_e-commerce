import { redirect } from 'next/navigation';

export default function AdminProductsIndexPage() {
  // Redirect to home page if someone tries to access /admin-products/ without an ID
  redirect('/');
}

