import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyPartners from "./JourneyPartners";
import styles from "./JourneyPartners.module.css";
import { getJourneyPartnersPage } from "@/lib/supabase-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getJourneyPartnersPage();
  return {
    title: page.seo_title,
    description: page.seo_description,
  };
}

export default async function JourneyPartnersPage() {
  const page = await getJourneyPartnersPage();

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={page.breadcrumb}
        title={page.hero_title}
        subtitle={page.hero_description}
        image={page.header_image}
      />
      <div className={styles.container}>
        <JourneyPartners teams={page.teams} />
      </div>
    </main>
  );
}
