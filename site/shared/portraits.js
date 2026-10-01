// Resident identity photographs: a front-on silhouette backlit by a sodium lamp, built from parts
// so that each character is a choice of hair, beard, glasses and clothing rather than a drawing.
import { uid } from "./art.js";

const INK = "#17140f";
const FACE = "#3e362b";
export const HAIR = { ink: INK, brown: "#4b3824", grey: "#8d877b", white: "#cfc6b3" };

const HAIRS = {
  short: { front: "M34 52C33 36 42 31 50 31C59 31 67 36 66 52C63 44 58 40 50 40C42 40 37 44 34 52Z" },
  crop: { front: "M35 47C36 36 43 33 50 33C57 33 64 36 65 47C61 41 56 38 50 38C44 38 39 41 35 47Z" },
  parted: { front: "M34 54C32 36 42 30 51 30C60 30 68 36 66 54C64 46 62 42 58 40C50 43 42 43 38 45C36 47 35 50 34 54Z" },
  bald: {},
  long: {
    back: "M31 56C30 34 40 28 50 28C60 28 70 34 69 56L72 88C64 92 58 88 58 80L42 80C42 88 36 92 28 88Z",
    front: "M34 58C33 38 42 32 50 32C58 32 67 38 66 58C63 46 57 40 50 40C46 44 40 48 34 58Z",
  },
  bun: {
    back: "M43 27a7 7 0 1 0 14 0a7 7 0 1 0-14 0Z",
    front: "M35 50C35 37 43 33 50 33C57 33 65 37 65 50C61 42 56 39 50 39C44 39 39 42 35 50Z",
  },
  ponytail: {
    back: "M60 36C74 40 74 64 67 80C64 68 62 54 57 44Z",
    front: "M35 51C35 37 43 33 50 33C57 33 65 37 65 51C62 43 57 40 51 41C46 40 39 43 35 51Z",
  },
  curly: {
    back: "M28 46a22 17 0 1 0 44 0a22 17 0 1 0-44 0Z",
    front: "M34 50C30 34 44 28 50 31C57 28 70 34 66 50C63 43 58 41 54 42C51 40 47 40 44 42C40 41 36 44 34 50Z",
  },
  puff: {
    back: "M33 30a17 14 0 1 0 34 0a17 14 0 1 0-34 0Z",
    front: "M35 49C35 37 43 33 50 33C57 33 65 37 65 49C61 42 56 39 50 39C44 39 39 42 35 49Z",
  },
  wild: {
    back: "M27 58C24 30 40 24 50 25C62 24 77 32 73 58L76 92C68 96 62 90 60 82L40 82C38 90 32 96 24 92Z",
    front: "M33 56C31 36 41 30 50 31C60 30 69 37 67 56C64 47 60 44 55 41C51 45 44 44 39 47C36 50 34 53 33 56Z",
  },
};

const BEARDS = {
  stubble: { d: "M36 60C37 74 44 78 50 78C56 78 63 74 64 60C60 66 56 68 50 68C44 68 40 66 36 60Z", opacity: 0.45 },
  short: { d: "M36 60C37 75 44 79 50 79C56 79 63 75 64 60C60 67 56 69 50 69C44 69 40 67 36 60Z", opacity: 1 },
  full: { d: "M35 58C35 80 43 86 50 86C57 86 65 80 65 58C61 67 56 70 50 70C44 70 39 67 35 58Z", opacity: 1 },
  goatee: { d: "M45 67C45 77 55 77 55 67C53 70 47 70 45 67ZM43 64C46 62 54 62 57 64C54 66 46 66 43 64Z", opacity: 1 },
};

const SHOULDERS = "M6 120C8 99 25 91 50 91C75 91 92 99 94 120Z";

