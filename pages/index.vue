<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import Crow3D from './Crow3D.vue';
import ScrollingText from '@/components/ScrollingText.vue';
import FloatingText from './FloatingText.vue';

const router = useRouter();

interface TitleMenu {
  title: string;
  path: string;
  content: string;
}

const titleMenu = ref<TitleMenu[]>([
  { title: '포트폴리오', path: 'portfolio', content: '본격적인 포트폴리오?' },
  { title: '스도쿠', path: 'sudoku', content: '스도쿠 게임입니다. 플레이해보세요!' },
  { title: '스터디', path: 'study', content: '공부한 내용을 테스트해보는 공간' },
  { title: '포스트', path: 'blog', content: '블로그 포스트 목록. 지금까지 쌓아온 지식공간' },
  { title: '공복 타이머', path: 'fasting-timer', content: '공복 타이머 체크용' },
  { title: '마비m도우미', path: 'https://moma-zeta.vercel.app/', content: '마비노기 모바일 도우미' },
  { title: '앵커3', path: '#', content: '앵커3' },
  { title: '앵커4', path: '#', content: '앵커4' }
]);

function onClickMenu(menu: TitleMenu) {
  if (menu.path.startsWith('http')) {
    window.open(menu.path, '_blank');
    return;
  }
  router.push(menu.path);
}

// (미래에 활용할 수 있도록 메시지 업데이트 함수 유지)
const message = ref('Hello, world!');
function updateMessage() {
  message.value = 'Updated message!';
}
</script>

