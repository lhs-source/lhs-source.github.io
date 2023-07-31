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
    // ! -> 굳이 필요 없이 모두 axios 로 가져오면 됨.
    // ! -> vite-ssg 에서 onMounted 등의 훅에서는 빌드 중에 실행하지 않는다.
    const res = await axios.get<Post[]>(`/postlist.json`);
    postList.value = res.data;
    return res.data;
  }

  return {
    postList,
    currentUrl,
    fetchPostList,
  }
})