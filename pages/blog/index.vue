<script setup lang="ts">
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PostCard from './PostCard.vue';
// import { Header } from '@/components'

const { data: blog } = await useAsyncData("blog", () => queryContent("/blog").find());
const { data: tags } = await useAsyncData("tags", () => queryContent("/blog").only(['tags']).find());
const allTagList: any[] = [];
// 태그마다 개수를 세서 내림차순으로 정렬
if(tags.value) {
  const tagList = tags.value.map(tag => tag.tags.split(', ')).flat();
  const tagCount = tagList.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  for(let tagName of Object.keys(tagCount)) {
    allTagList.push({
      tagName,
      count: tagCount[tagName]
    });
  }
}
const selectedTag = ref<string | null>(null);
async function onClickTag(tag: { tagName: string, count: number } | null) {
  if(tag === null) {
    selectedTag.value = null;
    blog.value = await queryContent("/blog").find();
  } else {
    selectedTag.value = tag.tagName;
    blog.value = await queryContent("/blog").where({ tags: { $contains: selectedTag.value }}).find();
    console.log('blog.value', blog.value);
  }
}
</script>

<template>
  <div class="wrapper w-full">
    <Header />
    <div class="w-full py-8 px-4">
      <h1 class="text-5xl text-center font-bold">글 목록</h1>
    </div>
    <div class="w-full max-w-7xl  mx-auto py-8 px-10">
      <div>
        <Badge 
          :variant="selectedTag === null ? 'default' : 'secondary'"
          class="cursor-pointer hover:underline hover:font-bold"
          @click="onClickTag(null)">
          전체보기
        </Badge>
        <Badge 
          v-for="tag of allTagList" 
          :key="tag"
          class="cursor-pointer hover:underline hover:font-bold"
          :variant="selectedTag === tag.tagName ? 'default' : 'secondary'"
          @click="onClickTag(tag)">
          {{ tag.tagName }}({{ tag.count }})
        </Badge>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-10 grid grid-cols-3 gap-12 mt-4">
      <PostCard 
        v-for="item in blog"
        :post="item" />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap');


.wrapper {
  /* font-family: 
    'Noto Serif',
    'Noto Serif KR',
    sans-serif; */
  
  /* font-family: "Jua", serif;
  font-weight: 400;
  font-style: normal; */
  font-family: "Gowun Dodum", serif;
  font-weight: 400;
  font-style: normal;
}

a {
  color: #0070f3;
  text-decoration: underline;
}
</style>