import { EMBLEMS } from "./emblems.js";

const f = (n) => n.toFixed(1);

// Every SVG id must be unique per render: Safari resolves url(#id) to the first match in the
// document, even inside a display:none screen, which leaves gradients and clips empty.
let seq = 0;
export const uid = (name) => `${name}-${++seq}`;
const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
};

// The great stair seen from the top landing: rings of walkway falling away into the dark,
// with treads running round each turn and sodium lamps on the railings. The rings are one
// static SVG inside an HTML layer, so the slow rotation is composited rather than redrawn;
// the pit and haze are CSS gradients on the non-rotating wrapper.
export function staircase() {
  const glow = uid("glow");
  let rings = "";
  for (let k = 0; k < 8; k++) {
    const ro = 340 * 0.78 ** k;
    const ri = ro * 0.8;
    const shade = Math.round(58 - k * 6);
    const offset = k * 47;
    let treads = "";
    const n = 26;
    for (let t = 0; t < n * 0.62; t++) {
      const deg = offset + (t * 360) / n;
      const [x1, y1] = polar(0, 0, ri + 1, deg);
      const [x2, y2] = polar(0, 0, ro - 1, deg);
      treads += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
    }
    let lamps = "";
    if (k < 6) {
      for (let l = 0; l < 2; l++) {
        const [x, y] = polar(0, 0, ri, offset + 70 + l * 180);
        const r = Math.max(1.4, 5 * 0.82 ** k);
        lamps += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 4.5)}" fill="url(#${glow})"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#ffd583"/>`;
      }
    }
    rings += `
      <circle r="${f((ro + ri) / 2)}" fill="none" stroke="rgb(${shade},${shade - 3},${shade - 9})" stroke-width="${f(ro - ri)}"/>
      <path d="${treads}" stroke="rgba(0,0,0,.55)" stroke-width="${f(Math.max(.6, 2.2 * 0.85 ** k))}"/>
      <circle r="${f(ri)}" fill="none" stroke="#8a7a5c" stroke-opacity="${f(.55 - k * .05)}" stroke-width="${f(Math.max(.6, 2 * 0.85 ** k))}"/>
      ${lamps}`;
  }
  return `<div class="stair-spin"><svg viewBox="-360 -360 720 720" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="${glow}"><stop offset="0" stop-color="#f2a93b" stop-opacity=".5"/><stop offset="1" stop-color="#f2a93b" stop-opacity="0"/></radialGradient></defs>
    ${rings}
  </svg></div>`;
}

// Stop the stair turning while the tab is in the background.
export function pauseWhenHidden() {
  const sync = () => document.documentElement.classList.toggle("hidden-page", document.hidden);
  document.addEventListener("visibilitychange", sync);
  sync();
}

// Riveted octagonal plate in the department colour, with the emblem and short code stencilled on.
export function insignia(id, { colour, ink = "#1e1b16", code }) {
  const plate = uid("plate");
  const pts = Array.from({ length: 8 }, (_, i) => polar(60, 60, 56, 22.5 + i * 45).map(f).join(",")).join(" ");
  const inner = Array.from({ length: 8 }, (_, i) => polar(60, 60, 49, 22.5 + i * 45).map(f).join(",")).join(" ");
  const rivets = Array.from({ length: 8 }, (_, i) => polar(60, 60, 52.5, i * 45)).map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="1.7" fill="${ink}" opacity=".55"/>`).join("");
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${code} insignia">
    <defs>
      <linearGradient id="${plate}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
    </defs>
    <polygon points="${pts}" fill="${ink}"/>
    <polygon points="${inner}" fill="${colour}"/>
    <polygon points="${inner}" fill="url(#${plate})"/>
    ${rivets}
    <g fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(30 20)">${EMBLEMS[id](ink, colour)}</g>
    <text x="60" y="97" text-anchor="middle" font-family="Big Shoulders Stencil, Impact, sans-serif" font-weight="900" font-size="15" letter-spacing="2" fill="${ink}">${code}</text>
  </svg>`;
}

