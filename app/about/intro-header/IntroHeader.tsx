import RichTextContent from "@/components/RichTextContent/RichTextContent";
import styles from "./IntroHeader.module.css";

const DEFAULT_TITLE = "A More Personal Approach to Wellness";

const DEFAULT_SUB = `At BFriends, wellness begins with understanding the individual. By combining advanced body assessment technology with expert guidance

We create personalized wellness journeys designed to evolve alongside
your needs, goals, and progress.`;

interface IntroHeaderProps {
  title?: string;
  sub?: string;
  eyebrow?: string;
}

export default function IntroHeader({
  title = DEFAULT_TITLE,
  sub = DEFAULT_SUB,
  eyebrow = "About BFriends",
}: IntroHeaderProps) {
  return (
    <header className={styles.header} aria-labelledby="about-intro-title">
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id="about-intro-title" className={styles.title}>
        {title}
      </h1>
      <RichTextContent html={sub} className={styles.sub} />
    </header>
  );
}
