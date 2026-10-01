// "Which Silo resident are you?"
// Character details stay within what the series has aired; see the README for the spoiler policy.
// Personnel notes are written for this quiz, not quoted from the show.
import { idCard } from "../shared/portraits.js";
import { CHARACTERS, FACTIONS, sitter } from "../shared/characters.js";

const band = (v, low, mid, high) => (v < 34 ? low : v < 67 ? mid : high);

const PROFILES = {
  juliette: {
    badge: "Mechanical engineer, then sheriff",
    tagline: "You cannot leave a broken thing alone, whether it is a pump or a story.",
    body: [
      "You grew up down deep with grease under your nails and a temper you never quite learned to hide. You trust your hands more than anyone's word, and when something does not add up you keep pulling at it until it comes apart.",
      "People up top find you difficult. People who need something fixed find you indispensable. You would rather be right than safe, and you have the scars to prove it.",
    ],
    note: "Refuses reassignment. Refuses explanation. Refuses, in general.",
  },
  bernard: {
    badge: "Head of IT",
    tagline: "You know more than you say, and you believe that is a kindness.",
    body: [
      "You are patient, well read and very hard to surprise. You understand systems, of machines and of people, and you have made peace with the idea that someone has to make the difficult decisions so that everyone else can sleep.",
      "You prefer quiet rooms, good books and being three moves ahead. Whether you are protecting the silo or controlling it is a question you have answered for yourself, and you do not enjoy being asked it.",
    ],
    note: "Cleared for everything. Shares nothing.",
  },
  sims: {
    badge: "Head of security for Judicial",
    tagline: "You keep order so that other people don't have to think about it.",
    body: [
      "You are calm, disciplined and frightening when you need to be. You believe in rules because you have seen what happens without them, and you will do unpleasant work so that your family never has to.",
      "Few people know what you are like at home. Fewer still would believe it.",
    ],
    note: "Reliable. Do not ask how.",
  },
  camille: {
    badge: "Judicial, once a raider",
    tagline: "You see every room as a board and every person as a piece.",
    body: [
      "You are sharp, composed and ambitious, and you do not apologise for any of it. You read people quickly, you remember what they let slip, and you are rarely the last to know anything.",
      "Loyalty matters to you, but you choose where it goes. Anyone who underestimates you tends to do it only once.",
    ],
    note: "Watch closely. She is already watching you.",
  },
  lukas: {
    badge: "IT systems analyst",
    tagline: "You count the stars because nobody told you that you couldn't.",
    body: [
      "You are gentle, curious and happiest with a puzzle in front of you. You notice patterns other people walk straight past and you cannot stop wondering what they mean.",
      "You are braver than you look, mostly because you do not realise how much trouble a good question can get you into.",
    ],
    note: "Excellent analyst. Asks too many questions.",
  },
  walker: {
    badge: "Electrical engineer, Mechanical",
    tagline: "You can fix almost anything, as long as you don't have to leave the room.",
    body: [
      "You are brilliant, prickly and deeply loyal to the very few people you let in. Your workshop is your world, and you have built it so that nothing in it fails you.",
      "Under the gruffness you care more than you let on. You would cross the silo for someone you love, and it would cost you more than anyone could guess.",
    ],
    note: "Has not left her workshop in years. Has not needed to.",
  },
  holston: {
    badge: "Sheriff",
    tagline: "You did your duty for years. Love is what made you ask questions.",
    body: [
      "You are steady, decent and respected on every level. You believe in the job and the people you protect, and you carry the weight of both without complaint.",
      "When someone you love starts looking for the truth, you follow them, even when you know where it might lead.",
    ],
    note: "An exemplary officer. Until he wasn't.",
  },
  allison: {
    badge: "IT",
    tagline: "You found something that wasn't meant to be found, and you couldn't unsee it.",
    body: [
      "You are warm, clever and hopeful, and you want a life with more in it than the silo allows. You are good at your work precisely because you notice what is missing.",
      "When the evidence points somewhere frightening you keep following it, and you would rather know the truth than live comfortably with a lie.",
    ],
    note: "Recovered deleted files. Cause for concern.",
  },
  jahns: {
    badge: "Mayor",
    tagline: "You lead by walking the stairs yourself.",
    body: [
      "You are principled, patient and stubborn in the quietest possible way. You believe the silo works when people trust each other, and you are willing to walk a very long way to earn that trust.",
      "You know where the power in the silo really sits, and you do not let it frighten you out of doing what is right.",
    ],
    note: "Popular on every level. Not popular with everyone.",
  },
  billings: {
    badge: "Chief deputy, later sheriff",
    tagline: "You follow the rules, until the rules ask too much of you.",
    body: [
      "You are careful, methodical and conscientious. You came up through Judicial and you know the Pact better than most, which is exactly why its silences trouble you.",
      "You want to do the right thing and you want to do it properly. When those two pull apart, you lose sleep, and then you choose.",
    ],
    note: "Diligent. Possibly too diligent.",
  },
  knox: {
    badge: "Head of Mechanical",
    tagline: "You stand between your people and everyone above them.",
    body: [
      "You are tough, blunt and fiercely protective of the people who work for you. You have no patience for speeches from up top and endless patience for the people who keep the machines running.",
      "You would rather fight than bargain, and you would rather die than abandon your own.",
    ],
    note: "Mechanical will follow him anywhere. That is the problem.",
  },
  shirley: {
    badge: "Engineer, Mechanical",
    tagline: "You keep things running while everyone else argues.",
    body: [
      "You are practical, steady and quietly brave. You do the work in front of you, you look after the people next to you, and you rarely need to be asked twice.",
      "People underestimate how much holds together because of you. They notice when you are not there.",
    ],
    note: "Dependable. Keeps the generator turning.",
  },
  kennedy: {
    badge: "Maintenance worker and relic smuggler",
    tagline: "Rules are for people who can afford them.",
    body: [
      "You are a survivor, a talker and a dealer in things nobody is supposed to have. You know how goods move through the silo when nobody is looking, and you have paid for that knowledge.",
      "You are cynical about authority and loyal to almost nobody, which makes it all the more surprising when you turn out to be on the right side.",
    ],
    note: "Known to Judicial. Several times.",
  },
  pete: {
    badge: "Physician and obstetrician",
    tagline: "You have learned to keep your head down, and you are not proud of it.",
    body: [
      "You are kind, careful and good at your work, and the silo trusts you with its most important moments. You have seen what happens to people who ask questions, and you have chosen caution.",
      "That caution has cost you more than you admit, and part of you is still waiting for the chance to be braver.",
    ],
    note: "Excellent clinician. Estranged from his daughter.",
  },
  solo: {
    badge: "Silo 17",
    tagline: "You have been alone so long that you have made yourself good company.",
    body: [
      "You are odd, resourceful and much sharper than you first appear. You have survived on your own with whatever was to hand, and you have opinions about everything, mostly delivered to yourself.",
      "You are hungry for company and wary of it in equal measure. Once someone has earned your trust, you are theirs entirely.",
    ],
    note: "No file found. Not a resident of Silo 18.",
  },
};

