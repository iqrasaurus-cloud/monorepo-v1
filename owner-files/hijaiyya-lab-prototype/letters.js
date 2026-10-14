// Hijaiyya Lab prototype: one table for the 29 letters, shared by every activity.
// Names follow the owner's "Read IQRA with Saurus" Sound Spot cards. Everything marked DRAFT
// (the kid-friendly makhraj wording and the stroke order) needs a teacher's check before release.
"use strict";

const FATHA = "َ", KASRA = "ِ", DAMMA = "ُ", SUKUN = "ْ", TATWEEL = "ـ";
const HAMZA_ALIF = "أ"; // أ

// ---------- Mouth regions (stations on the sticker map), from the inside out ----------
const REGIONS = [
  { id: "space",  name: "The empty space", ms: "Rongga mulut", ar: "الجوف",    tr: "Al-Jawf",     colour: "#7cc6e8" },
  { id: "throat", name: "Throat",          ms: "Kerongkong",    ar: "الحلق",    tr: "Al-Ḥalq",     colour: "#f2a36b" },
  { id: "tongue", name: "Tongue",          ms: "Lidah",         ar: "اللسان",   tr: "Al-Lisān",    colour: "#e98a9a" },
  { id: "lips",   name: "Lips",            ms: "Bibir",         ar: "الشفتان",  tr: "Ash-Shafatān", colour: "#c77dc8" },
  { id: "nose",   name: "Nose",            ms: "Hidung",        ar: "الخيشوم",  tr: "Al-Khayshūm", colour: "#8fc97a" },
];

// ---------- The sound spots (makharij). DRAFT wording for children. ----------
// side/top/front: which drawing to show and how the tongue and lips sit. x,y: the dot on the side view.
const SPOTS = {
  space:     { region: "space",  name: "The empty space in your mouth and throat", short: "Empty space",
               where: "Nothing touches! The sound flows out of the open space in your mouth and throat, like wind through a cave, until your breath runs out.",
               feel: "Say بَا and stretch it long. Check: is anything inside your mouth touching?", tongue: "rest", lips: "open", glow: "space", x: 190, y: 182, view: "side", depth: 0 },
  throatDeep:{ region: "throat", name: "Deepest part of the throat", short: "Deep throat",
               where: "From the very bottom of your throat, closest to your chest.",
               feel: "Put two fingers gently on the bottom of your throat. Say أَ, then هَ. Feel it down low?", tongue: "rest", lips: "open", x: 276, y: 318, view: "side", depth: 1 },
  throatMid: { region: "throat", name: "Middle of the throat", short: "Middle throat",
               where: "From the middle of your throat. The middle squeezes a little.",
               feel: "Fingers on the middle of your throat. Say عَ, then حَ.", tongue: "rest", lips: "open", x: 276, y: 274, view: "side", depth: 2 },
  throatNear:{ region: "throat", name: "Top of the throat, near the mouth", short: "Top of throat",
               where: "From the top of your throat, just behind your tongue.",
               feel: "Fingers high on your throat, under your chin. Say غَ like a soft gargle, then خَ.", tongue: "rest", lips: "open", x: 276, y: 232, view: "side", depth: 3 },
  qaf:       { region: "tongue", name: "Very back of the tongue", short: "Tongue: very back",
               where: "The very back of your tongue pushes up to the soft back roof of your mouth.",
               feel: "Say أَقْ. Feel the very back of your tongue lift and stop the air.", tongue: "qaf", lips: "open", x: 246, y: 180, view: "side", depth: 4 },
  kaf:       { region: "tongue", name: "Back of the tongue (a little forward)", short: "Tongue: back",
               where: "The back of your tongue touches the roof of your mouth, a little in front of Qof.",
               feel: "Say أَكْ, then أَقْ. Which one is deeper?", tongue: "kaf", lips: "open", x: 222, y: 168, view: "side", depth: 5 },
  mid:       { region: "tongue", name: "Middle of the tongue", short: "Tongue: middle",
               where: "The middle of your tongue lifts up to the hard roof of your mouth.",
               feel: "Say أَجْ, then أَشْ, then أَيْ. Same spot each time!", tongue: "mid", lips: "open", x: 168, y: 166, view: "side", depth: 6 },
  sides:     { region: "tongue", name: "Side of the tongue and the back teeth", short: "Tongue: side",
               where: "One side of your tongue (or both) presses on your top back teeth. Your mouth feels full. This is the trickiest letter!",
               feel: "Say أَضْ. Press the side of your tongue on your top back teeth.", tongue: "sides", lips: "open", x: 150, y: 180, view: "top", top: "sidesBack", depth: 7 },
  edges:     { region: "tongue", name: "Front edges of the tongue", short: "Tongue: front edges",
               where: "The tip of your tongue and its front edges touch the gum above your top front teeth. The air slips out at the sides.",
               feel: "Say أَلْ. Keep your tongue up and feel the air go round the sides.", tongue: "tip", lips: "open", x: 114, y: 186, view: "top", top: "edgesFront", depth: 8 },
  nun:       { region: "tongue", name: "Tip of the tongue on the gum", short: "Tongue: tip (hum)",
               where: "The tip of your tongue touches the gum just behind your top front teeth, and the sound hums in your nose.",
               feel: "Say أَنْ and hum. Now pinch your nose: the hum stops!", tongue: "tip", lips: "open", x: 108, y: 184, view: "side", nose: true, depth: 9 },
  ra:        { region: "tongue", name: "Tip of the tongue, a little further back", short: "Tongue: tip (Ra)",
               where: "The tip of your tongue, a tiny bit further back than Nun, taps the gum once.",
               feel: "Say أَرْ. One gentle tap, not a long roll.", tongue: "ra", lips: "open", x: 116, y: 182, view: "side", depth: 10 },
  ta:        { region: "tongue", name: "Tip of the tongue and roots of the top front teeth", short: "Tongue: tip on teeth roots",
               where: "The tip of your tongue presses where your top front teeth meet the gum, then lets go.",
               feel: "Say أَتْ, then أَدْ, then أَطْ. Same spot! With Tho your mouth feels full.", tongue: "tip", lips: "open", x: 102, y: 188, view: "side", depth: 11 },
  sin:       { region: "tongue", name: "Tip of the tongue near the bottom front teeth", short: "Tongue: tip, whistle",
               where: "The tip of your tongue rests near your bottom front teeth. Your teeth are almost closed and the air whistles through.",
               feel: "Say أَسْ. Can you hear the whistle? Try زَ and صَ too.", tongue: "low", lips: "teeth", x: 96, y: 206, view: "front", depth: 12 },
  tha:       { region: "tongue", name: "Tip of the tongue and edges of the top front teeth", short: "Tongue: tip peeks out",
               where: "The tip of your tongue peeks out and touches the edges of your top front teeth.",
               feel: "Say أَثْ in a mirror. Can you see the tip of your tongue?", tongue: "out", lips: "tongueOut", x: 86, y: 204, view: "front", depth: 13 },
  fa:        { region: "lips",   name: "Bottom lip and top front teeth", short: "Lip and teeth",
               where: "Your top front teeth rest gently on the inside of your bottom lip.",
               feel: "Say أَفْ. Hold your hand in front of your mouth. Feel the air?", tongue: "rest", lips: "f", x: 80, y: 212, view: "front", depth: 14 },
  lips:      { region: "lips",   name: "Both lips", short: "Both lips",
               where: "Your two lips work together.",
               feel: "Watch your lips in a mirror as you say it.", tongue: "rest", lips: "closed", x: 66, y: 206, view: "front", depth: 15 },
  nose:      { region: "nose",   name: "The nose", short: "Nose",
               where: "The hum (ghunnah) lives here. Nun and Mim hum in your nose.",
               feel: "Hum mmm, then pinch your nose. The hum stops!", tongue: "rest", lips: "closed", glow: "nose", x: 54, y: 160, view: "side", depth: 16 },
};

