<script setup lang="ts">
import { usePosts } from '../store/posts';


const posts = usePosts();
posts.fetchPostList();

</script>

<template>
  <div class="post-index-wrapper">
    <header>TO BE HEADER</header>
    <nav>
      <ul>
        <li v-for="post in posts.postList" :key="post.fileName">
          <router-link :to="`/posts/${post.fileName}`">{{ post.title }}</router-link>
        </li>
      </ul>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer>TO BE FOOTER</footer>
  </div>
</template>

<style>
.post-index-wrapper {
  min-height: 100vh;
  background-color: #242424;
  color: rgba(235, 235, 235, .6);
  color: rgba(255, 255, 255, .87);
}
header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #242424;
  border-bottom: 1px dotted rgba(84, 84, 84, .48);
}
nav {
  z-index: 5;
  position: fixed;
  top: 72px;
  left: 0;
  width: 20%;
  height: 100%;
  background-color: #242424;
  border-right: 1px dotted rgba(84, 84, 84, .48);
}
main {
  padding-top: 84px;
  padding-left: 24%;
}
footer {
  z-index: 7;
  position: relative;
  height: 72px;
  background-color: #242424;
  border-top: 1px dotted rgba(84, 84, 84, .48);
}

.markdown-body {
  max-width: 688px;
}
.table-of-contents {
  position: absolute;
  right: 0;
  padding-right: 36px;
  width: 300px;
}
pre {
  background-color: #404040;
  padding: 8px;
}
code {

}
a {
  color: #42b883;
  font-weight: 700;
}
div code {
  background-color: #2f2f2f;
  color: #33a06f;
}
ul {
  padding: 16px;
  padding-left: 32px;
}

</style>