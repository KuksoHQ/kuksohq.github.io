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
    <Layout title="Building Gyrolog" description="Kukso Studios is building Gyrolog, a personal operating system for people balancing learning, work, and personal projects. Connect daily experiences with chosen goals and weekly reflection.">
      <main className={styles.home}>
        <section className={styles.hero} aria-labelledby="studio-title">
          <div className={styles.eyebrow}><span className={styles.dot} /> Independent studio · Türkiye</div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="studio-title">Kukso Studios<br />is building <em>Gyrolog.</em></h1>
              <p className={styles.intro}>For people balancing learning, work, and personal projects, daily notes can become scattered and disconnected from chosen goals. Gyrolog is in development to bring those experiences together with personal reflection.</p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} to="/gyrolog">Explore Gyrolog <span aria-hidden="true">↗</span></Link>
                <Link className={styles.textLink} to="#approach-title">About Kukso <span aria-hidden="true">↓</span></Link>
              </div>
            </div>
            <div className={styles.studioNote}>
              <div className={styles.orbits} aria-hidden="true"><span /><span /><span /><b>k.</b></div>
              <p>Independent studio.<br />Current focus: Gyrolog.</p>
              <span className={styles.caption}>Building in the open, one useful product at a time.</span>
            </div>
          </div>
          <div className={styles.heroFoot}><span>Gyrolog · Personal Operating System</span><span>In development · Kukso Studios, Türkiye</span></div>
        </section>

        <section className={styles.products} aria-labelledby="products">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>Our current focus</span><Heading as="h2" id="products">Make everyday experience<br /><em>useful for what comes next.</em></Heading></div>
          <article className={styles.flagship}>
            <div className={styles.flagshipCopy}>
              <div className={styles.productIdentity}><img src="/brand/gyrolog-mark.svg" alt="" width="38" height="38" /><span>Gyrolog</span><span className={styles.status}>In development</span></div>
              <span className={styles.kicker}>Personal Operating System</span>
              <h3>Connect your days<br />with your direction.</h3>
              <p>Gyrolog is being built for people balancing learning, work, and personal projects. It brings scattered thoughts and daily experiences into personal context for weekly reflection and a practical next step.</p>
              <div className={styles.featureNames}><span>Voice Dump</span><span>Pilot</span><span>Navigator</span></div>
              <Link className={styles.darkButton} to="/gyrolog">Explore Gyrolog <span aria-hidden="true">↗</span></Link>
            </div>
            <div className={styles.loopIllustration} aria-label="Gyrolog connects capture, personal memory, and reflection in a repeating loop">
              <div className={styles.diagramHead}><span>The Gyrolog loop</span><span>Capture · Reflect · Adjust</span></div>
              <div className={styles.loopCircle} aria-hidden="true"><span /><span /><span /><div>Life moves.<br /><em>Find your bearings.</em></div></div>
              <ol className={styles.loopSteps}><li><span>01</span> Capture reality</li><li><span>02</span> Understand the context</li><li><span>03</span> Adjust your course</li></ol>
            </div>
          </article>
          <p className={styles.otherProjects}>Kukso also builds community software and developer tools. <Link to="/projects">Explore our other projects <span aria-hidden="true">↗</span></Link></p>
        </section>
        <section className={styles.approach} aria-labelledby="approach-title">
          <div className={styles.sectionHeading}><span className={styles.eyebrow}>How we work</span><Heading as="h2" id="approach-title">Care in the details.<br /><em>Purpose in the product.</em></Heading></div>
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
