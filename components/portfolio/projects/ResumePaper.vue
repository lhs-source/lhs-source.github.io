<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import dayjs from 'dayjs';

// 타입 정의
interface Project {
  name: string;
  period: string;
  technologies: string[];
  description: string[];
  responsibilities?: string[];
  pageId?: string; // Link to portfolio page
}


// 자기소개 데이터
const keywordData = ref([
  {
    title: '오너십',
    description: '주인의식을 갖고 일합니다. 모든 면에서 완성도가 높은 제품을 만들어서 사용자가 좋은 경험을 가져가는 것을 목표로 합니다. 이를 위해 필요한 업무라면 영역을 가리지 않고 협업합니다. 제거해야할 방해요소가 있거나 좋은 아이디어가 있을 때 성장을 위해 적극적으로 목소리를 냅니다.'
  },
  {
    title: '신뢰',
    description: '업무를 빠르고 정확하게 수행하는 믿고 맡길 수 있는 동료입니다. 신뢰할 수 있는 동료가 되기 위해서 변명하지 않고 부족한 점을 빠르게 인정합니다. 팀이 좋은 방향으로 나아갈 수 있도록 적극적으로 동료들과 피드백을 주고받고 투명하게 업무를 처리하는 문화를 주도합니다.'
  },
  {
    title: '커뮤니케이션',
    description: '대화가 잘 통합니다. 코딩만 하는 개발자가 아니라 비즈니스를 이해하여 넓은 시선으로 제품을 바라봅니다. 이러한 지식을 기반으로 여러 직군의 동료들과 소통하면서 일합니다. 정확한 메시지로 오해 없는 커뮤니케이션을 하는 것이 저의 강점입니다.'
  },
  {
    title: '효율성',
    description: '우선순위를 정하여 선택과 집중합니다. 비효율적인 프로세스를 개선하고 업무를 간소화시키기 위해 노력합니다. 불필요한 요소들을 찾아 제거하고 생산성을 높이기 위한 좋은 방법을 제안합니다.',
  }
]);

// 기술 스택 아이콘 매핑
const getTechIcon = (techName: string): string | null => {
  const iconMap: Record<string, string> = {
    'Vue3': 'Vue.js_Logo_2.svg',
    'Vue': 'Vue.js_Logo_2.svg',
    'TypeScript': 'icons8-타이프스크립트.svg',
    'C++': 'ISO_C++_Logo.svg',
    'C/C++': 'ISO_C++_Logo.svg',
    'Java': 'java-4-logo-svgrepo-com.svg',
    'Android Kotlin': 'kotlin-svgrepo-com.svg',
    'Kotlin': 'kotlin-svgrepo-com.svg',
    'React': 'react-svgrepo-com.svg',
    'ReactNative': 'react-svgrepo-com.svg',
    'AWS': 'aws-svgrepo-com.svg',
    'Github Actions': 'githubactions-svgrepo-com.svg',
    'Datadog': 'datadog-svgrepo-com.svg',
    'Git': 'git-svgrepo-com.svg',
    'Storybook': 'storybook-icon-svgrepo-com.svg',
    'Atlassian': 'atlassian-svgrepo-com.svg',
    'Figma': 'figma-svgrepo-com.svg',
    'Vite': 'Vitejs-logo.svg',
    'Webview': 'google-webview-devtools-svgrepo-com.svg',
    'TailwindCSS': 'tailwind-svgrepo-com.svg',
    'Tailwind': 'tailwind-svgrepo-com.svg',
    'i18n': 'i18n.svg',
    'Java Card OS': 'sim-card-chip-svgrepo-com.svg',
    'JavaCard': 'sim-card-chip-svgrepo-com.svg',
    'VanilaJS': 'js-svgrepo-com.svg',
    'VanillaJS': 'js-svgrepo-com.svg',
    'EJS': 'ejs-svgrepo-com.svg',
    'Angular': 'angular-svgrepo-com.svg',
    'Docker': 'docker-svgrepo-com.svg',
    'ExpressJS': 'expressjs.svg',
    'Express': 'expressjs.svg',
    'NativeScript': 'nativescript.svg',
    'MFC': 'Microsoft_Foundation_Class_logo.svg',
  };
  return iconMap[techName] ? `/assets/portfolio/tools/${iconMap[techName]}` : null;
};

