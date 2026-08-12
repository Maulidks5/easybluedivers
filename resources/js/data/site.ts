/**
 * Static site content.
 * These arrays are intentionally plain data so they can later be replaced
 * by props coming from a Laravel controller through Inertia.
 */

export const WHATSAPP_LINK = "https://wa.me/255777422488";
export const CONTACT_EMAIL = "info@easybluedivers.com";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Easy+Blue+Divers%2C+Jambiani%2C+Zanzibar";
export const REVIEWS_LINK = "https://www.tripadvisor.com/Attraction_Review-g635745-d24972935-Reviews-Easy_Blue_Divers-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html";

export type NavLink = {
  label: string;
  href: string;
  /** Internal route path, when the link maps to a real page. */
  to?: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", to: "/" },
  { label: "Diving", href: "/diving", to: "/diving" },
  { label: "Courses", href: "/courses", to: "/courses" },
  { label: "Prices", href: "/prices", to: "/prices" },
  { label: "About Us", href: "/about", to: "/about" },
  { label: "Contact", href: "/contact", to: "/contact" },
];

export type Experience = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  /** CSS object-position used to crop the shared image differently per card. */
  focus: string;
  availability?: string;
};

export const experiences: Experience[] = [
  {
    id: "discover-scuba-diving",
    title: "Discover Scuba Diving",
    description:
      "Perfect for beginners who want to experience scuba diving for the first time.",
    cta: "View Experience",
    href: "/diving/discover-scuba-diving",
    focus: "30% 40%",
  },
  {
    id: "guided-fun-dives",
    title: "Guided Fun Dives",
    description:
      "Explore Zanzibar's coral reefs with an experienced professional dive guide.",
    cta: "View Experience",
    href: "/diving/guided-fun-dives",
    focus: "75% 65%",
  },
  {
    id: "diving-courses",
    title: "Diving Courses",
    description:
      "Learn to dive or improve your existing diving skills with professional instruction.",
    cta: "Explore Courses",
    href: "/courses",
    focus: "50% 85%",
  },
  {
    id: "private-diving",
    title: "Private Diving",
    description:
      "Enjoy a personalised diving experience with a dedicated instructor or guide.",
    cta: "Request Private Diving",
    href: "/diving/private-diving",
    focus: "15% 70%",
  },
];

export const experienceOptions: string[] = [
  "Discover Scuba Diving",
  "Guided Fun Dive",
  "Diving Course",
  "Private Diving",
  "Group Diving",
  "Help Me Choose",
];

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export const whyChooseUs: Feature[] = [
  {
    title: "Safety First",
    description: "Clear briefings, checked equipment and attentive dive professionals on every dive.",
    icon: "ShieldCheck",
  },
  {
    title: "Small Diving Groups",
    description: "Limited group sizes so every guest receives real attention in the water.",
    icon: "Users",
  },
  {
    title: "Experienced Team",
    description: "Instructors and guides who know Zanzibar's reefs and conditions well.",
    icon: "Award",
  },
  {
    title: "Quality Equipment",
    description: "Well maintained, regularly serviced diving gear in a full range of sizes.",
    icon: "Wrench",
  },
  {
    title: "Personalised Service",
    description: "We match the experience to your comfort level, pace and goals.",
    icon: "HeartHandshake",
  },
  {
    title: "Easy Booking",
    description: "Send your date, get a fast reply and confirm without complicated forms.",
    icon: "CalendarCheck",
  },
];

export const bookingSteps = [
  {
    title: "Choose Your Experience",
    description: "Pick the diving experience that fits your level, or ask us to help you choose.",
  },
  {
    title: "Send Your Details",
    description: "Share your preferred date, number of guests and how to reach you.",
  },
  {
    title: "Receive Confirmation",
    description: "Our team checks availability and confirms the plan for your dive day.",
  },
];

export const diveAreaTags = [
  "Tropical Reefs",
  "Warm Ocean Water",
  "Professional Guides",
  "Beautiful Marine Life",
];

