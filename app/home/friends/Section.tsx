import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { mockTreatmentsPage } from "@/mock/treatments";
import styles from "./Section.module.css";

const PRIMARY_IMAGE = "/images/Integrate/DDK09396.webp";
const SECONDARY_IMAGE = "/images/Integrate/DDK00216 (1).webp";

export default function FriendsSection() {
  return (
    <section className={styles.section} aria-label="BFriends treatments">
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.leftCol}>
            <h2 className={styles.title}>{mockTreatmentsPage.header_title}</h2>

            <div className={styles.primaryFrame}>
              <Image
                src={PRIMARY_IMAGE}
                alt=""
                fill
                className={styles.primaryImage}
                sizes="(max-width: 1920px) 100vw, 620px"
              />
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.secondaryFrame}>
              <Image
                src={SECONDARY_IMAGE}
                alt=""
                fill
                className={styles.secondaryImage}
                sizes="(max-width: 1720px) 100vw, 960px"
              />
            </div>

            <p className={styles.body}>{mockTreatmentsPage.intro_body}</p>

            <Button href="/treatments" color="var(--color-blue-100)">
              Explore Treatments
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
