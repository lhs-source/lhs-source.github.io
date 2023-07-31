import axios from 'axios';
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { Post } from './Post';
import postlist from '../../public/postlist.json'

export const usePosts = defineStore('post', () => {
  const postList = ref<Post[]>([]);
  const currentUrl = ref<string>('');

  async function fetchPostList() {
    // 로컬이면 public/postlist.json 파일로 가져오고, 
    // 아니면 axios로 가져온다.
    if (import.meta.env.DEV) {
      console.log('postlist', postlist);
      return postlist;
    } else {
      const res = await axios.get<Post[]>(`/postlist.json`);
      postList.value = res.data;
      return res.data;
    }
  }

  return {
    postList,
    currentUrl,
    fetchPostList,
  }
})