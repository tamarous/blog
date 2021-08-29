const { config } = require("vuepress-theme-hope");

module.exports = config({
  base: "/blog/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "iOS", link: "/iOS/" },
      { text: "Algorithms", link: "/Algorithms/" },
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
      }
    },
    displayAllHeaders: true,
  },
});
