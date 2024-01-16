<script setup lang="ts">

const props = defineProps<{
  isOpenPostList: boolean;
  isOpenToc: boolean;
}>();
const emits = defineEmits<{
  (eventName: 'click-post-list', isOpen: boolean): void;
  (eventName: 'click-toc', isOpen: boolean): void;
}>();


/**
 * 서브 메뉴에서 포스트 목록을 클릭했다.
 * - 태블릿(720px이하)에서만 동작할 것이다.
 */
function onClickPostList() {;
  emits("click-post-list", !props.isOpenPostList);
}
/**
 * 서브 메뉴에서 포스트 목록을 클릭했다.
 * - 태블릿(720px이하)에서만 동작할 것이다.
 */
function onClickTOC() {
  emits("click-toc", !props.isOpenToc);
}

</script>

<template>
  <div class="header-sub-post">
    <div class="menu" @click="onClickPostList">📻포스팅 목록</div>
    <div class="menu" @click="onClickTOC">📚목차</div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/pages/post.scss';
// variables 임시
$color-text-lighter: rgba(255, 255, 255, .92);
$color-text-normal: rgba(255, 255, 255, .87);
$color-text-darker: rgba(235, 235, 235, .6);

$vue-color-green: #42b883;
$vue-color-blue: #35495e;

.header-sub-post {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu {
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
  &:hover {
    color: $vue-color-green;
  }
}

</style>