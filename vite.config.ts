import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import MDAnchor from "markdown-it-anchor";
import MDToc from "markdown-it-table-of-contents";
import MDPrism from "markdown-it-prism";
import generateSitemap from 'vite-plugin-pages-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 마크다운 파일도 인식하기
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItUses: [
        MDPrism,
      ],
      markdownItSetup(md) {
        // H 태그에 anchor 추가
        md.use(MDAnchor)
        // toc 지원
        md.use(MDToc)
        // prism 코드 하이라이터
        md.use(MDPrism)
      },
    }),
    Layouts(),
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'src/pages',
      /**
       * 생성된 라우트에 추가 로직을 작성한다.
       * @param route 생성된 라우트
       * @returns 
       */
      extendRoute(route) {
        console.log('route', route);
        return route;
      },
      onRoutesGenerated: routes => (generateSitemap({ 
        routes: routes,
        hostname: 'https://lhs-source.github.io/',
        exclude: ["/study", "/study/scrolldown", "/gsap"]
      })),
    }),
  ],
})
