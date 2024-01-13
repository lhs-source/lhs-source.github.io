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
import Whoisme from '../components/Main/Whoisme.vue';
import TextShowHide from '../components/Main/TextShowHide.vue';

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
    <!-- <Whoisme></Whoisme> -->
    <TextShowHide></TextShowHide>
    <!-- <SkillSetTitle></SkillSetTitle> -->
    <!-- <SkillSet></SkillSet> -->
    <!-- <Portfolio></Portfolio> -->
    <!-- <PostList></PostList> -->
    <!-- <GoPostList></GoPostList> -->
  </div>
</template>

<style lang="scss">
@import '../components/Main/main.scss';

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