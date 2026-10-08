import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './gyrolog.module.css';

type PreviewMode = 'capture' | 'pilot' | 'navigator';

const previewModes: Array<{
  id: PreviewMode;
  name: string;
  number: string;
  inputLabel: string;
  input: string;
  outputLabel: string;
  output: string;
  note: string;
}> = [
  {
    id: 'capture',
    name: 'Voice Dump',
    number: '01',
    inputLabel: 'A moment, in your words',
    input: '“I studied for 25 minutes after dinner. Starting with one lesson made it easier to begin.”',
    outputLabel: 'A draft to review',
    output: 'Studied for 25 minutes after dinner. Starting with one lesson made it easier to begin.',
    note: 'Diary draft · review the wording before saving',
  },
  {
    id: 'pilot',
    name: 'Pilot',
    number: '02',
    inputLabel: 'A question to think through',
    input: '“What helped me make time for learning this week?”',
    outputLabel: 'An answer grounded in your records',
    output: 'Your Monday and Thursday notes both mention starting with one lesson after dinner. A small starting point may have helped. Did it feel that way to you?',
    note: 'Example sources: Monday’s Diary + Thursday’s Diary · interpretation, not a verdict',
  },
  {
    id: 'navigator',
    name: 'Navigator',
    number: '03',
    inputLabel: 'Looking across your notes',
    input: 'Direction: make room for learning. This week: two short sessions after dinner; one longer session postponed.',
    outputLabel: 'Drift → Pattern → Plan',
    output:
      'Drift: the longer session did not happen. Possible pattern: smaller starts fit your evenings better. Proposed plan: try one short lesson after dinner, then review how it went.',
    note: 'Challenge the reading · agree on a plan before carrying it forward',
  },
];

const loopSteps = [
  {
    number: '01',
    title: 'Capture reality',
    text: 'Save the moments before they disappear into the next thing.',
  },
  {
    number: '02',
    title: 'Organize memory',
    text: 'Give your notes enough shape to find and understand them later.',
  },
  {
    number: '03',
    title: 'Name direction',
    text: 'Keep what matters to you in view as everyday life moves.',
  },
  {
    number: '04',
    title: 'Reflect with evidence',
    text: 'Look at what you recorded, with room for more than one reading.',
  },
  {
    number: '05',
    title: 'Adjust with intention',
    text: 'Choose a next step that feels right for the life you want.',
  },
];

const faqs = [
  {
    question: 'Is Gyrolog available now?',
    answer:
      'Gyrolog is in development and is not publicly available yet. We are shaping the product and its early preview now.',
  },
  {
    question: 'Does Gyrolog decide what I should do?',
    answer:
      'No. Its AI may offer a draft, a question, or a possible pattern. You decide what is accurate, what to keep, and what to do next.',
  },
  {
    question: 'How is this different from keeping notes?',
    answer:
      'Notes preserve a moment. Gyrolog is being built to connect those moments with personal memory, chosen direction, and reflection, so useful context carries forward.',
  },
  {
    question: 'Who is Gyrolog being built for?',
    answer:
      'Self-directed people balancing several meaningful areas of life: students, knowledge workers, founders, creators, and anyone who wants to connect everyday experience with what matters to them.',
  },
  {
    question: 'How will my information be handled?',
    answer:
      'Privacy and user control are part of the product’s design. We will publish clear data practices before a public release.',
  },
  {
    question: 'What if AI or the network is unavailable?',
    answer:
      'The product direction is local-first usefulness: existing personal records should remain readable and useful when AI or the network is unavailable. This is a design goal, not a promise that every capability works offline; public-release details will explain the boundaries.',
  },
];

const personalContext = [
  { title: 'Diary', role: 'What happened', text: 'A history of moments, observations, and decisions you can return to without reconstructing the week from memory.' },
  { title: 'Collections', role: 'What stays useful', text: 'Keep references, ideas, wishlists, and other information together when their value is about a topic rather than a date.' },
  { title: 'Goals', role: 'Where you want to go', text: 'Name a direction in your own words, then connect progress to the records that support it, with a clear reason for what counts.' },
];

const reviewEvidence = [
  { day: 'Monday', text: '“Studied for 25 minutes after dinner. Starting with one lesson made it easier to begin.”' },
  { day: 'Wednesday', text: '“Planned a longer study session. Worked late and postponed it.”' },
  { day: 'Thursday', text: '“Did one lesson after dinner. A short start felt manageable.”' },
];

const reviewFindings = [
  { title: 'Drift', label: 'Compare intention with reality', text: 'You made time for two short sessions. The longer session you planned was postponed.' },
  { title: 'Pattern', label: 'A reading you can challenge', text: 'A small starting point after dinner may fit your current evenings better. Three notes suggest a possibility, not a fixed trait.' },
  { title: 'Plan', label: 'An adjustment you choose', text: 'If that reading fits, try one short lesson after dinner next week. Adjust the direction rather than creating a backlog to repay.' },
];

