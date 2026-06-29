import Image from "next/image";
import type { JourneyPartnerTeam } from "@/mock/journey-partners";
import styles from "./JourneyPartners.module.css";

interface JourneyPartnersProps {
  teams: JourneyPartnerTeam[];
}

export default function JourneyPartners({ teams }: JourneyPartnersProps) {
  return (
    <div className={styles.list}>
      {teams.map((team, index) => (
        <TeamRow key={team.id} team={team} index={index} />
      ))}
    </div>
  );
}

function TeamRow({ team, index }: { team: JourneyPartnerTeam; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      className={`${styles.row} ${reversed ? styles.rowReversed : ""}`}
      aria-labelledby={`team-${team.id}-title`}
    >
      <div className={styles.media}>
        <Image
          src={team.image}
          alt={team.image_alt}
          fill
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>

      <div className={styles.copy}>
        <h2 id={`team-${team.id}-title`} className={styles.title}>
          {team.title}
        </h2>
        <p className={styles.body}>{team.body}</p>
      </div>
    </section>
  );
}
