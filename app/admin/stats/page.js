import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function StatsAdminPage() {
  const data = await getSection('stats');
  return <SectionForm section="stats" title="Stats / counters" data={data} />;
}
