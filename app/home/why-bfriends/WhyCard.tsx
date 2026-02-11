import Image from "next/image";
import styles from "./WhyCard.module.css";

interface WhyCardProps {
  image: string;
  title: string;
  subheading: string;
}

export default function WhyCard({ image, title, subheading }: WhyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className={styles.image}
          quality={100}
          priority
          unoptimized={true}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subheading}>{subheading}</p>
      </div>
    </div>
  );
}