// Clothing is drawn in ink with details in the character's department colour.
const ATTIRE = {
  coverall: (c) => `
    <path d="M38 92L50 108L62 92" fill="none" stroke="${c}" stroke-width="3"/>
    <path d="M50 108V120" stroke="${c}" stroke-width="2" stroke-dasharray="2 2"/>
    <rect x="62" y="104" width="12" height="9" rx="1" fill="none" stroke="${c}" stroke-width="2"/>`,
  suit: (c) => `
    <path d="M40 91L50 116L60 91Z" fill="#d8cfbb"/>
    <path d="M48 96L52 96L53 116L50 120L47 116Z" fill="${c}"/>
    <path d="M38 91L50 118L36 104ZM62 91L50 118L64 104Z" fill="#26211a"/>`,
  uniform: (c) => `
    <path d="M40 91L50 102L60 91" fill="none" stroke="${c}" stroke-width="3"/>
    <path d="M16 99L30 95M84 99L70 95" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 102V120" stroke="${c}" stroke-width="1.5" stroke-opacity=".6"/>`,
  judicial: (c) => `
    <path d="M38 91C40 98 44 100 50 100C56 100 60 98 62 91" fill="#26211a"/>
    <path d="M50 100V120" stroke="${c}" stroke-width="3"/>
    <circle cx="66" cy="106" r="3" fill="${c}"/>`,
  knit: (c) => `
    <path d="M37 92C40 100 45 103 50 103C55 103 60 100 63 92" fill="none" stroke="${c}" stroke-width="3"/>
    <path d="M24 108H76" stroke="${c}" stroke-width="1.5" stroke-opacity=".5" stroke-dasharray="3 3"/>`,
  cardigan: (c) => `
    <path d="M41 91L50 112L59 91" fill="#3a332a"/>
    <path d="M41 91L50 120M59 91L50 120" stroke="${c}" stroke-width="2.5"/>
    <circle cx="66" cy="104" r="3.5" fill="${c}"/>`,
  coat: (c) => `
    <path d="M38 91L50 112L62 91L72 120H28Z" fill="#d8cfbb"/>
    <path d="M42 91L50 108L58 91Z" fill="#26211a"/>
    <path d="M50 108V120" stroke="#9c9381" stroke-width="1.5"/>
    <path d="M66 106h7" stroke="${c}" stroke-width="2.5"/>`,
  work: (c) => `
    <path d="M38 91L46 104L50 96L54 104L62 91" fill="none" stroke="${c}" stroke-width="3"/>
    <rect x="24" y="104" width="12" height="8" fill="${c}" opacity=".8"/>`,
  rags: (c) => `
    <path d="M24 98C36 108 64 108 76 98L80 106C64 118 36 118 20 106Z" fill="${c}" opacity=".85"/>
    <path d="M30 104L28 120M70 104L72 120" stroke="#26211a" stroke-width="3"/>`,
};

