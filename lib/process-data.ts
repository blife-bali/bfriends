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
    description: "We start with data—not assumptions.",
    subpoints: [
      {
        title: "Movement Reading",
        description: "Identify movement patterns, alignment, and functional efficiency.",
      },
      {
        title: "Body Composition Scan",
        description: "Establish a clear baseline of your current condition.",
      },
      {
        title: "Skin Imaging",
        description: "Assess skin condition in depth—beyond what the eye can see.",
      },
    ],
    image: "/images/programs/D.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Assess",
    description:
      "Data doesn't stay as numbers. Our expert team translates it into clear priorities and direction—so you know what matters most, and why.",
    image: "/images/programs/E.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Design",
    description:
      "Based on the assessment, we design what you need most. Your FRIEND Flow is customized across structure, intensity, and frequency—aligned to your goals and current state.",
    image: "/images/programs/F.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Coach",
    description:
      "A plan only works when execution is precise. We coach standards and method—so the plan becomes outcomes, and wellness becomes a routine you can sustain.",
    image: "/images/programs/I.png",
  },
  {
    id: 5,
    number: "05",
    title: "Track",
    description:
      "We record, review, and check every stage of the journey. So progress isn't left to feeling—it's guided by patterns, consistency, and measurable change.",
    image: "/images/programs/N.webp",
  },
  {
    id: 6,
    number: "06",
    title: "Refine",
    description:
      "We update your routine based on condition and response. Safer. More efficient. More precise—so you move closer to your goal with every cycle.",
    image: "/images/programs/R.webp",
  },
];
