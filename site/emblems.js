// Department emblems, drawn in a 60×60 box with the plate's ink as stroke and fill.
const gearTeeth = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const p = (r) => `${(30 + Math.cos(a) * r).toFixed(1)} ${(30 + Math.sin(a) * r).toFixed(1)}`;
  return `M${p(17)}L${p(26)}`;
}).join("");

export const EMBLEMS = {
  mechanical: (ink) => `
    <path d="${gearTeeth}" stroke-width="8" stroke-linecap="butt"/>
    <circle cx="30" cy="30" r="17" stroke-width="5"/>
    <circle cx="30" cy="30" r="6" fill="${ink}"/>`,
  it: (ink) => `
    <rect x="5" y="6" width="50" height="36" rx="3"/>
    <path d="M22 52h16M30 42v10"/>
    <circle cx="30" cy="20" r="5.5" fill="${ink}" stroke="none"/>
    <path d="M27 22h6l2 12h-10z" fill="${ink}" stroke="none"/>`,
  judicial: (ink) => `
    <path d="M30 6v46M18 54h24M8 14h44"/>
    <circle cx="30" cy="9" r="3" fill="${ink}"/>
    <path d="M12 14L5 34M12 14l7 20M48 14l-7 20M48 14l7 20" stroke-width="2.5"/>
    <path d="M3 34a9 6 0 0 0 18 0zM39 34a9 6 0 0 0 18 0z" fill="${ink}" stroke-width="2.5"/>`,
  sheriff: (ink, colour) => {
    const pts = Array.from({ length: 12 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 6;
      const r = i % 2 ? 12 : 25;
      return `${(30 + Math.cos(a) * r).toFixed(1)},${(30 + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
    const tips = Array.from({ length: 6 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 3;
      return `<circle cx="${(30 + Math.cos(a) * 25).toFixed(1)}" cy="${(30 + Math.sin(a) * 25).toFixed(1)}" r="3.4" fill="${ink}" stroke="none"/>`;
    }).join("");
    return `<polygon points="${pts}" fill="${ink}" stroke-width="2"/>${tips}<circle cx="30" cy="30" r="7" fill="none" stroke="${colour}" stroke-width="2.5"/>`;
  },
  supply: () => `
    <rect x="6" y="30" width="22" height="22"/>
    <rect x="32" y="30" width="22" height="22"/>
    <rect x="19" y="6" width="22" height="22"/>
    <path d="M6 30l22 22M32 52l22-22M19 6l22 22" stroke-width="2.5"/>`,
  farms: (ink) => `
    <path d="M8 6h44" stroke-width="5"/>
    <path d="M18 12l-3 5M30 12v6M42 12l3 5" stroke-width="2.5"/>
    <path d="M30 56V30"/>
    <path d="M30 40c-12 0-18-8-18-16 10 0 18 5 18 16z" fill="${ink}"/>
    <path d="M30 34c0-10 7-15 16-15 0 9-6 15-16 15z" fill="${ink}"/>
    <path d="M18 56h24"/>`,
  medical: (ink) => `
    <path d="M30 4C22 18 12 26 12 38a18 18 0 0 0 36 0C48 26 38 18 30 4z"/>
    <path d="M14 40h8l4-9 5 16 4-11 3 4h8" stroke-width="3"/>`,
  porters: (ink) => `
    <path d="M4 56h12V44h12V32h12V20h12V8h4" stroke-linejoin="miter"/>
    <path d="M8 34L28 14" stroke-width="3.5"/>
    <path d="M18 13h11v11" stroke-width="3.5"/>
    <rect x="34" y="40" width="18" height="14" rx="2" fill="${ink}"/>`,
};
