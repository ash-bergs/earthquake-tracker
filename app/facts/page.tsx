import FactsPageContent from '../components/FactsPageContent';

export const revalidate = 900; // revalidate every 15 minutes

export default async function FactsPage() {
  return (
    <div className="relative">
      <FactsPageContent />
    </div>
  );
}
