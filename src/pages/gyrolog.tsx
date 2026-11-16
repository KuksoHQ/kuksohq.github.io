import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './gyrolog.module.css';

// This page is drawn with the Gyrolog app's own design: its dark theme, type
// scale, radii and components (gyrolog-monorepo, packages/ui). The This week
// figure is a screenshot of the iPhone app, the same file gyrolog.app serves
// (gyrolog-monorepo, apps/website/screenshots). The review cards are drawn
// here with icon paths and labels copied from that package. Every entry shown
// is fictional sample data.

type IconShape = ['p', string] | ['c', number, number, number] | ['r', number, number, number, number, number];

const ICONS = {
  route: [['c', 6, 19, 3], ['p', 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15'], ['c', 18, 5, 3]],
  compass: [['c', 12, 12, 10], ['p', 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z']],
  layers: [
    ['p', 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z'],
    ['p', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12'],
    ['p', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  ],
} satisfies Record<string, IconShape[]>;

function Icon({ name, size = 18 }: { name: keyof typeof ICONS; size?: number }): ReactNode {
  return (
    <svg className={styles.icon} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {(ICONS[name] as IconShape[]).map((shape, index) => {
        if (shape[0] === 'p') return <path key={index} d={shape[1]} />;
        if (shape[0] === 'c') return <circle key={index} cx={shape[1]} cy={shape[2]} r={shape[3]} />;
        return <rect key={index} x={shape[1]} y={shape[2]} width={shape[3]} height={shape[4]} rx={shape[5]} />;
      })}
    </svg>
  );
}

/** This week: a screenshot of the iPhone app in its dark theme, with sample entries. */
function ThisWeek(): ReactNode {
  return (
    <figure className={styles.device}>
      <div className={styles.deviceFrame}>
        <img
          className={styles.deviceShot}
          src="/img/gyrolog/this-week-dark.webp"
          width={780}
          height={1694}
          alt="Gyrolog's This week screen on iPhone: Tuesday in the week strip, the Week direction card, the Day Dial at 10:41 with three entries, and the capture bar."
        />
      </div>
      <figcaption>This week on iPhone, shown with sample entries.</figcaption>
    </figure>
  );
}

const today = [
  { role: 'Capture', title: 'Log in your own words', text: 'Type or say what happened. Gyrolog proposes Diary entries, and you review, edit, save, or discard before anything is added to your records.' },
  { role: 'This week', title: 'See the week as it was', text: 'Each day sits on the Day Dial at the times you logged. Goals and the direction you set for the week stay beside what actually happened.' },
  { role: 'Weekly review', title: 'Reflect and adjust', text: 'From Sunday evening, look back through Drift, Pattern, and Plan cards that cite your own entries. You accept or correct each one, and the plan stays yours.' },
];

const loopSteps = [
  { number: '01', title: 'Capture reality', text: 'Save the moments before they disappear into the next thing.' },
  { number: '02', title: 'Organize memory', text: 'Give your notes enough shape to find and understand them later.' },
  { number: '03', title: 'Name direction', text: 'Keep what matters to you in view as everyday life moves.' },
  { number: '04', title: 'Reflect with evidence', text: 'Look at what you recorded, with room for more than one reading.' },
  { number: '05', title: 'Adjust with intention', text: 'Choose a next step that feels right for the life you want.' },
];

const personalContext = [
  { title: 'Diary', role: 'What happened', text: 'A history of moments, observations, and decisions you can return to without reconstructing the week from memory.' },
  { title: 'Goals', role: 'Where you want to go', text: 'Name a direction in your own words, then read your progress against the records that support it.' },
  { title: 'Memory', role: 'What stays true', text: 'What Gyrolog keeps about you: statements you made, and observations from reviews you accepted. You can always see it and change it.' },
];

const reviewEvidence = [
  { day: 'Monday', time: '19:40', text: 'Studied for 25 minutes after dinner. Starting with one lesson made it easier to begin.' },
  { day: 'Wednesday', time: '—', text: 'Planned a longer study session. Worked late and postponed it.' },
  { day: 'Thursday', time: '13:10', text: 'One lesson after lunch. A short start felt manageable.' },
];

const reviewCards: Array<{ kind: 'drift' | 'pattern' | 'plan'; label: string; icon: keyof typeof ICONS; title: string; text: string; evidence: string[] }> = [
  { kind: 'drift', label: 'Drift', icon: 'compass', title: 'Two short lessons, one long session postponed', text: 'You planned a longer study session on Wednesday and worked late instead. The two short lessons happened.', evidence: ['Mon 19:40 · Studied 25 minutes after dinner', 'Wed · Worked late, postponed'] },
  { kind: 'pattern', label: 'Pattern', icon: 'layers', title: 'A small start fits your evenings', text: 'Both lessons began with one unit after a meal. Three notes suggest a possibility, not a fixed trait.', evidence: ['Thu 13:10 · One lesson after lunch'] },
  { kind: 'plan', label: 'Plan', icon: 'route', title: 'One short lesson after dinner', text: 'Try it three times next week, then look at how it went. Adjust the direction rather than repaying a backlog.', evidence: [] },
];
const insightClass = { drift: styles.insightDrift, pattern: styles.insightPattern, plan: styles.insightPlan };

const useCases = [
  { title: 'Working toward a weight goal', role: 'Everyday routines', text: 'Record a walk, an evening routine, or what made a planned activity difficult. In the Weekly review, look at those records and choose a manageable adjustment.' },
  { title: 'Making time to build strength', role: 'Training alongside daily life', text: 'Keep notes on completed and missed workouts alongside work and other commitments. The review compares your chosen direction with what actually fit your week.' },
  { title: 'Returning to unfinished projects', role: 'Work and personal projects', text: 'Capture where a project stalled and what helped you restart. Set it as the most important thing for the week, then see what the week shows.' },
];

const principles = [
  { title: 'You stay in control', text: 'Gyrolog can propose a draft. You decide what to edit, save, or discard.' },
  { title: 'Context has a purpose', text: 'The design calls for reading only relevant, permitted context. More personal data in every request is not the goal.' },
  { title: 'Real life sets the pace', text: 'The product is designed around useful reflection, without overdue-review debt or guilt for a changed plan. Changing course can be progress, too.' },
  { title: 'Evidence stays visible', text: 'What you recorded and what an interpretation says are different things. Gyrolog keeps that distinction clear.' },
];

const faqs = [
  {
    question: 'Is Gyrolog available now?',
    answer:
      'Gyrolog is a private iPhone Preview. It includes Diary capture with proposed entries to review, This week with the Day Dial and Goals, Memory, and the Weekly review. It is not publicly available, and there is no public sign-up.',
  },
  {
    question: 'Does Gyrolog decide what I should do?',
    answer:
      'No. It may offer a draft, a question, or a possible pattern. You decide what is accurate, what to keep, and what to do next.',
  },
  {
    question: 'How is this different from keeping notes?',
    answer:
      'Gyrolog keeps what you logged beside the direction you chose. The Weekly review compares the two through Drift, Pattern, and Plan, and what you accept carries into the next week.',
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
      'Diary notes are stored on this iPhone and may be included in iPhone Backup. AI processing is off until you agree; after that, Gyrolog sends the information needed for the feature you use, such as splitting a capture into entries or running the Weekly review. A random install ID, token counts, and estimated cost are kept for up to 62 days to support Credits and usage displays. AI providers process requests and may use prompt caching. Turning processing off stops future requests; it cannot recall information already sent.',
  },
  {
    question: 'What if AI or the network is unavailable?',
    answer:
      'Saved Diary records remain on the iPhone, and you can keep writing notes. Splitting a capture, Memory changes, and the Weekly review need a network and AI processing turned on, so they are unavailable while either is off.',
  },
];

export default function GyrologPage(): ReactNode {
  return (
    <Layout
      title="Gyrolog — Log your life. Find your balance."
      description="Gyrolog is a private iPhone Preview for Diary capture, This week, and the Weekly review. It is not publicly available."
    >
      <Head>
        <meta property="og:image" content="https://kukso.com/meta/gyrolog-social.png" />
        <meta name="twitter:image" content="https://kukso.com/meta/gyrolog-social.png" />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.frame}>
            <div>
              <div className={styles.markTile}>
                <img src="/brand/gyrolog-mark.svg" alt="" width="54" height="54" />
              </div>
              <p className={styles.label}>Kukso Studios / Gyrolog</p>
              <h1 className={styles.heroTitle}>
                <span>Log your life.</span>
                <span>Find your balance.</span>
              </h1>
              <p className={styles.lede}>
                Gyrolog helps you record what happened, see your week as it was, and find a next step that fits your life.
              </p>
              <div className={styles.actions}>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href="https://gyrolog.app">
                  Visit gyrolog.app
                </a>
                <Link className={`${styles.button} ${styles.buttonSecondary}`} to="#how-it-works">
                  See how it works
                </Link>
              </div>
              <p className={styles.status}>
                <span className={styles.statusDot} aria-hidden="true" />
                Private iPhone Preview · not publicly available
              </p>
            </div>
            <ThisWeek />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="development-stage">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>Private iPhone Preview</p>
              <Heading as="h2" id="development-stage">What works today. What stays yours.</Heading>
              <p>The current Preview has been tested on its maintainer’s iPhone. Capture, This week, and the Weekly review are available; Gyrolog is not publicly available.</p>
            </div>
            <div className={styles.cards}>
              {today.map((item) => (
                <article className={styles.card} key={item.role}>
                  <span className={styles.cardRole}>{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-it-works">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>The Gyrolog loop</p>
              <Heading as="h2" id="how-it-works">From what happened to what comes next.</Heading>
              <p>Organization is the groundwork. The point is seeing how your lived experience connects to the direction you want to take.</p>
            </div>
            <ol className={styles.rows}>
              {loopSteps.map((step) => (
                <li className={styles.row} key={step.number}>
                  <span className={styles.rowIndex} aria-hidden="true">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="personal-context">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>What Gyrolog keeps</p>
              <Heading as="h2" id="personal-context">Your life has context. Keep it connected.</Heading>
              <p>Three kinds of record sit under every review. Useful history belongs in your records, where you can read and change it.</p>
            </div>
            <div className={styles.cards}>
              {personalContext.map((item) => (
                <article className={styles.card} key={item.title}>
                  <span className={styles.cardRole}>{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.note}>Our initial focus: people whose learning, work, and personal projects span several tools. Bring daily records and chosen goals together so the next review starts with context.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="weekly-review">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>The Weekly review</p>
              <Heading as="h2" id="weekly-review">A better next week starts with this one.</Heading>
              <p>Reflection comes before direction. Here is how a few ordinary records could inform a small adjustment, with room to correct the interpretation.</p>
            </div>
            <div className={styles.review}>
              <div className={styles.card}>
                <span className={styles.cardRole}>The recorded week</span>
                <h3>Becoming someone who makes room for learning</h3>
                <ul className={styles.evidence}>
                  {reviewEvidence.map((record) => (
                    <li key={record.day}>
                      <span className={styles.evidenceTime}>{record.day} · {record.time}</span>
                      <p>{record.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.insights}>
                {reviewCards.map((card) => (
                  <article className={`${styles.insight} ${insightClass[card.kind]}`} key={card.kind}>
                    <p className={styles.insightKind}><span><Icon name={card.icon} size={12} />{card.label}</span></p>
                    <h3>{card.title}</h3>
                    <p className={styles.insightBody}>{card.text}</p>
                    {card.evidence.length > 0 && (
                      <ul className={styles.insightEvidence}>
                        {card.evidence.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    )}
                    <div className={styles.insightActions} aria-hidden="true">
                      <span className={`${styles.chip} ${styles.chipPrimary}`}>Accept</span>
                      <span className={styles.chip}>Correct</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className={styles.note}>A finalized review carries its plan into the next week. Earlier interpretations stay open to revision; a remembered pattern still needs fresh evidence. Sample records, shown as the app shows them.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="use-cases">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>Illustrative use cases</p>
              <Heading as="h2" id="use-cases">Different directions. The same reflection loop.</Heading>
              <p>Three illustrative scenarios: recording everyday experience, reflecting on it, and choosing a next step.</p>
            </div>
            <div className={styles.cards}>
              {useCases.map((item) => (
                <article className={styles.card} key={item.title}>
                  <span className={styles.cardRole}>{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="principles">
          <div className={styles.frame}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>Built around your judgment</p>
              <Heading as="h2" id="principles">Useful intelligence. A human point of view.</Heading>
            </div>
            <ol className={styles.rows}>
              {principles.map((principle, index) => (
                <li className={styles.row} key={principle.title}>
                  <span className={styles.rowIndex} aria-hidden="true">{`0${index + 1}`}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq">
          <div className={`${styles.frame} ${styles.faq}`}>
            <div className={styles.intro}>
              <p className={`${styles.label} ${styles.labelAccent}`}>A few clear answers</p>
              <Heading as="h2" id="faq">Where Gyrolog stands.</Heading>
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

        <section className={styles.section}>
          <div className={`${styles.frame} ${styles.contact}`}>
            <div>
              <h2>Find your balance, one honest log at a time.</h2>
              <p>Gyrolog is a private iPhone Preview and is not publicly available. Visit the Gyrolog site for current information, or write to tech@kukso.com.</p>
            </div>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href="https://gyrolog.app">
              Visit gyrolog.app
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