// 기술 스택 데이터
const techStackData = ref([
  { name: 'Vue3', isMain: true, icon: getTechIcon('Vue3') },
  { name: 'TypeScript', isMain: false, icon: getTechIcon('TypeScript') },
  { name: 'C++', isMain: false, icon: getTechIcon('C++') },
  { name: 'Java', isMain: false, icon: getTechIcon('Java') },
  { name: 'Android Kotlin', isMain: false, icon: getTechIcon('Android Kotlin') },
  { name: 'React', isMain: false, icon: getTechIcon('React') },
  { name: 'AWS', isMain: false, icon: getTechIcon('AWS') },
  { name: 'Github Actions', isMain: false, icon: getTechIcon('Github Actions') },
  { name: 'Datadog', isMain: false, icon: getTechIcon('Datadog') },
  { name: 'Git', isMain: false, icon: getTechIcon('Git') },
  { name: 'Storybook', isMain: false, icon: getTechIcon('Storybook') },
  { name: 'Atlassian', isMain: false, icon: getTechIcon('Atlassian') },
  { name: 'Figma', isMain: false, icon: getTechIcon('Figma') },
]);

// 경력 데이터
const careerData = ref([
  {
    company: '주식회사 리코',
    logo: '/assets/portfolio/reco_logo.png',
    description: '폐기물 매니지먼트 클라우드 서비스 기업',
    period: '2021년 1월 ~ 재직중',
    duration: '약 4년 8개월',
    position: '프론트엔드 개발자',
    projects: [
      {
        name: '업박스 클라우드 개발',
        pageId: 'upbox2',
        period: '2021년 1월 ~ 진행중',
        technologies: [
          'Vite',
          'Vue3',
          'Android Kotlin',
          'Webview',
          'Github Actions',
          'AWS',
          'TailwindCSS',
          'i18n',
          'Storybook'
        ],
        description: ['폐기물 처리 과정의 모든 데이터를 투명하게 관리하는 클라우드 서비스.'],
        responsibilities: [
          '프론트엔드 리드로서 1.0부터 현재 2.15.0까지 핵심 멤버로 참여',
          'TypeScript, Vue3 등 기술 스택 의사결정',
          '권한 기반 데이터 관리, 지도 기반 수거 일정 시스템 등 핵심 기능 개발',
          '안드로이드 Kotlin 네이티브 개발 및 WebView 연동',
          'UDS(Upbox Design System) 기반의 컴포넌트 및 레이아웃 설계 및 구현',
          'i18n 도입 및 tailwindcss 도입으로 디자인 통일성 강화',
          '데이터독 도입 및 Github Actions CICD 구축',
        ]
      },
      {
        name: '업박스 홈페이지 제작',
        pageId: 'reco',
        period: '2021년 1월 ~ 상시 진행',
        technologies: ['VanilaJS', 'EJS', 'AWS'],
        description: ['회사의 정보가 담긴 리코 홈페이지와 제품 측면에서 인바운드에 초점 맞춘 업박스 홈페이지를 유지보수했습니다.'],
        responsibilities: [
          '각 홈페이지를 유지보수하고, 인바운드 측정을 위해 마케팅팀과 협업하여 데이터를 수집'
        ]
      }
    ]
  },
  {
    company: '주식회사 뱅크비',
    logo: '/assets/portfolio/bankbee_logo.png',
    description: '스크래핑 전문 핀테크 기업',
    period: '2017년 1월 ~ 2020년 12월',
    duration: '약 4년',
    position: 'C++ 개발자',
    projects: [
      {
        name: '뱅크비 - 베트남 통합계좌관리',
        pageId: 'bankb',
        period: '2019년 9월 ~ 2020년 12월',
        technologies: ['C/C++'],
        description: ['베트남 은행을 자동으로 연결해주고 입출금내역을 조회하여 계좌를 한눈에 볼 수 있는 모바일 어플리케이션.'],
        responsibilities: [
          '은행을 연결하고 내역을 조회하는 스크래핑 모듈을 담당하고(C/C++), 모바일 앱은 베트남 현지 협력사에서 개발',
          '크로스 플랫폼 CMAKE 빌드 구성',
          '2019년 10월 직접 베트남에 가서 현지 직원과 업무를 같이 진행',
          '베트남 은행에서 제공하는 데이터를 크롤링하여 계좌 정보와 이체 기능을 제공',
          '기존 C 코드를 Modern C++로 리팩터링'
        ]
      },
      {
        name: 'Omnidoc - 문서발급 솔루션',
        pageId: 'omnidoc',
        period: '2019년 4월 ~ 2020년 12월',
        technologies: ['C/C++'],
        description: ['17여개의 민원사이트에서 40여개의 민원문서를 발급할 수 있는 솔루션.'],
        responsibilities: [
          '금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등의 사이트 스크래핑 담당'
        ]
      },
      // {
      //   name: '오픈망 직승인 프로젝트',
      //   period: '2018년 8월 ~ 2019년 3월',
      //   technologies: ['SpringBoot', 'JPA'],
      //   description: ['VAN사를 통하지 않고 가맹점과 카드사 간의 E2E 보안을 위한 클라우드 POS 서비스입니다.'],
      //   responsibilities: [
      //     '카드사와의 승인 및 매입 관련 프로세스를 테스트하기 위한 더미카드사 서버를 제작 (Spring boot, JPA, MySQL)',
      //     'VAN사에서 제공하는 가맹점 관리, 결제내역 조회 등의 기능을 직접 구현',
      //   ]
      // },
      {
        name: '하나1QPay NFC 결제모듈',
        pageId: 'hana',
        period: '2017년 6월 ~ 2018년 8월',
        technologies: ['Java', 'C/C++'],
        description: ['하나카드 1QPay 앱에 탑재되는 NFC 모듈로 지불카드의 token화 보안 서비스와, HCE 스펙을 따라 NFC 결제 통신을 제공합니다.'],
        responsibilities: [
          'VISA token 발급 및 EMV 카드 결제 스펙을 이해하여 NFC 결제 모듈을 유지보수 (Android java, JNI)',
          '보안 모듈인 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 컴파일하여 SharedObject의 분석 방지 (C++)',
          '라이브러리를 JNI로 연동하여 제공'
        ]
      },
      {
        name: 'TaSIM - 대형가맹점 직승인',
        pageId: 'tasim',
        period: '2017년 1월 ~ 2017년 6월',
        technologies: ['Java Card OS', 'MFC'],
        description: ['카드사와 가맹점 사이의 E2E 암호화를 수행하는 임베디드 카드 암호화 모듈입니다.'],
        responsibilities: [
          'JavaCOS 에 Applet 유지보수 및 탑재하여 가맹점의 카드 리더 단말기에 장착',
          'Applet 설치용 MFC UI 제작'
        ]
      }
    ]
  }
]);

