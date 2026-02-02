import Hero from "./hero/Hero";
import Intro from "./intro/Intro";
import WhyBFriends from "./why-bfriends/WhyBFriends";
import { Section as ProgramsSection } from "./programs";
import Process from "./process/Process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhyBFriends />
      <ProgramsSection />
      <Process />
    </>
  );
}
