import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import communityStyles from './coummunity.module.css';
import { ReactNode } from 'react';
import { MdEmail, MdMerge } from 'react-icons/md';
import { BsGithub, BsStackOverflow, BsTwitterX } from 'react-icons/bs';
import { BiMessage } from 'react-icons/bi';

const ListItem = ({ icon, title, link, description }: { icon: ReactNode, title: string, link: string, description: string }) => {

  return (
    <a href={link}>
      <div className={communityStyles.gridItem}>
        <div className='icon'>
          {icon}
        </div>
        <h3 className='title'>{title}</h3>
        <p className={clsx(communityStyles.threeLines, 'description')}>
          {description}
        </p>
      </div>
    </a>
  )
}

export default function Community(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A peer to peer trust protocol to govern data.">
      <div className={clsx(styles.quote)}>
        <h1>Join the AQUA Protocol community</h1>
      </div>
      <div className={clsx(styles.quote_2)}>
        <p>
          AQUA Protocol is an open source project that anyone in the community can use, improve, and enjoy. We'd love you to join us! Here's a few ways to find out what's happening and get involved.
        </p>
      </div>
      <div className={communityStyles.container}>
        <div className={clsx(communityStyles.column, communityStyles.learnConnect)}>
          <h2 className={communityStyles.title}>Learn and Connect</h2>
          <p className={communityStyles.twoLines}>
            Using or want to use AQUA Protocol? Find out more here:
          </p>

          <div className={communityStyles.grid}>
            <ListItem
              icon={<MdEmail size={"40px"} />}
              title={'Mailing List'}
              link={'info@inblock.io'}
              description={'Discussion and help from your fellow users'}
            />
            <ListItem
              icon={<BsTwitterX size={"40px"} />}
              title={'Twitter'}
              link={'https://twitter.com/inblockio'}
              description={'Follow inblock.io on Twitter for latest news!'}
            />
            <ListItem
              icon={<BiMessage size={"40px"} />}
              title={'Matrix'}
              link={'https://matrix.to/#/#aqua-community:matrix.jembawan.com'}
              description={'Chat with other project developers on Matrix'}
            />
          </div>
        </div>
        <div className={clsx(communityStyles.column, communityStyles.developContribute)}>
          <h2 className={communityStyles.title}>Develop and Contribute</h2>
          <p className={communityStyles.twoLines}>If you want to get more involved by contributing to AQUA Protocol, join us here:</p>
          <div className={communityStyles.grid}>
            <ListItem
              icon={<BsGithub size={"40px"} />}
              title={'Github'}
              link={'https://github.com/inblockio'}
              description={'AQUA development takes place here!'}
            />
            <ListItem
              icon={<BsStackOverflow size={"40px"} />}
              title={'Stack Overflow'}
              link={'https://stackoverflow.com/questions/tagged/aqua'}
              description={'Questions and curated answers by developers working with AQUA'}
            />
            <ListItem
              icon={<MdMerge size={"40px"} />}
              title={'Contribution Guidelines'}
              link={'/docs/v2/contribution-guidelines'}
              description={'You can find out how to contribute here '}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
