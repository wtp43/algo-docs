import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";
import CustomCallout from "@components/custom-callout";
import { Callout } from "nextra/components";
import { Bleed } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span className="ml-8">algorithms</span>,
  project: {
    link: "https://github.com/wtp43/algo-docs",
  },
  main: ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();
    return (
      <main className="">
        {children}
        <p className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight">
          Last modified: {frontMatter?.modified}
        </p>
      </main>
    );
  },
  components: {
    CustomCallout,
    Callout,
    Bleed,
  },
  docsRepositoryBase: "https://github.com/wtp43/algo-docs",
};

export default config;
