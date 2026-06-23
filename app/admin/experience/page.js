import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function ExperienceAdminPage() {
  const data = await getSection('experience');
  return <SectionForm section="experience" title="Experience timeline" data={data} />;
}
