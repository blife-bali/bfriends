import Image from "next/image";
import {
  BadgeCheck,
  CalendarClock,
  Check,
  FileSignature,
  HeartPulse,
  Info,
  ShieldCheck,
  Shirt,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { PolicyIcon, TreatmentPolicy } from "./data";
import styles from "./Section.module.css";

const ICONS: Record<PolicyIcon, LucideIcon> = {
  licensed: BadgeCheck,
  instructor: UsersRound,
  safety: ShieldCheck,
  health: HeartPulse,
  attire: Shirt,
  liability: FileSignature,
};

interface PolicySectionProps {
  policy: TreatmentPolicy;
  image?: string;
}

export default function PolicySection({ policy, image }: PolicySectionProps) {
  const { booking, terms, rules } = policy;

  return (
    <section className={styles.section} aria-labelledby="treatment-policy-title">
      {image && (
        <div className={styles.background} aria-hidden="true">
          <Image src={image} alt="" fill sizes="100vw" className={styles.backgroundImage} />
          <div className={styles.backgroundOverlay} />
        </div>
      )}

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{policy.eyebrow}</p>
            <h2 id="treatment-policy-title" className={styles.title}>
              {policy.title}
            </h2>
          </div>
          <p className={styles.intro}>{policy.intro}</p>
        </header>

        <div className={styles.booking} role="note">
          <div className={styles.bookingBadge}>
            <CalendarClock className={styles.bookingIcon} aria-hidden="true" strokeWidth={1.5} />
            <span className={styles.bookingBadgeText}>{booking.badge}</span>
          </div>
          <div className={styles.bookingCopy}>
            <h3 className={styles.bookingTitle}>{booking.title}</h3>
            <p className={styles.bookingBody}>{booking.body}</p>
          </div>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{terms.title}</h3>
          <ul className={styles.terms}>
            {terms.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.label} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.iconCircle} aria-hidden="true">
                      <Icon className={styles.icon} strokeWidth={1.5} />
                    </span>
                    <span className={styles.tag}>{item.tag}</span>
                  </div>
                  <span className={styles.termLabel}>{item.label}</span>
                  <span className={styles.termTitle}>{item.title}</span>
                  <p className={styles.termBody}>{item.body}</p>
                </li>
              );
            })}
          </ul>
          <p className={styles.note}>
            <Info className={styles.noteIcon} aria-hidden="true" strokeWidth={1.75} />
            <span>{terms.note}</span>
          </p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{rules.title}</h3>
          <ul className={styles.rules}>
            {rules.groups.map((group) => {
              const Icon = ICONS[group.icon];
              return (
                <li key={group.title} className={styles.card}>
                  <div className={styles.ruleHead}>
                    <span className={styles.iconCircle} aria-hidden="true">
                      <Icon className={styles.icon} strokeWidth={1.5} />
                    </span>
                    <h4 className={styles.ruleTitle}>{group.title}</h4>
                  </div>
                  <ul className={styles.ruleItems}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.ruleItem}>
                        <Check className={styles.ruleCheck} aria-hidden="true" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
