import PageHeader from "@/components/PageHeader/PageHeader";
import CharmContent from "./CharmContent";
import styles from "./Charm.module.css";

const PAGE_HEADER = {
  breadcrumb: "Membership / The Charm",
  title: "Charm Credits",
  image: "/images/hero-test.png",
};

export default function CharmPage() {
  return (
    <>
      <PageHeader
        breadcrumb={PAGE_HEADER.breadcrumb}
        title={PAGE_HEADER.title}
        image={PAGE_HEADER.image}
      />
      <main className={styles.page}>
        <CharmContent />
      </main>
    </>
  );
}
