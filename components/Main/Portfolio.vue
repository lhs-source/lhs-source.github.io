<script setup lang="ts">
import { defineEmits, defineProps, onMounted, withDefaults } from "vue";
import { gsap } from 'gsap';

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

function animPortfolio() {
  
}

onMounted(() => {
  animPortfolio();
})

</script>

<template>
  <section class="portfolio">
    <div class="full-center">
      <h1>TMXKorea</h1>
    </div>
    <div class="full-center">
      <h1>플라이하이</h1>
    </div>
    <div class="full-center">
      <h1>뱅크비</h1>
    </div>
    <div class="full-center">
      <h1>리코</h1>
    </div>
    <div class="full-center padding">
      <h1>TO BE..</h1>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
.portfolio {
  color: rgba(235, 235, 235, .6);
  h1 {
    font-size: 6rem;
  }
  .padding {
    height: 400vh;
  }
}
</style>