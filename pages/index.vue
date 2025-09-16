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
  if (menu.path.startsWith('https://')) {
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

    <section class="mt-16">
      <div class="flex gap-4">
        <div class="">
          <img 
            src="/assets/img/datadog.png"
            style="width: 100%; object-fit: cover; object-position: 50% 30%;"/>
          <div class="flex flex-col justify-center items-center my-8">
            <div>
              <h2 class="text-3xl text-bold">
                데이터독 User Journey 세션 발표
              </h2>
              <p class="text-sm text-right">Datadog Korea Observability Day 2024</p>
            </div>
          </div>
          <div class="columns-2 mt-2">
            데이터독 Observabiliity Day 행사에서 User Journey 세션의 마지막 차례 발표를 진행했다. 데이터독을 짧은시간 활용하며 얻은 경험을 공유하고, 데이터독의 무궁무진한 활용성에 대해 설명했다. 
            O2O 환경의 리코 특성을 살려서, 데이터독을 에러 분석과 사용성 측정 면에서 어떻게 활용했는지를 중점적으로 설명한다. 이론 뿐 아닌 실제 사례를 들어서 데이터독을 도입하려는 사람들 혹은 이미 사용중인 유저들에게 좋은 아이디어가 되었을 것이다.
            세션을 들은 시청자들이 발표를 잘 들었다며 소식을 전해받고 있다. <a href="https://tech.e3view.com/datadog-live-seoul-2024-balpyojaryo/" target="_blank">발표 자료</a>
            <h3 class="text-lg font-bold"> 1. 에러 대응 </h3>
            <p>
              안드로이드 앱에서 이미지 업로드 시 HEIC 파일 형식으로 인해 발생하는 에러를 Datadog LOG로 확인하고 해결하는 과정을 설명. 버전 업데이트 후 캐시 문제로 인해 지속적으로 발생하는 에러를 해결한 사례. 
              대시보드: 지속적인 모니터링이 필요한 케이스들을 대시보드에 모아 한 번에 볼 수 있도록 구성했습니다.
              리포트 되지 않은 에러 확인: 사용자가 리포트하지 않은 에러까지 사전에 확인하여 대응합니다.
              알림: 외부 서비스의 가용성이 중요한 경우, 담당자에게 맨션과 링크를 포함한 알림을 전송합니다.
              로그 인덱싱 제외: 불필요한 로그는 소스 코드 수정 없이 Datadog에서 필터링하여 인덱싱에서 제외합니다.
            </p>
            <h3 class="text-lg font-bold">2. 데이터 기반 의사결정 </h3>
            <p>
              패치 시간 변경: 시간대별 사용량 데이터 분석을 통해 기존 오후 3시였던 패치 시간을 오전 11시로 변경했습니다.
              OS 비율 확인: 드라이버의 iOS 사용 비율이 일정 수준 이상으로 올라가면 iOS 앱 제공을 고려하고, 고객의 경우 Windows 사용 비율이 압도적이므로 웹 스타일 지원이 필요함을 확인했습니다.
            </p>
            <h3 class="text-lg font-bold">3. 사용성 측정 및 대시보드 구성 </h3>
            <p>
              검색 기능: Custom Action을 사용하여 검색 필터 영역의 노출 고정 여부를 결정하고, Funnel 전환율을 확인하여 사용성을 측정합니다.
              데이터 등록 시간 파악: 데이터 등록 시간을 단축하는 것을 목표로, 등록 과정의 현 상황을 측정하고 대시보드화하여 개선점을 찾습니다.
              커스텀 메트릭으로 인덱싱: 장기적인 지표 추적을 위해 Custom Metric을 사용합니다.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-4 min-w-[100px]">
          <div class="w-full">
            <img src="/assets/img/datadog_1.png" class="w-full"/>
            <h5>에러 대응 케이스</h5>
          </div>
          <div class="w-full">
            <img src="/assets/img/datadog_2.png" class="w-full"/>
            <h5>데이터 기반 의사결정</h5>
          </div>
          <div class="w-full">
            <img src="/assets/img/datadog_3.png" class="w-full"/>
            <h5>사용성 측정 및 대시보드</h5>
          </div>
        </div>
      </div>
    </section>

    <FloatingText />

    <!-- Career Section -->
    <section class="career-wrapper mt-32">
      <div class="career-entry p-4">
        <div class="company-info relative">
          <div class="w-1/2 absolute -right-10">
            <img 
              class="w-full" 
              src="/assets/img/upboxbox.png" 
              alt="리코 이미지" />
            <!-- <img 
              class="w-full" 
              src="/assets/img/upboxbox_multi.png" 
              alt="리코 이미지" /> -->
          </div>
          <img 
            style="filter: drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.7));"
            class="absolute left-0 top-0"
            src="https://cdn.jebowang.com/news/photo/202111/4427_12628_5145.png" 
            alt="리코 로고" />
          <div class="w-1/2 pt-[320px] pl-10">
            <h3 class="text-xl">
              2021.01.04 ~ 
              {{ dayjs().format('YYYY.MM.DD') }} 
              ({{ dayjs().diff(dayjs('2021-01-04'), 'year') }}년 
              {{ dayjs().diff(dayjs('2021-01-04'), 'month') % 12 }}달 
              {{ dayjs().diff(dayjs('2021-01-04'), 'day') % 30 }}일)
            </h3>
            <h2 class="text-4xl font-bold">리코</h2>
            <p class=" columns-2">
              리코는 대한민국 폐기물 시장을 혁신하는 환경 스타트업입니다. 수집운반 토탈 서비스 '업박스(UpBox)' 서비스를 기반으로 빠르게 성장하는 스타트업 입니다.
              리코는 시리즈 A / B / 브릿지 투자 유치에 이어 2025년 시리즈C 투자 유치에 성공하여 총 885억원의 투자를 유치하였고, 매출액 기준 매년 100% 이상 고성장을 이뤄내고 있는 환경 스타트업입니다.
              현재 5,000여개 이상의 고객사를 보유하고 있으며, B마트, 맥도날드, 스타벅스 등의 고객에게 압도적인 품질의 폐기물 수거서비스를 제공하고 있습니다.

              [UpBox는 맞춤형 폐기물 수집운반 토탈 서비스를 제공합니다.]
              '어떤 폐기물이든 하나의 서비스로' 맞춤형 폐기물 수집운반 토탈 서비스 UpBox는 자체 폐기물 관리 소프트웨어를 통해 폐기물을 편리하게, 깨끗하게 정확하게 처리하여 기존에 만날 수 없었던 최고의 폐기물 수거서비스를 제공합니다.
              UpBox 고객은 배출한 폐기물의 양과 탄소 배출량 등의 환경 기여 지표들을 실시간으로 확인할 수 있습니다.

              <!-- 배출 환경 개선부터 자원순환까지 최적의 폐기물 솔루션을 제공합니다.
              폐기물 배출 환경 개선. 양질의 폐자원을 생성하고 사업장 폐기물 배출 시설을 쾌적하게 관리할 수 있도록 폐기물 배출 환경을 개선합니다.
              폐기물 수거 운반. 배출량을 측정 한 뒤 GPS가 탑재 된 업박스 전용 트럭으로 폐기물을 운반하기 때문에 폐기물의 이동 경로를 추적할 수 있습니다.
              관리 업무 자동화. 폐기물 관리 자동화를 돕는 전용 소프트웨어(웹/ 앱)를 제공합니다. 배출량 데이터 모니터링부터 실시간 요금 확인, 폐기물 신고 서류 등 제반 업무를 소프트웨어 상에서 간편하게 관리할 수 있어 업무시간을 단축할 수 있습니다.
              자원순환. 폐기물이 다시 자원으로 쓰일 수 있도록 자원순환 캠페인을 기획하고 운영합니다. 음식물부터 플라스틱까지 다양한 폐기물을 수거해 재질별로 분리한 뒤 업사이클링합니다. -->
              <img 
                class="p-2" 
                src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" 
                alt="리코 이미지" />
            </p>
          </div>
        </div>
        <div class="what-did-i mt-10">
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <!-- <img 
                class="p-8 px-20"
                src="https://lh4.googleusercontent.com/proxy/FzctGmacmVXJ0QYGfEnnZTFtBIUxZAh1ZjmVM1H1Z83lyJAp-ujEkZQTkDxyqYqXIEHwJlxHU-ScmLCWAvCpHf1329YKxmc7MSIN0lDiFCUlmHavGQyh_KCj9rOr" 
                alt="리코 이미지" /> -->
              <div class="bg-stone-300 w-full h-[240px]">image</div>
              <h3 class="text-xl">업박스 클라우드</h3>
              <p>업박스 클라우드 프론트엔드 개발. 업박스 1.0, 업박스 2.0. 안드로이드 네이티브앱에 웹뷰를 활용. </p>
            </div>
            <div class="">
              <div class="bg-stone-300 w-full h-[240px]">image</div>
              <h3 class="text-xl">업박스 홈페이지</h3>
              <p>업박스 홈페이지 유지보수 및 개편. 서버리스를 위해 Google Sheet 로 데이터 관리. Next 로 CMS 구현. Firebase Firestore, Google OAuth. Summernote 제작자와 함께 포팅 작업 진행.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Honeycomb Skills Section -->
      <div class="honeycomb-skills p-12 flex justify-center">
        <div class="honeycomb-skills-container">
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

      <div class="career-entry mt-24 ">
        <div class="company-info relative  min-h-[640px]">
          <div class="flex-1 w-[120px]">
            <img 
              style="filter: drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.7)); transform: translateX(-80px) rotate(-20deg);"
              class="min-w-[360px] relative -left-10 top-40"
              src="/assets/img/bank_bee.png" 
              alt="뱅크비 로고" />
          </div>
          <div class="columns-2 w-3/4 absolute right-20 top-20 l">
            <h3 class="text-xl">
              2017.01.02 ~ 
              {{ dayjs('2020-12-31').format('YYYY.MM.DD') }} 
              ({{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'year') }}년 
              {{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'month') % 12 }}달 
              {{ dayjs('2020-12-31').diff(dayjs('2017-01-02'), 'day') % 30 }}일)
            </h3>
            <!-- <img 
              class=""
              src="https://static.wixstatic.com/media/030690_c0dbf404c6894e83846454dfbe372c87~mv2.png" 
              alt="뱅크비 로고" /> -->
            <h2 class="text-4xl font-bold">뱅크비</h2>
            <p> 
              뱅크비는 은행, 보험, 증권사 등 금융권에 핵심 트렌드로 자리 잡고 있는 업무 프로세스 개선과 자동화, 하이퍼스크래핑 등 디지털 전환에 필요한 핵심 솔루션과 컨설팅을 제공하고 있다. 
              디지털 전환을 통한 편리함 추구를 위해 보안이나 개인정보보호, 규제사항을 등한시 할 수 있는 업계에서 뱅크비는 ICT서비스를 고객중심으로 편리하게 개선하면서도 보안상으로는 더 안전하게 지켜줄 수 있는 혁신기술과 노하우를 보유하고 있다는 차별성을 갖추고 있다. 
            </p>
            <p> 
              뱅크비는 카카오뱅크의 안전하고 편리한 보안플랫폼 설계와 컨설팅을 수행하면서 우수한 기술력과 노하우를 인정받았고 핀테크 도입과 디지털전환을 필요로 하는 은행, 저축은행, 카드사, 보험사, 증권사 등 다양한 금융기업을 대상으로 자체개발한 솔루션과 서비스 제공을 확대하고 있다.
            </p>
            <p> 
              2016년 11월 기업부설연구소를 설립하고, 2018년 5월 전문연구요원 지정업체로 인정받아 전문 연구인력을 중심으로 한 조직체계를 완성하였으며 연구개발분야 투자를 늘리고 있다.
              주요 제품은 카카오뱅크, 신한카드 등 다수 금융기관의 비대면 업무 처리(고객 평가, 심사, 대출 등)에 적용된 스크래핑 솔루션(OmniDoc/OmniReal), 금융기관의 편리하고 안전한 보안/인증처리를 위한 사설인증 솔루션(OmniCA), 보험사, 카드사 및 핀테크 플랫폼 기업에 적용된 신분증 진위 확인 서비스(OmniCheck) 등이 있으며 국내 전 카드사에 모바일결제/국내 IC카드 결제 규격 수립 관련 컨설팅을 수행함과 동시에 대부분의 카드사에 직승인 관련 공개키 기반 솔루션을 납품했다.  
              금융기업 이외에도 롯데쇼핑, 현대백화점, GS리테일, 신세계백화점, 이마트 등 국내 유통 대기업들의 전국 가맹점에서 발생하는 지급 결제 프로세스를 자체 개발한 지급결제 핀테크 솔루션 TaSIM을 통해 안전하게 지켜주고 있다.
            </p>
          </div>
        </div>
        <div class="what-did-i">
          <div class="grid grid-cols-3 gap-4">
            <div class="">
              <img 
                class=""
                src="https://thesegye.com/news/data/20220425/p1065569090753704_269_thum.jpg" 
                alt="리코 이미지" />
              <h3 class="text-xl">하나카드 앱카드 Whitebox 난독화 모듈</h3>
              <p>
                하나카드 1QPay 앱에 탑재되는 NFC 모듈. 
                지불카드의 token화 보안 서비스와, HCE 스펙을 따라 NFC 결제 통신을 제공.
                VISA token 발급 및 EMV 카드 결제 스펙을 이해하여 NFC 결제 모듈을 유지보수. (Android java, JNI).
                보안 모듈인 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 컴파일하여 SharedObject의 분석 방지. (C++)
                라이브러리 JNI 구성
              </p>
            </div>
            <div class="">
              <img 
                class=""
                src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMTJfNCAg/MDAxNTgzOTkwNzkyMDQx.6kNv4JvbSS_qy0YKQCfcUNH2jwiuOmjsadhACl23ZZYg.D8-hUem8g7SHrpGpcIxad-gA3tE3GgLlxRsVbKQ46Zwg.JPEG.mage7th/flyhi-1024x760.jpg?type=w966" 
                alt="새로운 이미지" />
              <h3 class="text-xl">OmniDoc, Bankbe 스크래핑 모듈</h3>
              <p>
                17여개의 민원사이트에서 40여개의 민원문서를 발급할 수 있는 솔루션. 
                타사의 서비스에 탑재되어 고객의 민간업무를 대행해주는 편리한 서비스 제공. 
                금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등의 사이트를 스크래핑 담당.
              </p>
            </div>
            <div class="">
              <img 
                class=""
                src="https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjFfMjM3/MDAxNzExMDAxNjk1NjA2.-qXL7uT7lgAAG89tsxe2uRphnk41FWWI3IkCiFwdYvAg.NQaevwzuy8NHGPSTlAdJOdrLkyhKlZ1hNMiis9q2OKwg.JPEG/SE-ae704e91-3454-459b-a24b-2bfb1c7dbc52.jpg?type=w800" 
                alt="새로운 이미지" />
              <h3 class="text-xl">TaSIM e2e 암호화</h3>
              <p>
                카드사와 가맹점 사이의 E2E 암호화를 제공하는 TaSIM.
                중간 VAN사의 영향을 받지 않은 채, 가맹점 단말기와 카드사 간의 암호화 제공.
                여신협회 taSIM Application Specification 인증, EMVCo 및 CC(Common Criteria) 인증.
                JavaCOS 에 Applet을 탑재하여 가맹점의 카드 리더 단말기에 장착.
                Java COS의 작동을 이해하고, 해당 제품을 유지보수 및 대응.
                Applet 설치용 MFC UI 제작.
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
        </div>

        <!-- 여기 -->
        <!-- Honeycomb Skills Section -->
        <section class="">
          <div class="honeycomb-skills p-24 flex justify-center">
            <div class="honeycomb-skills-container">
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
    shape-outside: polygon(0% 0%, 25% 0%, 100% 50%, 25% 100%, 0% 100%);
    width: 100px;
    height: 500px;
  }
}
.r {
  &::before {
    content: '';
    display: block;
    clear: both;
    float: right;
    shape-outside: polygon(100% 0%, 75% 0%, 0% 50%, 75% 100%, 100% 100%);
    width: 100px;
    height: 500px;
  }
}


