import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function SeoAdminPage() {
  const data = await getSection('seo');
  return <SectionForm section="seo" title="SEO & metadata" data={data} imageFields={['ogImage']} />;
}
