<template>
  <PageDefaultLayout class="about">
    <h1 class="title">
      {{post.title}}
    </h1>
    <div class="tag-list">
      <label
        v-for="tag of post.tags"
        :key="tag">
        {{tag}}
      </label>
    </div>
    <div 
      ref="postArea"
      class="post">
    </div>
  </PageDefaultLayout>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PageDefaultLayout from "@/component/PageDefaultLayout.vue";

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
.title {
  margin-top: 64px;
}
.post {
  padding: 64px;
  text-align: left;
}

</style>

