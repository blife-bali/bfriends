import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Programs from "./Programs";
import styles from "./Programs.module.css";
import { getPublicPrograms } from "@/lib/cms";

export const dynamic = "force-dynamic";

const HEADLINE = "Find The Programme That Fits You";
const SUPPORTING_COPY =
  "Every wellness journey is unique. Whether you're looking to recover, improve mobility, build healthier habits, or invest in self-care, our programmes are designed to support your individual goals through personalised experiences and expert guidance.";
const HEADER_IMAGE_FALLBACK = "/images/programs/D.webp";

export const metadata: Metadata = {
  title: "Programmes | BFriends",
  description:
    "Introduce the BFriends programme ecosystem and find the wellness outcome you are looking for.",
};

export default async function ProgramsPage() {
  const programs = await getPublicPrograms();
  const headerImage = programs[0]?.general.image || HEADER_IMAGE_FALLBACK;

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb="Programmes"
        title={HEADLINE}
        image={headerImage}
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="programs-intro-title">
          <p className={styles.introEyebrow}>Programmes</p>
          <h2 id="programs-intro-title" className={styles.introTitle}>
            Wellness Designed Around Your Goals
          </h2>
          <p className={styles.introSub}>{SUPPORTING_COPY}</p>
        </section>
        <Programs programs={programs} />
      </div>
    </main>
  );
}
