// Hijaiyya Lab: the visual delivery of 2026-10-15 (folder art/, from ChatGPT; see art/README in review.md and QA.md).
// Letters and tracing guides are exact Amiri Quran outlines (HarfBuzz + fontTools), not painted.
// Mouth drawings are layered SVGs: the tongue moves with art/motion.js, the head never moves.
// Everything about articulation and stroke order is still DRAFT for asatizah review.
"use strict";

const ART = "art";
const artLetter = (l, form, style = "solid", layout = "fitted") => `${ART}/letters/${layout}/${l.id}-${form}-${style}.svg`;
const artLetterBw = (l, form, layout = "fitted") => `${ART}/letters-bw/${layout}/${l.id}-${form}-outline-bw.svg`;
const artTracing = (l, bw = false) => (bw ? `${ART}/tracing-bw/${l.id}-alone-arrows-bw.svg` : `${ART}/tracing/${l.id}-alone-arrows.svg`);
const artStrip = (l, style = "outline", bw = false) => (bw ? `${ART}/strips-bw/${l.id}-changes-outline-bw.svg` : `${ART}/strips/${l.id}-changes-${style}.svg`);
const hasMouth = (name) => ART_INDEX.mouths.includes(name);
// The aligned letters share one baseline; every shape of every letter fits inside this box of the 512 canvas
const ALIGNED_BOX = "70 66 370 378";
const alignedLetter = (l, form, style = "solid", cls = "fg") => `<svg class="${cls}" viewBox="${ALIGNED_BOX}" role="img" aria-label="${esc(l.name)}, ${form}"><image href="${artLetter(l, form, style, "aligned")}" width="512" height="512"/></svg>`;

// ---------- Mouth pictures ----------
// app: cropped, no built-in title (the page shows it); mini: no labels, for small tiles; full: as delivered, with DRAFT line (print)
const MOUTH_DIMS = { app: [720, 640], front: [560, 440], mini: [620, 620], full: [800, 800] };
function mouthImg(name, { kind = "app", bw = false, alt = "", cls = "" } = {}) {
  const d = kind === "app" && name.endsWith("-front") ? MOUTH_DIMS.front : MOUTH_DIMS[kind];
  return `<img class="mouthimg ${cls}" src="${ART}/mouths/${kind}${bw ? "-bw" : ""}/${name}${bw ? "-bw" : ""}.svg" alt="${esc(alt)}" width="${d[0]}" height="${d[1]}">`;
}
// The views that exist for a letter (only what was drawn: no invented views)
function mouthViews(l) {
  const s = l.spot, v = [{ id: "side", name: "Side", art: `${s}-side` }];
  const top = s === "sides" ? "sides-top" : hasMouth(`${s}-top`) ? `${s}-top` : null;
  if (top) v.push({ id: "top", name: "From above", art: top });
  const front = l.id === "waw" ? "waw-front" : hasMouth(`${s}-front`) ? `${s}-front` : null;
  if (front) v.push({ id: "front", name: "Front", art: front });
  if (hasMouth(`${l.id}-heavy-side`)) v.push({ id: "heavy", name: "Heavy letter", art: `${l.id}-heavy-side` });
  return v;
}
// "Feel it" pictures: one gentle check per sound spot
const FEEL = { space: "feel-air", throatDeep: "fingers-throat", throatMid: "fingers-throat", throatNear: "fingers-throat", fa: "feel-air", lips: "mirror", tha: "mirror", sin: "whistle", nun: "nose-hum", nose: "nose-hum" };
const feelFor = (spot, l) => (l?.id === "mim" ? "nose-hum" : FEEL[spot] || "mirror");
const feelImg = (id, bw = false) => `<img class="feelimg" src="${ART}/feel-it${bw ? "-bw" : ""}/app/${id}${bw ? "-bw" : ""}.svg" alt="" width="440" height="520">`;

