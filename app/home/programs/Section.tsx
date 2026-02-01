"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Section.module.css";
import { programsData } from "@/lib/programs-data";
import { Card } from "./index";

export default function Section() {
  const [selectedLetter, setSelectedLetter] = useState("F");

  const selectedProgram = programsData.find((p) => p.letter === selectedLetter) || programsData[0];

  return (
    <section className={styles.section}>
      {/* Background Image with Points */}
      <div className={styles.background}>
        <Image
          src="/images/programs/D.webp"
          alt="Programs"
          fill
          className={styles.backgroundImage}
          priority
          sizes="100vw"
        />
        <div className={styles.backgroundOverlay} />
        
        {/* Points Grid - now inside background to scale with image */}
        <div className={styles.pointsGrid}>
          {programsData.map((program) => (
            <button
              key={program.letter}
              className={`${styles.pointButton} ${
                selectedLetter === program.letter ? styles.pointButtonSelected : ""
              }`}
              style={{
                left: `${getButtonPosition(program.letter).left}%`,
                top: `${getButtonPosition(program.letter).top}%`,
              }}
              onClick={() => setSelectedLetter(program.letter)}
            >
              {program.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Right: Card Container */}
        <div className={styles.cardContainer}>
          <Card program={selectedProgram} />
        </div>
      </div>
    </section>
  );
}

// Position for each button to create the F-R-I-E-N-D pattern
function getButtonPosition(letter: string): { left: number; top: number } {
  const positions: Record<string, { left: number; top: number }> = {
    F: { left: 40, top: 90 },
    R: { left: 47, top: 80 },
    I: { left: 52, top: 60 },
    E: { left: 50, top: 40 },
    N: { left: 44, top: 25 },
    D: { left: 37, top: 15 },
  };
  return positions[letter] || { left: 10, top: 15 };
}
