import { RevealItem, RevealList } from '../../motion/Reveal.tsx'

interface Stat {
  value: string
  label: string
}

/** Key numbers pulled out of a paragraph as a quick-glance row, e.g. "40 Pages". */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <RevealList className="mb-8 grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="rounded-card bg-paper-2 px-3 py-6 text-center">
          <p className="font-heading text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
          <p className="label mt-2 text-ink/60">{stat.label}</p>
        </RevealItem>
      ))}
    </RevealList>
  )
}
