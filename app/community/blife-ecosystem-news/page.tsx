import type { Metadata } from "next";
import JournalPageHeader from "@/components/JournalPageHeader/JournalPageHeader";
import NewsContent from "./NewsContent";
import { getPageSeo, getNews, getPageHeader } from "@/lib/cms";
import { pickLatestJournalItem } from "@/lib/journal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blife-ecosystem-news");
  return {
    title: seo.seo_title || "BLife Ecosystem News | BFriends",
    description: seo.seo_description || "Latest news, updates, and stories from BFriends and the BLife ecosystem — partnerships, new treatments, and member spotlights.",
  };
}

export default async function BLifeEcosystemNewsPage() {
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