const quiz = {
  id: "residents",
  form: "Form 18-P",
  kicker: "Personnel Records",
  titleHtml: "Which resident <em>are you?</em>",
  intro: "Ten thousand people live in the silo, and every one of them has a file. Answer sixteen questions and the records office will find the one that matches yours.",
  cutoff: "Safe to the end of season 3",
  disclaimer: "A non-commercial fan project. Not affiliated with or endorsed by Apple TV+, AMC Studios or Hugh Howey. All illustrations are original.",
  labels: {
    begin: "Open your file",
    processing: ["SEARCHING PERSONNEL FILES", "COMPARING 10,000 RESIDENTS", "MATCH FOUND"],
    shared: "A resident shared their file with you.",
    notice: "Personnel File",
    assignTo: "Your file matches",
    axes: "Your evaluation",
    second: "Close match",
    stamp: "MATCHED",
    stampLegend: "RECORDS OFFICE",
    share: "Share your file",
  },
  illustrate: (id) => idCard(sitter(id)),
  shareText: (d) => `The silo's records office says I'm ${d.name}. Which resident are you?`,

  axes: [
    {
      key: "curiosity", label: "Curiosity",
      describe: (v) => band(v, "You leave locked doors locked.", "You notice what doesn't add up, and mostly let it go.", "You can't leave a question alone."),
    },
    {
      key: "order", label: "Order",
      describe: (v) => band(v, "The Pact is a suggestion as far as you're concerned.", "You follow the rules you can see the point of.", "You believe the rules are what keep everyone alive."),
    },
    {
      key: "grit", label: "Grit",
      describe: (v) => band(v, "You'd rather think a problem through than force it.", "You'll carry the load when it needs carrying.", "You keep going long after everyone else has stopped."),
    },
    {
      key: "heart", label: "Heart",
      describe: (v) => band(v, "You keep your feelings off the record.", "You look after your own.", "You'd walk a hundred flights for someone in trouble."),
    },
    {
      key: "ingenuity", label: "Ingenuity",
      describe: (v) => band(v, "You trust the proper procedure.", "Give you scrap and an evening and you'll get it working.", "You could build almost anything from almost nothing."),
    },
  ],

  results: Object.fromEntries(Object.entries(PROFILES).map(([id, p]) => {
    const c = CHARACTERS[id];
    const colour = FACTIONS[c.faction].colour;
    return [id, { name: c.name, colour, badge: p.badge, tagline: p.tagline, body: p.body, quote: { title: "Personnel note", text: p.note } }];
  })),

  questions: [
    {
      level: 1, where: "Level 1 · Holding cell",
      text: "You are locked in the holding cell by the airlock overnight. How do you pass the hours?",
      options: [
        { text: "Pick the lock. It's a cheap one.", results: { kennedy: 3, walker: 1 }, axes: { ingenuity: 2, order: -2 } },
        { text: "Sleep. You'll need your wits tomorrow.", results: { sims: 2, knox: 1 }, axes: { grit: 2 } },
        { text: "Go over everything you know until it fits together.", results: { juliette: 2, billings: 1 }, axes: { curiosity: 2 } },
        { text: "Talk to whoever's in the next cell until you're both laughing.", results: { solo: 3, lukas: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 11, where: "Level 11 · A gift",
      text: "Someone you love has found you a relic. What do you hope it is?",
      options: [
        { text: "A book nobody has opened in centuries.", results: { bernard: 3, lukas: 1 }, axes: { curiosity: 2, order: 1 } },
        { text: "A tool you've never seen before.", results: { walker: 3 }, axes: { ingenuity: 2 } },
        { text: "A picture of the outside, green and blue.", results: { allison: 3, holston: 1 }, axes: { curiosity: 2, heart: 1 } },
        { text: "Nothing. Relics get people killed.", results: { pete: 3, billings: 1 }, axes: { order: 2 } },
      ],
    },
    {
      level: 20, where: "Level 20 · The Pact",
      text: "You may add one clause to the Pact. What does it say?",
      options: [
        { text: "One with a loophole that only you know about.", results: { camille: 3, kennedy: 1 }, axes: { ingenuity: 1, order: -1 } },
        { text: "Every level shall be fed alike, whoever is in charge.", results: { jahns: 3, holston: 1 }, axes: { heart: 1, order: 1 } },
        { text: "Nothing. The Pact is complete as it stands.", results: { sims: 3, billings: 1 }, axes: { order: 3 } },
        { text: "No one shall be held in the cell for asking a question.", results: { juliette: 2, lukas: 1 }, axes: { curiosity: 3 } },
      ],
    },
    {
      level: 30, where: "Level 30 · A cleaning day",
      text: "A cleaning has been announced. Where are you when the airlock opens?",
      options: [
        { text: "At the screen, watching every second of it.", results: { allison: 2, lukas: 1 }, axes: { curiosity: 2 } },
        { text: "At work. You can't bear to watch.", results: { pete: 2, shirley: 1 }, axes: { heart: 1, grit: 1 } },
        { text: "Beside the airlock, making sure it goes by the book.", results: { billings: 1, sims: 1, holston: 1 }, axes: { order: 2 } },
        { text: "Somewhere you can't hear the crowd.", results: { walker: 2, solo: 1 }, axes: { heart: 1 } },
      ],
    },
    {
      level: 39, where: "Level 39 · Lights out",
      text: "The generator trips and every light in the silo goes out.",
      options: [
        { text: "You're already on the stairs with a toolbag.", results: { knox: 2, shirley: 2 }, axes: { grit: 2 } },
        { text: "You have a spare part for exactly this in your workshop.", results: { walker: 2, solo: 1 }, axes: { ingenuity: 3 } },
        { text: "Go door to door so nobody is alone in the dark.", results: { jahns: 2, pete: 2 }, axes: { heart: 2 } },
        { text: "Secure the records before anything else.", results: { bernard: 1, camille: 1, billings: 1 }, axes: { order: 2 } },
      ],
    },
    {
      level: 49, where: "Level 49 · A clear night",
      text: "The screen up top shows a rare clear night, and the stars are out. Where are you?",
      options: [
        { text: "In the cafeteria counting them, as you have for years.", results: { lukas: 3 }, axes: { curiosity: 2 } },
        { text: "Asleep. Your shift starts early.", results: { shirley: 2, knox: 1 }, axes: { grit: 1, order: 1 } },
        { text: "Wondering who decides what the screen shows.", results: { allison: 2, kennedy: 1 }, axes: { curiosity: 3, order: -1 } },
        { text: "On duty, keeping an eye on the crowd that comes to look.", results: { holston: 2, sims: 1 }, axes: { order: 2 } },
      ],
    },
    {
      level: 58, where: "Level 58 · A friend's flat",
      text: "You discover your closest friend has been hiding a relic.",
      options: [
        { text: "Help them hide it better.", results: { kennedy: 2, shirley: 1 }, axes: { order: -2, heart: 1 } },
        { text: "Tell them to hand it in before someone else finds it.", results: { billings: 2, pete: 1 }, axes: { order: 2, heart: 1 } },
        { text: "Ask to see it first.", results: { lukas: 2, allison: 1 }, axes: { curiosity: 2 } },
        { text: "Keep quiet, and remember that you know.", results: { camille: 3 }, axes: { ingenuity: 2, heart: -2 } },
      ],
    },
    {
      level: 68, where: "Level 68 · Any door",
      text: "You're given a key that will open any one door in the silo, once. Which door?",
      options: [
        { text: "The vault in IT.", results: { lukas: 2, juliette: 1 }, axes: { curiosity: 2 } },
        { text: "The holding cell, for someone who doesn't belong in it.", results: { holston: 1, kennedy: 1, knox: 1 }, axes: { heart: 1, order: -1 } },
        { text: "Your own front door, so it finally locks properly.", results: { walker: 1, solo: 1, pete: 1 }, axes: { order: 1 } },
        { text: "None. You'd trade it; a key like that is worth a great deal.", results: { camille: 1, kennedy: 2 }, axes: { ingenuity: 2 } },
      ],
    },
    {
      level: 77, where: "Level 77 · The mids",
      text: "Supplies have stopped reaching the lower levels, and your people are hungry.",
      options: [
        { text: "Lead them up the stairs to take what you're owed.", results: { knox: 3 }, axes: { grit: 2, order: -2 } },
        { text: "Find a way to grow it or make it yourselves.", results: { walker: 1, solo: 2, shirley: 1 }, axes: { ingenuity: 2 } },
        { text: "Go and negotiate with whoever holds the stores.", results: { jahns: 2, camille: 1 }, axes: { heart: 1, ingenuity: 1 } },
        { text: "Share out what you have, fairly, and keep everyone calm.", results: { shirley: 2, pete: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 87, where: "Level 87 · An offer",
      text: "The mayor has walked all the way down the stair to offer you a job you never asked for.",
      options: [
        { text: "Take it, on your own terms.", results: { juliette: 3 }, axes: { grit: 1, order: -1 } },
        { text: "Take it, and do it by the book.", results: { billings: 3 }, axes: { order: 2 } },
        { text: "Turn it down. You're needed where you are.", results: { knox: 1, pete: 1, shirley: 1 }, axes: { heart: 1, grit: 1 } },
        { text: "Take it, and the one above it, in time.", results: { camille: 2, bernard: 1 }, axes: { ingenuity: 1, order: 1 } },
      ],
    },
    {
      level: 96, where: "Level 96 · An empty silo",
      text: "You could have a whole empty silo to yourself, its stores still full. How does that sound?",
      options: [
        { text: "Wonderful. You'd finally get some work done.", results: { solo: 3, walker: 1 }, axes: { ingenuity: 1 } },
        { text: "Awful. You need people around you.", results: { jahns: 1, holston: 1, allison: 1 }, axes: { heart: 2 } },
        { text: "You'd read everything there is to read.", results: { bernard: 2, lukas: 1 }, axes: { curiosity: 2 } },
        { text: "You'd spend it looking for a way out.", results: { kennedy: 2, juliette: 1 }, axes: { grit: 1, curiosity: 1 } },
      ],
    },
    {
      level: 106, where: "Level 106 · Word on the stair",
      text: "Word reaches you that someone you trust has been reporting on you to Judicial.",
      options: [
        { text: "Confront them.", results: { knox: 2, juliette: 1 }, axes: { grit: 2 } },
        { text: "Feed them something false and see where it ends up.", results: { bernard: 2, camille: 1 }, axes: { ingenuity: 2 } },
        { text: "Report them in turn.", results: { sims: 2, billings: 1 }, axes: { order: 2 } },
        { text: "Let it go. Everyone reports to someone.", results: { pete: 1, jahns: 1, shirley: 1 }, axes: { heart: 1 } },
      ],
    },
    {
      level: 115, where: "Level 115 · Someone you love",
      text: "The person you love has started asking questions about the outside.",
      options: [
        { text: "Follow them, wherever it leads.", results: { holston: 3 }, axes: { heart: 3 } },
        { text: "Make them stop asking questions, for their own good.", results: { pete: 2, sims: 1 }, axes: { order: 2 } },
        { text: "Find out what they know.", results: { allison: 2, lukas: 1 }, axes: { curiosity: 2 } },
        { text: "Make whoever threatens them regret it.", results: { sims: 2, knox: 1 }, axes: { grit: 2, heart: 1 } },
      ],
    },
    {
      level: 125, where: "Level 125 · The stair wall",
      text: "You get one line, painted on the wall of the stair. What does it say?",
      options: [
        { text: "\u201cOrder keeps us alive.\u201d", results: { bernard: 3, sims: 1 }, axes: { order: 3 } },
        { text: "\u201cWe deserve the truth.\u201d", results: { juliette: 2, allison: 1 }, axes: { curiosity: 2, order: -1 } },
        { text: "\u201cLook after each other.\u201d", results: { jahns: 2, lukas: 1 }, axes: { heart: 2 } },
        { text: "\u201cKeep the generator turning.\u201d", results: { knox: 2, walker: 1 }, axes: { ingenuity: 1, grit: 1 } },
      ],
    },
    {
      level: 134, where: "Level 134 · A teacher",
      text: "You may shadow anyone in the silo for a week. What do you want to learn?",
      options: [
        { text: "How to keep a generator alive.", results: { shirley: 2, walker: 1 }, axes: { ingenuity: 1, grit: 1 } },
        { text: "How to read the files nobody is meant to read.", results: { lukas: 1, allison: 1, bernard: 1 }, axes: { curiosity: 2 } },
        { text: "How to talk any room round.", results: { jahns: 2, camille: 1 }, axes: { heart: 1, ingenuity: 1 } },
        { text: "How to survive entirely on your own.", results: { kennedy: 2, solo: 1 }, axes: { grit: 2 } },
      ],
    },
    {
      level: 144, where: "Level 144 · Somewhere quiet",
      text: "Where in the silo do you feel most like yourself?",
      options: [
        { text: "The cafeteria, looking at the screen.", results: { holston: 2, allison: 1 }, axes: { heart: 1, curiosity: 1 } },
        { text: "Anywhere with a door that locks.", results: { solo: 2, walker: 1, kennedy: 1 }, axes: { order: -1, ingenuity: 1 } },
        { text: "An office, with the files in order.", results: { bernard: 1, camille: 1, billings: 2 }, axes: { order: 2 } },
        { text: "The generator room.", results: { shirley: 2, juliette: 1 }, axes: { grit: 2 } },
      ],
    },
  ],
};

export default quiz;
