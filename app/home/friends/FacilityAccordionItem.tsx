"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import styles from "./FacilityAccordionItem.module.css";

interface FacilityAccordionItemProps {
  name: string;
  pillarLabel: string;
  floor: string;
  image: string;
  description?: string;
}

export default function FacilityAccordionItem({
  name,
  pillarLabel,
  floor,
  image,
  description,
}: FacilityAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={styles.name}>{name}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true">
          <Plus size={18} strokeWidth={2} />
        </span>
      </button>

      <div
        id={panelId}
        className={`${styles.panelWrap} ${isOpen ? styles.panelWrapOpen : ""}`}
      >
        <div className={styles.panelInner}>
          <div className={styles.imageWrap}>
            <Image
              src={image}
              alt={name}
              fill
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.pillar}>{pillarLabel}</span>
              <span className={styles.divider} aria-hidden="true">
                ·
              </span>
              <span className={styles.floor}>{floor}</span>
            </div>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
