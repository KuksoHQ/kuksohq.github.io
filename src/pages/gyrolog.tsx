import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import home from './index.module.css';
import styles from './gyrolog.module.css';

// A short project card in Kukso's own design. The product site, gyrolog.app,
// is the one place that describes Gyrolog in full; keep this page to a
// summary and a link. The screenshot is the file gyrolog.app serves
// (gyrolog-monorepo, apps/website/screenshots) and shows fictional sample data.

const surfaces = [
  { number: '01', title: 'Capture', text: 'Type or say what happened. Gyrolog proposes Diary entries, and you review, edit, save, or discard them.' },
  { number: '02', title: 'This week', text: 'Each day sits on the Day Dial at the times you logged, beside your Goals and the direction you set for the week.' },
  { number: '03', title: 'Weekly review', text: 'Look back through Drift, Pattern, and Plan cards that cite your own entries. You accept or correct each one.' },
];

export default function GyrologPage(): ReactNode {
  return (
    <Layout
      title="Gyrolog — Log your life. Find your balance."
      description="Gyrolog is a private iPhone Preview from Kukso Studios for Diary capture, This week, and the Weekly review. It is not publicly available. Read more at gyrolog.app."
    >
      <Head>
        <meta property="og:image" content="https://kukso.com/meta/gyrolog-social.png" />
        <meta name="twitter:image" content="https://kukso.com/meta/gyrolog-social.png" />
      </Head>
      <main className={home.home}>
        <section className={home.hero} aria-labelledby="gyrolog-title">
          <div className={home.eyebrow}><span className={home.dot} /> Kukso Studios · Private iPhone Preview</div>
          <div className={`${home.heroGrid} ${styles.heroGrid}`}>
            <div>
              <div className={styles.identity}>
                <img src="/brand/gyrolog-mark.svg" alt="" width="44" height="44" />
                <span>Gyrolog</span>
              </div>
              <h1 id="gyrolog-title">Log your life.<br /><em>Find your balance.</em></h1>
              <p className={home.intro}>Gyrolog helps you record what happened, see your week as it was, and find a next step that fits your life. It is in private Preview on iPhone and is not publicly available.</p>
              <div className={home.actions}>
                <Link className={home.primaryButton} href="https://gyrolog.app">Visit gyrolog.app <span aria-hidden="true">↗</span></Link>
                <Link className={home.textLink} to="/projects">Other projects <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
            <figure className={styles.device}>
              <div className={styles.deviceFrame}>
                <img
                  className={styles.deviceShot}
                  src="/img/gyrolog/this-week-dark.webp"
                  width={780}
                  height={1694}
                  alt="Gyrolog's This week screen on iPhone: Tuesday in the week strip, the week's direction and Goals lines, the Day Dial at 13:25 with three entries, and today's log under it."
                />
              </div>
              <figcaption>This week on iPhone, shown with sample entries.</figcaption>
            </figure>
          </div>
          <div className={home.heroFoot}><span>Gyrolog · Capture · This week · Weekly review</span><span>In development · Kukso Studios, Türkiye</span></div>
        </section>

        <section className={home.approach} aria-labelledby="gyrolog-surfaces">
          <div className={home.sectionHeading}><span className={home.eyebrow}>In the Preview</span><Heading as="h2" id="gyrolog-surfaces">Start with what happened.<br /><em>Decide what to adjust.</em></Heading></div>
          <div className={home.principles}>{surfaces.map((surface) => <article key={surface.number}><span className={home.projectNumber}>{surface.number}</span><h3>{surface.title}</h3><p>{surface.text}</p></article>)}</div>
        </section>

        <section className={home.contact} aria-labelledby="gyrolog-more">
          <div><span className={home.eyebrow}>The product site</span><h2 id="gyrolog-more">The full story<br /><em>lives on gyrolog.app.</em></h2><p>How Gyrolog works, how your data is handled, and where to get support are on the product site. For anything else, write to <Link to="mailto:tech@kukso.com">tech@kukso.com</Link>.</p></div>
          <Link className={home.contactLink} href="https://gyrolog.app">gyrolog.app <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </Layout>
  );
}
