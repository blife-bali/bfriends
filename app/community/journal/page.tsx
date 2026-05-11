import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import NewsContent from "./NewsContent";
import { getPageSeo, getNews, getPageHeader } from "@/lib/cms";
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
  const [news, pageHeader] = await Promise.all([
    getNews(),
    getPageHeader("blife-ecosystem-news"),
  ]);

  const featured = pickLatestJournalItem(news);

  return (
    <>
      <JournalPageHeader kind="news" featured={featured} headerImage={pageHeader?.image} overrideTitle={pageHeader?.title} overrideDescription={(pageHeader as any)?.description} />
      <main>
        <NewsContent initialNews={news} />
      </main>
    </>
  );
}