// 프리랜서 프로젝트 데이터
const freelanceData = ref([
  {
    name: 'MGX 모바일 게임 시세조회',
    pageId: 'freelance',
    period: '2021년 1월 ~ 2021년 3월',
    technologies: ['ReactNative'],
    description: ['리니지m, 리니지2m, 바람의나라 등 모바일 게임의 시세조회, 시세추이, 거래소 아이템 검색 등을 제공하는 어플리케이션.'],
    responsibilities: [
      '어플리케이션 제작 담당',
      '구글 로그인을 위한 Firebase 연동 및 카카오 로그인 연동'
    ]
  },
  {
    name: 'KlookPay - KlookPay POC',
    pageId: 'freelance',
    period: '2020년 9월 ~ 2020년 11월',
    technologies: ['Angular', 'NativeScript', 'ExpressJS', 'Docker'],
    description: ['KB카드에서 진행하는 KlookPay 프로젝트의 POC 어플리케이션.'],
    responsibilities: [
      'KB카드와 협업하여 안드로이드 앱 기술지원을 진행 (Nativescript-ng)',
      '기존 Angular 개인프로젝트로 진행했던 경험을 바탕으로 현재 버전의 Angular에 맞는 스터디를 다시 진행하고, 어플리케이션 제작',
      '자체 일정관리를 위한 개인 JIRA를 사용하여 프로젝트 진행을 관리'
    ]
  }
]);

// 발표 및 컨퍼런스 데이터
const presentationData = ref([
  {
    title: '데이터독 Datadog Live Seoul 2024 발표',
    event: 'Datadog Live Seoul 2024 - 웨이스트 매니지먼트 스타트업 프론트엔드 개발자의 Datadog을 활용한 효율적인 모니터링 시스템 구축기',
    period: '2024년 9월',
    description: ['O2O 환경의 리코 특성을 살려 데이터독을 에러 분석과 사용성 측정 면에서 활용한 경험을 공유했습니다.'],
    topics: [
      '에러 대응: HEIC 파일 형식 에러 해결, 대시보드 구성, 알림 시스템',
      '데이터 기반 의사결정: 패치 시간 변경, OS 비율 분석',
      '사용성 측정: Custom Action 활용, Funnel 전환율 측정'
    ],
    link: 'https://tech.e3view.com/content/files/2024/10/--------------------------------------------------------------------------------------.pdf',
    eventLink: 'https://www.datadoghq.com/ko/event/datadogliveseoul2024/#speakers',
    pageId: 'datadog'
  }
]);

const emit = defineEmits(['select-project']);

const onProjectClick = (pageId?: string) => {
  if (pageId) {
    emit('select-project', pageId);
  }
};

// Career Timeline Logic
const timelineContainer = ref<HTMLElement | null>(null);
const timelineDots = ref<(HTMLElement | null)[]>([]);
const svgPath = ref('');
const timelineSvgWidth = ref(1000);
const timelineSvgHeight = ref(300);

// Get year from period string
const getYear = (period: string): string => {
  const match = period.match(/(\d{4})년/);
  return match ? match[1] : '';
};

