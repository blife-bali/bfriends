import type { Metadata } from "next";
import { type DbRow } from '@/lib/db';
import PageHeader from "@/components/PageHeader/PageHeader";
import PassportContent from "@/app/membership/bfriends-passport/PassportContent";
import styles from "./BfriendsPassport.module.css";
import { getPageSeo, getMembershipContent, resolvePageHeader, getPassportBenefits } from "@/lib/cms";

export const dynamic = "force-dynamic";

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
  const [membershipContent, header, benefits] = await Promise.all([
    getMembershipContent(),
    resolvePageHeader("bfriends-passport", DEFAULT_HEADER),
    getPassportBenefits(),
  ]);

  const passportWhy = (membershipContent as DbRow[]).find((r) => r.section_key === "passport_why");

  return (
    <>
      <PageHeader
        breadcrumb={header.breadcrumb}
        title={header.title}
        image={header.image}
        subtitle={header.description ?? undefined}
      />
      <main className={styles.page}>
        <PassportContent
          philosophyCopy={passportWhy?.body}
          benefits={benefits}
        />
      </main>
    </>
  );
}
