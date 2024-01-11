import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/dotnet-bot_beach.svg').default,
    description: (
      <>
        Designed for seamless setup and integration, ensuring your development process is smooth and efficient.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/dotnet-bot_focused.svg').default,
    description: (
      <>
        Optimize your productivity with DotNet Elements, letting you concentrate on innovative solutions while the framework handles the routine tasks.
      </>
    ),
  },
  {
    title: 'Powered by .NET',
    Svg: require('@site/static/img/dotnet-logo.svg').default,
    description: (
      <>
        Leverage the robust capabilities of .NET and make use of the large community driven ecosystem.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={"flex items-center py-8 dark:bg-zinc-800 bg-white"}>
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
