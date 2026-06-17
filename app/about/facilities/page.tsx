import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Facilities from "./Facilities";
import styles from "./Facilities.module.css";
import { mockFacilities, mockFacilitiesPage } from "@/mock/facilities";

export const metadata: Metadata = {
  title: mockFacilitiesPage.seo_title,
  description: mockFacilitiesPage.seo_description,
};

export default function FacilitiesPage() {
  const facilities = [...mockFacilities].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={mockFacilitiesPage.breadcrumb}
        title={mockFacilitiesPage.header_title}
        image={mockFacilitiesPage.header_image}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="facilities-intro-title">
          <p className={styles.introEyebrow}>{mockFacilitiesPage.breadcrumb.split("/").pop()?.trim()}</p>
          <h2 id="facilities-intro-title" className={styles.introTitle}>
            {mockFacilitiesPage.intro_title}
          </h2>
          <p className={styles.introSub}>{mockFacilitiesPage.intro_body}</p>
        </section>
        <Facilities facilities={facilities} />
      </div>
    </main>
  );
}
