import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import CharmContent from "./CharmContent";
import styles from "./Charm.module.css";
import { getPageSeo, getCharmTiers, getCharmUsage, getPageHeader } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("charm");
  return {
    title: seo.seo_title || "Charm Credits | BFriends Membership",
    description: seo.seo_description || "Flexible wellness credits for treatments, classes, and services across the BFriends and BLife ecosystem.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "Membership / The Charm",
  title: "Charm Credits",
  image: "/images/hero-test.png",
};

export default async function CharmPage() {
  const [tiers, usageItems, pageHeader] = await Promise.all([
    getCharmTiers(),
    getCharmUsage(),
    getPageHeader("charm"),
  ]);

  return (
    <>
      <PageHeader
        breadcrumb={pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb}
        title={pageHeader?.title || DEFAULT_HEADER.title}
        image={pageHeader?.image || DEFAULT_HEADER.image}
      />
      <main className={styles.page}>
        <CharmContent
          tiers={tiers.length > 0 ? tiers : undefined}
          usageItems={usageItems.length > 0 ? usageItems : undefined}
        />
      </main>
    </>
  );
}
