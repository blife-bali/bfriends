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
import { AboutServicesSection } from "@/components/AboutServicesSection";
import styles from "./philosophy/page.module.css";
import {
  getPageSeo,
  resolvePageHeader,
  getIntroByPage,
  getWhyCards,
  getPhilosophySectionByKey,
  getCoreBeliefs,
  getEcosystemItems,
  getPublicPrograms,
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
  const [header, intro, whyCards, journeySection, manifesto, integratedSelf, coreBeliefs, ecosystemItems, publicPrograms] = await Promise.all([
    resolvePageHeader(["about", "philosophy"], DEFAULT_HEADER),
    getIntroByPage("home"),
    getWhyCards(true),
    getJourneySection(),
    getPhilosophySectionByKey("manifesto"),
    getPhilosophySectionByKey("integrated_self"),
    getCoreBeliefs(),
    getEcosystemItems(),
    getPublicPrograms(),
  ]);

  const programs = publicPrograms.map((program) => ({
    name: program.general.name,
    title: program.general.title || program.general.name,
    subheading: program.general.subheading,
    image: program.general.image,
    buttonLabel: program.general.button_label,
    slug: program.general.slug,
  }));

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

        {/* <WhyBFriends cards={whyCards} /> */}
        <Journey
          headline={journeySection?.headline}
          body={journeySection?.body}
          imageUrl={journeySection?.image}
        />
        
        
        <BLifeEcosystem items={ecosystemItems} />
      </main>
      {/* <SiteLocation /> */}
      <AboutServicesSection programs={programs} />
    </>
  );
}
