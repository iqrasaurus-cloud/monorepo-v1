// Hijaiyya Lab prototype: one letter journey through the 4-I steps, plus three ways in
// (Write with Saurus, Sound Spots, Spot it in the Quran), a sticker map, search and print.
// Progress is kept on this device only (localStorage). Nothing is sent anywhere.
"use strict";

// =====================================================================================
// Small helpers
// =====================================================================================
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const app = $("#app");
// Escape a sentence and keep any Arabic in it the right way round and in the Quran font
const arab = (s) => esc(s).replace(/[؀-ۿ][؀-ۿ\s]*[؀-ۿ]|[؀-ۿ]/g, (m) => `<bdi class="ar" style="font-size:1.4em">${m}</bdi>`);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TOOLS = {
  hunt: { name: "Hijaiyya Hunt", url: (l) => `http://localhost:4610/?l=${encodeURIComponent(l ? l.ar : "ب")}`, line: "Printable letter-spotting worksheets (prototype)" },
  qi: { name: "Quran Investigator", url: () => "http://localhost:4611/", line: "A booklet for each surah (prototype)" },
  hafiz: { name: "Mini Hafiz", url: () => "https://iqrasaurus.com/hafiz", line: "Memorise a few ayat at a time" },
  numbers: { name: "Numbers & Counting", url: () => "https://iqrasaurus.com/numbers", line: "One number a day" },
  tadabbur: { name: "Tadabbur", url: () => "https://iqrasaurus.com/tadabbur", line: "One ayah a day" },
  calendar: { name: "Calendar", url: () => "https://iqrasaurus.com/calendar", line: "Key days this Islamic month" },
};
const I4 = [
  { id: "inspire", name: "Inspire", sub: "Meet it and spot it", c: "var(--inspire)", oc: "var(--on-inspire)" },
  { id: "investigate", name: "Investigate", sub: "Find its sound spot", c: "var(--investigate)", oc: "var(--on-investigate)" },
  { id: "integrate", name: "Integrate", sub: "Write it", c: "var(--integrate)", oc: "var(--on-integrate)" },
  { id: "impart", name: "Impart", sub: "Say it and teach it", c: "var(--impart)", oc: "var(--on-impart)" },
];

// ---------- Saved on this device ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem("hlab." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("hlab." + k, JSON.stringify(v)); } catch { /* private mode: keep going without saving */ } },
};
const progress = store.get("progress", {});
const P = (id) => (progress[id] ||= {});
const markStep = (id, step, extra) => {
  const before = isEarned(id);
  Object.assign(P(id), { [step]: true }, extra || {});
  store.set("progress", progress);
  refreshSteps(id);
  if (!before && isEarned(id)) celebrate(BY_ID[id]);
};
const isEarned = (id) => I4.every((s) => progress[id]?.[s.id]);

