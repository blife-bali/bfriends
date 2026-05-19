import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Card.module.css";

interface ServicesCardProps {
  image: string;
  name: string;
  title: string;
  subheading: string;
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
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          draggable={false}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
        <p className={styles.subheading}>{subheading}</p>
        <Button
          href={`/programs/${slug}`}
          color="var(--color-blue-100)"
          className={styles.button}
        >
          {buttonLabel}
        </Button>
      </div>
    </article>
  );
}