export type Testimonial = {
  name: string;
  country: string;
  rating: number;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marta K.",
    country: "Poland",
    rating: 5,
    review:
      "The team was friendly, patient and professional. It was my first time diving, and I felt safe throughout the entire experience.",
  },
  {
    name: "James R.",
    country: "United Kingdom",
    rating: 5,
    review:
      "Small group, excellent guide and a beautiful reef. Everything was organised properly from the first message to the last dive.",
  },
  {
    name: "Sofia M.",
    country: "Italy",
    rating: 5,
    review:
      "Great equipment and a very calm, well explained briefing. We saw turtles and so many colourful fish. Highly recommended.",
  },
];

export const experienceHighlights: Feature[] = [
  {
    title: "Beginner Friendly",
    description: "No certification or previous diving experience needed.",
    icon: "Sparkles",
  },
  {
    title: "Professional Instructor",
    description: "A certified instructor stays with you from start to finish.",
    icon: "UserCheck",
  },
  {
    title: "Full Equipment",
    description: "Mask, fins, wetsuit, BCD, regulator and tank included.",
    icon: "Backpack",
  },
  {
    title: "Safety Briefing",
    description: "A clear, unhurried explanation of every safety procedure.",
    icon: "ShieldCheck",
  },
  {
    title: "Basic Skills Practice",
    description: "Practise breathing and simple skills in shallow water first.",
    icon: "Waves",
  },
  {
    title: "Supervised Ocean Dive",
    description: "Your first real reef dive, guided the whole way.",
    icon: "Compass",
  },
];

export const whatToExpect = [
  "Welcome and registration",
  "Safety and equipment briefing",
  "Basic skills practice",
  "Supervised ocean dive",
  "Return and experience review",
];

export const whatIsIncluded = [
  "Professional diving instructor",
  "Diving equipment",
  "Safety briefing",
  "Basic skills practice",
  "Supervised ocean dive",
  "Boat transport where applicable",
  "Drinking water",
  "Hotel transfer in selected locations",
];

export const importantInformation = [
  "No previous diving experience required",
  "Participants must meet medical requirements",
  "Minimum age depends on diving standards",
  "Final time depends on weather and tide",
  "Marine fees may apply",
  "Booking is confirmed only after availability is checked",
];

export const relatedExperiences: Experience[] = [
  {
    id: "guided-fun-dives",
    title: "Guided Fun Dives",
    description: "For certified divers who want to explore more of Zanzibar's reefs.",
    cta: "View Experience",
    href: "/diving",
    focus: "70% 55%",
  },
  {
    id: "open-water-course",
    title: "Open Water Course",
    description: "Become a certified diver with structured professional training.",
    cta: "Explore Course",
    href: "/courses",
    focus: "40% 80%",
  },
  {
    id: "private-diving",
    title: "Private Diving",
    description: "A dedicated guide and a schedule built entirely around you.",
    cta: "Request Private Diving",
    href: "/diving",
    focus: "20% 45%",
  },
];

/* ------------------------------------------------------------------ */
/* Diving page                                                         */
/* ------------------------------------------------------------------ */

export const divingActivities: Experience[] = [
  {
    id: "discover-scuba-diving",
    title: "Discover Scuba Diving",
    description:
      "Your first breath underwater with a professional instructor beside you the whole time.",
    cta: "View Experience",
    href: "/diving/discover-scuba-diving",
    focus: "30% 40%",
  },
  {
    id: "guided-fun-dives",
    title: "Guided Fun Dives",
    description:
      "For certified divers. One, two or three tank dives on Zanzibar's healthiest reefs.",
    cta: "Ask About Fun Dives",
    href: "#booking",
    focus: "75% 65%",
  },
  {
    id: "private-diving",
    title: "Private Diving",
    description:
      "A dedicated guide, your own pace and a schedule planned entirely around you.",
    cta: "Request Private Diving",
    href: "#booking",
    focus: "15% 70%",
  },
  {
    id: "group-diving",
    title: "Group & Family Diving",
    description:
      "Diving for families, friends and small groups, with options for non-divers too.",
    cta: "Plan Group Diving",
    href: "#booking",
    focus: "55% 30%",
  },
  {
    id: "night-diving",
    title: "Night Diving",
    description:
      "Watch the reef change character after sunset with a guided torch-lit dive.",
    cta: "Ask About Night Dives",
    href: "#booking",
    focus: "45% 60%",
  },
  {
    id: "snorkelling",
    title: "Snorkelling Trips",
    description:
      "Stay on the surface and still enjoy the coral gardens, turtles and colourful fish.",
    cta: "View Snorkelling",
    href: "#booking",
    focus: "65% 45%",
  },
];

