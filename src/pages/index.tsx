import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import { FaArrowAltCircleRight, FaGithub } from 'react-icons/fa';
import { CgCommunity } from 'react-icons/cg';

export function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to the AQUA Protocol!
        </Heading>
        <p className="hero__subtitle">
          Account & Verify data in seconds using Aqua Protocol.
          An open, private and decentralised solution for data accountability and governance!
        </p>
        <div className={styles.buttons}>
          <a className={clsx(styles.btn, styles.btn_lg, styles.btn_light)} href="/docs/v3/intro">
            <span>Documentation</span>
            <FaArrowAltCircleRight />
          </a>
          <a className={clsx(styles.btn, styles.btn_lg, styles.btn_light)} href="/community">
            <span>Community</span>
            <CgCommunity />
          </a>
          <a className={clsx(styles.btn, styles.btn_lg, styles.btn_dark)} href="https://github.com/inblockio">
            <span>Source Code</span>
            <FaGithub />
          </a>
        </div>
      </div>
    </header >
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A private peer to peer trust protocol for data governance.">
      <HomepageHeader />
      <div className={clsx(styles.quote)}>
        <p>
          The AQUA Protocol is a privacy preserving, open-source protocol for data verification which is built with modern cryptographic standards. The AQUA Protocol is not and does not require a blockchain!
        </p>
      </div>
      <div className={clsx(styles.quote_2)}>
        <p>
          AQUA Protocol is made possible by crypto,
          <br />
          as in <i>cryptography</i>!
        </p>
      </div>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
