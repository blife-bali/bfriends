import type { MockFacility } from "@/mock/facilities";
import styles from "./Section.module.css";

interface SpecsSectionProps {
  facility: Pick<MockFacility, "spec_section_label" | "spec_groups">;
}

function SpecItem({ text }: { text: string }) {
  const separator = text.indexOf(" — ");

  if (separator === -1) {
    return (
      <li className={styles.subpoint}>
        <span className={styles.subpointTitle}>{text}</span>
      </li>
    );
  }

  return (
    <li className={styles.subpoint}>
      <span className={styles.subpointTitle}>{text.slice(0, separator)}</span>
      <span className={styles.subpointDesc}>{text.slice(separator + 3)}</span>
    </li>
  );
}

export default function SpecsSection({ facility }: SpecsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="facility-specs-title">
      <div className={styles.container}>
        <div className={styles.split}>
          <header className={styles.introCol}>
            <h2 id="facility-specs-title" className={styles.title}>
              {facility.spec_section_label}
            </h2>
          </header>

          <ol className={styles.flowList}>
            {facility.spec_groups.map((group, index) => {
              const isLast = index === facility.spec_groups.length - 1;

              return (
                <li key={group.title} className={styles.flowItem}>
                  <div className={styles.flowMark} aria-hidden="true">
                    <span className={styles.stepIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {!isLast && <span className={styles.flowLine} />}
                  </div>

                  <article className={styles.stepCard}>
                    <h3 className={styles.stepTitle}>{group.title}</h3>

                    {group.description && (
                      <p className={styles.description}>{group.description}</p>
                    )}

                    <ul className={styles.subpoints}>
                      {group.items.map((item) => (
                        <SpecItem key={item} text={item} />
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
