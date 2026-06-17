import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import type { FacilityId } from "@/mock/facilities";
import { mockStaffPage } from "@/mock/staff";
import { getStaffForContext } from "@/lib/staff";
import styles from "./Experts.module.css";

interface ExpertsSectionProps {
  facilityId?: FacilityId;
  programSlug?: string;
  eyebrow?: string;
  title?: string;
  description?: string | string[];
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
}

export default function ExpertsSection({
  facilityId,
  programSlug,
  eyebrow = "Our Experts",
  title = "Guided by Experts",
  description,
  ctaLabel = "Meet the Experts",
  ctaHref = "/about/staff",
  image,
}: ExpertsSectionProps) {
  const members = getStaffForContext(
    facilityId ? { facilityId } : programSlug ? { programSlug } : {},
  );

  if (members.length === 0) return null;

  const paragraphs = Array.isArray(description)
    ? description
    : (description ?? mockStaffPage.intro_body)
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

  const sectionImage =
    image ?? members.find((m) => m.image)?.image ?? mockStaffPage.header_image;

  return (
    <section className={styles.section} aria-label="Our experts">
      <div className={styles.container}>
        <div className={styles.media}>
          <Image
            src={sectionImage}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.contentInner}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.copy}>
              {paragraphs.map((text, i) => (
                <p key={i} className={styles.sub}>
                  {text}
                </p>
              ))}
            </div>
            <Button
              variant="border"
              href={ctaHref}
              color="var(--color-blue-100)"
              className={styles.cta}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
