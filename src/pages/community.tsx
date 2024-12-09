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
      {/* <HomepageHeader /> */}
      <div className={clsx(styles.quote)}>
        <h1>Community</h1>
      </div>
      <div className={clsx(styles.quote_2)}>
        <p>
          AQUA Protocol is made possible by crypto,
          <br />
          as in <i>cryptography</i>!
        </p>
      </div>
    </Layout>
  );
}
