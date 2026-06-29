import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyPartners from "./JourneyPartners";
import styles from "./JourneyPartners.module.css";
import { mockJourneyPartnersPage } from "@/mock/journey-partners";

export const metadata: Metadata = {
  title: mockJourneyPartnersPage.seo_title,
  description: mockJourneyPartnersPage.seo_description,
};

export default function JourneyPartnersPage() {
  const page = mockJourneyPartnersPage;

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
