import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { getArticle, nextArticle } from '@/data/content'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = getArticle(slug ?? '')

  if (!article) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl font-extrabold uppercase">Article not found</h1>
        <Link to="/journal" data-hover className="link-sweep mt-6 font-mono2 text-xs uppercase tracking-[0.3em] text-[#ff4d00]">
          ← All articles
        </Link>
      </main>
    )
  }

  const next = nextArticle(article.slug)

  return (
    <main className="pt-32 md:pt-40">
      <article className="px-6 md:px-10">
        <Link to="/journal" data-hover className="link-sweep font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/50">
          ← Journal
        </Link>

        <div className="mx-auto mt-10 max-w-4xl">
          <motion.div
            className="flex items-center gap-4 font-mono2 text-[11px] uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#ff4d00]">{article.tag}</span>
            <span className="text-[#ece9e4]/40">{article.date}</span>
          </motion.div>

          <motion.h1
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-relaxed text-[#ece9e4]/60 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {article.excerpt}
          </motion.p>
        </div>
      </article>

      <motion.div
        className="mt-14 aspect-[16/9] w-full overflow-hidden"
        initial={{ clipPath: 'inset(8% 4% 8% 4%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ delay: 0.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <img src={article.img} alt={article.title} className="h-full w-full object-cover" />
      </motion.div>

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-lg leading-relaxed text-[#ece9e4]/85 md:text-xl">
          <span className="float-left mr-4 mt-1 font-display text-7xl font-extrabold leading-[0.8] text-[#ff4d00] md:text-8xl">
            {article.body[0].charAt(0)}
          </span>
          {article.body[0].slice(1)}
        </p>

        <blockquote className="my-14 border-l-2 border-[#ff4d00] pl-8 font-display text-2xl font-bold leading-snug tracking-tight md:text-4xl">
          "{article.quote}"
        </blockquote>

        {article.body.slice(1).map((para, i) => (
          <p key={i} className="mt-6 text-lg leading-relaxed text-[#ece9e4]/85 md:text-xl">
            {para}
          </p>
        ))}

        <div className="mt-16 flex items-center gap-6 border-t border-[#ece9e4]/15 pt-8 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">
          <span>Written by KERN® Studio</span>
          <span className="h-1 w-1 rounded-full bg-[#ff4d00]" />
          <span>{article.date}</span>
        </div>
      </div>

      <Link
        to={`/journal/${next.slug}`}
        data-hover
        className="group block border-t border-[#ece9e4]/15 px-6 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ece9e4]/50">
          Next article
        </p>
        <span className="mt-4 block max-w-5xl font-display text-3xl font-extrabold leading-tight tracking-tight transition-colors duration-500 group-hover:text-[#ff4d00] md:text-6xl">
          {next.title} →
        </span>
      </Link>
    </main>
  )
}
