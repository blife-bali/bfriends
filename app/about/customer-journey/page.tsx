import { processData } from "@/lib/process-data";
import PageHeader from "@/components/PageHeader/PageHeader";
import JourneyBlockImage from "./JourneyBlockImage";
import { Section as ProgramsSection } from "@/app/home/programs";
import styles from "./CustomerJourney.module.css";

const PAGE_HEADER = {
  breadcrumb: "About / Customer Journey",
  title: "Customer Journey",
  image: "/images/hero-test.png",
};

export default function CustomerJourneyPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumb={PAGE_HEADER.breadcrumb}
        title={PAGE_HEADER.title}
        image={PAGE_HEADER.image}
      />
      <div className={styles.container}>

        <div className={styles.journeyBlocks}>
          {processData.map((step, index) => (
            <section
              key={step.id}
              className={`${styles.journeyBlock} ${index % 2 === 1 ? styles.journeyBlockEven : ""}`}
            >
              <div className={styles.journeyBlockWrapper}>
                <p className={styles.eyebrow}>Step {step.number}</p>
                {/* Image block – same as system section (with scroll-in animation) */}
                <JourneyBlockImage src={step.image} alt={step.title} />

                {/* Conclusion container – same as system section */}
                <div className={styles.blockConclusionContainer}>
                <div className={styles.blockLeftConclusion}>
                  <h3 className={styles.blockConclusionTitle}>{step.title}</h3>
                </div>
                <div className={styles.blockRightConclusion}>
                  <p className={styles.blockConclusionText}>{step.description}</p>
                  {step.subpoints && step.subpoints.length > 0 && (
                    <ul className={styles.subpointsList}>
                      {step.subpoints.map((sp, i) => (
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

      <ProgramsSection />
    </main>
  );
}
