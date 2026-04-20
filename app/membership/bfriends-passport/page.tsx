import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import PassportContent from "@/app/membership/bfriends-passport/PassportContent";
import styles from "./BfriendsPassport.module.css";
import { getPageSeo, getMembershipContent, getPageHeader } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("bfriends-passport");
  return {
    title: seo.seo_title || "The Passport | BFriends Membership",
    description: seo.seo_description || "Unlock full access to the BFriends wellness ecosystem — fitness, recovery, therapy, and beauty programs with The Passport membership.",
  };
}

const DEFAULT_HEADER = {
  breadcrumb: "Membership / The Passport",
  title: "The Passport",
  image: "/images/hero-test.png",
};

export default async function BFriendsPassportPage() {
  const [membershipContent, pageHeader] = await Promise.all([
    getMembershipContent(),
    getPageHeader("bfriends-passport"),
  ]);

  const passportWhy = (membershipContent as any[]).find((r) => r.section_key === "passport_why");

  return (
    <>
      <PageHeader
        breadcrumb={pageHeader?.breadcrumb || DEFAULT_HEADER.breadcrumb}
        title={pageHeader?.title || DEFAULT_HEADER.title}
        image={pageHeader?.image || DEFAULT_HEADER.image}
      />
      <main className={styles.page}>
        <PassportContent
          philosophyCopy={passportWhy?.body}
        />
      </main>
    </>
  );
}
