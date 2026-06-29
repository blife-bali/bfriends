import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Treatments from "./Treatments";
import styles from "./Treatments.module.css";
import { mockTreatments, mockTreatmentsPage } from "@/mock/treatments";

export const metadata: Metadata = {
  title: mockTreatmentsPage.seo_title,
  description: mockTreatmentsPage.seo_description,
};

export default function TreatmentsPage() {
  const treatments = [...mockTreatments].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={mockTreatmentsPage.breadcrumb}
        title={mockTreatmentsPage.header_title}
        image={mockTreatmentsPage.header_image}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="treatments-intro-title">
          <p className={styles.introEyebrow}>{mockTreatmentsPage.breadcrumb.split("/").pop()?.trim()}</p>
          <h2 id="treatments-intro-title" className={styles.introTitle}>
            {mockTreatmentsPage.intro_title}
          </h2>
          <p className={styles.introSub}>{mockTreatmentsPage.intro_body}</p>
        </section>
        <Treatments treatments={treatments} />
      </div>
    </main>
  );
}