// Calculate duration from period string
const calculateDuration = (period: string): string => {
  const startMatch = period.match(/(\d{4})년\s*(\d{1,2})월/);
  if (!startMatch) return '';

  const startYear = parseInt(startMatch[1]);
  const startMonth = parseInt(startMatch[2]) - 1; // dayjs month is 0-indexed

  let endYear: number, endMonth: number;

  if (period.includes('재직중') || period.includes('진행중')) {
    const now = dayjs();
    endYear = now.year();
    endMonth = now.month();
  } else {
    const endMatches = period.matchAll(/(\d{4})년\s*(\d{1,2})월/g);
    const matchesArray = Array.from(endMatches);
    if (matchesArray.length < 2) return '';
    const endDate = matchesArray[1];
    endYear = parseInt(endDate[1]);
    endMonth = parseInt(endDate[2]) - 1;
  }

  const start = dayjs().year(startYear).month(startMonth).date(1);
  const end = dayjs().year(endYear).month(endMonth).date(1);

  const years = end.diff(start, 'year');
  const months = end.diff(start.add(years, 'year'), 'month');

  if (years === 0) {
    return `약 ${months}개월`;
  } else if (months === 0) {
    return `약 ${years}년`;
  } else {
    return `약 ${years}년 ${months}개월`;
  }
};

// Sort career data by year (newest first)
const sortedCareerData = computed(() => {
  return [...careerData.value].sort((a, b) => {
    const yearA = parseInt(getYear(a.period));
    const yearB = parseInt(getYear(b.period));
    return yearB - yearA; // Reverse order: newest first
  });
});

// Ref callback to collect dots
const setDotRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    timelineDots.value[index] = el;
  }
};

