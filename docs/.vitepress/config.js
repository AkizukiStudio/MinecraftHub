// .vitepress/config.js

export default {
  lang: "zh_CN",
  title: "MinecraftHub",
  description: "MC资源搜索站",
  ignoreDeadLinks: true,
  themeConfig: {
    logo: "/logo.svg",
    search: {
      //provider: 'local',
      // 添加对动态内容的搜索支持
      detailedView: true,
      // 自定义搜索逻辑
      _render(src, env) {
        // 这里可以自定义搜索结果的渲染逻辑
        return src
      }
    },
    nav: [
      { text: "首页", link: "/" },
      //{ text: "站点规则", link: "/rules/"},
      //{ text: "资源搜索", link: "/mc/search/" },
      { text: "MC导航", link: "/mc/nav/" },
      { text: "MC下载", link: "/mc/download/" },
      { text: "关于团队", link: "/team/" },
      {
        text: "友情链接",
        items: [
          { text: "McNav", link: "https://www.mcnav.net/" },
          { text: "MineBBS", link: "https://www.minebbs.com/" },
          { text: "MCJPG组织", link: "https://mcjpg.org/" },
        ]
      }
    ],
    outline: {
      label: '页面导航',
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.8 420.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.1 72.2-51.1 101.8 16.8 5.2 54.8 19.2 45.8 34.4-7.3 12.3-125.5 7.9-159.6 4-34.1 3.8-152.3 8.3-159.6-4-9-15.3 28.9-29.2 45.8-34.4-34.9-29.5-51.1-70.4-51.1-101.8 0 0-33.3 54.1-44.9 52.7-5.4-.7-12.4-29.6 9.3-99.7 10.3-33 22-60.5 40.1-105.8C60.7 98.1 109 0 224 0c113.7 0 163.2 96.1 160.3 215 18.1 45.2 29.9 72.9 40.1 105.8 21.8 70.1 14.7 99.1 9.3 99.7z"></path></svg>'
        },
        link: "https://qm.qq.com/q/S2jC8fODOC"
      },
      { icon: 'github', link: 'https://github.com/AkizukiStudio/MinecraftHub' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present AkibaCat'
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  }
}