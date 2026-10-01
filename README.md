# Silo: Fan Games

Unofficial games for the Apple TV+ series *Silo*, played in the browser.

https://radiosilence.github.io/silo/

- **Which job would you have?** (`site/role/`): twenty-one questions assign you to one of eleven departments: Mechanical, IT, Judicial, the Sheriff's Office, the Mayor's Office, Supply, the Farms, Medical, the Porters, Maintenance and Mining.
- **Which resident are you?** (`site/character/`): sixteen questions matched against fifteen residents' personnel files, from Juliette Nichols to Solo.
- **Silo Trumps** (`site/trumps/`): a Top Trumps style game of thirty-five cards from Silo 18, Silo 17 and the world before the silos, played against Solo (random picks), Camille Sims (her card's highest number, with a quarter of picks random) or Bernard Holland (the stat that ranks highest against the whole deck).

The same three games exist for [The Gentlemen](https://radiosilence.github.io/gentlemen/) and [Slow Horses](https://radiosilence.github.io/slowhorses/), with the same layout, so a visitor who knows one site knows the others.

## Why it is built this way

**No build step.** ES modules, four Google Fonts and nothing else; `site/` is deployed to GitHub Pages as-is.

**One quiz engine, data kept apart.** `shared/quiz.js` renders every screen of a quiz from a plain data object (questions, weighted options, results, axes, labels) and knows nothing about Silo. Each quiz page is a few lines that pass its `data.js` to `run()`. Results are scored per option and the five axes (Curiosity, Order, Grit, Heart, Ingenuity) are normalised against the lowest and highest totals the questions allow. Curiosity and Order pull against each other in most questions because that tension, between knowing the truth and keeping the peace, is what the show is about.

**Animation that the compositor can do alone.** The turning staircase is one static SVG inside an HTML layer, so the browser rotates a rasterised texture instead of redrawing a few hundred shapes each frame, and it stops when the tab is hidden or reduced motion is set. The stairwell behind the questions glides by exactly one repeat of its tile per question and then snaps back, so that layer is never taller than a screen plus a tile. Lamps are steady: an earlier version flickered them, which read as the whole page blinking.

**Results live in the URL.** A result is encoded in the hash (`#<quiz>/<first>/<second>/<axis scores>/<fit>`), so a shared link opens that exact notice with no server. Invalid hashes fall back to the title screen. Links from before the games moved into folders (`/silo/#jobs/…`) are redirected by the hub.

**Original illustrations only.** Stills and promotional art belong to Apple and the photographers, and would make the project look official. The staircase, stairwell, stamps and department insignia are SVG drawn in `shared/art.js` and `shared/emblems.js`. People are drawn as backlit identity photographs in `shared/portraits.js`: a front-on silhouette assembled from parts (hair, beard, glasses, clothing, badge) under sodium light for Silo 18, failing emergency light for Silo 17 and daylight for the world before. The same portraits appear on the hub, the character quiz and the cards, and the character list in `shared/characters.js` is shared between the games. Every SVG id is generated per render, because Safari resolves `url(#id)` to the first matching element even when it sits in a hidden screen.

**Spoiler policy.** Season 3 finished airing on 4 September 2026, so the site is labelled safe to the end of season 3. The quizzes draw on seasons 1 and 2; Trumps also includes characters introduced in season 3. Nothing is taken from Hugh Howey's books that the show has not aired. Level ranges are only as precise as the show makes them, which is usually "up top", "the mids" or "down deep". The Pact clauses on the job notices are written in the Pact's style for this site; they are not quotations from the show.

**Card ratings.** The six stats (Grit, Ingenuity, Clearance, Menace, Curiosity, Influence) are judgements out of 100 based on what each character does on screen. Season 3 characters are rated more conservatively, and their blurbs say no more than the cast list does. Cards carry no season tags, because several characters' appearances across seasons could not be confirmed. Trumps was adapted from the same game on the Gentlemen site, so play, timing and opponents behave identically.

**Questions that don't give themselves away.** About a third of the questions are plainly about life in the silo; the rest ask about temperament through the silo's own texture (rationed paper, rumours, the Pact, relics, the stair at shift change) rather than about the work itself. Every answer spreads its weight over two or three results, so no single question decides the outcome and no answer is simply "the Mechanical one".

**Balance.** Before shipping, 10,000 random answer sheets are simulated for each quiz. Every result must come up at least 60% and at most 160% as often as an even share, and each must be reachable by a deliberate path.

## Run locally

```
mise run serve   # http://localhost:8767
```

## Disclaimer

A non-commercial fan project, not affiliated with or endorsed by Apple TV+, AMC Studios, Hugh Howey or Winning Moves (Top Trumps). Character and place names belong to their owners.
