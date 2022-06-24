const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const posts = require('./public/posts/postlist.json')
const routes = posts.map(post => `/${post.url}`)

console.log('routes', routes);

const postPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'), // docs: output 디렉토리 명
    routes: routes,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: '#app'
    }),
  }),
];

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...postPlugins); // 상단에서 정의한 postPlugins 내용 삽입
    }
  }
}