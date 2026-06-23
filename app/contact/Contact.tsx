import Link from "next/link";
import { mockContactLocations, mockContactPage } from "@/mock/contact";
import Form from "./form/Form";
import styles from "./Contact.module.css";

function ContactLocationColumn({
  location,
}: {
  location: (typeof mockContactLocations)[number];
}) {
  const channels = [...location.channels].sort((a, b) => a.sort_order - b.sort_order);
  const whatsapp = channels.find((c) => c.id === "whatsapp");

  return (
    <article className={styles.locationColumn}>
      <h3 className={styles.locationName}>{location.name}</h3>
      <address className={styles.address}>
        {location.address_lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span className={styles.cityLine}>
          {location.city_line}
          {" — "}
          <Link
            href={location.map_href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            {location.map_label}
          </Link>
        </span>
      </address>
      <ul className={styles.channelList}>
        {channels
          .filter((c) => c.id !== "whatsapp")
          .map((channel) => (
            <li key={channel.id}>
              <Link href={channel.href} className={styles.channelLink}>
                {channel.value}
              </Link>
            </li>
          ))}
      </ul>
      {location.show_whatsapp_button && whatsapp && (
        <Link
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          WhatsApp
        </Link>
      )}
      {location.hours_sections && location.hours_sections.length > 0 && (
        <div className={styles.hoursGroup}>
          {location.hours_sections.map((section) => (
            <div key={section.title} className={styles.hoursBlock}>
              <p className={styles.hoursTitle}>{section.title}</p>
              {section.entries.map((entry) => (
                <p
                  key={entry.label ? `${entry.label}-${entry.text}` : entry.text}
                  className={styles.hoursLine}
                >
                  {entry.label ? (
                    <>
                      <span className={styles.hoursLabel}>{entry.label}</span>
                      <br />
                      {entry.text}
                    </>
                  ) : (
                    entry.text
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Contact() {
  return (
    <div className={styles.page}>
      <section className={styles.formBlock} aria-labelledby="contact-form-heading">
        <div className={styles.formInner}>
          <h2 id="contact-form-heading" className={styles.sectionHeading}>
            {mockContactPage.form_heading}
          </h2>
          <p className={styles.sectionSub}>{mockContactPage.form_sub}</p>
          <Form />
        </div>
      </section>

      <section className={styles.details} aria-label="BLife ecosystem contact details">
        <div className={styles.detailsInner}>
          {mockContactLocations.map((location) => (
            <ContactLocationColumn key={location.id} location={location} />
          ))}
        </div>
      </section>
    </div>
  );
}
