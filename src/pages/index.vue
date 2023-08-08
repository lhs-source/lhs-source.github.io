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

    <!-- <section class="skill-set2">
      
      <div class="skill-list main">
        <div class="skill vue">VUE</div>
        <div class="skill cpp">C++</div>
      </div>
      <div class="skill-list sub">
        <div class="skill angular">ANGULAR</div>
        <div class="skill java">JAVA</div>
        <div class="skill spring">SPRING</div>
        <div class="skill python">PYTHON</div>
        <div class="skill android">ANDROID</div>
      </div>
      <div class="skill-list tool">
        <div class="skill aws">AWS</div>
        <div class="skill git">GIT</div>
      </div>
      <div class="skill-list task-tool">
        <div class="skill slack">SLACK</div>
        <div class="skill atlassian">ATLASSIAN</div>
        <div class="skill notion">NOTION</div>
      </div>
      <div class="sill-list etc">
        <div class="skill lua">LUA</div>
        <div class="skill javacos">JAVACOS</div>
        <div class="skill compiler">COMPILER</div>
      </div>
    </section> -->
    <section class="skill-set-summary">
      <div class="slogun top"></div>
      <img src="https://drivecapital.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fmq81gy7w2znw%2F1281LzhN8WMxYV63YHlU6q%2F662ce8f633d90de49acb9bbff0f1069d%2FDrive_Home_04b.jpg&w=640&q=90"/>
      <div class="slogun mid"></div>
      <img src="https://drivecapital.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fmq81gy7w2znw%2F2tO6ZX8Vl98q0Ai6N1QaRz%2Fc2446edd0ec7cc7fcc7c5a44286c7c44%2FDrive_Home_04a.jpg&w=640&q=90"/>
      <div class="slogun bot"></div>
    </section>
    <SkillSet></SkillSet>
    <Portfolio></Portfolio>
    <PostList></PostList>
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