import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { generateSitemap as sitemap } from 'sitemap-ts'
import { description, docsVersion, github, keywords, name, site } from './meta'
import { genFeed } from './plugins/genFeed'
import { pwa } from './plugins/pwa'
import sidebar from './sidebar'
import socialLinks from './link'
import algolia from './algolia'

export default withPwa(defineConfig({
  pwa,
  outDir: '../dist',
  title: name,
  description,
  appearance: 'dark',
  lastUpdated: true,
  useWebFonts: false,
  markdown: {
    lineNumbers: true,
  },
  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
  },
  themeConfig: {
    logo: './chodocs-logo.svg',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '归档',
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    lastUpdatedText: '最后一次更新于',
    footer: {
      message: `用心去做高质量的专业前端内容网站，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现`,
      copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">MIT License</a> | 版权所有 © 2022-${new Date().getFullYear()} <a target="_blank" href="${github}">Chocolate and ChoDocs contributors</a>`,
    },
    nav: [
      {
        text: '🏆 往年回顾',
        items: [
          { text: '🔥 24 年每周学习', link: '/weekly/2024' },
          { text: '⭐ 23 年每周学习', link: '/weekly/202303' },
        ],
      },
      {
        text: '📖 博客',
        items: [
          { text: '🔥 小张的个人博客', link: '/blog/小张的个人博客' },
          { text: '⭐ ruyu-blog博客', link: '/blog/ruyu-blog博客部署教程' },
        ],
      },
      {
        text: '🔥 专栏',
        items: [
          { text: '🔥 前端算法', link: '/algorithm/guide/' },
          { text: '🔥 设计模式', link: '/patterns/guide/' },
          { text: '📋 面试大全', link: '/interview/' },
        ],
      },
      {
        text: '编程',
        items: [
          { text: '⭐ 资源导航', link: '/favorites' },
          { text: '💻 编程学习', link: '/program/' },
          { text: '🔧 编程工具', link: '/tool/' },
        ],
      },
      {
        text: '洞见',
        items: [
          { text: '✏️ 随笔', link: '/essay/' },
          { text: '🌱 青葱岁月', link: '/green/ch' },
        ],
      },
      {
        text: `v${docsVersion}`,
        items: [
          { text: '🧱 参与贡献', link: '/contributing' },
          { text: '🎉 更新日志', link: `${github}/releases` },
        ],
      },
      {
        text: '🔗 友链',
        items: [
          { text: '🧱 友链1', link: '友链链接2' },
          { text: '🎉 友链2', link: '友链链接2' },
        ],
      },
    ],
    // algolia搜索
    search: {
      provider: 'algolia',
      options: algolia,
    },
    sidebar: {
      // 为 /blog 路由配置侧边栏
      '/blog/': [
        {
          text: '博客部署教程',
          collapsed: true, // 使此部分可折叠
          items: [
            { text: '小张的个人博客', link: '/blog/小张的个人博客.md' },
            { text: 'ruyu-blog博客部署教程', link: '/blog/ruyu-blog博客部署教程' },
            // 这里可以添加更多的文章链接
          ],
        },
      ],
    },
    socialLinks,
  },
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'keywords', content: keywords }],
    ['meta', { name: 'author', content: 'Choi Yang' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { name: 'application-name', content: name }],
    ['meta', { name: 'apple-mobile-web-app-title', content: name }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],

    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/chodocs-logo.svg', color: '#06f' }],
    ['meta', { name: 'theme-color', content: '#06f' }],

    ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/icons/apple-touch-icon.png' }],

    // webfont
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    // og
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // analytics
    ['script', { 'async': '', 'defer': '', 'data-website-id': `${process.env.UMAMI_WEBSITE_ID || ''}`, 'src': `${process.env.UMAMI_ENDPOINT || ''}` }],
  ],
  async buildEnd(siteConfig) {
    await sitemap({ hostname: 'https://chodocs.cn/' })
    await genFeed(siteConfig)
  },
}))
