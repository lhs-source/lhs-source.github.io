<script setup lang="ts">
import dayjs from 'dayjs';

interface BlogPost {
  title: string;
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
  <Card class="post-card-wrapper">
    <CardHeader>
      <a :href="post._path" class="hover:underline hover:text-blue-500">
        <h2 class="text-l h-12">
          {{ post.title }}
        </h2>
      </a>
      <div v-if="post.tags" class="flex flex-wrap gap-1 mt-2 h-12">
        <span v-for="tag of post.tags.split(', ')" :key="tag">
          <Badge>
            {{ tag }}
          </Badge>
        </span>
      </div>
      <div class="text-sm text-muted-foreground">
        최초 작성 {{ dayjs(post.created).format('YYYY-MM-DD') }}
      </div>
      <div class="text-sm text-muted-foreground">
        최종 업뎃 {{ dayjs(post.updated).format('YYYY-MM-DD') }}
      </div>
    </CardHeader>
    <CardContent class="post-card-description">
      <img 
        v-if="post.image" 
        class="w-full" 
        :src="`/images/${post.image}`" 
        :alt="`image for ${post.title} article`" />
      <p class="mt-4 pt-4 font-medium text-stone-100">{{ post.description }}</p>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
</template>
<style scoped>

.post-card-wrapper {
  position: relative;
  left: 16px;
}
.post-card-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: -16px;
  width: 100%;
  height: 100%;
  background-color: #86cd8d;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  z-index: -1;
}
.post-card-description {
  position: relative;
  left: -6%;
  right: -30px;
  width: 108%;
  background-color: #3d744f;
}

</style>