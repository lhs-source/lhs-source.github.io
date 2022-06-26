<template>
  <PageDefaultLayout class="detail-wrapper">
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
    <div class="date">
      작성일 : {{post.createdAt}}, <b>마지막 업데이트 : {{post.updatedAt}}</b>
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
.detail-wrapper {
  .title {
    margin: 64px 32px;
  }

  .tag-list {
    margin-top: 24px;
    padding: 24px 24px;

    border-top: 1px solid $color-primary;
    border-bottom: 1px solid $color-primary;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px 16px;
    label {
      background-color: $color-primary;
      color: $color-primary-white;
      padding: 4px 8px;
    }
  }

  .date {
    margin-top: 16px;
  }

  .post {
    margin: 0 auto;
    padding: 64px 32px;
    max-width: 720px;
    text-align: left;

    img {
      max-width: 100%;
      outline: 1px solid $color-primary;
    }
    pre {
      background-color: #dadada;
      margin: 24px 0;
      padding: 16px;
      overflow-x: auto;
    }
    code {
      background-color: #dadada;
      padding: 2px 3px 2px 4px;
      border-radius: 2px;
    }
    a {
      &:link {
        color: $color-primary;
        font-weight: 700;
      }
      &:visited {
        color: $color-primary;
      }
      &:before {
        content: "📎 ";
      }
    }
  }
}

</style>

