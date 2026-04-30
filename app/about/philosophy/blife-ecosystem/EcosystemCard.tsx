import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./EcosystemCard.module.css";

const FALLBACK_IMAGE = "/images/Integrate/DDK09558.jpg";

interface EcosystemCardProps {
  image?: string | null;
  title: string;
  description: string;
  href?: string;
}

export default function EcosystemCard({ image, title, description, href }: EcosystemCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image || FALLBACK_IMAGE}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className={styles.image}
          quality={100}
          unoptimized
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {href && (
          <Button
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            showIcon
            className={styles.button}
            color="var(--color-blue-100)"
          >
            Visit
          </Button>
        )}
      </div>
    </article>
  );
}
