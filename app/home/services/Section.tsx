"use client";

import { useMemo } from "react";
import Card from "./card/Card";
import styles from "./Section.module.css";

const DEFAULT_DESKTOP_IMAGE = "/images/programs/D.webp";

const DEFAULT_TITLE = "Wellness Designed Around Your Goals";
const DEFAULT_SUB =
  "Your wellness journey is shaped by what matters most to you. Whether your focus is recovery, movement, beauty, or lifestyle, every recommendation is designed around your personal goals.";

type ProgramSource = {
  name?: string;
  title?: string;
  subheading?: string;
  image?: string;
  buttonLabel?: string;
  button_label?: string;
  slug?: string;
};

type ServicesProgram = {
  name: string;
  title: string;
  subheading: string;
  image: string;
  buttonLabel: string;
  slug: string;
};

function normalizePrograms(source: ProgramSource[] | undefined): ServicesProgram[] {
  if (!source || source.length === 0) return [];
  return source.map((p) => ({
    name: p.name ?? p.title ?? "",
    title: p.title ?? p.name ?? "",
    subheading: p.subheading ?? "",
    image: p.image || DEFAULT_DESKTOP_IMAGE,
    buttonLabel: p.buttonLabel ?? p.button_label ?? "Discover",
    slug: (p.slug ?? p.name ?? "").toLowerCase(),
  }));
}

export default function Section({
  programs: programsProp,
  heading = DEFAULT_TITLE,
  sub = DEFAULT_SUB,
  showEyebrow = true,
  headerLayout = "stacked",
}: {
  programs?: ProgramSource[];
  heading?: string;
  sub?: string;
  showEyebrow?: boolean;
  headerLayout?: "stacked" | "split" | "centered";
}) {
  const programs = useMemo(() => normalizePrograms(programsProp), [programsProp]);

  if (programs.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Our programs">
      <div className={styles.mainContainer}>
        <div
          className={
            headerLayout === "split"
              ? styles.titleContainerSplit
              : headerLayout === "centered"
                ? styles.titleContainerCentered
                : styles.titleContainer
          }
        >
          <div className={styles.titleLeft}>
            {/* {showEyebrow && <p className={styles.eyebrow}>Our Programmes</p>} */}
            <h2 className={styles.sectionTitle}>{heading}</h2>
          </div>
          <p className={styles.sectionSub}>{sub}</p>
        </div>

        <div className={styles.programGrid}>
          {programs.map((program) => (
            <div key={program.slug} className={styles.programItem}>
              <Card
                image={program.image || DEFAULT_DESKTOP_IMAGE}
                name={program.name}
                title={program.title}
                subheading={program.subheading}
                buttonLabel={program.buttonLabel}
                slug={program.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
