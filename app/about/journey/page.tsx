import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyFlow from "./JourneyFlow";
import styles from "./CustomerJourney.module.css";
import { getPageSeo, getProcessSteps, getJourneySection, resolvePageHeader } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("customer-journey");
  return {
    title: seo.seo_title || "BFriends Journey | BFriends",
    description:
      seo.seo_description ||
      "An expert-driven, data-led 6-step wellness system - Measure, Assess, Design, Guide, Track, Refine - integrated into your routine at BFriends.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "About / BFriends Journey",
  title: "BFriends Journey",
  image: "/images/Integrate/DDK09585.jpg",
};

export default async function JourneyPage() {
  const [processSteps, header, journeySection] = await Promise.all([
    getProcessSteps("customer-journey"),
    resolvePageHeader("customer-journey", DEFAULT_HEADER),
    getJourneySection(),
  ]);

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={header.breadcrumb}
        title={header.title}
        image={header.image}
        subtitle={header.description ?? undefined}
      />
      <JourneyFlow
        steps={processSteps}
        heading={journeySection?.headline}
        body={journeySection?.body}
      />
    </main>
  );
}
