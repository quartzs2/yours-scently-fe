import type { NextConfig } from "next";

import { RuleSetRule } from "webpack";

import { IMAGE_DOMAIN } from "./src/constants/urls";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: RuleSetRule) =>
        rule.test instanceof RegExp && rule.test.test?.(".svg"),
    );

    if (!fileLoaderRule) {
      // eslint-disable-next-line no-console
      console.warn(
        "SVG file loader rule not found. SVG imports may not be processed correctly.",
      );
      return config;
    }

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/, // *.svg?url
        test: /\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        issuer: fileLoaderRule.issuer,
        use: ["@svgr/webpack"],
        test: /\.svg$/i,
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    domains: IMAGE_DOMAIN ? [IMAGE_DOMAIN] : [],
  },
};

export default nextConfig;
