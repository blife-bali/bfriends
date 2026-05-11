import type { Metadata } from "next";
import Hero from "./hero/Hero";
import Intro from "./intro/Intro";
import WhyBFriends from "./why-bfriends/WhyBFriends";
import { Section as ServicesSection } from "./services";
import { Section as SystemSection } from "./system";
import { Section as FaqSection } from "./faq";
import { Section as NewsAndEventsSection } from "./news-and-events";
import VideoBlock from "@/components/VideoBlock/VideoBlock";
import styles from "./page.module.css";
import {
  getPageSeo,
  getHeroByPage,
  getIntroByPage,
  getWhyCards,
  getProcessSteps,
  getEvents,
  getNews,
  getPublicPrograms,
} from "@/lib/cms";
import SiteLocation from "@/components/SiteLocation/SiteLocation";
import SiteNewsletterCta from "@/components/SiteNewsletterCta/SiteNewsletterCta";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return {
    title: seo.seo_title || "BFriends | Wellness Center in Kerobokan, Bali",
    description: seo.seo_description || "A precision-driven wellness ecosystem combining fitness, recovery, therapy, and beauty under one roof in Kerobokan, Bali. Opening 2026.",
  };
}

export default async function HomePage() {
  const [hero, intro, whyCards, processSteps, events, news, publicPrograms] = await Promise.all([
    getHeroByPage("home"),
    getIntroByPage("home"),
    getWhyCards(),
    getProcessSteps("home"),
    getEvents(),
    getNews(),
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
      <Hero
        title={hero?.title}
        videoUrl={hero?.video_url}
      />
      <Intro
        headline={intro?.headline}
        body={intro?.body}
        imageUrl={intro?.image_url}
      />
      <ServicesSection programs={programs} />
      <SystemSection steps={processSteps} />
      
      <WhyBFriends cards={whyCards} />
      <section className={styles.videoSection} aria-label="BFriends video">
        <div className={styles.videoContainer}>
          <VideoBlock src={hero?.video_url || "/videos/BFriends2.mp4"} />
        </div>
      </section>
      <FaqSection />
      <SiteLocation />
      <NewsAndEventsSection events={events} news={news} />
      <SiteNewsletterCta />
    </>
  );
}
