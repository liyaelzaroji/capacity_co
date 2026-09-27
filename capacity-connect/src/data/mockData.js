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
    skillScore: 94,
    workExperience: [
      { role: "Senior Scientist", org: "National Institute of Oceanography", years: 8, description: "Led coastal current modelling projects for IMD field stations." },
      { role: "Research Associate", org: "Indian Institute of Science", years: 4, description: "Published on Indian Ocean thermocline variability." },
    ],
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
    skillScore: 82,
    workExperience: [
      { role: "Forecast Officer", org: "IMD Field Station, Kochi", years: 7, description: "Ran daily NWP model output review and briefed regional forecasters." },
    ],
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
    skillScore: 90,
    workExperience: [
      { role: "Data Scientist", org: "Centre for Climate Change Research", years: 5, description: "Built rainfall anomaly pipelines used across three MoES institutes." },
    ],
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
    skillScore: 71,
    workExperience: [
      { role: "Junior Seismologist", org: "National Centre for Seismology", years: 3, description: "Monitored regional seismic networks and logged aftershock sequences." },
    ],
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
    skillScore: 91,
    workExperience: [
      { role: "Scientist-E", org: "Indian National Centre for Ocean Information Services", years: 9, description: "Specialist in monsoon onset prediction and air-sea flux modelling." },
    ],
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
// (used post-login on the Trainer dashboard's own Verification tab)
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

// Each trainer's actual trainee roster — this is what the "3 random
// trainees get picked to review their trainer" feature draws from.
export const trainerStudents = {
  t2: [
    { id: "s1", name: "Liya K." },
    { id: "s2", name: "Arjun S." },
    { id: "s3", name: "Devika N." },
    { id: "s4", name: "Karan Bose" },
    { id: "s5", name: "Neha Verma" },
    { id: "s6", name: "Rohit Paul" },
  ],
  t1: [
    { id: "s7", name: "Ananya Iyer" },
    { id: "s8", name: "Vikram Shetty" },
    { id: "s9", name: "Priya Nair" },
  ],
};

// Detailed written reviews trainees have left for trainers, on top of the
// star rating. Pulled from a trainer's own student roster, 3 at a time.
export const reviews = [
  {
    id: "r1",
    trainerId: "t2",
    traineeName: "Arjun S.",
    stars: 4,
    comment:
      "Explains model output clearly and answers questions properly, but the course could use more worked examples before the quiz.",
    submittedAt: "18 Sep 2026",
  },
  {
    id: "r2",
    trainerId: "t2",
    traineeName: "Neha Verma",
    stars: 5,
    comment:
      "Best trainer I've had on the platform so far — sessions were well paced and he actually reviewed our submitted assignments individually.",
    submittedAt: "21 Sep 2026",
  },
  // A third trainee (Karan Bose) has been sampled but hasn't submitted yet —
  // intentionally left out so the Reviews tab can show a "pending" state.
];

// Trainer signup applications sitting in the admin queue, each carrying the
// work experience the trainer entered at signup and their skill-test score.
// Admin approves/rejects primarily based on this score plus document review.
export const pendingApplications = [
  {
    id: "app1",
    name: "Priya Nair",
    email: "priya.nair@example.gov.in",
    subject: "Hydrology",
    workExperience: [
      { role: "Hydrologist", org: "Central Water Commission", years: 6, description: "River basin flood-forecasting models." },
    ],
    skillScore: 88,
    docStatus: "cleared",
    submittedAt: "25 Sep 2026",
  },
  {
    id: "app2",
    name: "Ilyas Ahmed",
    email: "ilyas.ahmed@example.gov.in",
    subject: "Seismology",
    workExperience: [
      { role: "Field Technician", org: "National Centre for Seismology", years: 2, description: "Installed and maintained seismic sensor arrays." },
    ],
    skillScore: 54,
    docStatus: "flagged",
    submittedAt: "26 Sep 2026",
  },
];

// Rough per-subject demand signal — in production this comes from trainee
// enrollment interest / waitlist volume, not a static table.
const SUBJECT_DEMAND = {
  "Physical Oceanography": "High",
  "Numerical Weather Prediction": "High",
  "Seismology Fundamentals": "Medium",
  Seismology: "Medium",
  "Climate Data Analytics": "Medium",
  "Ocean-Atmosphere Interaction": "Medium",
  Hydrology: "Medium",
};

// Competency map derived from real trainer records: how many trainers per
// subject, and how strong they actually are (average skill-test score) —
// not just a headcount.
export function computeCompetencyMap(trainerList) {
  const bySubject = {};
  trainerList.forEach((t) => {
    if (!bySubject[t.subject]) bySubject[t.subject] = [];
    bySubject[t.subject].push(t);
  });

  return Object.entries(bySubject).map(([subject, list]) => {
    const avgSkill = Math.round(
      list.reduce((sum, t) => sum + (t.skillScore || 0), 0) / list.length
    );
    const demand = SUBJECT_DEMAND[subject] || "Medium";
    let coverage = "Adequate";
    if (list.length === 1 && demand === "High") coverage = "Critical gap";
    else if (list.length <= 2 && demand === "High") coverage = "Low";
    else if (avgSkill < 65) coverage = "Weak bench";
    return {
      subject,
      trainerCount: list.length,
      avgSkill,
      demand,
      coverage,
      trainers: list.map((t) => ({ name: t.name, skillScore: t.skillScore })),
    };
  });
}

export const competencyMap = computeCompetencyMap(trainers);
