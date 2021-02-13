module.exports = {
    base: '/tamarous_blog/',
    themeConfig: {
        repo: 'https://github.com/tamarous/tamarous_blog',
        repoLabel: '仓库链接',
        nav: [
            { text: 'Home', link: '/'},
            { text: 'iOS', items: [
                { text: 'Aspects', link: '/iOS/Aspects 源码分析.md'}
               ]
            }
        ],
        sidebar: [
            '/',
            '/iOS/Aspects 源码分析.md'
        ]
    }
}

