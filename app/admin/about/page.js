import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function AboutAdminPage() {
  const data = await getSection('about');
  return <SectionForm section="about" title="About section" data={data} />;
}
