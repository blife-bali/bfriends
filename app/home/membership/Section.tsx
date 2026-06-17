import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Section.module.css";

const DEFAULT_TITLE = "Personalized Wellness Journeys";
const DEFAULT_BODY =
  "Whether you're starting fresh or continuing your journey, our programmes are designed to guide, support, and elevate your wellness — every step of the way.";
const MEMBERSHIP_IMAGE = "/images/Enhance/DDK00601.webp";

export interface MembershipSectionProps {
  title?: string;
  body?: string;
  imageUrl?: string;
}

export default function MembershipSection({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  imageUrl = MEMBERSHIP_IMAGE,
}: MembershipSectionProps) {
  return (
    <section className={styles.section} aria-label="Programmes and Memberships">
      <div className={styles.background} aria-hidden>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className={styles.backgroundImage}
            sizes="100vw"
            priority={false}
          />
        ) : null}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <div className={styles.ctaGroup}>
          <Button
            variant="border"
            className={styles.ctaPrimary}
            color="var(--color-blue-100)"
            href="/programs"
          >
            Explore Programmes
          </Button>
          <Button
            className={styles.ctaSecondary}
            color="var(--color-blue-100)"
            href="/membership/bfriends-passport"
          >
            View Memberships
          </Button>
        </div>
      </div>
    </section>
  );
}