const ACCESSORIES = {
  star: () => {
    const pts = Array.from({ length: 12 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 6;
      const r = i % 2 ? 2.6 : 5.6;
      return `${(33 + Math.cos(a) * r).toFixed(1)},${(106 + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="#e9c46a"/>`;
  },
  goggles: () => `<g fill="none" stroke="#8a7a5c" stroke-width="2.5"><path d="M34 41H66"/><circle cx="43" cy="41" r="5" fill="#3d3a33"/><circle cx="57" cy="41" r="5" fill="#3d3a33"/></g><circle cx="41.5" cy="39.5" r="1.5" fill="#ffd583"/>`,
};

const GLASSES = `<g fill="none" stroke="#e8b45a" stroke-width="1.6"><rect x="38" y="51" width="10" height="7" rx="2"/><rect x="52" y="51" width="10" height="7" rx="2"/><path d="M48 54h4M38 53l-3-1M62 53l3-1"/></g>`;

// Silo 18 sits under sodium lamps, Silo 17 under failing emergency light, and the world before
// the silos in daylight.
const LIGHTS = {
  sodium: ["#f6b54a", "#c77a26", "#7a4314", "#fff2c8"],
  dim: ["#a9b07a", "#5f6b44", "#2b3020", "#e8f0c0"],
  day: ["#cfe3ea", "#8fb3c2", "#4f7180", "#ffffff"],
};

// The photograph alone, in a 100×120 box.
export function portrait(p, { label = true } = {}) {
  const hair = HAIRS[p.hair];
  const hc = HAIR[p.hairColour ?? "ink"];
  const beard = p.beard && BEARDS[p.beard];
  const [bg, glow, clip] = [uid("pbg"), uid("pglow"), uid("pclip")];
  const [top, mid, low, flare] = LIGHTS[p.light ?? "sodium"];
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label ? `Portrait of ${p.name}` : ""}">
    <defs>
      <linearGradient id="${bg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".7" stop-color="${mid}"/><stop offset="1" stop-color="${low}"/></linearGradient>
      <radialGradient id="${glow}" cx=".3" cy=".05" r=".8"><stop offset="0" stop-color="${flare}" stop-opacity=".75"/><stop offset="1" stop-color="${flare}" stop-opacity="0"/></radialGradient>
      <clipPath id="${clip}"><rect width="100" height="120"/></clipPath>
    </defs>
    <g clip-path="url(#${clip})">
      <rect width="100" height="120" fill="url(#${bg})"/>
      <rect width="100" height="120" fill="url(#${glow})"/>
      <path d="M0 20H100M0 44H100M0 68H100" stroke="#000" stroke-opacity=".07" stroke-width="1"/>
      <g transform="translate(50 122) scale(1.12) translate(-50 -122)">
      ${hair.back ? `<path d="${hair.back}" fill="${hc}"/>` : ""}
      <path d="${SHOULDERS}" fill="${INK}"/>
      <path d="M42 70H58V93C55 96 45 96 42 93Z" fill="${INK}"/>
      ${ATTIRE[p.attire](p.colour)}
      ${p.accessory === "star" ? ACCESSORIES.star() : ""}
      <ellipse cx="34.5" cy="57" rx="3" ry="5" fill="${FACE}"/>
      <ellipse cx="65.5" cy="57" rx="3" ry="5" fill="${FACE}"/>
      <ellipse cx="50" cy="55" rx="15.5" ry="19.5" fill="${FACE}"/>
      <path d="M38 46C40 40 45 37 50 37" fill="none" stroke="#ffd583" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
      ${beard ? `<path d="${beard.d}" fill="${p.beardColour ? HAIR[p.beardColour] : hc}" opacity="${beard.opacity}"/>` : ""}
      ${hair.front ? `<path d="${hair.front}" fill="${hc}"/>` : ""}
      ${p.glasses ? GLASSES : ""}
      ${p.accessory === "goggles" ? ACCESSORIES.goggles() : ""}
      </g>
    </g>
  </svg>`;
}

// The photograph mounted on a resident identity card, as used on quiz results and the hub.
export function idCard(p) {
  return `<svg viewBox="0 0 120 156" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Identity card of ${p.name}">
    <rect width="120" height="156" rx="6" fill="#ebe3cd"/>
    <rect x="0.5" y="0.5" width="119" height="155" rx="5.5" fill="none" stroke="#1e1b16" stroke-opacity=".25"/>
    <rect x="0" y="0" width="120" height="8" rx="3" fill="${p.colour}"/>
    <svg x="12" y="14" width="96" height="115" viewBox="0 0 100 120">${portrait(p, { label: false }).replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>
    <text x="12" y="142" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="8.5" letter-spacing=".5" fill="#1e1b16"${p.short.length > 12 ? ` textLength="76" lengthAdjust="spacingAndGlyphs"` : ""}>${p.short.toUpperCase()}</text>
    <text x="12" y="151" font-family="IBM Plex Mono, monospace" font-size="6" letter-spacing=".5" fill="#4d463a">${p.registry ?? "SILO 18 · RESIDENT"}</text>
    <rect x="94" y="134" width="16" height="16" fill="none" stroke="#b1291f" stroke-width="1.5"/>
  </svg>`;
}
