<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, ref } from "vue";

const refTitle = ref<HTMLElement | null>(null);

function animExploreTitle(totalHeight: number) {
  // title 나타나기
  gsap.timeline({
    scrollTrigger: {
      trigger: ".title-sticky",
      start: "start start",
      end: `100% start`,
      // markers: true,
      toggleActions: "play none none reverse",
      scrub: 1,
    },
  })
  .to('.title-center', { opacity: 1, }, 0)
  .from('.title.origin', {
    y: -164,
    duration: 2,
    ease: 'power2.inOut',
  }, 0)
  .from('.title.reflect', {
    y: 132,
    duration: 2,
    opacity: 1,
    ease: 'power2.inOut',
    // 이거 하면 clip 이 안됨
    // background: 'linear-gradient(to bottom, #eeeeee04 30%, #eeeeee44 80%, #eeeeeeb1)',
    // backgroundClip: 'text',
  }, 0)
  .from('.inspired', { opacity: 0, duration: 4 }, 4)
  .from('.subtitle', { opacity: 0, duration: 4 }, 6)
  .to('.title-center', {
    y: -164,
    opacity: 0.1,
    duration: 20,
    ease: 'power2.out',
  }, 20)

}

function animMrCrow(totalHeight: number) {

  const talkTransitionTime = 0.05;
  const talkDelay = 0.2;
  let talkTime = 0.3;
  gsap.timeline({
    scrollTrigger: {
      trigger: ".crow-brain-sticky-wrapper",
      start: "start 100%",
      end: `100% 100%`,
      scrub: 2,
      // markers: true,
    },
  })
  .to('.crow-brain-sticky', {
    // backgroundColor: 'rgb(10, 10, 10, 0.7)',
  })
  .to('#mrcrow', {
    opacity: 0.7,
    width: '50vm',
    duration: 0.5,
  }, 0.2)
  .to('#talk-1', {
    opacity: 1,
    duration: talkTransitionTime,
  }, talkTime+=talkDelay)
  .to('#talk-1', {
    opacity: 0.5,
    duration: talkTransitionTime,
  }, talkTime+=talkDelay)
  .to('#talk-2', {
    opacity: 1,
    duration: talkTransitionTime,
  }, talkTime)
  .to('#talk-2', {
    opacity: 0.5,
    duration: talkTransitionTime,
  }, talkTime+=talkDelay)
  .to('#talk-3', {
    opacity: 1,
    duration: talkTransitionTime,
  }, talkTime)
  .to('#talk-3', {
    opacity: 0.5,
    duration: talkTransitionTime,
  }, talkTime+=talkDelay)
  // 대사 사라짐
  .to('.talk-area', {
    opacity: 0,
    duration: talkTransitionTime,
  }, talkTime)
  .to('#mrcrow', {
    width: '120%',
    yPercent: 50,
    opacity: 1,
    duration: 0.2,
  }, talkTime+=0.2)
  .to('#brain', {
    visibility: 'visible',
    opacity: 1,
    // width: '60%',
    ease: 'power2.inOut',
    duration: talkTransitionTime,
  }, talkTime+=0.2)
  .to('#brain', {
    y: -screen.availHeight * 0.2,
    ease: 'power2.inOut',
    duration: talkTransitionTime,
  }, talkTime+=0.2)
  .to('#brain', {
    scale: 10,
    yPercent: -10,
    opacity: 0,
    ease: 'power2.inOut',
    duration: talkTransitionTime * 3,
  }, talkTime+=0.2)
  .to('.crow-brain-wrapper', {
    opacity: 0,
    duration: talkTransitionTime * 6,
  }, talkTime+=talkTransitionTime)
}

onMounted(() => {
  const sectionTotalHeight = screen.availHeight * 10;
  animExploreTitle(sectionTotalHeight);
  animMrCrow(sectionTotalHeight);
})

</script>

<template>
  <section class="crow-brain-wrapper h-4800vh">
    <div class="h-100vh"></div>
    <!-- <div class="sticky-height pos-relative h-300vh"> -->
      <div class="title-sticky pos-sticky top-left h-500vh">
        <div class="title-center">

          <h4 class="inspired">Inspired by RustyLake</h4>
          <h1 ref="refTitle" class="title origin noise-cyber bg-clip-text" data-text="EXPLORE LEE HYUNSOO">
            EXPLORE LEE HYUNSOO
          </h1>
          <h1 ref="refTitle" class="title reflect bg-clip-text">
            EXPLORE LEE HYUNSOO
          </h1>
          <h4 class="subtitle">It's time to travel the Brain of LEE HYUNSOO </h4>
        </div>
      </div>
    <!-- </div> -->
    <div class="crow-brain-sticky-wrapper sticky-height pos-relative h-4000vh">
      <div class="crow-brain-sticky pos-sticky top-left">
        <div class="full-center">
          <img id="mrcrow" src="../../assets/crow/mr-crow.webp" />
          <div class="talk-area pos-absolute bottom-left">
            <div id="talk-1" class="talk">Welcome to my BRAIN</div>
            <div id="talk-2" class="talk">Found out my PROPERTIES</div>
            <div id="talk-3" class="talk">And exit to the DOOR for FUTURE</div>
          </div>
          <img id="brain" src="https://purepng.com/public/uploads/large/brain-oya.png" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
@import "../../assets/scss/text-noise-animation.scss";

.crow-brain-wrapper {
  background-color: rgb(10, 10, 10);
  min-height: 100vh;

  color: white;
  .title-sticky{
    height: 500vh;
    .title-center {
      padding: 24px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      font-family: 'Orbitron';

      .inspired {
        // align-self: flex-start;
        // margin-left: 15%;
        background: url('https://clan.akamai.steamstatic.com/images/26608424/c99f10476feee601ab701272f08babfe50eaae3a_960x311.png');
        background-size: contain;
        opacity: 0.5;
      }
      .subtitle {
        margin-top: 36px;
      }
      h1.title {
        margin: 0;
        font-size: 4rem;
        line-height: 1;

        &.origin {
          background: 
            // 투명
            linear-gradient(to bottom, #9f9f9f50 30%, #89898927 80%, #5e5e5e67),
            url('https://i.pinimg.com/550x/d4/69/44/d4694482eefd155d874b6e7780960503.jpg') 
            no-repeat center bottom / cover;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          font-family: 'Black Ops One';
        }

        &.reflect {
          transform: scaleY(-1);
          // 아래로 갈수록 글자가 투명해지는 효과
          background: linear-gradient(to bottom, #eeeeee04 30%, #eeeeee44 80%, #eeeeeebb);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          opacity: 0.8;
          font-family: 'Black Ops One';
        }
      }
    }
  }

  .crow-brain-sticky-wrapper {
    .crow-brain-sticky {
      // mrcrow 이미지
      #mrcrow {
        opacity: 0;
        width: 40%;
      }
      .talk-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 2rem;
        padding-bottom: 4rem;

        .talk {
          opacity: 0;
          font-size: 2rem;
          line-height: 1;
          font-family: 'Indie Flower';
        }
      }
      #brain {
        width: 20%;
        position: absolute;
        bottom: 30%;
        left: 50%;
        visibility: hidden;
        opacity: 0;
      }
    }
  }
}

@media screen and (max-width: 480px) {
}



</style>