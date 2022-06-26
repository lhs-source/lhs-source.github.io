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
import PageDefaultLayout from "@/component/PageDefaultLayout.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const chooseClass = () => {
  const random = Math.random() * 4;
  if(random < 1) {
    return "typo-5";
  }
  else if(random < 2) {
    return "typo-4";
  }
  else if(random < 3) {
    return "typo-3";
  }
  else if(random < 4) {
    return "typo-2";
  }
}

const HTMLTagList = [
  {
    tag: "html",
    class: chooseClass(),
  }, 
  {
    tag: "head",
    class: chooseClass(),
  }, 
  {
    tag: "body",
    class: chooseClass(),
  }, 
  {
    tag: "title",
    class: chooseClass(),
  }, 
  {
    tag: "meta",
    class: chooseClass(),
  }, 
  {
    tag: "div",
    class: chooseClass(),
  }, 
  {
    tag: "a",
    class: chooseClass(),
  }, 
  {
    tag: "script",
    class: chooseClass(),
  }, 
  {
    tag: "link",
    class: chooseClass(),
  }, 
  {
    tag: "img",
    class: chooseClass(),
  }, 
  {
    tag: "span",
    class: chooseClass(),
  }, 
  {
    tag: "p",
    class: chooseClass(),
  }, 
  {
    tag: "li",
    class: chooseClass(),
  }, 
  {
    tag: "ul",
    class: chooseClass(),
  }, 
  {
    tag: "style",
    class: chooseClass(),
  }, 
  {
    tag: "br",
    class: chooseClass(),
  }, 
  {
    tag: "h2",
    class: chooseClass(),
  }, 
  {
    tag: "input",
    class: chooseClass(),
  }, 
  {
    tag: "h3",
    class: chooseClass(),
  }, 
  {
    tag: "nav",
    class: chooseClass(),
  }, 
  {
    tag: "footer",
    class: chooseClass(),
  }, 
  {
    tag: "header",
    class: chooseClass(),
  }, 
  {
    tag: "iframe",
    class: chooseClass(),
  }, 
  {
    tag: "button",
    class: chooseClass(),
  }, 
  {
    tag: "strong",
    class: chooseClass(),
  }, 
  {
    tag: "i",
    class: chooseClass(),
  }, 
  {
    tag: "html",
    class: chooseClass(),
  }, 
  {
    tag: "section",
    class: chooseClass(),
  }, 
  {
    tag: "article",
    class: chooseClass(),
  }, 
  {
    tag: "address",
    class: chooseClass(),
  }, 
  {
    tag: "aside",
    class: chooseClass(),
  }, 
  {
    tag: "hggroup",
    class: chooseClass(),
  }, 
  {
    tag: "figcaption",
    class: chooseClass(),
  }, 
  {
    tag: "pre",
    class: chooseClass(),
  }, 
  {
    tag: "dd",
    class: chooseClass(),
  }, 
  {
    tag: "dt",
    class: chooseClass(),
  }, 
  {
    tag: "dl",
    class: chooseClass(),
  }, 
  {
    tag: "strong",
    class: chooseClass(),
  }, 
  {
    tag: "b",
    class: chooseClass(),
  }, 
  {
    tag: "small",
    class: chooseClass(),
  }, 
  {
    tag: "time",
    class: chooseClass(),
  }, 
]

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
        &.invert {
          background-color: $color-primary;
          border-color: $color-primary-white;
          label {
            background-color: $color-primary-white;
            color: $color-primary;
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
        box-shadow: 0 0 0 0px $color-primary inset; 
        box-sizing: border-box;

        cursor: pointer;
        user-select: none;
        transition: .2s;;

        .name {
          font-weight: 500;
          height: 4rem;
          transition: .2s;
        }
        .tag-list {
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
        box-shadow: 0 -3px 0 $color-primary inset; 
          .name {
            transform: scale(1.1, 1.1);
            color: black;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .post-list {
    grid-template-columns: 1fr;
  }
  
}

</style>