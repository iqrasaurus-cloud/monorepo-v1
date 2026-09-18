import work1 from '@/assets/work1.jpg'
import work2 from '@/assets/work2.jpg'
import work3 from '@/assets/work3.jpg'
import work4 from '@/assets/work4.jpg'
import work5 from '@/assets/work5.jpg'
import work6 from '@/assets/work6.jpg'
import breakImg from '@/assets/break.jpg'

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  img: string
  client: string
  deliverables: string[]
  description: string[]
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'chromatic-drift',
    title: 'Chromatic Drift',
    category: 'Brand Identity',
    year: '2026',
    img: work1,
    client: 'Lumen Optics',
    deliverables: ['Strategy', 'Visual Identity', 'Motion System', 'Guidelines'],
    description: [
      'Lumen Optics came to us as a precision lens manufacturer with a problem: their brand felt like a lab report. We rebuilt the identity around the physics of their craft — refraction, dispersion, the moment light becomes color.',
      'The liquid-chrome mark shifts hue depending on context, rendered in real time across every touchpoint from packaging to the trade-show booth. A strict grotesque type system keeps the fluid imagery grounded.',
    ],
    gallery: [work4, work2],
  },
  {
    slug: 'grotesk-no9',
    title: 'Grotesk No.9',
    category: 'Editorial Design',
    year: '2025',
    img: work2,
    client: 'Verlag Modern',
    deliverables: ['Editorial Design', 'Typography', 'Print Production'],
    description: [
      'An annual anthology of Swiss typographic research, published by Verlag Modern. Issue nine interrogates the grotesque revival — 240 pages of specimens, essays and archival material.',
      'We set the entire book in a single type family at nine sizes, letting hierarchy come from scale and space alone. The red dot, a nod to the Bauhaus centenary posters, became the issue\'s signature.',
    ],
    gallery: [work5, work1],
  },
  {
    slug: 'second-skin',
    title: 'Second Skin',
    category: 'Art Direction',
    year: '2025',
    img: work3,
    client: 'Atelier Blanche',
    deliverables: ['Art Direction', 'Campaign', 'Photography Direction'],
    description: [
      'Atelier Blanche\'s sculptural garments deserved a campaign that treated fabric like architecture. We shot the collection against raw brutalist concrete, one hard light source, no retouching of the shadows.',
      'The campaign ran across print, out-of-home and a microsite where each look deconstructs as you scroll — garment to geometry to raw pattern.',
    ],
    gallery: [work6, work3],
  },
  {
    slug: 'prism-study',
    title: 'Prism Study',
    category: '3D & Motion',
    year: '2026',
    img: work4,
    client: 'Self-initiated',
    deliverables: ['3D', 'Motion', 'Sound Design'],
    description: [
      'A self-initiated R&D film exploring how light behaves inside imperfect glass. Sixty seconds of physically-accurate caustics, rendered over three weeks and scored with processed field recordings.',
      'The study now opens our showreel and its techniques fed directly into client work — most visibly the Chromatic Drift identity system.',
    ],
    gallery: [work1, work6],
  },
  {
    slug: 'concrete-poetry',
    title: 'Concrete Poetry',
    category: 'Web Experience',
    year: '2024',
    img: work5,
    client: 'Fondation Béton',
    deliverables: ['Web Design', 'Creative Development', 'WebGL'],
    description: [
      'Fondation Béton archives post-war brutalist architecture. We built them a digital atlas where 200 buildings are navigable through a single continuous camera movement — no page loads, just one long descending shot.',
      'Each structure is modeled as a low-poly silhouette that sharpens into photography as you approach. Site of the Day, and still our most-visited case study.',
    ],
    gallery: [work3, work4],
  },
  {
    slug: 'neon-ritual',
    title: 'Neon Ritual',
    category: 'Installation',
    year: '2025',
    img: work6,
    client: 'Galerie Huit',
    deliverables: ['Spatial Design', 'Interactive', 'Creative Direction'],
    description: [
      'Galerie Huit asked for an opening-night piece people would queue for. We answered with a 24-meter tunnel of addressable LED that breathes with the crowd — density sensors drive the color temperature from cold blue to ritual magenta.',
      'Over 9,000 visitors in three weeks. The installation\'s control system is now a product the gallery licenses to other spaces.',
    ],
    gallery: [work2, work5],
  },
]

