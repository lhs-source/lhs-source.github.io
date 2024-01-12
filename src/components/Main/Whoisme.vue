<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const whoismeCount = ref(Math.ceil(screen.availHeight / 65));

function animWhoIsMeTitle() {
  for(let i = 0; i < whoismeCount.value + 3; i++) {
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
  whoismeCount.value = Math.ceil(screen.availHeight / 65);
  animWhoIsMeTitle();
  animIntroducement();
})
</script>

<template>
  <section class="who-is-me-wrapper">
    <div v-if="whoismeCount > 0" class="who-is-me-title">
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
    <div class="introducement">
      <div class="introducement-row introducement-title" data-text="소개합니다"><span>소개합니다</span></div>
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
    min-height: 100vh;
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

      &::before {
        content: attr(data-text);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        left: 2px;
        text-shadow: rgb(0, 255, 255) -1px 0px;
        animation: 15s linear 0s infinite alternate-reverse none running noise-anim-2;
      }
      &::after {
        content: attr(data-text);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        left: -2px;
        text-shadow: rgb(255, 105, 180) 3px 0px;
        animation: 2s linear 0s infinite alternate-reverse none running noise-anim;
      }
    }
  }
}

@keyframes noise-anim {
  0% {
    clip-path: inset(29% 0px 25%);
}
5% {
    clip-path: inset(9% 0px 38%);
}
10% {
    clip-path: inset(96% 0px 1%);
}

15% {
    clip-path: inset(75% 0px 23%);
}

20% {
    clip-path: inset(46% 0px 50%);
}

25% {
    clip-path: inset(3% 0px 46%);
}

30% {
    clip-path: inset(82% 0px 2%);
}

35% {
    clip-path: inset(88% 0px 1%);
}

40% {
    clip-path: inset(91% 0px 8%);
}

45% {
    clip-path: inset(96% 0px 2%);
}

50% {
    clip-path: inset(59% 0px 38%);
}

55% {
    clip-path: inset(41% 0px 53%);
}

60% {
    clip-path: inset(21% 0px 47%);
}

65% {
    clip-path: inset(89% 0px 4%);
}

70% {
    clip-path: inset(1% 0px 95%);
}

75% {
    clip-path: inset(86% 0px 4%);
}

80% {
    clip-path: inset(95% 0px 5%);
}

85% {
    clip-path: inset(54% 0px 36%);
}

90% {
    clip-path: inset(70% 0px 27%);
}

95% {
    clip-path: inset(6% 0px 16%);
}

100% {
    clip-path: inset(95% 0px 2%);
}
}
@keyframes noise-anim-2 {
  0% {
    clip-path: inset(76% 0px 21%);
}

5% {
    clip-path: inset(54% 0px 7%);
}

10% {
    clip-path: inset(55% 0px 29%);
}

15% {
    clip-path: inset(89% 0px 3%);
}

20% {
    clip-path: inset(33% 0px 40%);
}

25% {
    clip-path: inset(17% 0px 56%);
}

30% {
    clip-path: inset(37% 0px 51%);
}

35% {
    clip-path: inset(38% 0px 19%);
}

40% {
    clip-path: inset(93% 0px 4%);
}

45% {
    clip-path: inset(44% 0px 14%);
}

50% {
    clip-path: inset(53% 0px 26%);
}

55% {
    clip-path: inset(67% 0px 11%);
}

60% {
    clip-path: inset(85% 0px 13%);
}

65% {
    clip-path: inset(27% 0px 37%);
}

70% {
    clip-path: inset(87% 0px 4%);
}

75% {
    clip-path: inset(10% 0px 8%);
}

80% {
    clip-path: inset(51% 0px 27%);
}

85% {
    clip-path: inset(10% 0px 60%);
}

90% {
    clip-path: inset(83% 0px 3%);
}

95% {
    clip-path: inset(23% 0px 55%);
}

100% {
    clip-path: inset(1% 0px 81%);
}
}


</style>
