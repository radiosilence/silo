import { staircase, insignia, cardBack } from "./shared/art.js";
import { idCard } from "./shared/portraits.js";
import { sitter } from "./shared/characters.js";
import role from "./role/data.js";

// Result links from before the games moved into their own folders.
if (/^#jobs\//.test(location.hash)) location.replace(`role/${location.hash}`);

const ART = {
  role: insignia("mechanical", role.results.mechanical),
  character: idCard(sitter("juliette")),
  trumps: `<div class="fan">${[-12, 0, 12].map((r) => `<div style="--r:${r}deg">${cardBack()}</div>`).join("")}</div>`,
};

document.getElementById("hub-art").innerHTML = staircase();
for (const el of document.querySelectorAll("[data-art]")) el.innerHTML = ART[el.dataset.art];
Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => document.body.classList.add("fonts"));
