import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import EventsContent from "./EventsContent";
import { getPageSeo, getEvents, getPageHeader, getPublicPrograms } from "@/lib/cms";
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
  const [events, pageHeader, publicPrograms] = await Promise.all([
    getEvents(),
    getPageHeader("event-workshop"),
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
      <JournalPageHeader kind="events" featured={featured} headerImage={pageHeader?.image} overrideTitle={pageHeader?.title} overrideDescription={(pageHeader as any)?.description} />
      <main>
        <EventsContent initialEvents={events} />
      </main>
      <AboutServicesSection programs={programs} />
    </>
  );
}
