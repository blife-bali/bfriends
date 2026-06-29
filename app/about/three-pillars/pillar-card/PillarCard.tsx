import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./PillarCard.module.css";

export interface PillarCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
}

export default function PillarCard({
  image,
  imageAlt,
  title,
  description,
  buttonLabel,
  href,
}: PillarCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {href ? (
          <Button href={href} className={styles.button} color="var(--color-blue-100)">
            {buttonLabel}
          </Button>
        ) : (
          <span className={styles.buttonPlaceholder}>{buttonLabel}</span>
        )}
      </div>
    </article>
  );
}
