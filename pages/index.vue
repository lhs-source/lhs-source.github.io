<script setup lang="ts">
// Import any necessary dependencies
import { ref } from 'vue';
import dayjs from 'dayjs';

const router = useRouter();

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
  <div class="index-wrapper p-8 min-h-screen">
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
              이현수
            </h1>
            <h2 class="text-2xl font-normal m-0 text-right leading-tight">
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
    <div class="headline-section">
      <div class="flex gap-6">
        <div class="hor-part grow-[2]" style="flex: 2;">
          <h1 class="text-3xl font-bold">이현수, 사지멀쩡하고 멘탈 정상인 개발자로 밝혀져</h1>
          <div class="headline">
            <div class="content">
              <!-- <h2 class="content-title">이현수는 까마귀를 좋아한다</h2> -->
              <div class="content-description" style="column-count: 2;">
                누구나 이런 위기를 겪는다. 평범한 사람에게 이것은 인생의 분기점이다. 자기 삶의 욕구가 주변 세계와 가장 극심하게 부딛치고, 혼심의 힘을 다해 싸워야만 앞으로 나갈 수 있다. 많은 이들이 이때, 전 생애에서 딱 한 번, 죽음과 새로운 탄생을(그러니까 바로 우리의 운명을) 경험한다. 정말 많은 사람들이 이러한 막다른 골목에서 빠져나오지 못해서 돌이킬수 없는 과거, 잃어버린 낙원의 꿈에 필사적으로 매달리며 여생을 보낸다. 자신의 모든 의지력을 하나의 목표에 모으면 성취해 낼 수 있어. 인간은 짐승보다는 활동 영역이 넓고 관심사가 다양하지만, 역시나 꽤나 좁은 범위에 묶여 있어. 
                우리는 이 세상에 존재하는 전부를 인정하고 존중해야해. 인위적으로 분리한 절반만 인정할 게 아니라. 그저 진리의 아주 작은 한 조각을 탐지했을 뿐이야. 게으르고 생각하기 싫어하고 스스로 판단하지 못하는 사람들이 그냥 복종해 버려. 그 편이 쉬우니까. 내면에서 자기만의 법을 느끼는 사람들은 더 어려워. 사람은 각자 독자적으로 판단해야 해. 우린 너무 말을 많이 하고 있어. 말분인 이야기는 아무런 가치가 없어. 자기 자신에게서 멀어질 뿐이지. 자기 자신한테 멀어진다는 건 죄악이야. 사람은 거북이 처럼 제 안으로 완전히 들어가지 않으면 안돼. 
              </div>
            </div>
          </div>
        </div>
        <div class="hor-part grow-[2]" style="flex: 1;">
          <h2 class="text-xl font-bold">까마귀를 좋아하는</h2>
          <div class="headline gap-4">
            <img 
              class="w-full object-contain"
              src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/170545871_3943882802359463_1040772229033165132_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kSCwmHTEonIQ7kNvgGDJ8hQ&_nc_ht=scontent-ssn1-1.xx&oh=00_AYDOFngRx61W-TmI8HlAH50M6yRTZoQIIkfO0gdMe359Zw&oe=66913436" />
            <div class="content">
              <!-- <h2 class="content-title">이현수는 까마귀를 좋아한다</h2> -->
              <div class="content-description">
                사방을 헤매고 다니며 세상을 얕본 자여! 자만심으로 가득 차 데미안의 사상에 기댄자여! 우리들 마음속에 모든 것을 알고 모든 것을 원하고 모든 것을 우리 자신들보다 더 잘 해내는 누군가가 있음을 깨달으면 도움이 될 거야. 새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 깨뜨려야 한다. 새는 신에게 날아간다. 신의 이름은 아브락사스다. 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="who-section">

    </div>
    <div class="skill-section">
      <h2>주 사용 스택</h2>
      <ul>
        <li>Vue2 + vue cli + Typescript</li>
        <li>Vue3 + vite + Typescript</li>
        <li>NextJS + Typescript</li>
        <li>C++</li>
      </ul>
      <h2>사용할줄 아는 스택</h2>
      <ul>
        <li>Python</li>
        <li>Java</li>
      </ul>
      <h2>유경험</h2>
      <ul>
        <li>lua</li>
      </ul>
      <h2>도구</h2>
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
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');

.index-wrapper {
  background-color:#ebebe0;
  font-family: 
    'Noto Serif',
    'Noto Serif KR',
    sans-serif;
  white-space: pre-line;
  word-break: break-all;
}
.barcode-font {
  font-family: 'Libre Barcode 128 Text', cursive;
}
.title-section {
  border-top: 1px solid #3d3d29;
}
.title-separate {
  grid-template-columns: 1fr 3fr 1fr;
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
  height: 56vh;
}
</style>