// ---------- Loading ----------
const textCache = new Map();
const loadText = (url) => {
  if (!textCache.has(url)) textCache.set(url, fetch(url).then((r) => { if (!r.ok) throw new Error(`Missing ${url}`); return r.text(); }));
  return textCache.get(url);
};
let SPOT_POINTS = {};
const ART_READY = fetch(`${ART}/sound-spots.json`).then((r) => r.json())
  .then((list) => { SPOT_POINTS = Object.fromEntries(list.map((s) => [s.id, s.primarySidePoint])); })
  .catch(() => { /* the find-the-spot game falls back to no dots */ });
let motionMod = null;
const motion = () => (motionMod ||= import(`./${ART}/motion.js`));

// Put a layered mouth SVG into a box (inline, so its tongue can move). Trusted local files only.
let mouthUid = 0;
async function mountMouth(box, name, { play = false, bw = false } = {}) {
  const [text, m] = await Promise.all([loadText(`${ART}/mouths/app${bw ? "-bw" : ""}/${name}${bw ? "-bw" : ""}.svg`), motion()]);
  const svg = m.prepareSVG(text, `m${++mouthUid}-`);
  svg.removeAttribute("width"); svg.removeAttribute("height");
  svg.setAttribute("class", "mouthart");
  box.replaceChildren(svg);
  if (play) await m.playMouth(svg);
  return svg;
}
// Dots on top of a side view, in the drawing's own coordinates
function dotsOverlay(dots, sel = null) {
  return `<svg class="mouthdots" viewBox="40 70 720 640">${dots.map((d) => `<g class="cand${sel ? (d.id === sel ? " sel" : " dim") : ""}" data-spot="${d.id}" tabindex="0" role="button" aria-label="${esc(d.label)}"><circle cx="${d.x}" cy="${d.y}" r="30" class="hit"/><circle cx="${d.x}" cy="${d.y}" r="${sel ? (d.id === sel ? 15 : 8) : 13}" class="cdot"/></g>`).join("")}</svg>`;
}

// ---------- Letter masks for checking a child's tracing ----------
const MR = 160; // mask resolution
const maskCache = new Map();
const svgImage = (text) => new Promise((res, rej) => { const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text); });
function raster(img, grow = 0) {
  const c = document.createElement("canvas"); c.width = c.height = MR;
  const x = c.getContext("2d", { willReadFrequently: true }), k = MR / 512;
  x.drawImage(img, 0, 0, MR, MR);
  if (grow) for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; x.drawImage(img, Math.cos(a) * grow * k, Math.sin(a) * grow * k, MR, MR); }
  return x.getImageData(0, 0, MR, MR).data;
}
function letterMask(l, form) {
  const key = `${l.id}-${form}`;
  if (!maskCache.has(key)) maskCache.set(key, (async () => {
    const text = await loadText(artLetter(l, form, "solid"));
    const letterOnly = text.replace(/<path[^>]*data-role="joining-stub"[^>]*\/>/g, "");
    const [all, only] = await Promise.all([svgImage(text), svgImage(letterOnly)]);
    const core = raster(only), loose = raster(only, 36), every = raster(all);
    // Joined shapes are written from the right: start at the right-most ink, in the middle of that edge
    let sx = -1, ys = [];
    for (let x = MR - 1; x >= 0 && sx < 0; x--) for (let y = 0; y < MR; y++) if (every[(y * MR + x) * 4 + 3] > 80) { sx = x; ys.push(y); }
    const start = [((sx - 1.5) * 512) / MR, ((ys.length ? ys[Math.floor(ys.length / 2)] : MR / 2) * 512) / MR];
    return { core, loose, start };
  })());
  return maskCache.get(key);
}
// The proposed stroke routes from the tracing guide (alone shapes): paths in order, and the first start dot
const routeCache = new Map();
function tracingRoutes(l) {
  if (!routeCache.has(l.id)) routeCache.set(l.id, loadText(artTracing(l)).then((t) => ({
    routes: [...t.matchAll(/<path d="([^"]+)"[^>]*stroke="#e2231a"[^>]*marker-end/g)].map((m) => m[1]),
    starts: [...t.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="4" fill="#e2231a"/g)].map((m) => [+m[1], +m[2]]),
  })).catch(() => ({ routes: [], starts: [] })));
  return routeCache.get(l.id);
}

