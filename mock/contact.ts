import { BOOK_NOW_URL, WHATSAPP_URL } from "@/lib/site-contact";

export type MockContactPlatform = {
  id: "whatsapp" | "zenoti" | "instagram";
  label: string;
  href: string;
};

export type MockContactHoursEntry = {
  label?: string;
  text: string;
};

export type MockContactHoursSection = {
  title: string;
  entries: MockContactHoursEntry[];
};

export type MockContactPage = {
  seo_title: string;
  seo_description: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  location_name: string;
  address: string;
  map_href: string;
  hours_sections: MockContactHoursSection[];
  platforms: MockContactPlatform[];
};

export const mockContactPage: MockContactPage = {
  seo_title: "Contact | BFriends Bali",
  seo_description:
    "Reach the BFriends team in Kerobokan for visits, treatments, and wellness journeys — WhatsApp, Zenoti booking, and Instagram.",
  title: "Begin Your Wellness Journey",
  description:
    "Whether you're planning your first visit, exploring our treatments, or looking for the right wellness journey, our team is here to help. Reach out through your preferred platform below, and we'll be happy to assist you.",
  image: "/images/connection.webp",
  image_alt: "BFriends wellness destination in Kerobokan, Bali",
  location_name: "BFriends",
  address:
    "Jl. Teuku Umar Barat No.989x, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80117",
  map_href:
    "https://www.google.com/maps/search/?api=1&query=Jl.%20Teuku%20Umar%20Barat%20No.989x%2C%20Kerobokan%20Kelod%2C%20Kec.%20Kuta%20Utara%2C%20Kabupaten%20Badung%2C%20Bali%2080117",
  hours_sections: [
    {
      title: "Guest Services",
      entries: [{ text: "Daily, 7:00 AM – 10:00 PM WITA" }],
    },
    {
      title: "Additional Operational Hours",
      entries: [
        { label: "Spa Treatments", text: "Daily, 10:00 AM – 10:00 PM WITA" },
        { label: "Yoga & Fitness Center", text: "Daily, 8:00 AM – 7:00 PM WITA" },
      ],
    },
  ],
  platforms: [
    { id: "whatsapp", label: "WhatsApp", href: WHATSAPP_URL },
    { id: "zenoti", label: "Zenoti", href: BOOK_NOW_URL },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/bfriends.bali?igsh=dXg3ZWZmZzM2dXIw",
    },
  ],
};
