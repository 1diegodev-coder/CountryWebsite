export interface QuestionOption {
  value: any;
  label: string;
  sub?: string;
}

export interface Question {
  id: string;
  step: number;
  type: "single" | "multi";
  question: string;
  subtitle?: string;
  options: QuestionOption[];
  maxSelect?: number;
}

export const QUESTIONS: Question[] = [
  {
    id: "lifeStage", step: 1, type: "single",
    question: "What best describes where you are right now?",
    subtitle: "This shapes how we weigh what matters most for you.",
    options: [
      { value: "founder", label: "Founder / Entrepreneur", sub: "Building something of my own" },
      { value: "remoteEmployee", label: "Remote Worker", sub: "Employed by a company outside where I live" },
      { value: "freelancer", label: "Freelancer / Consultant", sub: "Self-employed with multiple clients" },
      { value: "semiRetired", label: "Semi-Retired / Retired", sub: "Living primarily on savings or pension" },
      { value: "optimiser", label: "Lifestyle Optimiser", sub: "Seeking the highest quality of life for my budget" },
    ]
  },
  {
    id: "household", step: 2, type: "single",
    question: "Who's coming with you?",
    subtitle: "If you're planning a future move, imagine who'd be alongside you.",
    options: [
      { value: "solo", label: "Just me", sub: "Single, or partner stays behind" },
      { value: "coupleNoKids", label: "Me and my partner", sub: "No children involved in the move" },
      { value: "coupleWithKids", label: "Family with children", sub: "Including young children or teenagers" },
    ]
  },
  {
    id: "pushFactors", step: 3, type: "multi",
    question: "What's driving the idea of moving?",
    subtitle: "Select all that apply — we use this to weigh what matters most.",
    options: [
      { value: "tax", label: "Tax optimisation", sub: "Reduce my personal or corporate tax burden" },
      { value: "costTooHigh", label: "Lower cost of living", sub: "My money goes further elsewhere" },
      { value: "climate", label: "Better climate", sub: "More sun, warmth, or seasons I prefer" },
      { value: "lifestyle", label: "Adventure & new experiences", sub: "I want a fundamentally different life" },
      { value: "politicalSocial", label: "Safety or stability", sub: "Political or personal safety concerns" },
      { value: "healthcare", label: "Healthcare access", sub: "Better quality or affordability" },
      { value: "career", label: "Career or business opportunity", sub: "Access to new markets or talent" },
    ]
  },
  {
    id: "passports", step: 4, type: "multi",
    question: "Which passports do you hold?",
    subtitle: "This determines your visa access to different countries.",
    options: [
      { value: "US", label: "🇺🇸 United States" },
      { value: "GB", label: "🇬🇧 United Kingdom" },
      { value: "DE", label: "🇩🇪 Germany" },
      { value: "FR", label: "🇫🇷 France" },
      { value: "CA", label: "🇨🇦 Canada" },
      { value: "AU", label: "🇦🇺 Australia" },
    ]
  },
  {
    id: "budgetUsdMonthly", step: 5, type: "single",
    question: "What's your realistic monthly budget for living expenses?",
    subtitle: "Include rent, food, transport, lifestyle — everything except big one-off costs.",
    options: [
      { value: 1500, label: "Under $1,500 / month", sub: "Budget-conscious, value-first" },
      { value: 2500, label: "$1,500 – $2,500 / month", sub: "Comfortable without splurging" },
      { value: 3500, label: "$2,500 – $3,500 / month", sub: "Mid-range lifestyle" },
      { value: 5000, label: "$3,500 – $5,000 / month", sub: "Comfortable with some luxuries" },
      { value: 8000, label: "$5,000 – $8,000 / month", sub: "High standard of living" },
    ]
  },
  {
    id: "languageFlexibility", step: 6, type: "single",
    question: "How do you feel about living in a language you don't speak?",
    subtitle: "Be honest — daily life in a non-English country can be challenging.",
    options: [
      { value: "englishOnly", label: "English only", sub: "I need to function in English day-to-day" },
      { value: "openToLearning", label: "Open to learning", sub: "I'll pick up the local language over time" },
    ]
  },
  {
    id: "healthcareNeed", step: 7, type: "single",
    question: "How important is healthcare quality and access?",
    subtitle: "Consider any ongoing needs, medications, or specialist requirements.",
    options: [
      { value: "none", label: "Basic access is fine", sub: "I'm healthy — just need emergency cover" },
      { value: "general", label: "Good general healthcare", sub: "I want a solid system I can rely on" },
      { value: "chronic", label: "Critical dependency", sub: "I have ongoing conditions that need consistent care" },
    ]
  },
  {
    id: "nonNegotiables", step: 8, type: "multi",
    question: "Are there any deal-breakers for you?",
    subtitle: "Countries failing these will be eliminated entirely.",
    options: [
      { value: "lgbtq", label: "LGBTQ+ safety and rights", sub: "Must be safe and legally protected" },
      { value: "pressFreedom", label: "Press freedom", sub: "Free and independent media is important to me" },
      { value: "genderEquality", label: "Gender equality", sub: "Women's rights and social equality" },
      { value: "secular", label: "Secular society", sub: "Separation of religion and state" },
    ]
  },
  {
    id: "socialMode", step: 9, type: "single",
    question: "How do you like to live socially?",
    subtitle: "Not how you are now — how you'd ideally want to be.",
    options: [
      { value: "expatBubble", label: "Expat community", sub: "I want to find my tribe quickly" },
      { value: "deepIntegration", label: "Local integration", sub: "I want to genuinely embed in local culture" },
      { value: "mixed", label: "A mix of both", sub: "International friends, local experiences" },
      { value: "independent", label: "Independent", sub: "I don't need a built-in social scene" },
    ]
  },
  {
    id: "environmentPreference", step: 10, type: "single",
    question: "What environment feels like home to you?",
    options: [
      { value: "bigCity", label: "Big City", sub: "Density, culture, constant energy" },
      { value: "midCity", label: "Mid-sized City", sub: "Balance of amenities and ease" },
      { value: "smallTown", label: "Small Town / Village", sub: "Slower pace, close community" },
      { value: "rural", label: "Rural / Nature", sub: "Space, quiet, land" },
    ]
  },
  {
    id: "culturalAppetite", step: 11, type: "single",
    question: "How different do you want your new home to be?",
    options: [
      { value: "similarToHome", label: "Broadly familiar", sub: "Similar culture, manageable shift" },
      { value: "upgradeButFamiliar", label: "An upgrade", sub: "Better quality of life, same world-view" },
      { value: "radicallyDifferent", label: "Radically different", sub: "Genuinely new worldview and culture" },
    ]
  },
  {
    id: "topPriorities", step: 12, type: "multi",
    question: "What matters most to you in a new home?",
    subtitle: "Pick up to 3 — these boost specific dimensions of our matching.",
    maxSelect: 3,
    options: [
      { value: "lowTax", label: "Low taxes" },
      { value: "safety", label: "Safety first" },
      { value: "nature", label: "Nature & outdoors" },
      { value: "internet", label: "Fast internet" },
      { value: "healthcare", label: "Healthcare quality" },
      { value: "cost", label: "Budget goes far" },
      { value: "visaEase", label: "Easy residency" },
      { value: "culture", label: "Culture & arts" },
    ]
  },
  {
    id: "dealbreakers", step: 13, type: "multi",
    question: "Want to rule anything out?",
    options: [
      { value: "extremeHeat", label: "Extreme heat" },
      { value: "extremeCold", label: "Extreme cold" },
      { value: "humidity", label: "High humidity" },
      { value: "airPollution", label: "Air pollution" },
      { value: "authoritarian", label: "Authoritarian government" },
    ]
  },
];
