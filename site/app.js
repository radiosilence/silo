import { QUIZZES } from "./quizzes/index.js";
import { insignia, staircase, stairwell, stamp } from "./art.js";

const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const pause = (ms) => wait(reduced.matches ? 0 : ms);
const pad = (n, w = 3) => String(n).padStart(w, "0");

// ---------- Preferences ----------

const prefs = (() => {
  try { return JSON.parse(localStorage.getItem("silo-prefs")) ?? {}; } catch { return {}; }
})();
const savePrefs = () => { try { localStorage.setItem("silo-prefs", JSON.stringify(prefs)); } catch {} };

// ---------- Sound ----------

let audio;
const ctx = () => (audio ??= new (window.AudioContext || window.webkitAudioContext)());
function noise(dur, freq, gain = 0.3, q = 1) {
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
function tone(freq, dur, gain = 0.05, type = "square") {
  if (prefs.muted) return;
  try {
    const a = ctx();
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + dur);
  } catch {}
}
const sfx = {
  tick: () => { tone(1320, 0.04, 0.03); },
  step: () => { noise(0.09, 180, 0.5, 2); },
  stamp: () => { noise(0.25, 90, 1.2, 0.7); noise(0.08, 1800, 0.25); },
};
const buzz = (p) => navigator.vibrate?.(p);

const muteIcon = () => (prefs.muted
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`
  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/></svg>`);
function renderMute() {
  for (const b of document.querySelectorAll(".mute")) {
    b.innerHTML = muteIcon();
    b.setAttribute("aria-pressed", String(!!prefs.muted));
  }
}
document.addEventListener("click", (e) => {
  if (!e.target.closest(".mute")) return;
  prefs.muted = !prefs.muted;
  savePrefs();
  renderMute();
});

// ---------- Scoring ----------

const sum = (xs) => xs.reduce((a, b) => a + b, 0);

function axisRange(quiz, key) {
  const vals = quiz.questions.map((q) => q.options.map((o) => o.axes?.[key] ?? 0));
  return [sum(vals.map((v) => Math.min(...v))), sum(vals.map((v) => Math.max(...v)))];
}

function score(quiz, picks) {
  const totals = Object.fromEntries(Object.keys(quiz.results).map((k) => [k, 0]));
  const axes = Object.fromEntries(quiz.axes.map((a) => [a.key, 0]));
  picks.forEach((i, qi) => {
    const o = quiz.questions[qi].options[i];
    for (const [k, v] of Object.entries(o.results)) totals[k] += v;
    for (const [k, v] of Object.entries(o.axes ?? {})) axes[k] += v;
  });
  // Ties go to the department that ranks higher in the final question's answer, then to data order.
  const last = quiz.questions.at(-1).options[picks.at(-1)].results;
  const ranked = Object.keys(totals).sort((a, b) => totals[b] - totals[a] || (last[b] ?? 0) - (last[a] ?? 0));
  const stats = quiz.axes.map((a) => {
    const [lo, hi] = axisRange(quiz, a.key);
    return Math.round(((axes[a.key] - lo) / (hi - lo || 1)) * 100);
  });
  const best = totals[ranked[0]] || 1;
  return { first: ranked[0], second: ranked[1], stats, match: Math.round((totals[ranked[1]] / best) * 100) };
}

// ---------- Result links ----------
// #<quiz>/<first>/<second>/<stat.stat.stat>/<match>

