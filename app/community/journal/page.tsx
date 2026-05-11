import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import NewsContent from "./NewsContent";
import { getPageSeo, getNews, getPageHeader, getPublicPrograms } from "@/lib/cms";
import { pickLatestJournalItem } from "@/lib/journal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blife-ecosystem-news");
  return {
    title: seo.seo_title || "BFriends Journal | BFriends",
    description: seo.seo_description || "Stories, rituals, movement, and meaningful experiences from the BFriends community — launches, collaborations, and member spotlights.",
  };
}

export default async function JournalListingPage() {
  const [news, pageHeader, publicPrograms] = await Promise.all([
    getNews(),
    getPageHeader("blife-ecosystem-news"),
    getPublicPrograms(),
  ]);

  const featured = pickLatestJournalItem(news);
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
      <JournalPageHeader kind="news" featured={featured} headerImage={pageHeader?.image} overrideTitle={pageHeader?.title} overrideDescription={(pageHeader as any)?.description} />
      <main>
        <NewsContent initialNews={news} />
      </main>
      <AboutServicesSection programs={programs} />
    </>
  );
}
