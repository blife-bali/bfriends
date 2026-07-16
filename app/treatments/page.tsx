import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Treatments from "./Treatments";
import styles from "./Treatments.module.css";
import { getTreatments, getTreatmentsPage } from "@/lib/supabase-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTreatmentsPage();
  return {
    title: page.seo_title,
    description: page.seo_description,
  };
}

export default async function TreatmentsPage() {
  const [page, treatments] = await Promise.all([getTreatmentsPage(), getTreatments()]);

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={page.breadcrumb}
        title={page.header_title}
        image={page.header_image}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="treatments-intro-title">
          <p className={styles.introEyebrow}>{page.breadcrumb.split("/").pop()?.trim()}</p>
          <h2 id="treatments-intro-title" className={styles.introTitle}>
            {page.intro_title}
          </h2>
          <p className={styles.introSub}>{page.intro_body}</p>
        </section>
        <Treatments treatments={treatments} />
      </div>
    </main>
  );
}