// Routes look like #/letter/ba/investigate?x=1
function route() {
  const [path, qs] = location.hash.replace(/^#\/?/, "").split("?");
  return { parts: path.split("/").filter(Boolean), q: new URLSearchParams(qs || "") };
}
let cleanups = [];
const onLeave = (fn) => cleanups.push(fn);

// =====================================================================================
// Letter shapes: measure the ink of a glyph once, so every drawing can fit it snugly
// =====================================================================================
const FONT = '"Amiri Quran"';
const metricsCache = new Map();
function inkBox(text) {
  if (metricsCache.has(text)) return metricsCache.get(text);
  const k = 4, W = 900, H = 700, ox = 450, oy = 420; // 250px font = 1000 units / 4
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.font = `250px ${FONT}`; x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillStyle = "#000";
  x.fillText(text, ox, oy);
  const d = x.getImageData(0, 0, W, H).data;
  let x0 = W, y0 = H, x1 = 0, y1 = 0, rx = -1, ry = 0;
  for (let y = 0; y < H; y++) for (let i = 0; i < W; i++) if (d[(y * W + i) * 4 + 3] > 60) {
    if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y;
    if (i > rx + 2 || (Math.abs(i - rx) <= 2 && y < ry)) { rx = i; ry = y; }
  }
  const box = { x: (x0 - ox) * k, y: (y0 - oy) * k, w: (x1 - x0) * k, h: (y1 - y0) * k, start: [(rx - ox) * k - 30, (ry - oy) * k + 30] };
  metricsCache.set(text, box);
  return box;
}

// A run of letters fitted exactly to its ink, for small inline use (height set by CSS)
function inkStrip(text, pad = 60) {
  const b = inkBox(text);
  return `<svg class="strip" viewBox="${b.x - pad} ${b.y - pad} ${b.w + 2 * pad} ${b.h + 2 * pad}" aria-hidden="true"><text x="0" y="0" font-family="'Amiri Quran'" font-size="1000" text-anchor="middle" fill="currentColor">${text}</text></svg>`;
}
function letterSVG(text, pad = 120) {
  const b = inkBox(text), w = b.w + 2 * pad, h = b.h + 2 * pad, sz = Math.max(w, h);
  return `<svg viewBox="${b.x + b.w / 2 - sz / 2} ${b.y + b.h / 2 - sz / 2} ${sz} ${sz}" aria-hidden="true" style="width:100%;height:100%;display:block"><text x="0" y="0" font-family="'Amiri Quran'" font-size="1000" text-anchor="middle" fill="currentColor">${text}</text></svg>`;
}

// =====================================================================================
// Trace levels. The trace card itself, and its paper version, live in art.js.
// =====================================================================================
const LEVELS = [
  { id: "arrows", name: "Follow the arrows" },
  { id: "outline", name: "Just the outline" },
  { id: "faint", name: "Faint letter" },
  { id: "own", name: "All by myself" },
];

// =====================================================================================
// Pencil choices (the trace card is in art.js)
// =====================================================================================
const PENS = [
  { id: "crayon", name: "Crayon" }, { id: "marker", name: "Marker" }, { id: "rainbow", name: "Rainbow" }, { id: "sparkle", name: "Sparkle" },
];
const COLOURS = ["#5c3d8f", "#2f6f73", "#b0359f", "#e2231a", "#1f8fc9", "#f2b705", "#333a3c"];
const PAPERS = [{ id: "sky", name: "Sky" }, { id: "sand", name: "Sand" }, { id: "grass", name: "Grass" }, { id: "night", name: "Night" }, { id: "plain", name: "Plain" }];
const WIDTHS = { thin: 1, medium: 2, thick: 3 }; // names only; sizes are PEN_UNITS in art.js
const penPrefs = () => store.get("pen", { pen: "crayon", colour: "#5c3d8f", width: "medium", paper: "sky" });

// =====================================================================================
// Spot it in a surah: tap the words that have the letter, then count it
// =====================================================================================
const MARKS = "[\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06ED]*";
const EQUIV = { "ا": "اٱأإآ", "ء": "ءأإؤئ" };
const charsFor = (l) => EQUIV[l.ar] || l.ar;
const countIn = (s, l) => [...s].filter((c) => charsFor(l).includes(c)).length;
const surahHas = (u, l) => u.ayat.reduce((n, a) => n + countIn(a.text, l), 0);

function spotIt(el, letter, surahId, onFound) {
  const list = LAB_QURAN.filter((u) => surahHas(u, letter) > 0);
  let u = list.find((x) => x.id === surahId) || list[0];
  const found = new Set();
  const render = (reveal = false) => {
    const re = new RegExp(`[${charsFor(letter)}]${MARKS}`, "g");
    const words = u.ayat.flatMap((a) => a.words.map((w, j) => ({ w, a: a.n, j, has: countIn(w, letter) > 0 })));
    const total = words.filter((x) => x.has).length, n = surahHas(u, letter);
    el.innerHTML = `<div class="row" style="justify-content:space-between"><label class="row small"><b>Surah</b>
        <select id="surahSel" style="font:inherit;padding:6px 10px;border-radius:12px;border:2px solid var(--line)">${list.map((x) => `<option value="${x.id}"${x.id === u.id ? " selected" : ""}>${x.number}. ${esc(x.name)}</option>`).join("")}</select></label>
        <span class="counter" aria-live="polite">Found ${[...found].filter((k) => k.startsWith(u.id + ":")).length} of ${total} words</span></div>
      <p class="small muted" style="margin:6px 0">Tap every word that has <b class="ar" style="font-size:22px">${letter.ar}</b> in it. Look at the start, middle and end of words.</p>
      <div class="ayat${reveal ? " reveal" : ""}">${u.ayat.map((a) => a.words.map((w, j) => {
        const key = `${u.id}:${a.n}:${j}`;
        return `<button type="button" data-k="${key}" data-has="${countIn(w, letter) > 0 ? 1 : 0}" class="${found.has(key) ? "found" : ""}">${reveal ? esc(w).replace(re, (m) => `<span class="hit">${m}</span>`) : esc(w)}</button>`;
      }).join(" ") + ` <span class="num">﴿${a.n.toLocaleString("ar-EG")}﴾</span>`).join(" ")}</div>
      <div class="row" style="margin-top:10px"><button class="btn" id="reveal">Show me where</button>
        <label class="row small"><b>How many ${esc(letter.name)}s in the whole surah?</b> <input class="num" id="howmany" inputmode="numeric" autocomplete="off" aria-label="How many"></label>
        <span id="hmfb" class="small"></span></div>
      <p class="note">Arabic from the IqraSaurus Quran data, copied by program. Count it, then find the number in <a href="${TOOLS.numbers.url()}" target="_blank" rel="noopener">Numbers &amp; Counting</a>.</p>`;
    $("#surahSel", el).onchange = (e) => { u = list.find((x) => x.id === e.target.value); render(); };
    $("#reveal", el).onclick = () => { render(true); onFound?.(); };
    $$(".ayat button", el).forEach((b) => b.onclick = () => {
      if (b.dataset.has === "1") { found.add(b.dataset.k); b.classList.add("found"); onFound?.(); $(".counter", el).textContent = `Found ${[...found].filter((k) => k.startsWith(u.id + ":")).length} of ${total} words`; }
      else { b.classList.add("nope"); setTimeout(() => b.classList.remove("nope"), 700); }
    });
    $("#howmany", el).oninput = (e) => {
      const v = +e.target.value; e.target.classList.toggle("ok", v === n); e.target.classList.toggle("no", !!e.target.value && v !== n);
      $("#hmfb", el).textContent = v === n ? `Yes! ${n} times.` : "";
    };
  };
  render();
}

// =====================================================================================
// Celebration (one dino moves at a time)
// =====================================================================================
function celebrate(l) {
  const d = document.createElement("div");
  d.className = "celebrate";
  d.innerHTML = `<div class="box" role="dialog" aria-label="Sticker earned"><div class="big">${letterSVG(l.ar, 200)}</div><h2 style="margin:0">You earned the ${esc(l.name)} sticker!</h2>
    <p>Inspire, Investigate, Integrate and Impart: all done. It's on your sticker map now.</p>
    <div class="reveal" aria-hidden="true"><img class="line" src="img/lineart/celebrating-md.webp" alt="" width="512" height="475"><img class="colour" src="img/celebrating-md.webp" alt="" width="335" height="311"></div>
    <div class="row" style="justify-content:center"><a class="btn main" href="#/">See my map</a><button class="btn" data-close>Stay here</button></div></div>`;
  d.onclick = (e) => { if (e.target === d || e.target.closest("[data-close], a")) d.remove(); };
  document.body.appendChild(d);
}

// =====================================================================================
// Home: search, three ways in, the sticker map
// =====================================================================================
const STATIONS = [
  { id: "space", name: "The empty space", sub: "Al-Jawf · rongga mulut: Alif, and long Waw and Ya (madd)", spots: ["space"] },
  { id: "throat", name: "Throat", sub: "Al-Ḥalq · kerongkong: deep, middle and top", spots: ["throatDeep", "throatMid", "throatNear"] },
  { id: "back", name: "Back of the tongue", sub: "Lidah: belakang", spots: ["qaf", "kaf"] },
  { id: "middle", name: "Middle of the tongue", sub: "Lidah: tengah", spots: ["mid"] },
  { id: "side", name: "Side of the tongue", sub: "Lidah: tepi", spots: ["sides"] },
  { id: "tip", name: "Tip and edges of the tongue", sub: "Lidah: hujung", spots: ["edges", "nun", "ra", "ta", "sin", "tha"] },
  { id: "lips", name: "Lips", sub: "Ash-Shafatān · bibir", spots: ["fa", "lips"] },
  { id: "nose", name: "Nose (bonus)", sub: "Al-Khayshūm · hidung: the hum of Nun and Mim", spots: ["nose"] },
];
const lettersAt = (st) => LETTERS.filter((l) => st.spots.includes(l.spot)).sort((a, b) => SPOTS[a.spot].depth - SPOTS[b.spot].depth);
const sideFor = (spotId, { bw = false } = {}) => mouthImg(`${spotId}-side`, { kind: "mini", bw, alt: SPOTS[spotId].name });
function stickerHTML(l, names = false) {
  const p = progress[l.id] || {};
  const vars = I4.map((s, i) => `--p${i + 1}:${p[s.id] ? s.c : "var(--line)"}`).join(";");
  return `<a class="sticker${isEarned(l.id) ? " earned" : ""}" href="#/letter/${l.id}" style="${vars}" aria-label="${esc(l.name)}${isEarned(l.id) ? ", sticker earned" : ""}"><span>${letterSVG(l.ar, 260)}</span>${names ? `<small>${esc(l.name)}</small>` : ""}</a>`;
}

function viewHome() {
  const earned = LETTERS.filter((l) => isEarned(l.id)).length;
  app.innerHTML = `<div class="hero"><img class="mascot" src="img/magnifying-glass-md.webp" alt="" width="96" height="96">
      <div><h1>Hijaiyya Lab</h1><p>Read it, say it, write it. Each letter has four steps: <b>Inspire</b> (meet it and spot it in a surah you know), <b>Investigate</b> (find where its sound comes from), <b>Integrate</b> (write it) and <b>Impart</b> (say it and teach someone). Finish all four to earn its sticker.</p></div></div>
    <div class="search"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      <input id="q" type="search" placeholder="Search a letter (ba, ب), a sound spot (lips, kerongkong), a surah (Al-Ikhlas) or a tool" aria-label="Search" autocomplete="off"></div>
    <div class="results" id="results"></div>
    <div class="doors">
      <a class="door" href="#/write" style="--c:var(--integrate)"><img src="img/pointing-md.webp" alt="" width="74" height="74"><div><b>Write with Saurus</b><span>Trace any letter alone, at the start, middle or end. On screen with a pencil, or print it.</span></div></a>
      <a class="door" href="#/spots" style="--c:var(--investigate)"><img src="img/thinking-questions-md.webp" alt="" width="74" height="74"><div><b>Sound Spots</b><span>Where in the mouth does each letter come from? (Makhraj)</span></div></a>
      <a class="door" href="#/quran" style="--c:var(--inspire)"><img src="img/treasure-map-md.webp" alt="" width="74" height="74"><div><b>Spot it in the Quran</b><span>Find letters in the surahs you already know.</span></div></a>
    </div>
    <h2>My sticker map <span class="muted" style="font-size:16px">· ${earned} of ${LETTERS.length} stickers</span></h2>
    <p class="muted" style="margin:0 0 4px">The map follows the sound from deep inside to the lips, the way the makhraj is taught. Each ring fills in a colour as you finish a step.</p>
    <div class="legend">${I4.map((s) => `<span><i style="background:${s.c}"></i>${s.name}</span>`).join("")}</div>
    <div class="map">${STATIONS.map((st) => {
      const ls = lettersAt(st);
      const body = st.id === "nose"
        ? `<div class="stickers"><span class="sticker${isEarned("nun") && isEarned("mim") ? " earned" : ""}" title="Earn Nun and Mim to get the hum sticker"><span>${letterSVG("ن م", 160)}</span></span></div><div class="sub" style="margin-top:6px">Bonus: earn Nun and Mim to unlock the hum sticker.</div>`
        : `<div class="stickers withnames">${ls.map((l) => stickerHTML(l, true)).join("")}</div>`;
      const all = ls.length && ls.every((l) => isEarned(l.id));
      return `<section class="station"><div class="mini">${sideFor(st.spots[0], { levels: false })}</div><div><h3>${st.name}${all ? ` <span class="pill" style="background:var(--sun);color:var(--plum)">★ ${st.name} badge</span>` : ""}</h3><div class="sub">${st.sub}</div>${body}</div></section>`;
    }).join("")}</div>
    <h2>For grown-ups</h2>
    <div class="grid2">
      <div class="card"><h3>How a letter works</h3><ol style="margin:0;padding-left:20px">
        <li><b>Inspire:</b> meet the letter's four shapes, guess where its sound comes from, and hunt for it in a surah your child already recites.</li>
        <li><b>Investigate:</b> tap the spot in the mouth picture, then feel it with fingers, a mirror or the stop test (أَبْ).</li>
        <li><b>Integrate:</b> write it with the arrows, then with less help each time, and compare it with its sound neighbours.</li>
        <li><b>Impart:</b> your child records themself, teaches someone, and you give the sticker when the sound is clear.</li></ol></div>
      <div class="card"><h3>Before this goes live</h3><p class="flag">DRAFT: the children's makhraj wording, the stroke order and the letter names need an ustaz or ustazah to check them. There is no audio yet: the "Listen" buttons will use the owner's recordings once they are ready.</p>
        <p class="small muted">Progress is kept on this device only. Nothing is sent anywhere.</p><a class="btn" href="#/print">Printables</a></div>
    </div>`;
  const input = $("#q");
  input.oninput = () => renderResults(input.value);
  input.focus({ preventScroll: true });
}

// ---------- Search: letters, sound spots, surahs, activities and the other tools ----------
function searchIndex() {
  const items = [];
  for (const l of LETTERS) items.push({ kind: "letter", l, keys: [l.name, ...l.alias, l.ar, l.id].map((k) => k.toLowerCase()), title: `${l.name} ${l.ar}`, sub: SPOTS[l.spot].short, href: `#/letter/${l.id}` });
  for (const r of REGIONS) items.push({ kind: "region", keys: [r.name, r.ms, r.tr, r.ar, r.id].map((k) => k.toLowerCase()), title: r.name, sub: `${r.ms} · ${LETTERS.filter((l) => SPOTS[l.spot].region === r.id).map((l) => l.ar).join(" ") || "the hum of ن and م"}`, href: `#/spots?r=${r.id}` });
  for (const u of LAB_QURAN) items.push({ kind: "surah", keys: [u.name, u.name.replace(/^A[ln]-|^Ad-|^At-|^Az-/i, ""), String(u.number), u.meaning || ""].map((k) => k.toLowerCase()), title: `Spot letters in ${u.name}`, sub: `Surah ${u.number}${u.meaning ? ` · ${u.meaning}` : ""}`, href: `#/quran/${u.id}` });
  const acts = [
    { keys: ["write", "trace", "tracing", "tulis", "menulis", "surih", "pencil", "handwriting"], title: "Write with Saurus", sub: "Trace letters on screen or print", href: "#/write" },
    { keys: ["colour", "color", "warna", "mewarna", "crayon"], title: "Colour a big letter", sub: "Big outline letters to colour in", href: "#/write?level=outline&pen=crayon" },
    { keys: ["makhraj", "sound", "spot", "say", "sebut", "pronounce", "tajwid", "mouth", "mulut"], title: "Sound Spots", sub: "Where each letter comes from", href: "#/spots" },
    { keys: ["print", "cetak", "worksheet", "sticker", "pelekat", "a4", "a5"], title: "Printables", sub: "Letter sheets, tracing, sticker map", href: "#/print" },
    { keys: ["quran", "surah", "ayat", "ayah", "spot it"], title: "Spot it in the Quran", sub: "Find letters in surahs you know", href: "#/quran" },
  ];
  for (const a of acts) items.push({ kind: "activity", ...a });
  const toolKeys = { hunt: ["hunt", "find", "cari", "circle", "worksheet"], qi: ["investigator", "booklet", "buku"], hafiz: ["memorise", "memorize", "hafal", "hafiz"], numbers: ["count", "number", "kira", "nombor", "counting"], tadabbur: ["tadabbur", "meaning", "reflect", "makna"], calendar: ["calendar", "kalendar", "month"] };
  for (const [k, t] of Object.entries(TOOLS)) items.push({ kind: "tool", tool: k, keys: [t.name.toLowerCase(), ...toolKeys[k]], title: t.name, sub: t.line, href: t.url() });
  return items;
}
let INDEX = null;
function renderResults(qRaw, el = $("#results")) {
  const q = qRaw.trim().toLowerCase();
  if (!q) { el.innerHTML = ""; return; }
  INDEX ||= searchIndex();
  const score = (it) => Math.max(...it.keys.map((k) => (k === q ? 3 : k.startsWith(q) ? 2 : q.length > 2 && k.includes(q) ? 1 : 0)));
  const hits = INDEX.map((it) => ({ it, s: score(it) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map((x) => x.it);
  // A letter match also offers that letter in the other tools
  const topLetter = hits.find((h) => h.kind === "letter")?.l;
  if (topLetter) {
    const u = LAB_QURAN.find((x) => surahHas(x, topLetter) > 0);
    hits.push(
      { kind: "activity", title: `Write ${topLetter.name}`, sub: "Alone, start, middle and end", href: `#/write?l=${topLetter.id}&forms=alone,start,middle,end&layout=forms`, icon: "✎" },
      { kind: "surah", title: `Find ${topLetter.name} in ${u.name}`, sub: "Spot it in a surah you know", href: `#/quran/${u.id}?l=${topLetter.id}` },
      { kind: "tool", title: `Hunt for ${topLetter.name}`, sub: "Hijaiyya Hunt worksheet (prototype)", href: TOOLS.hunt.url(topLetter) },
    );
  }
  el.innerHTML = hits.length ? hits.map((h) => {
    const ext = h.kind === "tool";
    const ic = h.kind === "letter" ? `<span class="ic ar">${h.l.ar}</span>` : `<span class="ic">${h.icon || { region: "◉", surah: "۞", activity: "★", tool: "↗" }[h.kind]}</span>`;
    return `<a class="result${ext ? " ext" : ""}" href="${h.href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${ic}<div><b>${esc(h.title)}</b><span>${esc(h.sub)}</span></div></a>`;
  }).join("") : `<p class="muted">Nothing found. Try a letter name like “jim”, a part of the mouth like “lips”, or a surah like “Ikhlas”.</p>`;
}

// =====================================================================================
// One letter, four steps
// =====================================================================================
function refreshSteps(id) {
  $$(".step").forEach((b) => b.classList.toggle("done", !!progress[id]?.[b.dataset.step]));
}
function viewLetter(id, stepId, q) {
  const l = BY_ID[id]; if (!l) return viewHome();
  const step = I4.find((s) => s.id === stepId) || I4[0];
  const i = LETTERS.indexOf(l), prev = LETTERS[(i + 28) % 29], next = LETTERS[(i + 1) % 29];
  const sp = SPOTS[l.spot], region = regionOf(l);
  app.innerHTML = `<div class="lhead"><button class="bigl" data-listen="${l.id}" aria-label="Hear ${esc(l.name)}"><img src="${artLetter(l, "alone", "solid")}" alt="" width="512" height="512"></button><div class="meta"><h1>${esc(l.name)}</h1>
      <div class="row"><span class="pill" style="background:${region.colour}33;color:var(--plum)">${esc(region.name)} · ${esc(region.ms)}</span>${l.heavy ? `<span class="pill" style="background:#f3e6ff;color:var(--primary)">Heavy letter</span>` : ""}<span class="pill draft">Draft</span></div></div>
      <div class="nav"><a class="btn ghost" href="#/letter/${next.id}/${step.id}" aria-label="Next letter: ${esc(next.name)}"><span aria-hidden="true">←</span><span class="navl">${letterSVG(next.ar, 160)}</span></a><a class="btn ghost" href="#/letter/${prev.id}/${step.id}" aria-label="Previous letter: ${esc(prev.name)}"><span class="navl">${letterSVG(prev.ar, 160)}</span><span aria-hidden="true">→</span></a><a class="btn" href="#/print/letter/${l.id}">Print</a></div></div>
    <nav class="steps" aria-label="4-I steps">${I4.map((s, k) => `<a class="step${progress[id]?.[s.id] ? " done" : ""}" data-step="${s.id}" href="#/letter/${id}/${s.id}" style="--c:${s.c};--oc:${s.oc}"${s.id === step.id ? ' aria-current="step"' : ""}><i><span>${k + 1}</span></i><div><b>${s.name}</b><span>${s.sub}</span></div></a>`).join("")}</nav>
    <div id="stepbody"></div>`;
  const body = $("#stepbody");
  wireListen($(".lhead"));
  ({ inspire: stepInspire, investigate: stepInvestigate, integrate: stepIntegrate, impart: stepImpart })[step.id](body, l, q);
  const nextStep = I4[I4.indexOf(step) + 1];
  body.insertAdjacentHTML("beforeend", `<div class="row" style="justify-content:flex-end;margin-top:16px">${nextStep ? `<a class="btn main" href="#/letter/${id}/${nextStep.id}">Next: ${nextStep.name} →</a>` : `<a class="btn main" href="#/letter/${next.id}">Next letter: ${esc(next.name)} →</a>`}</div>`);
}

function audioButton(l) {
  return `<button class="btn" data-listen="${l.id}">🔊 Listen</button><span class="small muted" data-listen-note></span>`;
}
function wireListen(el) {
  $$("[data-listen]", el).forEach((b) => b.onclick = () => {
    const a = new Audio(`audio/${b.dataset.listen}.mp3`);
    a.play().catch(() => { const n = b.nextElementSibling; if (n && n.hasAttribute("data-listen-note")) n.textContent = "Audio is coming soon. Ask a grown-up or your teacher to say it for you."; });
  });
}

function stepInspire(el, l, q) {
  const guess = P(l.id).guess;
  el.innerHTML = `<div class="grid2">
    <div class="card"><h2 style="margin-top:0">Meet ${esc(l.name)}</h2>
      <div class="forms">${formsOf(l).map((f) => `<div class="form">${alignedLetter(l, f.id)}<small>${f.name}</small></div>`).join("")}</div>
      <p class="small muted">${l.joins ? `${esc(l.name)} changes shape when it holds hands with other letters.` : l.noForms ? "Hamzah sits alone, or rides on another letter." : `${esc(l.name)} only holds hands with the letter before it, so it has two shapes.`}</p>
      <div class="say">${sayLine(l)}</div>
      <div class="row">${audioButton(l)}</div>
    </div>
    <div class="card"><h2 style="margin-top:0">I wonder…</h2><p>Where do you think <b>${esc(l.name)}</b> comes from? Say it slowly and guess.</p>
      <div class="choices" id="guess">${REGIONS.filter((r) => r.id !== "nose").map((r) => `<button class="chip" data-r="${r.id}" aria-pressed="${guess === r.id}">${r.name}</button>`).join("")}</div>
      <p class="feedback" id="gfb">${guess ? `You guessed <b>${esc(REGIONS.find((r) => r.id === guess).name)}</b>. Find out in Investigate!` : ""}</p>
      <img src="img/wondering-md.webp" alt="" width="110" height="110" style="width:110px;height:110px;object-fit:contain">
    </div></div>
    <h2>Spot it in a surah you know</h2><div id="spotit"></div>`;
  wireListen(el);
  let spotted = false;
  const maybeDone = () => { if (P(l.id).guess && spotted) markStep(l.id, "inspire"); };
  $$("#guess .chip", el).forEach((b) => b.onclick = () => {
    $$("#guess .chip", el).forEach((x) => x.setAttribute("aria-pressed", x === b));
    P(l.id).guess = b.dataset.r; store.set("progress", progress);
    $("#gfb", el).innerHTML = `You guessed <b>${esc(REGIONS.find((r) => r.id === b.dataset.r).name)}</b>. Find out in Investigate!`;
    maybeDone();
  });
  spotIt($("#spotit", el), l, q.get("s"), () => { spotted = true; maybeDone(); });
}

function stepInvestigate(el, l) {
  const sp = SPOTS[l.spot];
  const pt = (id) => SPOT_POINTS[id] || [0, 0];
  // Five dots on the side view: the right one, then one from each other part of the mouth, spread out
  const seed = [...l.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const others = Object.keys(SPOTS).filter((k) => k !== l.spot && k !== "nose" && SPOT_POINTS[k]).sort((a, b) => ((pt(a)[0] * 7 + pt(a)[1] + seed * 13) % 97) - ((pt(b)[0] * 7 + pt(b)[1] + seed * 13) % 97));
  const cands = [{ id: l.spot, x: pt(l.spot)[0], y: pt(l.spot)[1], r: sp.region }];
  const fits = (k) => cands.every((c) => Math.hypot(c.x - pt(k)[0], c.y - pt(k)[1]) > 62);
  for (const k of others) if (cands.length < 5 && !cands.some((c) => c.r === SPOTS[k].region) && fits(k)) cands.push({ id: k, x: pt(k)[0], y: pt(k)[1], r: SPOTS[k].region });
  for (const k of others) if (cands.length < 5 && fits(k)) cands.push({ id: k, x: pt(k)[0], y: pt(k)[1], r: SPOTS[k].region });
  cands.sort((a, b) => a.x - b.x).forEach((c, i) => (c.label = `Spot ${i + 1}`));
  const found = !!P(l.id).investigate;
  el.innerHTML = `<div class="grid2">
    <div class="card"><h2 style="margin-top:0">Find the sound spot</h2><p>Say <span class="ar" style="font-size:26px">${sayLine(l)}</span> slowly. Which dot shows where <b>${esc(l.name)}</b> comes from?</p>
      <div class="mouthwrap" id="find"><div class="mbox"></div>${found ? "" : dotsOverlay(cands)}</div>
      <p class="feedback" id="ffb" aria-live="polite"></p><p class="note" style="margin:0">Pictures are a DRAFT for asatizah review.</p></div>
    <div class="card" id="reveal">${found ? "" : `<p class="muted">Tap a dot on the picture. Then you'll see the tongue move, and you can try it in your own mouth.</p><img src="img/thinking-questions-md.webp" alt="" width="120" height="120" style="width:120px;height:120px;object-fit:contain">`}</div></div>`;
  const box = $("#find .mbox", el);
  mountMouth(box, found ? `${l.spot}-side` : "neutral-side");
  const reveal = () => {
    const views = mouthViews(l);
    const best = (views.find((v) => v.id === sp.view) || views[0]).id;
    const draw = (v) => { const view = views.find((x) => x.id === v); return mouthImg(view.art, { alt: `${sp.name}, ${view.name.toLowerCase()} view` }); };
    const stop = stopTest(l);
    $("#reveal", el).innerHTML = `<h2 style="margin-top:0">${esc(sp.name)}</h2>
      <div class="views" role="tablist">${views.map((v) => `<button class="chip" data-v="${v.id}" aria-pressed="${v.id === best}">${v.name}</button>`).join("")}</div>
      <div class="diagram viewbox" id="view">${draw(best)}</div>
      ${l.spot === "sides" ? `<div class="row small" id="sides"><b>Which side?</b> ${[["left", "sides-left-top"], ["right", "sides-right-top"], ["both", "sides-top"]].map(([s2, art]) => `<button class="chip" data-s="${art}" aria-pressed="${s2 === "both"}">${s2[0].toUpperCase() + s2.slice(1)}</button>`).join("")}</div>` : ""}
      <p><b>${esc(l.how || sp.where)}</b></p>
      ${l.heavy ? `<p class="small">${esc(l.name)} is a heavy letter: the back of the tongue lifts too, so the mouth feels full. See the “Heavy letter” view.</p>` : ""}
      ${stop ? `<p class="small">Stop test: say <span class="ar" style="font-size:28px">${stop}</span> and hold the end. Where does your tongue stop?</p>` : ""}
      <label class="check feel">${feelImg(feelFor(l.spot, l))}<input type="checkbox" id="felt"${P(l.id).felt ? " checked" : ""}><span><b>Feel it:</b> ${arab(sp.feel)}${l.nose && l.spot !== "nun" ? " Then gently hold your nose: the hum stops!" : ""}</span></label>
      <div class="row"><button class="btn" id="mirror">🪞 Use a mirror</button>${audioButton(l)}</div><div id="mirrorbox"></div>
      ${l.also ? `<p class="small muted">${esc(l.name)} has two homes. As a long vowel it flows from the empty space, like Alif.</p>` : ""}`;
    wireListen(el);
    $$("[data-v]", el).forEach((b) => b.onclick = () => { $$("[data-v]", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); $("#view", el).innerHTML = draw(b.dataset.v); });
    $$("[data-s]", el).forEach((b) => b.onclick = () => { $$("[data-s]", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); $("#view", el).innerHTML = mouthImg(b.dataset.s, { alt: "Looking down at the tongue" }); });
    $("#felt", el).onchange = (e) => { P(l.id).felt = e.target.checked; store.set("progress", progress); if (e.target.checked) markStep(l.id, "investigate"); };
    $("#mirror", el).onclick = () => openMirror($("#mirrorbox", el));
  };
  if (found) reveal();
  $$("#find .cand", el).forEach((g) => {
    const pick = () => {
      if (g.dataset.spot === l.spot) {
        $("#ffb", el).className = "feedback good"; $("#ffb", el).textContent = `Yes! ${l.name} comes from here: ${SPOTS[l.spot].short.toLowerCase()}.`;
        $(".mouthdots", el)?.remove();
        mountMouth(box, `${l.spot}-side`, { play: true });
        const g0 = P(l.id).guess;
        if (g0) $("#ffb", el).textContent += g0 === sp.region ? " Your guess was right!" : ` You guessed ${REGIONS.find((r) => r.id === g0).name.toLowerCase()}: now you know!`;
        reveal();
      } else {
        g.classList.add("wrong");
        const there = LETTERS.filter((x) => x.spot === g.dataset.spot).map((x) => x.ar).join(" ");
        $("#ffb", el).className = "feedback bad"; $("#ffb", el).innerHTML = `Not quite. That's where <span class="ar" style="font-size:22px">${there || "the hum"}</span> come${there.length > 1 ? "" : "s"} from. Try again!`;
      }
    };
    g.onclick = pick; g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } };
  });
}

function openMirror(box) {
  if (box.querySelector("video")) { box.innerHTML = ""; return; }
  if (!navigator.mediaDevices?.getUserMedia) { box.innerHTML = `<p class="note">This device has no camera we can use. A hand mirror works just as well!</p>`; return; }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false }).then((stream) => {
    box.innerHTML = `<video class="mirror" autoplay playsinline muted></video><p class="note">The picture stays on this device. Nothing is recorded.</p>`;
    $("video", box).srcObject = stream;
    onLeave(() => stream.getTracks().forEach((t) => t.stop()));
  }).catch(() => { box.innerHTML = `<p class="note">The camera wasn't allowed. A hand mirror works just as well!</p>`; });
}

function stepIntegrate(el, l) {
  const forms = formsOf(l);
  el.innerHTML = `<div class="grid2">
    <div class="card"><h2 style="margin-top:0">Write ${esc(l.name)}</h2>
      <div class="row" id="formchips">${forms.map((f, k) => `<button class="chip" data-f="${f.id}" aria-pressed="${k === 0}">${f.name}</button>`).join("")}</div>
      <div class="row" id="levelchips" style="margin-top:6px">${LEVELS.map((v, k) => `<button class="chip" data-v="${v.id}" aria-pressed="${k === 0}">${v.name}</button>`).join("")}</div>
      <div id="tbox" style="max-width:460px;margin:12px auto 0"></div>
      <p class="small muted">Get 2 stars to finish this step. Then try with less help!</p></div>
    <div class="card"><h2 style="margin-top:0">Sound neighbours</h2><p class="small">Some letters live close together. Do they come from the same sound spot?</p><div id="nb"></div></div></div>`;
  let form = forms[0].id, level = "arrows";
  const mount = () => { const b = $("#tbox", el); b.innerHTML = ""; b.appendChild(traceCard(l, form, level, { onStars: (s) => { if (s >= 2) { P(l.id).wrote = true; store.set("progress", progress); done(); } } })); };
  $$("#formchips .chip", el).forEach((b) => b.onclick = () => { $$("#formchips .chip", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); form = b.dataset.f; mount(); });
  $$("#levelchips .chip", el).forEach((b) => b.onclick = () => { $$("#levelchips .chip", el).forEach((x) => x.setAttribute("aria-pressed", x === b)); level = b.dataset.v; mount(); });
  mount();
  // Sound neighbours: same spot or a different one?
  const answers = P(l.id).nb || {};
  const done = () => { if (P(l.id).wrote && l.near.every((n) => answers[n])) markStep(l.id, "integrate"); };
  $("#nb", el).innerHTML = l.near.map((nid) => {
    const n = BY_ID[nid];
    return `<div class="card" style="margin-bottom:10px;background:var(--paper)" data-n="${nid}"><div class="nbpair"><span class="nbl">${letterSVG(l.ar, 160)}</span><span>and</span><span class="nbl">${letterSVG(n.ar, 160)}</span></div>
      <div class="choices"><button class="chip" data-ans="same">Same spot</button><button class="chip" data-ans="diff">Different spots</button></div><div class="nbr"></div></div>`;
  }).join("");
  const explain = (a, b) => {
    const same = a.spot === b.spot;
    const heavy = !!a.heavy !== !!b.heavy ? ` ${(a.heavy ? a : b).name} is a heavy letter: the back of your tongue lifts and your mouth feels full.` : "";
    const hows = same && (a.how || b.how) && a.how !== b.how ? ` ${a.name}: ${(a.how || SPOTS[a.spot].where).split(".")[0]}. ${b.name}: ${(b.how || SPOTS[b.spot].where).split(".")[0]}.` : "";
    const deeper = !same ? ` ${SPOTS[a.spot].depth < SPOTS[b.spot].depth ? a.name : b.name} comes from deeper inside.` : "";
    return (same ? `Same spot: ${SPOTS[a.spot].short.toLowerCase()}.` : `Different! ${a.name}: ${SPOTS[a.spot].short.toLowerCase()}. ${b.name}: ${SPOTS[b.spot].short.toLowerCase()}.`) + deeper + heavy + hows;
  };
  const show = (box, nid, ans) => {
    const n = BY_ID[nid], same = l.spot === n.spot, right = (ans === "same") === same;
    $(".nbr", box).innerHTML = `<p class="feedback ${right ? "good" : "bad"}">${right ? "Yes! " : "Look again. "}${esc(explain(l, n))}</p>
      <div class="nbviews"><figure>${sideFor(l.spot)}<figcaption><span class="nbl">${letterSVG(l.ar, 160)}</span></figcaption></figure><figure>${sideFor(n.spot)}<figcaption><span class="nbl">${letterSVG(n.ar, 160)}</span></figcaption></figure></div>`;
    $$("[data-ans]", box).forEach((x) => x.setAttribute("aria-pressed", x.dataset.ans === ans));
  };
  $$("#nb [data-n]", el).forEach((box) => {
    const nid = box.dataset.n;
    if (answers[nid]) show(box, nid, answers[nid]);
    $$("[data-ans]", box).forEach((b) => b.onclick = () => { answers[nid] = b.dataset.ans; P(l.id).nb = answers; store.set("progress", progress); show(box, nid, b.dataset.ans); done(); });
  });
}

function stepImpart(el, l) {
  const stop = stopTest(l);
  el.innerHTML = `<div class="grid2">
    <div class="card"><h2 style="margin-top:0">Say it</h2>
      <p>Record yourself saying:</p><div class="say">${sayLine(l)}${stop ? ` &nbsp; ${stop}` : ""}</div>
      <div class="rec"><button class="btn sun" id="recbtn">● Record</button><span id="recs" class="rec"></span></div>
      <p class="note">Recordings stay on this device and disappear when you leave this page.</p>
      <p class="small">Listen back. Is the sound coming from the right spot? Try again until you're happy.</p></div>
    <div class="card"><h2 style="margin-top:0">Teach it</h2>
      <label class="check"><input type="checkbox" class="tk"><span>Show someone where <b>${esc(l.name)}</b> comes from, on your own face.</span></label>
      <label class="check"><input type="checkbox" class="tk"><span>Teach them to write it. Watch them follow the arrows.</span></label>
      <label class="check"><input type="checkbox" class="tk"><span>Find <b>${esc(l.name)}</b> together in the mushaf at home.</span></label>
      <div class="card" style="background:var(--primary-soft);border:0;margin-top:10px"><b>Grown-up:</b> did you hear a clear <b>${esc(l.name)}</b> from the right spot?
        <div class="row" style="margin-top:8px"><button class="btn main" id="give">${isEarned(l.id) ? "Sticker given ✓" : "Yes, give the sticker"}</button></div>
        <p class="note" style="margin-bottom:0">Gives the sticker when all four steps are done. ${I4.filter((s) => s.id !== "impart" && !progress[l.id]?.[s.id]).map((s) => s.name).join(", ") ? `Still to do: ${I4.filter((s) => s.id !== "impart" && !progress[l.id]?.[s.id]).map((s) => s.name).join(", ")}.` : ""}</p></div>
    </div></div>`;
  $("#give", el).onclick = () => markStep(l.id, "impart");
  // Record and listen back (kept in memory only)
  let rec = null, chunks = [], stream = null;
  const stopAll = () => { try { rec?.state === "recording" && rec.stop(); } catch { /* already stopped */ } stream?.getTracks().forEach((t) => t.stop()); };
  onLeave(stopAll);
  $("#recbtn", el).onclick = async () => {
    const b = $("#recbtn", el);
    if (rec?.state === "recording") { rec.stop(); return; }
    if (!window.MediaRecorder || !navigator.mediaDevices?.getUserMedia) { b.disabled = true; b.textContent = "Recording isn't available here"; return; }
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch { b.textContent = "Microphone not allowed"; return; }
    rec = new MediaRecorder(stream); chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
      const box = $("#recs", el);
      box.insertAdjacentHTML("afterbegin", `<audio controls src="${url}"></audio>`);
      $$("audio", box).slice(3).forEach((a) => a.remove());
      b.textContent = "● Record again"; b.classList.add("sun");
    };
    rec.start(); b.textContent = "■ Stop"; b.classList.remove("sun");
  };
}

