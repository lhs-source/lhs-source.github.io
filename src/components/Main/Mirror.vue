<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from "vue";
import Whoisme from './Whoisme.vue';

function animMirror(totalHeight: number) {
  const talkTransitionTime = 0.05;
  const talkDelay = 0.2;
  let talkTime = 0.3;
  gsap.timeline({
    scrollTrigger: {
      trigger: ".mirror-wrapper",
      start: "start start",
      end: `+=${totalHeight / 4}vh`,
      scrub: 2,
      // markers: true,
    },
  })
  .to('#me', {
    opacity: 0.7,
    width: '50vm',
    duration: 0.4,
  }, 0.2)
  // .to('#talk-1', {
  //   opacity: 1,
  //   duration: talkTransitionTime,
  // }, talkTime+=talkDelay)
  // .to('#talk-1', {
  //   opacity: 0.5,
  //   duration: talkTransitionTime,
  // }, talkTime+=talkDelay)
}

function animWhoiam(totalHeight: number) {
}


onMounted(() => {
  const sectionTotalHeight = screen.availHeight * 10;
  animMirror(sectionTotalHeight);
})

</script>

<template>
  <section class="mirror-wrapper h-2000vh">
    <div class="full-img pos-sticky">
      <img id="me" src="../../assets/crow/mr-crow.webp" />  
    </div>
    <div style="height: 300vh"></div>
    <div class="mirror-position pos-sticky h-100vh">
      <div class="mirror-bg">
        <div class="mirror"></div>
      </div>
    </div>
    <div style="height: 300vh"></div>
    <Whoisme></Whoisme>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";

// 까마귀 로딩 섹션
.mirror-wrapper {
  position: relative;
  background-color: rgb(14, 14, 14);

  .full-img {
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    #me {
      padding-top: 20%;
      opacity: 0;
    }
  }
  .mirror-position {
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    mix-blend-mode: overlay;
    .mirror-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgb(3, 3, 3);
      
      .mirror {
        width: 50%;
        height: 64%;
        overflow: hidden;
        background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)),
          url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3fdB0CAb-eJfCle64hY_3eBMpetLIKRZLg&usqp=CAU');
        border: 16px solid rgb(240, 216, 216);
        outline: 8px solid rgb(224, 53, 53);
        box-shadow: inset 0 0 0 8px rgb(146, 104, 26);
      }
    }
    .mirror-talk-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2rem;
      padding-bottom: 4rem;
      color: white;

      .talk {
        opacity: 0;
        font-size: 2rem;
        line-height: 1;
        font-family: 'Indie Flower';
      }
    }
  }
}

@media screen and (max-width: 480px) {
  
}
</style>