import Image from "next/image";
import styles from "./Card.module.css";
import { ProcessStep } from "@/lib/process-data";

interface CardProps {
  step: ProcessStep;
  index: number;
}

export default function Card({ step, index }: CardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={styles.card}>
      {/* Background Image */}
      <div className={styles.cardBackground}>
        <Image
          src={step.image}
          alt={step.title}
          fill
          className={styles.backgroundImage}
          priority={index === 1} // Prioritize the center card
        />
        {/* Dark Overlay to make text readable */}
        <div className={styles.cardOverlay} />
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={`${styles.cardTitle} ${isEven ? styles.cardTitleTop : styles.cardTitleBottom}`}>
          <h2 className={styles.stepNumber}>{step.number}</h2>
          <h2 className={styles.cardHeading}>{step.title}</h2>
          <p className={styles.cardDescription}>{step.description}</p>
        </div>
      </div>
    </div>
  );
}
