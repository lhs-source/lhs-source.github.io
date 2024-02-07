<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function animIntroducement() {
  for(let i = 0; i < 4; i++) {
    gsap.to(`.introducement-row:nth-child(${i + 1}) span`, {
      scrollTrigger: {
        trigger: `.introducement-row:nth-child(${i + 1})`,
        start: '0 bottom',
      },
      opacity: 1,
      y: 0,
      duration: 1.4,
    });
  }

  for(let i = 0; i < 4; ++i) {
    gsap.timeline({
      scrollTrigger: {
        trigger: `.introducement-section:nth-child(${i + 1})`,
        start: 'top 80%',
        end: 'bottom 20%',
        markers: {
          startColor: 'white',
          endColor: 'white',
          fontSize: '12px',
        }
      },
    }).from('.introducement-title', {
      x: 50,
      opacity: 1,
      duration: 1,
    }).from('.introducement-subtitle', {
      x: 50,
      opacity: 1,
      duration: 1,
    }, 1).from('.introducement-text', {
      x: 50,
      opacity: 1,
      duration: 1,
    }, 2);
  }

  // .introducement 가 600vh 동안 위로 이동한다.
  gsap.timeline({
    scrollTrigger: {
      trigger: '.introducement-move',
      start: '100px top',
      end: 'bottom bottom',
      scrub: 1,
    },
  // }).to('.introducement-move', {
  //   y: '-300vh',
  //   duration: 1,
  //   ease: 'none',
  }).to('.introducement-main-title .introducement-title', {
    y: '50vh',
    duration: 1,
    ease: 'none',
  }, 0);

  

}

onMounted(() => {
  animIntroducement();
})
</script>

<template>
  <section class="introducement-wrapper h-1000vh">
    <div class="introducement-move  h-1000vh">
      <div class="dummy h-100vh"></div>
      <div class="introducement-main-title">
        <div class="introducement-row"><span>
          INTRODUCEMENT
        </span></div>
        <div class="introducement-row"><span>
          <span class="text-stroke">F</span>RONT
        </span></div>
        <div class="introducement-row"><span>
          <span class="text-stroke">E</span>ND
        </span></div>
        <div class="introducement-row"><span>
          ENGINEER
        </span></div>
        <!-- <img class="mokoko" src="https://i.ytimg.com/vi/T_MYHHb1Ib0/maxresdefault.jpg"/> -->
      </div>
      <div class="introducement-section">
        <div class="introducement-title"><span>AUTONOMOUS</span></div>
        <div class="introducement-subtitle"><span>independent and having the power to make your own decisions</span></div>
        <div class="introducement-text"><span>I take responsibility for what I make, and I take ownership of it, so I can always make it better.</span></div>
      </div>
      <div class="introducement-section">
        <div class="introducement-title"><span>SKILL</span></div>
        <div class="introducement-subtitle"><span>having the training, knowledge, and experience that is needed to do something well</span></div>
        <div class="introducement-text"><span>I take responsibility for what I make, and I take ownership of it, so I can always make it better.</span></div>
      </div>
      <div class="introducement-section">
        <div class="introducement-title"><span>COMMUNICATION</span></div>
        <div class="introducement-subtitle"><span>a process by which information is exchanged between individuals through a common system of symbols, signs, or behavior</span></div>
        <div class="introducement-text"><span>I take responsibility for what I make, and I take ownership of it, so I can always make it better.</span></div>
      </div>
      <div class="introducement-section">
        <div class="introducement-title"><span>CONCENTRATION</span></div>
        <div class="introducement-subtitle"><span>the ability to think carefully about something you are doing and nothing else</span></div>
        <div class="introducement-text"><span>I take responsibility for what I make, and I take ownership of it, so I can always make it better.</span></div>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss">
@import "./main.scss";
@import "../../assets/scss/text-noise-animation.scss";
$font-color-brown: #B8621B;

.introducement-wrapper {
  // position: sticky;
  // top: 0;
  // left: 0;
  width: 100%;
  overflow-y: hidden;

  .introducement-move {
    z-index: 1;
    // margin-top: 300vh;
    width: 100%;

    // 아래로 어두워지는 그라데이션
    background: linear-gradient(180deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,1) 50%)
      , url('https://www.junggi.co.kr/data/article/20190228/5c778a3aeec6d.jpg')
      ;
    background-size: 200%;
    // no repeat
    background-repeat: no-repeat;
    
    color: white;

    .introducement-row {
      overflow-y: hidden;

      font-size: var(--typo-h5-font-size);
      
      span {
        display: inline-block;
        opacity: 0;
        transform: translateY(100px);
      }
    }
    .introducement-section {
      .introducement-title {
        margin-top: 10vh;
        font-size: calc(var(--typo-h1-font-size) * 1.6);
        font-weight: 400;
        line-height: 1.2;

        // text background 
        color: transparent;
        // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuVOA4cAYeVDL1nViIY7cU_i2TdAz1dFe2QWxTqRIGw&s
        background: linear-gradient(to bottom, #9f9f9f50 30%, #89898927 80%, #5e5e5e67),
          url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuVOA4cAYeVDL1nViIY7cU_i2TdAz1dFe2QWxTqRIGw&s') 
          no-repeat center bottom / cover;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .introducement-subtitle {
        margin-top: 2vh;
        width: 32%;
        min-width: 320px;
        font-size: var(--typo-tiny-font-size);
        font-weight: 400;
        line-height: 1;
      }
      .introducement-text {
        margin-top: 2vh;
        width: 32%;
        min-width: 320px;
        font-size: var(--typo-body-font-size);
        font-weight: 400;
        line-height: 1;
      }

    }
    .introducement-main-title {
      width: 100%;
      min-height: 150vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 0.9;
      .introducement-row {
        color: rgb(216, 216, 216);
        font-size: calc(var(--typo-title-font-size) * 1.5);
        font-weight: 400;
        font-family: 'Inter';

        .text-stroke {
          -webkit-text-stroke-width: 2px;
          font-weight: 600;
        }
      }
      .mokoko {
        width: 128px;
        height: 128px;
        position: absolute;
        right: 128px;
        border-radius: 50%;
        object-fit: cover;
        object-position: 50% 100%;
      }
    }
  }
}

</style>
