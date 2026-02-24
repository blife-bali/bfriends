import Image from "next/image";
import styles from "./Card.module.css";
import { ProcessStep } from "@/lib/process-data";

interface SystemCardProps {
  step: ProcessStep;
}

export default function SystemCard({ step }: SystemCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageColumn}>
        <Image
          src={step.image}
          alt={step.title}
          fill
          className={styles.cardImage}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className={styles.detailsColumn}>
        <span className={styles.stepNumber}>{step.number}</span>
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
    </article>
  );
}
