import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>Which <em>Friend</em> Do You Need Today?</h1>
        <div className={styles.buttonGroup}>
          <Button
            variant="border"
            className={styles.button}
            color="var(--color-white-100)"
            href="#learn-more"
            icon={<ArrowUpRight size={16} />}
          >
            Learn More
          </Button>
          <Button
            variant="border"
            className={styles.button}
            color="var(--color-white-100)"
            href="#reserve"
            icon={<ArrowUpRight size={16} />}
          >
            Reserve Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
