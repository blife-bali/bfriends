import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Manifesto from "./manifesto/Manifesto";
import CoreBeliefs from "./core-beliefs/CoreBeliefs";
import IntegratedSelf from "./integrated-self/IntegratedSelf";
import BLifeEcosystem from "./blife-ecosystem/BLifeEcosystem";
import styles from "./page.module.css";
import Intro from "@/app/home/intro/Intro";
import WhyBFriends from "@/app/home/why-bfriends/WhyBFriends";
import {
  getPageSeo,
  getPageHeader,
  getIntroByPage,
  getWhyCards,
  getPhilosophySectionByKey,
  getCoreBeliefs,
  getEcosystemItems,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("philosophy");
  return {
    title: seo.seo_title || "Our Philosophy | BFriends",
    description: seo.seo_description || "We believe wellness is not a destination but a continuous practice. Explore the BFriends philosophy of precision, care, and community.",
  };
}

const DEFAULT_HEADER = {
  title: "The Philosophy of Return",
  breadcrumb: "About / Philosophy",
  image: "/images/Integrate/DDK09278.jpg",
};

export default async function PhilosophyPage() {
  const [pageHeader, intro, whyCards, manifesto, integratedSelf, coreBeliefs, ecosystemItems] = await Promise.all([
    getPageHeader("philosophy"),
    getIntroByPage("home"),
    getWhyCards(true),
    getPhilosophySectionByKey("manifesto"),
    getPhilosophySectionByKey("integrated_self"),
    getCoreBeliefs(),
    getEcosystemItems(),
  ]);

  const header = {
    title: pageHeader?.title || DEFAULT_HEADER.title,
    breadcrumb: pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb,
    image: pageHeader?.image || DEFAULT_HEADER.image,
  };

  return (
    <main className={styles.page}>
      <PageHeader
        title={header.title}
        breadcrumb={header.breadcrumb}
        image={header.image}
      />
      <Intro
        headline={intro?.headline}
        body={intro?.body}
        imageUrl={intro?.image_url}
        showCta={false}
      />
      <WhyBFriends cards={whyCards} />
      <Manifesto
        headline={manifesto?.headline}
        body={manifesto?.body}
      />
      <CoreBeliefs beliefs={coreBeliefs} />
      <IntegratedSelf
        headline={integratedSelf?.headline}
        body={integratedSelf?.body}
        image={integratedSelf?.image}
      />
      <BLifeEcosystem items={ecosystemItems} />
    </main>
  );
}
