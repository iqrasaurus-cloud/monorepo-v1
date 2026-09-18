import { brandCopy } from '@iqra/config'
import { Fragment } from 'react'
import { Container } from '../../primitives/Container.tsx'

/** The learning journey as a chain of small steps, straight from the brand guide. */
export function JourneyStrip() {
  return (
    <Container>
      <ol
        aria-label="The learning journey"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
      >
        {brandCopy.learningJourney.map((step, i) => (
          <Fragment key={step}>
            <li className="font-heading text-lg font-semibold text-primary md:text-xl">{step}</li>
            {i < brandCopy.learningJourney.length - 1 ? (
              <li aria-hidden="true" className="text-taupe">
                &rarr;
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </Container>
  )
}
