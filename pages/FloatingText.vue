

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Hello, World!');
</script>

<template>
  <div class="container">
    <!-- V 글자 (회전 없이 일반 텍스트로 표시) -->
    <div class="v-letter">
      <div class="svg-container absolute -left-[100px] h-[500px]">
        <svg style width="880px" height="880px" viewBox="0 -17.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
          <g>
            <path d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z" fill="#41B883"> </path>
            <path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883"></path>
            <path d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z" fill="#35495E"></path>
          </g>
        </svg>
      </div>
    </div>
    <h1 class=" absolute top-8 right-[64px] text-[84px] font-bold mix-blend-difference text-stone-400 transform -rotate-70">
      SKILL STACK
    </h1>
    <div class="text-group mr-12">
      <!-- 오른쪽에 배치될 텍스트 -->
      <div class="text pt-[160px]">
        Analyzing updates. I'm pulling together the main aspects of Obsidian v1.8.3, 
        <div class="text-8xl inline-block float-right text-emerald-700 font-bold">
          Vue
        </div>
        focusing on highlights, new features, <div class="text-2xl inline-block text-yellow-600 font-bold">Python</div> improvements, bug fixes, and third-party library upgrades. 
        Breaking down updates. I’m analyzing <div class="text-2xl inline-block text-red-700 font-bold">Java</div> the technical updates in Obsidian v1.8.3,
        focusing on highlights, new features, improvements, 
        bug fixes, and third-party library upgrades. <div class="text-2xl inline-block text-emerald-600 font-bold">NuxtJS</div> Breaking down the update. 
        I'm working through Obsidian v1.8.3, highlighting features like Web Viewer, sync options, and UI enhancements. Improvements target list numbering, 
        <div class="text-4xl inline-block text-amber-700 font-bold">
          C++
        </div>
        editor suggestions, and canvas functionality. Bug fixes are also addressed.
        <div class="text-5xl inline-block float-right text-sky-700 font-bold">
          Typescript
        </div>
        The bird fights its way out of the egg. The egg is the world. <div class="text-2xl inline-block font-bold">Git</div> 
        Who would be born must first destroy a world. <div class="text-xl inline-block text-blue-700 font-bold">VSCode</div> The bird flies to God. That God's name is Abraxas.
        I was only trying to live 
        <div class="text-4xl inline-block text-lime-700 font-bold">
          Android
        </div> 
        my life in accordance with the principles which sprang from my own true self. Why was that so very difficult?

        Our god's name <div class="text-xl inline-block text-violet-700 font-bold">Obsidian</div> is Abraxas and he is God and Satan and he contains both the luminous and the dark world. I was only trying to live my life in accordance with the principles which sprang from my own true self. Why was that so very difficult?
        If you hate a person, <div class="text-xl inline-block font-bold">Cursor</div> you hate something in him that is part of yourself. What isn't part of ourselves doesn't disturb us. 
        I live in my dreams — that's what you sense. <div class="text-xl inline-block font-bold text-purple-700">Datadog</div> Other people live in dreams, but not in their own. That's the difference.
        Love must not entreat,' she added, 'or demand. Love must have the strength to become certain within itself. 
        Then it ceases merely to be attracted and <div class="text-2xl inline-block text-blue-700 font-bold">NextJS</div> begins to attract.
      </div>
    </div>
    <div class="bordered-div mb-16 mt-12 p-16 text-center">
      언어는 도구일 뿐, 사용하기 나름이다.
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

    /* 컨테이너는 float 요소를 포함하므로 overflow:hidden 처리 */
    .container {
      // overflow: hidden;
      position: relative;
    }
    
    /* 
      .v-letter는 V 글자를 표시하는 플로트 요소입니다.
      여기서 높이는 450px, 글자 크기도 450px로 설정합니다.
      텍스트가 V 글자와 겹치지 않도록 shape-outside를 사용하여
      V 글자의 오른쪽 경계를 다각형으로 정의합니다.
      
      예제에서는 V 글자의 오른쪽 경계가
      - 위쪽: (40.5px, 0)     → (450px의 30% = 135px*0.3 ≒ 40.5px)
      - 아래쪽: (135px, 450px)  → 450px의 30% 기울기: 0.3×450 = 135px
      그리고 나머지 모서리 (0,0)와 (0,450px)를 포함한 사각형 중에서
      오른쪽 부분만 텍스트가 침범하지 못하도록 합니다.
    */
    $v-letter-width: 800px;
    $v-letter-height: 800px;
    .v-letter {
      float: left;
      width: $v-letter-width;
      height: $v-letter-height;
      font-size: 450px;
      line-height: 450px;
      text-align: center;
      color: #444;
      /* shape-outside: 좌측 상단 (0 0), 우측 상단 (720px 0),
         우측 하단 (200px 450px), 좌측 하단 (0 450px)
         → 위쪽은 720px까지, 아래쪽은 200px까지 확장 */
      shape-outside: polygon(0 0, $v-letter-width 0, -40px 1450px, 0 1450px);
      /* shape-outside를 위해 배경은 불투명해야 합니다. */
      // background: #ccc;
      /* (필요 시) 여백 조정 */
      margin-right: 8px;
      .svg-container {
        filter: drop-shadow(3px 5px 25px rgba(0, 0, 0, 0.5));
      }
    }
    
    /* 텍스트 영역 스타일 (16px 크기) */
    .text {
      font-size: 16px;
      line-height: 1.5;
      // mix-blend-mode: difference;
    }
    .text p {
      margin: 1em 0;
    }



    .bordered-div {
      width: 100%;
      display: inline-block;
      position: relative; /* pseudo-element의 위치 기준 */
      // background-color: #214f31; /* 필요에 따라 배경색 지정 */
      mix-blend-mode: hard-light;
    }
    /* 왼쪽 위 코너에 테두리 선을 추가 */
    .bordered-div::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      /* 테두리를 그릴 영역의 크기를 지정 (여기서는 40px 길이) */
      width: 40px;
      height: 40px;
      border-top: 12px solid #1b1b1b;
      border-left: 12px solid #1b1b1b;
      pointer-events: none;
    }
    /* 오른쪽 아래 코너에 테두리 선을 추가 */
    .bordered-div::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border-bottom: 12px solid #1b1b1b;
      border-right: 12px solid #1b1b1b;
      pointer-events: none;
    }
</style>