import Hero from "./hero/Hero";
import Intro from "./intro/Intro";
import WhyBFriends from "./why-bfriends/WhyBFriends";
import { Section as ProgramsSection } from "./programs";
import ProcessCarousel from "./process/Carousel";
import Process from "./process/Process";
import Journey from "./journey/Journey";
import { Section as NewsAndEventsSection } from "./news-and-events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhyBFriends />
      <ProgramsSection />
      <ProcessCarousel />
      <Process />
      <Journey />
      <NewsAndEventsSection />
    </>
  );
}
