# Hijaiyya Lab (prototype, 2026-10-14)

One letter tool built from two of the owner's own products:
- **Read IQRA with Saurus**: the Sound Spot cards (makhraj).
- **Write IQRA with Saurus**: the big tracing cards with numbered red arrows.

It is not part of any site yet. Nothing here is committed or published.

## Try it
- Run the `hijaiyya-lab-proto` preview (port 4614), or serve this folder with any static server.
- `samples/` has printed PDFs made with it: all 29 letter sheets, a colour A5 letter sheet, tracing rows, big A5 tracing cards, the sticker map, a sticker sheet and the sound-spot chart.

## The idea in one line
Every letter gets one journey through 4-I. Each step uses a different skill, and the letter's sticker is earned when all four are done.

| Step | What the child does | Skill |
|---|---|---|
| **Inspire** | Meets the letter's shapes (alone, start, middle, end). Guesses where its sound comes from. Hunts for it in a surah they already recite, then counts it. | reading, exploring |
| **Investigate** | Taps the right spot on a mouth picture and watches the tongue move there. Then feels it: fingers on the throat, a mirror, or the stop test (أَبْ). Side, top and front views. | pronouncing |
| **Integrate** | Traces the letter with arrows, then with less help each time. Also "Sound neighbours": do ت and ط come from the same spot? (Yes; ط is heavy.) | writing, comparing |
| **Impart** | Records themself and listens back. Teaches someone the spot and the strokes. A grown-up gives the sticker. | speaking, teaching |

There are three ways in besides the letter journey. Each one also works on its own:
- **Write with Saurus.** Tracing practice with settings:
  - letters, one or many, or a whole mouth group;
  - shapes: alone, start, middle and end;
  - layout: one big letter, a practice row, all of a letter's shapes, or many letters;
  - help: arrows, outline, faint, or by myself;
  - pencil: crayon, marker, rainbow or sparkle;
  - colour, thickness and paper (sky, sand, grass, night).

  **Check** gives up to 3 stars. It looks at how much of the letter was covered, how much went outside the lines, whether the child started at the red dot, and whether the dots were added. **Show me** draws the strokes in order.
- **Sound Spots.** A labelled mouth with every spot. Tap a dot to see which letters live there.
- **Spot it in the Quran.** 21 familiar surahs. Pick a letter, tap every word that has it, and count it. The numbers next to each letter show how often it appears.

Search (on the home page, and the magnifier in the top bar) finds:
- letters, in either spelling (`tsa`, `tha`, `ث`);
- mouth parts, in English or Malay (`lips`, `kerongkong`);
- surahs and activities (`write`, `tulis`, `colour`);
- the other tools (`count` finds Numbers & Counting, `hafal` finds Mini Hafiz).

A letter result also offers that letter in Write, in a surah, and in Hijaiyya Hunt.

**Printables:** each one works in A4 or A5, in black and white or colour.
- One 4-I sheet per letter (or all 29 as a booklet).
- Tracing sheets, made from whatever was chosen in Write.
- A sticker map poster (the paper twin of the on-screen map).
- A sheet of 30 round stickers.
- A sound-spot chart.

## How it fits with the other tools (complementary, not a copy)
- **Hijaiyya Hunt** (prototype) is about seeing a letter in a picture. Hijaiyya Lab is about saying and writing it. Search links each letter straight to its Hunt worksheet.
- **Quran Investigator** booklets: their "letter hunt" page and this tool's "Spot it" use the same counting. A booklet could add a "write the letter of the week" row using these tracing pictures.
- **Mini Hafiz:** "Spot it" uses the surahs a child is memorising, so a letter is met inside ayat they know. The real tool can open on the child's current Mini Hafiz surah.
- **Numbers & Counting:** "How many ب in Al-Ikhlas?" is a counting task, and the answer links there.
- **Colouring:** the outline level with the crayon pen is colouring a big letter. The printed big letters are colouring pages too.
- **Calendar:** a "letter of the week" could sit beside key days, so it's practised a little every day.
- **One alphabet file for every tool:** `letters.js` holds names, shapes, sound spots and strokes. In the tools repo it should become one shared package, so Hunt, Lab, Investigator and Mini Hafiz all use the same names and spellings.