// ---------- The 29 letters ----------
// joins: connects to the next letter (has start and middle shapes)
// near: two letters to compare in "Sound neighbours"
const LETTERS = [
  { id: "alif",   ar: "ا", name: "Alif",   alias: ["alef", "aleph"], spot: "space", joins: false, near: ["hamzah", "ha2"],
    how: "Alif is a long ā. Nothing touches: the sound flows out of the open space.", say: "بَا", noStop: true },
  { id: "ba",     ar: "ب", name: "Ba",     alias: ["baa", "b"], spot: "lips", joins: true, near: ["mim", "fa"], lips: "closed",
    how: "Press both lips together, then pop them open." },
  { id: "ta",     ar: "ت", name: "Ta",     alias: ["taa", "t"], spot: "ta", joins: true, near: ["tho", "tsa"] },
  { id: "tsa",    ar: "ث", name: "Tsa",    alias: ["tha", "thaa", "sa", "th"], spot: "tha", joins: true, near: ["sin", "ta"] },
  { id: "jim",    ar: "ج", name: "Jim",    alias: ["jeem", "j"], spot: "mid", joins: true, near: ["shin", "zai"] },
  { id: "ha",     ar: "ح", name: "Ha",     alias: ["haa", "hha", "ḥa", "h"], spot: "throatMid", joins: true, near: ["ha2", "kho"], heavy: false },
  { id: "kho",    ar: "خ", name: "Kho",    alias: ["kha", "khaa", "kh"], spot: "throatNear", joins: true, near: ["ha", "kaf"], heavy: true },
  { id: "dal",    ar: "د", name: "Dal",    alias: ["daal", "d"], spot: "ta", joins: false, near: ["dhod", "dzal"] },
  { id: "dzal",   ar: "ذ", name: "Dzal",   alias: ["dhal", "thal", "zal", "dh"], spot: "tha", joins: false, near: ["zai", "zho"] },
  { id: "ra",     ar: "ر", name: "Ra",     alias: ["raa", "r"], spot: "ra", joins: false, near: ["lam", "nun"] },
  { id: "zai",    ar: "ز", name: "Zai",    alias: ["zay", "zain", "z"], spot: "sin", joins: false, near: ["dzal", "zho"] },
  { id: "sin",    ar: "س", name: "Sin",    alias: ["seen", "s"], spot: "sin", joins: true, near: ["sod", "tsa"] },
  { id: "shin",   ar: "ش", name: "Shin",   alias: ["sheen", "sh", "syin"], spot: "mid", joins: true, near: ["sin", "jim"] },
  { id: "sod",    ar: "ص", name: "Sōd",    alias: ["sod", "sad", "saad", "ṣad"], spot: "sin", joins: true, near: ["sin", "dhod"], heavy: true },
  { id: "dhod",   ar: "ض", name: "Dhōd",   alias: ["dhod", "dad", "daad", "ḍad", "dhad"], spot: "sides", joins: true, near: ["dal", "zho"], heavy: true },
  { id: "tho",    ar: "ط", name: "Tho",    alias: ["tha", "ṭa", "taa"], spot: "ta", joins: true, near: ["ta", "dal"], heavy: true },
  { id: "zho",    ar: "ظ", name: "Zho",    alias: ["zha", "ẓa", "dza"], spot: "tha", joins: true, near: ["dzal", "dhod"], heavy: true },
  { id: "ain",    ar: "ع", name: "‘Ain",   alias: ["ain", "ayn", "ain"], spot: "throatMid", joins: true, near: ["hamzah", "ghain"] },
  { id: "ghain",  ar: "غ", name: "Ghain",  alias: ["ghayn", "gh"], spot: "throatNear", joins: true, near: ["ain", "kho"], heavy: true },
  { id: "fa",     ar: "ف", name: "Fa",     alias: ["faa", "f"], spot: "fa", joins: true, near: ["ba", "tsa"] },
  { id: "qof",    ar: "ق", name: "Qof",    alias: ["qaf", "qaaf", "q"], spot: "qaf", joins: true, near: ["kaf", "ghain"], heavy: true },
  { id: "kaf",    ar: "ك", name: "Kaf",    alias: ["kaaf", "k"], spot: "kaf", joins: true, near: ["qof", "ta"] },
  { id: "lam",    ar: "ل", name: "Lam",    alias: ["laam", "l"], spot: "edges", joins: true, near: ["ra", "nun"] },
  { id: "mim",    ar: "م", name: "Mim",    alias: ["meem", "m"], spot: "lips", joins: true, near: ["ba", "nun"], lips: "closed", nose: true,
    how: "Close your lips softly and hum. The hum comes from your nose." },
  { id: "nun",    ar: "ن", name: "Nun",    alias: ["noon", "n"], spot: "nun", joins: true, near: ["mim", "lam"] },
  { id: "waw",    ar: "و", name: "Waw",    alias: ["wau", "wow", "w"], spot: "lips", joins: false, near: ["ba", "fa"], lips: "round", also: "space",
    how: "Make your lips round like a little O, without letting them touch. (When Waw is a long ū, it flows from the empty space, like Alif.)" },
  { id: "ha2",    ar: "ه", name: "H̲a",    alias: ["ha", "haa", "hah", "h"], spot: "throatDeep", joins: true, near: ["ha", "hamzah"] },
  { id: "hamzah", ar: "ء", name: "Hamzah", alias: ["hamza", "hamzah"], spot: "throatDeep", joins: false, near: ["ain", "alif"], say: "أَ إِ أُ", noStop: true, noForms: true },
  { id: "ya",     ar: "ي", name: "Ya",     alias: ["yaa", "y"], spot: "mid", joins: true, near: ["jim", "shin"], also: "space",
    how: "The middle of your tongue lifts towards the roof of your mouth. (When Ya is a long ī, it flows from the empty space, like Alif.)" },
];
const BY_ID = Object.fromEntries(LETTERS.map((l) => [l.id, l]));
const BY_CHAR = Object.fromEntries(LETTERS.map((l) => [l.ar, l]));
const regionOf = (l) => REGIONS.find((r) => r.id === SPOTS[l.spot].region);

