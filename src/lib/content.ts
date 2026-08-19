/* ─────────────────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH — all facts come from the client brief.
   Do not invent facts outside this file.
   ───────────────────────────────────────────────────────────── */

export const SECTION_IDS = [
  "top",
  "about",
  "skills",
  "experience",
  "education",
  "stats",
  "work",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface Segment {
  text: string;
  hl?: boolean;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  tasks?: string[];
  description?: string;
}

export interface EducationEntry {
  period: string;
  degree: string;
  institution: string;
}

export interface WorkSlot {
  tag: string;
  label: string;
  src: string;
  alt: string;
  cursor: "view" | "play";
}

export const CONTENT = {
  identity: {
    fullName: "Syed Mehaboob Razzak.S",
    heroNameLines: ["SYED", "RAZZAK"],
    roleLine: "PHOTOGRAPHER · VIDEOGRAPHER · VIDEO EDITOR · GRAPHIC DESIGNER",
    statusBadge: "OPEN TO WORK · FREELANCER",
    location: "Chennai, India",
  },

  /* 1.2 — About, split into display lines with highlight segments */
  aboutLines: [
    [
      { text: "Dynamic and innovative professional with " },
      { text: "6+ years", hl: true },
      {
        text: " of invaluable hands-on experience in handling several simultaneous creative design projects, ",
      },
      { text: "graphic design", hl: true },
      { text: " and " },
      { text: "visual conceptualization", hl: true },
      { text: "." },
    ] as Segment[],
    [
      { text: "Working on a range of different clients producing work like " },
      { text: "logo making", hl: true },
      { text: ", " },
      { text: "video editing", hl: true },
      { text: ", " },
      { text: "color grading", hl: true },
      { text: " etc." },
    ] as Segment[],
    [
      { text: "In " },
      { text: "6+ years", hl: true },
      { text: " in the industry, I have acquired valuable experience in " },
      { text: "video editing", hl: true },
      { text: ", " },
      { text: "graphic design", hl: true },
      { text: " and " },
      { text: "color grading", hl: true },
      { text: "." },
    ] as Segment[],
  ],

  /* 1.3 — Software skills (hero pill order follows the opening sequence) */
  software: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Adobe After Effects", "Adobe Lightroom"],
  heroPills: ["Photoshop", "Premiere Pro", "After Effects", "Lightroom", "Illustrator"],

  /* ── CLIENT-ADJUSTABLE PLACEHOLDERS ─────────────────────────
     Proficiency values below are placeholders — tune to taste. */
  skillBars: [
    { name: "Adobe Photoshop", code: "PS", level: 95 },
    { name: "Adobe Premiere Pro", code: "PR", level: 92 },
    { name: "Adobe Lightroom", code: "LR", level: 88 },
    { name: "Adobe Illustrator", code: "AI", level: 85 },
    { name: "Adobe After Effects", code: "AE", level: 80 },
  ],

  /* 1.4 — 14 core competencies */
  services: [
    "Image Editing",
    "Print Design",
    "Image Special Effects",
    "Color Grading",
    "Black & White to Color Conversion",
    "Layer Styles",
    "Collage Creation",
    "Album Design",
    "Wrapper Design",
    "Photography",
    "Videography",
    "Video Editing",
    "Logo Creation",
    "Visual Conceptualization",
  ],

  aboutPills: ["Photography", "Video Editing", "Color Grading", "Album Design", "Logo Creation", "Print Design"],

  /* 1.5 — Experience (exact) */
  experience: [
    {
      period: "2024 — PRESENT",
      role: "Graphic Designer & Video Editor",
      company: "Concept Studio",
      tasks: [
        "Image editing",
        "Print",
        "Image Special Effects",
        "Color Grading",
        "B&W to Color Conversion",
        "Layer Style",
        "Collage Creation",
        "Album Design",
        "Wrapper Design",
        "Photographs & Videographs",
        "Video Editing",
        "Logo Creation",
      ],
    },
    {
      period: "2021 — 2023",
      role: "Videographer & Video Editor",
      company: "Agilisium Consultancy Pvt Ltd",
      description:
        "As a freelance video editor and videographer working within a company, successfully collaborated with teams to create high-quality video content across various platforms.",
    },
    {
      period: "2019 — 2020",
      role: "Graphic Designer",
      company: "New Photo Park",
      tasks: [
        "Image editing",
        "Print",
        "Image Special Effects",
        "Color Grading",
        "B&W to Color Conversion",
        "Layer Style",
        "Collage Creation",
        "Album Design",
        "Wrapper Design",
        "Photographs & Videographs",
      ],
    },
  ] as ExperienceEntry[],

  /* 1.6 — Education (exact) */
  education: [
    {
      period: "2013 — 2021",
      degree: "B.COM (ISM) — Bachelor of Commerce, Information System Management",
      institution: "University of Madras",
    },
    { period: "2012 — 2013", degree: "12th State Board", institution: "Mara Malai Adigal Govt. Higher Secondary School" },
    { period: "2010 — 2011", degree: "10th State Board", institution: "Mara Malai Adigal Govt. Higher Secondary School" },
  ] as EducationEntry[],

  /* 1.7 — Languages */
  languages: [
    { code: "EN", name: "English" },
    { code: "TA", name: "Tamil" },
    { code: "UR", name: "Urdu" },
    { code: "HI", name: "Hindi" },
  ],

  /* 1.9 — Derived stats (math from experience / education) */
  stats: [
    { value: 6, suffix: "+", label: "Years Experience" },
    { value: 3, suffix: "", label: "Companies Served" },
    { value: 4, suffix: "", label: "Languages" },
    { value: 14, suffix: "", label: "Core Services" },
  ],

  /* 1.8 — Contact */
  contact: {
    email: "syedrazzak1996@gmail.com",
    phones: ["+91-9940563921", "+91-7418871593"],
    address: "No: 20, Vembuli Ammen Koil 8th Street, Kulathumedu, Pallavaram, Chennai — 600043",
    whatsapp: "https://wa.me/919940563921",
  },

  /* TODO: replace with real social handles — do NOT fabricate */
  socials: [
    { name: "Instagram", url: null },
    { name: "YouTube", url: null },
    { name: "Behance", url: null },
  ] as { name: string; url: string | null }[],

  /* 5.7 — SELECTED WORK placeholder grid.
     [CLIENT IMAGE SLOT] — replace src with real photos / showreel stills. */
  workSlots: [
    {
      tag: "FR_01",
      label: "Wedding Film",
      src: "https://image.qwenlm.ai/generated-images/bd72efc8-bde4-4655-8541-aad1b908295d/_result.png",
      alt: "Cinematic wedding film frame — bride and groom under warm string lights",
      cursor: "play",
    },
    {
      tag: "FR_02",
      label: "Portrait Session",
      src: "https://image.qwenlm.ai/generated-images/ef6be60c-232e-48b3-92c3-f3236782a248/_result.png",
      alt: "Dramatic studio portrait lit by a single amber spotlight",
      cursor: "view",
    },
    {
      tag: "FR_03",
      label: "Behind the Lens",
      src: "https://image.qwenlm.ai/generated-images/3749f7d2-f3c1-46e8-a39b-c6f80467ad60/_result.png",
      alt: "Videographer operating a cinema camera on a gimbal through haze",
      cursor: "view",
    },
    {
      tag: "FR_04",
      label: "The Grade Suite",
      src: "https://image.qwenlm.ai/generated-images/f4d46f70-108c-4a9b-8443-9872cf38f165/_result.png",
      alt: "Video editing suite with glowing color grading timeline",
      cursor: "view",
    },
    {
      tag: "FR_05",
      label: "Event Coverage",
      src: "https://image.qwenlm.ai/generated-images/79fbbb96-720c-47ff-8bbc-c326f5c5d60f/_result.png",
      alt: "Concert stage washed in amber haze with crowd silhouettes",
      cursor: "play",
    },
    {
      tag: "FR_06",
      label: "Album & Print",
      src: "https://image.qwenlm.ai/generated-images/48eb2d0d-0ffd-4377-9d4b-0b478d2e23d5/_result.png",
      alt: "Hands arranging printed album spreads and color swatches on a dark desk",
      cursor: "view",
    },
  ] as WorkSlot[],

  /* PORTRAIT placeholder — replace with a real portrait of the client */
  portrait: {
    src: "https://image.qwenlm.ai/generated-images/9488af3c-3eff-4fc3-83be-936eed283f19/_result.png",
    alt: "Syed Mehaboob Razzak holding a cinema camera, lit by warm amber rim light",
  },

  navLinks: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  marqueeItems: ["Adobe Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Lightroom"],

  endFrame: "DIRECTED & EDITED BY SYED MEHABOOB RAZZAK — CHENNAI — 2025",
  footer: "© 2025 Syed Mehaboob Razzak.S",
};