// =====================================================================================
// Write with Saurus (tracing practice with settings)
// =====================================================================================
const LAYOUTS = [
  { id: "big", name: "One big letter" },
  { id: "row", name: "Practice row (less help each time)" },
  { id: "forms", name: "All its shapes" },
  { id: "grid", name: "Many letters" },
];
function writeSettings(q) {
  const s = { letters: ["ba"], forms: ["alone"], layout: "big", level: "arrows", ...store.get("write", {}) };
  if (q.get("l")) s.letters = q.get("l").split(",").filter((x) => BY_ID[x]);
  if (q.get("forms")) s.forms = q.get("forms").split(",");
  if (q.get("layout")) s.layout = q.get("layout");
  if (q.get("level")) s.level = q.get("level");
  if (q.get("pen")) store.set("pen", { ...penPrefs(), pen: q.get("pen") });
  return s;
}
const writeItems = (s) => s.letters.map((id) => BY_ID[id]).flatMap((l) => formsOf(l).filter((f) => s.forms.includes(f.id)).map((f) => ({ l, form: f.id })));

function viewWrite(q) {
  const s = writeSettings(q);
  let idx = 0;
  const save = () => store.set("write", s);
  const open = innerWidth > 900 ? " open" : "";
  app.innerHTML = `<div class="hero" style="margin-bottom:12px"><img class="mascot" src="img/pointing-md.webp" alt="" width="96" height="96"><div><h1>Write with Saurus</h1>
    <p>Start at the red dot and follow the arrows. Use a finger, a stylus or a mouse. Press <b>Check</b> to get your stars, then try with less help.</p></div></div>
    <div class="write"><aside class="card settings" aria-label="Settings">
      <details${open}><summary>Letters</summary><div class="lpick" id="lpick">${LETTERS.map((l) => `<button data-id="${l.id}" aria-pressed="${s.letters.includes(l.id)}" aria-label="${esc(l.name)}">${letterSVG(l.ar, 200)}</button>`).join("")}</div>
        <div class="opts"><button class="chip" data-set="all">All 29</button><button class="chip" data-set="none">Clear</button>${STATIONS.slice(0, 7).map((st) => `<button class="chip" data-set="st:${st.id}">${st.name.replace("The empty space", "Empty space")}</button>`).join("")}</div></details>
      <details${open}><summary>Shapes</summary><div class="opts" id="fpick">${FORMS.map((f) => `<button class="chip" data-f="${f.id}" aria-pressed="${s.forms.includes(f.id)}">${f.name} <span class="ar" style="font-size:18px">${f.make("ب")}</span></button>`).join("")}</div>
        <p class="note">Letters that don't join forwards (ا د ذ ر ز و) only have Alone and End.</p></details>
      <details${open}><summary>Layout</summary><div class="opts" id="layp">${LAYOUTS.map((x) => `<button class="chip" data-x="${x.id}" aria-pressed="${s.layout === x.id}">${x.name}</button>`).join("")}</div></details>
      <details${open}><summary>Help</summary><div class="opts" id="levp">${LEVELS.map((x) => `<button class="chip" data-x="${x.id}" aria-pressed="${s.level === x.id}">${x.name}</button>`).join("")}</div></details>
      <details${open}><summary>My pencil</summary><div class="opts" id="penp">${PENS.map((x) => `<button class="chip" data-x="${x.id}" aria-pressed="${penPrefs().pen === x.id}">${x.name}</button>`).join("")}</div>
        <div class="swatches" id="colp" style="margin-top:8px">${COLOURS.map((c) => `<button data-c="${c}" style="background:${c}" aria-label="Colour" aria-pressed="${penPrefs().colour === c}"></button>`).join("")}</div>
        <div class="opts" id="widp">${Object.keys(WIDTHS).map((w) => `<button class="chip" data-x="${w}" aria-pressed="${penPrefs().width === w}">${w[0].toUpperCase() + w.slice(1)}</button>`).join("")}</div></details>
      <details${open}><summary>Paper</summary><div class="opts" id="papp">${PAPERS.map((x) => `<button class="chip" data-x="${x.id}" aria-pressed="${penPrefs().paper === x.id}">${x.name}</button>`).join("")}</div></details>
      <details${open}><summary>Print</summary><p class="note" style="margin-top:6px">Prints what you chose here, in black and white or colour.</p><a class="btn main" id="printlink" href="#/print/write">Print these</a></details>
    </aside><div><div class="row" id="pager" style="justify-content:space-between;margin-bottom:10px"></div><div id="pbox"></div></div></div>`;

  const items = () => writeItems(s);
  const render = () => {
    save();
    const it = items(), pbox = $("#pbox"), pager = $("#pager");
    $("#printlink").href = `#/print/write?l=${s.letters.join(",")}&forms=${s.forms.join(",")}&layout=${s.layout}&level=${s.level}`;
    if (!it.length) { pager.innerHTML = ""; pbox.innerHTML = `<p class="card">Pick at least one letter and one shape.</p>`; return; }
    idx = Math.min(idx, it.length - 1);
    pbox.innerHTML = "";
    const cur = it[idx];
    const pageable = s.layout !== "grid";
    const unit = s.layout === "forms" ? [...new Set(it.map((x) => x.l))] : it;
    if (s.layout === "forms") idx = Math.min(idx, unit.length - 1);
    pager.innerHTML = pageable ? `<button class="btn ghost" id="prev">‹ Back</button><span class="muted">${idx + 1} of ${unit.length}: <b>${esc(s.layout === "forms" ? unit[idx].name : `${cur.l.name}, ${FORMS.find((f) => f.id === cur.form).name.toLowerCase()}`)}</b></span><button class="btn main" id="next">Next ›</button>` : `<span class="muted">${it.length} to practise</span>`;
    if (pageable) { $("#prev").onclick = () => { idx = (idx - 1 + unit.length) % unit.length; render(); }; $("#next").onclick = () => { idx = (idx + 1) % unit.length; render(); }; }
    let grid;
    if (s.layout === "big") { grid = document.createElement("div"); grid.className = "practice"; grid.style.maxWidth = "560px"; grid.style.margin = "0 auto"; grid.appendChild(traceCard(cur.l, cur.form, s.level)); }
    if (s.layout === "row") { grid = document.createElement("div"); grid.className = "practice cols4"; for (const lv of LEVELS) grid.appendChild(traceCard(cur.l, cur.form, lv.id)); }
    if (s.layout === "forms") { const l = unit[idx]; grid = document.createElement("div"); grid.className = "practice cols4"; for (const f of formsOf(l)) grid.appendChild(traceCard(l, f.id, s.level)); }
    if (s.layout === "grid") { grid = document.createElement("div"); grid.className = "practice cols2"; for (const x of it.slice(0, 12)) grid.appendChild(traceCard(x.l, x.form, s.level)); if (it.length > 12) pbox.insertAdjacentHTML("beforeend", `<p class="note">Showing the first 12. Print to get them all.</p>`); }
    pbox.prepend(grid);
  };
  const toggle = (arr, v) => (arr.includes(v) ? arr.splice(arr.indexOf(v), 1) : arr.push(v));
  $("#lpick").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; toggle(s.letters, b.dataset.id); b.setAttribute("aria-pressed", s.letters.includes(b.dataset.id)); idx = 0; render(); };
  $$("[data-set]").forEach((b) => b.onclick = () => {
    const v = b.dataset.set;
    s.letters = v === "all" ? LETTERS.map((l) => l.id) : v === "none" ? [] : lettersAt(STATIONS.find((x) => x.id === v.slice(3))).map((l) => l.id);
    $$("#lpick button").forEach((x) => x.setAttribute("aria-pressed", s.letters.includes(x.dataset.id))); idx = 0; render();
  });
  $("#fpick").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; toggle(s.forms, b.dataset.f); b.setAttribute("aria-pressed", s.forms.includes(b.dataset.f)); idx = 0; render(); };
  const single = (sel, fn) => { $(sel).onclick = (e) => { const b = e.target.closest("button"); if (!b) return; $$(`${sel} button`).forEach((x) => x.setAttribute("aria-pressed", x === b)); fn(b); render(); }; };
  single("#layp", (b) => { s.layout = b.dataset.x; idx = 0; });
  single("#levp", (b) => (s.level = b.dataset.x));
  single("#penp", (b) => store.set("pen", { ...penPrefs(), pen: b.dataset.x }));
  single("#colp", (b) => store.set("pen", { ...penPrefs(), colour: b.dataset.c }));
  single("#widp", (b) => store.set("pen", { ...penPrefs(), width: b.dataset.x }));
  single("#papp", (b) => store.set("pen", { ...penPrefs(), paper: b.dataset.x }));
  render();
}

