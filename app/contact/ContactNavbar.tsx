import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./ContactNavbar.module.css";

export default function ContactNavbar() {
  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.homeLink}>
        <ArrowLeft className={styles.homeIcon} size={18} strokeWidth={1.75} aria-hidden />
        Home
      </Link>

      <Link href="/" className={styles.logoLink} aria-label="BFriends home">
        <Image
          src="/images/icons/logo-default.svg"
          alt="BFriends"
          width={120}
          height={40}
          className={styles.logo}
          priority
        />
      </Link>
    </header>
  );
}
