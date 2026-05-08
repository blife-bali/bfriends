export type MockProgramGeneral = {
  name: string;
  slug: string;
  sort_order: number;
  title: string;
  subheading: string;
  button_label: string;
  book_now_button: boolean;
  image: string;
  video: string;
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
      subheading:
        "Guided by professional expertise, our therapeutic bodywork and restorative care support physical resilience and mental clarity. Experience a seamless journey from surface renewal to profound rest through structured, intentional treatments.",
      button_label: "Discover Spa",
      book_now_button: true,
      image: "https://storageb.awancode.com/1776919776304_DDK09585.webp",
      video: "/videos/BFriends2.mp4",
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
            name: "Layer 1 - Korean Body Scrub",
            extra: "IDR 770K | 60 Minutes",
            desc:
              "This authentic Korean seshin exfoliation removes surface buildup to stimulate healthy skin renewal. Rhythmic movements and precise techniques improve circulation and refine texture, leaving your skin perfectly prepped for subsequent treatments.",
          },
          {
            name: "Layer 1 - Body Scrub",
            extra: "IDR 440K | 30 Minutes",
            desc: "A gentle exfoliation designed to soften skin texture and support healthy renewal by removing surface buildup. Flowing movements and refined scrub techniques effectively stimulate your circulation.",
          },
          {
            name: "Layer 2 - Youth Rejuvenation",
            extra: "IDR 800K | 90 Minutes",
            desc: "This anti-aging body ritual uses targeted micro-stimulation and ampoule care to improve firmness and elasticity. It conditions the skin to provide subtle, long-lasting resilience and renewal.",
          },
          {
            name: "Layer 3 - Deep Circulation Flow",
            extra: "IDR 770K | 90 Minutes",
            desc: "Guided by anatomical pathways, this therapy uses intentional pressure to enhance microcirculation and natural lymphatic drainage. It effectively releases stagnation and heaviness, allowing for gentle physical recovery.",
          },
          {
            name: "Layer 4 - Body Alignment Therapy",
            extra: "IDR 750K | 90 Minutes",
            desc: "Beginning with an AI-supported posture analysis, this treatment identifies muscular asymmetry and alignment issues. Targeted therapy then releases myofascial tension at its source to restore structural alignment and efficient movement.",
          },
          {
            name: "Layer 5 - Core & Gut Harmony",
            extra: "IDR 300K | 30 Minutes",
            desc: "This focused abdominal therapy utilizes breath awareness and warm stones to release core tension. It helps guide the body into a rest-and-digest state, restoring energetic and physical balance to your center.",
          },
          {
            name: "Layer 6 - Deep Rest Therapy",
            extra: "IDR 600K | 60 Minutes",
            desc: "A personalized relaxation ritual that uses aroma, sound, and gentle touch to calm an overactive nervous system. This deeply restful experience settles the body and quiets the mind without overstimulation.",
          },
        ],
      },
      {
        name: "Body Therapies",
        sessions: [
          {
            name: "Kids Massage",
            extra: "IDR 550K | 60 Minutes",
            desc: "A soothing, gentle massage specifically tailored to help children ease tension. It encourages relaxation and supports healthy rest in a comforting environment.",
          },
          {
            name: "Body Mask (Add-On)",
            extra: "IDR 440K | 30 Minutes",
            desc: "A deeply hydrating and replenishing body treatment. The warming nourishment restores skin suppleness while you rest, leaving the body quietly radiant.",
          },
          {
            name: "Foot Massage",
            extra: "IDR 440K | 60 Minutes",
            desc: "This soothing therapy relieves tired legs and feet by improving circulation and releasing tension. It provides a deeply grounding and relaxing experience.",
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
      subheading:
        "Experience targeted care designed to refine, lift, and deeply restore your natural luminosity using advanced methodologies. Paired with purifying scalp therapies, these head-focused rituals relieve stored stress and support long-term vitality.",
      button_label: "Discover Beauty",
      book_now_button: true,
      image: "https://storageb.awancode.com/1776919824555_DDK00418.webp",
      video: "/videos/BFriends2.mp4",
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
            name: "Glass Glow",
            extra: "IDR 1200K | 80 Minutes",
            desc: "A radiance-enhancing facial that refines tone, texture, and luminosity using Vitamin C, micro-needling, and Korean ampoules. The complexion is left softly plumped with a clear, glass-like finish and minimal recovery time.",
          },
          {
            name: "Sculpt Lift",
            extra: "IDR 1100K | 90 Minutes",
            desc: "A lifting-focused facial that utilizes signature sculpting techniques, alongside RF and EMS technology, to rebalance muscles and refine natural contours. This elevated ritual is completed with a relaxing shampooing experience.",
          },
          {
            name: "Hydra Infusion",
            extra: "IDR 770K | 60 Minutes",
            desc: "An intensive hydration treatment that restores weakened barriers using repair-focused skincare, targeted ampoules, and ultrasound care. The skin is left calm, deeply hydrated, and balanced with lasting moisture retention.",
          },
          {
            name: "Pore Refine",
            extra: "IDR 770K | 60 Minutes",
            desc: "A refining facial that addresses congestion and blackheads using gentle, low-stress extraction techniques. Concluding with calming hydration, the complexion is left visibly smoother, clearer, and refreshed.",
          },
          {
            name: "Sun Soothe",
            extra: "IDR 550K | 40 Minutes",
            desc: "A deeply soothing facial designed to cool and calm sun-exposed skin using refined techniques and Korean repair skincare. The complexion is left feeling refreshed, quiet, and gently restored.",
          },
        ],
      },
      {
        name: "BFriends Scalp & Hair Rituals",
        sessions: [
          {
            name: "Scalp Clarity Ritual",
            extra: "| 45 Minutes",
            desc: "A purifying ritual designed to deeply cleanse and rebalance by removing buildup, excess oil, and impurities. This restorative process optimizes the scalp environment to support long-term vitality and healthy hair growth.",
          },
          {
            name: "Hair Strength Therapy",
            extra: "| 70 Minutes",
            desc: "A targeted restorative therapy created to strengthen weakened follicles and encourage healthier, fuller-looking hair. Specialized techniques and nourishing actives stimulate circulation to support natural hair regeneration.",
          },
          {
            name: "Deep Rest Ritual",
            extra: "| 60 Minutes",
            desc: "A profoundly calming, head-focused therapy crafted to quiet the nervous system and encourage deep relaxation. Gentle rhythmic techniques melt away mental fatigue, leaving you feeling centered, grounded, and fully restored.",
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
      subheading:
        "Reconnect with your body through intentional, breath-led flow and functional conditioning in our dedicated movement space. From foundational yoga to tailored private training, these practices are designed to cultivate dynamic balance and physical vitality.",
      button_label: "Discover Fitness",
      book_now_button: true,
      image: "/uploads/1776847191820_DDK09881.webp",
      video: "/videos/BFriends2.mp4",
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
            name: "Essential Class - Yoga",
            extra: "60 | 75 minutes",
            desc: "A foundational practice integrating yoga and mobility to enhance flexibility, stability, and functional strength. This accessible session encourages fluid movement and mindful breath awareness, supporting everyday physical vitality and ease.",
          },
          {
            name: "Signature Class - Barre",
            extra: "50 minutes",
            desc: "An elevated movement experience featuring dance-inspired conditioning to strengthen posture and sculpt lean muscle. Through rhythmic flow and controlled precision, this session cultivates grace, resilience, and dynamic balance.",
          },
          {
            name: "Group Class",
            extra: "50 minutes",
            desc: "A shared yoga and barre experience designed to energize and restore the body in an intimate setting. It focuses on mindful movement, strength, and breath-led flow to build mobility.",
          },
          {
            name: "Workshops",
            extra: "90 | 120 minutes",
            desc: "Professionally guided specialty sessions offering deeper exploration into breathwork, meditation, and singing bowl sound healing. These immersive gatherings are designed to regulate the nervous system and foster meaningful connection within a supportive community.",
          },
          {
            name: "Kids Yoga",
            extra: "45 minutes",
            desc: "A joyful, nurturing movement experience created specifically for children. Through playful poses and creative exploration, young participants develop coordination, focus, and confidence in a supportive environment.",
          },
        ],
      },
      {
        name: "fitness",
        sessions: [
          {
            name: "Private Training - Single Session",
            extra: "50 Minutes | 1/3/5/10 Sessions",
            desc:
              "A private, guided session designed to build strength, restore balance, and reconnect you with your body. Each intuitive experience combines functional conditioning with mindful movement and breath awareness.",
          },
          {
            name: "Group Class",
            extra: "50 Minutes | 1/3/5/10 Sessions",
            desc:
              "A shared movement experience designed to energize and restore through strength, mobility, and breath-led flow. It provides an intimate group setting to build consistency and a strong physical foundation",
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
      subheading:
        "Challenge your physical limits and build functional strength in our dedicated, fully equipped climbing facility. With flexible access for all skill levels and comprehensive equipment rentals, we provide a dynamic environment for progressive movement.",
      button_label: "Discover Climbing",
      book_now_button: false,
      image: "/images/programs/D.webp",
      video: "/videos/BFriends2.mp4",
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
            name: "Outdoor Expeditions",
            extra: "60 Minutes",
            desc: "Take your practice beyond the walls with professionally guided climbs in dynamic natural environments. These immersive expeditions test your functional strength and adaptability on real rock while fostering a deeper connection with nature.",
          },
          {
            name: "BFriends Games",
            extra: "75 Minutes",
            desc: "A community-driven event designed to celebrate progress, resilience, and camaraderie among climbers of all levels. Test your technique and dynamic balance through curated routes and engaging movement challenges.",
          },
          {
            name: "Endurance Challenges",
            extra: "90 Minutes",
            desc: "Push your physical and mental limits in these structured, stamina-focused climbing sessions. Designed to build long-term resilience, these events refine your pacing, grip strength, and cardiovascular endurance on the wall.",
          },
          {
            name: "Skill Masterclasses",
            extra: "60 Minutes",
            desc: "Elevate your climbing technique through intensive, professionally guided clinics focused on specific movement mechanics. From advanced footwork to dynamic route-reading, these sessions provide the targeted instruction needed to refine your practice.",
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
      subheading:
        "Nourish your system with thoughtfully crafted, nutrient-dense provisions designed to support your recovery and daily rhythm.",
      button_label: "Discover Cafe",
      book_now_button: false,
      image: "https://storageb.awancode.com/1776919921903_DDK00062.webp",
      video: "/videos/BFriends2.mp4",
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
            name: "Signature Kimbap",
            extra: "Contact for price | 60 Minutes",
            desc:
              "Hand-rolled Korean kimbap crafted for post-workout nourishment-balanced, savory, and light enough to keep you moving.",
          },
          {
            name: "Healthy Breakfast",
            extra: "Contact for price | 75 Minutes",
            desc:
              "Warm, comforting breakfast plates built on whole ingredients to gently refuel the body at the start of your day.",
          },
          {
            name: "Dessert Menu",
            extra: "Contact for price | 90 Minutes",
            desc:
              "Thoughtfully portioned desserts that satisfy the craving while staying aligned with your broader wellness goals.",
          },
          {
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
