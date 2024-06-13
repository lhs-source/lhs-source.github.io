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
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </main>
</template>

<style>
h1 {
  font-size: 2em;
  color: #333;
}
h2 {
  font-size: 1.5em;
  color: #333;
}
p {
  padding-top: 4px;
  padding-bottom: 4px;
}
a {
  color: #0070f3;
  text-decoration: underline;
}
pre {
  background-color: #bdd4c5;
  padding: 8px;
  overflow-x: auto;
}
p code {
  background-color: #bdd4c5;
  padding: 2px 4px;
}
pre code {
  background-color: unset;
  color: unset;
}
</style>