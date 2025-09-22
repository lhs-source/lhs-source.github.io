<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

// 타입 정의
interface ResponsibilityCategory {
  category: string;
  icon: string;
  color: string;
  items: string[];
}

interface Project {
  name: string;
  period: string;
  technologies: string;
  description: string;
  responsibilities?: string[];
  responsibilityCategories?: ResponsibilityCategory[];
}

// 자기소개 데이터
const keywordData = ref([
  {
    title: '오너십',
    description: '주인의식을 갖고 일합니다. 모든 면에서 완성도가 높은 제품을 만들어서 사용자가 좋은 경험을 가져가는 것을 목표로 합니다. 이를 위해 필요한 업무라면 영역을 가리지 않고 협업합니다. 제거해야할 방해요소가 있거나 좋은 아이디어가 있을 때 성장을 위해 적극적으로 목소리를 냅니다.'
  },
  {
    // 부족한 것은 빠르게 인정하고, 잘못된 점은 빠르게
    title: '신뢰',
    description: '업무를 빠르고 정확하게 수행하는 믿고 맡길 수 있는 동료입니다. 신뢰할 수 있는 동료가 되기 위해서 변명하지 않고 부족한 점을 빠르게 인정합니다. 팀이 좋은 방향으로 나아갈 수 있도록 적극적으로 동료들과 피드백을 주고받고 투명하게 업무를 처리하는 문화를 주도합니다.'
  },
  {
    title: '커뮤니케이션',
    description: '대화가 잘 통합니다. 코딩만 하는 개발자가 아니라 비즈니스를 이해하여 넓은 시선으로 제품을 바라봅니다. 이러한 지식을 기반으로 여러 직군의 동료들과 소통하면서 일합니다. 정확한 메시지로 오해 없는 커뮤니케이션을 하는 것이 저의 강점입니다.'
  },
  {
    title: '효율성',
    description: '우선순위를 정하여 선택과 집중합니다. 비효율적인 프로세스를 개선하기 위해 업무를 간소화시키기 위해 노력합니다. 불필요한 요소들을 찾아 제거하고 생산성을 높이기 위한 좋은 방법을 제안합니다.',
  }
]);

