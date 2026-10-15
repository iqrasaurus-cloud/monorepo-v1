Bismillah. Please help me make better visuals for **Hijaiyya Lab**, a children's app from IqraSaurus, a family-led Islamic education project in Singapore. Children aged about 4 to 9 learn the 29 hijaiyyah letters in four steps:
1. Meet the letter and spot it in a surah they know.
2. Find where its sound comes from in the mouth (makhraj).
3. Write it by tracing.
4. Say it and teach someone.

I'm attaching:
- screenshots of the working app, as listed at the end;
- sample printed PDFs;
- photos of our original printed cards: "Read IQRA with Saurus" (Sound Spot head cards) and "Write IQRA with Saurus" (big tracing cards with numbered red arrows).

The app's flow is good. The pictures need to be sharper, clearer and more appealing for children, parents and teachers. Please work in three parts, and do each part in rounds: show me a few samples first, then do the full set once I approve.

---

## Rules for every part (please follow these strictly)

1. **Arabic must be exact.** Image generators often draw Arabic letters wrongly. For anything containing Arabic letters, **do not paint the letters with image generation.** Write code (Python with fontTools, or SVG) that renders the real glyphs from a font, so every curve and dot is correct.
   - Use **Amiri Quran** (SIL Open Font License), the font the app already uses.
   - If you suggest another font, tell me its licence first.
2. **Do not write any Quran ayah, word from an ayah, or translation** in any image. The app adds ayat itself from our checked data. Single letters, the letter with vowel marks (بَ بِ بُ), and the joining line (tatweel ـ) are fine.
3. **No pictures of real people, and no photo-real faces.** The mouth drawings should be a friendly flat cartoon of a child's head and mouth, like the attached cards but nicer.
   - Never show prophets or companions.
   - Our mascot is a purple dino. It may appear as a guide beside a drawing, but not as the mouth being explained.
4. **Tajwid accuracy.** Place each sound spot following the standard teaching of the 17 makharij (Ibn al-Jazari). Mark every mouth picture "DRAFT: for asatizah review". If anything in our app looks wrong, please say so.
5. **Transparent backgrounds** for every PNG. Use one canvas size and one baseline for each set, so pictures line up and can be swapped or animated in the app.
6. **Brand colours:**

   | Token | Hex | Use |
   |---|---|---|
   | paper | `#f6f4ee` | page |
   | ink | `#354f52` | text |
   | plum | `#441c4b` | |
   | purple | `#5c3d8f` | |
   | sun | `#ffe45d` | |
   | Inspire | `#f9d648` | 4-I yellow |
   | Investigate | `#5c3d8f` | 4-I purple |
   | Integrate | `#2f6f73` | 4-I teal |
   | Impart | `#b0359f` | 4-I magenta |
   | arrows | `#e2231a` | tracing red |

   Mouth drawings now use: line blue `#1f8fc9`, inside of the mouth pink `#fbe3e6`, tongue `#f19aa8` with outline `#c0566b`, air in the nose `#dff1fb`, and the sound-spot dot magenta `#b0359f`.
7. **Fonts for any English labels:** Fredoka (headings) and Nunito Sans (text). Keep the words short and concrete.

---

## Part 1: The hijaiyyah letters (crisp, transparent PNG and SVG)

What is unclear now: the bubble outline makes the joined shapes (start, middle, end) look blobby. Loops close up, dots merge into the body, and children can't see how one letter changes shape inside a word. See the screenshots of Dhōd's middle shape and the "All its shapes" layout.

**Make every letter in four shapes:** Alone, Start, Middle, End.
- Six letters don't join forwards: ا د ذ ر ز و. They have only Alone and End.
- ء (Hamzah) has only Alone.
- The 29 letters, with the names we use: Alif ا, Ba ب, Ta ت, Tsa ث, Jim ج, Ha ح, Kho خ, Dal د, Dzal ذ, Ra ر, Zai ز, Sin س, Shin ش, Sōd ص, Dhōd ض, Tho ط, Zho ظ, ‘Ain ع, Ghain غ, Fa ف, Qof ق, Kaf ك, Lam ل, Mim م, Nun ن, Waw و, H̲a ه, Hamzah ء, Ya ي.

**In three styles:**
1. **Solid:** a black letter on transparent.
2. **Reversed:** a white letter on transparent, for dark or coloured backgrounds.
3. **Outline for tracing:** a hollow letter with an even, smooth outline and a white inside, wide enough for a child's finger or pencil.
   - Loops (ص ض ط ظ ف ق م و ه) must stay open.
   - Dots must stay separate from the body.
   - For the joined shapes, show the joining line (tatweel) as a thin, light-grey stub, so the child sees where the letter holds hands with its neighbour.

**Plus two extras:**
- A tracing variant of the Alone shape with a red start dot, numbered stroke arrows (1, 2, 3) and the dots placed last, like our "Write IQRA" cards. Please propose the stroke order for each letter and list it, so our teacher can check it. Our cards draw Jim's top line left to right; please flag any letter where common practice differs.
- A "how it changes" strip for each letter: the four shapes in one row, read right to left (Alone, Start, Middle, End). Each shape is in its own rounded frame with a small English label underneath.

**Output:**
- **Files:** a Python script (fontTools and Pillow, or cairosvg) that makes all of them, so we can re-run it, plus a zip of the results.
  - SVG for each.
  - Transparent PNG at 512 px (screen) and 2048 px (print).
  - WebP at 512 px.
- **Two layouts of each file:**
  - "Fitted": trimmed to the ink with even padding.
  - "Aligned": every letter on the same square canvas with the same baseline and size, so a row of letters lines up.
