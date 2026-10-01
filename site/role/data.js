// "Which job would you have in the Silo?"
// Facts are kept to what the TV series has aired; see the README for the spoiler policy.
// Pact clauses are invented in the Pact's register, not quoted from the show.

import { insignia } from "../shared/art.js";

const band = (v, low, mid, high) => (v < 34 ? low : v < 67 ? mid : high);

const quiz = {
  id: "jobs",
  form: "Form 18-J",
  kicker: "Office of Assignment",
  titleHtml: "Which job<br>would you have <em>in the Silo?</em>",
  intro: "Every resident shadows a trade. Answer twenty questions about how you live and what you value and the Office of Assignment will place you, from the top of the silo to the bottom.",
  cutoff: "Safe to the end of season 3",
  disclaimer: "A non-commercial fan project. Not affiliated with or endorsed by Apple TV+, AMC Studios or Hugh Howey. All illustrations are original.",
  labels: {
    begin: "Begin assignment",
    processing: ["FILING FORM 18-J", "CROSS-REFERENCING DEPARTMENT ROLLS", "AWAITING STAMP"],
    shared: "A resident shared their assignment with you.",
    notice: "Notice of Assignment",
    assignTo: "You are assigned to",
    axes: "Your evaluation",
    people: "You would work alongside",
    second: "Secondary assignment",
    stamp: "ASSIGNED",
    share: "Share assignment",
  },
  illustrate: (id) => insignia(id, quiz.results[id]),
  shareText: (d) => `The Office of Assignment has placed me in ${d.name}. Which job would you have in the Silo?`,

  axes: [
    {
      key: "curiosity", label: "Curiosity",
      describe: (v) => band(v, "You leave locked doors locked. That keeps people alive in here.", "You notice what doesn't add up, and mostly let it go.", "You can't leave a question alone, which is exactly how people end up outside."),
    },
    {
      key: "order", label: "Order",
      describe: (v) => band(v, "The Pact is a suggestion as far as you're concerned. Judicial has noticed.", "You follow the rules you can see the point of.", "You believe the rules are what keep ten thousand people from tearing each other apart."),
    },
    {
      key: "grit", label: "Grit",
      describe: (v) => band(v, "You'd rather think a problem through than haul it up forty flights.", "You'll carry the load when it needs carrying.", "Double shifts, cold water, a hundred flights with a full pack. You keep going."),
    },
    {
      key: "heart", label: "Heart",
      describe: (v) => band(v, "You keep your feelings off the record.", "You look after your own, and notice when someone isn't coping.", "Everyone on your level knows whose door to knock on."),
    },
    {
      key: "ingenuity", label: "Ingenuity",
      describe: (v) => band(v, "You trust the proper procedure over a clever fix.", "Give you scrap and an evening and you'll get it working.", "You could rebuild half the silo from what's in Supply's reject bins."),
    },
  ],

  results: {
    mechanical: {
      name: "Mechanical", code: "MECH", colour: "#4f7fb3",
      badge: "Down deep · the lowest levels",
      tagline: "Keeping the generator turning, the pumps running and the lights on for everyone above you.",
      body: [
        "You live at the bottom of the silo, where the air is warm and smells of oil and the noise of the generator is something you only hear when it stops. Up top they call you grease-stained, and they would be in the dark within a day without you.",
        "Your shifts are long and your hands are never clean. Mechanical looks after its own, distrusts anything that comes down the stairs in a pressed uniform, and knows exactly how much the rest of the silo depends on it.",
      ],
      people: [
        ["Juliette Nichols", "Engineer on the generator, before she was sent up top"],
        ["Knox", "Head of Mechanical"],
        ["Shirley Campbell", "Engineer"],
        ["Martha Walker", "Electrical engineer, who fixes things in a workshop she does not leave"],
        ["Cooper", "Rookie engineer and Juliette's shadow"],
      ],
      quote: { title: "Pact clause · Machinery", text: "The machines of the silo are the life of the silo. Those who keep them shall be provided for, and shall not leave their post while the machines have need of them." },
    },
    it: {
      name: "IT", code: "IT", colour: "#a9b2b6",
      badge: "Up top · near the servers",
      tagline: "Keeping the silo's records, its systems and, if you rise far enough, its secrets.",
      body: [
        "You work in clean rooms near the top of the silo, among humming servers and people who speak quietly. The work is careful: data, records, systems that must never fail. Everyone in the silo depends on what you maintain, and almost nobody understands it.",
        "IT rewards patience and discretion. If you are good, someone senior may ask you to become their shadow, and from then on you will be told things you cannot repeat. You will learn that knowing the truth and being free are not the same thing.",
      ],
      people: [
        ["Bernard Holland", "Head of IT"],
        ["Lukas Kyle", "Systems analyst, who spends his nights off counting the stars"],
        ["Allison Becker", "Worked in IT, and went looking through old files"],
      ],
      quote: { title: "Pact clause · Records", text: "The records of the silo shall be kept whole and kept close. What is not needed to be known shall not be sought, and what is found shall be returned to its keeper." },
    },
    judicial: {
      name: "Judicial", code: "JUD", colour: "#2d2c2f", ink: "#ebe3cd",
      badge: "Up top · the halls of the Pact",
      tagline: "Interpreting the Pact, judging those who break it and keeping order across all 144 levels.",
      body: [
        "Your office is up top, your clothes are pressed and people lower their voices when you walk past. Judicial reads the Pact, decides what it means and makes sure everyone else lives by it.",
        "You believe order is the only thing between ten thousand people and the end of everything. You will take statements, search flats for relics and sometimes do things that keep you awake. Most days you can tell yourself it was necessary.",
      ],
      people: [
        ["Judge Meadows", "Head of Judicial"],
        ["Robert Sims", "Head of security for Judicial"],
        ["Camille Sims", "Once a Judicial raider"],
        ["Paul Billings", "A Judicial administrator before he joined the sheriff's office"],
      ],
      quote: { title: "Pact clause · Order", text: "No resident shall possess, trade or conceal a relic of the time before. Any found shall be surrendered to Judicial, and the finder shall make an account of it." },
    },
    sheriff: {
      name: "Sheriff's Office", code: "SHERIFF", colour: "#c9a24a",
      badge: "Level 1 · beside the airlock",
      tagline: "Keeping the peace, investigating deaths and holding the cell that nobody wants to see used.",
      body: [
        "Your office is on the top level, next to the cafeteria and the airlock, and the cell in the back is where people wait after they say they want to go out. You carry the badge up and down every one of the 144 levels, and everybody knows your face.",
        "The job is answering to the Pact and to the people at the same time. When someone dies down deep and the report says it was an accident, you are the one who has to decide whether to believe it.",
      ],
      people: [
        ["Holston Becker", "Sheriff"],
        ["Sam Marnes", "Deputy to Holston"],
        ["Juliette Nichols", "Brought up from Mechanical to take the badge"],
        ["Paul Billings", "Chief deputy, later sheriff"],
        ["Hank Murphy", "Deputy in the lower levels"],
      ],
      quote: { title: "Pact clause · The Peace", text: "The sheriff shall keep the peace of the silo, shall hold any resident who asks to go out, and shall see that the wish is granted according to the Pact." },
    },
    supply: {
      name: "Supply", code: "SUPPLY", colour: "#94683f",
      badge: "The mids",
      tagline: "Keeping track of every part, crate and bolt in a silo where nothing new can ever be made from scratch.",
      body: [
        "You live in the mids and work among shelves that go back further than anyone can remember. Everything in the silo passes through your ledgers eventually: parts, cloth, wire, the things people need and the things they say they need.",
        "Supply runs on lists, chits and favours. You know who owes whom, which levels are hoarding and where the last spare gasket of its kind is kept. In a closed world, the person who knows where things are has a great deal of quiet power.",
      ],
      people: [
        ["Carla McLain", "Head of Supply"],
        ["Orla Kent", "Acting head of Supply"],
      ],
      quote: { title: "Pact clause · Stores", text: "Nothing of the silo shall be wasted. All that is worn shall be mended, all that is broken shall be returned, and all stores shall be counted and accounted for." },
    },
    farms: {
      name: "The Farms", code: "FARMS", colour: "#62893d",
      badge: "Farm levels, including 122",
      tagline: "Growing the food that feeds ten thousand people under grow lights that must never go out.",
      body: [
        "You work under the grow lights, where it is warmer and greener than anywhere else in the silo and smells of soil instead of rust. The days follow the crops: planting, tending, harvesting, starting again.",
        "Nobody writes songs about farmers, but everybody eats. When the levels fall out with each other, food is the first thing that gets fought over, and the farmers' market on 122 is where you will hear what people are really thinking.",
      ],
      people: [],
      nobody: "No famous names here. The people who feed the silo rarely make the story, and they prefer it that way.",
      quote: { title: "Pact clause · The Harvest", text: "The farms shall feed every level of the silo alike. No harvest shall be withheld from any resident, and the lights of the farms shall be the last to go dark." },
    },
    medical: {
      name: "Medical", code: "MED", colour: "#e7e1d3",
      badge: "The mid-upper levels",
      tagline: "Treating the sick, setting bones and bringing each new life into the silo.",
      body: [
        "You live in the mid-upper levels, where doctors are respected and the flats are comfortable. You have seen the whole silo at its most frightened, and you know more about everyone's private lives than anybody else.",
        "Births are permitted, not chosen, and your work is bound up in that. Most days you are the person people come to when something has gone wrong, and you do not have the luxury of looking away.",
      ],
      people: [
        ["Dr Pete Nichols", "Physician and obstetrician, and Juliette's father"],
        ["Gloria Hildebrandt", "The silo's fertility counsellor"],
      ],
      quote: { title: "Pact clause · Life", text: "Every life in the silo is held in trust. The healer shall treat any resident without regard to level, and shall bring no child into the silo without leave." },
    },
    porters: {
      name: "Porters", code: "PORTER", colour: "#d6812e",
      badge: "All 144 levels",
      tagline: "Carrying goods, food and messages up and down the stair, all day and all night.",
      body: [
        "There are no lifts in the silo, so everything moves on someone's back, and that someone is you. You know every landing on the stair, every shortcut and every face, and you have legs like steel cable.",
        "Porters go where most residents never go. You carry notes between people who cannot otherwise speak and hear every rumour on the way. When the deliveries stop, the whole silo feels it within a day.",
      ],
      people: [],
      nobody: "The show's porters go mostly unnamed. You will have passed every one of the main characters on the stairs, though.",
      quote: { title: "Pact clause · The Stair", text: "The stair belongs to the whole silo. The porter shall have passage on every level, and no resident shall hinder a load in transit." },
    },
    mining: {
      name: "Mining", code: "MINE", colour: "#8a4a36", ink: "#ebe3cd",
      badge: "The mining level",
      tagline: "Digging out what the silo needs, in the dark and the dust, far from anyone's attention.",
      body: [
        "You work the mining level, where the silo takes what it needs from the earth around it. The work is heavy, hot and dangerous, and the people who do it are quiet, stubborn and loyal to one another.",
        "Up top they forget the mines exist until something cannot be made without them. You do not mind. Down here nobody pretends, and a shift's work is there for anyone to see.",
      ],
      people: [
        ["Ed Harwood", "Head of the mining level"],
        ["Glenda Harwood", "Ed's daughter, once a shadow in Supply"],
      ],
      quote: { title: "Pact clause · The Deep", text: "What the earth yields belongs to the whole silo. The miner shall take no more than is needed, and no level shall want for what the mines provide." },
    },
    maintenance: {
      name: "Maintenance", code: "MAINT", colour: "#3f8f8a",
      badge: "Every level",
      tagline: "Fixing whatever breaks, wherever it breaks, from leaking pipes to failing lights.",
      body: [
        "Your work takes you everywhere: a dripping valve on one level, a dead light on another, a door that will not close on a third. You carry your tools up and down the stair and know the silo's pipes and wiring better than its plans do.",
        "It is not glamorous, but you are let into more flats than anyone except the doctors, and you hear things. You are good at improvising, and you have learned when to look the other way.",
      ],
      people: [
        ["Patrick Kennedy", "Maintenance worker, and a former smuggler of relics"],
      ],
      quote: { title: "Pact clause · Repair", text: "That which is broken shall be mended where it stands. No resident shall refuse entry to those sent to repair the silo." },
    },
    mayor: {
      name: "Mayor's Office", code: "MAYOR", colour: "#6d4a86", ink: "#ebe3cd",
      badge: "Up top",
      tagline: "Holding ten thousand people together with patience, persuasion and very long walks.",
      body: [
        "You work for the silo's elected head, up top among the people who make decisions. Your days are meetings, petitions, ceremonies and quiet negotiations between departments that do not trust each other.",
        "The mayor's power is real but narrow, and you learn quickly where it ends. The best you can do is listen to every level and keep them talking to one another. Some years that is enough.",
      ],
      people: [
        ["Ruth Jahns", "The elected mayor"],
        ["Bernard Holland", "Mayor after Jahns, while still head of IT"],
      ],
      quote: { title: "Pact clause · Office", text: "The mayor shall be chosen by the residents and shall serve all levels alike, keeping the peace between the departments and the Pact above them all." },
    },
  },

  questions: [
    {
      level: 1, where: "Level 1 · Paper ration",
      text: "Paper is rationed. What do you use this month's sheets for?",
      options: [
        { text: "Drawings of something you mean to build.", results: { mechanical: 2, maintenance: 2 }, axes: { ingenuity: 2 } },
        { text: "Notes to people on other levels.", results: { porters: 2, mayor: 1, sheriff: 1 }, axes: { heart: 1, grit: 1 } },
        { text: "A ledger. You like knowing exactly where things stand.", results: { supply: 2, it: 1, judicial: 1 }, axes: { order: 2 } },
        { text: "Nothing yet. You keep them flat in a drawer, just in case.", results: { mining: 2, farms: 1, medical: 1 }, axes: { curiosity: 1 } },
      ],
    },
    {
      level: 8, where: "Level 8 · Cafeteria",
      text: "The cafeteria screen shows the hills outside, grey as ever. What do you mostly feel, looking at it?",
      options: [
        { text: "Curious. You want to know what's past the hills.", results: { sheriff: 1, it: 1 }, axes: { curiosity: 2 } },
        { text: "Grateful for the walls around you.", results: { farms: 1, judicial: 1, medical: 1 }, axes: { order: 1, heart: 1 } },
        { text: "Not much. You've work to get back to.", results: { mining: 2, mechanical: 1, maintenance: 1 }, axes: { grit: 2 } },
        { text: "Sad for the people who went out there.", results: { medical: 2, mayor: 1, porters: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 15, where: "Level 15 · On the stair",
      text: "A rumour on your level says the last cleaning was done badly and the view is getting worse.",
      options: [
        { text: "Trace it back to whoever started it.", results: { sheriff: 2, judicial: 1 }, axes: { curiosity: 2 } },
        { text: "Stop it spreading before people panic.", results: { supply: 2, it: 1 }, axes: { order: 2 } },
        { text: "Pass it on, carefully, to the people who should hear it.", results: { porters: 2, maintenance: 1 }, axes: { heart: 1, order: -1 } },
        { text: "Ask around until you know which way the level is leaning.", results: { mayor: 2, supply: 1 }, axes: { ingenuity: 1 } },
      ],
    },
    {
      level: 22, where: "Level 22 · Shadowing day",
      text: "You're fourteen and choosing a trade to shadow. What would you most like to learn?",
      options: [
        { text: "How to keep something enormous running.", results: { mechanical: 2, mining: 1, maintenance: 1 }, axes: { grit: 1, ingenuity: 1 } },
        { text: "How people are kept safe from each other.", results: { sheriff: 2, judicial: 2 }, axes: { order: 1 } },
        { text: "How to make something grow from almost nothing.", results: { farms: 2, medical: 1 }, axes: { heart: 1 } },
        { text: "How the silo really works, from top to bottom.", results: { it: 1, mayor: 1, supply: 1 }, axes: { curiosity: 2 } },
      ],
    },
    {
      level: 30, where: "Level 30 · The stair",
      text: "Which landing on the stair would you choose to sit on for an hour?",
      options: [
        { text: "The one with the longest view down the shaft.", results: { mining: 2, farms: 1, maintenance: 1 }, axes: { grit: 1 } },
        { text: "The one where the porters swap their loads.", results: { supply: 2, mayor: 1, medical: 1 }, axes: { heart: 1, order: 1 } },
        { text: "The one outside the offices up top, where you can see who comes and goes.", results: { it: 1, judicial: 1 }, axes: { curiosity: 1, order: 1 } },
        { text: "Whichever is busiest. You like the noise.", results: { porters: 2, sheriff: 1 }, axes: { heart: 1 } },
      ],
    },
    {
      level: 37, where: "Level 37 · Water meter",
      text: "A neighbour has been taking a little more than their share of water.",
      options: [
        { text: "Have a quiet word. They'll have their reasons.", results: { medical: 2, farms: 1, maintenance: 1 }, axes: { heart: 2 } },
        { text: "Ask them straight out what's going on.", results: { sheriff: 1, mechanical: 1, judicial: 1 }, axes: { curiosity: 1, grit: 1 } },
        { text: "Note it down. If it happens again, it goes on record.", results: { it: 2, judicial: 1, supply: 1 }, axes: { order: 1, ingenuity: 1 } },
        { text: "Sort it out between the two of you before anyone official hears.", results: { mayor: 2, porters: 1 }, axes: { heart: 1, ingenuity: 1 } },
      ],
    },
    {
      level: 44, where: "Level 44 · Your level",
      text: "A pump has failed on your level and the water is rising. What do you do first?",
      options: [
        { text: "Get everyone out and the doors shut.", results: { sheriff: 2, mayor: 1 }, axes: { heart: 1, order: 1 } },
        { text: "Find the valve. There is always a valve.", results: { maintenance: 2, mechanical: 1 }, axes: { ingenuity: 2 } },
        { text: "Find out who signed off the last inspection.", results: { it: 2, judicial: 1 }, axes: { order: 1, curiosity: 1 } },
        { text: "Start bailing with whatever is to hand.", results: { mining: 1, porters: 1, farms: 1 }, axes: { grit: 2 } },
      ],
    },
    {
      level: 51, where: "Level 51 · Relic amnesty",
      text: "Suppose the Pact allowed each resident one object from before. Which would you choose?",
      options: [
        { text: "A tool nobody can make any more.", results: { mechanical: 1, maintenance: 1, mining: 1 }, axes: { ingenuity: 1, grit: 1 } },
        { text: "A book.", results: { it: 1, sheriff: 1, judicial: 1 }, axes: { curiosity: 2 } },
        { text: "A packet of seeds.", results: { farms: 2, medical: 1 }, axes: { heart: 2 } },
        { text: "Something to share: a game, or a record to play.", results: { medical: 1, porters: 1, mayor: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 58, where: "Level 58 · Reading the Pact",
      text: "Reading the Pact, you find two clauses that seem to contradict each other.",
      options: [
        { text: "Ask Judicial how they are meant to be read.", results: { judicial: 2, it: 1 }, axes: { order: 3 } },
        { text: "Live by whichever one gets the work done.", results: { maintenance: 2, supply: 1, mechanical: 1 }, axes: { ingenuity: 1, order: -2 } },
        { text: "Raise it where people can talk it through.", results: { mayor: 2, sheriff: 1 }, axes: { order: 1, heart: 1 } },
        { text: "Decide for yourself, and stand by it.", results: { mechanical: 2, mining: 1 }, axes: { grit: 1, order: -2 } },
      ],
    },
    {
      level: 65, where: "Level 65 · Supply counter",
      text: "Supplies to the lower levels are short this month. Where are you?",
      options: [
        { text: "In the queue with everyone else.", results: { farms: 1, porters: 1, mining: 1 }, axes: { order: 1, heart: 1 } },
        { text: "Behind the counter, deciding who gets what.", results: { supply: 2, mayor: 1 }, axes: { order: 1, ingenuity: 1 } },
        { text: "Making whatever is missing yourself.", results: { mechanical: 1, maintenance: 1, farms: 1 }, axes: { ingenuity: 2 } },
        { text: "Asking who ordered the cut, and why.", results: { sheriff: 1, judicial: 1, it: 1 }, axes: { curiosity: 2 } },
      ],
    },
    {
      level: 72, where: "Level 72 · Shift change",
      text: "The stair is jammed solid for an hour at shift change.",
      options: [
        { text: "Take charge and get it moving.", results: { judicial: 1, sheriff: 1 }, axes: { order: 2 } },
        { text: "Go back and do something useful with the hour.", results: { supply: 1, maintenance: 1, it: 1 }, axes: { ingenuity: 1 } },
        { text: "Talk to whoever is stuck next to you.", results: { porters: 2, mayor: 1 }, axes: { heart: 1 } },
        { text: "Find a service ladder nobody else uses.", results: { mining: 2, mechanical: 1 }, axes: { order: -1, grit: 1 } },
      ],
    },
    {
      level: 80, where: "Level 80 · A side corridor",
      text: "You find a door you've never noticed before. It isn't locked.",
      options: [
        { text: "Open it. Obviously.", results: { maintenance: 2, sheriff: 1 }, axes: { curiosity: 2 } },
        { text: "Tell someone who would know what it's for.", results: { it: 1, judicial: 1, supply: 1 }, axes: { order: 2 } },
        { text: "Remember where it is and come back with a torch.", results: { mining: 2, mechanical: 1 }, axes: { grit: 1, curiosity: 1 } },
        { text: "Leave it. Some doors are shut for a reason.", results: { farms: 1, medical: 1, supply: 1 }, axes: { order: 1 } },
      ],
    },
    {
      level: 87, where: "Level 87 · A neighbour's flat",
      text: "A relic turns up in a neighbour's flat. What happens next?",
      options: [
        { text: "It goes to Judicial, as the Pact says.", results: { judicial: 2, sheriff: 1 }, axes: { order: 2 } },
        { text: "You'd like to know how it still works.", results: { maintenance: 1, mechanical: 1, it: 1 }, axes: { curiosity: 1, ingenuity: 1 } },
        { text: "You'd ask what it's worth, and to whom.", results: { supply: 2, porters: 1 }, axes: { ingenuity: 1, order: -1 } },
        { text: "You make sure your neighbour doesn't get into trouble over it.", results: { mayor: 1, medical: 1, farms: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 94, where: "Level 94 · A new posting",
      text: "You're handed a job you don't know how to do.",
      options: [
        { text: "Learn it by doing it badly first.", results: { mechanical: 1, mining: 1, farms: 1 }, axes: { grit: 2 } },
        { text: "Find whoever did it before you and ask.", results: { porters: 1, mayor: 1, medical: 1 }, axes: { heart: 1 } },
        { text: "Read everything ever written about it.", results: { it: 2, judicial: 1 }, axes: { curiosity: 1, order: 1 } },
        { text: "Bluff until you're good at it.", results: { supply: 1, mayor: 1, maintenance: 1 }, axes: { ingenuity: 2 } },
      ],
    },
    {
      level: 101, where: "Level 101 · Any level",
      text: "Which sound do you find most comforting?",
      options: [
        { text: "A machine running smoothly.", results: { mechanical: 2, maintenance: 1 }, axes: { ingenuity: 1 } },
        { text: "Footsteps on the stair.", results: { porters: 2, sheriff: 1 }, axes: { heart: 1 } },
        { text: "Water trickling through the grow beds.", results: { farms: 2, medical: 1 }, axes: { heart: 1 } },
        { text: "Silence.", results: { mining: 2, medical: 1 }, axes: { grit: 1 } },
      ],
    },
    {
      level: 108, where: "Level 108 · The airlock",
      text: "Someone has said the words: \u201cI want to go out.\u201d What is your part?",
      options: [
        { text: "Make sure it is done according to the Pact.", results: { judicial: 2, sheriff: 1 }, axes: { order: 2 } },
        { text: "Sit with them until it's time.", results: { medical: 2, porters: 1 }, axes: { heart: 2 } },
        { text: "Find out what made them say it.", results: { sheriff: 1, medical: 1, mayor: 1 }, axes: { curiosity: 2 } },
        { text: "Keep working. The silo still has to run.", results: { mechanical: 1, mining: 1, farms: 1 }, axes: { grit: 2 } },
      ],
    },
    {
      level: 115, where: "Level 115 · Your section",
      text: "For one day you're in charge of everyone in your section. What do you change first?",
      options: [
        { text: "The rota, so the work is shared fairly.", results: { mayor: 2, supply: 1 }, axes: { heart: 1, order: 1 } },
        { text: "Nothing. It works as it is.", results: { judicial: 1, farms: 1, it: 1 }, axes: { order: 2 } },
        { text: "The equipment nobody has had time to fix.", results: { maintenance: 2, mechanical: 1 }, axes: { ingenuity: 2 } },
        { text: "The rules nobody can explain.", results: { sheriff: 1, mining: 1, porters: 1 }, axes: { curiosity: 1, order: -1 } },
      ],
    },
    {
      level: 123, where: "Level 123 · A memorial",
      text: "What would you want to carry your name after you're gone?",
      options: [
        { text: "A machine that still runs.", results: { mining: 1, mechanical: 1, porters: 1 }, axes: { grit: 2 } },
        { text: "An entry in the records.", results: { it: 1, supply: 1, mayor: 1 }, axes: { curiosity: 1, ingenuity: 1 } },
        { text: "A rule that made things fairer.", results: { judicial: 1, sheriff: 1, mayor: 1 }, axes: { order: 1, heart: 1 } },
        { text: "Nothing. The people you helped will remember.", results: { medical: 2, farms: 1 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 130, where: "Level 130 · Housing office",
      text: "Where in the silo would you choose to live?",
      options: [
        { text: "Up top, near the screen and the light.", results: { it: 1, mayor: 1, judicial: 1 }, axes: { order: 1 } },
        { text: "In the mids, where everything passes through.", results: { supply: 1, porters: 1, medical: 1 }, axes: { heart: 1 } },
        { text: "Down deep, where people look after their own.", results: { mechanical: 1, mining: 1, maintenance: 1 }, axes: { grit: 1 } },
        { text: "Near the grow lights, wherever they happen to be.", results: { farms: 2, medical: 1 }, axes: { heart: 1 } },
      ],
    },
    {
      level: 137, where: "Level 137 · Shortages",
      text: "Which shortage would you find hardest to live with?",
      options: [
        { text: "Light. Dim levels wear you down.", results: { farms: 1, mechanical: 1, mining: 1 }, axes: { grit: 1 } },
        { text: "Spare parts. Everything ends up held together with wire.", results: { maintenance: 2, supply: 1 }, axes: { ingenuity: 2 } },
        { text: "Quiet. There is never enough of it.", results: { medical: 1, it: 1, mining: 1 }, axes: { curiosity: 1 } },
        { text: "News. You hate not knowing what is happening on other levels.", results: { porters: 1, sheriff: 1, mayor: 1 }, axes: { heart: 1, curiosity: 1 } },
      ],
    },
    {
      level: 144, where: "Level 144 · The bottom",
      text: "Last question. You learn that something everyone has been told is a lie.",
      options: [
        { text: "Tell everyone, whatever it costs.", results: { sheriff: 2, mechanical: 1 }, axes: { curiosity: 2, order: -2 } },
        { text: "Keep it. Panic would kill more people than the lie has.", results: { it: 2, judicial: 1 }, axes: { order: 3 } },
        { text: "Tell the few you trust, and make a plan.", results: { mayor: 1, supply: 1, maintenance: 1 }, axes: { ingenuity: 2 } },
        { text: "Ask what telling would change for the people you look after.", results: { medical: 1, farms: 1, porters: 1 }, axes: { heart: 2 } },
      ],
    },
  ],
};

export default quiz;