// Letter with each short vowel: بَ بِ بُ
const sayLine = (l) => l.say || [FATHA, KASRA, DAMMA].map((v) => l.ar + v).join(" ");
// The "stop test": hamzah with fathah, then the letter with sukun (أَبْ) shows where the letter stops
const stopTest = (l) => (l.noStop ? null : HAMZA_ALIF + FATHA + l.ar + SUKUN);

// The four shapes. A letter that doesn't join forwards has only "alone" and "end".
const FORMS = [
  { id: "alone",  name: "Alone",  ms: "Sendiri", make: (c) => c },
  { id: "start",  name: "Start",  ms: "Depan",   make: (c) => c + TATWEEL },
  { id: "middle", name: "Middle", ms: "Tengah",  make: (c) => TATWEEL + c + TATWEEL },
  { id: "end",    name: "End",    ms: "Belakang", make: (c) => TATWEEL + c },
];
const formsOf = (l) => (l.noForms ? FORMS.slice(0, 1) : l.joins ? FORMS : FORMS.filter((f) => f.id === "alone" || f.id === "end"));
const formText = (l, formId) => FORMS.find((f) => f.id === formId).make(l.ar);

// ---------- Stroke guides (DRAFT) ----------
// Points in font units: Amiri Quran at 1000 units, centred on x = 0, baseline y = 0, y grows downwards.
// Each inner array is one stroke, drawn in order. Dots are left to the child after the strokes.
// Order follows the owner's "Write IQRA with Saurus" cards where they show one.
const STROKES = {
  "ا": [[[2, -650], [10, -330], [15, -40]]],
  "ب": [[[402, -330], [418, -170], [350, -80], [180, -45], [0, -30], [-170, -45], [-285, -125], [-305, -265]]],
  "ج": [[[-170, -218], [40, -228], [300, -238]], [[-150, -200], [-230, -20], [-215, 200], [-100, 410], [130, 492], [430, 440]]],
  "د": [[[5, -345], [115, -225], [170, -95], [95, -25], [-100, -40]]],
  "ر": [[[45, -255], [105, -130], [90, 20], [-20, 165], [-150, 205], [-265, 165]]],
  "س": [[[402, -335], [398, -195], [352, -150]], [[245, -305], [232, -180], [170, -145]], [[85, -150], [60, 0], [-50, 165], [-205, 200], [-320, 90], [-342, -150]]],
  "ص": [[[-30, -255], [-5, -150], [20, -95]], [[20, -95], [110, -270], [330, -375], [520, -280], [330, -110], [80, -90]], [[10, -70], [-60, 120], [-250, 205], [-400, 110], [-430, -180]]],
  "ط": [[[-75, -690], [-62, -400], [-50, -110]], [[-40, -95], [80, -230], [230, -310], [300, -230]], [[290, -180], [140, -70], [-20, -20], [-300, -45]]],
  "ع": [[[45, -410], [-70, -420], [-145, -310], [-60, -215], [150, -300]], [[-60, -210], [-180, -40], [-170, 200], [-30, 415], [210, 455], [450, 360]]],
  "ف": [[[300, -210], [255, -330], [345, -425], [440, -325], [405, -165], [240, -75], [0, -30], [-200, -60], [-320, -175], [-350, -300]]],
  "ق": [[[95, -200], [85, -330], [170, -400], [232, -300], [222, -60], [100, 125], [-100, 145], [-230, 40], [-258, -200]]],
  "ك": [[[150, -745], [195, -420], [215, -90], [100, -30], [-250, -45]], [[-75, -555], [-165, -445], [-105, -370]]],
  "ل": [[[175, -700], [190, -400], [190, -110], [120, 40], [0, 62], [-150, 5], [-200, -120], [-170, -280]]],
  "م": [[[-25, -125], [70, -290], [200, -230], [150, -110], [-10, -105], [-60, 100], [-45, 300], [-25, 490]]],
  "ن": [[[160, -410], [205, -200], [150, 10], [0, 50], [-160, -30], [-190, -150], [-150, -270]]],
  "و": [[[30, -120], [60, -250], [150, -262], [180, -120], [100, 60], [-50, 170], [-240, 190]]],
  "ه": [[[0, -320], [-100, -200], [-100, -40], [20, 10], [120, -120], [60, -280], [0, -320]]],
  "ء": [[[70, -280], [-10, -292], [-32, -190], [60, -170], [120, -210], [0, -100], [-90, -10]]],
  "ي": [[[310, -370], [200, -310], [60, -205]], [[80, -185], [230, -150], [300, -60]], [[270, 0], [150, 170], [0, 200], [-200, 130], [-290, 0], [-205, -230]]],
};
// Letters that share a body with another letter share its strokes (the dots differ)
const SAME_BODY = { "ت": "ب", "ث": "ب", "ح": "ج", "خ": "ج", "ذ": "د", "ز": "ر", "ش": "س", "ض": "ص", "ظ": "ط", "غ": "ع" };
const strokesFor = (c) => STROKES[c] || STROKES[SAME_BODY[c]] || null;
