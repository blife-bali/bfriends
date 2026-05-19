import { NextResponse } from "next/server";
import { getEcosystemItems } from "@/lib/cms";
import { getEcosystemHref } from "@/lib/site-ecosystem-links";

export async function GET() {
  try {
    const items = await getEcosystemItems();
    const links = (items as Array<{ name: string; url?: string | null }>)
      .map((item) => {
        const href = getEcosystemHref(item.name, item.url);
        if (!href) return null;
        return { name: item.name, href };
      })
      .filter((item): item is { name: string; href: string } => item !== null);

    return NextResponse.json(links);
  } catch (error) {
    console.error("Public ecosystem GET error:", error);
    return NextResponse.json({ error: "Failed to fetch ecosystem items" }, { status: 500 });
  }
}