export const diveSites = [
  {
    name: "Coral Gardens",
    level: "All levels",
    depth: "6 – 14 m",
    description: "Shallow, calm and full of life. Ideal for first dives and refreshers.",
  },
  {
    name: "Turtle Reef",
    level: "Open Water",
    depth: "10 – 18 m",
    description: "Regular green turtle sightings over a gently sloping hard coral reef.",
  },
  {
    name: "The Wall",
    level: "Advanced",
    depth: "18 – 30 m",
    description: "A dramatic drop off with big schools of fish and excellent visibility.",
  },
  {
    name: "Sandbank Shallows",
    level: "Beginner",
    depth: "4 – 9 m",
    description: "Bright, easy conditions perfect for skills practice and photography.",
  },
];

/* ------------------------------------------------------------------ */
/* Courses page                                                        */
/* ------------------------------------------------------------------ */

export type Course = {
  id: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  focus: string;
};

export const courses: Course[] = [
  {
    id: "discover-scuba",
    title: "Discover Scuba Diving",
    level: "No experience needed",
    duration: "Half day",
    price: "From USD 90",
    description:
      "A supervised introduction to scuba diving. Learn the basics in shallow water, then make a real reef dive with your instructor.",
    highlights: ["No certification required", "1 supervised ocean dive", "All equipment included"],
    focus: "30% 40%",
  },
  {
    id: "scuba-diver",
    title: "Scuba Diver",
    level: "Entry level certification",
    duration: "2 days",
    price: "From USD 320",
    description:
      "A shorter certification for guests with limited time. Dive to 12 metres under the supervision of a professional.",
    highlights: ["2 open water dives", "Certification for life", "Upgradeable to Open Water"],
    focus: "50% 55%",
  },
  {
    id: "open-water",
    title: "Open Water Diver",
    level: "Beginner certification",
    duration: "3 – 4 days",
    price: "From USD 480",
    description:
      "The world's most popular diving course. Become an independent certified diver, qualified to dive to 18 metres anywhere.",
    highlights: ["5 training dives", "Theory, pool and ocean sessions", "Dive worldwide"],
    focus: "40% 80%",
  },
  {
    id: "advanced-open-water",
    title: "Advanced Open Water",
    level: "Certified divers",
    duration: "2 days",
    price: "From USD 400",
    description:
      "Build confidence with five adventure dives including deep and underwater navigation, plus specialities you choose.",
    highlights: ["5 adventure dives", "Deep to 30 metres", "Navigation and buoyancy"],
    focus: "70% 45%",
  },
  {
    id: "rescue-diver",
    title: "Rescue Diver",
    level: "Advanced divers",
    duration: "3 days",
    price: "From USD 470",
    description:
      "The most rewarding course you will take. Learn to prevent, recognise and manage diving problems for yourself and others.",
    highlights: ["Self rescue skills", "Emergency management", "First aid prerequisite"],
    focus: "20% 60%",
  },
  {
    id: "specialities",
    title: "Speciality Courses",
    level: "Certified divers",
    duration: "1 – 2 days",
    price: "From USD 200",
    description:
      "Focus on what you love most: Nitrox, deep diving, night diving, navigation, buoyancy or underwater photography.",
    highlights: ["Choose your focus", "Small groups", "Flexible scheduling"],
    focus: "60% 25%",
  },
];

export const courseSteps = [
  {
    title: "Discuss Your Starting Point",
    description: "Share your experience and travel dates so the team can recommend a suitable course plan.",
  },
  {
    title: "Learn & Practise Skills",
    description: "Build knowledge and in-water confidence at a pace appropriate for your selected course.",
  },
  {
    title: "Apply Your Learning",
    description: "Complete the practical sessions included in your agreed course plan with professional guidance.",
  },
  {
    title: "Review Your Next Step",
    description: "Your instructor explains your progress and any next steps that apply to your chosen programme.",
  },
];

