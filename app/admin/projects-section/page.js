import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function ProjectsSectionAdminPage() {
  const data = await getSection('projectsSection');
  return <SectionForm section="projectsSection" title="Projects section heading" data={data} />;
}
