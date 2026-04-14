export interface ProcessSubpoint {
  title: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  /** Optional sub-points (e.g. for Measure step) */
  subpoints?: ProcessSubpoint[];
  image: string;
}

export const processSectionTitle = "The BFriends System";
export const processSectionIntro =
  "An expert-driven, data-led system integrated into a routine and validated by results.";

export const processData: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Measure",
    description:
      "Our 'Reading' process gathers the essentials to start the healing journey for ever lasting wellness.",
    subpoints: [
      {
        title: "Movement Reading",
        description:
          "A way to analyze your alignment to restore the balance and functional efficiency.",
      },
      {
        title: "Body Composition Scan",
        description:
          "A detailed breakdown of your physical makeup to guide your personal recovery journey.",
      },
      {
        title: "Skin Imaging",
        description:
          "Deep-layer assessment to heal your vitality and freshness beyond the surface.",
      },
    ],
    image: "/images/Fitness/DDK09594.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Assess",
    description:
      "Our Journey Partners will translate your measurement into clear steps, identifying the balance way and priorities your health needs to return to its wellness.",
    image: "/images/Integrate/DDK09193.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Design",
    description:
      "We illustrate your unique healing FRIEND Fitness flow. Your steps is layered into structure, recovery, and intensity, specific only to your wellness and current condition.",
    image: "/images/Enhance/DDK00330.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Teacher/Coach/Guides",
    description:
      "Recovery requires detailed steps. We guide you through the BFriends steps, ensuring every healing and balance steps is prepared with high-standard intention.",
    image: "/images/Restore/DDK00016.webp",
  },
  {
    id: 5,
    number: "05",
    title: "Track",
    description:
      "Progress has never left to chance. We continuously keep, hold, and review your healing response to the fitness flow, ensuring balance and wellness becomes a daily habit.",
    image: "/images/Integrate/DDK09558.jpg",
  },
  {
    id: 6,
    number: "06",
    title: "Refine",
    description:
      "As your body improves, your plans too. We adjust your routine to ensure your journey remains a safe, enjoyable and achievable one, in line with your continually developing capability.",
    image: "/images/Enhance/DDK00601.jpg",
  },
];
