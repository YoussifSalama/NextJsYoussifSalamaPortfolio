import { notFound } from 'next/navigation';
import { getProject } from '@/lib/db';
import ProjectForm from '../../ProjectForm';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound();
  return <ProjectForm mode="edit" project={project} />;
}