- **File names:** `<letter-id>-<shape>-<style>.png`, for example `ba-middle-outline.png`, `ha2-end-reversed.png`. The letter ids are: alif ba ta tsa jim ha kho dal dzal ra zai sin shin sod dhod tho zho ain ghain fa qof kaf lam mim nun waw ha2 hamzah ya.
- **Round one:** show Ba, Jim, ‘Ain, Dhōd, H̲a and Kaf in all shapes and styles before doing the rest.

---

## Part 2: Better mouth drawings and movement (web-optimised)

Look at the attached Sound Spots screenshots: the side view with the moving tongue, the view from above for Lam and Dhōd, and the front view of the lips. They work, but they look basic. Please propose and make a nicer, more child-friendly set that is still easy for a parent or teacher to explain. Keep it clear and calm: softer shapes, gentle shading, and big readable labels, not a medical textbook.

**Views to make:**
1. **Side view (cut through the middle):** the lips, teeth, gum ridge, hard roof, soft roof, tongue, the three levels of the throat, and the nose passage.
2. **Top view (looking down at the tongue inside the teeth):** needed for Lam (the front edges of the tongue, air going round the sides) and Dhōd (one or both sides of the tongue against the top back teeth: show left, right and both).
3. **Front view of the mouth:** lips closed (Ba, Mim), lips round (Waw), top teeth on the bottom lip (Fa), tongue tip peeking between the teeth (Tsa, Dzal, Zho), teeth almost closed (Sin, Zai, Sōd), tongue tip up behind the top teeth (Ta, Dal, Tho, Nun, Lam, Ra).
4. **A cross-section or 3D-style view, if you think it helps:** for example, a cutaway showing how the back of the tongue rises for the "heavy" letters (خ ص ض غ ط ق ظ).

**Sound spots to show (the ids we use in code):**

| Id | Where | Letters |
|---|---|---|
| `space` | the empty space of mouth and throat (al-jawf) | ا, and long و ي |
| `throatDeep` | deepest throat | ء ه |
| `throatMid` | middle throat | ع ح |
| `throatNear` | top of the throat | غ خ |
| `qaf` | very back of the tongue, soft roof | ق |
| `kaf` | back of the tongue, a little forward | ك |
| `mid` | middle of the tongue, hard roof | ج ش ي |
| `sides` | side of the tongue, back teeth | ض |
| `edges` | front edges of the tongue | ل |
| `nun` | tip of the tongue, gum, with a hum in the nose | ن |
| `ra` | tip of the tongue, a little further back, one tap | ر |
| `ta` | tip of the tongue, roots of the top front teeth | ت د ط |
| `sin` | tip of the tongue near the bottom front teeth, a whistle | س ز ص |
| `tha` | tip of the tongue on the edges of the top teeth | ث ذ ظ |
| `fa` | top teeth on the bottom lip | ف |
| `lips` | both lips | ب م و |
| `nose` | the nose (ghunnah): the hum of ن and م | |

**What I need:**
- **SVG first, in layers.** Make the head, teeth, roof of the mouth, tongue, lips, the glowing spot and the air-flow arrows separate, named groups. Our code can then move the tongue between positions (rest, tip-up, Ra tap, tip-low, tip-out, middle-up, Kaf, Qof, sides) and switch lip shapes.
  - Keep the head in exactly the same place in every frame.
  - Please also give simple code (CSS or JavaScript, or Lottie JSON if you prefer) showing the tongue moving from rest to each spot. Keep it to 1 second or less, and have it fall back to a simple fade when the device asks for reduced motion.
- **PNG and WebP fallbacks:** transparent, at 800 px and 1600 px, one per spot and view, named `<spot-id>-<view>.png` (for example `edges-top.png`, `fa-front.png`).
- **Web limits:** each WebP under about 60 KB, each SVG under about 40 KB.
- **"Feel it" icons:** small friendly pictures for:
  - fingers on the throat;
  - a hand mirror;
  - a hand in front of the mouth feeling air;
  - pinching the nose (for the hum of ن and م);
  - a whistle (for س ز ص).
- **Round one:** show the side view for `qaf`, `ta` and `lips`, the top view for `sides` and `edges`, and the front view for `fa`. Then I'll decide on the style.

---

## Part 3: Black-and-white versions for printing (only after I approve Part 2)

Once I confirm the colour style, make black-and-white line-art versions of the approved mouth drawings and the letter sets. They will go into our printables:
- black lines, white fill areas, transparent background;
- clean enough to colour in;
- line weight and look matching our existing black-and-white dino line art (I'll attach a sample);
- the sound spot shown as a small black ring or dot that a child can colour in;
- the same file names as the colour set, ending in `-bw` (for example `edges-top-bw.png`);
- transparent PNG at 2048 px, plus SVG.

Please don't start Part 3 until I say the colour style is approved.

---

## Part 4: Look again and suggest

After going through the attachments, list any other improvements or visuals that would help:
- for the letter journey (the four steps);
- for the sticker map, which goes from the throat to the lips;
- for the printed sheets.

For each idea, say who it helps (child, parent or teacher) and how big a job it is. Please also point out anything in our current drawings that looks wrong for tajwid.

---

## Attached screenshots (taken from the app running on my computer)
- Home page with the sticker map
- A letter's Inspire step (the four shapes and the spot-it-in-a-surah box)
- Investigate step for Dhōd (side view and view from above) and for Sōd (front view)
- Write with Saurus: "All its shapes" for Ba, ‘Ain and Dhōd (outline and faint levels)
- Sound Spots page (side view with the spot buttons)
- Printed samples: a letter sheet, tracing rows, the sticker map and the sound-spot chart (PDF)
- Photos of our original "Read IQRA with Saurus" and "Write IQRA with Saurus" cards

JazakAllahu khayran.