## Follows the shared tool standard (2026-10-14)
- **Top bar:** logo and tool name on the left; search (it drops from the top) and settings on the right; the menu underneath.
- **Settings order:** the tool's own choices (pencil, paper, size), then Who's learning, Display, Sound, For grown-ups, Help & About. Who's learning, Display and Sound are placeholders that point to the shared settings.
- **Progress, from the child's side:**
  - The collection is "My sticker map".
  - One item per meaningful step: each of the 4 steps per letter fills a quarter of that letter's ring.
  - The letter's sticker comes when all four are done.
  - **Group badges:** finishing every letter in one part of the mouth (for example the whole throat) earns that group's badge. This answers the suggestion of "one sticker per group of letters". Both levels are kept: a child needs a reward within one sitting, and a letter takes about that long.
  - The app never takes anything away. In Settings, holding "For grown-ups" for 2 seconds opens that section; clearing progress there needs its own button and a "Yes, clear it", as in the other tools.
  - Saved on the device.
  - The paper twin is the printed sticker map.

## What is a DRAFT and needs checking before anything goes live
1. **Makhraj wording for children** (`SPOTS` in `letters.js`). The 17 makharij are simplified into child-sized spots that can be felt. An ustaz or ustazah should check every line, the dot positions, and which letters are paired as "sound neighbours".
2. **Alif: decided (owner, 2026-10-14).** Alif sits in "the empty space" (al-jawf), as most tajwid books teach the madd letters. Hamzah stays in the deepest part of the throat.
3. **Stroke order** (`STROKES` in `letters.js`). It follows your Write cards where they show it, for example Jim is drawn as 1 top line, then 2 the curve. Your cards draw Jim's top line from left to right; many handwriting books start it from the right. Please confirm. Arrows only exist for the "alone" shapes. Start, middle and end shapes have a start dot but no arrows yet.
4. **The letter shapes** come from the Amiri Quran font, so they match the mushaf style the tools already use. Your cards use a heavier font. If you have the original vector files (AI/EPS/SVG), the arrows can be copied from them exactly.
5. **Audio:** each letter now has a short recording (about half a second) from the open-source belajar-ngaji project. See `audio/CREDITS.md`.
   - **Licence:** that repo's LICENSE file names "Materialize" (the CSS framework), and it doesn't say who recorded the voices. Please confirm with the author, or swap in your own recordings, before going live.
   - **Asatizah check:** the pronunciation in each clip should be checked as well.
   - **Swapping one in:** drop a new file in with the same name (for example `audio/ba.mp3`). No code changes are needed.

## Files
- `index.html`: page and styles.
- `letters.js`: the 29 letters, sound spots and stroke guides.
- `mouth.js`: the mouth drawings.
- `app.js`: everything else.
- `quran.js` is generated by `extract-quran.mjs` from the Quran Investigator prototype's data, which itself comes from `tadabbur-for-kids-v1` source-data. The Arabic is copied by program, never typed.

## Line art on paper (done 2026-10-14, owner's go-ahead)
Every printable now uses the shared black-and-white line-art dinos from `tadabbur-for-kids-v1/packages/design/assets/lineart/poses/`, at print size. They are copied into `img/lineart/`, with their sizes taken from the library's `manifest.json`.

| Sheet | Dino |
|---|---|
| Letter sheets and tracing sheets | writing |
| Letter sheet, beside the sticker circle | cheering |
| Sticker map | treasure map |
| Sticker sheet | trophy |
| Sound-spot chart | thinking |

The screens still use the colour dinos, as the library's rules ask.

Still to do, if wanted: when a letter is finished, a line-art dino could fade into its colour twin.

## Visual pass and additions (2026-10-14, second round)
- **Letters sit in the middle of their boxes everywhere:** letter picker, stickers, shape tiles, the sticker map and the sticker sheet. Each letter is now drawn fitted to its own ink, instead of sitting on the font's line.
- **Bubble letters are thinner,** and thinner again for joined shapes. Loops (as in ص and ض) and dots no longer merge into one blob.
- **Sound Spots** has one button per spot, grouped by part of the mouth, each showing its letters. The chosen dot is big and coloured, the others small and faint, and the tongue moves to the chosen spot. A "Listen" button is added for each letter there.
- **Tap to hear:** tapping the big letter on a letter's page plays its sound.
- **Reward:** when a sticker is earned, a black-and-white line-art dino fills with colour (a gentle fade).
- **Fixes:** the stray "‹" mark on the next and previous buttons, the cut-off "Throat" label, and a scrollbar showing under the menu on phones.
