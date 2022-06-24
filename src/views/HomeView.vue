<template>
  <div class="home">
    <h1>블로그 목록 테스트</h1>
    <!-- <div class="original">{{markdownPost}}</div>
    <div class="result-html">{{md2html}}</div>
    <div class="converted" ref="postArea"></div> -->
    <div class="post-list">
      <div
        v-for="post of postList"
        :key="post.url"
        class="post"
        @click="onClickPost(post)">
        <div class="name">{{post.title}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Post } from "@/store/posts";
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();


const postList = computed<Post[]>(() => {
  return store.state.Posts.postList;
}) 

const onClickPost = (post: Post) => {
  router.push(`/${post.fileName}`);
}

</script>

<style lang="scss">
.post-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: auto;
  row-gap: 16px;
  column-gap: 16px;
  .post {
    padding: 32px;
    border: 1px solid #ccc;
  }
}


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