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
    description: "We start with a precise 'Reading'—gathering the data needed to understand your body's baseline.",
    subpoints: [
      {
        title: "Movement Reading",
        description: "An objective analysis of your structural alignment and functional efficiency.",
      },
      {
        title: "Body Composition Scan",
        description: "A detailed breakdown of your physical makeup to set a measurable starting point.",
      },
      {
        title: "Skin Imaging",
        description: "Deep-layer assessment to reveal your skin's vitality beyond the surface level.",
      },
    ],
    image: "/images/programs/D.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Assess",
    description:
      "Our Journey Partners translate your data into a clear narrative, identifying the specific rhythms and priorities your body needs to return to its peak state.",
    image: "/images/programs/E.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Design",
    description:
      "We curate your unique FRIEND Flow. Your program is layered across structure, recovery, and intensity, custom-fit to your goals and current condition.",
    image: "/images/programs/F.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Coach",
    description:
      "Transformation requires precision. We guide you through the BFriends method, ensuring every movement and therapy is executed with high-standard intention.",
    image: "/images/programs/I.png",
  },
  {
    id: 5,
    number: "05",
    title: "Track",
    description:
      "Progress is never left to chance. We continuously record and review your response to the flow, ensuring consistency becomes a measurable habit.",
    image: "/images/programs/N.webp",
  },
  {
    id: 6,
    number: "06",
    title: "Refine",
    description:
      "As your body evolves, so does your plan. We recalibrate your routine to ensure your journey remains safe, efficient, and aligned with your growing capability.",
    image: "/images/programs/R.webp",
  },
];
