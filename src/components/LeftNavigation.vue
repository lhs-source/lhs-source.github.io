<script setup lang="ts">
import { usePosts } from '../store/posts';

const props = defineProps<{
  isOpen: boolean;
}>();

const posts = usePosts();
posts.fetchPostList();

</script>

<template>
  <aside :class="{'open' : props.isOpen}">
    <div class="post-list">
      <div 
        v-for="post in posts.postList" 
        :key="post.fileName" 
        class="post">
        <router-link :to="`/posts/${post.fileName}`">{{ post.title }}</router-link>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
// variables 임시
$color-text-lighter: rgba(255, 255, 255, .92);
$color-text-normal: rgba(255, 255, 255, .87);
$color-text-darker: rgba(235, 235, 235, .6);

$vue-color-green: #42b883;
$vue-color-blue: #35495e;

aside {
  z-index: 5;
  position: fixed;
  top: 55px;
  left: 0;
  display: flex;
  justify-content: flex-end;
  width: 24%;
  min-width: 270px;
  height: 100%;
  background-color: #242424;
  border-right: 1px dotted rgba(84, 84, 84, .48);

  transition: left 0.25s;

  .post-list {
    display: flex;
    flex-direction: column;
    width: 240px;
    padding-top: 72px;
    .post {
      padding: 4px 32px;
      a {
        font-size: 0.75rem;
        text-decoration: none;
        color: $color-text-darker;
        font-weight: 600;
        transition: color 0.2s;
        &:hover {
          color: $color-text-lighter;
        }
      }
      &.selected {
        color: $vue-color-green;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  aside {
    left: -270px;
    &.open {
      left: 0;
    }
  }
}


</style>