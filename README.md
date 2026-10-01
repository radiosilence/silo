# Silo Job Assignment

An unofficial personality quiz for the Apple TV+ series *Silo*: answer twelve questions set inside Silo 18 and be assigned to one of its departments.

https://radiosilence.github.io/silo-quiz/

Each answer scores the eight departments (Mechanical, IT, Judicial, the Sheriff's Office, Supply, the Farms, Medical and the Porters) and five personality axes (Curiosity, Order, Grit, Heart, Ingenuity). The highest department score is the assignment and the runner-up is the secondary assignment. Curiosity and Order pull against each other in most questions because that tension, between knowing the truth and keeping the peace, is what the show is about.

## Why it is built this way

**No build step.** ES modules, four Google Fonts and nothing else; `site/` is deployed to GitHub Pages as-is.

**Data separate from the engine.** A quiz is a plain object in `site/quizzes/` (questions, options, weights, results, axes) registered in `quizzes/index.js`. `app.js` knows nothing about Silo departments, so a second quiz can be added without touching it.

**Results live in the URL.** A result is encoded in the hash (`#jobs/<first>/<second>/<axis scores>/<fit>`), so a shared link opens that exact notice with no server. Invalid hashes fall back to the title screen.

**Original illustrations only.** Stills and promotional art belong to Apple and the photographers, and would make the project look official. The staircase, stairwell and department insignia are SVG drawn in `art.js` and `emblems.js`.

**Spoiler policy.** Season 3 finished airing on 4 September 2026, so the quiz is labelled safe to the end of season 3. In practice everything in it comes from seasons 1 and 2: departments, characters and their jobs as the show presents them. Nothing is taken from Hugh Howey's books that the show has not aired. Level ranges are only as precise as the show makes them, which is usually "up top", "the mids" or "down deep". The Pact clauses on the result notices are written in the Pact's style for this quiz; they are not quotations from the show.

**Balance.** Every department is reachable, and random answering lands roughly evenly across all eight (between about 10% and 16% each).

## Run locally

```
mise run serve   # http://localhost:8767
```

## Disclaimer

A non-commercial fan project, not affiliated with or endorsed by Apple TV+, AMC Studios or Hugh Howey. Character and place names belong to their owners.