// A rubber stamp: double ring, curved legend and the department code across the middle.
export function stamp(word, legend = "OFFICE OF ASSIGNMENT") {
  const [ink, top, bot] = [uid("ink"), uid("arc"), uid("arc")];
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${ink}" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.15" result="mask"/>
        <feComposite in="SourceGraphic" in2="mask" operator="in" result="t"/>
        <feDisplacementMap in="t" in2="n" scale="2.5"/>
      </filter>
      <path id="${top}" d="M28 80a52 52 0 0 1 104 0"/>
      <path id="${bot}" d="M24 80a56 56 0 0 0 112 0"/>
    </defs>
    <g filter="url(#${ink})" fill="#b1291f" stroke="#b1291f">
      <circle cx="80" cy="80" r="74" fill="none" stroke-width="5"/>
      <circle cx="80" cy="80" r="64" fill="none" stroke-width="1.6"/>
      <text font-family="IBM Plex Mono, monospace" font-weight="600" font-size="11" letter-spacing="2.6" stroke="none"><textPath href="#${top}" startOffset="50%" text-anchor="middle">${legend}</textPath></text>
      <text font-family="IBM Plex Mono, monospace" font-weight="600" font-size="11" letter-spacing="3" stroke="none"><textPath href="#${bot}" startOffset="50%" text-anchor="middle">SILO 18</textPath></text>
      <rect x="6" y="62" width="148" height="36" fill="#b1291f" stroke="none"/>
      <text x="80" y="90" text-anchor="middle" font-family="Big Shoulders Stencil, Impact, sans-serif" font-weight="900" font-size="30" letter-spacing="2" fill="#ebe3cd" stroke="none">${word}</text>
    </g>
  </svg>`;
}

// Side view of the stair for the question screens: flights switching back and forth,
// railings and lamps, tiled down a shaft that scrolls as you descend.
export function stairwell() {
  const [glow, pat] = [uid("sw-glow"), uid("sw")];
  const W = 960, H = 440, D = 200, steps = 30, run = W / steps, rise = D / steps;
  const flight = (y0, dir) => {
    let d = "";
    for (let i = 0; i < steps; i++) {
      const x = dir > 0 ? i * run : W - i * run;
      const y = y0 + i * rise;
      d += `${i ? "L" : "M"}${f(x)} ${f(y)}L${f(x + dir * run)} ${f(y)}L${f(x + dir * run)} ${f(y + rise)}`;
    }
    const x0 = dir > 0 ? 0 : W, x1 = dir > 0 ? W : 0;
    const posts = Array.from({ length: 20 }, (_, i) => {
      const x = dir > 0 ? i * 48 + 12 : W - i * 48 - 12;
      const y = y0 + ((dir > 0 ? x : W - x) / W) * D;
      return `M${f(x)} ${f(y - 34)}V${f(y)}`;
    }).join("");
    return `
      <path d="${d}L${x1} ${y0 + D + 26}L${x0} ${y0 + 26}Z" fill="#1f1d19"/>
      <path d="${d}" fill="none" stroke="#4a463d" stroke-width="2"/>
      <path d="M${x0} ${y0 + 26}L${x1} ${y0 + D + 26}" stroke="#2c2a25" stroke-width="3"/>
      <path d="M${x0} ${y0 - 34}L${x1} ${y0 + D - 34}" stroke="#6e6553" stroke-width="3"/>
      <path d="${posts}" stroke="#3d3a33" stroke-width="2"/>`;
  };
  const lamp = (x, y) => `<circle cx="${x}" cy="${y}" r="46" fill="url(#${glow})"/><rect x="${x - 6}" y="${y - 3}" width="12" height="6" rx="2" fill="#ffd583"/>`;
  return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="${glow}"><stop offset="0" stop-color="#f2a93b" stop-opacity=".35"/><stop offset="1" stop-color="#f2a93b" stop-opacity="0"/></radialGradient>
      <pattern id="${pat}" width="${W}" height="${H}" patternUnits="userSpaceOnUse" x="50%" patternTransform="translate(-480 0)">
        ${flight(20, 1)}
        ${flight(240, -1)}
        ${lamp(300, 150)}${lamp(660, 370)}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#${pat})"/>
  </svg>`;
}

// Back of a Silo Trumps card: hazard-striped border round the stair-well rings.
export function cardBack() {
  const stripes = uid("stripes");
  return `<svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="${stripes}" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="28" fill="#f2a93b"/><rect x="14" width="14" height="28" fill="#1e1b16"/></pattern>
    </defs>
    <rect width="300" height="500" rx="18" fill="url(#${stripes})"/>
    <rect x="16" y="16" width="268" height="468" rx="10" fill="#1b1a16"/>
    <g fill="none" stroke="#f2a93b">
      <circle cx="150" cy="230" r="92" stroke-width="12"/>
      <circle cx="150" cy="230" r="62" stroke-width="7" stroke-opacity=".6"/>
      <circle cx="150" cy="230" r="36" stroke-width="4" stroke-opacity=".3"/>
    </g>
    <circle cx="85" cy="165" r="9" fill="#ffd583"/>
    <text x="150" y="400" text-anchor="middle" font-family="Big Shoulders Stencil, Impact, sans-serif" font-weight="900" font-size="54" letter-spacing="4" fill="#ebe3cd">SILO</text>
    <text x="150" y="436" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="15" letter-spacing="6" fill="#f2a93b">TRUMPS</text>
  </svg>`;
}
