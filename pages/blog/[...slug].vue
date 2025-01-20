<script setup lang="ts">

import dayjs from 'dayjs';

const route = useRoute();
const { data: article } = await useAsyncData("article", () =>
  // 파일 이름을 [...slug].vue 로 하면 route.params.slug 로 접근 가능
  queryContent(`/blog/${route.params.slug}`).findOne()
);

// {
//    "toc": { 
//     "title": "", 
//     "searchDepth": 2, 
//     "depth": 2, 
//     "links": [ 
//         { "id": "pinia-설치", "depth": 2, "text": "Pinia 설치" }, 
//         { "id": "nuxt-설정-파일에-pinia-추가", "depth": 2, "text": "Nuxt 설정 파일에 Pinia 추가" }, 
//         { "id": "스토어-생성", "depth": 2, "text": "스토어 생성" }, 
//         { "id": "컴포넌트에서-사용하기", "depth": 2, "text": "컴포넌트에서 사용하기" }, 
//         { "id": "선택-서버-사이드-렌더링ssr-설정", "depth": 2, "text": "(선택) 서버 사이드 렌더링(SSR) 설정", "children": [ 
//             { "id": "캐시-및-라이브러리-다시-설치", "depth": 3, "text": "캐시 및 라이브러리 다시 설치" }, 
//             { "id": "pinia-사용을-수동으로-등록", "depth": 3, "text": "Pinia 사용을 수동으로 등록" } 
//         ] } 
//     ] }
// }
const tableOfContents = article?.value?.body?.toc;

</script>

<template>
  <main class="p-4 pb-24">
    <ContentRenderer v-if="article" :value="article">
      <div class="max-w-2xl mx-auto mt-12">
        <div class="text-sm text-stone-600 dark:text-stone-400 mt-2">
          {{ dayjs(article.created).format('YYYY-MM-DD') }} 
          <template v-if="article.updated !== article.created">[수정: {{ dayjs(article.updated).format('YYYY-MM-DD') }}]</template>
        </div>
        <h1 class="title">{{ article.title }}</h1>
        <div class="flex flex-wrap gap-1 mt-4">
          <Badge v-for="tag in article.tags" :key="tag">
            {{ tag }}
          </Badge>
        </div>
        <div v-if="tableOfContents?.links" class="toc mt-16">
          <h2>목차</h2>
          <ul>
            <li v-for="link in tableOfContents.links" :key="link.id">
              <a :href="'#' + link.id">{{ link.text }}</a>
              <ul v-if="link.children">
                <li v-for="child in link.children" :key="child.id">
                  <a :href="'#' + child.id">{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ContentRendererMarkdown 
          :value="article" 
          class="text-stone-300 mt-16" />
      </div>
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap');
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
main {
  font-family: 
  /* "Gowun Dodum", */
    "Pretendard-Regular",
    serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
}
h1 {
  font-size: 1.4em;
  padding-top: 16px;
  padding-bottom: 8px;
}
h1.title {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
  padding-top: 16px;
  padding-bottom: 8px;
}
h3 {
  padding-top: 16px;
  padding-bottom: 8px;
}
p {
  padding-top: 0.6em;
  padding-bottom: 0.6em;
}
a {
  color: #42b883;
  text-decoration: underline;
}
ol, ul {
  padding-top: 0.8em;
  padding-bottom: 0.8em;
}
li {
  list-style-type: disc;
  margin-left: 1.2em;
  padding-left: 0.2em;
}

blockquote {
  padding: 0.8em;
  margin: 0.8em 0;
  background-color: #0c2d20;
  border-left: 0.25em solid #42b883;
}

/* pre 에 포함된 code 제외하고, 나머지 code 에 대해서 스타일을 적용 */
:not(pre) > code {
  background-color: #1a5138;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  font-size: 0.85em;
}
pre {
  font-size: 0.8rem;
}

/* table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  margin-bottom: 1em;
}
table th {
  border: 1px solid #0c2d20;
  padding: 0.5em 1em;
}
table td {
  border: 1px solid #0c2d20;
  padding: 0.5em 1em;
}

</style>