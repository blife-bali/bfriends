import type { Metadata } from "next";
import Hero from "./hero/Hero";
import Intro from "./intro/Intro";
import WhyBFriends from "./why-bfriends/WhyBFriends";
import { Section as ProgramsSection } from "./programs";
import { Section as SystemSection } from "./system";
import { Section as NewsAndEventsSection } from "./news-and-events";
import {
  getPageSeo,
  getHeroByPage,
  getIntroByPage,
  getWhyCards,
  getProcessSteps,
  getPrograms,
  getEvents,
  getNews,
} from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return {
    title: seo.seo_title || "BFriends | Wellness Center in Kerobokan, Bali",
    description: seo.seo_description || "A precision-driven wellness ecosystem combining fitness, recovery, therapy, and beauty under one roof in Kerobokan, Bali. Opening 2026.",
  };
}

export default async function HomePage() {
  const [hero, intro, whyCards, processSteps, programs, events, news] = await Promise.all([
    getHeroByPage("home"),
    getIntroByPage("home"),
    getWhyCards(),
    getProcessSteps(),
    getPrograms(),
    getEvents(),
    getNews(),
  ]);

  return (
    <>
      <Hero
        title={hero?.title}
        videoUrl={hero?.video_url}
      />
      <Intro
        headline={intro?.headline}
        body={intro?.body}
      />
      <WhyBFriends cards={whyCards} />
      <SystemSection steps={processSteps} />
      <ProgramsSection programs={programs} />
      <NewsAndEventsSection events={events} news={news} />
    </>
  );
}