// 경력 데이터
const careerData = ref([
  {
    company: '리코',
    period: '2021년 1월 ~ 재직중',
    duration: '약 4년 8개월',
    position: '프론트엔드 개발자',
    // SBI 형태로 재구성 필요
    // situation, behavior, impact 로 재구성 필요
    // 최적화, 해결, 도입, 개선, 효율화 용어를 적극 활용 
    problemSolving: [
      {
        title: '기술 스택 의사결정',
        description: '업박스 클라우드 1.0 에서 Typescript 도입을 적극 추진하여 잠재적 타입 버그 제거. 업박스 클라우드 2.0 개발 착수 시점 기술 분석을 통해 Vue3 로 결정(React 와 비교)'
      },
      {
        title: '구글 심사 시 원하지 않을 때 배포되는 문제',
        description: '관리형 게시를 사용해 원하는 때에 배포하는 간단한 시스템 활용'
      },
      {
        title: '버전 캐시 문제',
        description: '데이터독 도입으로 오동작을 일으키는 케이스가 버전 문제가 대다수임을 확인. 버전 비교를 통해 캐시를 무효화하고 최신 FE 앱을 받을 수 있도록 구현하여 에러 발생 빈도 90프로 가량 제거. 기존 1주일 간 이전 버전을 사용하는 케이스 다수 → 최대 2일 안에 모든 사용자 최신 버전 사용'
      },
      {
        title: '프론트 개발자 사이의 컨벤션이 맞지 않는 문제',
        description: '서로 다른 IDE 사용, 코딩 컨벤션 결정, lint 도입으로 기계의 도움을 받아 누락되는 케이스 제거'
      },
      {
        title: 'css 단일 속성 class 증가 문제',
        description: '빠른 css 속성 적용을 위해 글로벌 단위의 단일 속성 class 를 지속적으로 추가하게 됨. tailwindcss 의 utility class 를 활용하여 직접 정의하는 것보다는 공통된 컨벤션으로 작업할 수 있게 됨'
      }
    ],
    projects: [
      {
        name: '업박스 클라우드 개발 - 폐기물처리 플랫폼',
        period: '2021년 1월 ~ 진행중',
        technologies: 'NodeJS, Vite, Vue3, Android Kotlin, Webview, Github Actions, AWS, TailwindCSS, i18n, Storybook',
        description: '폐기물의 처리 과정에서 발생하는 모든 데이터를 투명하고 정확하게 관리하는 플랫폼입니다. 제공되는 앱의 종류로는 업박스 어드민, 업박스 드라이버, 업박스 커스터머가 있으며, 각각 기사님들의 수거 및 차량 관리, 배출장에서의 수거 일정 및 정보 확인에 사용됩니다. 모든 앱은 담당하는 법인과 역할에 맞춰 권한이 부여되고, 권한별로 메뉴와 기능이 차등 제공됩니다. 초기 음식물류 폐기물 중심에서 현재는 재활용과 폐수오니 등 여러 폐기물 종류를 종합 지원하는 형태로 발전했습니다.',
        responsibilityCategories: [
          {
            category: '프론트엔드 리드',
            icon: '▶',
            color: '#333333',
            items: [
              '업박스 클라우드 FE 개발을 처음부터 현재까지 핵심 멤버로 참여 (1.0 온보딩 → 2.0 론칭 → 현재 2.14.0 버전)',
              '약 3~4주마다 전략 과제 배포를 통한 지속적인 제품 개선 및 기능 확장'
            ]
          },
          {
            category: '핵심 기능 개발',
            icon: '●',
            color: '#555555',
            items: [
              '고객, 계약, 폐기물 처리, 청구 등 업박스 어드민 핵심 기능 개발',
              '복잡한 조건의 데이터 유효성 검증 및 사용자 친화적 입력 프로세스 구현',
              '지도 기반 수거 일정 관리 시스템 - 방문 업장 표시 및 일정 최적화 기능',
              '전자계약, 가상계좌, 자동이체, 채널톡 등 외부 서비스 연동'
            ]
          },
          {
            category: '안드로이드 개발',
            icon: '■',
            color: '#666666',
            items: [
              '안드로이드 Kotlin 네이티브 개발 - 권한 요청, 푸시, 네비게이션, 파일 선택 기능',
              'WebView와 네이티브 간 데이터 연동 - 푸시 알림을 Room DB에 저장 후 웹으로 전달',
              '마케팅 연동을 위한 딥링크 지원'
            ]
          },
          {
            category: '디자인 시스템 구축',
            icon: '◆',
            color: '#777777',
            items: [
              '디자인팀과 협업하여 UDS(Upbox Design System) 설립 및 컴포넌트 가이드화',
              '복잡한 프로덕트 특성에 맞는 유기적 컴포넌트 설계',
              'UDS 규칙을 TailwindCSS에 적용하여 일관된 디자인 시스템 구축'
            ]
          },
          {
            category: 'DevOps & 모니터링',
            icon: '▲',
            color: '#888888',
            items: [
              '데이터독 도입 추진 및 초기 구성 - Sourcemap 업로드 자동화로 에러 추적 시스템 구축',
              '사용량 기반 배포 시간 결정, 사용성 측정을 통한 데이터 기반 의사결정 체계 구축',
              'Github Actions CICD 구축 - 상용서버 CI/CD 분리로 배포 시간 단축 (5분 → 1분 40초)',
              'Storybook, Sourcemap 자동 배포 및 Github 릴리즈 자동 생성으로 롤백 시스템 구축'
            ]
          },
          {
            category: '기술 표준화 & 조직 기여',
            icon: '★',
            color: '#999999',
            items: [
              'i18n 도입으로 용어 통일 및 해외 진출 대비',
              'Atlassian 툴(Jira 자동화) 및 데이터독 사용법 내부 교육 및 공유'
            ]
          }
        ]
      },
      {
        name: '업박스 홈페이지 제작',
        period: '2021년 1월 ~ 상시 진행',
        technologies: 'VanilaJS, EJS, AWS',
        description: '리코는 리코 홈페이지와 업박스 홈페이지 2개를 운영합니다. 리코 홈페이지는 회사의 정보가 담긴 방면 업박스 홈페이지는 제품 측면에서 인바운드에 초점을 맞추었습니다.',
        responsibilities: [
          '각 홈페이지를 유지보수하고, 인바운드 측정을 위해 마케팅팀과 협업하여 데이터를 수집'
        ]
      }
    ]
  },
  {
    company: '뱅크비',
    period: '2017년 1월 ~ 2020년 12월',
    duration: '약 4년',
    position: 'C++ 개발자',
    projects: [
      {
        name: '뱅크비 - 베트남 통합계좌관리 솔루션',
        period: '2019년 9월 ~ 2020년 12월',
        technologies: 'C/C++',
        description: '베트남 은행을 자동으로 연결해주고 입출금내역을 조회하여 계좌를 한눈에 볼 수 있는 모바일 어플리케이션. BIDV, Vietcom, TP 은행 등 약 11개 은행에 대한 계좌조회를 제공.',
        responsibilities: [
          '은행을 연결하고 내역을 조회하는 스크래핑 모듈을 담당하고(C/C++), 모바일 앱은 베트남 현지 협력사에서 개발',
          '2019년 10월 직접 베트남에 가서 현지 직원과 업무를 같이 진행',
          '베트남 은행에서 제공하는 데이터를 크롤링하여 계좌 정보와 이체 기능을 제공',
          '기존 C 코드를 Modern C++로 리팩터링'
        ]
      },
      {
        name: 'Omnidoc - 문서발급 솔루션',
        period: '2019년 4월 ~ 2020년 12월',
        technologies: 'C/C++',
        description: '17여개의 민원사이트에서 40여개의 민원문서를 발급할 수 있는 솔루션. 타사의 서비스에 탑재되어 고객의 민간업무를 대행해주는 편리한 서비스 제공.',
        responsibilities: [
          '금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등의 사이트를 스크래핑 담당'
        ]
      },
      {
        name: '오픈망 직승인 프로젝트',
        period: '2018년 8월 ~ 2019년 3월',
        technologies: 'SpringBoot, JPA',
        description: '가맹점과 카드사 간의 E2E 보안을 위한 클라우드 POS 서비스. AWS 를 이용한 클라우드 서비스 (EC2, S3, elastic search, 보안 등)',
        responsibilities: [
          '카드사와의 승인 및 매입 관련 프로세스를 테스트하기 위한 더미카드사 서버를 제작. (Spring boot, JPA, MySQL)',
          'VAN사에서 제공하는 가맹점 관리, 결제내역 조회 등의 기능을 직접 구현',
          '카드사의 결제 시스템을 이해하고 그 안의 보안 시스템을 직접 적용'
        ]
      },
      {
        name: '하나1QPay NFC 결제모듈',
        period: '2017년 6월 ~ 2018년 8월',
        technologies: 'Java, C/C++',
        description: '하나카드 1QPay 앱에 탑재되는 NFC 모듈. 지불카드의 token화 보안 서비스와, HCE 스펙을 따라 NFC 결제 통신을 제공.',
        responsibilities: [
          'VISA token 발급 및 EMV 카드 결제 스펙을 이해하여 NFC 결제 모듈을 유지보수. (Android java, JNI)',
          '보안 모듈인 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 컴파일하여 SharedObject의 분석 방지. (C++)',
          '라이브러리를 JNI로 연동하여 제공'
        ]
      },
      {
        name: 'TaSIM - 대형가맹점 직승인 프로젝트',
        period: '2017년 1월 ~ 2017년 6월',
        technologies: 'Java Card OS, MFC',
        description: '카드사와 가맹점 사이의 E2E 암호화를 제공하는 TaSIM. 중간 VAN사의 영향을 받지 않은 채, 가맹점 단말기와 카드사 간의 암호화 제공. 여신협회 taSIM Application Specification 인증, EMVCo 및 CC(Common Criteria) 인증.',
        responsibilities: [
          'JavaCOS 에 Applet을 탑재하여 가맹점의 카드 리더 단말기에 장착',
          'Java COS의 작동을 이해하고, 해당 제품을 유지보수 및 대응',
          'Applet 설치용 MFC UI 제작'
        ]
      }
    ]
  }
]);

