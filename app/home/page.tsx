import type { Metadata } from "next";
import Hero from "./hero/Hero";
import { Section as NewIntroSection } from "./new-intro";
import WhyBFriends from "./why-bfriends/WhyBFriends";
import { Section as ServicesSection } from "./services";
import { Section as FaqSection } from "./faq";
import { Section as NewsAndEventsSection } from "./news-and-events";
import FriendsSection from "./friends/Section";
import MembershipSection from "./membership/Section";
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
  getFaqs,
  getIntroPillars,
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
  const [hero, intro, introPillars, whyCards, processSteps, journeySteps, events, news, publicPrograms, faqs] = await Promise.all([
    getHeroByPage("home"),
    getIntroByPage("home"),
    getIntroPillars(),
    getWhyCards(),
    getProcessSteps("home"),
    getProcessSteps("customer-journey"),
    getEvents(),
    getNews(),
    getPublicPrograms(),
    getFaqs(),
  ]);
  const programs = publicPrograms.map((program: import("@/lib/cms").PublicProgram) => ({
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
        subtitle={hero?.subtitle}
        videoUrl={hero?.video_url}
      />
      <NewIntroSection
        headline={intro?.headline}
        pillars={introPillars.map((p) => ({ title: p.title, body: p.body }))}
        steps={processSteps}
        journeySteps={journeySteps}
      />
      {/* <ServicesSection programs={programs} headerLayout="centered" />
      <FriendsSection />
      <MembershipSection /> */}
      {/* <WhyBFriends cards={whyCards} /> */}
      {/* <section className={styles.videoSection} aria-label="BFriends video">
        <div className={styles.videoContainer}>
          <VideoBlock src={hero?.video_url || "/videos/BFriends2.mp4"} />
        </div>
      </section> */}
      
      
      
      <SiteLocation />
      {/* <FaqSection faqs={faqs.slice(0, 6)} /> */}
      {/* <NewsAndEventsSection events={events} news={news} /> */}
      {/* <SiteNewsletterCta /> */}
    </>
  );
}
