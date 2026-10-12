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
  entries?: Array<{ label: string; text: string }>;
  stage: string;
  note: string;
}> = [
  {
    id: 'capture',
    name: 'Voice Dump',
    number: '01',
    inputLabel: 'One dump, in your words',
    input: '“I studied for 25 minutes after dinner. Starting with one lesson made it easier to begin. I also went for a 20-minute walk.”',
    outputLabel: 'Two entries to review',
    output: 'One spoken capture becomes separate Diary entries for you to review before saving.',
    entries: [
      { label: 'Diary entry · Learning', text: 'Studied for 25 minutes after dinner. Starting with one lesson made it easier to begin.' },
      { label: 'Diary entry · Health', text: 'Went for a 20-minute walk.' },
    ],
    stage: 'Capture, review, and save are available in the private iPhone Preview.',
    note: 'Suggested entries · review, edit, or discard before saving',
  },
  {
    id: 'pilot',
    name: 'Pilot',
    number: '02',
    inputLabel: 'A question to think through',
    input: '“I want to keep learning, but my evenings are busy. What could I aim for?”',
    outputLabel: 'A direction grounded in your records',
    output: 'Your Monday and Thursday notes mention starting with one lesson after dinner. Short sessions may be a useful starting point for a goal. Would this intent fit what you want?',
    stage: 'Pilot conversations are available in the private iPhone Preview.',
    note: 'Illustrative example · challenge the response before choosing a next step',
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
    stage: 'Navigator sessions are available in the private iPhone Preview.',
    note: 'Illustrative example · review the Drift, Pattern, and Plan with your own judgment',
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
      'Gyrolog 0.13.0 is a private iPhone Preview that its maintainer has tested. It includes Diary capture and review, Pilot conversations, and Navigator sessions. Gyrolog is not publicly available, and there is no public sign-up.',
  },
  {
    question: 'Does Gyrolog decide what I should do?',
    answer:
      'No. Its AI may offer a draft, a question, or a possible pattern. You decide what is accurate, what to keep, and what to do next.',
  },
  {
    question: 'How is this different from keeping notes?',
    answer:
      'The private Preview brings Diary records together with Pilot conversations and Navigator sessions. The broader product direction is to connect what happened with personal memory, chosen direction, and reflection.',
  },
  {
    question: 'Who is Gyrolog being built for?',
    answer:
      'Our initial focus is people balancing learning, work, and personal projects whose notes and goals are scattered across tools. Gyrolog is being built to connect their daily records with reflection and a manageable next step.',
  },
  {
    question: 'Where does Claude fit?',
    answer:
      'Claude is part of our development workflow. Product integration remains planned and is not included in the current Preview.',
  },
  {
    question: 'How will my information be handled?',
    answer:
      'Diary notes are stored on this iPhone and may be included in iPhone Backup. Coaching & voice processing is off until you opt in; Gyrolog sends information when you ask Pilot or Coach a question, or ask it to split a voice capture. A random install ID, token counts, and estimated cost are kept for up to 62 days to support allowance and cost displays. AI providers process requests and may use prompt caching. Turning processing off stops future requests; it cannot recall information already sent.',
  },
  {
    question: 'What if AI or the network is unavailable?',
    answer:
      'Saved Diary records remain on the iPhone. Pilot and voice processing need a network and an enabled Coaching & voice processing setting, so those requests are unavailable while either is off.',
  },
];

const personalContext = [
  { title: 'Diary', role: 'What happened', text: 'A history of moments, observations, and decisions you can return to without reconstructing the week from memory.' },
  { title: 'Collections', role: 'What stays useful', text: 'Keep references, ideas, wishlists, and other information together when their value is about a topic rather than a date.' },
  { title: 'Goals', role: 'Where you want to go', text: 'Name a direction in your own words, then connect progress to the records that support it, with a clear reason for what counts.' },
];