// 프리랜서 프로젝트 데이터
const freelanceData = ref([
  {
    name: 'MGX 모바일 게임 시세조회 어플리케이션',
    period: '2021년 1월 ~ 2021년 3월',
    technologies: 'NodeJS, ReactNative',
    description: '리니지m, 리니지2m, 블래이드앤소울, 바람의나라, 트릭스터 등 모바일 게임의 시세조회, 시세추이, 거래소 아이템 검색 등을 제공하는 어플리케이션. 소식 전하기, 커뮤니티 기능 제공.',
    responsibilities: [
      '어플리케이션 제작 담당',
      '구글 로그인을 위한 Firebase 연동 및 카카오 로그인 연동'
    ]
  },
  {
    name: 'KlookPay - KlookPay POC 어플리케이션',
    period: '2020년 9월 ~ 2020년 11월',
    technologies: 'NodeJS, Angular, NativeScript, ExpressJS, Docker',
    description: 'KB카드에서 진행하는 KlookPay 프로젝트의 POC 어플리케이션. KlookPay는 KB카드의 마일리지, 포인트 및 결제 시스템을 Klook에 연동하는 서비스.',
    responsibilities: [
      'KB카드와 협업하여 안드로이드 앱 기술지원을 진행 (Nativescript-ng)',
      '기존 Angular 개인프로젝트로 진행했던 경험을 바탕으로 현재 버전의 Angular에 맞는 스터디를 다시 진행하고, 어플리케이션 제작',
      '자체 일정관리를 위한 개인 JIRA를 사용하여 프로젝트 진행을 관리'
    ]
  }
]);

