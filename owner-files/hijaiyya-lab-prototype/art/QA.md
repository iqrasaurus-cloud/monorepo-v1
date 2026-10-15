# Final QA — 15 October 2026

**Visual delivery complete. Asatizah teaching review pending.** Colour expansion and print variants were authorised by the owner’s instruction to proceed to the end.

## Completeness

- 29 letters and exactly 101 valid contextual forms. No invalid Start/Middle forms for Alif, Dal, Dzal, Ra, Zai or Waw; Hamzah has only Alone.
- 606 colour glyph SVGs (3 styles × 2 layouts), 202 B&W glyph SVGs.
- 87 colour form strips plus 29 matching B&W strips, all on one 1200 × 352 native canvas. Only valid frames appear, aligned to the right.
- 29 proposed stroke-order plans; 58 colour tracing SVGs and 58 B&W tracing SVGs covering both layouts.
- 17 sound-spot IDs; 37 layered colour mouth views and 37 B&W variants. Includes lateral alternatives, front lip/tooth/tongue views and seven explicitly secondary-posture overlays.
- Five feel-it prompts in colour and B&W.
- **1,124 SVG definitions, 1,917 PNG exports and 748 WebP fallbacks.**

## File/geometry checks

Every PNG has a real transparent exterior, fully opaque interior ink/fill, correct intended dimensions and visible bounds clear of the canvas edge. B&W PNGs have no chromatic pixels. Source path/transform geometry is identical across solid, reversed, outline and B&W glyph styles. Font extraction fails on missing glyphs; no missing glyphs occurred. Native counters/dots were retained, not raster-redrawn.

Largest colour mouth SVG: **27,983 bytes**, below 40,000. Largest colour mouth WebP: **59,948 bytes**, below 60,000, including 1600px fallbacks. SVG/PNG remain lossless masters. WebPs may use lossy RGB with retained alpha to meet the requested budget. SHA-256 hashes were rechecked for every delivered PNG and WebP after the final refinements.

39 manually proposed body/internal-mark routes were constrained to native glyph ink; dot centres are located from the real font rendering and placed last. This geometry validation does **not** establish a universal or teacher-approved handwriting order. Manually proposed pre-adjustment routes are retained in `stroke-proposals.json` for review.

## Browser and integration checks

- 808 valid glyph/form/style/layout combinations loaded, including B&W.
- All 17 side-view motion examples tested. Head groups remained unchanged; tongue travel is 650ms; Ra is one contact and return; reduced motion is a 140ms fade. Regional/static maps fade rather than pretending to show lateral movement in the wrong plane.
- Lip-state crossfade updates its explanatory labels and preserves unique SVG IDs.
- Alif, Hamzah and Dhōd colour/B&W form strips checked after the fixed-canvas refinement.
- No JavaScript errors; no horizontal overflow at 390px viewport. Desktop/mobile screenshots are in `qa/`.
- React example passed a strict TypeScript check with zero diagnostics. It has not been installed into or end-to-end tested inside the source app.

## Visual review

Inspected all 29 multi-style letter contacts, all 29 tracing proposals, all 37 colour mouth variants, all 37 B&W mouth variants, all five feel-it prompts, and the non-joining/full-strip layouts. Tracing routes extending outside glyphs and the front-view narrow air gap were refined during review. Native B&W samples were compared for line clarity, white fill regions and genuine external transparency.

## Honest limits and handoff

Every mouth picture still says **DRAFT: for asatizah review**. The diagrams are 2D schematics, not measured medical anatomy or an authentic 3D mouth rig. A side view cannot display literal lateral Dhōd contact; use the top view. Heavy-letter overlays are secondary-posture cues, not a shared primary makhraj. Pronunciation, age suitability, child wording and handwriting convention need the project’s teacher approval. No speech-recognition or tracing-scoring accuracy is claimed.

Original physical Read/Write IQRA card photos and separate source PDFs were not supplied in this message; exact card matching cannot be certified. The live app at localhost:4614 was inspected read-only. Its on-screen Dhōd passage correctly includes the full surah; the supplied print screenshot incorrectly asks for Dhōd in ayat 1–5. See `review.md` for that finding and suggested improvements.

No source-app files, checked Quran data or recordings were changed. No Quran ayah, ayah word or translation is baked into these images. No paid plugin or external image API was used.
