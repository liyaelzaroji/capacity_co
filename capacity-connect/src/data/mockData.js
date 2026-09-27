// All data here is mock/demo data for the frontend prototype.
// Replace with real API calls once the backend (see the build guide) is wired up.

export const trainers = [
  {
    id: "t1",
    name: "Dr. Anitha Rao",
    subject: "Physical Oceanography",
    experience: 12,
    avgRating: 4.8,
    tier: "Gold",
    topPercent: 1,
    credits: 2140,
    students: 214,
    coursesCompleted: 9,
  },
  {
    id: "t2",
    name: "Suresh Menon",
    subject: "Numerical Weather Prediction",
    experience: 7,
    avgRating: 4.3,
    tier: "Silver",
    topPercent: 8,
    credits: 1180,
    students: 132,
    coursesCompleted: 5,
  },
  {
    id: "t3",
    name: "Fatima Sheikh",
    subject: "Climate Data Analytics",
    experience: 5,
    avgRating: 4.6,
    tier: "Gold",
    topPercent: 4,
    credits: 1560,
    students: 168,
    coursesCompleted: 7,
  },
  {
    id: "t4",
    name: "Rajeev Kulkarni",
    subject: "Seismology Fundamentals",
    experience: 3,
    avgRating: 4.1,
    tier: "Bronze",
    topPercent: 22,
    credits: 540,
    students: 61,
    coursesCompleted: 3,
  },
  {
    id: "t5",
    name: "Meera Pillai",
    subject: "Ocean-Atmosphere Interaction",
    experience: 9,
    avgRating: 4.7,
    tier: "Gold",
    topPercent: 2,
    credits: 1890,
    students: 190,
    coursesCompleted: 8,
  },
];

export const traineeCourses = [
  { id: "c1", title: "Introduction to Physical Oceanography", trainerId: "t1", progress: 100, status: "Completed", score: 91 },
  { id: "c2", title: "Reading NWP Model Output", trainerId: "t2", progress: 64, status: "In progress", score: null },
  { id: "c3", title: "Climate Data Analytics with Python", trainerId: "t3", progress: 100, status: "Completed", score: 88 },
  { id: "c4", title: "Ocean-Atmosphere Interaction Basics", trainerId: "t5", progress: 30, status: "In progress", score: null },
];

export const certificates = [
  {
    id: "CC-2026-00417",
    course: "Introduction to Physical Oceanography",
    issued: "12 Mar 2026",
    tier: "Gold",
    stars: 5,
    topPercent: 3,
  },
  {
    id: "CC-2026-00298",
    course: "Climate Data Analytics with Python",
    issued: "02 Feb 2026",
    tier: "Silver",
    stars: 4,
    topPercent: 12,
  },
];

// Notifications / announcements shown on Admin + homepage
export const announcements = [
  { id: "a1", title: "REACHOUT Phase II training window opens 14 Oct", date: "27 Sep 2026" },
  { id: "a2", title: "Oceanography track has 1 trainer for 340 trainees — coverage gap flagged", date: "24 Sep 2026" },
  { id: "a3", title: "New batch of certificates issued with QR verification", date: "20 Sep 2026" },
];

// Trainer verification pipeline — mock state for the two-step check
export const verificationSteps = {
  documentReview: {
    label: "Document & background review",
    status: "flagged", // "pending" | "flagged" | "cleared"
    note: "Extracted from resume — unverified until Step 2 confirms it independently.",
    extracted: {
      name: "Suresh Menon",
      qualification: "M.Sc. Atmospheric Science, Pune University",
      experience: "7 years — IMD field station, Kochi",
      priorTraining: "Conducted 5 internal IMD workshops (self-reported)",
    },
  },
  qualificationTest: {
    label: "Subject qualification test",
    status: "not_started", // "not_started" | "in_progress" | "passed" | "failed"
    passScore: 70,
    score: null,
    attempts: 0,
  },
};

export const competencyMap = [
  { subject: "Physical Oceanography", trainers: 3, demand: "High", coverage: "Adequate" },
  { subject: "Numerical Weather Prediction", trainers: 2, demand: "High", coverage: "Low" },
  { subject: "Seismology", trainers: 1, demand: "Medium", coverage: "Critical gap" },
  { subject: "Climate Data Analytics", trainers: 2, demand: "Medium", coverage: "Adequate" },
];
