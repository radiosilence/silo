// Quiz engine. Knows nothing about any particular quiz: everything shown comes from the quiz
// object passed to run(), defined in a data module next to each quiz page.
import { staircase, stairwell, stamp } from "./art.js";
import { sfx, buzz, prefs, savePrefs, muteButtons } from "./sound.js";

const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const pause = (ms) => wait(reduced.matches ? 0 : ms);
const pad = (n, w = 3) => String(n).padStart(w, "0");
const sum = (xs) => xs.reduce((a, b) => a + b, 0);

const ICONS = {
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>`,
};

const markup = (quiz) => `
  <div class="lights" aria-hidden="true"></div>

  <main id="title" class="screen">
    <div class="title-art" id="title-art" aria-hidden="true"></div>
    <a class="back" href="../">All games</a>
    <div class="title-inner">
      <p class="kicker">${quiz.kicker}</p>
      <h1>${quiz.titleHtml}</h1>
      <div class="form">
        <div class="form-head"><span>${quiz.form}</span><span class="cutoff">${quiz.cutoff}</span></div>
        <p id="intro">${quiz.intro}</p>
        <ul class="form-meta">
          <li><b>${quiz.questions.length}</b> questions</li>
          <li><b>4</b> answers each</li>
          <li>Results are final</li>
        </ul>
        <button class="btn primary" id="begin">${quiz.labels.begin}</button>
        <a class="previous" id="previous" hidden></a>
      </div>
      <p class="disclaimer">${quiz.disclaimer}</p>
    </div>
    <button class="icon-btn mute corner" aria-label="Sound"></button>
  </main>

  <section id="quiz" class="screen" hidden>
    <div class="shaft" id="shaft" aria-hidden="true"><div class="treads" id="treads"></div></div>
    <header class="qbar">
      <button class="icon-btn" id="quit" aria-label="Abandon the form">${ICONS.close}</button>
      <div class="depth"><span class="depth-label">Level</span><span class="depth-num" id="level">001</span></div>
      <div class="gauge"><div class="gauge-ticks" id="gauge-ticks"></div><span class="q-num" id="q-num"></span></div>
      <button class="icon-btn mute" aria-label="Sound"></button>
    </header>
    <div class="deck" id="deck"></div>
    <footer class="qfoot"><button class="link-btn" id="back">&larr; Previous question</button></footer>
    <div class="processing" id="processing" hidden>
      <div class="crt">${quiz.labels.processing.map((l, i) => `<p class="l${i + 1}">&gt; ${l}${i ? "" : `<span class="cursor"></span>`}</p>`).join("")}</div>
    </div>
  </section>

  <section id="result" class="screen" hidden>
    <a class="back" href="../">All games</a>
    <div class="result-inner">
      <p class="shared-note" id="r-shared" hidden>${quiz.labels.shared}</p>
      <article class="notice">
        <header class="notice-head"><span>${quiz.labels.notice}</span><span id="r-serial"></span></header>
        <div class="notice-hero">
          <div class="illustration" id="r-art"></div>
          <div class="stamp" id="r-stamp" aria-hidden="true"></div>
          <p class="assign-to">${quiz.labels.assignTo}</p>
          <h2 id="r-name"></h2>
          <p class="badge" id="r-badge"></p>
          <p class="tagline" id="r-tagline"></p>
        </div>
        <section class="block life" id="r-body"></section>
        <section class="block pact" id="r-quote"><h3></h3><blockquote></blockquote></section>
        <section class="block">
          <h3>${quiz.labels.axes}</h3>
          <div class="radar-wrap" id="r-radar"></div>
          <ul class="axes" id="r-axes"></ul>
        </section>
        <section class="block" id="r-people-block"><h3>${quiz.labels.people ?? ""}</h3><ul class="people" id="r-people"></ul></section>
        <section class="block second" id="r-second"></section>
      </article>
      <div class="actions">
        <button class="btn primary" id="share">${ICONS.share} ${quiz.labels.share}</button>
        <div class="row">
          <button class="btn" id="retake"></button>
          <a class="btn" href="../">All games</a>
        </div>
      </div>
      <p class="disclaimer">${quiz.disclaimer}</p>
    </div>
    <button class="icon-btn mute corner" aria-label="Sound"></button>
  </section>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

// ---------- Scoring ----------

function axisRange(quiz, key) {
  const vals = quiz.questions.map((q) => q.options.map((o) => o.axes?.[key] ?? 0));
  return [sum(vals.map((v) => Math.min(...v))), sum(vals.map((v) => Math.max(...v)))];
}

export function score(quiz, picks) {
  const totals = Object.fromEntries(Object.keys(quiz.results).map((k) => [k, 0]));
  const axes = Object.fromEntries(quiz.axes.map((a) => [a.key, 0]));
  picks.forEach((i, qi) => {
    const o = quiz.questions[qi].options[i];
    for (const [k, v] of Object.entries(o.results)) totals[k] += v;
    for (const [k, v] of Object.entries(o.axes ?? {})) axes[k] += v;
  });
  // Ties go to whichever result the final answer favoured, then to data order.
  const last = quiz.questions.at(-1).options[picks.at(-1)].results;
  const ranked = Object.keys(totals).sort((a, b) => totals[b] - totals[a] || (last[b] ?? 0) - (last[a] ?? 0));
  const stats = quiz.axes.map((a) => {
    const [lo, hi] = axisRange(quiz, a.key);
    return Math.round(((axes[a.key] - lo) / (hi - lo || 1)) * 100);
  });
  const best = totals[ranked[0]] || 1;
  return { first: ranked[0], second: ranked[1], stats, match: Math.round((totals[ranked[1]] / best) * 100) };
}

// ---------- Result links: #<quiz>/<first>/<second>/<stat.stat.stat>/<match> ----------

const encode = (quiz, r) => `#${quiz.id}/${r.first}/${r.second}/${r.stats.join(".")}/${r.match}`;
function decode(quiz, hash) {
  const [id, first, second, stats, match] = hash.replace(/^#/, "").split("/");
  if (id !== quiz.id || !quiz.results[first] || !quiz.results[second] || first === second) return null;
  const nums = (stats ?? "").split(".").map(Number);
  if (nums.length !== quiz.axes.length || nums.some((n) => !Number.isInteger(n) || n < 0 || n > 100)) return null;
  const m = Number(match);
  return { first, second, stats: nums, match: Number.isInteger(m) && m >= 0 && m <= 100 ? m : 80 };
}

// ---------- Radar ----------

function radar(axes, stats) {
  const cx = 150, cy = 138, R = 96;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const xy = (p) => p.map((n) => n.toFixed(1)).join(",");
  const ring = (v) => axes.map((_, i) => xy(pt(i, v))).join(" ");
  const shape = stats.map((s, i) => xy(pt(i, Math.max(s, 6) / 100))).join(" ");
  const labels = axes.map((a, i) => {
    const [x, y] = pt(i, 1.24);
    const anchor = Math.abs(x - cx) < 8 ? "middle" : x > cx ? "start" : "end";
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}"><tspan class="lab">${a.label}</tspan><tspan class="val" x="${x.toFixed(1)}" dy="14">${stats[i]}</tspan></text>`;
  }).join("");
  return `<svg class="radar" viewBox="0 0 300 290" role="img" aria-label="${axes.map((a, i) => `${a.label} ${stats[i]}`).join(", ")}">
    ${[0.25, 0.5, 0.75, 1].map((v) => `<polygon class="grid" points="${ring(v)}"/>`).join("")}
    ${axes.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("")}
    <polygon class="shape" points="${shape}"/>
    ${stats.map((s, i) => { const [x, y] = pt(i, Math.max(s, 6) / 100); return `<circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" style="--d:${i}"/>`; }).join("")}
    ${labels}
  </svg>`;
}

// ---------- Run ----------

export function run(quiz) {
  document.body.insertAdjacentHTML("afterbegin", markup(quiz));
  document.body.dataset.quiz = quiz.id;
  muteButtons();

  let picks = [];
  let busy = false;
  let at = 0;

  const show = (id) => {
    for (const s of ["title", "quiz", "result"]) $(`#${s}`).hidden = s !== id;
    document.body.dataset.screen = id;
    $(`#${id}`).scrollTop = 0;
  };

  function renderTitle() {
    $("#title-art").innerHTML = staircase();
    const last = decode(quiz, prefs.last?.[quiz.id] ?? "");
    const prev = $("#previous");
    prev.hidden = !last;
    if (last) {
      prev.innerHTML = `<span>On file:</span> <b>${quiz.results[last.first].name}</b>`;
      prev.href = prefs.last[quiz.id];
    }
  }

  function toTitle() {
    history.replaceState(null, "", location.pathname);
    renderTitle();
    show("title");
  }

  function start() {
    picks = [];
    history.replaceState(null, "", location.pathname);
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
    $("#gauge-ticks").innerHTML = quiz.questions.map((_, j) => `<i class="${j < i ? "done" : j === i ? "now" : ""}"></i>`).join("");
    $("#back").disabled = i === 0;

    const card = document.createElement("article");
    card.className = "qcard";
    card.innerHTML = `
      <header><span class="q-tag">Section ${String.fromCharCode(65 + i)}</span><span class="q-loc">${q.where}</span></header>
      <h2 id="q-text-${i}">${q.text}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-text-${i}">
        ${q.options.map((o, j) => `
          <button class="opt" role="radio" aria-checked="${picks[i] === j}" data-i="${j}" style="--d:${j}">
            <span class="box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13 L10 19 L21 4"/></svg></span>
            <span class="letter" aria-hidden="true">${"ABCD"[j]}</span>
            <span class="txt">${o.text}</span>
          </button>`).join("")}
      </div>`;
    const deck = $("#deck");
    for (const old of deck.querySelectorAll(".qcard:not(.leaving)")) {
      old.classList.add("leaving");
      setTimeout(() => old.remove(), reduced.matches ? 0 : 600);
    }
    if (!first) card.classList.add("entering");
    deck.append(card);
    card.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => choose(i, Number(b.dataset.i), b)));
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
      $("#shaft").style.setProperty("--depth", i + 1);
      if (!reduced.matches) [0, 140, 280].forEach((t) => setTimeout(sfx.step, t));
      renderQuestion(i + 1);
      await pause(900);
    } else {
      await finish();
    }
    busy = false;
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

  function renderResult(r, shared) {
    const d = quiz.results[r.first];
    const s = quiz.results[r.second];
    const root = $("#result");
    root.style.setProperty("--dept", d.colour);
    root.style.setProperty("--dept-ink", d.ink ?? "#1e1b16");
    $("#r-shared").hidden = !shared;
    $("#retake").textContent = shared ? "Take the quiz" : "Take it again";
    $("#r-art").innerHTML = quiz.illustrate(r.first);
    $("#r-name").textContent = d.name;
    $("#r-badge").textContent = d.badge;
    $("#r-tagline").textContent = d.tagline;
    $("#r-body").innerHTML = d.body.map((p) => `<p>${p}</p>`).join("");
    $("#r-quote").hidden = !d.quote;
    if (d.quote) {
      $("#r-quote h3").textContent = d.quote.title;
      $("#r-quote blockquote").textContent = d.quote.text;
    }
    $("#r-people-block").hidden = !d.people;
    if (d.people) {
      $("#r-people").innerHTML = d.people.length
        ? d.people.map(([n, w]) => `<li><b>${n}</b><span>${w}</span></li>`).join("")
        : `<li class="nobody"><span>${d.nobody}</span></li>`;
    }
    $("#r-radar").innerHTML = radar(quiz.axes, r.stats);
    $("#r-axes").innerHTML = quiz.axes.map((a, i) => `<li><b>${a.label}</b> ${a.describe(r.stats[i])}</li>`).join("");
    $("#r-second").innerHTML = `
      <div class="mini" style="--dept:${s.colour}">${quiz.illustrate(r.second)}</div>
      <div><small>${quiz.labels.second} &middot; ${r.match}% fit</small><b>${s.name}</b><span>${s.badge}</span></div>`;
    $("#r-stamp").innerHTML = stamp(quiz.labels.stamp, quiz.labels.stampLegend);
    let h = 7;
    for (const c of encode(quiz, r)) h = (h * 31 + c.charCodeAt(0)) % 99991;
    $("#r-serial").textContent = `${quiz.form} · No. ${pad(h, 5)}`;
    show("result");
    root.classList.remove("in");
    void root.offsetWidth;
    root.classList.add("in");
    if (!reduced.matches && !shared) setTimeout(() => { sfx.stamp(); buzz([0, 20, 40, 30]); }, 1150);
  }

  async function share() {
    const r = decode(quiz, location.hash);
    if (!r) return;
    const url = location.href;
    const text = quiz.shareText(quiz.results[r.first]);
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text, url }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast("Copied to clipboard");
    } catch {
      prompt("Copy this link", url);
    }
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
  }

  function route() {
    const r = decode(quiz, location.hash);
    renderTitle();
    if (r) renderResult(r, prefs.last?.[quiz.id] !== location.hash);
    else show("title");
  }

  $("#begin").addEventListener("click", start);
  $("#back").addEventListener("click", back);
  $("#quit").addEventListener("click", toTitle);
  $("#retake").addEventListener("click", start);
  $("#share").addEventListener("click", share);
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", (e) => {
    if (document.body.dataset.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const j = Math.max("1234".indexOf(e.key), "abcd".indexOf(e.key.toLowerCase()));
    if (e.key.length === 1 && j >= 0) document.querySelector(`.qcard:not(.leaving) .opt[data-i="${j}"]`)?.click();
    else if (e.key === "Backspace") back();
  });

  // Hold the stencil headings back until their font arrives, so they never flash in a fallback face.
  Promise.race([document.fonts?.ready, wait(1500)]).then(() => document.body.classList.add("fonts"));
  $("#treads").innerHTML = stairwell();
  route();
}
