// Mock subject qualification test. In production this bank lives on the
// backend and is never shipped to the browser with correct answers attached
// — see Phase 7 of the build guide. This client-only version is for demo
// purposes so the frontend has something real to grade against.

export const questions = [
  {
    id: "q1",
    prompt: "Which instrument is primarily used to measure atmospheric pressure?",
    options: ["Anemometer", "Barometer", "Hygrometer", "Pyranometer"],
    answer: 1,
  },
  {
    id: "q2",
    prompt: "In numerical weather prediction, what does 'data assimilation' refer to?",
    options: [
      "Compressing model output for storage",
      "Combining observations with a model forecast to set initial conditions",
      "Rendering satellite imagery",
      "Archiving historical rainfall data",
    ],
    answer: 1,
  },
  {
    id: "q3",
    prompt: "The thermocline in an ocean refers to a layer where:",
    options: [
      "Salinity is constant with depth",
      "Temperature changes rapidly with depth",
      "Pressure is negligible",
      "Currents reverse direction daily",
    ],
    answer: 1,
  },
  {
    id: "q4",
    prompt: "Which of these is a primary cause of the Indian monsoon's onset?",
    options: [
      "El Niño alone",
      "Differential heating between land and ocean",
      "Volcanic aerosols",
      "Polar vortex displacement",
    ],
    answer: 1,
  },
  {
    id: "q5",
    prompt: "A seismograph reading's 'P-wave' refers to:",
    options: [
      "The slowest-moving surface wave",
      "The first, fastest-arriving body wave",
      "A wave that only travels through liquids",
      "The wave used to measure aftershock duration",
    ],
    answer: 1,
  },
];

export function gradeAnswers(answers) {
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  return Math.round((correct / questions.length) * 100);
}
