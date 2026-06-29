import Image from "next/image";
import type { TreatmentCta } from "@/mock/treatments";
import Button from "@/components/ui/Button/Button";
import styles from "./Section.module.css";

interface CtaSectionProps {
  cta: TreatmentCta;
  image: string;
}

export default function CtaSection({ cta, image }: CtaSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="treatment-cta-title">
      <div className={styles.background} aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          className={styles.backgroundImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h2 id="treatment-cta-title" className={styles.heading}>
          {cta.headline}
        </h2>
        <p className={styles.body}>{cta.description}</p>
        <div className={styles.ctaGroup}>
          <Button
            href={cta.href}
            variant="border"
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            color="var(--color-blue-100)"
            className={styles.ctaButton}
          >
            {cta.label}
          </Button>
          <Button
            href="/treatments"
            color="var(--color-blue-100)"
            className={styles.backButton}
          >
            Back to Treatments
          </Button>
        </div>
      </div>
    </section>
  );
}
