// Hijaiyya Lab prototype: the mouth drawings (side, top and front), built as SVG so they scale,
// recolour for print through CSS variables, and let the tongue move to each sound spot.
"use strict";

const MOUTH = (() => {
  const smooth = (p) => {
    let d = `M${p[0]}`;
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
      d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)},${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)},${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c}`;
    }
    return d;
  };

  // ---------- Side view (a cut through the middle of the head, facing left) ----------
  const HEAD = "M150,14 C228,6 318,40 336,120 C350,185 330,240 304,270 L310,380 L196,380 L192,318 C160,314 118,300 94,282 C78,270 72,252 76,238 C68,234 60,228 62,219 C63,212 70,209 78,207 C68,204 56,198 58,188 C60,180 66,176 72,174 C60,172 42,166 44,154 C46,140 64,122 78,102 C84,82 82,66 96,50 C112,30 128,18 150,14 Z";
  const NASAL = "M60,166 C80,150 110,136 150,130 C200,124 250,126 280,140 C292,148 296,162 296,180 L284,186 C276,170 262,162 240,160 C200,156 150,162 118,172 C98,176 80,176 64,172 Z";
  const CAVITY = "M80,207 L100,190 C140,172 200,162 240,166 C262,170 280,180 296,180 L298,380 L264,380 L262,300 C258,270 240,262 220,262 C180,262 130,250 100,230 C90,222 84,214 80,207 Z";
  const TONGUE_POSES = {
    rest:  [[100, 220], [126, 204], [170, 194], [222, 198], [254, 228], [262, 262], [258, 292]],
    tip:   [[103, 191], [120, 198], [165, 202], [220, 202], [254, 228], [262, 262], [258, 292]],
    ra:    [[112, 187], [126, 196], [165, 202], [220, 202], [254, 228], [262, 262], [258, 292]],
    low:   [[94, 213], [116, 196], [165, 196], [220, 200], [254, 228], [262, 262], [258, 292]],
    out:   [[82, 205], [108, 201], [160, 199], [218, 200], [254, 228], [262, 262], [258, 292]],
    mid:   [[102, 222], [130, 200], [168, 172], [215, 186], [252, 224], [262, 262], [258, 292]],
    kaf:   [[102, 222], [130, 206], [175, 192], [220, 172], [252, 214], [262, 262], [258, 292]],
    qaf:   [[102, 222], [130, 208], [178, 198], [238, 178], [264, 212], [264, 262], [258, 292]],
    sides: [[104, 214], [128, 192], [168, 182], [216, 190], [252, 224], [262, 262], [258, 292]],
  };
  const tonguePath = (pts) => `${smooth(pts)} L230,294 C190,278 140,264 108,242 C100,236 98,228 ${pts[0]} Z`;

  // Where to put the dot on the side view for each spot (x, y)
  const sideLabels = [
    { t: "Nose", x: 52, y: 160, lx: -52, ly: 128 },
    { t: "Lips", x: 60, y: 200, lx: -52, ly: 196 },
    { t: "Teeth", x: 90, y: 198, lx: -52, ly: 236 },
    { t: "Gum", x: 104, y: 186, lx: -52, ly: 166 },
    { t: "Hard roof", x: 170, y: 162, lx: 150, ly: 112, up: true },
    { t: "Soft roof", x: 262, y: 176, lx: 250, ly: 112, up: true },
    { t: "Tongue", x: 180, y: 230, lx: 160, ly: 236, inside: true },
    { t: "Throat", x: 298, y: 280, lx: 330, ly: 300 },
  ];

  function side({ pose = "rest", spot = null, glow = null, labels = false, levels = true, dots = null, id = "" } = {}) {
    const pts = TONGUE_POSES[pose] || TONGUE_POSES.rest;
    const vb = labels ? "-60 0 446 380" : "30 0 330 380";
    let s = `<svg class="mouth side" viewBox="${vb}" role="img" aria-label="Side view of the mouth and throat" ${id ? `id="${id}"` : ""}>`;
    s += `<path d="${HEAD}" fill="var(--m-skin)" stroke="var(--m-line)" stroke-width="4" stroke-linejoin="round"/>`;
    s += `<path class="nasal${glow === "nose" ? " glow" : ""}" d="${NASAL}" fill="var(--m-air)"/>`;
    s += `<path class="cavity${glow === "space" ? " glow" : ""}" d="${CAVITY}" fill="var(--m-cavity)"/>`;
    // roof of the mouth: hard palate, soft palate, uvula
    s += `<path d="M100,187 C112,180 124,176 136,172 C170,162 205,158 238,163" fill="none" stroke="var(--m-palate)" stroke-width="9" stroke-linecap="round"/>`;
    s += `<path d="M238,163 C256,166 272,176 280,194" fill="none" stroke="var(--m-palate)" stroke-width="7" stroke-linecap="round" opacity=".75"/>`;
    s += `<ellipse cx="281" cy="199" rx="4.5" ry="7" fill="var(--m-palate)" opacity=".75"/>`;
    // throat: back wall and the three levels
    s += `<path d="M296,180 L298,380" stroke="var(--m-line)" stroke-width="2" opacity=".35"/>`;
    if (levels) for (const y of [252, 296, 340]) s += `<line x1="262" y1="${y}" x2="300" y2="${y}" stroke="var(--m-line)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".55"/>`;
    // tongue
    s += `<path class="tongue" data-pose="${pose}" d="${tonguePath(pts)}" fill="var(--m-tongue)" stroke="var(--m-tongue-line)" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += `<path d="M${pts[1][0] + 8},${pts[1][1] + 14} C${pts[2][0]},${pts[2][1] + 16} ${pts[3][0] - 10},${pts[3][1] + 16} ${pts[4][0] - 14},${pts[4][1] + 10}" fill="none" stroke="var(--m-tongue-line)" stroke-width="1.5" opacity=".35"/>`;
    // teeth (top and bottom front teeth)
    s += `<path d="M84,186 L99,186 L97,206 C96,211 88,211 86,206 Z" fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="2" stroke-linejoin="round"/>`;
    s += `<path d="M86,213 C87,209 95,209 97,213 L100,233 L88,233 Z" fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="2" stroke-linejoin="round"/>`;
    // the lips sit on top of the teeth again so the outline reads clearly
    s += `<path d="M72,174 C66,176 60,180 58,188 C56,198 68,204 78,207 C70,209 63,212 62,219 C60,228 68,234 76,238" fill="none" stroke="var(--m-line)" stroke-width="4" stroke-linecap="round"/>`;
    if (labels) {
      for (const L of sideLabels) {
        if (L.inside) { s += `<text x="${L.lx}" y="${L.ly}" class="lbl in">${L.t}</text>`; continue; }
        s += `<line x1="${L.x}" y1="${L.y}" x2="${L.lx + (L.up ? 0 : 34)}" y2="${L.ly - (L.up ? -4 : 4)}" stroke="var(--m-line)" stroke-width="1" opacity=".5"/>`;
        s += `<text x="${L.lx}" y="${L.ly}" class="lbl" ${L.up ? 'text-anchor="middle"' : ""}>${L.t}</text>`;
      }
    }
    if (dots) s += dots.map((d) => `<g class="cand" data-spot="${d.id}" tabindex="0" role="button" aria-label="${d.label}"><circle cx="${d.x}" cy="${d.y}" r="13" class="hit"/><circle cx="${d.x}" cy="${d.y}" r="6.5" class="cdot"/></g>`).join("");
    if (spot) s += `<g class="spotdot"><circle cx="${spot.x}" cy="${spot.y}" r="11" class="ring"/><circle cx="${spot.x}" cy="${spot.y}" r="6.5" class="core"/></g>`;
    return s + "</svg>";
  }

  // ---------- Top view (looking down at the tongue inside the top teeth) ----------
  function topView({ zone = null, side: which = "both" } = {}) {
    let s = `<svg class="mouth top" viewBox="0 0 240 270" role="img" aria-label="Looking down at the tongue">`;
    s += `<path d="M120,26 C178,26 214,90 218,170 C220,210 216,240 210,262 L30,262 C24,240 20,210 22,170 C26,90 62,26 120,26 Z" fill="var(--m-cavity)" stroke="var(--m-line)" stroke-width="3"/>`;
    // teeth along the arch
    const teeth = [];
    for (let i = 0; i < 8; i++) {
      for (const sgn of [-1, 1]) {
        const th = (0.12 + i * 0.19) * sgn;
        const x = 120 + 84 * Math.sin(th), y = 238 - 200 * Math.cos(th);
        const w = i < 2 ? 13 : i < 4 ? 15 : 22, h = i < 2 ? 9 : 14;
        const molar = i >= 5;
        teeth.push(`<rect class="tooth${molar ? " molar" : ""}${molar && sgn < 0 ? " L" : molar ? " R" : ""}" x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w}" height="${h}" rx="4" transform="rotate(${(th * 57.3 * 0.9).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
      }
    }
    s += `<g fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="1.6">${teeth.join("")}</g>`;
    s += `<path class="tongue" d="M120,58 C150,58 172,90 178,130 C184,170 182,215 178,262 L62,262 C58,215 56,170 62,130 C68,90 90,58 120,58 Z" fill="var(--m-tongue)" stroke="var(--m-tongue-line)" stroke-width="2.5"/>`;
    s += `<path d="M120,84 L120,250" stroke="var(--m-tongue-line)" stroke-width="1.5" stroke-dasharray="5 5" opacity=".4"/>`;
    s += `<text x="120" y="18" class="lbl" text-anchor="middle">front teeth</text>`;
    const Z = {
      tip: `<ellipse cx="120" cy="70" rx="20" ry="13"/>`,
      edgesFront: `<path d="M80,140 C84,100 100,70 120,64 C140,70 156,100 160,140" fill="none" stroke-width="11" stroke-linecap="round"/>`,
      middle: `<ellipse cx="120" cy="150" rx="28" ry="22"/>`,
      back: `<ellipse cx="120" cy="232" rx="38" ry="18"/>`,
      sidesBack: `${which !== "right" ? `<path d="M64,160 C60,190 60,220 63,252" fill="none" stroke-width="11" stroke-linecap="round"/>` : ""}${which !== "left" ? `<path d="M176,160 C180,190 180,220 177,252" fill="none" stroke-width="11" stroke-linecap="round"/>` : ""}`,
    };
    if (zone) s += `<g class="zone">${Z[zone]}</g>`;
    if (zone === "edgesFront") s += `<g class="air"><path d="M70,175 L44,190"/><path d="M170,175 L196,190"/></g>`;
    if (zone === "sidesBack") s += `<style>.mouth.top .tooth.molar${which === "left" ? ".L" : which === "right" ? ".R" : ""}{fill:var(--m-spot-soft)}</style>`;
    return s + "</svg>";
  }

  // ---------- Front view (the mouth seen from the front) ----------
  function front({ lips = "open", tongue = "rest" } = {}) {
    const state = lips !== "open" ? lips : tongue === "tip" || tongue === "ra" ? "tipUp" : tongue === "low" ? "teeth" : tongue === "out" ? "tongueOut" : "open";
    let s = `<svg class="mouth front" viewBox="0 0 260 200" role="img" aria-label="The mouth seen from the front">`;
    const teethRow = (y, h, x0 = 72, x1 = 188) => { let r = ""; const n = 6, w = (x1 - x0) / n; for (let i = 0; i < n; i++) r += `<rect x="${(x0 + i * w + 1).toFixed(1)}" y="${y}" width="${(w - 2).toFixed(1)}" height="${h}" rx="3"/>`; return `<g fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="1.4">${r}</g>`; };
    let dot = null;
    if (state === "closed") {
      s += `<path d="M30,100 C60,58 200,58 230,100 C200,142 60,142 30,100 Z" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="3"/>`;
      s += `<path d="M34,100 C80,108 180,108 226,100" fill="none" stroke="var(--m-dark)" stroke-width="4" stroke-linecap="round"/>`;
      dot = [130, 105];
    } else if (state === "round") {
      s += `<ellipse cx="130" cy="100" rx="62" ry="58" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="3"/>`;
      s += `<ellipse cx="130" cy="100" rx="20" ry="22" fill="var(--m-dark)"/>`;
      dot = [130, 76];
    } else if (state === "f") {
      s += `<path d="M30,96 C60,52 200,52 230,96 C200,146 60,146 30,96 Z" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="3"/>`;
      s += `<path d="M58,96 C90,80 170,80 202,96 C170,100 90,100 58,96 Z" fill="var(--m-dark)"/>`;
      s += teethRow(84, 22, 84, 176);
      s += `<path d="M44,104 C90,118 170,118 216,104" fill="none" stroke="var(--m-line)" stroke-width="2" opacity=".6"/>`;
      dot = [130, 106];
    } else {
      const teethGap = state === "teeth" ? 2 : state === "tongueOut" ? 10 : 30;
      const top = 100 - teethGap / 2 - 22, bot = 100 + teethGap / 2;
      s += `<path d="M24,100 C50,40 210,40 236,100 C210,160 50,160 24,100 Z" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="3"/>`;
      const oy = state === "teeth" ? 26 : state === "tongueOut" ? 30 : 42;
      s += `<ellipse cx="130" cy="100" rx="86" ry="${oy}" fill="var(--m-dark)"/>`;
      s += `<clipPath id="fm-${state}"><ellipse cx="130" cy="100" rx="86" ry="${oy}"/></clipPath><g clip-path="url(#fm-${state})">`;
      if (state === "tipUp") s += `<path d="M78,150 C80,112 104,${top + 24} 130,${top + 24} C156,${top + 24} 180,112 182,150 Z" fill="var(--m-tongue)" stroke="var(--m-tongue-line)" stroke-width="2"/><path d="M130,${top + 34} L130,140" stroke="var(--m-tongue-line)" stroke-width="2" opacity=".5"/>`;
      else s += `<ellipse cx="130" cy="${bot + 34}" rx="62" ry="24" fill="var(--m-tongue)" stroke="var(--m-tongue-line)" stroke-width="2"/>`;
      s += teethRow(top, 22) + teethRow(bot, 20);
      if (state === "tongueOut") s += `<ellipse cx="130" cy="${100 + 2}" rx="30" ry="9" fill="var(--m-tongue)" stroke="var(--m-tongue-line)" stroke-width="2"/>`;
      s += `</g>`;
      dot = state === "tipUp" ? [130, top + 26] : state === "teeth" ? [130, 101] : state === "tongueOut" ? [130, 98] : null;
    }
    if (dot) s += `<g class="spotdot"><circle cx="${dot[0]}" cy="${dot[1]}" r="10" class="ring"/><circle cx="${dot[0]}" cy="${dot[1]}" r="5.5" class="core"/></g>`;
    return s + "</svg>";
  }

  // Animate the tongue on an existing side view from one pose to another (skipped when motion is reduced)
  function moveTongue(svg, to) {
    const el = svg && svg.querySelector(".tongue");
    if (!el) return;
    const from = TONGUE_POSES[el.dataset.pose] || TONGUE_POSES.rest, target = TONGUE_POSES[to] || TONGUE_POSES.rest;
    el.dataset.pose = to;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.setAttribute("d", tonguePath(target)); return; }
    const t0 = performance.now(), dur = 650;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      el.setAttribute("d", tonguePath(from.map((p, i) => [+(p[0] + (target[i][0] - p[0]) * e).toFixed(1), +(p[1] + (target[i][1] - p[1]) * e).toFixed(1)])));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return { side, top: topView, front, moveTongue, smooth, POSES: Object.keys(TONGUE_POSES) };
})();
