import Image from "next/image";
import styles from "./Card.module.css";
import mobileStyles from "./CardMobile.module.css";
import { ProcessStep } from "@/lib/process-data";

interface CardProps {
  step: ProcessStep;
  index: number;
  variant?: "default" | "mobileCard";
}

export default function Card({ step, index, variant = "default" }: CardProps) {
  const isEven = index % 2 === 0;
  const rootClass = variant === "mobileCard" ? mobileStyles.mobileCard : styles.card;

  return (
    <div className={rootClass}>
      {/* Background Image – shared structure */}
      <div className={styles.cardBackground}>
        <Image
          src={step.image}
          alt={step.title}
          fill
          className={styles.backgroundImage}
          priority={index === 1}
        />
        <div className={styles.cardOverlay} />
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        {variant === "mobileCard" ? (
          <div
            className={`${mobileStyles.titleBox} ${isEven ? mobileStyles.titleCream : mobileStyles.titleGreen}`}
          >
            <h2 className={mobileStyles.stepNumber}>{step.number}</h2>
            <h2 className={mobileStyles.heading}>{step.title}</h2>
            <p className={mobileStyles.description}>{step.description}</p>
            {step.subpoints && step.subpoints.length > 0 && (
              <ul className={mobileStyles.subpoints}>
                {step.subpoints.map((sp, i) => (
                  <li key={i} className={mobileStyles.subpoint}>
                    <span className={mobileStyles.subpointTitle}>{sp.title}</span>
                    <span className={mobileStyles.subpointDesc}>{sp.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className={`${styles.cardTitle} ${isEven ? styles.cardTitleTop : styles.cardTitleBottom}`}>
            <h2 className={styles.stepNumber}>{step.number}</h2>
            <h2 className={styles.cardHeading}>{step.title}</h2>
            <p className={styles.cardDescription}>{step.description}</p>
            {step.subpoints && step.subpoints.length > 0 && (
              <ul className={styles.subpoints}>
                {step.subpoints.map((sp, i) => (
                  <li key={i} className={styles.subpoint}>
                    <span className={styles.subpointTitle}>{sp.title}</span>
                    <span className={styles.subpointDesc}>{sp.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
