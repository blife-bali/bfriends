export type PolicyIcon =
  | "licensed"
  | "instructor"
  | "safety"
  | "health"
  | "attire"
  | "liability";

export type TreatmentPolicy = {
  eyebrow: string;
  title: string;
  intro: string;
  booking: {
    badge: string;
    title: string;
    body: string;
  };
  terms: {
    title: string;
    items: Array<{ icon: PolicyIcon; tag: string; label: string; title: string; body: string }>;
    note: string;
  };
  rules: {
    title: string;
    groups: Array<{ icon: PolicyIcon; title: string; items: string[] }>;
  };
};

export const TREATMENT_POLICY_BY_SLUG: Record<string, TreatmentPolicy> = {
  wallclimbing: {
    eyebrow: "Climbing Policy",
    title: "Before You Climb",
    intro: "Please read these guidelines before your session. They keep every climber on the wall safe.",
    booking: {
      badge: "H-1",
      title: "Advance Booking Required",
      body: "All climbing activities require a reservation at least one (1) day in advance (H-1).",
    },
    terms: {
      title: "Climbing Terms & Conditions",
      items: [
        {
          icon: "licensed",
          tag: "No instructor needed",
          label: "Licensed climbers",
          title: "Climb on your own",
          body: "Guests who hold a valid climbing license are permitted to climb independently without an instructor.",
        },
        {
          icon: "instructor",
          tag: "Instructor required",
          label: "Non-licensed climbers",
          title: "Climb with our instructor",
          body: "Guests who do not hold a climbing license are required to climb under the supervision of our certified instructor.",
        },
      ],
      note: "For safety reasons, our team reserves the right to verify climbing licenses prior to the activity.",
    },
    rules: {
      title: "General Rules & Regulations",
      groups: [
        {
          icon: "safety",
          title: "Safety & Equipment",
          items: [
            "All climbers must use safety equipment that meets safety standards. Personal equipment must be inspected and approved by our staff.",
            "Helmets and harnesses must be worn at all times while climbing.",
            "All safety checks must be completed with our staff before climbing.",
          ],
        },
        {
          icon: "health",
          title: "Eligibility & Health",
          items: [
            "Minimum age to climb is 6 years old. Participants under 18 must have written consent from a parent or guardian.",
            "Climbing is not recommended for guests who are pregnant, have heart conditions, high blood pressure, or other serious medical conditions.",
            "Guests must not be under the influence of alcohol, drugs, or any impairing substances.",
          ],
        },
        {
          icon: "attire",
          title: "Conduct & Attire",
          items: [
            "Proper climbing attire and climbing shoes are required. No sandals, bare feet, or loose jewelry.",
            "Please follow all instructions given by our instructors and staff at all times.",
            "Do not disturb or distract other climbers while they are on the wall.",
          ],
        },
        {
          icon: "liability",
          title: "Liability",
          items: [
            "All participants are required to sign a liability waiver and risk acknowledgment form before participating.",
            "Management is not responsible for any loss, damage, or injury to personal belongings or persons that occur due to negligence of safety rules.",
          ],
        },
      ],
    },
  },
};
