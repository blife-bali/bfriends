import styles from "./SiteLocation.module.css";

/** Embedded map and band above the site footer (home & philosophy only). */
export default function SiteLocation() {
  return (
    <section className={styles.locationSection} aria-label="BFriends location">
      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.123456789!2d115.1769167!3d-8.6737222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2470066210b17:0xc0f7dfddf84e65e1!2sBFriends!5e0!3m2!1sen!2sid!4v1699999999999"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.map}
          title="BFriends on Google Maps"
        />
      </div>
    </section>
  );
}
