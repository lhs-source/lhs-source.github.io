<script setup lang="ts">
import { defineEmits, defineProps, onMounted, withDefaults } from "vue";
import { gsap } from 'gsap';

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

function animSkillSet() {
  gsap.to('.svg-circle', {
    rotate: 540,
    scrollTrigger: {
      trigger: '.motor',
      start: 'top top',
      end: `${screen.availHeight * 15}px top`,
      scrub: 1,
    }
  })

  const skillSet = [
    { selector: '.vue', bgColor: 'rgb(22, 67, 40)' },
    { selector: '.cpp', bgColor: 'rgb(22, 67, 140)' },
  ]
  skillSet.forEach((set) => {
    // pin
    gsap.timeline({
      scrollTrigger: {
        trigger: set.selector,
        start: 'top top',
        end: `${screen.availHeight * 4}px bottom`,
        toggleActions: "restart none none reverse",
        pin: true,
      }
    }).to('.skill-set2', {
      backgroundColor: set.bgColor,
    });
    // text
    gsap.timeline({
      scrollTrigger: {
        trigger: set.selector,
        start: 'top top',
        end: `${screen.availHeight * 4}px bottom`,
        toggleActions: "restart reverse restart reverse",
      }
    }).to(`${set.selector} .bg-title`, {
      opacity: 1,
    })
    // .to(`${set.selector} .bg-title`, {
    //   position: 'fixed',
    // })
  })
}

onMounted(() => {
  animSkillSet();
})

</script>

<template>
  <section class="skill-set">
    <div class="full-center motor">
      <svg class="svg-circle" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <circle class="circle" cx="60" cy="60" r="29" stroke-width="0.25" fill="none" stroke="#ddd"></circle>
        <defs>
          <path id="circle"
            d="
              M 64, 60
              m -37, 0
              a 29,29 0 1,1 66,0
              a 29,29 0 1,1 -66,0"/>
        </defs>
        <text font-size="6">
          <textPath xlink:href="#circle" fill="#eee">
            Vue C++ Angular Java Spring Python Android AWS Git 
            Slack Atlassian Notion Lua JavaCOS Compiler
          </textPath>
        </text>
      </svg>
    </div>
    <div class="full-center vue">
      <div class="full-center">
        <div class="bg-title">vue</div>
      </div>
    </div>
    <div class="full-center cpp">
      <div class="full-center">
        <div class="bg-title">C++</div>
      </div>
    </div>
    <div class="sub-lang">
      <h1>Angular</h1>
      <h1>Java</h1>
      <h1>Spring</h1>
      <h1>Python</h1>
      <h1>Android</h1>
    </div>
    <div class="tool">
      <h1>AWS</h1>
      <h1>Git</h1>
      <h1>Spring</h1>
    </div>
    <div class="task-tool">
      <h1>Slack</h1>
      <h1>Atlassian</h1>
      <h1>Notion</h1>
    </div>
    <div class="etc">
      <h1>Lua</h1>
      <h1>JavaCOS</h1>
      <h1>Compiler</h1>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
.skill-set {
  position: relative;
  background-color: black;
  height: 3000vh;
  .motor {
    position: sticky;
    top: 0;
    left: 0;
    .svg-circle {
      transform: translateX(-50%);
    }
  }
  .vue, .cpp {
    z-index: 1;
    height: 100vh;
    justify-content: flex-start;
    .bg-title {
      position: absolute;
      bottom: 0;
      right: 0;
      opacity: 0;
      color: $color-text-darker;
      font-size: 24rem;
      line-height: 24rem;
      font-weight: 700;
      vertical-align: bottom;
    }
  }
}
</style>