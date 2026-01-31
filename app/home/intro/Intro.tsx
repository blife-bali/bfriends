import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        {/* Left Column: Text Content */}
        <div className={styles.textColumn}>
          <div className={styles.headingContainer}>
          <h2 className={styles.heading}>
           A <em>journey</em> to become your own friend.
          </h2>
          <h2 className={styles.heading2}>
            BFriends is a wellness hub in Kerobokan, Bali. A place created to reconnect with the oldest companion in your life, <em>yourself</em>.
          </h2>
          </div>
          <p className={styles.description}>
            Here, wellness is not about pushing limits or chasing outcomes. It is about understanding, accepting, and caring for your body and mind through intentional movement, mindful rest, and restoration.
          </p>
          <Button
            href="/about"
            variant="border"
            className={styles.button}
            color="var(--color-green-100)"
            icon={<ArrowUpRight size={16} />}
          >
            About Us
          </Button>
        </div>

        {/* Image Container */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageTop}>
              <Image
                  src="/images/venue/Gym-2.jpg"
                  alt="Meditation pose"
                  width={248}
                height={278}
                className={styles.image}
                quality={100}
                priority
                unoptimized={true}
              />
            </div>
            <div className={styles.imageBottom}>
              <Image
                src="/images/yoga-sess-2.jpg.jpeg"
                alt="Wellness studio"
                width={370}
                height={486}
                className={styles.image}
                quality={100}
                priority
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