const updateTimelinePath = () => {
  const dots = timelineDots.value.filter(dot => dot !== null) as HTMLElement[];
  if (!timelineContainer.value || dots.length < 2) return;

  const containerRect = timelineContainer.value.getBoundingClientRect();

  // SVG 크기를 컨테이너 크기와 일치시킴
  timelineSvgWidth.value = containerRect.width;
  timelineSvgHeight.value = containerRect.height;

  let path = '';

  for (let i = 0; i < dots.length - 1; i++) {
    const dot1 = dots[i].getBoundingClientRect();
    const dot2 = dots[i + 1].getBoundingClientRect();

    const x1 = dot1.left + dot1.width / 2 - containerRect.left;
    const y1 = dot1.top + dot1.height / 2 - containerRect.top;
    const x2 = dot2.left + dot2.width / 2 - containerRect.left;
    const y2 = dot2.top + dot2.height / 2 - containerRect.top;

    // Calculate control point for curved line (alternate left and right)
    const midX = (x1 + x2) / 2;
    const cpY = (y1 + y2) / 2;
    // Alternate curve direction: even index curves left, odd index curves right
    const curveOffset = 40; // Reduced from 80 for gentler curve
    const cpX = i % 2 === 0 ? midX - curveOffset : midX + curveOffset;

    if (i === 0) {
      path += `M ${x1} ${y1}`;
    }
    path += ` Q ${cpX} ${cpY} ${x2} ${y2}`;
  }

  svgPath.value = path;
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  nextTick(() => {
    // Initialize dots array size (current + career items)
    const totalDots = sortedCareerData.value.length + 1; // current + career items
    timelineDots.value = new Array(totalDots).fill(null);

    // Wait for DOM to update
    setTimeout(() => {
      updateTimelinePath();

      if (timelineContainer.value) {
        resizeObserver = new ResizeObserver(() => {
          updateTimelinePath();
        });
        resizeObserver.observe(timelineContainer.value);
      }
      window.addEventListener('resize', updateTimelinePath);
    }, 100);
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', updateTimelinePath);
});
</script>

<template>
  <div class="resume-background">
    <div class="resume-container">
      <!-- Header Section with Profile -->
      <header class="resume-header">
        <div class="profile-section">
          <div class="profile-content">
            <div class="profile-main">
              <div class="name-title-wrapper">
                <h1 class="name">이현수</h1>
                <span class="title">프론트엔드 개발자</span>
              </div>
              <p class="description">
                스타트업 초기 멤버로서의 경험을 바탕으로 무신사 프론트엔드팀에서 글로벌 패션 플랫폼의 성장과 혁신에 기여하겠습니다.
              </p>
            </div>
            <div class="contact-info">
              <div class="contact-item">
                <span class="label">Email</span>
                <a href="mailto:iddms5446@gmail.com" class="value">iddms5446@gmail.com</a>
              </div>
              <div class="contact-item">
                <span class="label">GitHub</span>
                <a href="https://github.com/lhs-source" target="_blank" class="value">github.com/lhs-source</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 자기소개 Section -->
      <section class="section">
        <h2 class="section-title">일하는 방식</h2>

        <div class="subsection">
          <div class="keywords-grid">
            <div v-for="keyword in keywordData" :key="keyword.title" class="keyword-item">
              <h4 class="keyword-title">{{ keyword.title }}</h4>
              <p class="keyword-description">{{ keyword.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 기술 스택 Section -->
      <section class="section">
        <h2 class="section-title">기술 스택</h2>

        <div class="tech-stack-grid">
          <div v-for="tech in techStackData" :key="tech.name" class="tech-item-grid"
            :class="{ 'main-tech': tech.isMain }">
            <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </section>

      <!-- 경력 Section -->
      <section class="section">
        <h2 class="section-title">경력 (총 {{ dayjs().diff(dayjs("2017-01-01"), 'year') }}년 {{
          dayjs().diff(dayjs("2021-01-01"), 'month') % 12 }}개월)</h2>

        <div class="career-timeline-wrapper" ref="timelineContainer">
          <svg class="timeline-svg" :viewBox="`0 0 ${timelineSvgWidth} ${timelineSvgHeight}`"
            preserveAspectRatio="none">
            <path :d="svgPath" fill="none" />
          </svg>

          <!-- Current Point -->
          <div class="career-timeline-item dot-row">
            <div class="timeline-left">
              <div class="year-box year-box-current">
                {{ new Date().getFullYear() }}
              </div>
            </div>
            <div class="timeline-center">
              <div class="timeline-dot" :ref="(el) => setDotRef(el as HTMLElement, 0)"></div>
            </div>
            <div class="timeline-right">
              <div class="year-box year-box-current mobile-year-box">
                {{ new Date().getFullYear() }}
              </div>
            </div>
          </div>

          <!-- Career Items -->
          <template v-for="(career, index) in sortedCareerData" :key="career.company">
            <!-- Content Row (between previous dot and current dot) -->
            <div class="career-timeline-item content-row">
              <div class="timeline-left"></div>
              <div class="timeline-center"></div>
              <div class="timeline-right">
                <div class="timeline-content">
                  <div class="company-info-wrapper">
                    <img v-if="career.logo" :src="career.logo" :alt="career.company" class="company-logo-timeline" />
                    <div class="company-text-wrapper">
                      <div class="company-name">{{ career.company }}</div>
                      <div v-if="career.period" class="company-period">{{ career.period }} ({{
                        calculateDuration(career.period) }})</div>
                      <div v-if="career.description" class="company-description">
                        {{ career.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dot Row with Year -->
            <div class="career-timeline-item dot-row">
              <div class="timeline-left">
                <div class="year-box" :class="`year-box-${index + 1}`">
                  {{ getYear(career.period) }}
                </div>
              </div>
              <div class="timeline-center">
                <div class="timeline-dot" :ref="(el) => setDotRef(el as HTMLElement, index + 1)"></div>
              </div>
              <div class="timeline-right">
                <div class="year-box mobile-year-box" :class="`year-box-${index + 1}`">
                  {{ getYear(career.period) }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 각 회사별 상세 경력 -->
        <div v-for="career in careerData" :key="career.company" class="company-detail">
          <div class="company-header">
            <div class="company-header-top">
              <img v-if="career.logo" :src="career.logo" :alt="career.company" class="company-logo" />
              <h3 class="company-name">{{ career.company }}</h3>
            </div>
            <div class="company-info">
              <span class="position">{{ career.position }}</span>
              <span class="duration">{{ career.period }} ({{ calculateDuration(career.period) }})</span>
            </div>
          </div>

          <!-- 프로젝트별 상세 (카드형) -->
          <!-- 프로젝트별 상세 (카드형) -->
          <div class="projects-grid">
            <div v-for="project in career.projects" :key="project.name" class="project-card"
              :class="{ 'clickable': !!project.pageId }" @click="onProjectClick(project.pageId)">
              <div class="project-card-header">
                <div class="header-top">
                  <h4 class="project-name">{{ project.name }}</h4>
                  <svg v-if="project.pageId" class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <span class="project-period">{{ project.period }}</span>
              </div>

              <div class="project-tech-list">
                <div v-for="tech in project.technologies" :key="tech" class="project-tech-icon" :title="tech">
                  <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)!" :alt="tech" class="tech-icon-img" />
                  <span v-else class="tech-icon-fallback">{{ tech }}</span>
                  <div class="tech-tooltip">{{ tech }}</div>
                </div>
              </div>

              <div class="project-description-wrapper">
                <p v-for="description in project.description" :key="description" class="project-description">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 발표 및 컨퍼런스 Section -->
      <section class="section">
        <h2 class="section-title">발표 & 컨퍼런스</h2>

        <div class="presentations">
          <div v-for="presentation in presentationData" :key="presentation.title" class="presentation-item"
            :class="{ 'clickable': !!presentation.pageId }" @click="onProjectClick(presentation.pageId)">
            <div class="presentation-header">
              <div class="presentation-header-top">
                <div class="presentation-title-wrapper">
                  <img v-if="presentation.pageId === 'datadog'" :src="getTechIcon('Datadog')!" alt="Datadog"
                    class="presentation-icon" />
                  <h3 class="presentation-name">{{ presentation.title }}</h3>
                </div>
                <svg v-if="presentation.pageId" class="arrow-icon" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="presentation-meta">
                <span class="presentation-period white-space-nowrap">{{ presentation.period }}</span>
                <span class="presentation-event">{{ presentation.event }}</span>
              </div>
            </div>

            <div>
              <p v-for="description in presentation.description" :key="description" class="presentation-description">
                {{ description }}
              </p>
            </div>

            <div class="presentation-topics">
              <h4 class="topics-title">주요 내용</h4>
              <ul class="topics-list">
                <li v-for="topic in presentation.topics" :key="topic" class="topic-item">
                  {{ topic }}
                </li>
              </ul>
            </div>

            <div class="presentation-links">
              <div v-if="presentation.link" class="presentation-link">
                <a :href="presentation.link" target="_blank" class="link">
                  발표 자료 보기 →
                </a>
              </div>
              <div v-if="presentation.eventLink" class="presentation-link">
                <a :href="presentation.eventLink" target="_blank" class="link event-link">
                  컨퍼런스 소개 보기 →
                </a>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>

      <!-- 프리랜서 프로젝트 Section -->
      <section class="section">
        <h2 class="section-title">기타 프로젝트</h2>

        <div class="projects-grid">
          <div v-for="project in freelanceData" :key="project.name" class="project-card"
            :class="{ 'clickable': !!project.pageId }" @click="onProjectClick(project.pageId)">
            <div class="project-card-header">
              <div class="header-top">
                <h4 class="project-name">{{ project.name }}</h4>
                <svg v-if="project.pageId" class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span class="project-period">{{ project.period }}</span>
            </div>

            <div class="project-tech-list">
              <div v-for="tech in project.technologies" :key="tech" class="project-tech-icon" :title="tech">
                <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)!" :alt="tech" class="tech-icon-img" />
                <span v-else class="tech-icon-fallback">{{ tech }}</span>
                <div class="tech-tooltip">{{ tech }}</div>
              </div>
            </div>

            <div class="project-description-wrapper">
              <p v-for="description in project.description" :key="description" class="project-description">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

.resume-background {
  min-height: 120vh;
  // background: white;
  width: 100%;
}

.resume-container {
  // max-width: 1000px; // Removed max-width constraint
  width: 100%;
  margin: 0 auto;
  padding-bottom: 240px;
  // background: white;
  color: #666;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
}

/* Header Section */
.resume-header {
  margin-bottom: 60px;
  padding: 0 24px;

  .profile-section {
    padding-top: 120px; // Top spacing
    padding-bottom: 20px;
    border-bottom: 1px solid #eee; // Subtle divider if needed, or remove

    .profile-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 40px;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
      }
    }

    .profile-main {
      flex: 1;

      .name-title-wrapper {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;

        .name {
          font-size: 36px;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #555;
          letter-spacing: -0.02em;
        }
      }

      .description {
        font-size: 14px;
        color: #444;
        line-height: 1.6;
        max-width: 600px;
        word-break: keep-all;
        margin: 0;
      }
    }

    .contact-info {
      text-align: right;
      font-size: 13px;

      @media (max-width: 768px) {
        text-align: left;
      }

      .contact-item {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        .label {
          font-weight: 700;
          color: #333;
          min-width: 50px;
        }

        .value {
          color: #555;
          text-decoration: none;
          transition: color 0.2s;

          &:hover {
            color: #1a1a1a;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

/* Common Styles */
.section {
  padding: 0 24px; // Added padding
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 48px 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #666;
}

.subsection-title {
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin: 0 0 15px 0;
}

.content-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 12px 0 8px 0;
}

.content-description {
  color: #555;
  margin: 0 0 4px 0;
  font-size: 13px;
}

.content-list {
  margin: 0;
  padding-left: 18px;

  .content-item {
    position: relative;
    padding-left: 12px;
    margin-bottom: 6px;
    color: #555;
    font-size: 13px;

    &:last-child {
      margin-bottom: 0;
    }


    &::before {
      content: '·';
      position: absolute;
      left: -4px;
      color: #666;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.item-header {
  margin-bottom: 12px;
}

.item-name {
  border-left: 3px solid #666;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-left: -16px;
  padding-left: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 6px;
    bottom: 4px;
    width: 3px;
    background: #666;
  }
}

/* Keywords Grid */
.keywords-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .keyword-item {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;

    @media (max-width: 720px) {
      padding: 16px;
    }

    .keyword-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;

      @media (max-width: 720px) {
        font-size: 15px;
      }
    }

    .keyword-description {
      font-size: 13px;
      color: #666;
      line-height: 1.5;

      @media (max-width: 720px) {
        font-size: 12px;
        line-height: 1.6;
      }
    }
  }
}

/* Tech Stack Grid */
.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .tech-item-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: #f0f0f0;
    padding: 8px;
    border-radius: 6px;
    min-height: 60px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    @media (max-width: 720px) {
      padding: 6px;
      padding-top: 8px;
      padding-bottom: 8px;
      min-height: 50px;
      gap: 3px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .tech-icon {
      width: 30px;
      height: 30px;
      object-fit: contain;
      flex-shrink: 0;

      @media (max-width: 720px) {
        width: 24px;
        height: 24px;
      }
    }

    .tech-name {
      font-size: 12px;
      color: #555;
      text-align: center;
      font-weight: 500;
      line-height: 1.4;
      word-break: keep-all;

      @media (max-width: 720px) {
        font-size: 12px;
        line-height: 1.2;
      }
    }

    &.main-tech {
      background: #333;

      .tech-name {
        color: white;
        font-weight: 600;
      }
    }
  }
}

/* Career Timeline */
.career-timeline-wrapper {
  position: relative;
  padding: 20px 0;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;

  @media (max-width: 720px) {
    align-items: center;
    padding-left: 0;
    margin-left: 5vw;
    width: 100%;
    max-width: calc(100% - 5vw);
  }

  .timeline-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
    z-index: 0;

    @media (max-width: 720px) {
      left: 0; // 왼쪽 간격 제거
    }

    path {
      stroke: #666;
      stroke-width: 1.5;
    }
  }

  .career-timeline-item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    position: relative;
    z-index: 1;

    @media (max-width: 720px) {
      grid-template-columns: auto 1fr;
      align-items: flex-start;
      margin-left: 0;
      width: 100%;
      max-width: 100%;
    }

    &.dot-row {
      margin-bottom: 0;

      @media (max-width: 720px) {
        grid-template-columns: auto 1fr;
      }
    }

    &.content-row {
      // margin-bottom: 20px;
      align-items: flex-start;
      padding-top: 5px;
      padding-bottom: 5px;

      @media (max-width: 720px) {
        grid-template-columns: auto 1fr;
        margin-top: 16px;
        margin-bottom: 16px;
      }
    }

    .timeline-left {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 40px;

      @media (max-width: 720px) {
        display: none;
      }
    }

    .timeline-center {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;

      @media (max-width: 720px) {
        justify-content: flex-start;
        align-items: flex-start;
        padding-right: 16px;
        padding-top: 4px;
        width: 18px; // dot width와 동일하게 고정
        flex-shrink: 0;
        // dot의 중심이 9px 위치에 오도록 조정
        margin-left: 0;
      }
    }

    .timeline-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 40px;

      @media (max-width: 720px) {
        padding-left: 36px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        flex: 1;
      }
    }

    .timeline-dot {
      width: 18px;
      height: 18px;
      background: #f9f9f9;
      border: 2px solid #666;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
      z-index: 3;

      @media (max-width: 720px) {
        // dot가 SVG 선의 중앙에 오도록 조정
        margin-left: 0;
        margin-right: 0;
      }
    }

    .year-box {
      padding: 8px 20px;
      border-radius: 8px;
      font-weight: 600;
      color: #333;
      font-size: 18px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      border: 1px solid #e0e0e0;
      white-space: nowrap;
      background-color: #f9f9f9;

      // PC 화면에서 오른쪽 연도 숨김
      &.mobile-year-box {
        display: none;
      }

      @media (max-width: 720px) {
        display: none;

        &.mobile-year-box {
          display: block;
          font-size: 14px;
          padding: 6px 12px;
        }
      }
    }

    // Custom colors for year boxes (matching page tone)
    .year-box-current {
      background-color: #f0f0f0;
      border-color: #666;
    }

    .year-box-1 {
      background-color: #f5f5f5;
    }

    .year-box-2 {
      background-color: #f0f0f0;
    }

    .year-box-3 {
      background-color: #f5f5f5;
    }

    .year-box-4 {
      background-color: #f0f0f0;
    }

    .timeline-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      max-width: 400px;
      padding: 0;

      @media (max-width: 720px) {
        max-width: none;
        width: 100%;
      }

      .company-info-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        @media (max-width: 720px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
      }

      .company-logo-timeline {
        width: 32px;
        height: 32px;
        object-fit: contain;
        flex-shrink: 0;
      }

      .company-text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        flex: 1;
      }

      .company-name {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        text-transform: uppercase;
        margin-bottom: 2px;
      }

      .company-period {
        color: #888;
        font-size: 12px;
        margin-bottom: 4px;
      }

      .company-description {
        color: #666;
        font-size: 13px;
        line-height: 1.5;
        word-break: keep-all;
      }
    }
  }
}

