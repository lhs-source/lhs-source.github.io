import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useTestStore = defineStore('test', () => {
  const postList = ref<any[]>([{
    id: 0,
    title: 'title0',
    content: 'content0',
    date: '2021-01-01',
  }]);

  async function fetchSomeData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        postList.value = [
          {
            id: 1,
            title: 'title1',
            content: 'content1',
            date: '2021-01-01',
          },
          {
            id: 2,
            title: 'title2',
            content: 'content2',
            date: '2021-01-02',
          },
          {
            id: 3,
            title: 'title3',
            content: 'content3',
            date: '2021-01-03',
          },
        ]
        resolve(postList.value);
      }, 1000);
    });
  }

  return {
    postList,
    fetchSomeData,
  }
})