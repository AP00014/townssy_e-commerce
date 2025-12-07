import TaskDetailsPageClient from './TaskDetailsPageClient';

// Static params generation for static export
export async function generateStaticParams() {
  return [];
}

export default function TaskDetailsPage() {
  return <TaskDetailsPageClient />;
}