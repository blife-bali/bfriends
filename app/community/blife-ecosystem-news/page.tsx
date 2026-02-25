import PageHeader from "@/components/PageHeader/PageHeader";

const PAGE_HEADER = {
  title: "BLife Ecosystem News",
  subtitle: "Stories and updates from our community.",
  image: "/images/hero-test.png",
};

export default function BLifeEcosystemNewsPage() {
  return (
    <>
      <PageHeader title={PAGE_HEADER.title} subtitle={PAGE_HEADER.subtitle} image={PAGE_HEADER.image} />
      <main style={{ padding: "8rem 2rem 4rem", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-blue-80)", lineHeight: 1.7 }}>
          Content coming soon.
        </p>
      </main>
    </>
  );
}
