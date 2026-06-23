import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { mockFacilitiesPage } from "@/mock/facilities";
import styles from "./Section.module.css";

const PRIMARY_IMAGE = "/images/Nurture/DDK09034.webp";
const SECONDARY_IMAGE = "/images/Integrate/DDK09193.webp";

export default function FriendsSection() {
  return (
    <section className={styles.section} aria-label="BFriends facilities">
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.leftCol}>
            <h2 className={styles.title}>{mockFacilitiesPage.header_title}</h2>

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

            <p className={styles.body}>{mockFacilitiesPage.intro_body}</p>

            <Button href="/facilities" color="var(--color-blue-100)">
              Explore Facilities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
