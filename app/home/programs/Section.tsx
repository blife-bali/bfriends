"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Section.module.css";
import { programsData } from "@/lib/programs-data";
import { Card } from "./index";

export default function Section() {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTab(width >= 768 && width < 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedProgram = programsData.find((p) => p.letter === selectedLetter) || programsData[0];

  const handlePointClick = (letter: string) => {
    setSelectedLetter(letter);

    if (isMobile || isTab) {
      setIsCardOpen(true);
    }
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);

    if (isMobile || isTab) {
      setSelectedLetter("");
    }
  };

  return (
    <section className={styles.section}>
      {/* Background Image with Points */}
      <div className={styles.background}>
        <Image
          src={isMobile ? "/images/programs/D-mobile.webp" : "/images/programs/D.webp"}
          alt="Programs"
          width={isMobile ? 750 : 1536}
          height={isMobile ? 1334 : 1080}
          className={styles.backgroundImage}
          quality={100}
          priority
          unoptimized={true}
        />
        <div className={styles.backgroundOverlay} />

        {/* Points Grid - positioned to scale with image */}
        <div className={styles.pointsGrid}>
          {programsData.map((program) => (
            <button
              key={program.letter}
              className={`${styles.pointButton} ${
                selectedLetter === program.letter ? styles.pointButtonSelected : ""
              }`}
              style={{
                left: `${getButtonPosition(program.letter, isMobile, isTab).left}%`,
                top: `${getButtonPosition(program.letter, isMobile, isTab).top}%`,
              }}
              onClick={() => handlePointClick(program.letter)}
            >
              {program.letter}
            </button>
          ))}
        </div>

        {/* Content Wrapper - contains title and desktop card */}
        <div className={styles.contentWrapper}>
          <div className={styles.titleContainer}>
            <p className={styles.sectionEyebrow}>
              Our Programs
            </p>
            <p className={styles.headingText}>
              The <em>Journey</em> <br/> at BFriends
            </p>
          </div>

          {/* Desktop Card Container */}
          {!isMobile && !isTab && (
            <div className={styles.cardContainer}>
              <Card program={selectedProgram} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tab Modal Card */}
      {(isMobile || isTab) && isCardOpen && (
        <div className={`${styles.cardContainer} ${styles.cardModal}`}>
          <Card program={selectedProgram} onClose={handleCloseCard} isMobile={true} />
        </div>
      )}
    </section>
  );
}

// Position for each button to create the F-R-I-E-N-D pattern
function getButtonPosition(letter: string, isMobile: boolean = false, isTab: boolean = false): { left: number; top: number } {
  if (isMobile) {
    const mobilePositions: Record<string, { left: number; top: number }> = {
      F: { left: 79, top: 90 },
      R: { left: 81, top: 75 },
      I: { left: 78, top: 60 },
      E: { left: 75, top: 44 },
      N: { left: 65, top: 27 },
      D: { left: 40, top: 20 },
    };

    return mobilePositions[letter] || { left: 10, top: 15 };
  }

  if (isTab) {
    const tabPositions: Record<string, { left: number; top: number }> = {
      F: { left: 55, top: 90 },
      R: { left: 57, top: 75 },
      I: { left: 57, top: 60 },
      E: { left: 56, top: 44 },
      N: { left: 53, top: 27 },
      D: { left: 40, top: 20 },
    };

    return tabPositions[letter] || { left: 10, top: 15 };
  }

  const positions: Record<string, { left: number; top: number }> = {
    F: { left: 44, top: 90 },
    R: { left: 46, top: 75 },
    I: { left: 47, top: 58 },
    E: { left: 46, top: 40 },
    N: { left: 43, top: 22 },
    D: { left: 35, top: 13 },
  };

  return positions[letter] || { left: 10, top: 15 };
}
