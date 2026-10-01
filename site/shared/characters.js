// People shared by the character quiz and Silo Trumps. Portrait fields are parts for
// shared/portraits.js. Roles stay within what the series has aired up to the end of season 3.

export const FACTIONS = {
  mechanical: { name: "Mechanical", colour: "#5b8cc4" },
  it: { name: "IT", colour: "#b9c2c6" },
  judicial: { name: "Judicial", colour: "#9b8fb0" },
  sheriff: { name: "Sheriff's Office", colour: "#e9c46a" },
  residents: { name: "Silo 18", colour: "#d27a4a" },
  silo17: { name: "Silo 17", colour: "#93a35f", light: "dim", registry: "SILO 17 · NO RECORD" },
  before: { name: "The world before", colour: "#7fb0a8", light: "day", registry: "BEFORE THE SILOS" },
};

const C = (name, short, faction, role, portrait) => ({ name, short, faction, role, portrait });

export const CHARACTERS = {
  juliette: C("Juliette Nichols", "J. Nichols", "mechanical", "Engineer, then sheriff", { hair: "ponytail", hairColour: "brown", attire: "coverall", accessory: "star" }),
  walker: C("Martha Walker", "M. Walker", "mechanical", "Electrical engineer", { hair: "crop", hairColour: "white", attire: "work", accessory: "goggles" }),
  knox: C("Knox", "Knox", "mechanical", "Head of Mechanical", { hair: "short", beard: "full", attire: "coverall" }),
  shirley: C("Shirley Campbell", "S. Campbell", "mechanical", "Engineer", { hair: "puff", attire: "coverall", accessory: "goggles" }),
  cooper: C("Cooper", "T. Cooper", "mechanical", "Rookie engineer", { hair: "short", hairColour: "brown", attire: "coverall" }),
  teddy: C("Teddy", "Teddy", "mechanical", "Mechanical worker", { hair: "crop", beard: "stubble", attire: "work" }),

  bernard: C("Bernard Holland", "B. Holland", "it", "Head of IT", { hair: "parted", hairColour: "grey", glasses: true, attire: "suit" }),
  lukas: C("Lukas Kyle", "L. Kyle", "it", "Systems analyst", { hair: "curly", beard: "short", attire: "knit" }),
  allison: C("Allison Becker", "A. Becker", "it", "IT", { hair: "long", hairColour: "brown", attire: "knit" }),

  meadows: C("Judge Meadows", "M. Meadows", "judicial", "Head of Judicial", { hair: "bun", hairColour: "grey", attire: "judicial", glasses: true }),
  sims: C("Robert Sims", "R. Sims", "judicial", "Head of Judicial security", { hair: "bald", beard: "short", attire: "judicial" }),
  camille: C("Camille Sims", "C. Sims", "judicial", "Former raider", { hair: "bun", attire: "judicial" }),
  amundsen: C("Rick Amundsen", "R. Amundsen", "judicial", "Raider", { hair: "crop", beard: "short", attire: "work" }),
  trumbull: C("Douglas Trumbull", "D. Trumbull", "judicial", "Judicial enforcer", { hair: "bald", attire: "work" }),

  holston: C("Holston Becker", "H. Becker", "sheriff", "Sheriff", { hair: "crop", beard: "stubble", attire: "uniform", accessory: "star" }),
  marnes: C("Sam Marnes", "S. Marnes", "sheriff", "Deputy", { hair: "short", hairColour: "grey", beard: "stubble", beardColour: "grey", attire: "uniform", accessory: "star" }),
  billings: C("Paul Billings", "P. Billings", "sheriff", "Chief deputy", { hair: "short", attire: "uniform", accessory: "star" }),
  hank: C("Hank Murphy", "H. Murphy", "sheriff", "Deputy, lower levels", { hair: "short", hairColour: "brown", beard: "stubble", attire: "uniform", accessory: "star" }),
  molly: C("Molly Karins", "M. Karins", "sheriff", "Deputy, mid-levels", { hair: "ponytail", attire: "uniform", accessory: "star" }),

  jahns: C("Ruth Jahns", "R. Jahns", "residents", "Mayor", { hair: "short", hairColour: "grey", glasses: true, attire: "cardigan" }),
  pete: C("Pete Nichols", "Dr P. Nichols", "residents", "Obstetrician", { hair: "parted", hairColour: "grey", beard: "short", beardColour: "grey", attire: "coat" }),
  gloria: C("Gloria Hildebrandt", "G. Hildebrandt", "residents", "Fertility counsellor", { hair: "curly", hairColour: "grey", glasses: true, attire: "cardigan" }),
  carla: C("Carla McLain", "C. McLain", "residents", "Head of Supply", { hair: "crop", glasses: true, attire: "work" }),
  kennedy: C("Patrick Kennedy", "P. Kennedy", "residents", "Maintenance worker", { hair: "crop", beard: "goatee", attire: "work" }),
  george: C("George Wilkins", "G. Wilkins", "residents", "Repair shop owner", { hair: "curly", hairColour: "brown", glasses: true, attire: "knit" }),
  regina: C("Regina Jackson", "R. Jackson", "residents", "Relic dealer", { hair: "long", attire: "cardigan" }),
  danny: C("Danny", "Danny", "residents", "Hacker", { hair: "short", hairColour: "brown", beard: "stubble", attire: "knit" }),
  harwood: C("Ed Harwood", "E. Harwood", "residents", "Head of the mining level", { hair: "bald", beard: "full", beardColour: "grey", attire: "work" }),

  solo: C("Solo", "Solo", "silo17", "Silo 17", { hair: "wild", hairColour: "grey", beard: "full", attire: "rags" }),
  audrey: C("Audrey", "Audrey", "silo17", "Silo 17", { hair: "long", hairColour: "brown", attire: "rags" }),

  daniel: C("Daniel Keene", "D. Keene", "before", "Congressman", { hair: "parted", hairColour: "brown", attire: "suit" }),
  helen: C("Helen Drew", "H. Drew", "before", "Journalist", { hair: "long", attire: "knit" }),
  rosalind: C("Rosalind Thurman", "R. Thurman", "before", "Senator", { hair: "short", hairColour: "white", attire: "suit" }),
  charlotte: C("Charlotte Keene", "C. Keene", "before", "Military pilot", { hair: "bun", hairColour: "brown", attire: "uniform" }),
  stensen: C("Per Stensen", "P. Stensen", "before", "Billionaire", { hair: "crop", hairColour: "brown", glasses: true, attire: "suit" }),
};

// Flatten a character into what portrait() and idCard() expect.
export const sitter = (id) => {
  const c = CHARACTERS[id];
  const f = FACTIONS[c.faction];
  return { ...c.portrait, name: c.name, short: c.short, colour: f.colour, light: f.light, registry: f.registry };
};
