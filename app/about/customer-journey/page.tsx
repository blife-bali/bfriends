import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyBlockImage from "./JourneyBlockImage";
import styles from "./CustomerJourney.module.css";
import { getPageSeo, getProcessSteps, getPageHeader } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("customer-journey");
  return {
    title: seo.seo_title || "Customer Journey | BFriends",
    description: seo.seo_description || "An expert-driven, data-led 6-step wellness system — Measure, Assess, Design, Guide, Track, Refine — integrated into your routine at BFriends.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "About / Customer Journey",
  title: "Customer Journey",
  image: "/images/Integrate/DDK09585.jpg",
};

export default async function CustomerJourneyPage() {
  const [processSteps, pageHeader] = await Promise.all([
    getProcessSteps("customer-journey"),
    getPageHeader("customer-journey"),
  ]);

  const header = {
    breadcrumb: pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb,
    title: pageHeader?.title || DEFAULT_HEADER.title,
    image: pageHeader?.image || DEFAULT_HEADER.image,
  };

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={header.breadcrumb}
        title={header.title}
        image={header.image}
      />
      <div className={styles.container}>
        <div className={styles.journeyBlocks}>
          {processSteps.map((step: any, index: number) => (
            <section
              key={step.id}
              className={`${styles.journeyBlock} ${index % 2 === 1 ? styles.journeyBlockEven : ""}`}
            >
              <div className={styles.journeyBlockWrapper}>
                <p className={styles.eyebrow}>Step {step.number}</p>
                <JourneyBlockImage src={step.image} alt={step.title} />
                <div className={styles.blockConclusionContainer}>
                  <div className={styles.blockLeftConclusion}>
                    <h3 className={styles.blockConclusionTitle}>{step.title}</h3>
                  </div>
                  <div className={styles.blockRightConclusion}>
                    <p className={styles.blockConclusionText}>{step.description}</p>
                    {step.subpoints && step.subpoints.length > 0 && (
                      <ul className={styles.subpointsList}>
                        {step.subpoints.map((sp: any, i: number) => (
                          <li key={i} className={styles.subpointItem}>
                            <span className={styles.subpointTitle}>{sp.title}</span>
                            <span className={styles.subpointDesc}>{sp.description}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
