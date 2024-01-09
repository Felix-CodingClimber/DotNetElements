import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "DotNet Elements",
  tagline: "C# All the way",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://dotnet-elements.felixstrauss.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "Felix-CodingClimber",
  projectName: "DotNetElements",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Felix-CodingClimber/DotNetElements",
        },
        blog: {
          showReadingTime: true,
          // Repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Felix-CodingClimber/DotNetElements",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function tailwindCssPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    // Social card
    image: "img/social-card.png",
    navbar: {
      title: "DotNet Elements",
      logo: {
        alt: "DotNet Elements Logo",
        src: "img/logo-small.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Getting started",
        },
        { to: "/docs/intro", label: "Docs", position: "left" },
        {
          href: "https://github.com/Felix-CodingClimber/DotNetElements",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting started",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/dotnetelements",
            }
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Felix-CodingClimber/DotNetElements",
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} Felix-CodingClimber`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
