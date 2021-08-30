module.exports = {
  siteMetadata: {
    title: `Geo Web Digital Garden`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}/content/notes`,
        rootNote: `/Welcome`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-double-brackets-link`,
            options: {
              titleToURLPath: `${__dirname}/resolve-url.js`,
              parseWikiLinks: true,
            },
          },
        ],
      },
    },
  ],
};