/* Company Detail */
.company-detail {
  margin-bottom: 60px;

  .company-header {
    margin-bottom: 30px;

    .company-header-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .company-logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .company-name {
      font-size: 22px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .company-info {
      display: flex;
      gap: 15px;
      font-size: 14px;
      color: #666;

      .position {
        font-weight: 500;
        color: #333;
      }

      @media (max-width: 720px) {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
}

/* Projects */
/* Projects Grid - Modern & Clean */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  &.main-project {
    border: 2px solid #333;
    background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

    .project-name {
      color: #1a1a1a;
      font-size: 18px;
      font-weight: 800;
    }

    &.clickable:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
      border-color: #333;
    }
  }

  &.clickable {
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
      border-color: #333;

      .arrow-icon {
        opacity: 1;
        animation: arrow-move 1.5s ease-in-out infinite;
      }
    }
  }

  .project-card-header {
    margin-bottom: 16px;

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6px;

      .project-name {
        font-size: 17px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
        line-height: 1.3;
      }

      .arrow-icon {
        color: #999;
        opacity: 0.7;
        transition: all 0.3s ease;
        flex-shrink: 0;
        margin-left: 8px;
        animation: arrow-move 1.5s ease-in-out infinite;
      }
    }

    .project-period {
      font-size: 13px;
      color: #888;
      font-weight: 400;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;

    .project-tech-icon {
      position: relative;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .tech-icon-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.2s ease;
      }

      .tech-icon-fallback {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #f3f4f6;
        color: #4b5563;
        font-size: 8px;
        font-weight: 500;
        text-align: center;
        padding: 2px;
        line-height: 1.2;
        word-break: break-all;
      }

      .tech-tooltip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 1000;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #333;
        }
      }

      &:hover {
        .tech-icon-img {
          transform: scale(1.1);
        }

        .tech-tooltip {
          opacity: 1;
        }
      }
    }
  }

  .project-description-wrapper {
    // margin-top: auto; // Push to bottom if needed, or just flow

    .project-description {
      font-size: 14px;
      color: #4a4a4a;
      line-height: 1.6;
      margin: 0;

      // 3줄 말줄임 for better context
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}


/* Responsibility Categories */
.section-divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.responsibility-categories {
  margin-top: 20px;

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;

    .category-card {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;

      .category-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;

        .category-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
      }

      .category-items {
        padding-left: 16px;
        margin: 0;

        .category-item {
          font-size: 12px;
          color: #555;
          margin-bottom: 4px;
          line-height: 1.4;
        }
      }
    }
  }
}

