"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./JourneyBlockImage.module.css";

interface JourneyBlockImageProps {
  src: string;
  alt: string;
}

export default function JourneyBlockImage({ src, alt }: JourneyBlockImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div className={styles.imageWrap} ref={wrapperRef}>
      <div className={styles.imageFrame}>
        <motion.div className={styles.parallaxLayer} style={{ y }}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`${styles.coverImage} ${styles.coverImageSharp}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 830px"
            quality={100}
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
}
