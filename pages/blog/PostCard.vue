<script setup lang="ts">
import dayjs from 'dayjs';

interface BlogPost {
  title: string;
  subject: string;
  tags: string;
  created: string;
  updated: string;
  image: string;
  description: string;
  _path: string;
}
const props = defineProps<{
  post: BlogPost;
}>();

</script>
<template>
  <Card class="post-card-wrapper text-stone-700">
    <CardHeader class="min-h-[50%]">
      <div class="mt-2">
        <div class="text-sm text-stone-600 dark:text-stone-400 mt-2">
          {{ dayjs(post.created).format('YYYY-MM-DD') }} <template v-if="post.updated !== post.created">[수정: {{ dayjs(post.updated).format('YYYY-MM-DD') }}]</template>
        </div>
      </div>
      <a 
        :href="post._path" 
        class="hover:underline text-stone-600 hover:text-blue-500 dark:text-stone-300 dark:hover:text-blue-300">
        <h2 class="text-xl font-bold">
          {{ post.title }}
        </h2>
      </a>
      <div v-if="post.tags" class="flex flex-wrap gap-1 mt-2">
        <span v-for="tag of post.tags" :key="tag">
          <Badge variant="secondary">
            {{ tag }}
          </Badge>
        </span>
      </div>
    </CardHeader>
    <CardContent class="post-card-description">
      <img 
        v-if="post.image" 
        class="w-full" 
        :src="`/images/${post.image}`" 
        :alt="`image for ${post.title} article`" />
      <p class="mt-2 pt-4 font-medium text-stone-700 dark:text-stone-300">{{ post.description }}</p>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
</template>
<style scoped>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

a {
  text-decoration: none;
}
.post-card-wrapper {
  position: relative;
  left: 16px;
  line-height: 1.4;
}
.post-card-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: -16px;
  width: 100%;
  height: 100%;
  background-color: #35495e;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  z-index: -1;
}
.post-card-description {
  /* position: relative;
  left: -6%;
  right: -30px;
  width: 108%;
  background-color: #35495e;
  font-weight: 400; */

  /* font-family: "Pretendard-Regular", serif;
  font-weight: 400;
  font-style: normal; */
  
}

</style>