<script setup lang="ts">
import { gsap } from 'gsap';
import {MotionPathPlugin} from 'gsap/dist/MotionPathPlugin';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { onMounted } from 'vue';
import BlackFethers from '../components/Main/BlackFethers.vue';
import LhsMain from '../components/Main/LhsMain.vue';
import Portfolio from '../components/Main/Portfolio.vue';
import PostList from '../components/Main/PostList.vue';
import SkillSet from '../components/Main/SkillSet.vue';
import SkillSetTitle from '../components/Main/SkillSetTitle.vue';
import GoPostList from '../components/Main/GoPostList.vue';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);


function animSkillSummary() {

}

onMounted(() => {

})

</script>

<template>
  <div class="index-wrapper">
    <LhsMain></LhsMain>
    <BlackFethers></BlackFethers>
    <section class="skill-set-summary">
      <div class="slogun top"></div>
      <img src="https://drivecapital.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fmq81gy7w2znw%2F1281LzhN8WMxYV63YHlU6q%2F662ce8f633d90de49acb9bbff0f1069d%2FDrive_Home_04b.jpg&w=640&q=90"/>
      <div class="slogun mid"></div>
      <img src="https://drivecapital.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fmq81gy7w2znw%2F2tO6ZX8Vl98q0Ai6N1QaRz%2Fc2446edd0ec7cc7fcc7c5a44286c7c44%2FDrive_Home_04a.jpg&w=640&q=90"/>
      <div class="slogun bot"></div>
    </section>
    <SkillSetTitle></SkillSetTitle>
    <SkillSet></SkillSet>
    <Portfolio></Portfolio>
    <PostList></PostList>
    <GoPostList></GoPostList>
  </div>
</template>

<style lang="scss">
@import '../components/Main/main.scss';

.index-wrapper {
  background-color: white;
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