const useCases = [
  { title: 'Working toward a weight goal', role: 'Everyday routines', text: 'Record a walk, an evening routine, or what made a planned activity difficult. In a Navigator session, reflect on those records and choose a manageable adjustment.' },
  { title: 'Making time to build strength', role: 'Training alongside daily life', text: 'Keep notes on completed and missed workouts alongside work and other commitments. The intended reflection loop connects your chosen direction with what actually fit your week.' },
  { title: 'Returning to unfinished projects', role: 'Work and personal projects', text: 'Capture where a project stalled and what helped you restart. Use Pilot to think through the relevant context and a possible next step.' },
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
      <section className={styles.previewCard} aria-label="Illustrative Gyrolog private Preview example">
        <div className={styles.previewTopline}>
          <span className={styles.previewBrand}>
            <img src="/brand/gyrolog-mark.svg" alt="" width="26" height="26" />
            <span>gyrolog</span>
          </span>
          <span className={styles.previewState}>Private Preview · example data</span>
        </div>

        <div className={styles.previewHeading}>
          <div>
            <span className={styles.previewKicker}>Log your life. Find your balance.</span>
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
          <p className={styles.previewStage}>{activeExample.stage}</p>
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
            {activeExample.entries && (
              <ul className={styles.previewEntries}>
                {activeExample.entries.map((entry) => (
                  <li className={styles.previewEntry} key={entry.label}>
                    <span className={styles.previewLabel}>{entry.label}</span>
                    <p>{entry.text}</p>
                  </li>
                ))}
              </ul>
            )}
            <span className={styles.previewNote}>{activeExample.note}</span>
          </div>
        </div>

        <p className={styles.previewDisclosure}>
          Illustrative example with fictional sample data · not an app screenshot
        </p>
      </section>
    </div>
  );
}

