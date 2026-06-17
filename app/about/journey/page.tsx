import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyBlockImage from "./JourneyBlockImage";
import styles from "./CustomerJourney.module.css";
import { getPageSeo, getProcessSteps, resolvePageHeader } from "@/lib/cms";

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
  const [processSteps, header] = await Promise.all([
    getProcessSteps("customer-journey"),
    resolvePageHeader("customer-journey", DEFAULT_HEADER),
  ]);

  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={header.breadcrumb}
        title={header.title}
        image={header.image}
        subtitle={header.description ?? undefined}
      />
      <div className={styles.container}>
        <section className={styles.intro} aria-labelledby="journey-intro-title">
          <h2 id="journey-intro-title" className={styles.introTitle}>
            The Friends Journey
          </h2>
          <p className={styles.introSub}>
            The Friends Journey is a unique experience that combines the best of both worlds: the
            physical and the digital. It&apos;s a journey that starts with a physical product and
            continues in the digital world, where you can interact with your BFriend in a whole new
            way.
          </p>
        </section>
        <div className={styles.journeyBlocks}>
          {processSteps.map((step: any, index: number) => (
            <section
              key={step.id}
              className={`${styles.journeyBlock} ${index % 2 === 1 ? styles.journeyBlockEven : ""}`}
            >
              <div className={styles.journeyBlockWrapper}>
                <div className={styles.contentGrid}>
                  <div className={styles.contentColImage}>
                    <JourneyBlockImage src={step.image} alt={step.title} />
                  </div>
                  <div className={styles.contentCol}>
                    <p className={styles.eyebrow}>Step {step.number}</p>
                    <h3 className={styles.blockTitle}>{step.title}</h3>
                    <p className={styles.blockBody}>{step.description}</p>
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