.honeycomb-skills {
  display:flex;
  --s: 100px;  /* size  */
  --m: 4px;    /* margin */
  --f: calc(1.732 * var(--s) + 4 * var(--m)  - 1px);
  .honeycomb-skills-container {
    font-size: 0; /*disable white space between inline block element */

    div {
      width: var(--s);
      margin: var(--m);
      height: calc(var(--s)*1.1547);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: initial;
      clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
      background: rgb(203, 168, 25);
      position: relative;
      margin-bottom: calc(var(--m) - var(--s)*0.2885);
      
      &::before {
        content: '';
        position: absolute;
        z-index: -10;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        width: calc(var(--s) - 4px);
        height: calc(var(--s)*1.1547 - 4px);
        clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
        background: rgb(255, 233, 109);
        box-sizing: border-box;
      }

      &:nth-child(odd)::before {
        background: rgb(250, 215, 19);
      }
    }

    &::before {
      content: "";
      width: calc(var(--s)/2 + var(--m));
      float: left;
      height: 120%;
      shape-outside: repeating-linear-gradient(
                      #0000 0 calc(var(--f) - 3px),
                      #000 0 var(--f));
    }
  }
}


a {
  color: #2b8e61;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 700;
  &::after {
    // link icon
    content: '🔗';
    margin-left: 4px;
    font-size: 12px;
    vertical-align: middle;
  }
}
</style>
