"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Button from "@/components/ui/Button/Button";
import { ProgramData } from "@/lib/programs-data";
import { ArrowUpRightIcon } from "lucide-react";

interface CardProps {
  program: ProgramData;
}

export default function Card({ program }: CardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [program]);

  return (
    <div className={`${styles.card} ${isVisible ? styles.cardVisible : styles.cardHidden}`}>
      {/* Card Background */}
      <div className={styles.cardBackground}>
        <Image
          src={program.image}
          alt={program.name}
          fill
          className={styles.cardImage}
          priority
          sizes="50vw"
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
            href="#"
            variant="border"
            className={styles.cardButton}
            color="var(--color-white-100)"
            icon={<ArrowUpRightIcon className={styles.icon} />}
          >
            {program.buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
