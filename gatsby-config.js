module.exports = {
  siteMetadata: {
    title: `WebDev Docs`,
    name: `WebDevDocs`,
    siteUrl: `https://webdevdocsmaster.gatsbyjs.io`,
    description: `Reference documentation for web development, React, Gatsby and several technologies`,
    social: [
      {
        name: `github`,
        url: `https://github.com/uvacoder/`
      },
      {
        name: `twitter`,
        url: `https://twitter.com/AlecCam43544378`
      }
    ],
    sidebarConfig: {
      forcedNavOrder: [
      "/introduction",
      "/css",
      "/javascript",
      "/nodejs",
      "/express",
      "/react",
      "/devops",
      "/gatsby",
      "/hugo",
      "/git",
      "/github",
      "/vim",
      "/visualestudio",
      "/openssh",
      "/seo",
      ],
      ignoreIndex: true
    }
  },
  plugins: [{ resolve: `gatsby-theme-document` }]
};
