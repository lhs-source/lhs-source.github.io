<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import Header from '../components/Header.vue';
import HeaderSubPost from '../components/HeaderSubPost.vue';
import LeftNavigation from '../components/LeftNavigation.vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();

const isOpenPostList = ref(false);
const isOpenToc = ref(false);

function onClickPostList(isOpen: boolean) {
  isOpenPostList.value = isOpen;
}
function onClickToc(isOpen: boolean) {
  isOpenToc.value = isOpen;
}

function createToc() {
  // 목차를 markdown-body 내부에서 제거한 후, 
  // 옆에 붙인다.
  const mdBody = document.querySelector(".markdown-body");
  const targetToc = document.querySelector(".new-table-of-contents");
  let toc = document.querySelector(".markdown-body .table-of-contents");
  const main = document.querySelector("main");

  if(mdBody && targetToc && toc && main) {
    targetToc.innerHTML = toc?.innerHTML!;
    // 라우트 변경 시 `.table-of-contents` 의 innerHTML 이 한번 제거되고 undefined 로 뜨기 때문에
    // display: none 만 붙여서 숨긴다.
    (toc as HTMLElement)?.style.setProperty("display", "none");
  }
}

watch(() => route.fullPath, () => {
  // SPA 라우트가 바뀔 때마다 toc 변경
  nextTick(() => {
    createToc();
  });
});

onMounted(() => {
  createToc();
})
</script>

<template>
  <div class="post-index-wrapper">
    <Header>
      <!-- 너비 좁을 때 보이는 서브 메뉴 -->
      <HeaderSubPost 
        class="header-sub-post"
        :is-open-post-list="isOpenPostList"
        :is-open-toc="isOpenToc"
        @click-post-list="onClickPostList"
        @click-toc="onClickToc">
      </HeaderSubPost>
    </Header>
    <LeftNavigation :is-open="isOpenPostList"></LeftNavigation>
    <main>
      <!-- 포스트 목록 -->
      <router-view></router-view>
      <div 
        class="new-table-of-contents"
        :class="{'open' : isOpenToc}"></div>
    </main>
    <footer>TO BE FOOTER</footer>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/pages/post.scss';

.post-index-wrapper {
  min-height: 100vh;
  background-color: $vue-background-color;
  color: $color-text-darker;
  color: $color-text-normal;
}
main {
  width: 100%;
  padding-top: 84px;
  padding-left: calc((100% - $post-width-max) / 2);
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  transition: padding .2s;
}
footer {
  z-index: 7;
  position: relative;
  height: 72px;
  background-color: $vue-background-color;
  border-top: 1px dotted rgba(84, 84, 84, .48);
}
// 목차
:deep(.new-table-of-contents) {
  flex: 1;
  position: relative;
  padding: 22px 36px;
  width: $toc-width;
  min-width: $toc-width;
  height: 100%;
  box-sizing: border-box;
  background-color: $vue-background-color;
  transition: right 0.3s;

  ul {
    list-style: none;
    padding-inline-start: 16px;
    li {
      padding-top: 8px;
      a {
        font-size: 0.75rem;
        text-decoration: none;
        color: $color-text-darker;
        font-weight: 600;
        line-height: 0.75rem;
        transition: color 0.2s;
        &:hover {
          color: $color-text-lighter;
        }
      }
      &.position {
        color: $vue-color-green;
      }
    }
  }
}

// 마크다운
:deep(.markdown-body) {
  max-width: $post-width-max;
  width: 100%;
  min-width: $post-width-min;
  font-size: 0.875rem;
  color: $color-text-lighter;
  // 텍스트
  h1 {
    font-weight: 700;
    text-decoration-style:double;
    text-decoration-line: underline;
    text-decoration-thickness: 3px;
    text-decoration-color: $vue-color-green;
  }
  // 링크
  a {
    color: #42b883;
    text-decoration-style:dashed ;
    text-decoration-thickness: 3px;
    font-weight: 700;
  }
  // 목록
  ul {
    padding: 16px;
    padding-left: 32px;
  }
  // 코드
  pre {
    padding: 8px;
    overflow-x: auto;
  }
  p code {
    background-color: #3b3b3b;
    padding: 2px 4px;
    color: $vue-color-green;
  }
  pre code {
    background-color: unset;
    color: unset;
  }
  // 이미지
  img {
    width: 100%;
    outline: 1px solid $color-text-darker;
  }
}




@media screen and (max-width: 1280px) {
  .new-table-of-contents {
    position: fixed;
    right: -$toc-width;
    width: $toc-width;
    &.open {
      right: 0;
    }
  }
  main {
    // 원래 왼쪽 패딩에서 toc-width 의 2/3만큼 오른쪽으로 더 이동
    padding-left: calc((100% - $post-width-max) / 2 + $toc-width * 2 / 3);
  }
}
@media screen and (max-width: 960px) {
  main {
    padding-left: 24px;
    padding-right: 24px;
    justify-content: center;
  }
}

</style>

<style>
@import "../assets/scss/prism-vscode.scss"; 
</style>