export default function GyrologPage(): ReactNode {
  return (
    <Layout
      title="Gyrolog — Log your life. Find your balance."
      description="Gyrolog 0.13.0 is a private iPhone Preview for Diary capture and review, Pilot conversations, and Navigator sessions. It is not publicly available."
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
                <span>Kukso Studios <span className={styles.eyebrowSlash}>/</span> Gyrolog</span>
              </div>
              <h1 className={styles.heroTitle}>
                Log your life.{' '}<span className={styles.accent}>Find your balance.</span>
              </h1>
              <p className={styles.heroLead}>
                Gyrolog helps you record what happened, keep useful context close, and find a next step that fits your life.
              </p>
              <p className={styles.heroBody}>
                Capture a thought, review the Diary entries it proposes, and save only what you choose. Pilot and Navigator help you think with your records while leaving decisions in your hands.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="https://gyrolog.app">
                  Visit gyrolog.app <span aria-hidden="true">↗</span>
                </a>
                <Link className={styles.secondaryAction} to="#how-it-works">
                  See how it works <span aria-hidden="true">↓</span>
                </Link>
              </div>
              <p className={styles.statusLine}>
                <span className={styles.statusDot} aria-hidden="true" />
                Private iPhone Preview · v0.13.0 · not publicly available
              </p>
            </div>
            <ProductPreview />
          </div>
          <div className={styles.heroFoot} aria-hidden="true">
            <span>Log what happened</span>
            <span className={styles.heroFootRule} />
            <span>Find your balance</span>
          </div>
        </section>

        <section className={styles.stageSection} aria-labelledby="development-stage">
          <div className={styles.sectionFrame}>
            <div className={styles.modesIntro}>
              <span className={styles.sectionEyebrow}>Gyrolog 0.13.0 · private iPhone Preview</span>
              <Heading as="h2" id="development-stage">What works today.<br /><span className={styles.accent}>What stays yours.</span></Heading>
              <p>The current Preview has been tested on its maintainer’s iPhone. Diary capture and review, Pilot, and Navigator flows are available; Gyrolog is not publicly available.</p>
            </div>
            <div className={styles.contextCards}>
              <article className={styles.contextCard}>
                <span className={styles.contextRole}>Capture &amp; Propose</span>
                <h3>Capture and review</h3>
                <p>Turn a voice or typed capture into proposed Diary entries. Review, edit, save, or discard before anything is added to your records.</p>
              </article>
              <article className={styles.contextCard}>
                <span className={styles.contextRole}>Pilot</span>
                <h3>Think it through</h3>
                <p>Ask a question and continue a conversation. When you opt in to processing, requests can use the relevant context permitted by your settings.</p>
              </article>
              <article className={styles.contextCard}>
                <span className={styles.contextRole}>Navigator</span>
                <h3>Reflect and adjust</h3>
                <p>Review a session through Drift, Pattern, and Plan. The reading stays open to challenge, and the next step remains yours to choose.</p>
              </article>
            </div>
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
              <span className={styles.sectionEyebrow}>The product direction beneath the conversation</span>
              <Heading as="h2" id="personal-context">Your life has context.<br /><span className={styles.accent}>Keep it connected.</span></Heading>
              <p>Gyrolog’s product direction brings together three foundations. These describe the system being built, rather than a claim that every capability is available in the current Preview. Useful history belongs in your records, beyond any one conversation.</p>
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
            <p className={styles.audienceNote}>Our initial focus: people whose learning, work, and personal projects span several tools. Bring daily records and chosen goals together so the next review starts with context.</p>
          </div>
        </section>

        <section className={styles.modesSection}>
          <div className={styles.sectionFrame}>
            <div className={styles.modesIntro}>
              <span className={styles.sectionEyebrow}>Three ways to work with your life</span>
              <h2>Capture the moment.<br /><span className={styles.accent}>Find your bearings.</span></h2>
              <p>
                The private Preview brings capture, Pilot conversations, and Navigator sessions together. AI suggestions remain reviewable; you decide what to keep and what to do next.
              </p>
            </div>
            <div className={styles.modeCards}>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>01 <span>Capture</span></span>
                <h3>Voice Dump</h3>
                <p>Speak or type an unpolished thought, then review the proposed Diary entries before saving or discarding them.</p>
                <span className={styles.modeFoot}>Your words, still yours</span>
              </article>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>02 <span>Assistant</span></span>
                <h3>Pilot</h3>
                <p>Ask an open-ended question and continue the conversation. With processing enabled, Pilot can use relevant context permitted by your settings.</p>
                <span className={styles.modeFoot}>A thought partner, on your terms</span>
              </article>
              <article className={styles.modeCard}>
                <span className={styles.modeNumber}>03 <span>Coaching</span></span>
                <h3>Navigator</h3>
                <p>Review a meaningful period through Drift, Pattern, and Plan. Compare intention with reality, challenge a possible pattern, and choose an adjustment worth carrying forward.</p>
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

        <section className={styles.stageSection} aria-labelledby="use-cases">
          <div className={styles.sectionFrame}>
            <div className={styles.modesIntro}>
              <span className={styles.sectionEyebrow}>Illustrative use cases</span>
              <Heading as="h2" id="use-cases">Different directions.<br /><span className={styles.accent}>The same reflection loop.</span></Heading>
              <p>Three illustrative scenarios for the product we’re building: recording everyday experience, reflecting on it, and choosing a next step.</p>
            </div>
            <div className={styles.contextCards}>
              {useCases.map((item) => (
                <article className={styles.contextCard} key={item.title}>
                  <span className={styles.contextRole}>{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
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
            <span className={styles.sectionEyebrow}>Gyrolog — Log your life. Find your balance.</span>
            <h2>Find your balance, one honest log at a time.</h2>
            <p>Gyrolog is a private iPhone Preview and is not publicly available. Visit the Gyrolog site for current information.</p>
            <a className={styles.primaryAction} href="https://gyrolog.app">
              Visit gyrolog.app <span aria-hidden="true">↗</span>
            </a>
            <span className={styles.contactAddress}>tech@kukso.com</span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
