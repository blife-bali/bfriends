import Image from "next/image";
import styles from "./StepCard.module.css";

const FALLBACK_IMAGE = "/images/Integrate/DDK09558.jpg";

interface StepCardProps {
  image?: string | null;
  index: string;
  title: string;
  description?: string;
}

export default function StepCard({ image, index, title, description }: StepCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image || FALLBACK_IMAGE}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 85vw, 50vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <span className={styles.index}>{index}</span>
          <span className={styles.titleText}>{title}</span>
        </h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </article>
  );
}
