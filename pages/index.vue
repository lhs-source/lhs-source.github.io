<script setup lang="ts">
// Import any necessary dependencies
import { ref } from 'vue';
import dayjs from 'dayjs';
import Crow3D from './Crow3D.vue';
import ScrollingText from '@/components/ScrollingText.vue';

const router = useRouter();
// test

// Define your reactive variables
const message = ref('Hello, world!');

interface TitleMenu {
  title: string;
  path: string;
  content: string;
}
const titleMenu = ref<TitleMenu[]>([
  {title: '포트폴리오', path: 'portfolio', content: '본격적인 포트폴리오?'},
  {title: '스도쿠', path: 'play/sudoku', content: '스도쿠 게임입니다. 플레이해보세요!'},
  {title: '스터디', path: 'study', content: '공부한 내용을 테스트해보는 공간'},
  {title: '포스트', path: 'blog', content: '블로그 포스트 목록. 지금까지 쌓아온 지식공간'},
  {title: '앵커1', path: '#', content: '앵커1'},
  {title: '앵커2', path: '#', content: '앵커2'},
  {title: '앵커3', path: '#', content: '앵커3'},
  {title: '앵커4', path: '#', content: '앵커4'},
]);

function onClickMenu(menu: TitleMenu) {
  router.push(menu.path);
}
// Define your methods
function updateMessage() {
    message.value = 'Updated message!';
}
</script>
<template>
  <div class="index-wrapper p-8 min-h-screen mx-auto max-w-7xl my-24">
    <div class="post-title-section">
      <div class="barcode mt-8">
        <div class="barcode-font self-end text-right text-3xl">
          WELCOME TO LEE HYUNSOO FRONTEND AREA
        </div>
      </div>
    </div>
    <div class="title-section relative w-full mt-2 pt-2 pb-4">
      <div class="title-separate grid">
        <div class="github-link p-4">
          <a 
            href="https://github.com/lhs-source/lhs-source.github.io" 
            target="_blank">
            <img 
              class="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
              alt="github" />
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
    </div>
    <div class="inter-band text-sm">
      <div class="flex justify-between">
        <span><b>{{ dayjs().format("YYYY년 MM월 DD일 ddd") }}</b></span>
        <span><u>https://lhs-source.github.io/</u></span>
        <span>편집자 : 이현수</span>
        <span>제 {{ dayjs().diff(dayjs("1995-09-21"), 'day') }} 호</span>
      </div>
    </div>
    <div class="menu-section mt-2 pt-2 pb-4 grid gap-2">
      <div 
        class="title-menu cursor-pointer select-none" 
        v-for="menu of titleMenu" 
        :key="menu.path"
        @click="onClickMenu(menu)">
        <div class="title-menu-title text-base font-bold">{{ menu.title }}</div>
        <div class="title-menu-content text-xs">{{ menu.content }}</div>
      </div>
    </div>

    <div>
      <ScrollingText />
      <Crow3D />
      <ScrollingText direction="right" />
    </div>
    
    <div class="headline-section">
      <div class="flex gap-6">
        <div class="hor-part" style="flex: 2;">
          <h1 class="text-4xl font-bold">이현수, 사지멀쩡하고 멘탈 정상인 개발자로 밝혀져</h1>
          <div class="bg-stone-700 w-full h-0 gradient-to-t from-stone-700 to-stone-500">
          </div>
          <div class="headline">
            <div class="content">
              <div class="border border-stone-700 mt-2 p-2 overflow-hidden relative">
                <img src="/assets/img/gretcheno_A_red_winged_blackbird_sitting_on_a_dried_cornstalk_i_33de99df-bb91-48c8-b143-3916d1296d17.png" />
                <div class="text-3xl">CODER</div>
                <div class="text-5xl">ENGINEER</div>
                <div class="text-7xl">DEVELOPER</div>
                <div class="text-9xl">OWNER</div>
              </div>
              <!-- <h2 class="content-title">이현수는 까마귀를 좋아한다</h2> -->
              <div class="content-description" style="column-count: 2;">

                개발자를 나타낼 수 있는 다양한 단어들이 있다. 
                Coder 는 그저 코드를 작성하는 사람을 의미한다. 
                Engineer 는 코드를 작성하는 사람이지만, 그 코드가 어떻게 동작하는지, 
                어떻게 최적화할지에 대해 고민하는 사람을 의미한다. 내가 관리하는 기능을 만들어내는 사람이다.
                Developer 는 내가 만든 기능으로 사용자들이 어떤 경험을 하는지, 어떤 문제를 해결해주는지에 대해 고민하는 사람을 의미한다.
                Owner 는 내가 만든 제품에 대해 책임감과 자부심을 가지는 사람을 의미한다.

                <!-- 누구나 이런 위기를 겪는다. 평범한 사람에게 이것은 인생의 분기점이다. 자기 삶의 욕구가 주변 세계와 가장 극심하게 부딛치고, 혼심의 힘을 다해 싸워야만 앞으로 나갈 수 있다. 
                많은 이들이 이때, 전 생애에서 딱 한 번, 죽음과 새로운 탄생을(그러니까 바로 우리의 운명을) 경험한다. 
                정말 많은 사람들이 이러한 막다른 골목에서 빠져나오지 못해서 돌이킬수 없는 과거, 잃어버린 낙원의 꿈에 필사적으로 매달리며 여생을 보낸다. 
                자신의 모든 의지력을 하나의 목표에 모으면 성취해 낼 수 있어. 인간은 짐승보다는 활동 영역이 넓고 관심사가 다양하지만, 역시나 꽤나 좁은 범위에 묶여 있어. 
                우리는 이 세상에 존재하는 전부를 인정하고 존중해야해. 인위적으로 분리한 절반만 인정할 게 아니라. 그저 진리의 아주 작은 한 조각을 탐지했을 뿐이야. 
                게으르고 생각하기 싫어하고 스스로 판단하지 못하는 사람들이 그냥 복종해 버려. 그 편이 쉬우니까. 내면에서 자기만의 법을 느끼는 사람들은 더 어려워. 
                사람은 각자 독자적으로 판단해야 해. 우린 너무 말을 많이 하고 있어. 말분인 이야기는 아무런 가치가 없어. 자기 자신에게서 멀어질 뿐이지. 
                자기 자신한테 멀어진다는 건 죄악이야. 사람은 거북이 처럼 제 안으로 완전히 들어가지 않으면 안돼.  -->
              </div>
            </div>
          </div>
        </div>
        <div class="hor-part" style="flex: 1;">
          <h2 class="text-xl font-bold">까마귀를 좋아하는 사람</h2>
          <div class="headline gap-4">
            <div class="content">
              <!-- <h2 class="content-title">이현수는 까마귀를 좋아한다</h2> -->
              <div class="content-description">
                사방을 헤매고 다니며 세상을 얕본 자여! 자만심으로 가득 차 데미안의 사상에 기댄자여! 우리들 마음속에 모든 것을 알고 모든 것을 원하고 모든 것을 우리 자신들보다 더 잘 해내는 누군가가 있음을 깨달으면 도움이 될 거야. 새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 깨뜨려야 한다. 새는 신에게 날아간다. 신의 이름은 아브락사스다. 
              </div>
            </div>
            <div class="border-t-2 border-stone-700 mt-2 pt-2">
              <img src="/assets/img/main-qimg-9593454d6def03281102ffde42777271-lq.jpeg" />
              <blockquote class="px-4">
                <p>까마귀 : 아 저거 까마귀인가?</p>
                <p>레이븐 : 아 저거 독수리인가?</p>
              </blockquote>
            </div>
            <!-- 빨간색 두꺼운 테두리를 가진 박스 안에 CROW 라는 글자를 가운데 꽉차게 출력 -->
            <div class="border border-red-400 mt-2 p-2 overflow-hidden relative border-8 flex items-center justify-center h-32">
              <div class="text-7xl font-bold w-full text-center">CROW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="who-section">

    </div>
    <div class="skill-section relative mt-4 pt-8">
      <div class="absolute -left-8 h-[500px]">
        <svg width="500" height="500">
          <path
            d="M80,560 L260, -100"
            stroke="#42b883"
            stroke-width="100" />
          <path
            d="M180,560 L340, -20"
            stroke="#35495e"
            stroke-width="100" />
        </svg>
      </div>
      <div class=" pl-[400px]">
        <h2 class="text-4xl font-bold">주 사용 스택</h2>
        <ul>
          <li>Vue3</li>
          <li>Typescript</li>
          <li>Android</li>
        </ul>
        <h2 class="text-4xl font-bold">사용할 가능 스택</h2>
        <ul>
          <li>NextJS</li>
          <li>NuxtJS</li>
          <li>C++</li>
          <li>Python</li>
          <li>Java</li>
        </ul>
        <h2 class="text-4xl font-bold">유경험</h2>
        <ul>
          <li>lua</li>
          <li>Angular</li>
        </ul>
        <h2 class="text-4xl font-bold">도구</h2>
        <ul>
          <li>Git/Github</li>
          <li>VSCode</li>
          <li>Atlassian</li>
          <li>Datadog</li>
          <li>Obsidian</li>
          <li>Notion</li>
        </ul>
      </div>
    </div>
    <div class="career-wrapper mt-4">
      <div class="border border-stone-700 p-4">
        <div class="company-info columns-3">
          <img 
            src="https://cdn.jebowang.com/news/photo/202111/4427_12628_5145.png" />
          <h2 class="text-4xl font-bold">리코</h2>
          This post is based on an interview with June Hunter, a Vancouver-based photographer whose art features crows, ravens, and many other birds of the West Coast.
          In this post, we're going to boost your bird identification skills and compare common ravens (Corvus corax) with common crows (Corvus brachyrhynchos). We'll go over how you can tell the difference between these two black birds and what makes each bird uniquely wonderful.
          <img
            class="p-2"
            src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" />
          For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.

        </div>
        <div class="what-did-i">
          <h3 class="text-2xl font-bold">내가 한 것들</h3>
          <ul>
            <li>업박스 1.0 > 프론트 개발(vue2)</li>
            <li>업박스 2.0 > 프론트 개발(vue3)</li>
            <li>업박스 1.0 > 안드로이드 개발</li>
            <li>업박스 2.0 > 안드로이드 개발</li>
            <li>업박스 홈페이지</li>
            <li>업박스 관리페이지</li>
            <li>리코 홈페이지</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="company-info columns-3 mt-4">
          <img src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" />
          <h2 class="text-xl">뱅크비</h2>
          This post is based on an interview with June Hunter, a Vancouver-based photographer whose art features crows, ravens, and many other birds of the West Coast.
          In this post, we're going to boost your bird identification skills and compare common ravens (Corvus corax) with common crows (Corvus brachyrhynchos). We'll go over how you can tell the difference between these two black birds and what makes each bird uniquely wonderful.
          For simplicity, we'll compare the American crow to the common raven in this post. While crows around the world are similar, the size and vocalizations of crows in Europe, the Middle East, Africa and Asia are not identical to those of American crows.
        </div>
        <div class="what-did-i">
          <h3 class="text-2xl font-bold">내가 한 것들</h3>
          <ul>
            <li>하나카드 앱카드 앱 > WhiteBox 모듈 난독화</li>
            <li>TaSIM > e2e 암호화 칩 개발 및 설치지원</li>
            <li>OmniDoc > 스크래핑 모듈 개발</li>
            <li>Bankbe > 베트남 은행사 스크래핑</li>
          </ul>
        </div>
      </div>
    </div>
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
  background-color:#ebebe0;
  width: 1024px;
  color: #1f1f14;
  font-family: 
    'Noto Serif KR',
    'Noto Serif',
    sans-serif;
  white-space: pre-line;
  word-break: break-all;
}
.barcode-font {
  font-family: 'Libre Barcode 128 Text', cursive;
}
.title-section {
  border-top: 1px solid #3d3d29;

  font-family: "Marcellus", serif;
  font-weight: 700;
  font-style: normal;

  letter-spacing: 2px;
  
  .title-separate {
    grid-template-columns: 1fr 5fr 1fr;
  }
}
.inter-band {
  border-top: 2px solid #3d3d29;
  border-bottom: 1px solid #3d3d29;
}
.menu-section {
  border-bottom: 1px solid #999966;
  grid-template-columns: repeat(4, 1fr);
}
.headline-section {
}
.headline {
}
</style>