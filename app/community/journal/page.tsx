import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import NewsContent from "./NewsContent";
import { getPageSeo, getNews, resolvePageHeader, getPublicPrograms } from "@/lib/cms";
import { pickLatestJournalItem } from "@/lib/journal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blife-ecosystem-news");
  return {
    title: seo.seo_title || "BFriends Journal | BFriends",
    description: seo.seo_description || "Stories, rituals, movement, and meaningful experiences from the BFriends community — launches, collaborations, and member spotlights.",
  };
}

const DEFAULT_HEADER = {
  title: "BFriends Journal",
  breadcrumb: "Community / Journal",
  image: "/images/community/news.jpg",
};

export default async function JournalListingPage() {
  const [news, header, publicPrograms] = await Promise.all([
    getNews(),
    resolvePageHeader("blife-ecosystem-news", DEFAULT_HEADER),
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
      <JournalPageHeader kind="news" featured={featured} headerImage={header.image} overrideTitle={header.title} overrideDescription={header.description} />
      <main>
        <NewsContent initialNews={news} />
      </main>
      <AboutServicesSection programs={programs} />
    </>
  );
}
