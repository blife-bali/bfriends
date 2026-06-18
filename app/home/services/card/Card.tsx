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
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
          quality={75}
          draggable={false}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
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