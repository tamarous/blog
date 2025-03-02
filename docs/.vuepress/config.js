import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { webpackBundler } from '@vuepress/bundler-webpack';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  base: "/blog/",
  title: "Tamarous' blog",
  bundler: webpackBundler(),
  theme: hopeTheme({
    navbar: [
      {
        text: "Home",
        link: "/"
      },
      {
        text: "iOS",
        link: "/iOS/"
      },
      {
        text: "Backend",
        link: "/Backend/"
      }
    ],
    repo: "tamarous/blog",
    repoLabel: "GitHub",
    repoDisplay: false,
    docsDir: "docs",
    docsBranch: "master",
    blog: {
      name: "Tamarous",

      medias: {
        Github: 'https://github.com/tamarous',
        Twitter: 'https://twitter.com/tamarous',
        Weibo: 'https://weibo.com/u/2200104011'
      },
    },
    plugins: {
      blog: {
        autoExcerpt: true
      },
      feed: {
        atom: true,
        json: true,
        rss: true,
      },
      mdEnhancePlugin({
        // 启用 mermaid
        mermaid: true,
      })
    }
  }),
});
