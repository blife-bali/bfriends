import PillarCard from "./pillar-card/PillarCard";
import styles from "./ThreePillars.module.css";

type Pillar = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
};

const PILLARS: Pillar[] = [
  {
    image: "/images/Integrate/DDK09278.webp",
    imageAlt: "Exterior of the BFriends signature building in Kerobokan, Bali",
    title: "About BFriends",
    description: "(to be writing soon)",
    buttonLabel: "Explore BFriends →",
    href: "/facilities",
  },
  {
    image: "/images/Nurture/DDK09121.webp",
    imageAlt: "BFriends journey partners guiding a wellness experience",
    title: "Meet Our Experts",
    description:
      "Behind every personalized journey is a multidisciplinary team dedicated to understanding, guiding, and supporting your wellness goals.",
    buttonLabel: "Meet the Journey Partners →",
    href: "/journey-partners",
  },
  {
    image: "/images/connection.webp",
    imageAlt: "Map of Bali showing BFriends and Daewoong business units",
    title: "The BProject",
    description:
      "Discover the integrated wellness ecosystem developed by Bali Daewoong, bringing together hospitality, workspace, wellness, and lifestyle destinations under one vision.",
    buttonLabel: "Explore Our Destinations →",
  },
];

export default function ThreePillars() {
  return (
    <section className={styles.section} aria-label="Explore BFriends">
      <div className={styles.grid}>
        {PILLARS.map((pillar, index) => (
          <PillarCard
            key={pillar.title}
            index={index + 1}
            image={pillar.image}
            imageAlt={pillar.imageAlt}
            title={pillar.title}
            description={pillar.description}
            buttonLabel={pillar.buttonLabel}
            href={pillar.href}
          />
        ))}
      </div>
    </section>
  );
}
