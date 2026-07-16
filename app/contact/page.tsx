import type { Metadata } from "next";
import Contact from "./Contact";
import { getContactPage } from "@/lib/supabase-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {
    title: page.seo_title,
    description: page.seo_description,
  };
}

export default async function ContactPage() {
  const page = await getContactPage();
  return <Contact page={page} />;
}
