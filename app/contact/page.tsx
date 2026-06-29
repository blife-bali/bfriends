import type { Metadata } from "next";
import Contact from "./Contact";
import { mockContactPage } from "@/mock/contact";

export const metadata: Metadata = {
  title: mockContactPage.seo_title,
  description: mockContactPage.seo_description,
};

export default function ContactPage() {
  return <Contact />;
}
