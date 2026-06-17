import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Staff from "./Staff";
import styles from "./Staff.module.css";
import { getStaffSorted } from "@/lib/staff";
import { mockStaffPage } from "@/mock/staff";

export const metadata: Metadata = {
  title: mockStaffPage.seo_title,
  description: mockStaffPage.seo_description,
};

export default function StaffPage() {
  const members = getStaffSorted();

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={mockStaffPage.breadcrumb}
        title={mockStaffPage.header_title}
        image={mockStaffPage.header_image}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="staff-intro-title">
          <h2 id="staff-intro-title" className={styles.introTitle}>
            {mockStaffPage.intro_title}
          </h2>
          <p className={styles.introSub}>{mockStaffPage.intro_body}</p>
        </section>
        <Staff members={members} />
      </div>
    </main>
  );
}
