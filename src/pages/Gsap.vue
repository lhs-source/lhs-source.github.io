<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // const gsapText1 = gsap.from('.name .text',
  // {
  //   scrollTrigger: {
  //     trigger: '.name',
  //     start: 'top center',
  //     scrub: 1,
  //     // pin: true,
  //     markers: true,
  //   },
  //   opacity: 0,
  //   y: -200,
  //   x: -200,
  //   ease: 'power2.inOut',
  // })
  // .text 글자가 나타났다가 사라지는 gsap timeline

  gsap.from('.dummy', {
    scrollTrigger: {
      trigger: '.dummy',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    },
    opacity: 0,
    ease: 'power2.inOut',
  })


  gsap.timeline({
    scrollTrigger: {
      trigger: '.name',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    }
  })
  .from('.name .text1', {
    opacity: 0,
    y: -200,
    x: -200,
    ease: 'power2.inOut',
  })
  .from('.name .text2', {
    opacity: 0,
    y: -200,
    x: -200,
    ease: 'power2.inOut',
  })
  ////////////////////////////////

  // gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.pin',
  //     start: 'top 50%',
  //     end: 'bottom 90%',
  //     // pin: true,
  //     scrub: 1,
  //     markers: true,
  //   }
  // })
  // .from('.pin .text1', {
  //   opacity: 0,
  //   ease: 'power2.inOut',
  // })
  // .from('.pin .text2', {
  //   opacity: 0,
  //   ease: 'power2.inOut',
  // })
  gsap.from('.pin .text1', {
    scrollTrigger: {
      trigger: '.pin',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    },
    opacity: 0,
    ease: 'power2.inOut',
  })
  gsap.to('.pin .text1', {
    scrollTrigger: {
      trigger: '.pin',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    },
    opacity: 0,
    ease: 'power2.inOut',
  })

  gsap.from('.pin .text1', {
    scrollTrigger: {
      trigger: '.pin',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    },
    opacity: 0,
    ease: 'power2.inOut',
  })

  gsap.from('.pin .text1', {
    scrollTrigger: {
      trigger: '.pin',
      start: 'top 50%',
      end: 'bottom 90%',
      // pin: true,
      scrub: 1,
      markers: true,
    },
    opacity: 0,
    ease: 'power2.inOut',
  })
})


</script>

<template>
  <div class="gsap-wrapper">
    <section class="dummy">
      안녕하세요
    </section>
    <section class="name">
      <div class="text1">NAME</div>
      <div class="text2">LEE HYUNSOO</div>
    </section>
    <section class="dummy">
      안녕하세요
    </section>
    <section class="pin">
      <div class="text1">PINNING...1</div>
      <div class="text2">PINNING...2</div>
      <div class="text3">PINNING...3</div>
    </section>
    <section class="dummy">
      안녕하세요
    </section>
  </div>
</template>

<style lang="scss" scoped>
.gsap-wrapper {
  font-size: 4rem;
  section {
    min-height: 100vh;
    &.name {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }
    &.dummy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #eee;
    }
  }
}
</style>