// =====================================================================================
// Sound Spots explorer
// =====================================================================================
function viewSpots(q) {
  const regionPick = q.get("r");
  const first = regionPick ? Object.keys(SPOTS).find((k) => SPOTS[k].region === regionPick) : "lips";
  const dots = Object.keys(SPOTS).filter((id) => SPOT_POINTS[id]).map((id) => ({ id, x: SPOT_POINTS[id][0], y: SPOT_POINTS[id][1], label: SPOTS[id].name }));
  const lettersOf = (id) => LETTERS.filter((l) => l.spot === id || (id === "space" && l.also === "space") || (id === "nose" && (l.id === "nun" || l.id === "mim")));
  // one button per spot, grouped by part of the mouth, in the order the makhraj is taught
  const groups = REGIONS.map((r) => ({ r, ids: Object.keys(SPOTS).filter((k) => SPOTS[k].region === r.id).sort((a, b2) => SPOTS[a].depth - SPOTS[b2].depth) }));
  app.innerHTML = `<div class="hero" style="margin-bottom:12px"><img class="mascot" src="img/thinking-questions-md.webp" alt="" width="96" height="96"><div><h1>Sound Spots</h1>
    <p>Every letter has a home in your mouth or throat where its sound comes out (its makhraj). Pick a spot and watch the tongue move there.</p></div></div>
    <div class="spotsgrid">
      <div class="card"><div class="mouthwrap" id="ex"><div class="mbox"></div>${dotsOverlay(dots, first)}</div>
        <div class="spotpick">${groups.map((g) => `<div class="sgroup"><b style="color:${g.r.colour}">${g.r.name}</b><div class="row">${g.ids.map((id) => `<button class="chip spotchip" data-spot="${id}" aria-pressed="false" aria-label="${esc(SPOTS[id].name)}">${inkStrip(lettersOf(id).map((l) => l.ar).join(" "))}<span>${esc(SPOTS[id].short.replace(/^Tongue: /, "").replace(/^./, (c) => c.toUpperCase()))}</span></button>`).join("")}</div></div>`).join("")}</div></div>
      <div class="card" id="exinfo" aria-live="polite"></div></div>
    <h2>All the letters, from deep inside to the lips</h2>
    <div class="map">${STATIONS.filter((st) => st.id !== "nose").map((st) => `<section class="station"><div class="mini">${sideFor(st.spots[0], { levels: false })}</div><div><h3>${st.name}</h3><div class="sub">${st.sub}</div><div class="stickers withnames">${lettersAt(st).map((l) => stickerHTML(l, true)).join("")}</div></div></section>`).join("")}</div>
    <p class="flag" style="margin-top:16px">DRAFT: the wording for children, and the dot positions, need an ustaz or ustazah to check them. Each spot is simplified so children can feel it. The full detail of the 17 makharij is for teachers.</p>`;
  const box = $("#ex .mbox");
  const show = (id) => {
    const s = SPOTS[id], ls = lettersOf(id);
    $$("#ex .cand").forEach((g) => { const on = g.dataset.spot === id; g.classList.toggle("sel", on); g.classList.toggle("dim", !on); $(".cdot", g).setAttribute("r", on ? 15 : 8); });
    $$(".spotchip").forEach((b) => b.setAttribute("aria-pressed", b.dataset.spot === id));
    mountMouth(box, `${id}-side`, { play: true });
    // the other drawn views of this spot (lips also show Waw's round lips)
    const extra = [...(id === "sides" ? ["sides-top", "sides-left-top", "sides-right-top"] : [`${id}-top`]), `${id}-front`, ...(id === "lips" ? ["waw-front"] : [])].filter(hasMouth);
    $("#exinfo").innerHTML = `<h2 style="margin-top:0">${esc(s.name)}</h2>
      ${extra.length ? `<div class="viewgrid">${extra.map((n) => `<figure>${mouthImg(n, { alt: n })}<figcaption>${n.includes("-top") ? (n.includes("left") ? "From above: left side" : n.includes("right") ? "From above: right side" : "Looking down at the tongue") : n === "waw-front" ? "Waw: round lips" : "Seen from the front"}</figcaption></figure>`).join("")}</div>` : ""}
      <p>${esc(s.where)}</p>
      <div class="stickers withnames" style="justify-content:flex-start;margin-bottom:26px">${ls.map((l) => stickerHTML(l, true)).join("")}</div>
      <label class="check feel" style="cursor:default">${feelImg(feelFor(id))}<span><b>Feel it:</b> ${arab(s.feel)}</span></label>
      <div class="row">${ls.map((l) => `<button class="btn" data-listen="${l.id}">🔊 ${esc(l.name)}</button>`).join("")}<span class="small muted" data-listen-note></span></div>
      <p class="note">Pictures are a DRAFT for asatizah review.</p>`;
    wireListen($("#exinfo"));
  };
  $$("#ex .cand").forEach((g) => { g.onclick = () => show(g.dataset.spot); g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(g.dataset.spot); } }; });
  $$(".spotchip").forEach((b) => (b.onclick = () => show(b.dataset.spot)));
  show(first);
}

