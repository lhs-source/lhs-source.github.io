
<script setup lang="ts">
/**
 * # 포스팅 리스트로 바로 이동하는 링크
 * - index.vue 에서 사용
 * - 페이지 우측 하단에 fixed 로 고저함
 */

import { onMounted, ref } from "vue";

// @ref 페이지 이동 링크
const refLink = ref<HTMLElement | null>(null);

// intersection observer fade in effect
const observer = new IntersectionObserver((entries, observer) => {
  console.log('observer callback', entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  })
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
});

onMounted(() => {
  // 초기에 없었다 나타남 효과 observe 시작
  observer.observe(refLink.value as HTMLElement);

});

</script>

<template>
  <a href="/posts" class="go-post-list" ref="refLink">
    <div class="text">Go Post</div>
  </a>
</template>

<style scoped lang="scss">
.go-post-list {
  position: fixed;
  bottom: 16px;
  right: 16px;
  opacity: 0;

  &.show {
    opacity: 1;
    transition: opacity 1s ease-in-out;
  }
}


</style>