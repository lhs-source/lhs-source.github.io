<script setup lang="ts">
import { defineEmits, defineProps, onMounted, withDefaults } from "vue";
import { gsap } from 'gsap';

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

function animFeatherPart() {
  // 깃털
  const featherLength = 10;  //
  const featherGap = screen.availWidth / (10 - 2);   // 깃털 사이의 너비 갭
  for(let i = 0; i < featherLength; ++i) {
    gsap.set(`.feather${i + 1}`, {
      x: () => featherGap * (i + 1) - (featherLength / 2 * featherGap),
      y: () => Math.max(screen.availHeight, screen.availWidth) * Math.random() / 3,
      width: Math.random() * 500 + 900,
    });
    // 깃털 이동
    gsap.to(`.feather${i + 1}`, {
      x: () => Math.random() * screen.availWidth - screen.availWidth / 2,
      y: () => -(Math.random() * Math.max(screen.availHeight, screen.availWidth) 
              + Math.max(screen.availHeight, screen.availWidth)),
      rotate: Math.random() * 540 - 180,
      scrollTrigger: {
        trigger: '.black-full',
        start: `-${screen.availHeight * 2}px bottom`,
        end: 'bottom bottom',
        scrub: 2,
        onEnter: () => {
          gsap.set(`.feather${i + 1}`, {
            position: 'fixed'
          })
        },
        onLeaveBack: () => {
          gsap.set(`.feather${i + 1}`, {
            position: 'absolute'
          })
        }
      }
    });
  }
  console.log(Math.max(screen.availHeight, screen.availWidth));
  // 아래에서 차오르는 검정 동그라미
  gsap.to(".black-area", {
    width: () => Math.max(screen.availHeight, screen.availWidth) * 2,
    height: () => Math.max(screen.availHeight, screen.availWidth) * 2,
    y: () => Math.max(screen.availHeight, screen.availWidth) * 2 / 3,  // 여기가 커질 수록 동그라미가 늦게 올라옴
    position: 'fixed',
    scrollTrigger: {
      trigger: '.black-full',
      start: `-${screen.availHeight * 2}px bottom`,
      end: 'bottom bottom',
      scrub: 2,
    }
  })
}

onMounted(() => {
  animFeatherPart();
})

</script>

<template>
  <section class="black-full">
    <div class="layer full-center">
      <img class="feather1" src="../../assets/feather.svg"/>
      <img class="feather2" src="../../assets/feather.svg"/>
      <img class="feather3" src="../../assets/feather.svg"/>
      <img class="feather4" src="../../assets/feather.svg"/>
      <img class="feather5" src="../../assets/feather.svg"/>
      <img class="feather6" src="../../assets/feather.svg"/>
      <img class="feather7" src="../../assets/feather.svg"/>
      <img class="feather8" src="../../assets/feather.svg"/>
      <img class="feather9" src="../../assets/feather.svg"/>
      <img class="feather10" src="../../assets/feather.svg"/>
    </div>
    <div class="layer full-center">
      <div class="black-area"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
.black-full {
  position: relative;
  min-height: 400vh;
  mix-blend-mode: difference;
  // background-color: #2f2f2f;
  // background-color: rgb(255, 255, 255);
  overflow: visible;

  img {
    bottom: -110vh;
    position: absolute;
  }
  .black-area {
    width: 0;
    height: 0;
    bottom: -100%;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
  }
}
</style>