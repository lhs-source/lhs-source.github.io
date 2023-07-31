<script setup lang="ts">
/**
 * Drive
 * https://drivecapital.com/
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { onMounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), {});

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();


onMounted(() => {

  gsap.to('.drive-title .title', {
    scrollTrigger: {
      trigger: '.drive-wrapper',
      start: 'top bottom',
      end: '500px',
      scrub: 1,
    },
    opacity: 0.9,
    y: -500,
    ease: 'power2.inOut',
  })



  gsap.timeline({
    scrollTrigger: {
      trigger: '.image-list',
      start: 'top bottom',
      end: `${screen.availHeight * 2}px}`,
      scrub: 0,
      markers: true,
    }
  }).to('.image-frame', {
    opacity: 0,
    y: screen.availHeight * 2 / 3,
    // ease: 'power2.inOut',
  });
})


</script>

<template>
  <div class="dummy h1"></div>
  <div class="drive-wrapper">
    <div class="drive-frame">
      <video class="drive-video" muted loop autoplay playsinline preload="auto"
        src="https://media.fmkorea.com/files/attach/new2/20211113/3655109/2889212861/4075073992/99b983892094b5c6d2fc3736e15da7d1_1.mp4?d"
        type="video/mp4">
      </video>
      <div class="drive-title h1">
        <div>
          <div class="title" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
            <h1>IVEIAM</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dummy h1"></div>
  <div class="image-wrapper">
    <div class="image-list">
      <div class="image-frame">
        <img src="https://i.ytimg.com/vi/A7eDNlAWHZk/maxresdefault.jpg" />
      </div>
    </div>
  </div>
  <div class="dummy"></div>
</template>

<style scoped lang="scss">
.dummy {
  height: 500vh;
  background-color: black;

  &.h1 {
    height: 100vh;
  }
}

:where(:not(html,iframe,canvas,img,svg,video,audio):not(svg *,symbol *)) {
    all: unset;
    display: revert;
}
.drive-wrapper {
  --grayscale-filter: grayscale(1) sepia(0.2) contrast(0.85);
  --black: #000;
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --font-staff-xxx-Condensed: "Staff XXX Condensed";

  transition: 1.6s transform var(--ease-out-expo);
  transform: translateZ(0);
  height: 55.5555555556vw;
  overflow: hidden;
  background-color: rgb(75, 75, 75);
  .drive-frame {
    
    width: 100%;
    height: 100%;
    position: relative;
    .drive-video {
      width: 100%;
      height: calc(100% + 1px);
      padding-bottom: 20vh;
      filter: var(--grayscale-filter);
      object-fit: cover;
      will-change: transform;
      transform: scale(1) translateY(-10vh);
      transition: 1.6s transform var(--ease-out-expo);
    }
    .drive-title {
      text-align: start;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: calc(100% + 1px);
      background-color: var(--black);
      mix-blend-mode: multiply;
      user-select: none;
      font-size: 96.8vw;
      line-height: 76%;
      
      .h1 {
        font-family: var(--font-staff-xxx-Condensed);
        font-size: 43.7333333333vw;
        font-style: normal;
        font-weight: 500;
        text-transform: uppercase;
      }
      h1 {
        // margin-top: 25vh;
        color: #ffffff;
        font-size: 0.45em;
        font-weight: 700;
        line-height: 1.1;
        font-stretch: ultra-condensed;
        scale: 0.63 1;
        transform-origin: center left;
      }
    }
    @media (min-width: 800px) {
      .drive-title {
        font-size: 110vw;
        letter-spacing: -.03em;
        margin-left: -1.18vw;
      }
    }
  }
}

.image-wrapper {
  --black: #000;

  height: 500vh;
  background-color: var(--black);
  position: relative;

  .image-frame {
    // overflow: hidden;
    img {
      position: absolute;
      top: 0;
      scale: 1.2;
    }
  }
}


</style>