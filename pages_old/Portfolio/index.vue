<template>
  <div class="portfolio-wrapper">
    <div class="title-screen">
      <div class="title-text">
        <h1 >
          LEE HYUNSOO
        </h1>
        <h2>Frontend</h2>
      </div>
    </div>
    <div class="mirror-screen h-1000vh" @mousemove.capture="onMouseMove">
      <div class="pos-sticky h-100vh top-left">
        <img 
          id="mirror"
          ref="refMirror"
          style="height: 70vh;"
          src="../../assets/mirror.png" />
        <div class="black-board"> </div>
      </div>
      <div class="description" id="coder" style="padding-top: 400vh;">
        <h1>Coder</h1>
        <h2>I can write code. </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { onMounted, ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);
// lenis initial
const lenis = new Lenis({
  lerp: 0.05,
  wheelMultiplier: 0.5, 
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

function animBlackBoard() {
  // black board 너비가 길어지며, 왼쪽면까지 꽉 채우고, 왼쪽으로 줄어들면서 50% 를 유지한다.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.mirror-screen',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      markers: true,
    }
  });

  // coder
  animMirrorCoder(tl, 2);
}
function animMirrorCoder(tl: gsap.core.Timeline, startPos: number) {
  const duration = 10;
  tl.to('#mirror', {
    // xPercent: 80,
    // yPercent: 25,
    right: `10%`,
    top: `10%`,
    rotate: 360,
    duration: duration,
    ease: 'power2.in',
  }, startPos)
  .to('.black-board', {
    width: '70%',
    left: '30vw',
    duration: duration,
    ease: 'power2.in',
  }, startPos + duration)
  .to('.black-board', {
    width: '60%',
    left: 0,
    duration: duration,
    ease: 'power2.out',
  }, startPos + duration * 2)
  .to('black-board', {
    width: '0',
    left: 0,
    duration: duration,
    ease: 'power2.out',
  }, startPos + duration * 3)
}

function animMirrorEngineer(tl: gsap.core.Timeline, startPos: number) {
  const duration = 10;
  tl.to('#mirror', {
    // xPercent: 80,
    // yPercent: 25,
    right: `10%`,
    top: `10%`,
    rotate: 360,
    duration: duration,
    ease: 'power2.in',
  }, startPos)
  .to('.black-board', {
    width: '70%',
    left: '30vw',
    duration: duration,
    ease: 'power2.in',
  }, startPos + duration)
  .to('.black-board', {
    width: '60%',
    left: 0,
    duration: duration,
    ease: 'power2.out',
  }, startPos + duration * 2)
}

const x = ref(0);
const y = ref(0);
const refMirror = ref<HTMLElement | null>(null);
function onMouseMove(e: MouseEvent) {
  console.log('mouse move')
  x.value = e.clientX;
  y.value = e.clientY;
  if (refMirror.value) {
    // 회전
    const rect = refMirror.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const tiltX = (dy / cy) * -5;
    const tiltY = (dx / cx) * 5;
    // 마우스 반대방향으로 shadow
    const dropShadow = `${-tiltY}px ${tiltX}px 7px rgba(0, 0, 0, 0.7)`;

    gsap.to(refMirror.value, {
      rotationX: tiltX,
      rotationY: tiltY,
      filter: `drop-shadow(${dropShadow})`,
      ease: 'power2.out',
      duration: 1,
    })
    
  }
}

onMounted(() => {
  animBlackBoard();
})


</script>

<style scoped lang="scss">
@import './portfolio.scss';

.title-screen {
  position: relative;
  width: 100%;
  height: 100vh;
  .title-text {
    position: absolute;
    top: 10%;
    left: 50%;
    font-family: 
      // 'Russo One', 
      // 'Exo',
      // 'Urbanist',
      // 'Orbitron',
      // 'Indie Flower',
      // 'Amatic SC',
      'Oswald', 
      sans-serif;
    // text-align: center;
    h1 {
      font-size: calc(2 * var(--typo-title-font-size));
      font-weight: normal;
      margin: 0;
    }
    h2 {
      font-size: calc(var(--typo-title-font-size));
      font-weight: normal;
      margin: 0;
      text-align: left;
    }
  }
}
.mirror-screen {
  position: relative;
  // background-color:rgb(222, 222, 222);

  .black-board {
    position: absolute;
    top: 0;
    left: 110vw;
    width: 10vw;
    height: 100vh;
    background-color: black;
  }

  #mirror {
    position: absolute;
    
  }
  .description {
    position: relative;
    z-index: 2;
    display: flex;
    color: red;
  }
}
</style>