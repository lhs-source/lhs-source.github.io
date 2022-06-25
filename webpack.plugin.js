const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-wp5-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const posts = require('./public/posts/postlist.json')
const routes = posts.map(post => `/${post.url}`)
const paths = posts.map(post => {
  return { 
    path: `/${post.url}/`,
    lastmod: post.updatedAt || post.createdAt,
    changefreq: 'yearly'
  }
})

module.exports = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ["/", ...routes],
    postProcess(renderedHtml) {
      let { html, route } = renderedHtml;
      console.log('renderedHtml', renderedHtml);
      const foundPost = posts.find(post => route.includes(post.url))
      if(foundPost == null) {
        return renderedHtml;
      }
      const { title, description, tags } = foundPost;
      const titleText = title ? title.replace(/<br>/ig, '') : process.env.VUE_APP_TITLE
      const descriptionText = description || '이현수 개발기'
      const tagsText = tags || '개발, 프론트엔드, 블로그, github pages, Vue3'
      const url = `${process.env.VUE_APP_BASE_URL}${route}`
      const imgUrl = `${process.env.VUE_APP_BASE_URL}/images/thumbnail.jpg`

      console.log("title, description, tags", title, description, tags);
      const metaData = `
        <title>${titleText}</title>
        <meta name="title" content="${titleText}" />
        <meta name="description" content="${descriptionText}" />
        <meta name="keywords" content="${tagsText}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${titleText}" />
        <meta property="og:description" content="${descriptionText}" />
        <meta property="og:image" content="${imgUrl}" />
        <meta property="twitter:card" content="${imgUrl}" />
        <meta property="twitter:url" content="${url}" />
        <meta property="twitter:title" content="${titleText}" />
        <meta property="twitter:description" content="${descriptionText}" />
        <meta property="twitter:image" content="${imgUrl}" />
      `;
      const start = html.indexOf('<head>') + '<head>'.length;
      html = html.slice(0, start) + metaData + html.slice(start);
      renderedHtml.html = html;
      return renderedHtml;
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: '#app',
    }),
  }),
  new SitemapPlugin({
    base: process.env.VUE_APP_BASE_URL,
    paths
  })
];