/* Problem Solving Section */
.problem-solving-section {
  margin-top: 20px;

  .problem-solving-categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;

    .problem-category-card {
      background: #f0f4f8; // Slightly different background
      padding: 15px;
      border-radius: 8px;

      .problem-category-header {
        margin-bottom: 10px;

        .problem-category-title {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
        }
      }

      .problem-category-items {
        padding-left: 16px;
        margin: 0;

        .problem-category-item {
          font-size: 12px;
          color: #555;
          margin-bottom: 4px;
          line-height: 1.4;
        }
      }
    }
  }
}

/* Presentations */
.presentations {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  .presentation-item {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &.clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        border-color: #333;
      }
    }

    .presentation-header {
      margin-bottom: 15px;

      .presentation-header-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5px;
      }

      .presentation-title-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;

        @media (max-width: 720px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
      }

      .presentation-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
        flex-shrink: 0;
      }

      .presentation-name {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
        line-height: 1.3;
      }

      .arrow-icon {
        color: #999;
        opacity: 0.7;
        transition: all 0.3s ease;
        flex-shrink: 0;
        margin-left: 8px;
        animation: arrow-move 1.5s ease-in-out infinite;
      }

      .presentation-meta {
        font-size: 13px;
        color: #888;
        display: flex;
        gap: 10px;

        .presentation-period {
          white-space: nowrap;
        }

        @media (max-width: 720px) {
          flex-direction: column;
          gap: 5px;
        }
      }
    }

    .presentation-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 15px;
    }

    .presentation-topics {
      margin-bottom: 15px;

      .topics-title {
        font-size: 13px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .topics-list {
        padding-left: 18px;

        .topic-item {
          font-size: 13px;
          color: #555;
          margin-bottom: 3px;
        }
      }
    }

    .presentation-links {
      display: flex;
      gap: 15px;
      margin-top: auto;

      .link {
        font-size: 13px;
        color: #2196f3;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }

        &.event-link {
          color: #9c27b0;
        }
      }
    }
  }
}

/* Freelance Projects */
.freelance-projects {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .freelance-item {
    .project-header {
      margin-bottom: 10px;

      .project-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .project-meta {
        font-size: 13px;
        color: #888;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .project-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .project-tech-chip {
          padding: 3px 8px;
          border-radius: 999px;
          background: #f0f0f0;
          color: #555;
          font-size: 12px;
        }
      }
    }

    .project-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
    }

    .project-responsibilities {
      .responsibilities-title {
        font-size: 13px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .responsibilities-list {
        padding-left: 18px;

        .responsibility-item {
          font-size: 13px;
          color: #555;
          margin-bottom: 3px;
        }
      }
    }
  }
}

@keyframes arrow-move {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(6px);
  }
}
</style>
