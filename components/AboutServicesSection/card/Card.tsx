import Button from "@/components/ui/Button/Button";
import styles from "./Card.module.css";

interface ServicesCardProps {
  image: string;
  name: string;
  title: string;
  subheading?: string;
  buttonLabel: string;
  slug: string;
}

export default function Card({
  image,
  name,
  title,
  subheading,
  buttonLabel,
  slug,
}: ServicesCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={image}
          alt={title}
          className={styles.image}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
        {subheading ? <p className={styles.subheading}>{subheading}</p> : null}
        <Button
          href={`/programs/${slug}`}
          color="var(--color-blue-100)"
          showIcon
          className={styles.button}
        >
          {buttonLabel}
        </Button>
      </div>
    </article>
  );
}