// =====================================================================================
// Spot it in the Quran
// =====================================================================================
function viewQuran(id, q) {
  if (!id) {
    app.innerHTML = `<div class="hero" style="margin-bottom:12px"><img class="mascot" src="img/treasure-map-md.webp" alt="" width="96" height="96"><div><h1>Spot it in the Quran</h1>
      <p>Pick a surah you know. Then pick a letter and find it in every word. The surahs follow the order children usually learn them.</p></div></div>
      <div class="results">${LAB_QURAN.map((u) => `<a class="result" href="#/quran/${u.id}"><span class="ic">${u.number}</span><div><b>${esc(u.name)}</b><span>${esc(u.meaning || "")} · ${u.ayat.length} ayat</span></div></a>`).join("")}</div>`;
    return;
  }
  const u = LAB_QURAN.find((x) => x.id === id) || LAB_QURAN[0];
  const l = BY_ID[q.get("l")] || LETTERS.filter((x) => surahHas(u, x) > 0).sort((a, b) => surahHas(u, b) - surahHas(u, a))[0];
  app.innerHTML = `<h1>${esc(u.name)}</h1><p class="muted">Pick a letter. The number shows how many times it appears in this surah.</p>
    <div class="lpick" style="grid-template-columns:repeat(auto-fill,minmax(54px,1fr))">${LETTERS.map((x) => { const n = surahHas(u, x); return `<a class="btn ghost" style="flex-direction:column;gap:0;${x === l ? "background:var(--primary);color:#fff;border-color:var(--primary)" : ""}${n ? "" : "opacity:.35"}" href="#/quran/${u.id}?l=${x.id}"><span style="width:30px;height:30px;display:block">${letterSVG(x.ar, 150)}</span><small>${n}</small></a>`; }).join("")}</div>
    <h2>Find ${esc(l.name)}</h2><div id="spotit"></div>
    <div class="row" style="margin-top:12px"><a class="btn" href="#/letter/${l.id}">Learn ${esc(l.name)}: all four steps</a><a class="btn" href="#/write?l=${l.id}&forms=alone,start,middle,end&layout=forms">Write ${esc(l.name)}</a><a class="btn" href="${TOOLS.hafiz.url()}" target="_blank" rel="noopener">Memorise it in Mini Hafiz ↗</a></div>`;
  spotIt($("#spotit"), l, u.id);
}

// =====================================================================================
// Printables
// =====================================================================================
function sheetWrap(inner, { a5 = false, colour = false } = {}) {
  return `<div class="sheet${a5 ? " a5" : ""}${colour ? " colour" : ""}"><div class="sh">${inner}<div class="ft"><span>Hijaiyya Lab · IqraSaurus · prototype</span><span>© IqraSaurus</span></div></div></div>`;
}
// Paper uses the shared black-and-white line art (tools repo: packages/design/assets/lineart/poses), print size.
// Sizes from its manifest.json.
const LINEART = { writing: [1254, 1254], "treasure-map": [1197, 1314], trophy: [1337, 1176], "thinking-questions": [1229, 1280], cheering: [1217, 1293] };
const lineArt = (name, style = "") => `<img src="img/lineart/${name}-print.webp" alt="" width="${LINEART[name][0]}" height="${LINEART[name][1]}"${style ? ` style="${style}"` : ""}>`;
const sheetTop = (title, pose = "writing") => `<div class="top">${lineArt(pose)}<h2>${title}</h2><div class="name">Name <span></span> Date <span style="width:12cqw"></span></div></div>`;

// A short passage that really contains the letter: start at the first ayah that has it, add whole ayat up to about 18 words
function passageFor(l) {
  const u = LAB_QURAN.find((x) => surahHas(x, l) >= 2) || LAB_QURAN.find((x) => surahHas(x, l) > 0) || LAB_QURAN[0];
  const i0 = Math.max(0, u.ayat.findIndex((a) => countIn(a.text, l) > 0));
  const ay = []; let words = 0;
  for (const a of u.ayat.slice(i0)) { if (ay.length && words + a.words.length > 18) break; ay.push(a); words += a.words.length; }
  const n = ay.reduce((k, a) => k + countIn(a.text, l), 0);
  const whole = ay.length === u.ayat.length;
  const where = whole ? "" : ay.length === 1 ? `, ayah ${ay[0].n}` : `, ayat ${ay[0].n} to ${ay[ay.length - 1].n}`;
  return { u, ay, words, n, where };
}

function printLetter(l, opt) {
  const sp = SPOTS[l.spot], bw = !opt.colour;
  const { u, ay, words, where } = passageFor(l);
  const cells = ["arrows", "outline", "faint", "faint", "own"].map((lv) => printTraceCell(l, "alone", lv, bw)).join("");
  return sheetWrap(`${sheetTop(`My letter: <span class="ar" style="font-size:6cqw">${l.ar}</span> ${esc(l.name)}`)}
    <div class="box"><span class="tag4 inspire">Inspire · Spot it</span><p style="margin:1cqw 0 0">Circle every <b class="ar" style="font-size:3.4cqw">${l.ar}</b> in Surah ${esc(u.name)}${where}. How many? <span style="display:inline-block;width:8cqw;border-bottom:.25cqw dashed #1b1b1b"></span></p>
      <div class="q" style="font-size:${words > 14 ? 3.1 : 3.6}cqw;line-height:2">${ay.map((a) => `${esc(a.text)} ﴿${a.n.toLocaleString("ar-EG")}﴾`).join(" ")}</div></div>
    <div class="box" style="display:grid;grid-template-columns:19cqw 1fr;gap:2cqw;align-items:center"><span class="tag4 investigate">Investigate · Sound spot</span>
      ${mouthImg("neutral-side", { kind: "full", bw, alt: "Mouth and throat" })}
      <div><p style="margin:0 0 1cqw"><b>Draw a dot</b> where <span class="ar" style="font-size:3.4cqw">${l.ar}</span> comes from.</p>
        <div class="tick" style="margin:1cqw 0"><i></i>I said <span class="ar" style="font-size:3.6cqw">${sayLine(l)}</span></div>
        <div class="tick">${feelImg(feelFor(l.spot, l), bw)}<i></i><span>${arab(sp.feel)}</span></div></div></div>
    <div class="box"><span class="tag4 integrate">Integrate · Write it</span><p style="margin:1cqw 0">Start at the dot. Less help each time.</p>
      <div class="trow">${cells}</div>
      ${formsOf(l).length > 1 ? `<img class="pstrip" src="${artStrip(l, "outline", bw)}" alt="" width="1200" height="352">` : ""}</div>
    <div class="box" style="display:flex;gap:2.4cqw;align-items:center"><span class="tag4 impart">Impart · Say it and teach it</span>
      <div style="flex:1;display:grid;gap:1cqw;margin-top:1cqw"><div class="tick"><i></i>I taught someone where <span class="ar" style="font-size:3.4cqw">${l.ar}</span> comes from.</div><div class="tick"><i></i>I taught someone how to write it.</div><div class="tick"><i></i>Grown-up heard a clear ${esc(l.name)}: <span style="display:inline-block;width:16cqw;border-bottom:.25cqw dashed #1b1b1b"></span></div></div>
      ${lineArt("cheering", "width:11cqw;height:auto;flex:none")}<div class="stk">Stick your<br>${esc(l.name)}<br>sticker here</div></div>`, opt);
}

function printWrite(q, opt) {
  const s = writeSettings(q), it = writeItems(s), bw = !opt.colour;
  if (!it.length) return `<p class="card">Pick letters and shapes in Write first.</p>`;
  if (s.layout === "big") return it.map((x) => sheetWrap(`${sheetTop(`Write <span class="ar" style="font-size:6cqw">${formText(x.l, x.form)}</span> ${esc(x.l.name)} · ${FORMS.find((f) => f.id === x.form).name}`)}
      <div class="big1" style="flex:1;display:grid;place-items:center"><div style="width:84%">${printTraceCell(x.l, x.form, s.level, bw)}</div></div>`, opt)).join("");
  const per = opt.a5 ? 4 : 5, pages = [];
  for (let i = 0; i < it.length; i += per) pages.push(it.slice(i, i + per));
  return pages.map((pg, k) => sheetWrap(`${sheetTop("Write with Saurus", "writing")}<p style="margin:0">Start at the dot. Each box gives a little less help. ${k === 0 ? "" : `(page ${k + 1})`}</p>
    ${pg.map((x) => `<div><b>${esc(x.l.name)}</b> <span class="muted">${FORMS.find((f) => f.id === x.form).name}</span><div class="trow">${["arrows", "outline", "faint", "faint", "own"].map((lv) => printTraceCell(x.l, x.form, lv, bw)).join("")}</div></div>`).join("")}`, opt)).join("");
}

function printMap(opt) {
  return sheetWrap(`${sheetTop("My Hijaiyya sticker map", "treasure-map")}<p style="margin:0">Each time you finish a letter, stick or colour its sticker. Start deep inside and travel out to the lips.</p>
    <div class="mapgrid">${STATIONS.map((st) => `<div class="mapst${["throat", "tip"].includes(st.id) ? " wide" : ""}"><div>${sideFor(st.spots[0], { bw: !opt.colour })}</div><div><h3>${st.name}</h3>
      <div class="circles">${(st.id === "nose" ? [{ ar: "ن م" }] : lettersAt(st)).map((l) => `<span class="circ">${letterSVG(l.ar, l.ar.length > 1 ? 150 : 260)}</span>`).join("")}</div></div></div>`).join("")}</div>`, opt);
}
function printStickers(opt) {
  return sheetWrap(`${sheetTop("Hijaiyya stickers", "trophy")}<p style="margin:0">Cut them out, or print on round sticker labels. Give one when a letter's four steps are done.</p>
    <div class="stsheet">${LETTERS.map((l) => `<div class="st"><span class="sg">${letterSVG(l.ar, 150)}</span><small>${esc(l.name)} ★</small></div>`).join("")}<div class="st"><span class="sg">${letterSVG("ن م", 150)}</span><small>Hum bonus ★</small></div></div>`, opt);
}
function printChart(opt) {
  const bw = !opt.colour;
  const cells = Object.keys(SPOTS).map((id) => {
    const ls = LETTERS.filter((l) => l.spot === id || (id === "space" && l.also === "space") || (id === "nose" && ["nun", "mim"].includes(l.id)));
    return `<figure class="cc">${mouthImg(`${id}-side`, { kind: "mini", bw, alt: SPOTS[id].name })}<figcaption><b class="ar">${ls.map((l) => l.ar).join(" ")}</b><span>${esc(SPOTS[id].short)}</span></figcaption></figure>`;
  });
  cells.push(`<figure class="cc">${mouthImg("edges-top", { bw, alt: "Lam from above" })}<figcaption><b class="ar">ل</b><span>Lam from above</span></figcaption></figure>`,
    `<figure class="cc">${mouthImg("sides-top", { bw, alt: "Dhōd from above" })}<figcaption><b class="ar">ض</b><span>Dhōd from above</span></figcaption></figure>`);
  return sheetWrap(`${sheetTop("Where do the letters come from?", "thinking-questions")}
    <p style="margin:0">From deep in the throat to the lips. Each picture shows one sound spot (makhraj).</p>
    <div class="chartgrid">${cells.join("")}</div>
    <p style="margin:0;color:#8a8a8a">DRAFT for asatizah review. Pictures are simplified so children can feel each spot.</p>`, opt);
}

function viewPrint(kind, rest, q) {
  if (!kind) {
    app.innerHTML = `<h1>Printables</h1><p class="muted">Everything prints on A4 or A5, in black and white or colour. Use “Save as PDF” in the print window to keep a copy.</p>
      <div class="results" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
        <a class="result" href="#/print/letter/ba"><span class="ic">1</span><div><b>Letter journey sheet</b><span>One page per letter with all four 4-I steps</span></div></a>
        <a class="result" href="#/write"><span class="ic">✎</span><div><b>Tracing sheets</b><span>Choose letters, shapes and help in Write, then print</span></div></a>
        <a class="result" href="#/print/map"><span class="ic">★</span><div><b>Sticker map poster</b><span>The journey from throat to lips, with circles for stickers</span></div></a>
        <a class="result" href="#/print/stickers"><span class="ic">●</span><div><b>Sticker sheet</b><span>30 round stickers to cut out or print on labels</span></div></a>
        <a class="result" href="#/print/chart"><span class="ic">◉</span><div><b>Sound spot chart</b><span>Where each letter comes from, side and top views</span></div></a>
        <a class="result" href="#/print/letter/all"><span class="ic">29</span><div><b>All 29 letter sheets</b><span>A whole booklet</span></div></a>
      </div>`;
    return;
  }
  const opt = { a5: q.get("size") === "a5", colour: q.get("colour") === "1" };
  $("#pagesize").textContent = `@page { size: ${opt.a5 ? "A5" : "A4"}; margin: 0; }`;
  onLeave(() => ($("#pagesize").textContent = "@page { size: A4; margin: 0; }"));
  const setQ = (k, v) => { q.set(k, v); location.hash = `#/print/${[kind, ...rest].join("/")}?${q}`; };
  let sheets = "";
  if (kind === "letter") sheets = (rest[0] === "all" ? LETTERS : [BY_ID[rest[0]] || LETTERS[1]]).map((l) => printLetter(l, opt)).join("");
  if (kind === "write") sheets = printWrite(q, opt);
  if (kind === "map") sheets = printMap(opt);
  if (kind === "stickers") sheets = printStickers(opt);
  if (kind === "chart") sheets = printChart(opt);
  app.innerHTML = `<div class="printbar"><a class="btn ghost" href="#/print">‹ Printables</a>
      ${kind === "letter" ? `<select id="pl" aria-label="Letter" style="font:inherit;padding:8px 10px;border-radius:12px;border:2px solid var(--line)"><option value="all"${rest[0] === "all" ? " selected" : ""}>All 29 letters</option>${LETTERS.map((l) => `<option value="${l.id}"${l.id === rest[0] ? " selected" : ""}>${l.ar} ${esc(l.name)}</option>`).join("")}</select>` : ""}
      <button class="chip" data-size="a4" aria-pressed="${!opt.a5}">A4</button><button class="chip" data-size="a5" aria-pressed="${opt.a5}">A5</button>
      <button class="chip" data-col="0" aria-pressed="${!opt.colour}">Black and white</button><button class="chip" data-col="1" aria-pressed="${opt.colour}">Colour</button>
      <button class="btn main" onclick="print()">Print or save as PDF</button></div>
    <div class="sheets">${sheets}</div>`;
  $$("[data-size]").forEach((b) => b.onclick = () => setQ("size", b.dataset.size));
  $$("[data-col]").forEach((b) => b.onclick = () => setQ("colour", b.dataset.col));
  if ($("#pl")) $("#pl").onchange = (e) => (location.hash = `#/print/letter/${e.target.value}?${q}`);
}