export const courseFaqs = [
  {
    question: "Do I need to be a strong swimmer?",
    answer:
      "Water-comfort requirements depend on the course. Tell us your experience level and we will explain what applies before you book.",
  },
  {
    question: "What is the minimum age?",
    answer:
      "Minimum age and any additional requirements depend on the course. Contact us with the guest’s age and we will recommend the suitable option.",
  },
  {
    question: "Do I need a medical certificate?",
    answer:
      "Health and medical requirements are reviewed before diving. We will tell you what is needed for your selected course before confirming the plan.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "Book as early as possible, especially in busy periods, so the team can check instructor and schedule availability for your dates.",
  },
];

/* ------------------------------------------------------------------ */
/* Prices page                                                         */
/* ------------------------------------------------------------------ */

export type PriceItem = {
  name: string;
  detail: string;
  price: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  description: string;
  items: PriceItem[];
};

export const priceGroups: PriceGroup[] = [
  {
    id: "try-diving",
    title: "Try Diving",
    description: "For guests without a diving certification.",
    items: [
      { name: "Discover Scuba Diving", detail: "1 supervised ocean dive, half day", price: "USD 90" },
      { name: "Discover Scuba Diving — 2 dives", detail: "2 supervised dives, full day", price: "USD 140" },
      { name: "Private Discover Scuba", detail: "One instructor, one guest", price: "USD 150" },
      { name: "Snorkelling trip", detail: "Guided, equipment included", price: "USD 45" },
    ],
  },
  {
    id: "fun-dives",
    title: "Fun Dives",
    description: "For certified divers. Equipment rental included.",
    items: [
      { name: "Single dive", detail: "1 tank, guided", price: "USD 65" },
      { name: "Double dive", detail: "2 tanks, same trip", price: "USD 110" },
      { name: "Three dive day", detail: "3 tanks, full day", price: "USD 155" },
      { name: "6 dive package", detail: "Valid during your stay", price: "USD 300" },
      { name: "10 dive package", detail: "Best value for longer stays", price: "USD 470" },
      { name: "Night dive", detail: "Guided, torches provided", price: "USD 80" },
    ],
  },
  {
    id: "courses",
    title: "Courses",
    description: "Certification fees and learning materials included.",
    items: [
      { name: "Scuba Diver", detail: "2 days, 2 open water dives", price: "USD 320" },
      { name: "Open Water Diver", detail: "3 – 4 days, 5 dives", price: "USD 480" },
      { name: "Advanced Open Water", detail: "2 days, 5 adventure dives", price: "USD 400" },
      { name: "Rescue Diver", detail: "3 days", price: "USD 470" },
      { name: "Speciality course", detail: "Per speciality", price: "From USD 200" },
      { name: "Scuba Review / Refresher", detail: "Half day", price: "USD 70" },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    description: "Optional additions to any dive or course.",
    items: [
      { name: "Private guide", detail: "Per day, per group", price: "USD 60" },
      { name: "Nitrox fill", detail: "Per tank, certified divers", price: "USD 10" },
      { name: "Underwater photos", detail: "Digital gallery of your dive", price: "USD 25" },
      { name: "Hotel transfer", detail: "Selected areas, return", price: "USD 15" },
    ],
  },
];

export const priceIncludes = [
  "Professional guide or instructor",
  "Full set of diving equipment",
  "Tanks, weights and air fills",
  "Boat transport where applicable",
  "Drinking water and light snacks",
  "Safety briefing and dive plan",
];

export const priceExcludes = [
  "Marine park and conservation fees",
  "Hotel transfers outside selected areas",
  "Personal travel and diving insurance",
  "Gratuities for the dive team",
];

export const priceNotes = [
  "All prices are per person in US dollars and are indicative.",
  "Marine park fees are payable locally where they apply.",
  "Group and multi-day discounts are available on request.",
  "Payment can be made in USD cash, Tanzanian shillings or by card.",
  "Free cancellation up to 24 hours before your dive.",
];