export interface Article {
  slug: string
  title: string
  date: string
  tag: string
  img: string
  excerpt: string
  quote: string
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'start-on-paper',
    title: 'Why we still start every identity on paper',
    date: 'Jun 2026',
    tag: 'Process',
    img: work2,
    excerpt:
      'Screens make everything look finished too early. Paper keeps ideas honest — and disposable enough to kill the weak ones.',
    quote: 'A sketch you can crumple is worth ten artboards you can\'t bear to delete.',
    body: [
      'Every identity project at KERN begins the same way: two days, no computers. Just markers, tracing paper, and a wall. It sounds romantic, but the reason is brutally practical — screens make everything look finished too early. A logo roughed into Figma inherits polish it hasn\'t earned yet, and polish is how mediocre ideas survive.',
      'On paper, an idea is exactly as strong as its silhouette. If the mark doesn\'t hold at thumbnail size in a dying marker, no amount of bezier-tuning will save it. We typically fill forty to sixty sheets before anything is scanned, and the wall review is deliberately ruthless — anything that needs a verbal explanation gets binned.',
      'The other benefit is speed of disposal. Designers fall in love with what they\'ve invested time in. A sketch takes ninety seconds, so killing it costs nothing. An artboard takes an afternoon, so it lingers for weeks. Paper keeps our ideas honest — and disposable enough that only the strong ones make it to the screen.',
    ],
  },
  {
    slug: 'shaders-for-designers',
    title: 'Shaders for designers: a gentle on-ramp to WebGL',
    date: 'Apr 2026',
    tag: 'Technology',
    img: work4,
    excerpt:
      'You already think in gradients, masks and blend modes. GLSL is the same vocabulary — you\'re just painting with math.',
    quote: 'A gradient you can animate per-pixel is a design tool, not an engineering one.',
    body: [
      'Most designers we meet treat WebGL as someone else\'s department. But if you understand gradients, masks and blend modes — and you do — you already think like a shader author. A fragment shader is simply a function that answers one question for every pixel: what color are you?',
      'Start with u_time and a sine wave and you have motion. Add noise and you have texture. Feed it your brand palette and suddenly your identity system isn\'t a static PDF — it\'s a living material that responds to cursor, scroll and sound. That\'s how the Chromatic Drift mark works: one shader, infinite on-brand variations.',
      'The learning curve is real but shorter than its reputation. Two weekends with The Book of Shaders and you\'ll out-produce most template-based motion tools. Our advice: don\'t learn "graphics programming." Learn to paint with math, one gradient at a time.',
    ],
  },
  {
    slug: 'installation-taught-ux',
    title: 'What installation art taught us about UX',
    date: 'Feb 2026',
    tag: 'Culture',
    img: work6,
    excerpt:
      'Nobody reads instructions in a gallery. The piece either pulls you in or it doesn\'t — websites work exactly the same way.',
    quote: 'Nobody reads instructions in a gallery. Nobody reads them on your homepage either.',
    body: [
      'Building Neon Ritual for Galerie Huit changed how we design interfaces. In a gallery, there is no onboarding flow. The work has about four seconds to pull someone across the threshold, and the only feedback mechanism is whether they stay or drift to the next room. Watching 9,000 people make that choice teaches you things no analytics dashboard will.',
      'The first lesson: response beats instruction. The tunnel never explained itself — it simply reacted to your presence, and reaction invites play. We now build interfaces the same way: hover states that answer immediately, scroll that acknowledges velocity, buttons that feel pressed before they\'re clicked.',
      'The second: pacing is a feature. The installation breathed slower as crowds grew, and dwell time doubled. Digital products have the same lever — animation timing, reveal order, even scroll friction. UX isn\'t the map of a space. It\'s the tempo of moving through one.',
    ],
  },
  {
    slug: 'boring-websites-manifesto',
    title: 'In defense of the boring website (sometimes)',
    date: 'Dec 2025',
    tag: 'Opinion',
    img: breakImg,
    excerpt:
      'Not every page needs a WebGL hero. The most radical thing you can ship is often the one that loads in 400ms and just works.',
    quote: 'Restraint is a design decision too — it just doesn\'t screenshot as well.',
    body: [
      'This will sound odd coming from a studio that builds scroll-jacked, shader-driven showpieces: most websites should be boring. A checkout flow, a government form, a hospital booking system — the most radical thing you can ship there is a page that loads in 400 milliseconds and behaves exactly as expected.',
      'The craft doesn\'t disappear in boring work; it moves underground. Type scale, focus order, error copy that sounds human, a DOM that a screen reader can parse without tears. These decisions are invisible when done well, which is precisely why they\'re hard to sell — nobody screenshots a perfect tab order.',
      'Our rule of thumb: spectacle belongs where attention is the goal — campaigns, portfolios, launches. Everywhere else, earn trust with speed and clarity, then hide exactly one moment of delight where nobody expects it. Boring is a baseline, not a failure. Restraint is a design decision too.',
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
export const nextProject = (slug: string) =>
  projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length]
export const nextArticle = (slug: string) =>
  articles[(articles.findIndex((a) => a.slug === slug) + 1) % articles.length]
