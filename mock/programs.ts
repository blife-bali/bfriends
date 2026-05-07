export type MockProgramGeneral = {
  name: string;
  slug: string;
  sort_order: number;
  title: string;
  subheading: string;
  button_label: string;
  book_now_button: boolean;
  image: string;
};

export type MockProgramIntro = {
  title: string;
  sub: string;
};

export type MockProgramSeo = {
  seo_title: string;
  seo_description: string;
};

export type MockProgramFramework = {
  image: string | null;
  title: string;
  sub: string;
};

export type MockProgramSession = {
  image: string | null;
  name: string;
  extra: string;
  desc: string;
};

export type MockProgramSessionGroup = {
  name: string;
  sessions: MockProgramSession[];
};

export type MockProgram = {
  general: MockProgramGeneral;
  seo: MockProgramSeo;
  intro: MockProgramIntro;
  framework: MockProgramFramework;
  sessions_group: MockProgramSessionGroup[];
};

export const mockSpaPrograms: MockProgram[] = [
  {
    general: {
      name: "Spa",
      slug: "Spa",
      sort_order: 2,
      title: "Therapeutic body care rooted in professional practice",
      subheading: "2nd Floor | Treatments designed to support balance and recovery",
      button_label: "Discover Spa",
      book_now_button: true,
      image: "https://storageb.awancode.com/1776919776304_DDK09585.webp",
    },
    seo: {
      seo_title: "Integrate Therapies | BFriends Bali",
      seo_description:
        "Therapeutic body care including manual physiotherapy, postural correction, sports recovery, and injury rehabilitation at BFriends Kerobokan.",
    },
    intro: {
      title: "Integrate Your Body",
      sub: "True recovery begins when the body is understood, not simply treated.",
    },
    framework: {
      image: "/images/Integrate/DDK09193.webp",
      title: "The six layers",
      sub: "At B-FRIENDS, our Signature Body Rituals are guided by a structured six-layer approach, with each layer addressing a distinct physical or neurological aspect of the body. Through professional assessment and intentional progression, every ritual supports balance, recovery, and long-term physical resilience.\n\nThese six healing layers form the foundation of our body rituals - a seamless journey from surface renewal to profound rest",
    },
    sessions_group: [
      {
        name: "BFriends Signature Body Rituals",
        sessions: [
          {
            image: "/images/Integrate/DDK09278.webp",
            name: "Body Alignment Therapy",
            extra: "IDR 750K | 90 Minutes",
            desc:
              "Structural realignment ritual focused on posture, mobility, and muscular balance.",
          },
          {
            image: "/images/Integrate/DDK09396.webp",
            name: "Body Mask",
            extra: "IDR 440K | 30 Minutes",
            desc: "Nourishing body wrap to restore skin softness while calming surface tension.",
          },
          {
            image: "/images/Integrate/DDK09558.webp",
            name: "Body Scrub",
            extra: "IDR 440K | 30 Minutes",
            desc: "Exfoliating ritual that removes dull buildup and refreshes overall skin texture.",
          },
          {
            image: "/images/Integrate/DDK09585.webp",
            name: "Core & Gut Harmony",
            extra: "IDR 300K | 30 Minutes",
            desc: "Targeted abdominal care designed to support digestion, breathing, and core stability.",
          },
          {
            image: "/images/Integrate/DDK09278.webp",
            name: "Deep Circulation Flow",
            extra: "IDR 770K | 90 Minutes",
            desc: "Circulation-focused bodywork to stimulate flow and reduce heaviness through the limbs.",
          },
          {
            image: "/images/Integrate/DDK09396.webp",
            name: "Deep Rest Therapy",
            extra: "IDR 600K | 60 Minutes",
            desc: "Slow, grounding ritual to settle the nervous system and promote deep physical rest.",
          },
          {
            image: "/images/Integrate/DDK09558.webp",
            name: "Foot Massage",
            extra: "IDR 440K | 60 Minutes",
            desc: "Pressure-point based foot therapy that relieves fatigue and resets whole-body comfort.",
          },
          {
            image: "/images/Integrate/DDK09585.webp",
            name: "Kids Massage",
            extra: "IDR 550K | 60 Minutes",
            desc: "Gentle child-friendly massage tailored for relaxation, comfort, and safe body awareness.",
          },
          {
            image: "/images/Integrate/DDK09278.webp",
            name: "Korean Body Scrub",
            extra: "IDR 770K | 60 Minutes",
            desc: "Traditional Korean full-body exfoliation ritual for smoother skin and renewed circulation.",
          },
          {
            image: "/images/Integrate/DDK09396.webp",
            name: "Youth Rejuvenation",
            extra: "IDR 800K | 90 Minutes",
            desc: "Comprehensive restorative ritual that combines renewal, circulation, and relaxation.",
          },
        ],
      },
    ],
  },
  {
    general: {
      name: "Face and Hair Rituals",
      slug: "Beauty",
      sort_order: 3,
      title: "Science led K-Beauty spa care",
      subheading: "Supporting skin health with clarity and trust",
      button_label: "Discover Beauty",
      book_now_button: true,
      image: "https://storageb.awancode.com/1776919824555_DDK00418.webp",
    },
    seo: {
      seo_title: "Enhance K-Beauty Spa | BFriends Bali",
      seo_description:
        "Science-led K-Beauty spa care with facials, skin boosters, face contouring, and advanced laser treatments at BFriends Kerobokan.",
    },
    intro: {
      title: "Enhance Your Natural Beauty",
      sub: "Beauty feels most natural when it begins with balance and healthy restoration.",
    },
    framework: {
      image: "https://storageb.awancode.com/1776919856596_DDK00601.webp",
      title: "The six layers",
      sub: "At B-FRIENDS, our Beauty Rituals follow a structured six-layer approach, with each layer supporting a different skin and scalp need. Through careful analysis and intentional progression, every session is designed to improve clarity, resilience, and long-term skin health.\n\nThese six beauty layers create a seamless ritual journey - from deep cleansing and repair to calm restoration and lasting radiance.",
    },
    sessions_group: [
      {
        name: "BFriends Facial Treatments",
        sessions: [
          {
            image: "/images/Enhance/DDK00316.webp",
            name: "Glass Glow",
            extra: "IDR 1200K | 80 Minutes",
            desc: "Radiance-focused facial to refine tone, texture, and luminosity with Korean skin prep.",
          },
          {
            image: "/images/Enhance/DDK00330.webp",
            name: "Sculpt Lift",
            extra: "IDR 1100K | 90 Minutes",
            desc: "Lifting facial ritual that sculpts contours and releases facial tension.",
          },
          {
            image: "/images/Enhance/DDK00433.webp",
            name: "Hydra Infusion",
            extra: "IDR 770K | 60 Minutes",
            desc: "Deep hydration treatment to restore barrier health and skin comfort.",
          },
          {
            image: "/images/Enhance/DDK00316.webp",
            name: "Pore Refine",
            extra: "IDR 770K | 60 Minutes",
            desc: "Gentle pore-refining care to reduce congestion and smooth texture.",
          },
          {
            image: "/images/Enhance/DDK00330.webp",
            name: "Sun Soothe",
            extra: "IDR 550K | 40 Minutes",
            desc: "Cooling recovery facial to calm overheated or sun-exposed skin.",
          },
        ],
      },
      {
        name: "BFriends Scalp & Hair Rituals",
        sessions: [
          {
            image: "/images/Enhance/DDK00316.webp",
            name: "Scalp Clarity Ritual",
            extra: "| 45 Minutes",
            desc: "Purifying scalp ritual to cleanse buildup and rebalance scalp condition.",
          },
          {
            image: "/images/Enhance/DDK00330.webp",
            name: "Hair Strength Therapy",
            extra: "| 70 Minutes",
            desc: "Targeted scalp and hair therapy to strengthen roots and improve vitality.",
          },
          {
            image: "/images/Enhance/DDK00433.webp",
            name: "Deep Rest Ritual",
            extra: "| 60 Minutes",
            desc: "Head-focused calming ritual to release stress and encourage deep relaxation.",
          },
        ],
      },
    ],
  },
  {
    general: {
      name: "Wellness Movement and Fitness",
      slug: "fitness",
      sort_order: 4,
      title: "Intentional movement and body awareness",
      subheading: "Basement | Functional training and guided strength.",
      button_label: "Discover Fitness",
      book_now_button: true,
      image: "/uploads/1776847191820_DDK09881.webp",
    },
    seo: {
      seo_title: "Fitness Program | BFriends Bali",
      seo_description:
        "Intentional movement and body awareness through functional training, guided strength, and personalized fitness routines at BFriends Kerobokan.",
    },
    intro: {
      title: "Find Your Flow",
      sub: "Wellbeing is not built through intensity alone, but through conscious movement, balance, and consistency",
    },
    framework: {
      image: "/images/Nurture/DDK09034.webp",
      title: "The movement layers",
      sub: "At B-FRIENDS, our Wellness Movement sessions are designed through a structured movement-layer approach, where each class supports a different physical and mental dimension - from mobility and strength to breath, focus, and nervous-system regulation. Through progressive guidance and conscious practice, each session helps your body move better and recover smarter.\n\nThese movement layers build a complete foundation for daily vitality - a continuous journey from activation and alignment to calm resilience.",
    },
    sessions_group: [
      {
        name: "wellness movement",
        sessions: [
          {
            image: "/images/Nurture/DDK09021.webp",
            name: "Essential Class - Yoga",
            extra: "60 | 75 minutes",
            desc: "A foundational yoga class to improve flexibility, stability, and mindful breath awareness.",
          },
          {
            image: "/images/Nurture/DDK09078.webp",
            name: "Signature Class - Barre",
            extra: "50 minutes",
            desc: "An energizing Barre and Dance-inspired class for posture, control, and functional strength.",
          },
          {
            image: "/images/Nurture/DDK09005.webp",
            name: "Group Class",
            extra: "50 minutes",
            desc: "Shared movement training that restores strength, mobility, and breath flow in a small group.",
          },
          {
            image: "/images/Nurture/DDK09152.webp",
            name: "Workshops",
            extra: "90 | 120 minutes",
            desc: "Specialty sessions exploring breathwork, meditation, and sound-based restoration.",
          },
          {
            image: "/images/Nurture/kidsyoga.jpeg",
            name: "Kids Yoga",
            extra: "45 minutes",
            desc: "A joyful class for children to build focus, coordination, and confidence through movement.",
          },
        ],
      },
      {
        name: "fitness",
        sessions: [
          {
            image: "/images/Fitness/DDK09685.webp",
            name: "Private Training - Single Session",
            extra: "50 Minutes | 1/3/5/10 Sessions",
            desc:
              "A private guided movement session to restore balance, build strength, and improve functional conditioning.",
          },
          {
            image: "/images/Fitness/DDK09821.webp",
            name: "Group Class",
            extra: "50 Minutes | 1/3/5/10 Sessions",
            desc:
              "A shared movement session designed to build strength, mobility, and breath-led flow in an intimate group.",
          },
        ],
      },
    ],
  },
  {
    general: {
      name: "Climbing",
      slug: "Climbing",
      sort_order: 5,
      title: "Climbing that invites focus, courage, and gentle challenge",
      subheading: "Wallclimbing | Growth through mindful movement",
      button_label: "Discover Climbing",
      book_now_button: false,
      image: "/images/programs/D.webp",
    },
    seo: {
      seo_title: "Dare Wall Climbing | BFriends Bali",
      seo_description:
        "Wall climbing, outdoor expeditions, BFriends Games, and endurance challenges - growth through mindful movement at BFriends Kerobokan.",
    },
    intro: {
      title: "Dare to Be You",
      sub: "Growth begins when we move beyond what feels familiar.",
    },
    framework: {
      image: "/images/programs/D.webp",
      title: "Wellness Climbing",
      sub: "At B-FRIENDS Climbing, movement becomes a journey of challenge, focus, and self-discovery. Designed for both beginners and experienced climbers, the space encourages individuals to build confidence, resilience, and body awareness through intentional movement and playful exploration.\n\nMore than a physical activity, climbing becomes a meaningful experience of overcoming limits, trusting oneself, and rediscovering the joy of progress, one step at a time.",
    },
        
    sessions_group: [
      {
        name: "Signature Sessions",
        sessions: [
          {
            image: "/images/programs/D.webp",
            name: "Outdoor Expeditions",
            extra: "60 Minutes",
            desc: "Nature-based endurance challenges.",
          },
          {
            image: "/images/programs/D.webp",
            name: "BFriends Games",
            extra: "75 Minutes",
            desc: "Community-wide competitive fitness events.",
          },
          {
            image: "/images/programs/D.webp",
            name: "Endurance Challenges",
            extra: "90 Minutes",
            desc: "Long-format stamina tests for advanced members.",
          },
          {
            image: "/images/programs/D.webp",
            name: "Skill Masterclasses",
            extra: "60 Minutes",
            desc: "Intensive workshops on advanced movement techniques.",
          },
        ],
      },
    ],
  },
  {
    general: {
      name: "Cafe",
      slug: "Cafe",
      sort_order: 7,
      title: "Rest and recovery through nourishment",
      subheading: "1st Floor | BCafe, a place to pause and recharge",
      button_label: "Discover Cafe",
      book_now_button: false,
      image: "https://storageb.awancode.com/1776919921903_DDK00062.webp",
    },
    seo: {
      seo_title: "Restore Cafe | BFriends Bali",
      seo_description:
        "Rest and recover through nourishment at BCafe - signature smoothies, clean nutrition, specialty coffee, and Korean Cheong x Jamu in Kerobokan.",
    },
    intro: {
      title: "Restore Your Energy",
      sub: "Wellness continues beyond movement and treatment, extending into the way we nourish, recover, and reconnect throughout the day.",
      
    },
    framework: {
      image: "https://storageb.awancode.com/1776919921903_DDK00062.webp",
      title: "Wellness Cafe",
      sub: "At B-FRIENDS Cafe, every menu is thoughtfully designed to support balance and everyday wellbeing. Inspired by Korean wellness culture and natural ingredients, the cafe offers wholesome meals, restorative drinks, and comforting flavors that feel both nourishing and familiar.\n\nMore than a dining space, the cafe serves as a place to pause, recharge, and connect, where recovery happens not only through the body, but also through conversation, atmosphere, and shared moments.",
    },
    sessions_group: [
      {
        name: "Signature Sessions",
        sessions: [
          {
            image: "/images/Restore/DDK09897.webp",
            name: "Signature Kimbap",
            extra: "Contact for price | 60 Minutes",
            desc:
              "Hand-rolled Korean kimbap crafted for post-workout nourishment-balanced, savory, and light enough to keep you moving.",
          },
          {
            image: "/images/Restore/DDK09929.webp",
            name: "Healthy Breakfast",
            extra: "Contact for price | 75 Minutes",
            desc:
              "Warm, comforting breakfast plates built on whole ingredients to gently refuel the body at the start of your day.",
          },
          {
            image: "/images/Restore/DDK09935.webp",
            name: "Dessert Menu",
            extra: "Contact for price | 90 Minutes",
            desc:
              "Thoughtfully portioned desserts that satisfy the craving while staying aligned with your broader wellness goals.",
          },
          {
            image: "/images/Restore/DDK09994.webp",
            name: "Korean Cheong x Jamu",
            extra: "Contact for price | 60 Minutes",
            desc:
              "Heritage-inspired concentrates and tonics, marrying Korean Cheong and Indonesian Jamu for restorative daily sips.",
          },
        ],
      },
    ],
  },
];
