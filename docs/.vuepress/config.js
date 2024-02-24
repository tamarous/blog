const { config } = require("vuepress-theme-hope");

module.exports = config({
  base: "/blog/",
  title: "Tamarous' blog",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "iOS", link: "/iOS/" },
      { text: "Backend", link: "/Backend"}
    ],
    repo: "tamarous/blog",
    repoLabel: "GitHub",
    docsDir: "docs",
    docsBranch: "master",
    blog: {
      links: {
        'Github': 'https://github.com/tamarous',
        'Twitter': 'https://twitter.com/tamarous',
        'Weibo': 'https://weibo.com/u/2200104011'
      },
    },
    displayAllHeaders: true,
  },
});
