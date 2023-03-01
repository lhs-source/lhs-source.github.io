import axios from 'axios';
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { Post } from './Post';

export const usePosts = defineStore('post', () => {
  const postList = ref<Post[]>([]);
  const currentUrl = ref<string>('');

  async function fetchPostList() {
    axios.get<Post[]>(`/postlist.json`).then(res => {
      postList.value = res.data;
      return res.data;
    });
  }

  return {
    postList,
    currentUrl,
    fetchPostList,
  }
})