import { isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { useState } from 'react'
import { SafeEmbed } from '../../embed/SafeEmbed.tsx'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal } from '../../motion/Reveal.tsx'
import { SplitScroll } from '../../motion/SplitScroll.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { real, withFallback } from './helpers.ts'

function VideoPoster({
  site,
  videoUrl,
  poster,
}: {
  site: SiteConfig
  videoUrl: string
  poster: ReturnType<typeof withFallback> | undefined
}) {
  const [playing, setPlaying] = useState(false)
  const image = poster ?? mascotImage(site.mascot, 640)

  if (playing) {
    return (
      <SafeEmbed
        site={site}
        embed={{ src: videoUrl, title: `${site.name} video` }}
        className="aspect-video w-full"
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-card bg-paper-2 shadow-soft [&_picture]:contents"
      aria-label="Play video"
    >
      <Picture {...image} className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-sun text-plum shadow-soft transition-transform duration-300 motion-safe:group-hover:scale-110">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  )
}

interface WhatItIsProps {
  site: SiteConfig
  whatItIs: SpokeContent['whatItIs']
}

/** Section 2: what the material is, with the scrolling gallery of real pages. */
export function WhatItIs({ site, whatItIs }: WhatItIsProps) {
  const photos = whatItIs.photos.map(withFallback)
  const body = real(whatItIs.body)
  const title = (
    <h2 className="px-6 font-heading text-5xl font-bold leading-none text-primary md:text-7xl">
      What it is
    </h2>
  )

  return (
    <div>
      {photos.length > 0 ? (
        <SplitScroll photos={photos} title={title} />
      ) : (
        <Container className="text-center">{title}</Container>
      )}
      <Container className="mt-12 max-w-3xl">
        <div className="space-y-5 text-lg text-ink/80 md:text-xl">
          {body.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        {!isPlaceholder(whatItIs.sources) ? (
          <Reveal>
            <p className="mt-8 border-l-4 border-sun pl-4 text-sm text-ink/60">{whatItIs.sources}</p>
          </Reveal>
        ) : null}
        {whatItIs.videoUrl ? (
          <Reveal slow className="mt-10">
            <VideoPoster site={site} videoUrl={whatItIs.videoUrl} poster={photos[0]} />
          </Reveal>
        ) : null}
      </Container>
    </div>
  )
}
