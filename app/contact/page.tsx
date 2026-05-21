import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import Contact from "./Contact";
import { mockContactPage } from "@/mock/contact";

export const metadata: Metadata = {
  title: mockContactPage.seo_title,
  description: mockContactPage.seo_description,
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title={mockContactPage.header_title}
        subtitle={mockContactPage.header_subtitle}
        image={mockContactPage.header_image}
      />
      <Contact />
    </main>
  );
}
