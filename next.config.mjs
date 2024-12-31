// import nextra from "nextra";
//
// const withNextra = nextra({
//   theme: "nextra-theme-docs",
//   themeConfig: "./theme.config.tsx",
// });
//
// export default withNextra();

// import bundleAnalyzer from "@next/bundle-analyzer";
// import nextra from "nextra";
//
// const withNextra = nextra({
//   theme: "nextra-theme-docs",
//   themeConfig: "./theme.config.tsx",
// });
// export default withNextra();
//
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });
//
// /**
//  * @type {import('next').NextConfig}
//  */
// export default withBundleAnalyzer(
//   withNextra({
//     eslint: {
//       // Eslint behaves weirdly in this monorepo.
//       ignoreDuringBuilds: true,
//     },
//     reactStrictMode: true,
//   }),
// );
//

import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
  search: {
    codeblocks: false,
  },
});

export default withNextra({
  reactStrictMode: true,
});
