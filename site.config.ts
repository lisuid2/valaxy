import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://vuna.cn/',
  lang: 'zh-CN',
  title: '理随',
  author: {
    name: 'Sui',
    avatar: 'https://s3.qjqq.cn/3/64de148060f7b.webp!color'
  },
  description: 'Treat yourself well.',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/lisuid2',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/stat1123',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: 'mailto:lisui42@outlook.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: true,
  },

  sponsor: {
    enable: false,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },

  statistics: {
    enable: true,
    readTime: {
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },

  mediumZoom: {
    enable: true,
  },

  vanillaLazyload: {
    enable: true,
  },
})
