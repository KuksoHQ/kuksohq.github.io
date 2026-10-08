import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const principles = [
  { number: '01', title: 'Start with real life.', text: 'Useful software begins with a real problem. We build around the way people think, work, and find their communities.' },
  { number: '02', title: 'Make complexity useful.', text: 'AI, research, and engineering belong behind a clear experience. The person using the product stays in control.' },
  { number: '03', title: 'Build for the long run.', text: 'We develop our own products, learn from each iteration, and give the ideas that matter room to grow.' },
];

export default function Home(): ReactNode {
  return (
    <Layout title="Independent product studio" description="Kukso Studios is an independent product studio based in Türkiye. Meet Gyrolog, our personal operating system, and explore the products we are building.">
      <main className={styles.home}>
        <section className={styles.hero} aria-labelledby="studio-title">
          <div className={styles.eyebrow}><span className={styles.dot} /> Independent studio · Türkiye</div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="studio-title">Useful ideas.<br /><em>Thoughtfully built.</em></h1>
              <p className={styles.intro}>We build products that help people make sense of their lives, find their communities, and turn complex ideas into useful tools.</p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} to="/gyrolog">Meet Gyrolog <span aria-hidden="true">↗</span></Link>
                <Link className={styles.textLink} to="#products">Explore the studio <span aria-hidden="true">↓</span></Link>
              </div>
            </div>
            <div className={styles.studioNote}>
              <div className={styles.orbits} aria-hidden="true"><span /><span /><span /><b>k.</b></div>
              <p>Small studio.<br />Long-term thinking.</p>
              <span className={styles.caption}>Independent by choice. Curious by nature.</span>
            </div>
          </div>
          <div className={styles.heroFoot}><span>Personal software. Community platforms. Developer tools.</span><span>Building since December 2025</span></div>
        </section>

        <section className={styles.products} aria-labelledby="products">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>Inside the studio</span><Heading as="h2" id="products">A few ideas.<br /><em>A clear purpose.</em></Heading></div>
          <article className={styles.flagship}>
            <div className={styles.flagshipCopy}>
              <div className={styles.productIdentity}><img src="/brand/gyrolog-mark.svg" alt="" width="38" height="38" /><span>Gyrolog</span><span className={styles.status}>In development</span></div>
              <span className={styles.kicker}>Personal Operating System</span>
              <h3>A clearer view<br />of your life.</h3>
              <p>Turn scattered thoughts, daily experiences, and intentions into personal context you can return to. Capture what happened, understand what matters, and decide what comes next.</p>
              <div className={styles.featureNames}><span>Voice Dump</span><span>Pilot</span><span>Navigator</span></div>
              <Link className={styles.darkButton} to="/gyrolog">Explore Gyrolog <span aria-hidden="true">↗</span></Link>
            </div>
            <div className={styles.loopIllustration} aria-label="Gyrolog connects capture, personal memory, and reflection in a repeating loop">
              <div className={styles.diagramHead}><span>The Gyrolog loop</span><span>Capture · Reflect · Adjust</span></div>
              <div className={styles.loopCircle} aria-hidden="true"><span /><span /><span /><div>Life moves.<br /><em>Find your bearings.</em></div></div>
              <ol className={styles.loopSteps}><li><span>01</span> Capture reality</li><li><span>02</span> Understand the context</li><li><span>03</span> Adjust your course</li></ol>
            </div>
          </article>
          <div className={styles.projectRows}>
            <article className={styles.projectRow}><span className={styles.projectNumber}>02</span><div><span className={styles.kicker}>Community · Server discovery</span><h3>FirstSpawn</h3><p>Find your next Minecraft community through server discovery, community votes, and separate trust signals.</p></div><Link className={styles.rowLink} to="https://www.firstspawn.com/en/">Visit FirstSpawn <span aria-hidden="true">↗</span></Link></article>
            <article className={styles.projectRow}><span className={styles.projectNumber}>03</span><div><span className={styles.kicker}>Research · In development</span><h3>WickdAlgo</h3><p>Turn financial market structure into reproducible research and testable strategies, with evidence that can be inspected.</p></div><Link className={styles.rowLink} to="mailto:tech@kukso.com?subject=WickdAlgo%20enquiry">Ask about WickdAlgo <span aria-hidden="true">↗</span></Link></article>
            <article className={styles.projectRow}><span className={styles.projectNumber}>04</span><div><span className={styles.kicker}>Where we started · Developer tools</span><h3>Tools for game communities</h3><p>Minecraft plugins and Hytale mod development: the foundation of our work on software for players and server owners.</p></div><Link className={styles.rowLink} to="/projects">Browse the projects <span aria-hidden="true">↗</span></Link></article>
          </div>
        </section>
        <section className={styles.approach} aria-labelledby="approach-title">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>How we work</span><h2 id="approach-title">Care in the details.<br /><em>Purpose in the product.</em></h2></div>
          <div className={styles.principles}>{principles.map((principle) => <article key={principle.number}><span className={styles.projectNumber}>{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
        </section>
        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div><span className={styles.eyebrow}>A conversation starts here</span><h2 id="contact-title">Curious about<br /><em>what we’re building?</em></h2><p>For product questions, early access enquiries, or a possible collaboration, get in touch with Kukso Studios.</p></div>
          <Link className={styles.contactLink} to="mailto:tech@kukso.com">tech@kukso.com <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </Layout>
  );
}
