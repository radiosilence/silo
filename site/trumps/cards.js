import { CHARACTERS, FACTIONS } from "../shared/characters.js";

export const STATS = [
  { key: "secrets", label: "Secrets", hint: "How much of the truth about the silo they know. Knowing is not encouraged." },
  { key: "pact", label: "Pact", hint: "Devotion to the rules and the order they keep. Recitation on request." },
  { key: "uprising", label: "Uprising", hint: "Appetite for tearing it all down. Judicial keeps a list." },
  { key: "knowhow", label: "Know-how", hint: "Can they fix it, down deep or anywhere else." },
  { key: "pull", label: "Pull", hint: "Sway with those up top, measured in favours owed." },
  { key: "stair", label: "Stair Miles", hint: "How much of the silo their legs have covered. There are 144 levels and no lifts." },
  { key: "cleanings", label: "Near Cleanings", hint: "How close they have come to being sent out to clean. Usually best kept low; here, higher wins." },
];

export { FACTIONS };

// p: [secrets, pact, uprising, knowhow, pull, stair, cleanings], judged from what happens on screen.
// Season 3 characters are rated conservatively.
const RAW = {
  juliette: { p: [82, 8, 86, 95, 45, 95, 99], blurb: "Engineer, then sheriff, and the silo's foremost authority on what happens after you are sent out to clean." },
  walker: { p: [60, 25, 55, 97, 20, 12, 10], blurb: "Can fix anything you bring her. You will have to bring it: she is not coming to you." },
  knox: { p: [35, 18, 92, 86, 25, 72, 30], blurb: "Head of Mechanical. Opinions about up top available on request, and often without one." },
  shirley: { p: [30, 30, 70, 80, 15, 55, 10], blurb: "An engineer in Mechanical and Juliette's closest friend, which is a full-time job in itself." },
  cooper: { p: [20, 40, 50, 56, 5, 50, 10], blurb: "A rookie engineer and Juliette's shadow. Learning fast, mostly about trouble." },
  teddy: { p: [10, 45, 50, 50, 6, 62, 5], blurb: "A Mechanical worker who turned up with food when the deliveries stopped. Remembered fondly for it." },
  bernard: { p: [100, 95, 4, 72, 98, 40, 3], blurb: "Head of IT. Knows what is in the Legacy, what is outside and, quite possibly, what you did on Tuesday." },
  lukas: { p: [85, 45, 40, 82, 60, 35, 15], blurb: "A systems analyst in IT who counts the stars on clear nights. There is no clause against it. Yet." },
  allison: { p: [70, 25, 42, 72, 20, 30, 96], blurb: "Recovered some deleted files in IT, then said the words. Neither could be taken back." },
  meadows: { p: [86, 96, 4, 30, 90, 20, 0], blurb: "Head of Judicial. Enforces the Pact, and has read it more times than anyone asked her to." },
  sims: { p: [76, 92, 10, 46, 86, 62, 5], blurb: "Head of security for Judicial. Keeps order. Does not discuss method." },
  camille: { p: [62, 60, 35, 56, 72, 40, 12], blurb: "Robert Sims's wife, once a raider, and nobody's fool in any room she chooses to be in." },
  amundsen: { p: [25, 86, 8, 36, 50, 62, 5], blurb: "A high-ranking raider. If he is knocking, the relic has already been found." },
  trumbull: { p: [20, 86, 8, 30, 40, 56, 5], blurb: "An enforcer for Judicial, loyal to Sims. Conversation not included." },
  holston: { p: [62, 72, 40, 50, 76, 86, 95], blurb: "Sheriff of the silo and Allison's devoted husband, all the way to the airlock." },
  marnes: { p: [40, 70, 20, 46, 56, 76, 10], blurb: "Holston's deputy, who works closely with Mayor Jahns and has climbed more stairs than he cares to count." },
  billings: { p: [56, 76, 30, 50, 62, 60, 12], blurb: "A Judicial administrator who became chief deputy, then sheriff. Still fond of a form." },
  hank: { p: [25, 60, 40, 40, 20, 72, 10], blurb: "A deputy in the lower levels, where the paperwork is lighter and the trouble heavier." },
  molly: { p: [15, 72, 20, 36, 25, 66, 5], blurb: "A deputy in the mid-levels, equidistant from every kind of trouble." },
  jahns: { p: [52, 70, 30, 40, 92, 92, 5], blurb: "The elected mayor, who walked all the way down to Mechanical to choose a sheriff. Took the stairs both ways." },
  pete: { p: [30, 76, 15, 72, 56, 40, 5], blurb: "An obstetrician, Juliette's father, and a man who keeps his head down to a professional standard." },
  gloria: { p: [40, 66, 15, 30, 40, 25, 5], blurb: "A paranoid woman who became the silo's fertility counsellor. Both qualifications are taken seriously." },
  carla: { p: [40, 50, 60, 62, 56, 40, 10], blurb: "Head of Supply and Martha Walker's ex-wife. Knows where every spare part is, and who borrowed it." },
  kennedy: { p: [46, 5, 76, 72, 10, 66, 40], blurb: "A maintenance worker and former relic smuggler. Judicial knows his file by heart." },
  george: { p: [76, 10, 60, 92, 10, 50, 20], blurb: "Ran a repair shop and loved anything old. His death set Juliette asking questions, and everything followed." },
  regina: { p: [46, 10, 56, 50, 20, 46, 15], blurb: "A former relic dealer and George's lover. Discreet in both capacities." },
  danny: { p: [60, 5, 76, 92, 10, 30, 20], blurb: "A criminal hacker who breaks into IT's security network, which IT would rather you did not mention." },
  harwood: { p: [25, 56, 40, 72, 30, 60, 5], blurb: "Head of the mining level, which is further from daylight than anywhere else. That is saying something in here." },
  solo: { p: [90, 5, 50, 86, 5, 70, 5], blurb: "The only living survivor of the rebellion in Silo 17, and excellent company, by his own account." },
  audrey: { p: [30, 10, 60, 46, 5, 50, 0], blurb: "Leads a group of young orphaned survivors in Silo 17. Strangers are not given the benefit of the doubt." },
  daniel: { p: [80, 40, 50, 60, 85, 20, 0], blurb: "A United States congressman in the time before the silos. Stair Miles not yet required." },
  helen: { p: [78, 20, 62, 50, 40, 20, 0], blurb: "An inquisitive journalist in Washington, D.C. Would have been sent out to clean within the week." },
  rosalind: { p: [86, 80, 10, 36, 95, 10, 0], blurb: "A United States senator overseeing the congressional response. Has never queued for water in her life." },
  charlotte: { p: [60, 60, 40, 82, 40, 30, 0], blurb: "Daniel's sister and a United States military pilot, from the days when going up was allowed." },
  stensen: { p: [92, 50, 20, 60, 99, 5, 0], blurb: "The world's wealthiest person, who funds the construction of the silos. Pull: considerable." },
};

export const CARDS = Object.entries(RAW).map(([id, r], i) => {
  const c = CHARACTERS[id];
  return {
    id, no: i + 1, name: c.name, role: c.role, faction: c.faction, blurb: r.blurb,
    stats: Object.fromEntries(STATS.map((s, j) => [s.key, r.p[j]])),
  };
});
