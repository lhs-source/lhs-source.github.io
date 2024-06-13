<script setup lang="ts">
import { onMounted } from 'vue';
import { usePosts } from '../store/posts';

const props = defineProps<{
  isOpen: boolean;
}>();

const posts = usePosts();

onMounted(() => {
  posts.fetchPostList();
});

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
@import '/src/pages/post.scss';

aside {
  z-index: 5;
  position: fixed;
  top: $header-height;
  left: 0;
  display: flex;
  justify-content: flex-end;
  width: calc((100% - $post-width-max) / 2 - 64px);
  min-width: $post-list-frame-width-min;
  height: 100%;
  background-color: #242424;
  border-right: 1px dotted rgba(84, 84, 84, .48);

  transition: left 0.25s;

  .post-list {
    display: flex;
    flex-direction: column;
    width: $post-list-width;
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

@media screen and (max-width: $media-posts) {
  aside {
    left: -$post-list-frame-width-min;
    &.open {
      left: 0;
    }
  }
}


</style>