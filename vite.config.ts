import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // 마크다운 파일도 인식하기
    }),
    Markdown(),
    Layouts(),
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'src/posts',
      /**
       * 생성된 라우트에 추가 로직을 작성한다.
       * @param route 생성된 라우트
       * @returns 
       */
      extendRoute(route) {
        console.log('route', route);
        return route;
      }
    }),
  ],
})