const encode = (quiz, r) => `#${quiz.id}/${r.first}/${r.second}/${r.stats.join(".")}/${r.match}`;
function decode(hash) {
  const [id, first, second, stats, match] = hash.replace(/^#/, "").split("/");
  const quiz = QUIZZES[id];
  if (!quiz || !quiz.results[first] || !quiz.results[second] || first === second) return null;
  const nums = (stats ?? "").split(".").map(Number);
  if (nums.length !== quiz.axes.length || nums.some((n) => !Number.isInteger(n) || n < 0 || n > 100)) return null;
  const m = Number(match);
  return { quiz, result: { first, second, stats: nums, match: Number.isInteger(m) && m >= 0 && m <= 100 ? m : 80 } };
}

// ---------- Screens ----------

const screens = ["title", "quiz", "result"];
function show(id) {
  for (const s of screens) $(`#${s}`).hidden = s !== id;
  document.body.dataset.screen = id;
  $(`#${id}`).scrollTop = 0;
}

let quiz = QUIZZES.jobs;
let picks = [];
let busy = false;
let at = 0;

function renderTitle() {
  $("#title-art").innerHTML = staircase();
  $("#kicker").textContent = quiz.kicker;
  $("#title h1").innerHTML = quiz.titleHtml;
  $("#intro").textContent = quiz.intro;
  $("#form-no").textContent = quiz.form;
  $("#cutoff").textContent = quiz.cutoff;
  $("#q-count").textContent = quiz.questions.length;
  const last = prefs.last?.[quiz.id];
  const prev = $("#previous");
  prev.hidden = !last || !decode(last);
  if (!prev.hidden) {
    const r = decode(last).result;
    prev.innerHTML = `<span>On file:</span> <b>${quiz.results[r.first].name}</b>`;
    prev.href = last;
  }
}

function start() {
  picks = [];
  history.replaceState(null, "", location.pathname + location.search);
  show("quiz");
  $("#shaft").style.setProperty("--depth", 0);
  renderQuestion(0, true);
}

function renderQuestion(i, first = false) {
  at = i;
  const q = quiz.questions[i];
  const n = quiz.questions.length;
  $("#q-num").textContent = `${pad(i + 1, 2)} / ${pad(n, 2)}`;
  $("#level").textContent = pad(q.level);
  $("#gauge").style.setProperty("--p", (i / (n - 1)).toFixed(3));
  $("#gauge-ticks").innerHTML = quiz.questions.map((_, j) => `<i class="${j < i ? "done" : j === i ? "now" : ""}"></i>`).join("");
  $("#back").disabled = i === 0;

  const card = document.createElement("article");
  card.className = "qcard";
  card.innerHTML = `
    <header><span class="q-tag">Section ${String.fromCharCode(65 + i)}</span><span class="q-loc">${q.where}</span></header>
    <h2 id="q-text">${q.text}</h2>
    <div class="options" role="radiogroup" aria-labelledby="q-text">
      ${q.options.map((o, j) => `
        <button class="opt" role="radio" aria-checked="${picks[i] === j}" data-i="${j}" style="--d:${j}">
          <span class="box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13 L10 19 L21 4"/></svg></span>
          <span class="letter" aria-hidden="true">${"ABCD"[j]}</span>
          <span class="txt">${o.text}</span>
        </button>`).join("")}
    </div>`;
  const deck = $("#deck");
  const old = deck.querySelector(".qcard:not(.leaving)");
  if (old) {
    old.classList.add("leaving");
    old.addEventListener("animationend", () => old.remove(), { once: true });
    setTimeout(() => old.remove(), 1200);
  }
  if (!first) card.classList.add("entering");
  deck.append(card);
  card.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => choose(i, Number(b.dataset.i), b)));
  requestAnimationFrame(() => card.querySelector(".opt")?.focus({ preventScroll: true }));
}

async function choose(i, j, btn) {
  if (busy) return;
  busy = true;
  picks[i] = j;
  picks.length = i + 1;
  btn.closest(".options").querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-checked", String(b === btn)));
  btn.classList.add("picked");
  sfx.tick();
  buzz(8);
  await pause(480);
  if (i + 1 < quiz.questions.length) {
    descend(i + 1);
    renderQuestion(i + 1);
    await pause(900);
  } else {
    await finish();
  }
  busy = false;
}

function descend(i) {
  $("#shaft").style.setProperty("--depth", i);
  if (reduced.matches) return;
  [0, 140, 280].forEach((t) => setTimeout(sfx.step, t));
}

function back() {
  if (busy || at === 0) return;
  picks.length = at - 1;
  $("#shaft").style.setProperty("--depth", at - 1);
  renderQuestion(at - 1);
}

async function finish() {
  const r = score(quiz, picks);
  const hash = encode(quiz, r);
  prefs.last = { ...prefs.last, [quiz.id]: hash };
  savePrefs();
  history.replaceState(null, "", hash);
  $("#processing").hidden = false;
  await pause(1300);
  $("#processing").hidden = true;
  renderResult(r, false);
}

// ---------- Result ----------