// =====================================================================================
// Router
// =====================================================================================
function go() {
  cleanups.forEach((f) => { try { f(); } catch { /* ignore */ } }); cleanups = [];
  const { parts, q } = route();
  const [p0, p1, p2, ...rest] = parts;
  $$("#nav a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === `#/${p0 || ""}`));
  $$("#nav a[aria-current]").forEach((a) => a.setAttribute("aria-current", "page"));
  if (p0 === "letter") viewLetter(p1, p2, q);
  else if (p0 === "write") viewWrite(q);
  else if (p0 === "spots") viewSpots(q);
  else if (p0 === "quran") viewQuran(p1, q);
  else if (p0 === "print") viewPrint(p1, [p2, ...rest].filter(Boolean), q);
  else viewHome();
  if (!location.hash.includes("?")) window.scrollTo(0, 0);
}
// ---------- Top bar: search drops from the top, settings slide in (shared tool standard) ----------
const openSheet = (id) => { const w = $(id); w.hidden = false; w.onclick = (e) => { if (e.target === w) w.hidden = true; }; };
addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".sheetwrap").forEach((w) => (w.hidden = true)); });
$("#openSearch").onclick = () => { openSheet("#searchSheet"); const i = $("#q2"); i.value = ""; $("#results2").innerHTML = ""; i.focus(); };
$("#q2").oninput = (e) => renderResults(e.target.value, $("#results2"));
$("#results2").onclick = (e) => { if (e.target.closest("a")) $("#searchSheet").hidden = true; };
$("#openSettings").onclick = () => {
  const p = penPrefs(), earned = LETTERS.filter((l) => isEarned(l.id)).length, steps = LETTERS.reduce((n, l) => n + I4.filter((s) => progress[l.id]?.[s.id]).length, 0);
  const chips = (key, list, cur) => list.map((x) => `<button class="chip" data-k="${key}" data-v="${x.id}" aria-pressed="${cur === x.id}">${x.name}</button>`).join("");
  $("#settingsBody").innerHTML = `<h2>Hijaiyya Lab settings</h2>
    <p class="small"><b>My pencil</b></p><div class="row">${chips("pen", PENS, p.pen)}</div>
    <p class="small"><b>Paper</b></p><div class="row">${chips("paper", PAPERS, p.paper)}</div>
    <p class="small"><b>Pencil size</b></p><div class="row">${chips("width", Object.keys(WIDTHS).map((w) => ({ id: w, name: w[0].toUpperCase() + w.slice(1) })), p.width)}</div>
    <h2>Who's learning</h2><p class="small muted">In the real tool this comes from the shared child picker, so each child keeps their own sticker map.</p>
    <h2>Display</h2><p class="small muted">Day / Night and text size come from the shared settings.</p>
    <h2>Sound</h2><p class="small muted">Letter audio is not recorded yet. The owner is sourcing it.</p>
    <h2>For grown-ups</h2><button class="btn ghost" id="holdGrown">Hold for 2 seconds to open</button>
    <div id="grownBody" hidden><p class="small">${earned} of 29 stickers, ${steps} of ${29 * 4} steps done on this device. The app never takes a sticker away.</p><a class="btn" href="#/print/map">Print the paper sticker map</a>
      <p class="small" style="margin-bottom:4px">Starting again with a new child on this device?</p><button class="btn ghost" id="clearBtn">Clear this device's stickers</button>
      <div class="row" id="confirmClear" hidden style="margin-top:8px"><button class="btn main" id="yesClear">Yes, clear it</button><button class="btn" id="keepIt">Keep it</button></div></div>
    <h2>Help &amp; About</h2><p class="small">Each letter has four steps (Inspire, Investigate, Integrate, Impart). The makhraj wording and stroke order are drafts for an ustaz or ustazah to check.</p>`;
  $$("#settingsBody [data-k]").forEach((b) => b.onclick = () => { store.set("pen", { ...penPrefs(), [b.dataset.k]: b.dataset.v }); $$(`#settingsBody [data-k="${b.dataset.k}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b)); if (route().parts[0] === "write" || route().parts[2] === "integrate") go(); });
  // Grown-ups only: a 2-second hold opens the section; clearing needs its own button and a "Yes"
  const hb = $("#holdGrown"); let timer = null;
  hb.onpointerdown = (e) => { e.preventDefault(); hb.textContent = "Keep holding…"; timer = setTimeout(() => { timer = null; hb.hidden = true; $("#grownBody").hidden = false; }, 2000); };
  hb.onpointerup = hb.onpointerleave = hb.onpointercancel = () => { if (timer) { clearTimeout(timer); timer = null; hb.textContent = "Hold for 2 seconds to open"; } };
  $("#clearBtn").onclick = () => ($("#confirmClear").hidden = false);
  $("#keepIt").onclick = () => ($("#confirmClear").hidden = true);
  $("#yesClear").onclick = () => {
    for (const k of Object.keys(progress)) delete progress[k];
    store.set("progress", progress); $("#confirmClear").hidden = true; $("#clearBtn").textContent = "Cleared. Starting fresh."; $("#clearBtn").disabled = true; go();
  };
  openSheet("#settingsSheet");
};
addEventListener("hashchange", () => { $$(".sheetwrap").forEach((w) => (w.hidden = true)); go(); });
Promise.all([document.fonts.load(`100px ${FONT}`, "بـ").catch(() => {}), ART_READY]).then(go, go);
