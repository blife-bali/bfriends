import type { Metadata } from "next";
import IntroHeader from "./intro-header/IntroHeader";
import ThreePillars from "./three-pillars/ThreePillars";
import styles from "./page.module.css";
import { getPageSeo } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("philosophy");
  return {
    title: seo.seo_title || "About BFriends | BFriends",
    description:
      seo.seo_description ||
      "We believe wellness is not a destination but a continuous practice. Explore the BFriends approach of precision, care, and community.",
  };
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <IntroHeader />
        <ThreePillars />
      </div>
    </main>
  );
}
