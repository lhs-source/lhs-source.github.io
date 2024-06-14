<script setup lang="ts">

const route = useRoute();
const { data: article } = await useAsyncData("article", () =>
  // 파일 이름을 [...slug].vue 로 하면 route.params.slug 로 접근 가능
  queryContent(`/blog/${route.params.slug}`).findOne()
);
</script>

<template>
  <main class="p-4">
    <ContentRenderer :value="article">
      <h1>{{ article.title }}</h1>
      <h3>{{ article.tags }}</h3>
      <h3>{{ article.created }}</h3>
      <h3>{{ article.updated }}</h3>
      <ContentRendererMarkdown :value="article" class="text-stone-300"/>
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');
main {
  font-family: 
    'Noto Serif',
    'Noto Serif KR',
    sans-serif;
}
h1 {
  font-size: 1.4em;
}
h2 {
  font-size: 1.5em;
}
p {
  padding-top: 4px;
  padding-bottom: 4px;
}
a {
  color: #0070f3;
  text-decoration: underline;
}
</style>