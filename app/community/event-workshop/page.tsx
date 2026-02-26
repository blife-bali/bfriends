import PageHeader from "@/components/PageHeader/PageHeader";
import EventsContent from "./EventsContent";

const PAGE_HEADER = {
  breadcrumb: "Community / Event & Workshop",
  title: "Event & Workshop",
};

export default function EventWorkshopPage() {
  return (
    <>
      <PageHeader
        breadcrumb={PAGE_HEADER.breadcrumb}
        title={PAGE_HEADER.title}
        variant="noImage"
      />
      <main>
        <EventsContent />
      </main>
    </>
  );
}
