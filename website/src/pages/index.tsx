import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { Icon } from "@iconify/react";
import DotNetElementsLogo from "@site/static/img/logo.svg";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={"flex flex-col items-center dark:bg-zinc-800 bg-white"}>
      <div className={"flex flex-col items-center max-w-4xl"}>
        <DotNetElementsLogo className={"w-[80%] m-12 mt-20"} />
        <div className={"mb-2"}>
          <p className={"text-center text-2xl"}>
            Opinionated framework to build .NET applications fast and easy <br /> while
            focusing more on the final product and less on writing low level
            code.
          </p>
        </div>
        <div>
          <Link
            className={
              "hover:no-underline bg-primary hover:bg-primary-light hover:text-primary-text text-primary-text dark:hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-lg flex items-center gap-2 px-4 py-2"
            }
            to="/docs/intro"
          >
            Get started
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              className={"-mr-1"}
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
      <div
        className={
          "self-stretch flex justify-around text-center text-2xl mt-20 bg-primary text-primary-text"
        }
      >
        <p className={"max-w-4xl m-4"}>
          Framework is work in progress and not considered production ready
          (while still used in some personal projects). Feel free to try it and
          leave suggestions.
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Documentation for the DotNetElements open source framework"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
