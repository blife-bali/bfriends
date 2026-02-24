import { processData } from "@/lib/process-data";
import JourneyBlockImage from "./JourneyBlockImage";
import styles from "./CustomerJourney.module.css";

export default function CustomerJourneyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            It&apos;s Not What You Do.
            <br />
            It&apos;s The State You Return To.
          </h1>
        </header>

        <div className={styles.journeyBlocks}>
          {processData.map((step, index) => (
            <section
              key={step.id}
              className={`${styles.journeyBlock} ${index % 2 === 1 ? styles.journeyBlockEven : ""}`}
            >
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
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
