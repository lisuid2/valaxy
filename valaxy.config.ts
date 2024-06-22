import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import { addonAlgolia } from 'valaxy-addon-algolia'
import { addonTwikoo } from 'valaxy-addon-twikoo'
import { VitePWA } from 'vite-plugin-pwa'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts
  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '理随小站',
      cloud: {
        enable: true,
      },
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2016,
      beian: {
        enable: false, // 禁用备案信息
        icp: '苏ICP备17038157号', // 如果禁用备案，您可以删除或注释掉这行
      },
    },
  },

  unocss: { safelist },

  siteConfig: {
    comment: {
      enable: true,
    },
  },

  addons: [
    addonAlgolia({
      appId: 'BKA735C3I3', // 填写您的 Algolia appId
      apiKey: '2ce993c7a2d6def6bb3995197d66878d', // 填写您的 Algolia apiKey
      indexName: '理随', // 填写您的 Algolia indexName
    }),
    addonTwikoo({
      envId: 'https://twikoo.lisui.top/.netlify/functions/twikoo', // 填写您的 Twikoo 环境 ID
      region: 'ap-shanghai', // 根据您的 Twikoo 配置，填写地区代码
    }),
  ],

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: '理随小站',
          short_name: '理随',
          description: 'Treat yourself well.',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
  },
})