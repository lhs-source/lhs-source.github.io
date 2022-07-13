<template>
  <PageDefaultLayout>
    <div class="detail-wrapper">
      <div class="toc" :class="{open: openToc === true}">
        <div class="toc-toggle" @click="onClickToggleToc">
          <div class="open">목차</div>
        </div>
        <div 
          v-html="tocContents"/>
      </div>
      <div class="contents">
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
          class="post"
          v-html="postContents">
        </div>
        <div class="post-footer">
          포스팅은 여기까지입니다. <br />
          의견은 <a href="mailto:iddms5446@gmail.com">iddms5446@gmail.com</a>으로 보내주시면 감사드리겠습니다!
        </div>
      </div>
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
const tocContents = ref("");
const postArea = ref();

const openToc = ref<boolean>(false);

store.dispatch("Posts/moveCurrentUrl", paramId);
const post = computed(() => {
  return store.getters["Posts/currentPost"];
});

onMounted(() => {
  store.dispatch("Posts/requestGetMarkdoen", post.value.fileName).then((res) => {
    const re = /<div class="table-of-contents">.*<\/div>/g;
    const toc = re.exec(res);
    postContents.value = res;
    tocContents.value = toc[0];
  })
})

const onClickToggleToc = () => {
  openToc.value = !openToc.value;
  console.log('openToc.value', openToc.value);
}


</script>


<style lang="scss">
.detail-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  .toc {
    flex-grow: 3;
    max-width: 360px;
    min-width: 280px;

    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;

    display: flex;
    align-items: center;
    border-right: 1px solid $color-primary;

    .toc-toggle {
      display: none;
    }

    .table-of-contents {
      padding-right: 16px;
      ul {
        padding-left: 16px;
        list-style-type: none;
        text-align: left;
        margin: 0;
        li {

        }
      }
      a {
        &:link {
          color: $color-primary;
          font-weight: 500;
          line-height: 2;
          text-decoration: none;
        }
        &:visited {
          color: $color-primary;
        }
        &:before {
          content: "📌 ";
        }
      }
    }
  }
  .contents {
    flex-grow: 5;
    min-width: 100px;
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
      word-break: keep-all;
      line-height: 1.4;

      .table-of-contents {
        display: none;
        position: sticky;
        left: -24vw;
        top: 0;
        width: 24vw;
        background-color: #fafafa;
        padding: 16px 0;
      }

      img {
        max-width: 100%;
        outline: 1px solid $color-primary;
      }
      pre {
        background-color: #dadada;
        margin: 24px 0;
        padding: 16px;
        overflow-x: auto;
        line-height: 1.3;
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
  
  .post-footer {
    margin: 0 auto;
    padding: 32px 0;
    max-width: 720px;
    // border-top: 2px solid #dadada;
  }
}

@media screen and (max-width: 720px) {
  .detail-wrapper {
    .toc {
      position: fixed;
      width: 100vw;
      max-width: 100vw;
      transform: translateX(calc(100vw - 40px));
      transition: .25s;

      align-items: flex-start;

      .toc-toggle {
        display: unset;
        width: 40px;
        padding: 8px;
        box-sizing: border-box;
        .open {
          width: 24px; height: 24px;
          border-radius: 8px;
          background-color: rgb(239, 238, 238);
          box-shadow: 1px 2px 6px #1d1d1d55;
          font-size: 0.5rem;
          padding: 6px 0;
          box-sizing: border-box;
          white-space: nowrap;
        }
      }
      .table-of-contents {
        background-color: #fafafa;
        height: 100vh;
        box-sizing: border-box;
        border-left: 1px solid $color-primary;

        display: flex;
        align-items: center;
      }
      &.open {
        transform: translateX(0);
      }
    }
  }
}
</style>

