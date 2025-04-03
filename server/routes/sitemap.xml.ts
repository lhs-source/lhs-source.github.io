import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: 'https://hslee.world'
  })

  // format
//   _path: '/blog/vue2-reactivity',                                                                                                                                 9:06:29 AM
//   _dir: 'blog',
//   _draft: false,
//   _partial: false,
//   _locale: '',
//   title: 'Vue2, Vue3 Reactivity 비교 - Vue2 편',
//   description:
//    'Vue2 Vue3 의 Reactivity 비교. Vue2 Reactive에 대한 설명. VNODE, Watcher, Dependency, ref, reactive, update, vue hook 에 대해서 전반적인 설명.',
//   subject: 'Vue',
//   volumne: 'long',
//   tags: [ 'Vue', 'Vue2', 'Vue Reactivity', '반응성', 'Vue Rendering' ],
//   created: 2022-07-12T00:00:00.000Z,
//   updated: 2022-07-12T00:00:00.000Z,
//   filename: 'vue2-reactivity',
//   excerpt: undefined,
//   body: {...},
//   _type: 'markdown',
//   _id: 'content:blog:vue2-reactivity.md',
//   _source: 'content',
//   _file: 'blog/vue2-reactivity.md',
//   _extension: 'md' }
  for (const doc of docs) {
    console.log(doc);
    sitemap.write({
      url: doc._path,
      lastmod: doc.updated,
      changefreq: 'monthly'
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})