<template>
  <div class="index-wrapper p-8 min-h-screen mx-auto max-w-7xl my-24">
    <!-- Post Title Section -->
    <section class="post-title-section">
      <div class="barcode mt-8">
        <div class="barcode-font self-end text-right text-3xl">
          WELCOME TO LEE HYUNSOO FRONTEND AREA
        </div>
      </div>
    </section>

    <!-- Title Section -->
    <section class="title-section relative w-full mt-2 pt-2 pb-4">
      <div class="title-separate grid">
        <div class="github-link p-4">
          <a href="https://github.com/lhs-source/lhs-source.github.io" target="_blank">
            <img
              class="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
            />
          </a>
        </div>
        <div class="title-area flex justify-center">
          <div class="title-text">
            <h1 class="text-6xl font-bold m-0 text-center leading-none">
              History of Lee Hyunsoo
            </h1>
            <h2 class="text-2xl font-bold m-0 text-right leading-tight">
              프론트엔드
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Inter-band Section -->
    <section class="inter-band text-sm">
      <div class="flex justify-between">
        <span><b>{{ dayjs().format("YYYY년 MM월 DD일 ddd") }}</b></span>
        <span><u>https://lhs-source.github.io/</u></span>
        <span>편집자 : 이현수</span>
        <span>제 {{ dayjs().diff(dayjs("1995-09-21"), 'day') }} 호</span>
      </div>
    </section>

    <!-- Menu Section -->
    <section class="menu-section mt-2 pt-2 pb-4 grid gap-2">
      <div
        v-for="menu in titleMenu"
        :key="menu.path"
        class="title-menu cursor-pointer select-none"
        @click="onClickMenu(menu)"
      >
        <div class="title-menu-title text-base font-bold">{{ menu.title }}</div>
        <div class="title-menu-content text-xs">{{ menu.content }}</div>
      </div>
    </section>

    <!-- Headline Section -->
    <section class="headline-section mt-2">
      <div class="flex gap-6">
        <article class="hor-part flex-2">
          <h1 class="text-4xl font-bold mb-2">
            이현수, 사지멀쩡하고 멘탈 정상인 개발자로 밝혀져
          </h1>
          <div class="separator bg-stone-700 w-full h-0 gradient-to-t from-stone-700 to-stone-500"></div>
          <div class="headline">
            <div class="content">
              <img src="/assets/img/far.say_a_cartoon_illustration-style_digital_illustration_of_a__eddf7032-0b3d-4704-931a-1d678fe608d2.png" alt="Blackbird" />
              <div class="content-description columns-2 mt-2">
                개발자라는 단어는 단순한 직업 명칭이 아니라, 기술과 사고방식, 그리고 책임에 대한 철학을 담고 있다. 우리는 흔히 코더(Coder), 엔지니어(Engineer), 개발자(Developer), 오너(Owner) 같은 단어로 우리 자신을 규정하려 하지만, 이 단어들은 그저 역할을 설명하는 표면적인 개념일 뿐, 실제로는 우리가 기술과 세상을 어떻게 바라보는지에 대한 가치관을 내포한다.
                개발자는 단순히 코드 몇 줄을 짜는 사람이 아니다. 우리는 각기 다른 역할을 하면서도, 기술을 통해 세상을 변화시키려 한다. 우리는 코드의 기능뿐 아니라, 그것이 사용자에게 어떤 영향을 미치는지 고민하는 사람들이다. 우리가 코드 한 줄을 작성할 때마다, 그것이 단순한 프로그램을 넘어, 사람들의 경험과 삶을 바꿀 수 있다는 사실을 잊지 말아야 한다.
              </div>
            </div>
          </div>
        </article>

        <aside class="hor-part flex-1">
          <h2 class="text-xl font-bold">까마귀를 좋아하는 사람</h2>
          <div class="headline gap-4">
            <div class="content">
              <div class="content-description">
                사방을 헤매고 다니며 세상을 얕본 자여! 자만심으로 가득 차 데미안의 사상에 기댄자여! 우리들 마음속에 모든 것을 알고 모든 것을 원하고 모든 것을 우리 자신들보다 더 잘 해내는 누군가가 있음을 깨달으면 도움이 될 거야. 새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 깨뜨려야 한다. 새는 신에게 날아간다. 신의 이름은 아브락사스다.
              </div>
            </div>
            <div class="border-t-2 border-stone-700 mt-2 pt-2">
              <img src="/assets/img/main-qimg-9593454d6def03281102ffde42777271-lq.jpeg" alt="Crow image" />
              <blockquote class="px-4">
                <p>CROW : 아 저거 까마귀인가?</p>
                <p>RAVEN : 아 저거 독수리인가?</p>
              </blockquote>
            </div>
            <div class="relative flex justify-center">
              <img 
                class="absolute top-0 left-0"
                src="/assets/img/diqalurima_A_black_and_white_photograph_of_two_men_in_suits_sta_52f3902c-c70f-4573-97ee-ae31b3726996.png" 
                alt="Crow image" />
              <div class="crow-box border border-red-600 mt-2 p-2 overflow-hidden relative border-8 flex items-center justify-center h-32  mix-blend-difference">
                <div class="text-7xl font-bold w-full text-center text-stone-100">CROW</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div>
        <div class="highlight border border-stone-700 mt-2 p-2 overflow-hidden relative">
          <div class="text-3xl">CODER</div>
          <div class="text-5xl">ENGINEER</div>
          <div class="text-7xl">DEVELOPER</div>
          <div class="text-9xl">OWNER</div>
        </div>
        <div class="grid grid-cols-4 gap-4 pb-8 mt-2">
          <div class="relative">
            <strong>코더(Coder)</strong>는 코드를 작성하는 사람이다. 이들은 주어진 문제를 해결하는 기계적인 해결책을 만들지만, 단순히 작동하는 코드가 목표다. 설계와 최적화는 주요 관심사가 아닐 수 있다. 그저 “이 코드가 돌아가는가?”라는 질문에 답하는 것에 집중한다.
            <div class="absolute right-0 -bottom-10">
              <div class="text-4xl">코더</div>
              <div class="text-2xl">CODER</div>
            </div>
          </div>
          <div class="relative">
            <strong>엔지니어(Engineer)</strong>는 코드가 어떻게 동작하는지를 깊이 고민하는 사람이다. 단순한 기능 구현을 넘어, 성능과 확장성, 유지보수성을 고려한다. 코드가 효율적으로 실행되도록 설계하고, 더 나은 알고리즘과 시스템 아키텍처를 고민하며, "어떻게 하면 이 코드를 더 잘 작동하게 만들 수 있을까?"라는 질문을 던진다.
            <div class="absolute right-0 -bottom-10">
              <div class="text-4xl">엔지니어</div>
              <div class="text-2xl">ENGINEER</div>
            </div>
          </div>
          <div class="relative">
            <strong>개발자(Developer)</strong>는 사용자의 경험과 문제 해결을 고민하는 사람이다. 그들이 만든 기능이 단순히 동작하는 것을 넘어서, 사람들에게 어떤 영향을 미칠지 생각한다. 기술을 단순한 도구로 보는 것이 아니라, 세상을 더 나은 방향으로 변화시키는 수단으로 활용한다. 개발자의 질문은 "이 기능이 사용자에게 어떤 가치를 줄 수 있는가?"다.
            <div class="absolute right-0 -bottom-10">
              <div class="text-4xl">개발자</div>
              <div class="text-2xl">DEVELOPER</div>
            </div>
          </div>
          <div class="relative">
            <strong>오너(Owner)</strong>는 자신이 만든 제품과 기능에 대해 진정한 책임감을 가지는 사람이다. 코드 한 줄, 기능 하나하나에 자부심을 느끼며, 단순한 구현을 넘어 제품의 성장과 발전까지 고려한다. "이것은 내가 만든 것이다."라는 태도로, 제품이 더 나아지도록 끊임없이 고민하고 개선하는 사람이다.
            <div class="absolute right-0 -bottom-10">
              <div class="text-4xl">오너</div>
              <div class="text-2xl">OWNER</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scrolling and 3D Components -->
    <section class="mt-16">
      <ScrollingText />
      <Crow3D />
      <ScrollingText direction="right" />
    </section>

    <div class="">
      <h2 class="text-2xl my-4">데이터독 User Journey 세션 발표</h2>
      <img 
        src="/assets/img/weiwei202309_A_highly_detailed_black_and_white_line_art_illustr_38e30c76-aff2-4d4f-af5c-8a0295897408.png"
        style="width: 100%; height: 360px; object-fit: cover; object-position: 50% 30%;"/>
      <div class="columns-2">
        데이터독 Observabiliity Day 행사에서 User Journey 세션의 마지막 차례 발표를 진행했다. 데이터독을 짧은시간 활용하며 얻은 경험을 공유하고, 데이터독의 무궁무진한 활용성에 대해 설명했다. 
        O2O 환경의 리코 특성을 살려서, 데이터독을 에러 분석과 사용성 측정 면에서 어떻게 활용했는지를 중점적으로 설명한다. 이론 뿐 아닌 실제 사례를 들어서 데이터독을 도입하려는 사람들 혹은 이미 사용중인 유저들에게 좋은 아이디어가 되었을 것이다.
        세션을 들은 시청자들이 발표를 잘 들었다며 소식을 전해받고 있다.
      </div>
    </div>

    <FloatingText />

    <!-- Career Section -->
    <section class="career-wrapper mt-16">
      <div class="career-entry border border-stone-700 p-4">
        <div class="company-info relative">
          <img 
            class="w-1/2" 
            src="https://mblogthumb-phinf.pstatic.net/MjAyMzAzMDZfMTEx/MDAxNjc4MDY4MTU1Njgw.bwJ5w_8LvSd5ZQZ4mk4_xFxKLOtelp9OXLFQdxRGKr0g.dD2tY9-7YRGeB7xXEzqGzNiHtwt30wEjsS55kbGB3Ggg.JPEG.monthlypeople/%EB%A6%AC%EC%BD%94_%EA%B9%80%EA%B7%BC%ED%98%B8_%EB%8C%80%ED%91%9C.jpg?type=w800" 
            alt="리코 이미지" />
          <img 
            class="absolute left-60 top-0"
            src="https://cdn.jebowang.com/news/photo/202111/4427_12628_5145.png" 
            alt="리코 로고" />
          <div class="absolute left-[60%] right-0 top-80">
            <h3 class="text-xl">2021.01.04 ~ {{ dayjs().format('YYYY.MM.DD') }} ({{ dayjs().diff(dayjs('2021-01-04'), 'year') }}년 {{ dayjs().diff(dayjs('2021-01-04'), 'month') % 12 }}달 {{ dayjs().diff(dayjs('2021-01-04'), 'day') % 30 }}일)</h3>
            <h2 class="text-4xl font-bold">리코</h2>
            <p class=" columns-3">
              This post is based on an interview with June Hunter, a Vancouver-based photographer whose art features crows, ravens, and many other birds of the West Coast.
              In this post, we're going to boost your bird identification skills and compare common ravens (Corvus corax) with common crows (Corvus brachyrhynchos). We'll go over how you can tell the difference between these two black birds and what makes each bird uniquely wonderful.
              <img class="p-2" src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" alt="리코 이미지" />
            </p>
          </div>
        </div>
        <div class="what-did-i">
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <img 
                class="p-8 px-20"
                src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" 
                alt="리코 이미지" />
              <h3 class="text-xl">업박스 클라우드</h3>
              <p>업박스 클라우드 프론트엔드 개발. 업박스 1.0, 업박스 2.0. 안드로이드 네이티브앱에 웹뷰를 활용. </p>
            </div>
            <div class="">
              <img 
                class="p-8 px-20"
                src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" 
                alt="새로운 이미지" />
              <h3 class="text-xl">업박스 홈페이지</h3>
              <p>업박스 홈페이지 유지보수 및 개편. 서버리스를 위해 Google Sheet 로 데이터 관리. Next 로 CMS 구현. Firebase Firestore, Google OAuth. Summernote 제작자와 함께 포팅 작업 진행.</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>Vue</div>
          <div>Typescript</div>
          <div>Android</div>
          <div>AWS</div>
          <div>Datadog</div>
          <div>Figma</div>
          <div>Attlasian</div>
          <div>Github</div>
        </div>
      </div>
      <div class="career-entry mt-4">
        <div class="company-info columns-3">
          <h3 class="text-xl">
            2017.01.02 ~ 
            {{ dayjs('2020-12-31').format('YYYY.MM.DD') }} 
            ({{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'year') }}년 {{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'month') % 12 }}달 {{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'day') % 30 }}일)
          </h3>
          <h2 class="text-4xl font-bold">뱅크비</h2>
          <p>
            This post is based on an interview with June Hunter, 
            a Vancouver-based photographer whose art features crows, ravens, and many other birds of the West Coast.
            In this post, we're going to boost your bird identification skills and compare common ravens (Corvus corax) with common crows (Corvus brachyrhynchos). We'll go over how you can tell the difference between these two black birds and what makes each bird uniquely wonderful.
          </p>
          <img 
            class="shape-img"
            src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" 
            alt="뱅크비 로고" />
          <p>
            For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.
            For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.
            While crows around the world are similar, the size and vocalizations of crows in Europe, Africa and Asia are not identical to those of American crows.
            
          </p>
          <p class="l">
            For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.
            For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.
          </p>
          
        </div>
        <div class="what-did-i">
          <div class="grid grid-cols-3 gap-4">
            <div class="">
              <img 
                class="p-4"
                src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" 
                alt="리코 이미지" />
              <h3 class="text-xl">하나카드 앱카드 Whitebox 난독화 모듈</h3>
              <p>업박스 클라우드 프론트엔드 개발. 업박스 1.0, 업박스 2.0. 안드로이드 네이티브앱에 웹뷰를 활용. </p>
            </div>
            <div class="">
              <img 
                class="p-4"
                src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" 
                alt="새로운 이미지" />
              <h3 class="text-xl">OmniDoc, Bankbe 스크래핑 모듈</h3>
              <p>업박스 홈페이지 유지보수 및 개편. 서버리스를 위해 Google Sheet 로 데이터 관리. Next 로 CMS 구현. Firebase Firestore, Google OAuth. Summernote 제작자와 함께 포팅 작업 진행.</p>
            </div>
            <div class="">
              <img 
                class="p-4"
                src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" 
                alt="새로운 이미지" />
              <h3 class="text-xl">TaSIM e2e 암호화</h3>
              <p>업박스 홈페이지 유지보수 및 개편. 서버리스를 위해 Google Sheet 로 데이터 관리. Next 로 CMS 구현. Firebase Firestore, Google OAuth. Summernote 제작자와 함께 포팅 작업 진행.</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>C++</div>
          <div>LLVM</div>
          <div>Android</div>
          <div>AWS</div>
          <div>Lua</div>
          <div>Attlasian</div>
          <div>Gitlab</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');

