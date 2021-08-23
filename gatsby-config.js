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
        parseWikiLinks: true
      },
    },
  ],
}