// 기술 스택 데이터
// 메인과 기타로 나눠서, 기타는 숙련도 필요 없음
const techStackData = ref([
  {
    category: 'Frontend',
    technologies: [
      { name: 'Vue.js 3', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },      { name: 'C++', level: 'Intermediate' },
      { name: 'Java', level: 'Intermediate' },
      { name: 'Android Kotlin', level: 'Advanced' },
    ]
  },
  {
    category: 'Backend & DevOps',
    technologies: [
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Github Actions', level: 'Advanced' },
      { name: 'Datadog', level: 'Advanced' },
      { name: 'Git', level: 'Expert' },
      { name: 'Storybook', level: 'Advanced' },
      { name: 'Jira', level: 'Advanced' },
      { name: 'Figma', level: 'Intermediate' },
    ]
  },
]);

// 발표 및 컨퍼런스 데이터
const presentationData = ref([
  {
    title: '데이터독 User Journey 세션 발표',
    event: 'Datadog Korea Observability Day 2024',
    period: '2024년 9월',
    description: 'O2O 환경의 리코 특성을 살려 데이터독을 에러 분석과 사용성 측정 면에서 활용한 경험 공유',
    topics: [
      '에러 대응: HEIC 파일 형식 에러 해결, 대시보드 구성, 알림 시스템',
      '데이터 기반 의사결정: 패치 시간 변경, OS 비율 분석',
      '사용성 측정: Custom Action 활용, Funnel 전환율 측정'
    ],
    link: 'https://tech.e3view.com/content/files/2024/10/--------------------------------------------------------------------------------------.pdf',
    eventLink: 'https://www.datadoghq.com/ko/event/datadogliveseoul2024/#speakers'
  }
]);
</script>

