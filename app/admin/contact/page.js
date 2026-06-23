import { getSection } from '@/lib/db';
import SectionForm from '../SectionForm';

export const dynamic = 'force-dynamic';

export default async function ContactAdminPage() {
  const data = await getSection('contact');
  return <SectionForm section="contact" title="Contact / CTA section" data={data} />;
}
