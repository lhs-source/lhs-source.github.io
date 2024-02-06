<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const whoismeCount = ref(Math.ceil(screen.availHeight / 65));

function animWhoIsMeTitle() {
  for(let i = 0; i < whoismeCount.value * 2 + 3; i++) {
    gsap.to(`.who-is-me-row:nth-child(${i + 1})`, {
      scrollTrigger: {
        trigger: `.who-is-me-row:nth-child(${i + 1})`,
        start: '-150px bottom',
        end: '450px bottom',
        scrub: 3.5,
      },
      opacity: 1,
      rotateX: 30,
      scaleX: 1,
      y: 0,
      x: Math.random() * 100 - 50,
    });
  }
}


onMounted(() => {
  whoismeCount.value = Math.ceil(screen.availHeight / 65) * 2;
  animWhoIsMeTitle();
})
</script>

<template>
  <section class="who-is-me-wrapper">
    <div v-if="whoismeCount > 0" class="who-is-me-title h-300vh">
      <template v-for="i in whoismeCount">
        <div class="who-is-me-row">
          WHO IS <span class="font-brown">LEE HYUNSOO</span> 
          WHO IS <span class="font-brown">LEE HYUNSOO</span> 
          WHO IS <span class="font-brown">LEE HYUNSOO</span> 
          WHO IS <span class="font-brown">LEE HYUNSOO</span>
        </div>
        <div class="who-is-me-row">DO YOU WANNA KNOW DO YOU WANNA KNOW DO YOU WANNA KNOW DO YOU WANNA KNOW</div>
      </template>
    </div>
  </section>
</template>


<style scoped lang="scss">
@import "./main.scss";
@import "../../assets/scss/text-noise-animation.scss";
$font-color-brown: #B8621B;

.who-is-me-wrapper {
  position: relative;
  width: 100%;
  height: 600vh;

  .who-is-me-title {
    // position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    overflow: hidden;
    width: 100%;
    // height: 100vh;

    // border-top: 1px solid $font-color-brown;
    // border-bottom: 1px solid $font-color-brown;
    
    .who-is-me-row {
      opacity: 0;
      transform: translate3d(0, -80px, 40px) rotateX(90deg) scaleX(1.4);

      white-space: nowrap;

      font-weight: 900;
      line-height: 0.88;
      font-size: var(--typo-title-font-size);
      color: rgb(224, 224, 224);

      .font-brown {
        color: rgb(100, 100, 100);
        // text-border
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: rgb(237, 216, 243);
      }
    }
  }
  
}

</style>
