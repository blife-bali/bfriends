import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Journey.module.css";

const JOURNEY_IMAGE = "/images/Integrate/DDK09558.jpg";
const DEFAULT_TITLE = "The BFriends Journey";
const DEFAULT_BODY =
  "Powered by Korean wellness science and precision analysis, the BFriends Method is designed to help you move, recover, and feel better in daily life. Through structural and movement mapping, body analysis, and personalized care programs, we create a wellness journey tailored to your body's condition and rhythm.";

export default function Journey({
  headline = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  imageUrl = JOURNEY_IMAGE,
}: {
  headline?: string | null;
  body?: string | null;
  imageUrl?: string | null;
}) {
  return (
    <section className={styles.section} aria-label="BFriends Journey">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{headline || DEFAULT_TITLE}</h2>
          <p className={styles.body}>{body || DEFAULT_BODY}</p>
          <Button
            href="/about/journey"
            className={styles.cta}
            color="var(--color-blue-100)"
            showIcon
          >
            The BFriends Journey
          </Button>
        </div>

        <div className={styles.imageWrap}>
          <Image
            src={imageUrl || JOURNEY_IMAGE}
            alt="BFriends Journey"
            fill
            className={styles.image}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