.index-wrapper {
  width: 1024px;
  color: #1f1f14;
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  white-space: pre-line;
  word-break: break-all;

  // 종이 질감
  background-repeat: repeat;
  // background: 
  //   linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)),
  //   url('/assets/istockphoto-2150372507-640x640.jpg');
  // background-size: 640px 640px;
  // background-image: url('/assets/360_F_381715276_L0tr2gyGeRnBwQguZUL73aWEBUtHCWtN.jpg');
  // background-size: 360px 360px;
  
  
  // background-size: 512px 512px;
  // background: 
  //   linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)),
  //   url('/assets/0090b-512x512.webp');
  
  background: 
    linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)),
    url('/assets/gray-dirty-paperboard_95678-93.avif');
  background-size: 626px 443px;

}

/* Barcode font styling */
.barcode-font {
  font-family: 'Libre Barcode 128 Text', cursive;
}

/* Title Section */
.title-section {
  border-top: 1px solid #3d3d29;
  font-family: 'Marcellus', serif;
  font-weight: 700;
  letter-spacing: 2px;

  .title-separate {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
  }
}

/* Inter-band Section */
.inter-band {
  border-top: 2px solid #3d3d29;
  border-bottom: 1px solid #3d3d29;
}

/* Menu Section */
.menu-section {
  border-bottom: 1px solid #999966;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

/* Flex utility classes */
.flex-2 {
  flex: 2;
}
.flex-1 {
  flex: 1;
}

.shape-img {
  width: 680px;
  height: auto;
  float: right;
  shape-outside: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  position: relative;
  margin-left: -140px;
  transform: translateX(184px) scale(1.3);
}

.l {
  &::before {
    content: '';
    display: block;
    clear: both;
    float: left;
    shape-outside: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    width: 220px;
    height: 130px;
  }
}

/* (추가로 필요한 섹션별 스타일을 여기서 정의) */
</style>