<template>
  <div class="resume-background">
    <div class="resume-container">
    <!-- Header Section with Profile -->
    <header class="resume-header">
      <div class="profile-section">
        <div class="profile-photo">
          <!-- 프로필 사진 공간 -->
          <div class="photo-placeholder">
            <span class="photo-text">프로필 사진</span>
          </div>
        </div>
        <div class="profile-info">
          <h1 class="name">이현수</h1>
          <h2 class="title">프론트엔드 개발자</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="label">Email:</span>
              <span class="value">iddms5446@gmail.com</span>
            </div>
            <div class="contact-item">
              <span class="label">Phone:</span>
              <span class="value">010-0000-0000</span>
            </div>
            <div class="contact-item">
              <span class="label">GitHub:</span>
              <span class="value">github.com/lhs-source</span>
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
          <div 
            v-for="keyword in keywordData" 
            :key="keyword.title"
            class="keyword-item"
          >
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
        <div 
          v-for="category in techStackData" 
          :key="category.category"
          class="tech-category"
        >
          <h3 class="tech-category-title">{{ category.category }}</h3>
          <div class="tech-list">
            <div 
              v-for="tech in category.technologies" 
              :key="tech.name"
              class="tech-item"
            >
              <span class="tech-name">{{ tech.name }}</span>
              <div class="tech-level-container">
                <div class="tech-level-bar" :class="`level-${tech.level.toLowerCase()}`">
                  <div class="tech-level-fill" :class="`fill-${tech.level.toLowerCase()}`"></div>
                </div>
                <span class="tech-level-text">{{ tech.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 경력 Section -->
    <section class="section">
      <h2 class="section-title">경력 (총 {{ dayjs().diff(dayjs("2017-01-01"), 'year') }}년 {{ dayjs().diff(dayjs("2021-01-01"), 'month') % 12 }}개월)</h2>
      
      <div class="career-summary">
        <div class="career-item">
          <span class="company">주식회사 리코</span>
          <div class="text-sm ml-2">
            폐기물 매니지먼트 클라우드 서비스 기업
          </div>
          <div class="flex-1"></div>
          <span class="period">2021년 1월 ~ 재직중 (약 {{ dayjs().diff(dayjs("2021-01-01"), 'year') }}년 {{ dayjs().diff(dayjs("2021-01-01"), 'month') % 12 }}개월)</span>
        </div>
        <div class="career-item mt-4">
          <span class="company">주식회사 뱅크비</span>
          <div class="text-sm ml-2">
            스크래핑 전문 핀테크 기업
          </div>
          <div class="flex-1"></div>
          <span class="period">2017년 1월 ~ 2020년 12월 (약 4년)</span>
        </div>
      </div>

      <!-- 각 회사별 상세 경력 -->
      <div 
        v-for="career in careerData" 
        :key="career.company"
        class="company-detail"
      >
        <div class="company-header">
          <h3 class="company-name">{{ career.company }}</h3>
          <div class="company-info">
            <span class="position">{{ career.position }}</span>
            <span class="duration">{{ career.period }} ({{ career.duration }})</span>
          </div>
        </div>

        <!-- 프로젝트별 상세 -->
        <div class="projects">
          <div 
            v-for="project in career.projects" 
            :key="project.name"
            class="project-item"
          >
            <div class="project-header">
              <h4 class="project-name">{{ project.name }}</h4>
              <div class="project-meta">
                <span class="project-period">{{ project.period }}</span>
                <span class="project-tech">{{ project.technologies }}</span>
              </div>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div v-if="project.responsibilities" class="project-responsibilities">
              <h5 class="responsibilities-title">기여 및 성과</h5>
              <ul class="responsibilities-list">
                <li 
                  v-for="responsibility in project.responsibilities" 
                  :key="responsibility"
                  class="responsibility-item"
                >
                  {{ responsibility }}
                </li>
              </ul>
            </div>

            <div v-if="(project as any).responsibilityCategories" class="responsibility-categories">
              <h5 class="responsibilities-title font-bold">기여 및 성과</h5>
              <div class="categories-grid">
                <div 
                  v-for="category in (project as any).responsibilityCategories" 
                  :key="category.category"
                  class="category-card"
                  :style="{ borderLeftColor: category.color }"
                >
                  <div class="category-header">
                    <h6 class="category-title">
                      {{ category.category }}
                    </h6>
                  </div>
                  <ul class="category-items">
                    <li 
                      v-for="item in category.items" 
                      :key="item"
                      class="category-item"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 문제 해결 경험 섹션 -->
        <div v-if="career.problemSolving" class="problem-solving-section">
          <h4 class="problem-solving-title">문제 해결 경험</h4>
          <div class="problem-solving-items">
            <div 
              v-for="problem in career.problemSolving" 
              :key="problem.title"
              class="problem-item"
            >
              <h5 class="problem-title">{{ problem.title }}</h5>
              <p class="problem-description">{{ problem.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 프리랜서 프로젝트 Section -->
    <section class="section">
      <h2 class="section-title">기타 프로젝트</h2>
      
      <div class="freelance-projects">
        <div 
          v-for="project in freelanceData" 
          :key="project.name"
          class="freelance-item"
        >
          <div class="project-header">
            <h3 class="project-name">{{ project.name }}</h3>
            <div class="project-meta">
              <span class="project-period">{{ project.period }}</span>
              <span class="project-tech">{{ project.technologies }}</span>
            </div>
          </div>
          
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-responsibilities">
            <h4 class="responsibilities-title">담당 업무 내용</h4>
            <ul class="responsibilities-list">
              <li 
                v-for="responsibility in project.responsibilities" 
                :key="responsibility"
                class="responsibility-item"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 발표 및 컨퍼런스 Section -->
    <section class="section">
      <h2 class="section-title">발표 & 컨퍼런스</h2>
      
      <div class="presentations">
        <div 
          v-for="presentation in presentationData" 
          :key="presentation.title"
          class="presentation-item"
        >
          <div class="presentation-header">
            <h3 class="presentation-title">{{ presentation.title }}</h3>
          </div>
          
          <span class="presentation-period">{{ presentation.period }}</span>
          <p class="presentation-event">{{ presentation.event }}</p>
          <p class="presentation-description">{{ presentation.description }}</p>
          
          <div class="presentation-topics">
            <h4 class="topics-title">주요 내용</h4>
            <ul class="topics-list">
              <li 
                v-for="topic in presentation.topics" 
                :key="topic"
                class="topic-item"
              >
                {{ topic }}
              </li>
            </ul>
          </div>
          
          <div class="presentation-links">
            <div v-if="presentation.link" class="presentation-link">
              <a 
                :href="presentation.link" 
                target="_blank"
                class="link"
              >
                발표 자료 보기 →
              </a>
            </div>
            <div v-if="presentation.eventLink" class="presentation-link">
              <a 
                :href="presentation.eventLink" 
                target="_blank"
                class="link event-link"
              >
                컨퍼런스 소개 보기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

.resume-background {
  min-height: 100vh;
  background: white;
  padding: 20px 0;
}

.resume-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  color: #333;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
}

/* Header Section */
.resume-header {
  padding-bottom: 30px;
  margin-bottom: 40px;
}

.profile-section {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.profile-photo {
  flex-shrink: 0;
}

.photo-placeholder {
  width: 150px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 8px;
}

.photo-text {
  color: #666;
  font-size: 14px;
  text-align: center;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin: 0 0 20px 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  gap: 8px;
}

.label {
  font-weight: 500;
  min-width: 60px;
  color: #666;
}

.value {
  color: #333;
}

/* Section Styles */
.section {
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #333;
}

.subsection {
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.subsection-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
}

/* Keywords Section */
.keywords-grid {
  display: grid;
  gap: 20px;
}

.keyword-item {
  border-left: 4px solid #333;
  padding-left: 16px;
}

.keyword-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.keyword-description {
  color: #555;
  margin: 0;
  font-size: 14px;
}

/* Work Style Section */
.work-style-list {
  margin: 0;
  padding-left: 20px;
}

.work-style-item {
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}

/* Tech Stack Section */
.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.tech-category {
  border-left: 3px solid #333;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.tech-category-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  gap: 12px;
}

.tech-name {
  font-size: 13px;
  color: #555;
  font-weight: 400;
  flex-shrink: 0;
  min-width: 120px;
}

.tech-level-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 120px;
}

.tech-level-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  flex: 1;
  position: relative;
}

.tech-level-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
  
  &.fill-expert {
    width: 100%;
    background: #333;
  }
  
  &.fill-advanced {
    width: 75%;
    background: #666;
  }
  
  &.fill-intermediate {
    width: 50%;
    background: #999;
  }
}

.tech-level-text {
  font-size: 10px;
  color: #777;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  min-width: 60px;
  text-align: right;
}

/* Career Section */
.career-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.career-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.company {
  font-weight: 600;
  color: #333;
}

.period {
  color: #666;
  font-size: 14px;
}

.company-detail {
  margin-bottom: 40px;
  // border: 1px solid #e9ecef;
  // border-radius: 8px;
  // padding: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.company-header {
  margin-bottom: 20px;
}

.company-name {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.company-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.position {
  font-weight: 500;
  color: #666;
}

.duration {
  color: #666;
  font-size: 14px;
}

/* Project Styles */
.projects {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.project-item {
  // border-left: 3px solid #333;
  padding-left: 16px;
}

.project-header {
  margin-bottom: 12px;
}

.project-name {
  border-left: 3px solid #333;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  // margin: 0 0 6px 0;
  margin-left: -16px;
  padding-left: 16px;
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.project-period {
  color: #666;
  font-size: 13px;
}

.project-tech {
  color: #007bff;
  font-size: 13px;
  font-weight: 500;
}

.project-description {
  color: #555;
  margin: 0 0 15px 0;
  font-size: 14px;
}

.project-responsibilities {
  .responsibilities-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
  }
  
  .responsibilities-list {
    margin: 0;
    padding-left: 18px;
  }
  
  .responsibility-item {
    margin-bottom: 6px;
    color: #555;
    font-size: 13px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* Responsibility Categories */
.responsibility-categories {
  .categories-grid {
    display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }
  
  .category-card {
    // background: #fafafa;
    // border-radius: 6px;
    padding: 0px;
    // border-left: 3px solid;
    transition: all 0.2s ease;
    // border: 1px solid #f0f0f0;
    
    // &:hover {
    //   background: #f5f5f5;
    //   border-color: #e0e0e0;
    //   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    // }
  }
  
  .category-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .category-icon {
    font-size: 16px;
    font-weight: bold;
    opacity: 0.8;
  }
  
  .category-title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.02em;
  }
  
  .category-items {
    margin: 0;
    padding-left: 16px;
    list-style: none;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, #d0d0d0, transparent);
    }
  }
  
  .category-item {
    margin-bottom: 8px;
    color: #555;
    font-size: 13px;
    line-height: 1.5;
    position: relative;
    padding-left: 12px;
    
    &::before {
      content: '·';
      position: absolute;
      left: -4px;
      color: #aaa;
      font-weight: bold;
      font-size: 16px;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* Problem Solving Section */
.problem-solving-section {
  margin-top: 30px;
  padding-top: 20px;
}

.problem-solving-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.problem-solving-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.problem-item {
  border-left: 3px solid #28a745;
  padding-left: 16px;
}

.problem-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.problem-description {
  color: #555;
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

/* Freelance Projects */
.freelance-projects {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.freelance-item {
  // border: 1px solid #e9ecef;
  // border-radius: 8px;
  // border-left: 3px solid #8f8f8f;
  padding-left: 16px;
}

/* Presentations */
.presentations {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.presentation-item {
  // border: 1px solid #e9ecef;
  // border-radius: 8px;
  // border-left: 3px solid #6137ad;
  padding-left: 16px;
}

.presentation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.presentation-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
}

.presentation-date {
  color: #666;
  font-size: 14px;
  margin-left: 20px;
}

.presentation-event {
  color: #007bff;
  font-weight: 500;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.presentation-description {
  color: #555;
  margin: 0 0 15px 0;
  font-size: 14px;
}

.presentation-topics {
  .topics-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
  }
  
  .topics-list {
    margin: 0 0 15px 0;
    padding-left: 18px;
  }
  
  .topic-item {
    margin-bottom: 6px;
    color: #555;
    font-size: 13px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.presentation-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.presentation-link {
  .link {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
    
    &.event-link {
      color: #666;
      font-size: 13px;
    }
  }
}

/* Print Styles */
@media print {
  .resume-container {
    box-shadow: none;
    padding: 20px;
  }
  
  .section {
    page-break-inside: avoid;
  }
  
  .company-detail {
    page-break-inside: avoid;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .resume-container {
    padding: 20px;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .photo-placeholder {
    width: 120px;
    height: 160px;
  }
  
  .name {
    font-size: 28px;
  }
  
  .company-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .career-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .presentation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .presentation-date {
    margin-left: 0;
  }
  
  .responsibility-categories {
    .categories-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    
    .category-card {
      padding: 12px;
    }
    
    .category-icon {
      font-size: 16px;
    }
    
    .category-title {
      font-size: 13px;
    }
    
    .category-item {
      font-size: 12px;
    }
  }
  
  .tech-stack-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .tech-category {
    padding-left: 12px;
  }
  
  .tech-category-title {
    font-size: 14px;
  }
  
  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .tech-name {
    font-size: 12px;
    min-width: auto;
  }
  
  .tech-level-container {
    width: 100%;
    max-width: none;
  }
  
  .tech-level-bar {
    height: 5px;
  }
  
  .tech-level-text {
    font-size: 9px;
    min-width: 50px;
  }
}
</style>
