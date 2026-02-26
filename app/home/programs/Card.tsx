"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Button from "@/components/ui/Button/Button";
import { ProgramData } from "@/lib/programs-data";
import { XIcon } from "lucide-react";

interface CardProps {
  program: ProgramData;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Card({ program, onClose, isMobile }: CardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [program]);

  return (
    <div className={`${styles.card} ${isVisible ? styles.cardVisible : styles.cardHidden} ${isMobile ? styles.cardModal : ''}`}>
      {isMobile && onClose && (
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <XIcon size={24} />
        </button>
      )}

      {/* Card Background */}
      <div className={styles.cardBackground}>
        <Image
          src={program.image}
          alt={program.name}
          width={480}
          height={640}
          className={styles.cardImage}
          quality={100}
          priority={program.letter === "F"}
          unoptimized={true}
        />
        <div className={styles.cardOverlay} />
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Heading Container */}
        <div className={styles.headingContainer}>
          <div className={styles.indicator}>{program.letter}</div>
          <h2 className={styles.title}>{program.name}</h2>
        </div>

        {/* Bottom Container */}
        <div className={styles.bottomContainer}>
          <p className={styles.subheading}>{program.subheading}</p>
          <Button
            href={`/programs/${program.name.toLowerCase()}`}
            className={styles.cardButton}
            color="var(--color-white-100)"
            showIcon
          >
            {program.buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
