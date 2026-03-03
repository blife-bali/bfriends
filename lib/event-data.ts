export type EcosystemTag =
  | "BLive"
  | "Bwork"
  | "BNesta"
  | "BFriends"
  | "Alam Kulkul"
  | "Nulook";

export interface EventItem {
  id: string;
  slug: string;
  index: number;
  name: string;
  ecosystem: EcosystemTag;
  date: string;
  time: string;
  text: string;
  image: string;
}

export const eventData: EventItem[] = [
  {
    id: "1",
    slug: "spring-wellness-workshop",
    index: 1,
    name: "Spring Wellness Workshop",
    ecosystem: "BFriends",
    date: "Mar 15, 2025",
    time: "09:00 AM",
    image: "/images/programs/D.webp",
    text: `Join us for a morning of mindful movement and expert-led sessions on seasonal wellness.

This immersive workshop combines yoga, meditation, and nutritional guidance to help you transition seamlessly into the new season. Our instructors will guide you through practices designed to align your body and mind with the energy of spring.

Whether you're new to wellness or looking to deepen your practice, this workshop offers something for everyone. You'll leave feeling refreshed, grounded, and ready to embrace the months ahead.`,
  },
  {
    id: "2",
    slug: "community-open-house",
    index: 2,
    name: "Community Open House",
    ecosystem: "BFriends",
    date: "Feb 28, 2025",
    time: "02:00 PM",
    image: "/images/programs/E.jpg",
    text: `Experience BFriends—tour the space, meet the team, and enjoy complimentary sessions.

Discover our facilities including yoga studios, meditation gardens, and treatment rooms. Our team will be on hand to answer questions about memberships, classes, and integrated wellness programs.

This is the perfect opportunity to see what makes BFriends unique and to connect with others in the community. Light refreshments will be served.`,
  },
  {
    id: "3",
    slug: "mindful-leadership-retreat",
    index: 3,
    name: "Mindful Leadership Retreat",
    ecosystem: "BFriends",
    date: "Apr 5, 2025",
    time: "10:00 AM",
    image: "/images/programs/D.webp",
    text: `A half-day retreat for leaders seeking clarity and presence.

Blend meditation, breathwork, and peer dialogue in a serene setting. This retreat is designed to help you step back from the daily grind and reconnect with your purpose and vision.

You'll leave with practical tools for bringing mindfulness into your leadership style and creating calmer, more focused teams.`,
  },
  {
    id: "4",
    slug: "sound-bath-restorative-yoga",
    index: 4,
    name: "Sound Bath & Restorative Yoga",
    ecosystem: "BFriends",
    date: "Apr 12, 2025",
    time: "03:00 PM",
    image: "/images/programs/E.jpg",
    text: `Unwind with crystal bowls and gentle restorative poses.

Perfect for releasing tension and restoring balance. Our sound bath sessions use carefully selected instruments to create waves of sound that support deep relaxation and inner quiet.

No experience is necessary—just bring yourself and a willingness to rest. Mats and props are provided.`,
  },
  {
    id: "5",
    slug: "family-wellness-day",
    index: 5,
    name: "Family Wellness Day",
    ecosystem: "BFriends",
    date: "Apr 20, 2025",
    time: "09:30 AM",
    image: "/images/programs/D.webp",
    text: `A day of activities for all ages: family yoga, nature walks, and healthy cooking demos.

Connect and recharge together. We've designed this day so that children and adults can participate in shared and age-appropriate activities, all centered on wellness and connection.

Spaces are limited, so we recommend registering in advance. Bring the whole family and leave feeling closer and more energized.`,
  },
  {
    id: "6",
    slug: "sunset-meditation-series",
    index: 6,
    name: "Sunset Meditation Series",
    ecosystem: "BFriends",
    date: "May 3, 2025",
    time: "06:00 PM",
    image: "/images/programs/E.jpg",
    text: `Weekly outdoor meditation as the sun sets.

No experience needed—just an open mind and comfortable seating. Each session is guided and lasts about 45 minutes, giving you time to wind down and transition from day to evening.

Dress in layers; we'll provide blankets if needed. The series runs through the warmer months.`,
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return eventData.find((e) => e.slug === slug);
}
