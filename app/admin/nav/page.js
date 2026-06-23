import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function NavAdminPage() {
  const data = await getSection('nav');
  return <SectionForm section="nav" title="Navigation bar" data={data} />;
}
