<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, withDefaults } from "vue";
import { gsap } from 'gsap';

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

const skillList = [
  { id: 'vue', name: 'vue', color: 'white', bgColor: 'green', icon: 'vue.png'},
  { id: 'angular', name: 'angular', color: 'white', bgColor: 'red', icon: 'angular.png'},
  { id: 'cpp', name: 'c++', color: 'white', bgColor: 'blue', icon: 'cpp.png'},
  { id: 'java', name: 'java', color: 'white', bgColor: 'orange', icon: 'java.png'},
  { id: 'spring', name: 'spring', color: 'white', bgColor: 'green', icon: 'spring.png'},
  { id: 'python', name: 'python', color: 'white', bgColor: 'blue', icon: 'python.png'},
  { id: 'android', name: 'android', color: 'white', bgColor: 'green', icon: 'android.png'},
  { id: 'aws', name: 'aws', color: 'white', bgColor: 'orange', icon: 'aws.png'},
  { id: 'git', name: 'git', color: 'white', bgColor: 'red', icon: 'git.png'},
  { id: 'slack', name: 'slack', color: 'white', bgColor: 'red', icon: 'slack.png'},
  { id: 'atlassian', name: 'atlassian', color: 'white', bgColor: 'blue', icon: 'atlassian.png'},
  { id: 'notion', name: 'notion', color: 'white', bgColor: 'orange', icon: 'notion.png'},
  { id: 'lua', name: 'lua', color: 'white', bgColor: 'green', icon: 'lua.png'},
  { id: 'javacos', name: 'javacos', color: 'white', bgColor: 'blue', icon: 'javacos.png'},
  { id: 'compiler', name: 'compiler', color: 'white', bgColor: 'red', icon: 'compiler.png'},
]

function getImageUrl(path: string){
  return new URL(path).href;  
}
/**
 * ## 200px 정도로 했을 때 개수
 */
const skillRailCount = computed(() => {
  const totalWidth = screen.availWidth * 1;
  return Math.round(totalWidth / 360);
})

function animSkillSet() {
  // skill-tower-frame 계속 PIN
  const skillListTotalScrollHeight = skillList.length * 400;
  gsap.timeline({
    scrollTrigger: {
      trigger: '.skill-tower-frame',
      start: 'top top',
      end: `${skillListTotalScrollHeight + screen.height} bottom`,
      pin: true,
    }
  }).to('.motor', {
    opacity: 0.8,
  })
  // .to('.skill-tower', {
  //   opacity: 1,
  // })
  skillList.forEach((skill, index) => {
    // skill-tower-frame 계속 PIN
    gsap.timeline({
      scrollTrigger: {
        trigger: `#${skill.id}`,
        start: `${(skillList.length - index) * 300}px top`,
        end: `${(skillList.length - index) * 400}px top`,
        scrub: 2.5,
        toggleActions: 'restart none none reverse',
      },
    }).from(`#${skill.id}`, {
      y: -screen.availHeight,
      opacity: 0,
    }).to(`#${skill.id}`, {
      borderColor: '#333',
    })
  });

  // 동그라미 돌기
  gsap.to('.svg-circle', {
    rotate: 540,
    scrollTrigger: {
      trigger: '.motor',
      start: 'top top',
      end: `${screen.availHeight * 15}px top`,
      scrub: 1,
    }
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
              M 27, 60
              a 33,33 0 1,1 66,0
              a 33,33 0 1,1 -66,0"/>
        </defs>
        <text font-size="6">
          <textPath xlink:href="#circle" fill="#eee">
            Vue C++ Angular Java Spring Python Android AWS Git 
            Slack Atlassian Notion Lua JavaCOS Compiler
          </textPath>
        </text>
      </svg>
    </div>
    <div class="skill-tower-frame">
      <div class="skill-tower">
        <div 
          v-for="(skill, index) of skillList" 
          :id="skill.id"
          class="skill">
          {{ skill.name }}
          <div 
            class="hidden-bg"
            :style="{
              backgroundColor : skill.bgColor,
              color: skill.color}">
            <img :src="`/assets/skill-icon/${skill.icon}`"/>
              <!-- skillRailCount 개 만큼 반복 -->
            <span class="bg-rail">
              <span class="bg-text"
                v-for="i in skillRailCount">
                {{ skill.name.toLocaleUpperCase() }}
              </span>
            </span>
            <span class="bg-rail">
              <span class="bg-text"
                v-for="i in skillRailCount">
                {{ skill.name.toLocaleUpperCase() }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
.skill-set {
  position: relative;
  background-color: black;
  height: 3000vh;
  // 계속 돌아가는 부분
  .motor {
    position: sticky;
    top: 0;
    left: 0;
    .svg-circle {
      transform: translateX(-50%);
    }
  }
  .skill-tower-frame { 
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .skill-tower {
      display: flex;
      flex-direction: column;
      height: 100vh;
      // opacity: 0;
      .skill {
        position: relative;
        flex: 1;
        width: 100vw;
        overflow: hidden;

        border-style: solid;
        border-width: 1px;
        border-color: transparent;
        
        font-size: var(--typo-h1-font-size);
        text-align: center;
        color: white;

        transition: border-color 0.25s ease-in-out;

        &:hover {
          border-color: transparent !important;
          .hidden-bg {
            top: 0;
            img {
              opacity: 0.8;
            }
          }
        }

        .hidden-bg {
          position: absolute;
          display: flex;
          flex-wrap: nowrap;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          // opacity: 0;
          overflow: hidden;

          transition: top 0.25s;
          img {
            position: absolute;
            width: 128px; 

            opacity: 0;
            left: 100px;
          }

          .bg-rail {
            display: flex;
            min-width: 100vw;
            white-space: nowrap;
            font-weight: 700;

            // 40초간 100% 거리를 <- 방향으로 이동
            animation: horizontal-rail 40s linear infinite;
            .bg-text {
              flex: 1;
            }
          }
        }
      }
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

@keyframes horizontal-rail {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>