function ProductPreview(): ReactNode {
  const [activeMode, setActiveMode] = useState<PreviewMode>('capture');
  const activeExample = previewModes.find((mode) => mode.id === activeMode)!;

  return (
    <div className={styles.previewWrap}>
      <div className={styles.previewOrbit} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <section className={styles.previewCard} aria-label="Illustrative Gyrolog interface preview">
        <div className={styles.previewTopline}>
          <span className={styles.previewBrand}>
            <img src="/brand/gyrolog-mark.svg" alt="" width="26" height="26" />
            <span>gyrolog</span>
          </span>
          <span className={styles.previewState}>An early concept</span>
        </div>

        <div className={styles.previewHeading}>
          <div>
            <span className={styles.previewKicker}>A personal operating system</span>
            <h2>Make room to see the whole picture.</h2>
          </div>
          <span className={styles.previewIndex}>{activeExample.number} / 03</span>
        </div>

        <div className={styles.previewTabs} role="group" aria-label="Choose an illustrative product area">
          {previewModes.map((mode) => (
            <button
              className={activeMode === mode.id ? styles.previewTabActive : styles.previewTab}
              type="button"
              key={mode.id}
              aria-pressed={activeMode === mode.id}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.name}
            </button>
          ))}
        </div>

        <div className={styles.previewPanel} aria-live="polite" aria-atomic="true">
          <div className={styles.previewInput}>
            <span className={styles.previewLabel}>{activeExample.inputLabel}</span>
            <p>{activeExample.input}</p>
          </div>
          <div className={styles.previewConnector} aria-hidden="true">
            <span />
          </div>
          <div className={styles.previewOutput}>
            <div className={styles.outputHeading}>
              <span className={styles.previewLabel}>{activeExample.outputLabel}</span>
              <span className={styles.reviewMark} aria-hidden="true">↗</span>
            </div>
            <p>{activeExample.output}</p>
            <span className={styles.previewNote}>{activeExample.note}</span>
          </div>
        </div>

        <p className={styles.previewDisclosure}>
          Illustrative preview · a product concept, not an app screenshot
        </p>
      </section>
    </div>
  );
}

