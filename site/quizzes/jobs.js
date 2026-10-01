// "Which job would you have in the Silo?"
// Facts are kept to what the TV series has aired; see the README for the spoiler policy.
// Pact clauses are invented in the Pact's register, not quoted from the show.

const band = (v, low, mid, high) => (v < 34 ? low : v < 67 ? mid : high);

export default {
  id: "jobs",
  form: "Form 18-J",
  kicker: "Office of Assignment",
  titleHtml: "Which job<br>would you have <em>in the Silo?</em>",
  intro: "Every resident shadows a trade. Answer twelve questions from life on the stairs and the Office of Assignment will place you, from the top of the silo to the bottom.",
  cutoff: "Safe to the end of season 3",
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
      levels: "Down deep · the lowest levels",
      role: "Keeping the generator turning, the pumps running and the lights on for everyone above you.",
      life: [
        "You live at the bottom of the silo, where the air is warm and smells of oil and the noise of the generator is something you only hear when it stops. Up top they call you grease-stained, and they would be in the dark within a day without you.",
        "Your shifts are long and your hands are never clean. Mechanical looks after its own, distrusts anything that comes down the stairs in a pressed uniform, and knows exactly how much the rest of the silo depends on it.",
      ],
      people: [
        ["Juliette Nichols", "Engineer on the generator, before she was sent up top"],
        ["Knox", "Head of Mechanical"],
        ["Shirley Campbell", "Engineer"],
        ["Martha Walker", "Electrical engineer, who fixes things in a workshop she does not leave"],
      ],
      clause: "Pact clause · Machinery",
      pact: "The machines of the silo are the life of the silo. Those who keep them shall be provided for, and shall not leave their post while the machines have need of them.",
    },
    it: {
      name: "IT", code: "IT", colour: "#a9b2b6",
      levels: "Up top · near the servers",
      role: "Keeping the silo's records, its systems and, if you rise far enough, its secrets.",
      life: [
        "You work in clean rooms near the top of the silo, among humming servers and people who speak quietly. The work is careful: data, records, systems that must never fail. Everyone in the silo depends on what you maintain, and almost nobody understands it.",
        "IT rewards patience and discretion. If you are good, someone senior may ask you to become their shadow, and from then on you will be told things you cannot repeat. You will learn that knowing the truth and being free are not the same thing.",
      ],
      people: [
        ["Bernard Holland", "Head of IT"],
        ["Lukas Kyle", "Systems analyst, who spends his nights off counting the stars"],
        ["Allison Becker", "Worked in IT, and went looking through old files"],
      ],
      clause: "Pact clause · Records",
      pact: "The records of the silo shall be kept whole and kept close. What is not needed to be known shall not be sought, and what is found shall be returned to its keeper.",
    },
    judicial: {
      name: "Judicial", code: "JUD", colour: "#2d2c2f", ink: "#ebe3cd",
      levels: "Up top · the halls of the Pact",
      role: "Interpreting the Pact, judging those who break it and keeping order across all 144 levels.",
      life: [
        "Your office is up top, your clothes are pressed and people lower their voices when you walk past. Judicial reads the Pact, decides what it means and makes sure everyone else lives by it.",
        "You believe order is the only thing between ten thousand people and the end of everything. You will take statements, search flats for relics and sometimes do things that keep you awake. Most days you can tell yourself it was necessary.",
      ],
      people: [
        ["Robert Sims", "Head of security for Judicial"],
        ["Camille Sims", "Once a Judicial raider"],
        ["Paul Billings", "A Judicial administrator before he joined the sheriff's office"],
      ],
      clause: "Pact clause · Order",
      pact: "No resident shall possess, trade or conceal a relic of the time before. Any found shall be surrendered to Judicial, and the finder shall make an account of it.",
    },
    sheriff: {
      name: "Sheriff's Office", code: "SHERIFF", colour: "#c9a24a",
      levels: "Level 1 · beside the airlock",
      role: "Keeping the peace, investigating deaths and holding the cell that nobody wants to see used.",
      life: [
        "Your office is on the top level, next to the cafeteria and the airlock, and the cell in the back is where people wait after they say they want to go out. You carry the badge up and down every one of the 144 levels, and everybody knows your face.",
        "The job is answering to the Pact and to the people at the same time. When someone dies down deep and the report says it was an accident, you are the one who has to decide whether to believe it.",
      ],
      people: [
        ["Holston Becker", "Sheriff"],
        ["Marnes", "Deputy to Holston"],
        ["Juliette Nichols", "Brought up from Mechanical to take the badge"],
        ["Paul Billings", "Chief deputy"],
      ],
      clause: "Pact clause · The Peace",
      pact: "The sheriff shall keep the peace of the silo, shall hold any resident who asks to go out, and shall see that the wish is granted according to the Pact.",
    },
    supply: {
      name: "Supply", code: "SUPPLY", colour: "#94683f",
      levels: "The mids",
      role: "Keeping track of every part, crate and bolt in a silo where nothing new can ever be made from scratch.",
      life: [
        "You live in the mids and work among shelves that go back further than anyone can remember. Everything in the silo passes through your ledgers eventually: parts, cloth, wire, the things people need and the things they say they need.",
        "Supply runs on lists, chits and favours. You know who owes whom, which levels are hoarding and where the last spare gasket of its kind is kept. In a closed world, the person who knows where things are has a great deal of quiet power.",
      ],
      people: [
        ["Carla McLain", "Head of Supply"],
      ],
      clause: "Pact clause · Stores",
      pact: "Nothing of the silo shall be wasted. All that is worn shall be mended, all that is broken shall be returned, and all stores shall be counted and accounted for.",
    },
    farms: {
      name: "The Farms", code: "FARMS", colour: "#62893d",
      levels: "Farm levels, including 122",
      role: "Growing the food that feeds ten thousand people under grow lights that must never go out.",
      life: [
        "You work under the grow lights, where it is warmer and greener than anywhere else in the silo and smells of soil instead of rust. The days follow the crops: planting, tending, harvesting, starting again.",
        "Nobody writes songs about farmers, but everybody eats. When the levels fall out with each other, food is the first thing that gets fought over, and the farmers' market on 122 is where you will hear what people are really thinking.",
      ],
      people: [],
      nobody: "No famous names here. The people who feed the silo rarely make the story, and they prefer it that way.",
      clause: "Pact clause · The Harvest",
      pact: "The farms shall feed every level of the silo alike. No harvest shall be withheld from any resident, and the lights of the farms shall be the last to go dark.",
    },
    medical: {
      name: "Medical", code: "MED", colour: "#e7e1d3",
      levels: "The mid-upper levels",
      role: "Treating the sick, setting bones and bringing each new life into the silo.",
      life: [
        "You live in the mid-upper levels, where doctors are respected and the flats are comfortable. You have seen the whole silo at its most frightened, and you know more about everyone's private lives than anybody else.",
        "Births are permitted, not chosen, and your work is bound up in that. Most days you are the person people come to when something has gone wrong, and you do not have the luxury of looking away.",
      ],
      people: [
        ["Dr Pete Nichols", "Physician and obstetrician, and Juliette's father"],
      ],
      clause: "Pact clause · Life",
      pact: "Every life in the silo is held in trust. The healer shall treat any resident without regard to level, and shall bring no child into the silo without leave.",
    },
    porters: {
      name: "Porters", code: "PORTER", colour: "#d6812e",
      levels: "All 144 levels",
      role: "Carrying goods, food and messages up and down the stair, all day and all night.",
      life: [
        "There are no lifts in the silo, so everything moves on someone's back, and that someone is you. You know every landing on the stair, every shortcut and every face, and you have legs like steel cable.",
        "Porters go where most residents never go. You carry notes between people who cannot otherwise speak and hear every rumour on the way. When the deliveries stop, the whole silo feels it within a day.",
      ],
      people: [],
      nobody: "The show's porters go mostly unnamed. You will have passed every one of the main characters on the stairs, though.",
      clause: "Pact clause · The Stair",
      pact: "The stair belongs to the whole silo. The porter shall have passage on every level, and no resident shall hinder a load in transit.",
    },
  },

  questions: [
    {
      level: 1, where: "Level 1 · Cafeteria",
      text: "Through the cafeteria screen the hills outside are as grey as ever. Someone at your table says, quietly, that the view looks different today.",
      options: [
        { text: "Look harder. Note the time and the clouds, and remember them.", results: { it: 2, sheriff: 1 }, axes: { curiosity: 2, ingenuity: 1 } },
        { text: "Tell them to keep their voice down. Talk like that gets people cleaned.", results: { judicial: 3 }, axes: { order: 2 } },
        { text: "Ask if they're feeling all right, and walk them home after.", results: { medical: 2, porters: 1 }, axes: { heart: 2 } },
        { text: "Finish your food. The view doesn't fix anything, and your shift starts soon.", results: { mechanical: 1, farms: 1 }, axes: { grit: 2 } },
      ],
    },
    {
      level: 12, where: "Level 12 · Shadowing day",
      text: "You're fourteen and it's time to choose a trade to shadow. Which afternoon did you enjoy most?",
      options: [
        { text: "Stripping down a seized pump with grease up to your elbows.", results: { mechanical: 3 }, axes: { ingenuity: 2, grit: 1 } },
        { text: "Sorting a crate of mixed parts into a perfect ledger.", results: { supply: 2, it: 1 }, axes: { order: 2 } },
        { text: "Running messages from the top to the bottom and back before lights-down.", results: { porters: 3 }, axes: { grit: 2 } },
        { text: "Watching a doctor deliver a baby.", results: { medical: 3 }, axes: { heart: 2 } },
      ],
    },
    {
      level: 23, where: "Level 23 · A dead neighbour's flat",
      text: "Clearing out a neighbour's flat, you find a relic wrapped in cloth: a picture of a tree in bright sunlight, printed on something glossy.",
      options: [
        { text: "Take it to Judicial. The Pact is clear about relics.", results: { judicial: 3, sheriff: 1 }, axes: { order: 3, curiosity: -1 } },
        { text: "Find out what it is before you decide anything.", results: { it: 2, sheriff: 1 }, axes: { curiosity: 3 } },
        { text: "Hide it somewhere nobody would think to look.", results: { supply: 2, porters: 1 }, axes: { ingenuity: 1, order: -2 } },
        { text: "Burn it before their family finds it and gets into trouble.", results: { medical: 2, farms: 1 }, axes: { heart: 2, order: 1 } },
      ],
    },
    {
      level: 34, where: "Level 34 · An empty office",
      text: "You pass an empty office. A terminal on the desk is still logged in, and the screen is full of names.",
      options: [
        { text: "Log it out, note the time and tell the department head.", results: { it: 3, judicial: 1 }, axes: { order: 2 } },
        { text: "Read until someone comes back.", results: { sheriff: 2, it: 1 }, axes: { curiosity: 3, order: -2 } },
        { text: "Work out how the system is put together while you're there.", results: { it: 2, mechanical: 1 }, axes: { ingenuity: 3 } },
        { text: "Walk on. Not your department, not your business.", results: { farms: 2, porters: 1 }, axes: { order: 1, grit: 1 } },
      ],
    },
    {
      level: 52, where: "Level 52 · Supply counter",
      text: "You need a part to finish a job. The order chit says six weeks.",
      options: [
        { text: "Make it yourself from scrap.", results: { mechanical: 3 }, axes: { ingenuity: 3 } },
        { text: "You know someone on another level who owes you. You'll have it tonight.", results: { supply: 3, porters: 1 }, axes: { ingenuity: 1, heart: 1, order: -1 } },
        { text: "Wait the six weeks. The queue is there for a reason.", results: { judicial: 1, it: 1, farms: 1 }, axes: { order: 2 } },
        { text: "Find out where it's sitting and fetch it yourself.", results: { porters: 3 }, axes: { grit: 2 } },
      ],
    },
    {
      level: 71, where: "Level 71 · The stair",
      text: "The stair is jammed. A porter has collapsed on a landing with a full load still on her back.",
      options: [
        { text: "Kneel down, check her breathing and give her room.", results: { medical: 3 }, axes: { heart: 3 } },
        { text: "Take her load and finish the delivery.", results: { porters: 3 }, axes: { grit: 2, heart: 1 } },
        { text: "Move the crowd on and keep the stair flowing.", results: { sheriff: 3 }, axes: { order: 2 } },
        { text: "Ask who loaded her that heavily, and who signed it off.", results: { judicial: 2, supply: 1 }, axes: { curiosity: 2 } },
      ],
    },
    {
      level: 88, where: "Level 88 · Your flat, late",
      text: "Your closest friend, half asleep, mutters the words nobody says: “I want to go out.”",
      options: [
        { text: "Pretend you didn't hear, and never bring it up.", results: { farms: 2, supply: 1 }, axes: { heart: 1, curiosity: -1 } },
        { text: "Sit up with them every night until it passes.", results: { medical: 2, porters: 1 }, axes: { heart: 3 } },
        { text: "Ask them what they think is out there.", results: { sheriff: 2, it: 1 }, axes: { curiosity: 3, order: -1 } },
        { text: "Report it. The rules exist because people die without them.", results: { judicial: 3 }, axes: { order: 3, heart: -2 } },
      ],
    },
    {
      level: 104, where: "Level 104 · Grow levels",
      text: "Blight is spreading through the bean rows. That harvest feeds a dozen levels.",
      options: [
        { text: "Pull every infected plant by hand, all night if it takes that.", results: { farms: 3 }, axes: { grit: 2 } },
        { text: "Rig better light and airflow from whatever is lying around.", results: { mechanical: 2, farms: 1 }, axes: { ingenuity: 3 } },
        { text: "Ration what's left so no level goes short, and keep a ledger.", results: { supply: 3 }, axes: { order: 1, heart: 1 } },
        { text: "Test which beds are clean before anyone panics.", results: { farms: 2, medical: 1 }, axes: { curiosity: 2 } },
      ],
    },
    {
      level: 117, where: "Level 117 · Generator room",
      text: "The generator is overdue for an overhaul. Doing it means darkness across the whole silo for hours.",
      options: [
        { text: "Do it now. An unplanned failure would be far worse.", results: { mechanical: 3 }, axes: { grit: 2, order: -1 } },
        { text: "Wait for sign-off from up top.", results: { it: 2, judicial: 1 }, axes: { order: 2 } },
        { text: "Warn every level first, door to door.", results: { porters: 2, sheriff: 1 }, axes: { heart: 2, grit: 1 } },
        { text: "Lay in lamps and food in case it runs long.", results: { supply: 2, farms: 1 }, axes: { ingenuity: 1, order: 1 } },
      ],
    },
    {
      level: 128, where: "Level 128 · Down deep",
      text: "Someone has died down deep. The official report says it was an accident. You don't believe it.",
      options: [
        { text: "Investigate quietly on your own time.", results: { sheriff: 3 }, axes: { curiosity: 3, order: -1 } },
        { text: "Leave it to Judicial. They'll have their reasons.", results: { judicial: 2, it: 1 }, axes: { order: 2 } },
        { text: "Look after the people they left behind.", results: { medical: 2, farms: 1 }, axes: { heart: 3 } },
        { text: "Check the machine they died beside. Machines don't lie.", results: { mechanical: 2 }, axes: { ingenuity: 2, curiosity: 1 } },
      ],
    },
    {
      level: 136, where: "Level 136 · A memorial",
      text: "When your time comes, what would you want said at your memorial?",
      options: [
        { text: "“Nothing ever broke on their watch.”", results: { mechanical: 1, it: 1 }, axes: { grit: 2 } },
        { text: "“They kept the peace.”", results: { sheriff: 2, judicial: 1 }, axes: { order: 2 } },
        { text: "“Nobody went hungry.”", results: { farms: 3, supply: 1 }, axes: { heart: 2 } },
        { text: "“They knew every face on the stair.”", results: { porters: 2, medical: 1 }, axes: { heart: 1, grit: 1 } },
      ],
    },
    {
      level: 144, where: "Level 144 · The bottom",
      text: "You learn that something everyone in the silo has been told is a lie. What do you do with it?",
      options: [
        { text: "Tell everyone, whatever it costs.", results: { sheriff: 2, mechanical: 1 }, axes: { curiosity: 2, order: -3 } },
        { text: "Keep it. Panic would kill more people than the lie ever has.", results: { it: 3, judicial: 1 }, axes: { order: 3 } },
        { text: "Tell the few people you trust, and make a plan.", results: { supply: 2, mechanical: 1 }, axes: { ingenuity: 2 } },
        { text: "Ask what telling would change for the people you feed and carry for.", results: { medical: 2, porters: 1, farms: 1 }, axes: { heart: 2 } },
      ],
    },
  ],
};
