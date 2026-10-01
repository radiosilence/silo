import { CHARACTERS, FACTIONS } from "../shared/characters.js";

export const STATS = [
  { key: "grit", label: "Grit", hint: "Stamina, nerve and staying power" },
  { key: "ingenuity", label: "Ingenuity", hint: "Fixing, building and working things out" },
  { key: "clearance", label: "Clearance", hint: "How much they are allowed to know" },
  { key: "menace", label: "Menace", hint: "How frightened you ought to be" },
  { key: "curiosity", label: "Curiosity", hint: "How badly they need to know" },
  { key: "influence", label: "Influence", hint: "How many people would follow them" },
];

export { FACTIONS };

// p: [grit, ingenuity, clearance, menace, curiosity, influence], judged from what happens on screen.
const RAW = {
  juliette: { p: [96, 90, 62, 72, 98, 86], blurb: "Mechanical's best engineer, brought up top to wear the sheriff's badge, and unable to leave a question unanswered." },
  walker: { p: [38, 97, 35, 18, 72, 45], blurb: "An electrical engineer who has not left her workshop in years and can fix almost anything brought to her door." },
  knox: { p: [95, 70, 30, 86, 40, 88], blurb: "Juliette's boss down deep, who will fight anyone from up top for the people of Mechanical." },
  shirley: { p: [86, 72, 20, 46, 48, 56], blurb: "An engineer in Mechanical and Juliette's closest friend." },
  cooper: { p: [66, 56, 10, 25, 58, 20], blurb: "A rookie engineer in the lower levels, and Juliette's shadow." },
  teddy: { p: [72, 50, 8, 32, 35, 42], blurb: "A Mechanical worker and one of Juliette's colleagues, who found food for the lower levels when supplies were cut off." },

  bernard: { p: [55, 86, 100, 91, 74, 95], blurb: "The head of IT, who decides what the rest of the silo is allowed to know." },
  lukas: { p: [36, 86, 80, 10, 95, 35], blurb: "A systems analyst in IT who spends clear nights counting the stars." },
  allison: { p: [44, 76, 45, 8, 97, 30], blurb: "Worked in IT, recovered files that had been deleted, and came to doubt what the screen showed." },

  meadows: { p: [50, 55, 92, 76, 28, 86], blurb: "The head of Judicial, who enforces the Pact." },
  sims: { p: [88, 62, 86, 98, 40, 76], blurb: "Head of security for Judicial, who keeps order by whatever means the job requires." },
  camille: { p: [70, 76, 60, 72, 70, 62], blurb: "Robert Sims's wife and the mother of their son, and once a raider herself." },
  amundsen: { p: [80, 30, 50, 88, 15, 42], blurb: "A high-ranking raider among the armed enforcers who work for Sims." },
  trumbull: { p: [76, 25, 40, 84, 10, 22], blurb: "An enforcer for Judicial, loyal to Sims." },

  holston: { p: [80, 55, 66, 60, 82, 80], blurb: "The sheriff of the silo and Allison's devoted husband." },
  marnes: { p: [58, 40, 55, 40, 56, 56], blurb: "A deputy who works under Sheriff Holston and closely with Mayor Jahns." },
  billings: { p: [64, 56, 70, 50, 66, 62], blurb: "A former Judicial administrator made chief deputy, and later sheriff." },
  hank: { p: [70, 40, 35, 46, 52, 40], blurb: "A deputy who works in the lower levels." },
  molly: { p: [60, 36, 35, 42, 42, 30], blurb: "A deputy who works in the mid-levels." },

  jahns: { p: [76, 55, 86, 20, 60, 92], blurb: "The elected mayor, who walked all the way down to Mechanical to choose a new sheriff." },
  pete: { p: [40, 60, 60, 10, 45, 56], blurb: "An obstetrician in the mid-upper levels, and Juliette's father." },
  gloria: { p: [34, 30, 52, 15, 62, 28], blurb: "A paranoid woman who became the silo's fertility counsellor." },
  carla: { p: [62, 66, 56, 36, 40, 76], blurb: "The head of Supply, and Martha Walker's ex-wife." },
  kennedy: { p: [76, 70, 15, 56, 76, 30], blurb: "A maintenance worker and former smuggler of relics." },
  george: { p: [30, 86, 30, 8, 99, 25], blurb: "A computer enthusiast who ran a repair shop, and whose death Juliette would not let lie." },
  regina: { p: [56, 60, 25, 46, 72, 40], blurb: "A former relic dealer, and George's lover." },
  danny: { p: [30, 93, 50, 40, 86, 20], blurb: "A criminal hacker who breaks into IT's security network." },
  harwood: { p: [92, 56, 30, 62, 30, 66], blurb: "The head of the mining level." },

  solo: { p: [90, 88, 72, 50, 60, 14], blurb: "The only living survivor of the rebellion in Silo 17." },
  audrey: { p: [80, 62, 10, 66, 40, 60], blurb: "The leader of a group of young orphaned survivors in Silo 17." },

  daniel: { p: [70, 76, 86, 50, 86, 80], blurb: "A United States congressman in the time before the silos." },
  helen: { p: [66, 70, 40, 30, 99, 55], blurb: "An inquisitive journalist based in Washington, D.C." },
  rosalind: { p: [55, 60, 96, 62, 50, 90], blurb: "A United States senator overseeing the congressional response." },
  charlotte: { p: [88, 72, 60, 70, 56, 46], blurb: "Daniel's sister and a United States military pilot." },
  stensen: { p: [40, 82, 98, 76, 52, 99], blurb: "The world's wealthiest person, who funds the construction of the silos." },
};

export const CARDS = Object.entries(RAW).map(([id, r], i) => {
  const c = CHARACTERS[id];
  return {
    id, no: i + 1, name: c.name, role: c.role, faction: c.faction, blurb: r.blurb,
    stats: Object.fromEntries(STATS.map((s, j) => [s.key, r.p[j]])),
  };
});
