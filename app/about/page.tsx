import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Intro from "./philosophy/intro/Intro";
import BLifeEcosystem from "./philosophy/blife-ecosystem/BLifeEcosystem";
import ExpertsSection from "./philosophy/experts/Experts";
import { AboutFramework } from "@/components/AboutFramework";
import styles from "./philosophy/page.module.css";
import {
  getPageSeo,
  resolvePageHeader,
  getIntroByPage,
  getEcosystemItems,
} from "@/lib/cms";

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

const DEFAULT_HEADER = {
  title: "About BFriends",
  breadcrumb: "About / About BFriends",
  image: "/images/Integrate/DDK09278.jpg",
};

export default async function AboutPage() {
  const [header, intro, ecosystemItems] = await Promise.all([
    resolvePageHeader(["about", "philosophy"], DEFAULT_HEADER),
    getIntroByPage("home"),
    getEcosystemItems(),
  ]);

  return (
    <main className={styles.page}>
      <PageHeader
        title={header.title}
        breadcrumb={header.breadcrumb}
        image={header.image}
        subtitle={header.description ?? undefined}
        cta={{ label: "Explore Programmes", href: "/programs" }}
      />
      <Intro
        headline={intro?.headline}
        body={intro?.body}
        imageUrl={intro?.image_url}
        showCta={false}
        showCopy={false}
      />
      <ExpertsSection
        description={[
          "Behind every recommendation is a team of experienced professionals dedicated to helping individuals make meaningful and sustainable progress.",
          "Through expert interpretation, personalized guidance and ongoing support, wellness becomes more than a routine — it becomes a journey built around you.",
        ]}
        ctaLabel="Explore Our Programmes"
        ctaHref="/about/facilities"
      />
      <AboutFramework />
      <BLifeEcosystem items={ecosystemItems} />
    </main>
  );
}
