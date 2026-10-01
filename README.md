# Silo: Fan Games

Unofficial games for the Apple TV+ series *Silo*, played in the browser.

https://radiosilence.github.io/silo/

- **Which job would you have?** (`site/role/`): twelve questions set inside Silo 18 assign you to one of eight departments: Mechanical, IT, Judicial, the Sheriff's Office, Supply, the Farms, Medical and the Porters.
- **Which resident are you?** (`site/character/`): coming soon.
- **Silo Trumps** (`site/trumps/`): coming soon.

The same three games exist for [The Gentlemen](https://radiosilence.github.io/gentlemen/) and [Slow Horses](https://radiosilence.github.io/slowhorses/), with the same layout, so a visitor who knows one site knows the others.

## Why it is built this way

**No build step.** ES modules, four Google Fonts and nothing else; `site/` is deployed to GitHub Pages as-is.

**One quiz engine, data kept apart.** `shared/quiz.js` renders every screen of a quiz from a plain data object (questions, weighted options, results, axes, labels) and knows nothing about Silo. Each quiz page is a few lines that pass its `data.js` to `run()`. Results are scored per option and the five axes (Curiosity, Order, Grit, Heart, Ingenuity) are normalised against the lowest and highest totals the questions allow. Curiosity and Order pull against each other in most questions because that tension, between knowing the truth and keeping the peace, is what the show is about.

**Results live in the URL.** A result is encoded in the hash (`#<quiz>/<first>/<second>/<axis scores>/<fit>`), so a shared link opens that exact notice with no server. Invalid hashes fall back to the title screen. Links from before the games moved into folders (`/silo/#jobs/…`) are redirected by the hub.

**Original illustrations only.** Stills and promotional art belong to Apple and the photographers, and would make the project look official. The staircase, stairwell, stamps and department insignia are SVG drawn in `shared/art.js` and `shared/emblems.js`. Every SVG id is generated per render, because Safari resolves `url(#id)` to the first matching element even when it sits in a hidden screen.

**Spoiler policy.** Season 3 finished airing on 4 September 2026, so the site is labelled safe to the end of season 3. Department and character details come from seasons 1 and 2. Nothing is taken from Hugh Howey's books that the show has not aired. Level ranges are only as precise as the show makes them, which is usually "up top", "the mids" or "down deep". The Pact clauses on the job notices are written in the Pact's style for this site; they are not quotations from the show.

**Balance.** Every result is reachable, and random answering in the job quiz lands roughly evenly across all eight departments (between about 10% and 16% each).

## Run locally

```
mise run serve   # http://localhost:8767
```

## Disclaimer

A non-commercial fan project, not affiliated with or endorsed by Apple TV+, AMC Studios, Hugh Howey or Winning Moves (Top Trumps). Character and place names belong to their owners.
