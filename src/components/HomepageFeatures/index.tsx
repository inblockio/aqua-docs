import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { ReactNode } from 'react';
import { FaAppStoreIos, FaGithub } from 'react-icons/fa';
import { FaX, FaXTwitter } from 'react-icons/fa6';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: JSX.Element;
  link: string;
  linkLabel: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Aquafier Demo Test',
    icon: <FaAppStoreIos size={'40px'} />,
    description: (
      <>
        Aquafier is a reference implementation of AQUA Protocol. Upload, verify and notarize any file.
      </>
    ),
    link: "https://aquafier.inblock.io/",
    linkLabel: "Try Aquafier now",
  },
  {
    title: 'Contributions welcome!',
    icon: <FaGithub size={'40px'} />,
    description: (
      <>
        We welcome feedback, bug reports, ideas, or contributions code and documentation alike.
      </>
    ),
    link: "https://github.com/inblockio",
    linkLabel: "Our Github",
  },
  {
    title: 'Follow us on X',
    icon: <FaXTwitter size={'40px'} />,
    description: (
      <>
        For announcements and updates about our progress on the AQUA Protocol
      </>
    ),
    link: "https://twitter.com/inblockio",
    linkLabel: "Follow Us",
  },
];

function Feature({ title, icon, description, link, linkLabel }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className={clsx("text--center padding-horiz--md", styles.action_link)}>
        <a href={link}>{linkLabel}</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
