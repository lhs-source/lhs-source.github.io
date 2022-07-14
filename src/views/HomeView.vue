<template>
  <PageDefaultLayout class="home-wrapper">
    <div class="main-title">
      <div class="title typo-3">Development Log</div>
      <div class="by typo-1">Front End Dev</div>
      <div class="by typo-1h">Lee Hyunsoo</div>
      <div class="label-area">
        <div class="label-title typo-1h">I can do,</div>
        <div class="label-list invert" style="justify-content: flex-start;">
          <label 
            v-for="label of keywordList"
            :key="label.label"
            class="label"
            :style="{
              'background-color' : label.bgcolor ? label.bgcolor : '#fafafa',
              'color' : label.color ? label.color : '#1d1d1d',
            }">
            {{label.label}}
          </label>
        </div>
      </div>
      <div class="label-area">
        <div class="label-title typo-1h">I like,</div>
        <div class="label-list" style="justify-content: flex-end;">
          <label 
            v-for="label of ILikeList"
            :key="label.label"
            class="label">{{label.label}}</label>
        </div>
      </div>
    </div>
    <div class="post-area">
      <div class="post-title typo-1h">
        I posted,
      </div>
      <div class="post-list">
        <div
          v-for="post of postList"
          :key="post.url"
          class="post"
          @click="onClickPost(post)">
          <div class="name">{{post.title}}</div>
          <div class="tag-list">
            <label
              v-for="tag of post.tags"
              :key="tag" 
              class="tag">
              {{tag}}
            </label>
          </div>
        </div>
      </div>
    </div>
  </PageDefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Post } from "@/store/posts";
import { useRoute, useRouter } from 'vue-router';
import PageDefaultLayout from "@/component/Atom/PageDefaultLayout.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const keywordList = [
  {
    label: "FrontEnd",
    bgcolor: "#fafafa",
  }, {
    label: "Vue",
    bgcolor: "#41B883",
  }, {
    label: "C/C++", 
    bgcolor: "#19427C",
    color: "#fafafa",
  }, {
    label: "Android", 
    bgcolor: "#ACC953",
  }, {
    label: "Python", 
    bgcolor: "#4b8bbe",
    color: "#fafafa",
  }, {
    label: "Security", 
    bgcolor: "#fafafa",
  }, {
    label: "Crawl/Scrapping", 
    bgcolor: "#fafafa",
  }, {
    label: "Angular", 
    bgcolor: "#dd1b16",
    color: "#fafafa",
  }
]

const ILikeList = [
  {
    label: "Developing",
  }, {
    label: "LostArk",
  }, {
    label: "Drawing",
  }, {
    label: "KPOP",
  }, {
    label: "Figure",
  }
]


const postList = computed<Post[]>(() => {
  return store.state.Posts.postList;
}) 

const onClickPost = (post: Post) => {
  router.push(`/${post.url}`);
}

</script>

<style lang="scss" scoped>
$section-margin-top: 112px;

.home-wrapper {
  .main-title {
    width: 92vw;
    min-height: 260px;
    opacity: 0.98;
    padding-top: 64px;
    .title {
      padding: 0 48px;
      text-transform: uppercase;
    }
    .by {
    }
    .label-area {
      margin-top: $section-margin-top;
      .label-title {
      }

      .label-list {
        margin-top: 24px;
        padding: 24px 24px;

        border-top: 1px solid $color-primary-g-dark;
        border-bottom: 1px solid $color-primary-g-dark;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px 16px;
        label {
          background-color: $color-primary-g-dark;
          color: $color-primary-white;
          padding: 4px 8px;
        }
        &.invert {
          background-color: $color-primary-g-dark;
          border-color: $color-primary-white;
          label {
            background-color: $color-primary-white;
            color: $color-primary-g-dark;
          }
        }
      }
    }
  }
  .post-area {
    padding-top: calc($section-margin-top * 2);
    background-color: $color-primary-white;
    .post-title {
    }
    .post-list {
      padding-top: 64px;
      padding-bottom: 64px;
      width: 92vw;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-columns: auto;
      .post {
        padding: 32px;
        box-shadow: 0 0 0 0px $color-primary-g-dark inset; 
        box-sizing: border-box;

        word-break: keep-all;

        cursor: pointer;
        user-select: none;
        transition: .2s;;

        .name {
          font-size: 1.25rem;
          font-weight: 600;
          min-height: 4rem;
          transition: .2s;
        }
        .tag-list {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px 8px;
          label {
            padding: 2px 3px 2px 4px;
            transition: .2s;
          }
        }
        &:hover {
        box-shadow: 0 -3px 0 $color-primary-g-dark inset; 
          .name {
            transform: scale(1.1, 1.1);
            color: black;
          }
        }
      }
    }
  }
}

// modile
@media screen and (max-width: 480px) {
  .post-list {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 1280px) and (max-width: 4000px) {
  .main-title {
    .title {
      padding-top: 128px !important;
    }
    .label-area {
      margin-top: calc($section-margin-top * 2) !important;
    }
  }
  .post-list {
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    .post {
      .name {
        font-size: 1.2rem;
      }
    }
  }
}

</style>