import PageHeader from "@/components/PageHeader/PageHeader";
import NewsContent from "./NewsContent";

const PAGE_HEADER = {
  breadcrumb: "Community / BLife Ecosystem News",
  title: "BLife Ecosystem News",
};

export default function BLifeEcosystemNewsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={PAGE_HEADER.breadcrumb}
        title={PAGE_HEADER.title}
        variant="noImage"
      />
      <main>
        <NewsContent />
      </main>
    </>
  );
}