function radar(axes, stats) {
  const cx = 150, cy = 138, R = 96;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const ring = (v) => axes.map((_, i) => pt(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");
  const shape = stats.map((s, i) => pt(i, Math.max(s, 6) / 100).map((n) => n.toFixed(1)).join(",")).join(" ");
  const labels = axes.map((a, i) => {
    const [x, y] = pt(i, 1.24);
    const anchor = Math.abs(x - cx) < 8 ? "middle" : x > cx ? "start" : "end";
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}"><tspan class="lab">${a.label}</tspan><tspan class="val" x="${x.toFixed(1)}" dy="14">${stats[i]}</tspan></text>`;
  }).join("");
  return `<svg class="radar" viewBox="0 0 300 290" role="img" aria-label="${axes.map((a, i) => `${a.label} ${stats[i]}`).join(", ")}">
    ${[0.25, 0.5, 0.75, 1].map((v) => `<polygon class="grid" points="${ring(v)}"/>`).join("")}
    ${axes.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("")}
    <polygon class="shape" points="${shape}" pathLength="1"/>
    ${stats.map((s, i) => { const [x, y] = pt(i, Math.max(s, 6) / 100); return `<circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" style="--d:${i}"/>`; }).join("")}
    ${labels}
  </svg>`;
}

function renderResult(r, shared) {
  const d = quiz.results[r.first];
  const s = quiz.results[r.second];
  const root = $("#result");
  root.style.setProperty("--dept", d.colour);
  root.style.setProperty("--dept-ink", d.ink ?? "#16130f");
  root.classList.toggle("shared", shared);
  $("#r-shared").hidden = !shared;
  $("#retake").textContent = shared ? "Take the quiz" : "Take it again";
  $("#r-insignia").innerHTML = insignia(r.first, d);
  $("#r-name").textContent = d.name;
  $("#r-levels").textContent = d.levels;
  $("#r-role").textContent = d.role;
  $("#r-life").innerHTML = d.life.map((p) => `<p>${p}</p>`).join("");
  $("#r-people").innerHTML = d.people.length
    ? d.people.map(([n, w]) => `<li><b>${n}</b><span>${w}</span></li>`).join("")
    : `<li class="nobody"><span>${d.nobody}</span></li>`;
  $("#r-pact").textContent = d.pact;
  $("#r-clause").textContent = d.clause;
  $("#r-radar").innerHTML = radar(quiz.axes, r.stats);
  $("#r-axes").innerHTML = quiz.axes.map((a, i) => `<li><b>${a.label}</b> ${a.describe(r.stats[i])}</li>`).join("");
  $("#r-second").innerHTML = `
    <div class="mini" style="--dept:${s.colour}">${insignia(r.second, s)}</div>
    <div><small>Secondary assignment &middot; ${r.match}% fit</small><b>${s.name}</b><span>${s.levels}</span></div>`;
  $("#r-stamp").innerHTML = stamp("ASSIGNED");
  $("#r-serial").textContent = `${quiz.form} · No. ${serial(r)}`;
  show("result");
  root.classList.remove("in");
  void root.offsetWidth;
  root.classList.add("in");
  if (!reduced.matches && !shared) setTimeout(() => { sfx.stamp(); buzz([0, 20, 40, 30]); }, 1150);
}

const serial = (r) => {
  let h = 7;
  for (const c of encode(quiz, r)) h = (h * 31 + c.charCodeAt(0)) % 99991;
  return pad(h, 5);
};

async function share() {
  const r = decode(location.hash)?.result;
  if (!r) return;
  const d = quiz.results[r.first];
  const url = location.href;
  const text = quiz.shareText(d);
  if (navigator.share) {
    try { await navigator.share({ title: document.title, text, url }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  const btn = $("#share");
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    toast("Copied to clipboard");
  } catch {
    prompt("Copy this link", url);
  }
  btn.blur();
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
}

// ---------- Boot ----------

function route() {
  const hit = decode(location.hash);
  if (hit) {
    quiz = hit.quiz;
    const own = prefs.last?.[quiz.id] === location.hash;
    renderTitle();
    renderResult(hit.result, !own);
  } else {
    renderTitle();
    show("title");
  }
}

$("#begin").addEventListener("click", start);
$("#back").addEventListener("click", back);
$("#quit").addEventListener("click", () => { history.replaceState(null, "", location.pathname); renderTitle(); show("title"); });
$("#retake").addEventListener("click", start);
$("#share").addEventListener("click", share);
$("#to-title").addEventListener("click", () => { history.replaceState(null, "", location.pathname); renderTitle(); show("title"); });
window.addEventListener("hashchange", route);
document.addEventListener("keydown", (e) => {
  if (document.body.dataset.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
  const j = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
  if (j >= 0) document.querySelector(`.qcard:not(.leaving) .opt[data-i="${j}"]`)?.click();
  else if (e.key === "Backspace") back();
});

// Hold the stencil headings back until their font arrives, so they never flash in a fallback face.
Promise.race([document.fonts?.ready, wait(1500)]).then(() => document.body.classList.add("fonts"));
$("#treads").innerHTML = stairwell();
renderMute();
route();
