import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MockFacility } from "@/mock/facilities";
import Button from "@/components/ui/Button/Button";
import ExpertsSection from "@/app/about/philosophy/experts/Experts";
import styles from "./FacilityContent.module.css";

interface FacilityContentProps {
  facility: MockFacility;
}

export default function FacilityContent({ facility }: FacilityContentProps) {
  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link href="/about/facilities" className={styles.back}>
          <ArrowLeft
            className={styles.backIcon}
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className={styles.backLabel}>All facilities</span>
        </Link>
      </div>

      <section className={styles.overview} aria-labelledby="facility-about-title">
        <div className={styles.overviewInner}>
          <div className={styles.overviewHead}>
            <div className={styles.metaRow}>
              <span className={styles.pillar}>{facility.pillarLabel}</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span className={styles.floor}>{facility.floor}</span>
            </div>
            <h2 id="facility-about-title" className={styles.overviewTitle}>
              {facility.about_title}
            </h2>
          </div>
          <div className={styles.overviewBody}>
            <p className={styles.overviewLead}>{facility.about_body}</p>
          </div>
        </div>
      </section>

      <section className={styles.specs} aria-labelledby="facility-specs-title">
        <div className={styles.specsContainer}>
          <div className={styles.specsHead}>
            <p className={styles.eyebrow}>{facility.pillarLabel}</p>
            <h2 id="facility-specs-title" className={styles.specsTitle}>
              {facility.specifications_title}
            </h2>
          </div>
          <ul className={styles.specsList}>
            {facility.specifications.map((item, index) => (
              <li key={item} className={styles.specsItem}>
                <span className={styles.specsNum} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.specsText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ExpertsSection facilityId={facility.id} />

      <section className={styles.cta} aria-label="Get started">
        <div className={styles.ctaCard}>
          <p className={styles.ctaEyebrow}>Get started</p>
          <h2 className={styles.ctaHeading}>Ready to experience {facility.name}?</h2>
          <p className={styles.ctaSub}>
            Book a session and let our team guide your visit — from your first step
            through to recovery.
          </p>
          <Button
            href={`/programs/${facility.related_program_slug}`}
            color="var(--color-white-100)"
          >
            Explore Programme
          </Button>
        </div>
      </section>
    </div>
  );
}
