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

/** Theoretical framework (e.g. Find, Fit, Flow). */
export interface ProgramPillar {
  title: string;
  description: string;
}

/** Actual class or treatment (e.g. Functional Training). */
export interface ProgramSession {
  title: string;
  description: string;
  /** Path to session image for visual cards. */
  image?: string;
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
  /** Swiss editorial: breadcrumb, pillars (framework), sessions (curriculum), prev/next program slug */
  breadcrumb?: string;
  pillars?: ProgramPillar[];
  sessions?: ProgramSession[];
  previousProgram?: string;
  nextProgram?: string;
  /** Dedicated section images (immersive visuals) */
  philosophyImage?: string;
  pillarsImage?: string;
  /** Images for sticky philosophy section (vertical scroll) */
  philosophyImages?: string[];
  /** Images for Bento grid placeholders and gallery marquee */
  galleryImages?: string[];
}

export const programsData: ProgramData[] = [
  {
    letter: "F",
    name: "Fitness",
    eyebrow: "F · Fitness",
    title: "Intentional movement and body awareness",
    subheading: "Basement | Functional training and guided strength",
    image: "/images/Fitness/DDK09594.webp",
    buttonLabel: "Discover Fitness",
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
        title: "Fitness",
        desc: "We remove tension and restore natural rhythm, so movement feels focused, strong, and effortless.",
      },
    ],
    philosophy:
      "Training isn't about pushing harder—it's about moving more precisely. Exercise shouldn't be something you endure, but something you move into with confidence.",
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
    philosophyImage: "/images/Fitness/DDK09605.webp",
    pillarsImage: "/images/Fitness/DDK09685.webp",
    philosophyImages: [
      "/images/Fitness/DDK09605.webp",
      "/images/Fitness/DDK09685.webp",
      "/images/Fitness/DDK09740.webp",
    ],
    galleryImages: [
      "/images/Fitness/DDK09791.webp",
      "/images/Fitness/DDK09821.webp",
      "/images/Fitness/DDK09881.webp",
      "/images/Fitness/DDK09605.webp",
      "/images/Fitness/DDK09685.webp",
    ],
    pillars: [
      { title: "Find", description: "Using Fittrix & InBody, we pinpoint exactly what your body needs—clearly and precisely." },
      { title: "Fit", description: "Your Journey Partner designs your routine with accuracy—movement patterns, intensity, and frequency." },
      { title: "Fitness", description: "We remove tension and restore natural rhythm, so movement feels focused, strong, and effortless." },
    ],
    sessions: [
      { title: "Functional Training", description: "Realign your spine and pelvis, boost joint mobility, and strengthen your core.", image: "/images/Fitness/DDK09594.webp" },
      { title: "Ignite", description: "Structured heart-rate and breath work to enhance metabolic efficiency.", image: "/images/Fitness/DDK09740.webp" },
      { title: "Sculpt", description: "Enhance hip and leg balance while toning your body for a defined look.", image: "/images/Fitness/DDK09791.webp" },
      { title: "Sport Performance", description: "Analyze sport-specific movements to improve power, balance, and responsiveness.", image: "/images/Fitness/DDK09821.webp" },
    ],
    breadcrumb: "Programs / Fitness",
    previousProgram: "dare",
    nextProgram: "restore",
  },
  {
    letter: "R",
    name: "Restore",
    eyebrow: "R · Restore",
    title: "Rest and recovery through nourishment",
    subheading: "1st Floor | BCafé, a place to pause and recharge",
    image: "/images/Restore/DDK09897.webp",
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
    philosophyImage: "/images/Restore/DDK00016.webp",
    pillarsImage: "/images/Restore/DDK00062.webp",
    philosophyImages: [
      "/images/Restore/DDK00016.webp",
      "/images/Restore/DDK00062.webp",
      "/images/Restore/DDK09897.webp",
    ],
    galleryImages: [
      "/images/Restore/DDK09929.webp",
      "/images/Restore/DDK09935.webp",
      "/images/Restore/DDK09994.webp",
      "/images/Restore/DDK00016.webp",
      "/images/Restore/DDK09897.webp",
    ],
    pillars: [
      { title: "Recovery", description: "Choices that support post-workout restoration." },
      { title: "Nourishment", description: "A refined balance of taste and nutrition." },
      { title: "Connection", description: "A lounge experience you can truly settle into." },
    ],
    sessions: [
      {
        title: "Signature Kimbap",
        description:
          "Hand-rolled Korean kimbap crafted for post-workout nourishment—balanced, savory, and light enough to keep you moving.",
        image: "/images/Restore/DDK09897.webp",
      },
      {
        title: "Healthy Breakfast",
        description:
          "Warm, comforting breakfast plates built on whole ingredients to gently refuel the body at the start of your day.",
        image: "/images/Restore/DDK09929.webp",
      },
      {
        title: "Dessert Menu",
        description:
          "Thoughtfully portioned desserts that satisfy the craving while staying aligned with your broader wellness goals.",
        image: "/images/Restore/DDK09935.webp",
      },
      {
        title: "Korean Cheong x Jamu",
        description:
          "Heritage-inspired concentrates and tonics, marrying Korean Cheong and Indonesian Jamu for restorative daily sips.",
        image: "/images/Restore/DDK09994.webp",
      },
    ],
    breadcrumb: "Programs / Restore",
    previousProgram: "fitness",
    nextProgram: "integrate",
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
    philosophyImage: "/images/programs/I.png",
    pillarsImage: "/images/programs/I.png",
    philosophyImages: [
      "/images/programs/I.png",
      "/images/programs/I.png",
      "/images/programs/I.png",
    ],
    galleryImages: [
      "/images/programs/I.png",
      "/images/programs/I.png",
      "/images/programs/I.png",
      "/images/programs/I.png",
      "/images/programs/I.png",
    ],
    pillars: [
      { title: "Assess", description: "We analyze movement restrictions to identify root causes, not just symptoms." },
      { title: "Release", description: "Using manual techniques to unlock tension and restore range of motion." },
      { title: "Realign", description: "Guiding your body back to optimal alignment for long-term resilience." },
    ],
    sessions: [
      { title: "Manual Physiotherapy", description: "Hands-on manipulation to relieve acute pain and improve joint mobility.", image: "/images/programs/I.png" },
      { title: "Postural Correction", description: "Targeted adjustments to fix imbalances caused by daily habits.", image: "/images/programs/I.png" },
      { title: "Sports Recovery", description: "Deep tissue work designed to flush metabolic waste and accelerate repair.", image: "/images/programs/I.png" },
      { title: "Injury Rehabilitation", description: "Clinical protocols to safely guide you from injury back to full-strength.", image: "/images/programs/I.png" },
    ],
    breadcrumb: "Programs / Integrate",
    previousProgram: "restore",
    nextProgram: "enhance",
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
    philosophyImage: "/images/programs/E.jpg",
    pillarsImage: "/images/programs/E.jpg",
    philosophyImages: [
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
    ],
    galleryImages: [
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
      "/images/programs/E.jpg",
    ],
    pillars: [
      { title: "Analyze", description: "K-Standard diagnostics to understand your unique dermal profile." },
      { title: "Revitalize", description: "Premium actives and technology to refine texture and tone." },
      { title: "Protect", description: "Strengthening the skin barrier to lock in results." },
    ],
    sessions: [
      { title: "K-Glow Facial", description: "The signature multi-step treatment for deep hydration and glass-skin finish.", image: "/images/programs/E.jpg" },
      { title: "Skin Boosters", description: "Nutrient-rich micro-infusions designed to plump and hydrate.", image: "/images/programs/E.jpg" },
      { title: "Face Contouring", description: "Non-surgical lifting techniques to define the jawline.", image: "/images/programs/E.jpg" },
      { title: "Advanced Laser", description: "Precision light therapy to target pigmentation and resurface texture.", image: "/images/programs/E.jpg" },
    ],
    breadcrumb: "Programs / Enhance",
    previousProgram: "integrate",
    nextProgram: "nurture",
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
    philosophyImage: "/images/programs/N.webp",
    pillarsImage: "/images/programs/N.webp",
    philosophyImages: [
      "/images/programs/N.webp",
      "/images/programs/N.webp",
      "/images/programs/N.webp",
    ],
    galleryImages: [
      "/images/programs/N.webp",
      "/images/programs/N.webp",
      "/images/programs/N.webp",
      "/images/programs/N.webp",
      "/images/programs/N.webp",
    ],
    pillars: [
      { title: "Ground", description: "Practices that center your nervous system and reduce cortisol." },
      { title: "Breathe", description: "Guided breathwork to expand capacity and mental clarity." },
      { title: "Connect", description: "Community-based wellness that fosters emotional resilience." },
    ],
    sessions: [
      { title: "Sound Healing", description: "Vibrational therapy to restore cellular harmony.", image: "/images/programs/N.webp" },
      { title: "Guided Meditation", description: "Structured mental conditioning for focus and calm.", image: "/images/programs/N.webp" },
      { title: "Somatic Release", description: "Body-based techniques to release stored emotional tension.", image: "/images/programs/N.webp" },
      { title: "Wellness Workshops", description: "Interactive sessions on sleep, nutrition, and stress management.", image: "/images/programs/N.webp" },
    ],
    breadcrumb: "Programs / Nurture",
    previousProgram: "enhance",
    nextProgram: "dare",
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
      "The 'Dare Beyond' is where wellness leads to growth. We take the strength you've built in the Fitness program and put it to the test through curated challenges and competitive events.",
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
    philosophyImage: "/images/programs/D.webp",
    pillarsImage: "/images/programs/D.webp",
    philosophyImages: [
      "/images/programs/D.webp",
      "/images/programs/D.webp",
      "/images/programs/D.webp",
    ],
    galleryImages: [
      "/images/programs/D.webp",
      "/images/programs/D.webp",
      "/images/programs/D.webp",
      "/images/programs/D.webp",
      "/images/programs/D.webp",
    ],
    pillars: [
      { title: "Challenge", description: "Testing your new baseline against real-world demands." },
      { title: "Community", description: "Competing and collaborating with a tribe that pushes you forward." },
      { title: "Breakthrough", description: "Shattering perceived limits to set a new personal standard." },
    ],
    sessions: [
      { title: "Outdoor Expeditions", description: "Nature-based endurance challenges.", image: "/images/programs/D.webp" },
      { title: "BFriends Games", description: "Community-wide competitive fitness events.", image: "/images/programs/D.webp" },
      { title: "Endurance Challenges", description: "Long-format stamina tests for advanced members.", image: "/images/programs/D.webp" },
      { title: "Skill Masterclasses", description: "Intensive workshops on advanced movement techniques.", image: "/images/programs/D.webp" },
    ],
    breadcrumb: "Programs / Dare",
    previousProgram: "nurture",
    nextProgram: "fitness",
  },
];
