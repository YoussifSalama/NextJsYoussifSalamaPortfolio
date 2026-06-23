import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function HeroAdminPage() {
  const data = await getSection('hero');
  return <SectionForm section="hero" title="Hero section" data={data} imageFields={['photo']} />;
}
