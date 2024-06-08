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
import CrowBrain from '../components/Main/CrowBrain.vue';
import Mirror from '../components/Main/Mirror.vue';
import Introducement from '../components/Main/Introducement.vue';
import { ScrollSmoother } from 'gsap-trial/all';
import Lenis from '@studio-freight/lenis';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

interface TitleMenu {
  title: string;
  path: string;
  content: string;
}
const titleMenu = ref<TitleMenu[]>([
  {title: '포트폴리오', path: 'portfolio', content: '본격적인 포트폴리오?'},
  {title: '스도쿠', path: 'play/sudoku', content: '스도쿠 게임입니다. 플레이해보세요!'},
  {title: '스터디', path: 'study', content: '공부한 내용을 테스트해보는 공간'},
  {title: '포스트', path: 'posts', content: '블로그 포스트 목록. 지금까지 쌓아온 지식공간'},
  {title: '앵커1', path: '#', content: '앵커1'},
  {title: '앵커2', path: '#', content: '앵커2'},
  {title: '앵커3', path: '#', content: '앵커3'},
  {title: '앵커4', path: '#', content: '앵커4'},
]);

function onClickMenu(menu: TitleMenu) {
  router.push(menu.path);
}

</script>

<template>
  <div class="index-wrapper">
    <div class="title-section">
      <div class="title-barcode">
        <div class="barcode-font self-end text-right">
          WELCOME TO LEE HYUNSOO FRONTEND AREA
        </div>
      </div>
      <div class="title-area flex flex-col item-center">
        <div class="title-text">
          <h1 >
            LEE HYUNSOO
          </h1>
          <h2>프론트엔드</h2>
        </div>
      </div>
      <div class="title-menu-area">
        <div 
          class="title-menu" 
          v-for="menu of titleMenu" 
          :key="menu.path"
          @click="onClickMenu(menu)">
          <div class="title-menu-title">{{ menu.title }}</div>
          <div class="title-menu-content">{{ menu.content }}</div>
        </div>
      </div>
    </div>
    <div class="who-section">
      <h1></h1>
    </div>
  </div>
</template>

<style lang="scss">
@import './main.scss';
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');

.index-wrapper {
  padding: 32px;
  background-color:rgb(230, 221, 195);
  font-family: 
    'Noto Serif',
    'Noto Serif KR',
    sans-serif;
}
.barcode-font {
  font-family: 'Libre Barcode 128 Text', cursive;
  // font-size width
  font-size: var(--typo-h2-font-size);
}

.title-section {
  position: relative;
  width: 100%;
  height: 100vh;
  .title-barcode {
    margin-top: 32px;
  }
  .title-area {
    margin-top: 8px;
    border-top: 2px solid black;
  }
  .title-menu-area {
    margin-top: 8px;
    border-top: 1px solid rgb(158, 150, 117);
    padding-top: 8px;
    padding-bottom: 16px;
    border-bottom: 3px solid rgb(99, 95, 69);

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

    cursor: pointer;
    user-select: none;

    .title-menu-title {
      font-size: 1rem;
      font-weight: bold;
    }
    .title-menu-content {
      font-size: 0.8rem;
    }
  }
  .title-text {
    h1 {
      font-size: calc(1.2 * var(--typo-title-font-size));
      font-weight: normal;
      margin: 0;
      line-height: 1;
      text-align: center;
    }
    h2 {
      font-size: calc(var(--typo-h1-font-size));
      font-weight: normal;
      margin: 0;
      line-height: 1;
      text-align: right;
    }
  }
}

</style>