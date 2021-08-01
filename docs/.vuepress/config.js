module.exports = {
  base: "/tamarous_blog/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "iOS", link: "/iOS/" },
      { text: "Algorithms", link: "/Algorithms/" },
    ],
    repo: "tamarous/tamarous_blog",
    repoLabel: "GitHub",
    docsDir: "docs",
    docsBranch: "master",
    sidebar: ["/", "/iOS/", "/Algorithms/"],
  },
};
