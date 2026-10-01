// Site-wide preferences and synthesised sound. Nothing is loaded from disk.

export const prefs = (() => {
  try { return JSON.parse(localStorage.getItem("silo-prefs")) ?? {}; } catch { return {}; }
})();
export const savePrefs = () => { try { localStorage.setItem("silo-prefs", JSON.stringify(prefs)); } catch {} };

let audio;
const ctx = () => (audio ??= new (window.AudioContext || window.webkitAudioContext)());

export function noise(dur, freq, gain = 0.3, q = 1) {
  if (prefs.muted) return;
  try {
    const a = ctx();
    const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 3;
    const src = a.createBufferSource();
    const f = a.createBiquadFilter();
    const g = a.createGain();
    src.buffer = buf;
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    g.gain.value = gain;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
  } catch {}
}

export function tone(freq, dur, gain = 0.05, type = "square", at = 0) {
  if (prefs.muted) return;
  try {
    const a = ctx();
    const t = a.currentTime + at;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {}
}

export const sfx = {
  tick: () => tone(1320, 0.04, 0.03),
  step: () => noise(0.09, 180, 0.5, 2),
  stamp: () => { noise(0.25, 90, 1.2, 0.7); noise(0.08, 1800, 0.25); },
};

// Browsers refuse vibration before the first tap; there is nothing to report if they do.
export const buzz = (p) => { if (navigator.userActivation?.hasBeenActive ?? true) navigator.vibrate?.(p); };

const icon = () => (prefs.muted
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`
  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/></svg>`);

function renderMute() {
  for (const b of document.querySelectorAll(".mute")) {
    b.innerHTML = icon();
    b.setAttribute("aria-pressed", String(!!prefs.muted));
  }
}

export function muteButtons() {
  renderMute();
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mute")) return;
    prefs.muted = !prefs.muted;
    savePrefs();
    renderMute();
  });
}
