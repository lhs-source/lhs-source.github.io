<script setup>
import dayjs from 'dayjs';

const { data: blog } = await useAsyncData("blog", () => queryContent("/blog").find());
</script>

<template>
  <div class="w-full">
    <div class="w-full py-8 px-4">
      <h1 class="text-6xl text-center">이현수 글목록</h1>
    </div>
    <div class="max-w-7xl mx-auto p-10 grid grid-cols-2 gap-4">
      <div v-for="item in blog">
        <div>
          <h2 class="text-xl">{{ item.title }}</h2>
          <div v-if="item.tags" class="flex flex-wrap gap-1">
            <span 
              v-for="tag of item.tags.split(', ')" 
              :key="tag">
              <span class="text-sm text-gray-100 bg-gray-500 rounded-md px-1">
                #{{ tag }}
              </span>
            </span>
          </div>
          <div class="text-sm">
            최초 작성 {{ dayjs(item.created).format('YYYY-MM-DD') }}
          </div>
          <div class="text-sm">
            최종 업뎃 {{ dayjs(item.updated).format('YYYY-MM-DD') }}
          </div>
        </div>
        <img v-if="item.image" :src="`/images/${item.image}`" class="w-full" :alt="`image for ${item.title} article`" />
        <p class="mt-4 font-medium text-gray-500">{{ item.description }}</p>
        <div>
         <a :href="item._path" class="hover:underline hover:text-blue-500">Read More </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a {
  color: #0070f3;
  text-decoration: underline;
}
</style>