// =====================================================================================
// A trace card: the letter picture, a canvas the child writes on, and Check / Show me / Undo / Clear
// level: arrows | outline | faint | own
// =====================================================================================
const PEN_UNITS = { thin: 12, medium: 20, thick: 30 }; // in the letter picture's 512 units
function guideFor(letter, form, level, paper) {
  if (level === "arrows") return form === "alone" ? artTracing(letter) : artLetter(letter, form, "outline");
  if (level === "outline") return artLetter(letter, form, "outline");
  if (level === "faint") return artLetter(letter, form, paper === "night" ? "reversed" : "solid");
  return null;
}
function traceCard(letter, form, level, { tools = true, label = true, onStars } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "tcell";
  const prefs = penPrefs();
  const guide = guideFor(letter, form, level, prefs.paper);
  const ownArrows = level === "arrows" && form === "alone";
  wrap.innerHTML = `<div class="tc paper-${prefs.paper}"><svg class="guide" viewBox="0 0 512 512" aria-hidden="true">
      ${guide ? `<image href="${guide}" x="0" y="0" width="512" height="512"${level === "faint" ? ' class="faintimg"' : ""}/>` : `<image href="${artLetter(letter, form, prefs.paper === "night" ? "reversed" : "solid")}" x="12" y="12" width="110" height="110" class="modelimg"/>`}
      <g class="startdot"></g><g class="trails"></g></svg><canvas></canvas><div class="stars" aria-live="polite"></div>${label ? `<div class="flabel">${FORMS.find((f) => f.id === form).name}</div>` : ""}</div>
    ${tools ? `<div class="ttools"><button class="btn sun" data-a="check">✓ Check</button><button class="btn" data-a="show"${form === "alone" ? "" : " disabled"}>▶ Show me</button><button class="btn ghost" data-a="undo">↶ Undo</button><button class="btn ghost" data-a="clear">Clear</button></div><div class="tmsg" aria-live="polite"></div>` : ""}`;
  const tc = $(".tc", wrap), svg = $("svg", tc), cv = $("canvas", tc), ctx = cv.getContext("2d");
  const strokes = [];
  let cur = null;
  // Start dot (the arrows guide already shows its own)
  const startOf = async () => (form === "alone" ? (await tracingRoutes(letter)).starts[0] : null) || (await letterMask(letter, form)).start;
  if (level !== "own" && !ownArrows) startOf().then((p) => { if (p) $(".startdot", svg).innerHTML = `<circle cx="${p[0]}" cy="${p[1]}" r="10" class="start"/>`; });

  const fit = () => {
    const r = tc.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    if (!r.width) return;
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    redraw();
  };
  const toUnits = (e) => { const r = cv.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 512, ((e.clientY - r.top) / r.height) * 512]; };
  const setT = (c, W) => c.setTransform(W / 512, 0, 0, W / 512, 0, 0);
  const rnd = (i, j) => { const x = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453; return x - Math.floor(x); };
  function paint(c, st) {
    const pts = st.pts; if (!pts.length) return;
    c.lineCap = "round"; c.lineJoin = "round"; c.lineWidth = st.width;
    if (pts.length === 1) { c.fillStyle = st.colour; c.beginPath(); c.arc(pts[0][0], pts[0][1], st.width / 2, 0, 7); c.fill(); return; }
    if (st.pen === "rainbow") {
      for (let i = 1; i < pts.length; i++) { c.strokeStyle = `hsl(${(i * 7) % 360} 85% 55%)`; c.beginPath(); c.moveTo(...pts[i - 1]); c.lineTo(...pts[i]); c.stroke(); }
      return;
    }
    c.strokeStyle = st.colour; c.globalAlpha = st.pen === "crayon" ? 0.85 : 1;
    c.beginPath(); c.moveTo(...pts[0]); for (const p of pts.slice(1)) c.lineTo(...p); c.stroke(); c.globalAlpha = 1;
    if (st.pen === "crayon") {
      c.save(); c.globalCompositeOperation = "destination-out";
      const sz = Math.max(1.5, st.width * 0.1);
      pts.forEach((p, i) => { for (let j = 0; j < 3; j++) { const a = rnd(i, j) * 6.28, d = rnd(j, i) * st.width * 0.45; c.fillStyle = "rgba(0,0,0,.35)"; c.fillRect(p[0] + Math.cos(a) * d, p[1] + Math.sin(a) * d, sz, sz); } });
      c.restore();
    }
    if (st.pen === "sparkle") {
      pts.forEach((p, i) => { if (i % 9) return; const r = st.width * (0.4 + rnd(i, 1) * 0.4); c.fillStyle = i % 18 ? "#ffe45d" : "#fff"; c.beginPath();
        for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4, rr = k % 2 ? r / 3 : r; c.lineTo(p[0] + Math.cos(a) * rr + st.width * 0.6, p[1] + Math.sin(a) * rr - st.width * 0.6); } c.fill(); });
    }
  }
  function redraw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    setT(ctx, cv.width);
    for (const st of strokes) paint(ctx, st);
  }
  cv.addEventListener("pointerdown", (e) => {
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    const p = penPrefs();
    cur = { pts: [toUnits(e)], pen: p.pen, colour: p.colour, width: PEN_UNITS[p.width] || PEN_UNITS.medium };
    strokes.push(cur); redraw();
  });
  cv.addEventListener("pointermove", (e) => {
    if (!cur) return;
    const evs = e.getCoalescedEvents?.() || [];
    for (const ev of evs.length ? evs : [e]) {
      const q = toUnits(ev), last = cur.pts[cur.pts.length - 1];
      if (Math.hypot(q[0] - last[0], q[1] - last[1]) > 2.5) cur.pts.push(q);
    }
    redraw();
  });
  const end = () => { cur = null; };
  cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
  const ro = new ResizeObserver(fit); ro.observe(tc); onLeave(() => ro.disconnect());

  // ---------- Check: how much of the letter the pencil followed, and how much went outside ----------
  async function check() {
    const msg = $(".tmsg", wrap), starsEl = $(".stars", tc);
    if (!strokes.length) { if (msg) msg.textContent = "Write the letter first, then press Check."; return 0; }
    const m = await letterMask(letter, form);
    const draw = (extra) => { const c = document.createElement("canvas"); c.width = c.height = MR; const x = c.getContext("2d", { willReadFrequently: true }); setT(x, MR);
      for (const st of strokes) paint(x, { ...st, pen: "marker", colour: "#000", width: Math.max(st.width, 16) + extra }); return x.getImageData(0, 0, MR, MR).data; };
    const k = draw(0), kr = draw(26); // the child follows the middle of the letter, so "covered" counts the pencil a little wider
    let nc = 0, hit = 0, nk = 0, out = 0;
    for (let i = 3; i < k.length; i += 4) {
      if (m.core[i] > 100) { nc++; if (kr[i] > 100) hit++; }
      if (k[i] > 100) { nk++; if (m.loose[i] < 60) out++; }
    }
    const cover = nc ? hit / nc : 0, outside = nk ? out / nk : 0;
    let stars = cover >= 0.8 && outside <= 0.15 ? 3 : cover >= 0.6 && outside <= 0.3 ? 2 : cover >= 0.35 ? 1 : 0;
    const dotted = "بتثجخذزشضظغفقني".includes(letter.ar) && form === "alone";
    const routes = form === "alone" ? (await tracingRoutes(letter)).routes : [];
    const missedDots = dotted && strokes.length <= Math.max(1, routes.length);
    if (missedDots) stars = Math.min(stars, 2);
    starsEl.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    const s0 = await startOf();
    const goodStart = s0 && Math.hypot(strokes[0].pts[0][0] - s0[0], strokes[0].pts[0][1] - s0[1]) < 60;
    const lines = [
      stars === 3 ? "Excellent! ⭐⭐⭐" : stars === 2 ? "Well done! Try once more for 3 stars." : stars === 1 ? "Good try. Cover more of the letter." : "Keep going: follow the letter's shape.",
      outside > 0.3 ? "Try to stay inside the lines." : "",
      missedDots ? `Don't forget the dot${"ثشتق".includes(letter.ar) ? "s" : ""}!` : "",
      level !== "own" ? (goodStart ? "You started at the red dot. 👍" : "Tip: start at the red dot.") : "",
    ].filter(Boolean);
    if (msg) msg.textContent = lines.join(" ");
    onStars?.(stars, form);
    return stars;
  }

  // ---------- Show me: a pen runs along each proposed stroke, in order ----------
  async function showMe() {
    const { routes } = await tracingRoutes(letter);
    const g = $(".trails", svg), ns = "http://www.w3.org/2000/svg";
    g.innerHTML = "";
    for (const d of routes) {
      const p = document.createElementNS(ns, "path"); p.setAttribute("d", d); p.setAttribute("class", "trail"); g.appendChild(p);
      const len = p.getTotalLength();
      if (REDUCED) { await new Promise((r) => setTimeout(r, 500)); continue; }
      const dot = document.createElementNS(ns, "circle"); dot.setAttribute("r", "12"); dot.setAttribute("class", "pendot"); g.appendChild(dot);
      p.style.strokeDasharray = `${len} ${len}`;
      await new Promise((resolve) => {
        const t0 = performance.now(), dur = 600 + len * 3;
        const step = (now) => {
          const kk = Math.min(1, (now - t0) / dur), pt = p.getPointAtLength(len * kk);
          p.style.strokeDashoffset = String(len * (1 - kk)); dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
          if (kk < 1) requestAnimationFrame(step); else { dot.remove(); setTimeout(resolve, 250); }
        };
        requestAnimationFrame(step);
      });
    }
    setTimeout(() => (g.innerHTML = ""), 900);
  }

  wrap.addEventListener("click", (e) => {
    const a = e.target.closest("[data-a]")?.dataset.a; if (!a) return;
    if (a === "clear") { strokes.length = 0; redraw(); $(".stars", tc).textContent = ""; $(".tmsg", wrap).textContent = ""; }
    if (a === "undo") { strokes.pop(); redraw(); }
    if (a === "check") check();
    if (a === "show") showMe();
  });
  requestAnimationFrame(fit);
  wrap.api = { check, showMe, clear: () => { strokes.length = 0; redraw(); } };
  return wrap;
}

// ---------- Paper versions of the trace guides ----------
// cells: arrows (alone only), outline, faint, faint, on my own
function printTraceCell(l, form, level, bw) {
  const src = level === "arrows" ? (form === "alone" ? artTracing(l, bw) : bw ? artLetterBw(l, form) : artLetter(l, form, "outline"))
    : level === "outline" ? (bw ? artLetterBw(l, form) : artLetter(l, form, "outline"))
    : level === "faint" ? artLetter(l, form, "solid") : null;
  return `<div class="pcell">${src ? `<img src="${src}" alt="" width="512" height="512"${level === "faint" ? ' class="faintimg"' : ""}>` : `<img src="${artLetter(l, form, "solid")}" alt="" width="512" height="512" class="modelimg">`}</div>`;
}
