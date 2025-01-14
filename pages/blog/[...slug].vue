<script setup lang="ts">

import dayjs from 'dayjs';

const route = useRoute();
const { data: article } = await useAsyncData("article", () =>
  // 파일 이름을 [...slug].vue 로 하면 route.params.slug 로 접근 가능
  queryContent(`/blog/${route.params.slug}`).findOne()
);
</script>

<template>
  <main class="p-4 pb-24">
    <ContentRenderer v-if="article" :value="article">
      <div class="max-w-2xl mx-auto">
        <h1 class="py-4">{{ article.title }}</h1>
        <div class="flex flex-wrap gap-1">
          <Badge v-for="tag in article.tags.split(', ')" :key="tag">
            {{ tag }}
          </Badge>
        </div>
        <div class="mt-2">
          <h3 class="text-sm text-stone-600 dark:text-stone-400">
            최초 작성 {{ dayjs(article.created).format('YYYY-MM-DD') }}
          </h3>
          <h3 class="text-sm text-stone-600 dark:text-stone-400">
            최종 업뎃 {{ dayjs(article.updated).format('YYYY-MM-DD') }}
          </h3>
        </div>
        <ContentRendererMarkdown 
          :value="article" 
          class="text-stone-300 mt-8" />
      </div>
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </main>
</template>

<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
main {
  font-family: "Pretendard-Regular", serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
}
h1 {
  font-size: 1.4em;
}
h2 {
  font-size: 1.5em;
}
p {
  padding-top: 0.4em;
  padding-bottom: 0.4em;
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

/* pre 에 포함된 code 제외하고, 나머지 code 에 대해서 스타일을 적용 */
:not(pre) > code {
  background-color: #1a5138;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  font-size: 0.85em;
}
</style>