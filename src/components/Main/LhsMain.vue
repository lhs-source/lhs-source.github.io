<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from "vue";

const motionPathEndHeight = 1/2;

function animMotionPath(totalHeight: number) {
// 모션패스
const motionPathHeight = totalHeight * motionPathEndHeight;
  // 스크롤 절반을 모션패스로 이동
  gsap.to(".crow-image", {
    duration: 5, 
    ease: "power1.inOut",
    // immediateRender: true,
    // svg#path 경로를 따라서 까마귀가 이동
    motionPath: {
      path: "#path",
      align: "#path",
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
    // 이동을 한번에 하는 게 아니라 
    // scrollTrigger의 scrub 으로 이동
    scrollTrigger: {
      trigger: '.crow-loading',
      start: 'start start',
      end: () => motionPathHeight,
      scrub: 1,
    }
  });
  // 마지막 덤블링 
  gsap.to("#crow", {
    rotate: -720,    
    ease: "power1.OutIn",
    immediateRender: true,
    scrollTrigger: {
      trigger: '.crow-loading',
      start: () => motionPathHeight * 4 / 6,
      end: () => motionPathHeight,
      scrub: 1,
    }
  });
  const upStep = {
    rotate: 15,
    ease: 'Power0.easeOut',
    duration: 3,
  }
  const downStep = {
    rotate: 0,
    ease: 'Power0.easeOut',
    duration: 3,
  }
  gsap.timeline({
    scrollTrigger: {
      trigger: '.crow-loading',
      start: 'start start',
      end: () => motionPathHeight * 4 / 6,  // 텀블링 시작 전까지
      scrub: 1,
    }
  })
  .to('.crow-image', upStep, 0)
  .to('.crow-image', downStep, 10)
  .to('.crow-image', upStep, 20)
  .to('.crow-image', downStep, 30)
  .to('.crow-image', upStep, 40)
  .to('.crow-image', downStep, 50)
  .to('.crow-image', upStep, 60)
  .to('.crow-image', downStep, 70)
}

function animTitleDisappear(totalHeight: number) {
  const charList = gsap.utils.toArray('.title .char');
  // 원을 중심으로 글자들이 퍼져나가는 위치
  
  const vectorList = charList.map((char, index) => {
    // -120 ~ -60도까지
    const degree = -120 + 60 / charList.length * (index + 1);
    const distance = Math.max(screen.availHeight, screen.availWidth);
    const rotateMax = 120;
    return [
      Math.cos(degree * Math.PI / 180) * distance,
      Math.sin(degree * Math.PI / 180) * distance,
      Math.random() * rotateMax - rotateMax / 2,
    ];
  })
  gsap.timeline({
    scrollTrigger: {
      trigger: '.crow-loading',
      start: () => totalHeight * motionPathEndHeight,
      end: () => totalHeight,
      scrub: 3,
    }
  }).to(charList, {
    duration: 1,
    // stagger: 0.1,
    ease: 'Power0.easeOut',
    opacity: 0,
    y: (i) => vectorList[i][1],
    x: (i) => vectorList[i][0],
    rotate: (i) => vectorList[i][2],
  }, 1)
  .to('.crow-image', {
    duration: 1,
    ease: 'Power0.easeOut',
    opacity: 0,
    y: -screen.availHeight * 2,
    x: -screen.availWidth / 2,
    rotate: 60,
  }, 1)
}

onMounted(() => {
  const sectionTotalHeight = screen.availHeight * 10;
  animMotionPath(sectionTotalHeight);
  animTitleDisappear(sectionTotalHeight);
})

</script>

<template>
  <section class="crow-wrapper">
    <div class="crow-loading pos-sticky top-left">
      <div class="crow-motion layer full-center">
        <div class="crow-image">
          <svg 
            id="crow"
            version="1.0" 
            xmlns="http://www.w3.org/2000/svg"
            width="1280.000000pt" 
            height="1151.000000pt" 
            viewBox="0 0 1280.000000 1151.000000"
            preserveAspectRatio="xMidYMid meet">
            <g 
              transform="translate(0.000000,1151.000000) scale(0.100000,-0.100000)"
              fill="#fff" stroke="none">
              <path d="M2316 11499 c-176 -26 -356 -97 -581 -229 -143 -85 -157 -90 -275
              -90 -168 0 -355 -39 -640 -132 -447 -146 -681 -303 -799 -536 -12 -24 -21 -45
              -19 -47 12 -11 239 -39 488 -60 574 -48 783 -75 851 -110 66 -35 147 -158 193
              -297 56 -165 59 -199 57 -525 -1 -207 1 -303 8 -303 6 0 11 15 11 33 0 17 5
              39 10 47 7 11 10 7 10 -17 0 -49 17 -40 29 15 24 112 30 100 30 -58 1 -151
              -16 -342 -44 -505 -10 -53 -11 -81 -4 -86 7 -4 2 -56 -16 -153 -30 -172 -43
              -312 -28 -303 6 4 13 20 16 37 11 50 24 34 32 -37 4 -38 12 -77 17 -87 10 -19
              11 -18 25 5 12 22 13 16 7 -53 -4 -55 -3 -78 5 -78 6 0 11 5 11 11 0 6 7 8 15
              5 11 -4 20 3 27 22 11 24 13 17 18 -63 3 -57 11 -99 22 -115 30 -48 63 -209
              59 -290 -2 -41 -4 -142 -4 -225 0 -134 3 -160 27 -239 82 -274 223 -476 473
              -677 101 -82 131 -112 170 -175 148 -233 243 -369 368 -528 200 -254 256 -335
              329 -476 65 -126 328 -710 374 -830 125 -327 250 -842 332 -1370 17 -107 39
              -246 50 -309 22 -127 25 -255 7 -288 -44 -78 -510 -531 -599 -581 -61 -35 -84
              -59 -121 -123 -15 -26 -33 -49 -42 -53 -35 -13 -191 -26 -347 -28 l-166 -2
              -129 64 c-116 59 -134 65 -188 64 -91 0 -167 -51 -206 -139 -29 -63 -22 -71
              25 -27 77 71 146 93 224 73 67 -18 70 -39 18 -115 -45 -65 -69 -127 -81 -203
              -4 -27 -3 -43 4 -43 5 0 40 38 76 85 37 47 70 85 73 85 4 -1 16 -20 27 -43 18
              -37 25 -42 57 -45 20 -2 60 1 88 6 38 7 66 6 103 -4 41 -10 67 -11 121 -3 98
              16 149 8 203 -31 l45 -33 106 7 c108 6 120 10 223 69 l46 27 174 -20 c177 -20
              312 -24 384 -12 52 10 93 65 102 140 7 65 32 86 103 86 68 0 96 -23 135 -109
              19 -41 43 -79 54 -85 20 -10 21 -8 21 27 0 103 -52 205 -126 252 -84 54 -146
              50 -334 -18 -151 -56 -250 -76 -295 -61 -64 21 -80 71 -46 146 28 62 183 236
              416 469 116 116 229 237 252 270 141 209 168 347 139 724 -9 123 -15 226 -12
              228 2 3 23 -21 46 -52 29 -40 45 -53 50 -45 6 9 15 0 29 -29 21 -39 47 -50 34
              -13 -5 14 -3 14 17 -3 l23 -20 -7 30 -8 30 22 -28 c26 -32 37 -30 19 5 l-12
              23 22 -20 22 -19 -7 29 c-4 17 -20 61 -36 99 -31 77 -33 85 -16 68 19 -19 30
              -14 18 7 -19 37 -10 35 31 -4 l42 -40 -7 35 -6 35 26 -29 c19 -21 28 -26 34
              -17 5 9 34 -20 90 -88 60 -72 87 -98 96 -91 6 6 18 8 26 5 12 -5 14 0 10 22
              -5 26 -4 27 13 13 17 -14 18 -13 12 22 -6 39 0 47 21 26 8 -8 12 -9 12 -1 0 6
              -7 19 -16 27 -14 15 -14 16 1 16 21 0 14 24 -35 117 -36 67 -37 71 -18 76 14
              4 29 -4 50 -29 40 -46 47 -36 14 22 -30 54 -32 61 -11 44 13 -10 15 -9 15 9 0
              22 16 29 22 10 2 -5 11 -7 21 -3 14 5 17 13 11 38 l-6 31 21 -19 c21 -19 21
              -19 21 0 0 11 -16 68 -35 127 -19 59 -35 114 -35 122 0 40 106 -3 243 -98 96
              -67 114 -119 81 -234 -10 -34 -14 -70 -10 -96 4 -23 7 -53 7 -67 1 -14 5 -28
              11 -31 7 -5 5 -23 -6 -55 -18 -54 -21 -84 -6 -84 6 0 10 -36 10 -87 0 -49 11
              -155 25 -238 35 -210 40 -296 22 -375 -8 -36 -40 -180 -71 -320 -80 -358 -172
              -671 -262 -885 -50 -120 -91 -158 -335 -322 -179 -120 -203 -132 -273 -148
              -79 -18 -140 -51 -175 -97 -23 -29 -64 -131 -76 -188 l-7 -35 53 60 c30 33 65
              72 79 87 14 15 42 35 62 43 l37 15 37 -40 c61 -66 123 -52 243 55 35 31 65 54
              68 51 9 -8 -94 -194 -174 -314 -107 -162 -126 -220 -131 -402 -2 -80 -1 -143
              2 -140 3 4 21 66 41 140 33 124 71 208 108 239 9 6 31 4 71 -7 57 -16 59 -16
              104 8 40 22 50 34 86 111 32 69 51 94 86 121 45 34 81 81 152 197 l37 61 123
              -61 c90 -44 139 -62 181 -66 l57 -6 27 63 27 62 81 -4 c137 -5 189 -51 245
              -212 19 -56 53 -106 72 -106 13 0 9 89 -7 158 -40 168 -139 281 -272 312 -20
              5 -67 1 -125 -11 -104 -20 -104 -20 -170 45 -70 68 -70 70 -66 345 l4 246 37
              108 c20 59 68 180 105 270 38 89 91 226 117 305 35 107 57 156 89 200 128 173
              216 329 251 442 9 30 19 61 21 69 4 11 8 11 22 -3 10 -9 22 -16 27 -16 11 0
              -1 157 -29 375 -12 99 -21 182 -20 184 2 2 11 -2 20 -10 13 -11 17 -11 25 4 9
              16 12 16 35 1 38 -26 40 -9 2 25 l-33 31 28 -6 c31 -7 37 9 10 25 -10 5 -14
              13 -10 17 4 4 13 2 19 -4 7 -7 20 -12 30 -12 32 0 8 28 -63 75 -65 43 -89 68
              -76 81 3 3 14 1 26 -5 24 -14 39 3 21 24 -10 12 -9 15 4 15 24 0 20 12 -16 44
              l-33 29 40 18 c47 22 130 24 207 7 29 -6 154 -63 277 -125 144 -72 236 -113
              256 -113 33 0 57 21 111 96 107 150 312 203 613 158 58 -8 219 -44 357 -79
              138 -35 302 -74 365 -86 62 -11 212 -50 334 -86 384 -112 541 -126 725 -68 45
              15 46 14 211 -43 132 -47 184 -71 259 -120 127 -83 230 -106 230 -52 0 11 3
              20 7 20 11 0 265 -137 388 -209 66 -39 128 -71 137 -71 9 0 28 14 41 32 l25
              31 43 -27 c24 -14 89 -58 144 -96 113 -79 161 -98 257 -107 60 -5 68 -4 74 13
              4 10 13 34 20 52 l14 34 31 -27 c65 -54 194 -105 266 -105 82 0 123 40 123
              120 0 22 2 40 4 40 2 0 49 -26 103 -58 l98 -58 45 14 c58 17 114 10 215 -28
              44 -17 106 -35 138 -42 69 -15 77 -8 77 64 0 26 4 49 8 52 4 3 42 -4 83 -15
              40 -11 86 -17 101 -14 25 6 26 8 16 36 -25 71 -80 107 -495 321 -219 113 -472
              248 -563 300 -91 52 -219 122 -285 156 -85 44 -187 112 -350 233 -466 346
              -911 667 -1146 826 -54 36 -97 68 -95 70 5 6 323 -51 581 -103 547 -111 1027
              -233 1546 -393 311 -96 515 -142 555 -127 8 3 14 19 14 41 0 29 4 35 21 35 12
              0 103 -27 201 -61 134 -45 196 -61 241 -62 l62 -2 0 55 c-1 75 -33 135 -120
              221 -109 108 -218 184 -370 259 -372 182 -615 263 -1420 474 -974 256 -906
              233 -1150 386 -151 96 -230 136 -412 211 -73 30 -133 56 -133 59 0 3 29 13 65
              22 36 10 87 27 114 38 l49 22 -60 126 c-33 70 -76 148 -95 175 -28 38 -33 50
              -23 62 12 14 -1 37 -138 242 -72 110 -229 231 -432 335 -133 68 -301 137 -605
              249 -183 67 -301 119 -500 219 -302 152 -332 161 -594 185 -287 25 -329 45
              -511 232 -64 66 -170 160 -240 213 -69 52 -303 236 -520 410 -591 471 -907
              716 -1135 877 -124 87 -163 130 -215 232 -22 44 -69 127 -104 184 -35 57 -146
              247 -246 423 -327 575 -490 791 -760 1007 -96 77 -364 217 -464 242 -132 33
              -327 43 -460 24z"/>
            </g>
          </svg>
        </div>
        <!-- 까마귀가 이동할 path -->
        <svg 
          id="motionPath" 
          class="motion-path"
          viewBox="0 0 800 600">
          <path 
            id="path" 
            fill="none" 
            stroke="transparent"
            d="M 700 550 Q 650 350 600 550 Q 550 350 500 550 Q 450 350 400 550 Q 350 350 300 550 Q 250 450 200 550 Q 150 0 100 550"/>
        </svg>
      </div>
      <div class="title-area layer full-center">
        <div class="title">
          <span class="char">L</span>
          <span class="char">E</span>
          <span class="char">E</span>
          <span class="char"></span>
          <span class="char">H</span>
          <span class="char">Y</span>
          <span class="char">U</span>
          <span class="char">N</span>
          <span class="char"></span>
          <span class="char">S</span>
          <span class="char">O</span>
          <span class="char">O</span>
        </div>
        <!-- <div class="subtitle">Blog. ASDFQWER1234!@#$</div> -->
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";

// 까마귀 로딩 섹션
.crow-wrapper {
  position: relative;
  min-height: 100vh;
  height: 1000vh;
  mix-blend-mode: difference;
  .crow-loading {
    z-index: 1;
    min-height: 100vh;
    isolation: auto;
    // background-color: rgb(255, 255, 255);

    .motion-path {
      width: 400px;
      transform: translateY(-75%);
    }
    .crow-image {
      width: 64px;
      height: 64px;
      #crow {
        width: inherit;
        height: inherit;
      }
    }
    .title-area {
      color: rgb(237, 237, 237);
      font-family: 'DIN Alternate', 'Cochin', sans-serif;
      .title {
        font-size: calc(2 * var(--typo-title-font-size));
        font-weight: normal;
        font-family: 
          // 'Russo One', 
          // 'Exo',
          // 'Urbanist',
          // 'Orbitron',
          // 'Indie Flower',
          'Amatic SC',
          'Oswald', 
          sans-serif;
        

        .char {
          display: inline-block;
        }
      }
      .subtitle {
        font-size: 2rem;
        font-family: 'Courier New', sans-serif;
      }
    }
  }

}

@media screen and (max-width: 480px) {
  .crow-pin {
    .crow-loading {
      .crow-image {
        width: 64px;
        height: 64px;
      }
      .title-area {
        .title {
          font-size: calc(1.5 * var(--typo-title-font-size));
        }
        .subtitle {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>