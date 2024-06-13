<script setup lang="ts">
import { gsap } from 'gsap';
import { defineEmits, defineProps, onMounted, ref, withDefaults } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

const h1 = ref<HTMLElement | null>(null);

function animCrowPart() {
  const screenList: any[] = gsap.utils.toArray('.full-screen');
  // duration 은 scrub 할 scroll 의 길이이다.
  const stepShow = { opacity: 1, duration: 5 };
  const stepHide = { opacity: 0, duration: 5 };
  gsap.timeline({
    scrollTrigger: {
      trigger: '.background-temp',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      // markers: true,
    },
  })
  // 생겼다 사라지기
  // 세번째 인자가 시작시간이다. 100분율로 계산된다.
  .to(screenList[0], stepShow, 0)   // 0% 에서 5% 동안 show 애니메이션
  .to(screenList[0], stepHide, 10)  // 10% 에서 5% 동안 hide 애니메이션
  // 생겼다 사라지기
  .to(screenList[1], stepShow, 15)  // 15% 에서 5% 동안 show 애니메이션
  .to(screenList[1], stepHide, 25)  // 25% 에서 5% 동안 hide 애니메이션
  // 생겼다 사라지기
  .to(screenList[2], stepShow, 30)
  .to(screenList[2], stepHide, 40)
  // 생겼다 사라지기
  .to(screenList[3], stepShow, 45)
  .to(screenList[3], stepHide, 55)
}

onMounted(() => {
  animCrowPart();
})

</script>

<template>
  <section class="background-temp">
    <!-- <div class="h-100vh"></div> -->
    <div class="h-100vh sticky">
      <div class="full-screen">
        <h1 ref="h1">TEST1</h1>
        <h4>ROBOTO IS A BOUTIQUE GAME ART WHO WE ARE OUTSOURCING STUDIO 〔SPECIALIZING〕 Based in Hong Kong and Mainland China, Roboto crafts premium background art assets for game developers worldwide. We are a small team of multi-talented artists bringing each game’s story to life with cohesive, immersive design. IN MOBILE AND CONSOLE/PC PLATFORMS</h4>
      </div>
      <div class="full-screen">
        <h1 ref="h1">TEST2</h1>
        <h4>ROBOTO IS A BOUTIQUE GAME ART WHO WE ARE OUTSOURCING STUDIO 〔SPECIALIZING〕 Based in Hong Kong and Mainland China, Roboto crafts premium background art assets for game developers worldwide. We are a small team of multi-talented artists bringing each game’s story to life with cohesive, immersive design. IN MOBILE AND CONSOLE/PC PLATFORMS</h4>
      </div>
      <div class="full-screen">
        <h1 ref="h1">TEST3</h1>
        <h4>ROBOTO IS A BOUTIQUE GAME ART WHO WE ARE OUTSOURCING STUDIO 〔SPECIALIZING〕 Based in Hong Kong and Mainland China, Roboto crafts premium background art assets for game developers worldwide. We are a small team of multi-talented artists bringing each game’s story to life with cohesive, immersive design. IN MOBILE AND CONSOLE/PC PLATFORMS</h4>
      </div>
      <div class="full-screen">
        <h1 ref="h1">TEST4</h1>
        <h4>ROBOTO IS A BOUTIQUE GAME ART WHO WE ARE OUTSOURCING STUDIO 〔SPECIALIZING〕 Based in Hong Kong and Mainland China, Roboto crafts premium background art assets for game developers worldwide. We are a small team of multi-talented artists bringing each game’s story to life with cohesive, immersive design. IN MOBILE AND CONSOLE/PC PLATFORMS</h4>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
// 까마귀 로딩 섹션
.background-temp {
  min-height: 100vh;
  height: 1200vh;
  background-color: $vue-color-blue;

  // position: sticky;
  // top: 0;
  // left: 0;

  .sticky {
    position: sticky;
    top: 0;
    left: 0;
  }
  
  .full-screen {
    position: absolute;
    opacity: 0;
    h1 {
      position: absolute;
      left: 64px;
      bottom: 480px;
    }
    h4 {
      position: absolute;
      width: 80vw;
      left: 64px;
      bottom: 240px;
    }
  }
  h1, h2, h3, h4 {
    color: $vue-color-reverse;
  }
  h1 {
    font-size: 10rem;
    line-height: 1;
    margin: 0;
  }
  h2 {
    font-size: 6rem;
    line-height: 1;
    margin: 0;
  }
  h3 {
    font-size: 3rem;
    line-height: 1;
    margin: 0;
  }
  h4 {
    font-size: 2rem;
    line-height: 1;
    margin: 0;
    font-weight: normal;
  }
}
</style>