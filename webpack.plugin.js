const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-wp5-plugin')

const posts = require('./public/posts/postlist.json')
const routes = posts.map(post => `/${post.url}`)

module.exports = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'), // docs: output 디렉토리 명
    routes: ["/", ...routes],
    // postProcess(renderedRoute) {
    //   console.log(renderedRoute);
    // },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: '#app',
    }),
  }),
];