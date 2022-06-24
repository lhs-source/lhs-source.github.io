<template>
  <div class="about">
    <h1>글 테스트</h1>
    <div ref="postArea">

    </div>
    <div>
      url: {{post.url}}
      title: {{post.title}}
      fileName: {{post.fileName}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore();
const route = useRoute();
const router = useRouter();

const paramId = route.params.id;
const postContents = ref("");
const postArea = ref();

store.dispatch("Posts/moveCurrentUrl", paramId);
const post = computed(() => {
  return store.getters["Posts/currentPost"];
});
console.log('post', post.value);

onMounted(() => {
  store.dispatch("Posts/requestGetMarkdoen", post.value.fileName).then((res) => {
    postContents.value = res;
    
    if(postArea.value) {
      postArea.value.innerHTML = postContents.value;
    }
  })
})


</script>


<style lang="scss">


</style>

