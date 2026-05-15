import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import EventsContent from "./EventsContent";
import { getPageSeo, getEvents, resolvePageHeader, getPublicPrograms } from "@/lib/cms";
import { pickLatestJournalItem } from "@/lib/journal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("event-workshop");
  return {
    title: seo.seo_title || "Events & Workshops | BFriends",
    description: seo.seo_description || "Join wellness workshops, retreats, sound baths, and community events at BFriends Kerobokan, Bali.",
  };
}

const DEFAULT_HEADER = {
  title: "Event and Workshop",
  breadcrumb: "Community / Events",
  image: "/images/community/events.jpg",
};

export default async function EventWorkshopPage() {
  const [events, header, publicPrograms] = await Promise.all([
    getEvents(),
    resolvePageHeader("event-workshop", DEFAULT_HEADER),
    getPublicPrograms(),
  ]);

  const featured = pickLatestJournalItem(events);
  const programs = publicPrograms.map((program) => ({
    name: program.general.name,
    title: program.general.title || program.general.name,
    subheading: program.general.subheading,
    image: program.general.image,
    buttonLabel: program.general.button_label,
    slug: program.general.slug,
  }));

  return (
    <>
      <JournalPageHeader kind="events" featured={featured} headerImage={header.image} overrideTitle={header.title} overrideDescription={header.description} />
      <main>
        <EventsContent initialEvents={events} />
      </main>
      <AboutServicesSection programs={programs} />
    </>
  );
}
