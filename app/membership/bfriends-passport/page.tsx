import PageHeader from "@/components/PageHeader/PageHeader";
import PassportContent from "@/app/membership/bfriends-passport/PassportContent";
import styles from "./BfriendsPassport.module.css";

const PAGE_HEADER = {
  breadcrumb: "Membership / The Passport",
  title: "The Passport",
  image: "/images/hero-test.png",
};

export default function BFriendsPassportPage() {
  return (
    <>
      <PageHeader
        breadcrumb={PAGE_HEADER.breadcrumb}
        title={PAGE_HEADER.title}
        image={PAGE_HEADER.image}
      />
      <main className={styles.page}>
        <PassportContent />
      </main>
    </>
  );
}
