module.exports = {
  ttile: 'Storm-UI',
  description: 'Storm-UI',
  themeConfig: {
    siteTitle: false,
    logo: "/logo.jpg",
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Zai Xiao'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide' },
      { text: '组件', link: '/component/button', activeMatch: '/component' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            { text: 'Icon', link: '/component/icon' }
          ]
        }
      ]
    }
  }
}