<script setup lang="ts">
import { gsap } from 'gsap';
import {MotionPathPlugin} from 'gsap/dist/MotionPathPlugin';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { onMounted } from 'vue';
import LhsMain from '../../../components/Main/LhsMain.vue';
import TextShowHide from '../../../components/Main/TextShowHide.vue';
import CrowBrain from '../../../components/Main/CrowBrain.vue';
import Mirror from '../../../components/Main/Mirror.vue';
import Introducement from '../../../components/Main/Introducement.vue';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

function animSkillSummary() {

}

const lenis = new Lenis({
  lerp: 0.05, 
})

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

onMounted(() => {
  // ScrollSmoother.create({
  //   smooth: 1,
  //   effects: true, // looks for data-speed and data-lag attributes on elements
  // smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  // });


})

</script>

<template>
  <div class="index-wrapper">
    <LhsMain></LhsMain>
    <!-- <BlackFethers></BlackFethers> -->
    <CrowBrain></CrowBrain>
    <Mirror></Mirror>
    <Introducement></Introducement>
    <TextShowHide></TextShowHide>
    <!-- <SkillSetTitle></SkillSetTitle> -->
    <!-- <SkillSet></SkillSet> -->
    <!-- <Portfolio></Portfolio> -->
    <!-- <PostList></PostList> -->
    <!-- <GoPostList></GoPostList> -->
  </div>
</template>

<style lang="scss">
@import '../../../components/Main/main.scss';

.index-wrapper {
  background-color: white;
  position: relative;
}

section {
  position: relative;
  // isolation: auto;
}

.section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.screen {
  position: absolute;
  top: 0;
  left: 0;
}
.skill-set2 {
  
}
.skill-set-summary {
  img {
    
  }
  .slogun {
    .top {

    }
    .mid {

    }
    .bot {

    }
  }
}
</style>