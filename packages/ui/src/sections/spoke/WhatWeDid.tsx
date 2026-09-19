import type { SiteConfig, SpokeContent } from '@iqra/config'
import { useState } from 'react'
import { SafeEmbed } from '../../embed/SafeEmbed.tsx'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal } from '../../motion/Reveal.tsx'
import { SplitScroll } from '../../motion/SplitScroll.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'
import { withFallback } from './helpers.ts'
import { StatStrip } from './StatStrip.tsx'

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
        <span className="flex size-20 items-center justify-center rounded-full bg-sun text-plum shadow-soft transition-transform duration-300 group-hover:scale-110">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  )
}

interface WhatWeDidProps {
  site: SiteConfig
  whatWeDid: SpokeContent['whatWeDid']
}

export function WhatWeDid({ site, whatWeDid }: WhatWeDidProps) {
  const photos = whatWeDid.photos.map(withFallback)
  const title = (
    <div className="px-6">
      <Eyebrow className="mb-4 justify-center">In practice</Eyebrow>
      <h2 className="font-heading text-5xl font-bold uppercase leading-none text-primary md:text-7xl">
        What we did
      </h2>
    </div>
  )

  return (
    <div>
      {photos.length > 0 ? (
        <SplitScroll photos={photos} title={title} />
      ) : (
        <Container className="text-center">{title}</Container>
      )}
      <Container
        className={cn(
          'mt-12',
          whatWeDid.videoUrl ? 'grid gap-10 lg:grid-cols-[1fr_1fr]' : 'mx-auto max-w-3xl',
        )}
      >
        <div className="space-y-5 text-lg text-ink/80">
          {whatWeDid.stats ? <StatStrip stats={whatWeDid.stats} /> : null}
          {whatWeDid.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        {whatWeDid.videoUrl ? (
          <Reveal slow>
            <VideoPoster site={site} videoUrl={whatWeDid.videoUrl} poster={photos[0]} />
          </Reveal>
        ) : null}
      </Container>
    </div>
  )
}
