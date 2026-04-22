import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import NewsContent from "./NewsContent";
import { getPageSeo, getNews, getPageHeader } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blife-ecosystem-news");
  return {
    title: seo.seo_title || "BLife Ecosystem News | BFriends",
    description: seo.seo_description || "Latest news, updates, and stories from BFriends and the BLife ecosystem — partnerships, new treatments, and member spotlights.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "Community / BLife Ecosystem News",
  title: "BLife Ecosystem News",
};

export default async function BLifeEcosystemNewsPage() {
  const [news, pageHeader] = await Promise.all([
    getNews(),
    getPageHeader("blife-ecosystem-news"),
  ]);

  return (
    <>
      <PageHeader
        breadcrumb={pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb}
        title={pageHeader?.title || DEFAULT_HEADER.title}
        variant="noImage"
      />
      <main>
        <NewsContent initialNews={news} />
      </main>
    </>
  );
}
