import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function SkillsAdminPage() {
  const data = await getSection('skills');
  return <SectionForm section="skills" title="Skills / stack" data={data} />;
}