export default function GyrologPage(): ReactNode {
  return (
    <Layout
      title="Gyrolog — Personal Operating System"
      description="Gyrolog connects lived experience with chosen direction, so you can notice what is changing and decide what comes next. In development by Kukso Studios."
    >
      <Head>
        <meta property="og:image" content="https://kukso.com/meta/gyrolog-social.png" />
        <meta name="twitter:image" content="https://kukso.com/meta/gyrolog-social.png" />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroFrame}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowMark} aria-hidden="true" />
                <span>Kukso Studios <span className={styles.eyebrowSlash}>/</span> Personal Operating System</span>
              </div>
              <h1 className={styles.heroTitle}>
                Stay on <span className={styles.accent}>course.</span>
              </h1>
              <p className={styles.heroLead}>
                A personal operating system for the moments, patterns, and choices that shape your life.
              </p>
              <p className={styles.heroBody}>
                What you intended and what actually happened often live in different places. Gyrolog is being built to connect them: capture your days, keep useful context, and choose a course correction grounded in your own experience.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="mailto:tech@kukso.com?subject=Gyrolog%20early%20access%20or%20demo">
                  Ask about a preview <span aria-hidden="true">↗</span>
                </a>
                <Link className={styles.secondaryAction} to="#how-it-works">
                  See how it works <span aria-hidden="true">↓</span>
                </Link>
              </div>
              <p className={styles.statusLine}>
                <span className={styles.statusDot} aria-hidden="true" />
                In development · not publicly available yet
              </p>
            </div>
            <ProductPreview />
          </div>
          <div className={styles.heroFoot} aria-hidden="true">
            <span>Notice your days</span>
            <span className={styles.heroFootRule} />
            <span>Choose your direction</span>
          </div>
        </section>

        <section className={styles.loopSection} aria-labelledby="how-it-works">
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>The Gyrolog loop</span>
              <Heading as="h2" id="how-it-works">From what happened to <span className={styles.accent}>what comes next.</span></Heading>
              <p>
                Organization is the groundwork. The point is seeing how your lived experience connects to the direction you want to take.
              </p>
            </div>
            <ol className={styles.loopSteps}>
              {loopSteps.map((step, index) => (
                <li className={styles.loopStep} key={step.number}>
                  <div className={styles.stepMarker}>
                    <span>{step.number}</span>
                    {index < loopSteps.length - 1 && <i aria-hidden="true" />}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.contextSection} aria-labelledby="personal-context">
          <div className={styles.sectionFrame}>
            <div className={styles.modesIntro}>
              <span className={styles.sectionEyebrow}>The system beneath the conversation</span>
              <Heading as="h2" id="personal-context">Your life has context.<br /><span className={styles.accent}>Keep it connected.</span></Heading>
              <p>Gyrolog’s personal operating system brings together three foundations. AI helps organize and reason over them; the useful history belongs in your records, beyond any one conversation.</p>
            </div>
            <div className={styles.contextCards}>
              {personalContext.map((item) => (
                <article className={styles.contextCard} key={item.title}>
                  <span className={styles.contextRole}>{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.audienceNote}>For people carrying more than one meaningful direction: learning, work, creative projects, and everyday life. Capture naturally; let the system carry the organizational work.</p>
          </div>
        </section>

        <section className={styles.modesSection}>
          <div className={styles.sectionFrame}>
            <div className={styles.modesIntro}>
              <span className={styles.sectionEyebrow}>Three ways to work with your life</span>
              <h2>Capture the moment.<br /><span className={styles.accent}>Find your bearings.</span></h2>
              <p>
                AI belongs in the background of a life that is yours. These three modes are being built to help you capture, think, and reflect without taking the decisions out of your hands.
              </p>
            </div>
            <div className={styles.modeCards}>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>01 <span>Capture</span></span>
                <h3>Voice Dump</h3>
                <p>Speak or type an unpolished thought. Gyrolog can shape it into a draft for you to review, edit, or leave behind.</p>
                <span className={styles.modeFoot}>Your words, still yours</span>
              </article>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>02 <span>Assistant</span></span>
                <h3>Pilot</h3>
                <p>Ask an open-ended question. Pilot is being built to retrieve the relevant context you permit, so answers connect to your own records and keep evidence distinct from interpretation.</p>
                <span className={styles.modeFoot}>A thought partner, on your terms</span>
              </article>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>03 <span>Coaching</span></span>
                <h3>Navigator</h3>
                <p>Review a meaningful period through Drift, Pattern, and Plan. Compare intention with reality, challenge a possible pattern, then agree on the adjustment worth carrying forward.</p>
                <span className={styles.modeFoot}>Discovery without judgment</span>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.reviewSection} aria-labelledby="weekly-review">
          <div className={styles.sectionFrame}>
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>Navigator · an illustrative weekly review</span>
              <Heading as="h2" id="weekly-review">A better next week starts with <span className={styles.accent}>this one.</span></Heading>
              <p>Reflection comes before direction. Here is how a few ordinary records could inform a small adjustment, with room to correct the interpretation.</p>
            </div>
            <div className={styles.reviewGrid}>
              <div className={styles.evidenceCard}>
                <h3>The recorded week</h3>
                <p className={styles.evidenceDirection}>Chosen direction: make room for learning.</p>
                <ul className={styles.evidenceList}>
                  {reviewEvidence.map((record) => (
                    <li key={record.day}><span>{record.day}</span><p>{record.text}</p></li>
                  ))}
                </ul>
              </div>
              <div className={styles.findingsCard}>
                <h3>A possible reading to review</h3>
                <dl className={styles.findingsList}>
                  {reviewFindings.map((finding) => (
                    <div key={finding.title}>
                      <dt>{finding.title}<span>{finding.label}</span></dt>
                      <dd>{finding.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className={styles.carryover}>
              <h3>Carry the learning forward.</h3>
              <p>A completed review is intended to bring the useful summary and your agreed plan into the next week. Earlier interpretations remain open to revision; a remembered pattern still needs fresh evidence.</p>
            </div>
            <p className={styles.conceptNote}>Fictional records illustrating the product direction, not a live review or app screenshot.</p>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className={styles.sectionFrame}>
            <div className={styles.principlesHeading}>
              <span className={styles.sectionEyebrow}>Built around your judgment</span>
              <h2>Useful intelligence.<br /><span className={styles.accent}>A human point of view.</span></h2>
            </div>
            <div className={styles.principlesList}>
              <article>
                <span className={styles.principleIndex}>A</span>
                <div>
                  <h3>You stay in control</h3>
                  <p>AI can propose a draft. You decide what to edit, save, or discard.</p>
                </div>
              </article>
              <article>
                <span className={styles.principleIndex}>B</span>
                <div>
                  <h3>Context has a purpose</h3>
                  <p>The design calls for retrieving only relevant, permitted context. More personal data in every conversation is not the goal.</p>
                </div>
              </article>
              <article>
                <span className={styles.principleIndex}>C</span>
                <div>
                  <h3>Real life sets the pace</h3>
                  <p>The product is designed around useful reflection, without overdue-review debt or guilt for a changed plan. Changing course can be progress, too.</p>
                </div>
              </article>
              <article>
                <span className={styles.principleIndex}>D</span>
                <div>
                  <h3>Evidence stays visible</h3>
                  <p>What you recorded and what an AI might infer are different things. Gyrolog is being designed to keep that distinction clear.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionFrame}>
            <div className={styles.faqHeading}>
              <span className={styles.sectionEyebrow}>A few clear answers</span>
              <h2>Where Gyrolog stands.</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactFrame}>
            <img src="/brand/gyrolog-mark.svg" alt="" width="50" height="50" />
            <span className={styles.sectionEyebrow}>A work in progress by Kukso Studios</span>
            <h2>Make a little more sense of <span className={styles.accent}>the whole.</span></h2>
            <p>Gyrolog is taking shape. If you would like to see a demo or hear about early access, write to us.</p>
            <a className={styles.primaryAction} href="mailto:tech@kukso.com?subject=Gyrolog%20early%20access%20or%20demo">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
            <span className={styles.contactAddress}>tech@kukso.com</span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
