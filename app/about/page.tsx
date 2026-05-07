import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Intro from "./philosophy/intro/Intro";
import WhyBFriends from "@/app/home/why-bfriends/WhyBFriends";
import Journey from "./philosophy/journey/Journey";
import Manifesto from "./philosophy/manifesto/Manifesto";
import CoreBeliefs from "./philosophy/core-beliefs/CoreBeliefs";
import IntegratedSelf from "./philosophy/integrated-self/IntegratedSelf";
import BLifeEcosystem from "./philosophy/blife-ecosystem/BLifeEcosystem";
import SiteLocation from "@/components/SiteLocation/SiteLocation";
import SiteNewsletterCta from "@/components/SiteNewsletterCta/SiteNewsletterCta";
import styles from "./philosophy/page.module.css";
import {
  getPageSeo,
  getPageHeader,
  getIntroByPage,
  getWhyCards,
  getPhilosophySectionByKey,
  getCoreBeliefs,
  getEcosystemItems,
} from "@/lib/cms";
import { getJourneySection } from "@/lib/cms";

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
  const [pageHeader, intro, whyCards, journeySection, manifesto, integratedSelf, coreBeliefs, ecosystemItems] = await Promise.all([
    getPageHeader("philosophy"),
    getIntroByPage("home"),
    getWhyCards(true),
    getJourneySection(),
    getPhilosophySectionByKey("manifesto"),
    getPhilosophySectionByKey("integrated_self"),
    getCoreBeliefs(),
    getEcosystemItems(),
  ]);

  const header = {
    title: DEFAULT_HEADER.title,
    breadcrumb: DEFAULT_HEADER.breadcrumb,
    image: pageHeader?.image || DEFAULT_HEADER.image,
  };

  return (
    <>
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
        <Journey
          headline={journeySection?.headline}
          body={journeySection?.body}
          imageUrl={journeySection?.image}
        />
        
        
        <BLifeEcosystem items={ecosystemItems} />
      </main>
      <SiteLocation />
      <SiteNewsletterCta />
    </>
  );
}
