import PageHeader from "@/components/PageHeader/PageHeader";
import Manifesto from "./manifesto/Manifesto";
import CoreBeliefs from "./core-beliefs/CoreBeliefs";
import IntegratedSelf from "./integrated-self/IntegratedSelf";
import BLifeEcosystem from "./blife-ecosystem/BLifeEcosystem";
import styles from "./page.module.css";
import Intro from "@/app/home/intro/Intro";
import WhyBFriends from "@/app/home/why-bfriends/WhyBFriends";
import { Section as ProgramsSection } from "@/app/home/programs";

const PAGE_HEADER = {
  title: "The Philosophy of Return",
  breadcrumb: "About / Philosophy",
  image: "/images/hero-test.png",
};

export default function PhilosophyPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        title={PAGE_HEADER.title}
        breadcrumb={PAGE_HEADER.breadcrumb}
        image={PAGE_HEADER.image}
      />
      <Intro 
        showCta={false}
      />
      <WhyBFriends />
      <Manifesto />
      <CoreBeliefs />
      <IntegratedSelf />
      <BLifeEcosystem />
      <ProgramsSection />
    </main>
  );
}
