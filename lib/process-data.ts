export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

export const processData: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Precision Measurement",
    description: "Let's get a clear picture of where you are. We use advanced tools to understand your unique starting point, ensuring your journey begins with accuracy and a solid foundation for growth.",
    image: "/images/programs/D.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Expert Interpretation",
    description: "Data is just the beginning; insight is what moves you forward. Our professionals break down your results into actionable knowledge, helping you understand your body's needs with total clarity.",
    image: "/images/programs/E.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Personalized Program Design",
    description: "No generic templates here—this is all about you. We craft a vibrant, custom roadmap that aligns with your specific goals and lifestyle, making your path to wellness feel natural and exciting.",
    image: "/images/programs/F.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Elite Coaching Experience",
    description: "World-class guidance every step of the way. Our elite coaches provide high-energy support and technical expertise to help you perform at your best and stay motivated.",
    image: "/images/programs/I.png",
  },
  {
    id: 5,
    number: "05",
    title: "Journey Partner Support",
    description: "You're never walking this path alone. Our community and support staff act as your dedicated partners, offering warm encouragement and social connection needed to keep your energy high.",
    image: "/images/programs/N.webp",
  },
  {
    id: 6,
    number: "06",
    title: "Progress Tracking",
    description: "Celebrate every win as you go. We continuously monitor your evolution, adjusting your plan in real-time to ensure you are always moving toward a more active, connected, and lively version of yourself.",
    image: "/images/programs/R.webp",
  },
];
