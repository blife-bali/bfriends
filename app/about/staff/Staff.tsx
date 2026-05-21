import Image from "next/image";
import type { MockStaffMember } from "@/mock/staff";
import styles from "./Staff.module.css";

interface StaffProps {
  members: MockStaffMember[];
}

export default function Staff({ members }: StaffProps) {
  return (
    <ul className={styles.grid}>
      {members.map((member) => (
        <li key={member.id}>
          <article className={styles.card}>
            <div className={styles.media}>
              {member.image ? (
                <Image
                  src={member.image}
                  alt=""
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 45vw, 220px"
                />
              ) : (
                <div className={styles.imagePlaceholder} aria-hidden>
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <div className={styles.copy}>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.sub}>{member.sub}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
