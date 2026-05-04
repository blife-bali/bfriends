import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import EventsContent from "./EventsContent";
import { getPageSeo, getEvents, getPageHeader } from "@/lib/cms";
import { pickLatestJournalItem } from "@/lib/journal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("event-workshop");
  return {
    title: seo.seo_title || "Events & Workshops | BFriends",
    description: seo.seo_description || "Join wellness workshops, retreats, sound baths, and community events at BFriends Kerobokan, Bali.",
  };
}

export default async function EventWorkshopPage() {
  const [events, pageHeader] = await Promise.all([
    getEvents(),
    getPageHeader("event-workshop"),
  ]);

  const featured = pickLatestJournalItem(events);

  return (
    <>
      <JournalPageHeader kind="events" featured={featured} headerImage={pageHeader?.image} />
      <main>
        <EventsContent initialEvents={events} />
      </main>
    </>
  );
}
