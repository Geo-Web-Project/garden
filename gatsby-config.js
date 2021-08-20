module.exports = {
  siteMetadata: {
    title: `Geo Web Digital Garden`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-double-brackets-link",
            options: { parseWikiLinks: true },
          },
          "gatsby-remark-double-parenthesis-link",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 561,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          `gatsby-remark-mathjax`,
        ],
      },
    },
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}/content/notes`,
        rootNote: `/Welcome`,
        mdxOtherwiseConfigured: true,
      },
    },
  ],
};
