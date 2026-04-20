import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import EventsContent from "./EventsContent";
import { getPageSeo, getEvents, getPageHeader } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("event-workshop");
  return {
    title: seo.seo_title || "Events & Workshops | BFriends",
    description: seo.seo_description || "Join wellness workshops, retreats, sound baths, and community events at BFriends Kerobokan, Bali.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "Community / Event & Workshop",
  title: "Event & Workshop",
};

export default async function EventWorkshopPage() {
  const [events, pageHeader] = await Promise.all([
    getEvents(),
    getPageHeader("event-workshop"),
  ]);

  return (
    <>
      <PageHeader
        breadcrumb={pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb}
        title={pageHeader?.title || DEFAULT_HEADER.title}
        variant="noImage"
      />
      <main>
        <EventsContent initialEvents={events} />
      </main>
    </>
  );
}
