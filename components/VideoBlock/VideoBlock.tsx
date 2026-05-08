"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./VideoBlock.module.css";

interface VideoBlockProps {
  src: string;
}

export default function VideoBlock({ src }: VideoBlockProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(frameRef, { once: false, amount: 0.25 });

  return (
    <div className={parallax.imageWrap}>
      <div
        ref={frameRef}
        className={`${parallax.imageFrame} ${parallax.imageFrameRatio169} ${isInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
      >
        <video
          src={src}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      </div>
    </div>
  );
}
