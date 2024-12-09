import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import { FaArrowAltCircleRight, FaGithub } from 'react-icons/fa';
import { HomepageHeader } from '.';

export default function Community(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <div className={clsx(styles.quote)}>
        <p>
          The AQUA Protocol is an emerging open-source protocol for data verification which is built with modern cryptographic standards. The AQUA Protocol is not and does not require a blockchain!
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
