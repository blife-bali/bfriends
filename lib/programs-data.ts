export interface ProgramStep {
  id: string;
  title: string;
  desc: string;
}

export interface ProgramItem {
  title: string;
  desc: string;
  icon: string;
}

export interface ProgramData {
  letter: string;
  name: string;
  eyebrow: string;
  title: string;
  subheading: string;
  image: string;
  buttonLabel: string;
  /** Page content: quote, steps, philosophy, program items */
  quote?: string;
  steps?: ProgramStep[];
  philosophy?: string;
  programItems?: ProgramItem[];
  /** Images for sticky philosophy section (vertical scroll) */
  philosophyImages?: string[];
  /** Images for Bento grid placeholders and gallery marquee */
  galleryImages?: string[];
}

export const programsData: ProgramData[] = [
  {
    letter: "F",
    name: "Flow",
    eyebrow: "F · Flow",
    title: "Intentional movement and body awareness",
    subheading: "Basement | Functional training and guided strength",
    image: "/images/programs/F.jpg",
    buttonLabel: "Discover Flow",
    quote:
      "The moment you read your body with precision, your workout becomes truly yours.",
    steps: [
      {
        id: "01",
        title: "Find",
        desc: "Using Fittrix & InBody, we pinpoint exactly what your body needs—clearly and precisely.",
      },
      {
        id: "02",
        title: "Fit",
        desc: "Your Journey Partner designs your routine with accuracy—movement patterns, intensity, and frequency.",
      },
      {
        id: "03",
        title: "Flow",
        desc: "We remove tension and restore natural rhythm, so movement feels focused and effortless.",
      },
    ],
    philosophy:
      "Training isn't about pushing harder—it's about moving more precisely. Exercise shouldn't be something you endure, but something you flow into.",
    programItems: [
      {
        title: "Functional Training",
        desc: "Realign your spine and pelvis, boost joint mobility, and strengthen your core.",
        icon: "Activity",
      },
      {
        title: "Ignite",
        desc: "Structured heart-rate and breath work to enhance metabolic efficiency.",
        icon: "Flame",
      },
      {
        title: "Sculpt",
        desc: "Enhance hip and leg balance while toning your body for a defined look.",
        icon: "Dumbbell",
      },
      {
        title: "Sport Performance",
        desc: "Analyze sport-specific movements to improve power, balance, and responsiveness.",
        icon: "Trophy",
      },
    ],
    philosophyImages: [
      "/images/programs/flow-philosophy-1.jpg",
      "/images/programs/flow-philosophy-2.jpg",
      "/images/programs/flow-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/flow-gallery-1.jpg",
      "/images/programs/flow-gallery-2.jpg",
      "/images/programs/flow-gallery-3.jpg",
      "/images/programs/flow-gallery-4.jpg",
      "/images/programs/flow-gallery-5.jpg",
    ],
  },
  {
    letter: "R",
    name: "Restore",
    eyebrow: "R · Restore",
    title: "Rest and recovery through nourishment",
    subheading: "1st Floor | BCafé, a place to pause and recharge",
    image: "/images/programs/R.webp",
    buttonLabel: "Discover Restore",
    quote:
      "Recovery isn't about stopping—it's the moment your body and energy reconnect.",
    steps: [
      {
        id: "01",
        title: "Recovery",
        desc: "Choices that support post-workout restoration.",
      },
      {
        id: "02",
        title: "Nourishment",
        desc: "A refined balance of taste and nutrition.",
      },
      {
        id: "03",
        title: "Connection",
        desc: "A lounge experience you can truly settle into.",
      },
    ],
    philosophy:
      "B-FRIENDS Café is a space designed to restore energy. With purpose-built blends and a calm atmosphere, your body and mind naturally return to a state of recovery.",
    programItems: [
      {
        title: "Signature Smoothies",
        desc: "Purpose-designed wellness blends aligned with your Flow.",
        icon: "CupSoda",
      },
      {
        title: "Clean Nutrition",
        desc: "Comforting, satisfying meals—crafted for higher nutritional density.",
        icon: "UtensilsCrossed",
      },
      {
        title: "Specialty Coffee",
        desc: "High-quality coffee, served in a space that turns rest into a routine.",
        icon: "Coffee",
      },
      {
        title: "Korean Cheong x Jamu",
        desc: "Tradition, reinterpreted—crafted into a modern wellness tea ritual.",
        icon: "Flower2",
      },
    ],
    philosophyImages: [
      "/images/programs/restore-philosophy-1.jpg",
      "/images/programs/restore-philosophy-2.jpg",
      "/images/programs/restore-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/restore-gallery-1.jpg",
      "/images/programs/restore-gallery-2.jpg",
      "/images/programs/restore-gallery-3.jpg",
      "/images/programs/restore-gallery-4.jpg",
      "/images/programs/restore-gallery-5.jpg",
    ],
  },
  {
    letter: "I",
    name: "Integrate",
    eyebrow: "I · Integrate",
    title: "Therapeutic body care rooted in professional practice",
    subheading: "2nd Floor | Treatments designed to support balance and recovery",
    image: "/images/programs/I.png",
    buttonLabel: "Discover Integrate",
    quote:
      "True strength isn't just building muscle; it's maintaining the structure that supports it.",
    steps: [
      {
        id: "01",
        title: "Assess",
        desc: "We analyze movement restrictions to identify root causes, not just symptoms.",
      },
      {
        id: "02",
        title: "Release",
        desc: "Using manual techniques to unlock tension and restore range of motion.",
      },
      {
        id: "03",
        title: "Realign",
        desc: "Guiding your body back to optimal alignment for long-term resilience.",
      },
    ],
    philosophy:
      "Pain is a signal, not a lifestyle. We integrate clinical precision with holistic recovery to build a structural foundation that allows you to perform without hesitation.",
    programItems: [
      {
        title: "Manual Physiotherapy",
        desc: "Hands-on manipulation to relieve acute pain and improve joint mobility.",
        icon: "HandMetal",
      },
      {
        title: "Postural Correction",
        desc: "Targeted adjustments to fix imbalances caused by daily habits.",
        icon: "AlignVerticalSpaceAround",
      },
      {
        title: "Sports Recovery",
        desc: "Deep tissue work designed to flush metabolic waste and accelerate repair.",
        icon: "HeartPulse",
      },
      {
        title: "Injury Rehabilitation",
        desc: "Clinical protocols to safely guide you from injury back to full-strength.",
        icon: "Stethoscope",
      },
    ],
    philosophyImages: [
      "/images/programs/integrate-philosophy-1.jpg",
      "/images/programs/integrate-philosophy-2.jpg",
      "/images/programs/integrate-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/integrate-gallery-1.jpg",
      "/images/programs/integrate-gallery-2.jpg",
      "/images/programs/integrate-gallery-3.jpg",
      "/images/programs/integrate-gallery-4.jpg",
      "/images/programs/integrate-gallery-5.jpg",
    ],
  },
  {
    letter: "E",
    name: "Enhance",
    eyebrow: "E · Enhance",
    title: "Science led K-Beauty spa care",
    subheading: "3rd Floor | Supporting skin health with clarity and trust",
    image: "/images/programs/E.jpg",
    buttonLabel: "Discover Enhance",
    quote:
      "Confidence begins when your outer radiance mirrors your inner vitality.",
    steps: [
      {
        id: "01",
        title: "Analyze",
        desc: "K-Standard diagnostics to understand your unique dermal profile.",
      },
      {
        id: "02",
        title: "Revitalize",
        desc: "Premium actives and technology to refine texture and tone.",
      },
      {
        id: "03",
        title: "Protect",
        desc: "Strengthening the skin barrier to lock in results.",
      },
    ],
    philosophy:
      "Beauty at BFriends is about health, not coverage. We combine K-Beauty protocols with dermatological science to establish a routine that keeps your skin vibrant for the long run.",
    programItems: [
      {
        title: "K-Glow Facial",
        desc: "The signature multi-step treatment for deep hydration and glass-skin finish.",
        icon: "Sparkles",
      },
      {
        title: "Skin Boosters",
        desc: "Nutrient-rich micro-infusions designed to plump and hydrate.",
        icon: "Droplets",
      },
      {
        title: "Face Contouring",
        desc: "Non-surgical lifting techniques to define the jawline.",
        icon: "ScanFace",
      },
      {
        title: "Advanced Laser",
        desc: "Precision light therapy to target pigmentation and resurface texture.",
        icon: "Waves",
      },
    ],
    philosophyImages: [
      "/images/programs/enhance-philosophy-1.jpg",
      "/images/programs/enhance-philosophy-2.jpg",
      "/images/programs/enhance-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/enhance-gallery-1.jpg",
      "/images/programs/enhance-gallery-2.jpg",
      "/images/programs/enhance-gallery-3.jpg",
      "/images/programs/enhance-gallery-4.jpg",
      "/images/programs/enhance-gallery-5.jpg",
    ],
  },
  {
    letter: "N",
    name: "Nurture",
    eyebrow: "N · Nurture",
    title: "Yoga and barre for breath, alignment, and inner balance",
    subheading: "4th Floor | A space to slow down and turn inward",
    image: "/images/programs/N.webp",
    buttonLabel: "Discover Nurture",
    quote:
      "Wellness is a dialogue between your mind and your body. We teach you how to listen.",
    steps: [
      {
        id: "01",
        title: "Ground",
        desc: "Practices that center your nervous system and reduce cortisol.",
      },
      {
        id: "02",
        title: "Breathe",
        desc: "Guided breathwork to expand capacity and mental clarity.",
      },
      {
        id: "03",
        title: "Connect",
        desc: "Community-based wellness that fosters emotional resilience.",
      },
    ],
    philosophy:
      "In a high-pace world, Nurture is your pause button. It is the practice of intentional softness—giving your mind the same level of care and training as your muscles.",
    programItems: [
      {
        title: "Sound Healing",
        desc: "Vibrational therapy to restore cellular harmony.",
        icon: "Music",
      },
      {
        title: "Guided Meditation",
        desc: "Structured mental conditioning for focus and calm.",
        icon: "Brain",
      },
      {
        title: "Somatic Release",
        desc: "Body-based techniques to release stored emotional tension.",
        icon: "Heart",
      },
      {
        title: "Wellness Workshops",
        desc: "Interactive sessions on sleep, nutrition, and stress management.",
        icon: "Users",
      },
    ],
    philosophyImages: [
      "/images/programs/nurture-philosophy-1.jpg",
      "/images/programs/nurture-philosophy-2.jpg",
      "/images/programs/nurture-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/nurture-gallery-1.jpg",
      "/images/programs/nurture-gallery-2.jpg",
      "/images/programs/nurture-gallery-3.jpg",
      "/images/programs/nurture-gallery-4.jpg",
      "/images/programs/nurture-gallery-5.jpg",
    ],
  },
  {
    letter: "D",
    name: "Dare",
    eyebrow: "D · Dare",
    title: "Climbing that invites focus, courage, and gentle challenge",
    subheading: "Wallclimbing | Growth through mindful movement",
    image: "/images/programs/D.webp",
    buttonLabel: "Discover Dare",
    quote:
      "Growth only happens at the edge of your comfort zone. It's time to step over.",
    steps: [
      {
        id: "01",
        title: "Challenge",
        desc: "Testing your new baseline against real-world demands.",
      },
      {
        id: "02",
        title: "Community",
        desc: "Competing and collaborating with a tribe that pushes you forward.",
      },
      {
        id: "03",
        title: "Breakthrough",
        desc: "Shattering perceived limits to set a new personal standard.",
      },
    ],
    philosophy:
      "The 'Dare Beyond' is where wellness leads to growth. We take the strength you've built in the Flow and put it to the test through curated challenges and competitive events.",
    programItems: [
      {
        title: "Outdoor Expeditions",
        desc: "Nature-based endurance challenges.",
        icon: "Mountain",
      },
      {
        title: "BFriends Games",
        desc: "Community-wide competitive fitness events.",
        icon: "Medal",
      },
      {
        title: "Endurance Challenges",
        desc: "Long-format stamina tests for advanced members.",
        icon: "Timer",
      },
      {
        title: "Skill Masterclasses",
        desc: "Intensive workshops on advanced movement techniques.",
        icon: "Target",
      },
    ],
    philosophyImages: [
      "/images/programs/dare-philosophy-1.jpg",
      "/images/programs/dare-philosophy-2.jpg",
      "/images/programs/dare-philosophy-3.jpg",
    ],
    galleryImages: [
      "/images/programs/dare-gallery-1.jpg",
      "/images/programs/dare-gallery-2.jpg",
      "/images/programs/dare-gallery-3.jpg",
      "/images/programs/dare-gallery-4.jpg",
      "/images/programs/dare-gallery-5.jpg",
    ],
  },
];
