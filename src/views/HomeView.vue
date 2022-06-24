<template>
  <div class="home">
    <h1>마크다운 테스트</h1>
    <div class="original">{{markdownPost}}</div>
    <div class="result-html">{{md2html}}</div>
    <div class="converted" ref="postArea"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import showdown from 'showdown';

const markdownPost = `# heading 1

something...

# heading 2

# heading 3

# heading 4

`;

const postArea = ref();
const converter = new showdown.Converter()
const md2html = converter.makeHtml(markdownPost);

onMounted(() => {
  if(postArea.value) {
    console.log('postArea', postArea);
    postArea.value.innerHTML = md2html;
  }
})
</script>

<style lang="scss">
.original {

}
.result-html {
  margin-top: 112px;
  background-color: #eee;
}
.converted { 
  margin-top: 112px;
}
</style>