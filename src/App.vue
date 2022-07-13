<template>
  <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch("Posts/requestGetPostList");

</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
#app {
  font-family: Pretendard, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-primary;
}
</style>
