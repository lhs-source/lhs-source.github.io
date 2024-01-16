<script setup>
import { ref } from 'vue';

const text = ref('Hello World');
</script>

<template>
  <div class="reveal-text-wrapper">
    <div class="reveal-text">
      <span>{{ text }}</span>
    </div>
  </div>
</template>


<style scoped lang="scss">
.reveal-text-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reveal-text {
  font-size: 10rem;
  font-weight: 900;
  color: #fff;
  position: relative;
  overflow: hidden;
  span {
    position: relative;
    z-index: 2;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-color: #000;
    transform-origin: bottom;
    transform: scaleY(0);
    transition: transform 0.5s ease-in-out;
    z-index: 1;
  }
  &:hover::before {
    transform: scaleY(1);
  }
}
</style>
