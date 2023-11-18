<script setup lang="ts">
import { onMounted } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const whoismeCount = 10;

function animWhoIsMeTitle() {
  for(let i = 0; i < whoismeCount * 2; i++) {
    gsap.to(`.who-is-me-row:nth-child(${i + 1})`, {
      scrollTrigger: {
        trigger: `.who-is-me-row:nth-child(${i + 1})`,
        start: '-100px bottom',
        end: '500px bottom',
        scrub: 5,
      },
      opacity: 1,
      rotateX: 30,
      scaleX: 1,
      y: 0,
      x: Math.random() * 100 - 50,
    });
  }
}

function animIntroducement() {
  for(let i = 0; i < 6; i++) {
    gsap.to(`.introducement-row:nth-child(${i + 1}) span`, {
      scrollTrigger: {
        trigger: `.introducement-row:nth-child(${i + 1})`,
        start: '0 bottom',
      },
      opacity: 1,
      y: 0,
      duration: 1.4,
    });
  }
}

onMounted(() => {
  animWhoIsMeTitle();
  animIntroducement();
})
</script>

<template>
  <section class="who-is-me-wrapper">
    <div class="who-is-me-title">
      <template v-for="i in whoismeCount">
        <div class="who-is-me-row">
          Who is <span class="font-brown">LEE HYUNSOO</span> 
          Who is <span class="font-brown">LEE HYUNSOO</span> 
          Who is <span class="font-brown">LEE HYUNSOO</span> 
          Who is <span class="font-brown">LEE HYUNSOO</span>
        </div>
        <div class="who-is-me-row">Do you wanna know Do you wanna know Do you wanna know Do you wanna know</div>
      </template>
    </div>
    <div class="introducement">
      <div class="introducement-row introducement-title"><span>소개합니다</span></div>
      <div class="introducement-row"><span>이현수 LEE HYUNSOO</span></div>
      <div class="introducement-row"><span>프론트엔드 개발자</span></div>
      <div class="introducement-row"><span>책임감 몰입도 감각</span></div>
      <div class="introducement-row"><span>게임 그림 </span></div>
      <div class="introducement-row"><span>히히히하하하하</span></div>
    </div>
  </section>
</template>


<style scoped lang="scss">
@import "./main.scss";
$font-color-brown: #B8621B;

.who-is-me-wrapper {
  width: 100%;
  height: 600vh;

  .who-is-me-title {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    overflow: hidden;
    width: 100%;
    height: 100vh;

    border-top: 1px solid $font-color-brown;
    border-bottom: 1px solid $font-color-brown;
    
    .who-is-me-row {
      opacity: 0;
      transform: translate3d(0, -80px, 40px) rotateX(90deg) scaleX(1.4);

      white-space: nowrap;

      font-weight: 900;
      line-height: 0.88;
      font-size: var(--typo-title-font-size);
      color: white;

      .font-brown {
        color: $font-color-brown;
      }
    }
  }
  
  .introducement {
    position: relative;
    z-index: 1;
    margin-top: 300vh;
    width: 100%;
    height: 100vh;
    background-color: black;
    
    color: white;

    .introducement-row {
      overflow-y: hidden;

      font-size: var(--typo-h2-font-size);
      
      span {
        display: block;
        opacity: 0;
        transform: translateY(100px);
      }
    }
    .introducement-title {
      overflow-y: hidden;

      border-top: 1px solid $font-color-brown;
      border-bottom: 1px solid $font-color-brown;

      font-size: var(--typo-title-font-size);
      text-align: center;
      font-weight: 700;

      span {
        display: block;
        transform: translateY(100px);
      }
    }
  }
}



</style>
