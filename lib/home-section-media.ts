import pool from "@/lib/db";

export const HOME_PAGE = "home";

/** Hero background image is stored on the intro row (`image_url`). */
export async function getHomeIntroRow() {
  const [rows] = await pool.execute(
    "SELECT * FROM bfriends_intro_sections WHERE page = ? ORDER BY sort_order LIMIT 1",
    [HOME_PAGE]
  );
  const items = rows as Record<string, unknown>[];
  return items.length > 0 ? items[0] : null;
}

/** Intro section video is stored on the hero row (`video_url`). */
export async function getHomeHeroRow() {
  const [rows] = await pool.execute(
    "SELECT * FROM bfriends_hero_sections WHERE page = ? ORDER BY sort_order LIMIT 1",
    [HOME_PAGE]
  );
  const items = rows as Record<string, unknown>[];
  return items.length > 0 ? items[0] : null;
}

export async function getHomeHeroImageUrl(): Promise<string | null> {
  const intro = await getHomeIntroRow();
  return (intro?.image_url as string | null) ?? null;
}

export async function getHomeIntroVideoUrl(): Promise<string | null> {
  const hero = await getHomeHeroRow();
  return (hero?.video_url as string | null) ?? null;
}

export async function updateHomeHeroImage(imageUrl: string | null): Promise<void> {
  const intro = await getHomeIntroRow();
  const introId = intro?.id;
  if (typeof introId !== "number") {
    throw new Error("Home intro section not found");
  }

  await pool.execute(
    "UPDATE bfriends_intro_sections SET image_url = ? WHERE id = ?",
    [imageUrl || null, introId]
  );
}

export async function updateHomeIntroVideo(videoUrl: string | null): Promise<void> {
  const hero = await getHomeHeroRow();
  const heroId = hero?.id;
  if (typeof heroId !== "number") {
    throw new Error("Home hero section not found");
  }

  await pool.execute(
    "UPDATE bfriends_hero_sections SET video_url = ? WHERE id = ?",
    [videoUrl || null, heroId]
  );
}

/** Merge intro.image_url into hero admin responses. */
export function withHeroImageField<T extends Record<string, unknown>>(
  hero: T,
  imageUrl: string | null
): T & { image_url: string | null } {
  return { ...hero, image_url: imageUrl };
}

/** Merge hero.video_url into intro admin responses. */
export function withIntroVideoField<T extends Record<string, unknown>>(
  intro: T,
  videoUrl: string | null
): T & { video_url: string | null } {
  return { ...intro, video_url: videoUrl };
}
