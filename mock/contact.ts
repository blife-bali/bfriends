export type MockContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  sort_order: number;
};

export type MockContactHoursEntry = {
  label?: string;
  text: string;
};

export type MockContactHoursSection = {
  title: string;
  entries: MockContactHoursEntry[];
};

export type MockContactLocationColumn = {
  id: string;
  name: string;
  address_lines: string[];
  city_line: string;
  map_label: string;
  map_href: string;
  channels: MockContactChannel[];
  hours_sections?: MockContactHoursSection[];
  show_whatsapp_button?: boolean;
};

export type MockContactPage = {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  header_title: string;
  header_image: string;
  header_subtitle: string;
  form_heading: string;
  form_sub: string;
  form_success_title: string;
  form_success_text: string;
  connect_heading: string;
  connect_sub: string;
};

export const mockContactPage: MockContactPage = {
  seo_title: "Contact | BFriends Bali",
  seo_description:
    "Reach the BFriends team in Kerobokan for programme questions, membership, visits, and general enquiries.",
  breadcrumb: "Contact",
  header_title: "Contact",
  header_image: "/images/connection.webp",
  header_subtitle:
    "Whether you are planning a visit, exploring a programme, or curious about membership — send us a note and we will point you in the right direction.",
  form_heading: "Message the team",
  form_sub:
    "Tell us what you are looking for. We read every message and reply during guest services hours.",
  form_success_title: "Message received",
  form_success_text:
    "Thanks — someone from BFriends will be in touch soon. For anything urgent, call or WhatsApp us directly.",
  connect_heading: "Follow along",
  connect_sub: "Programmes, community moments, and what is happening at our Kerobokan home.",
};

/** Left → center → right on the contact details band */
export const mockContactLocations: MockContactLocationColumn[] = [
  {
    id: "daewoong",
    name: "Daewoong Bio Indonesia",
    address_lines: [
      "Jl. Science Timur 1, Blok A5D No.7",
      "Jababeka Phase 5, Sertajaya",
    ],
    city_line: "Cikarang Timur, Bekasi 17530, Indonesia",
    map_label: "Map",
    map_href:
      "https://www.google.com/maps/search/?api=1&query=Jl.+Science+Timur+1+Blok+A5D+Jababeka+Cikarang+Timur+Bekasi",
    channels: [
      {
        id: "phone",
        label: "Phone",
        value: "+62 21 3972 1100",
        href: "tel:+622139721100",
        sort_order: 0,
      },
      {
        id: "email",
        label: "Email",
        value: "dpi.info@daewoong.co.kr",
        href: "mailto:dpi.info@daewoong.co.kr",
        sort_order: 1,
      },
    ],
  },
  {
    id: "bfriends",
    name: "BFriends",
    address_lines: ["Jl. Teuku Umar Barat No.989x", "Kerobokan Kelod, Kec. Kuta Utara"],
    city_line: "Kabupaten Badung, Bali 80117, Indonesia",
    map_label: "Map",
    map_href:
      "https://www.google.com/maps/search/?api=1&query=Jl.%20Teuku%20Umar%20Barat%20No.989x%2C%20Kerobokan%20Kelod%2C%20Kec.%20Kuta%20Utara%2C%20Kabupaten%20Badung%2C%20Bali%2080117",
    channels: [
      {
        id: "phone",
        label: "Phone",
        value: "+62 811-2874-2021",
        href: "tel:+6281128742021",
        sort_order: 0,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: "+62 811-2874-2021",
        href: "https://wa.me/6281128742021",
        sort_order: 1,
      },
      {
        id: "email",
        label: "Email",
        value: "hello@bfriends.id",
        href: "mailto:hello@bfriends.id",
        sort_order: 2,
      },
    ],
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
    show_whatsapp_button: true,
  },
  {
    id: "alam-kulkul",
    name: "Alam Kulkul",
    address_lines: ["Jl. Pantai Kuta", "Legian"],
    city_line: "Bali 80361, Indonesia",
    map_label: "Map",
    map_href: "https://goo.gl/maps/7poTXV7dMbpBS6WE9",
    channels: [
      {
        id: "phone",
        label: "Reservations",
        value: "+62 361 752 520",
        href: "tel:+62361752520",
        sort_order: 0,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: "+62 811 3900 6900",
        href: "https://wa.me/6281139006900",
        sort_order: 1,
      },
      {
        id: "email",
        label: "Email",
        value: "info@alamkulkul.com",
        href: "mailto:info@alamkulkul.com",
        sort_order: 2,
      },
    ],
  },
];
