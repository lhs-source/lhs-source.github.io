<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

// 경력기술서 데이터
const careerData = ref([
  {
    company: '리코',
    period: '2021.01.04 ~ 현재',
    duration: `${dayjs().diff(dayjs('2021-01-04'), 'year')}년 ${dayjs().diff(dayjs('2021-01-04'), 'month') % 12}개월`,
    position: '프론트엔드 개발자',
    description: '대한민국 폐기물 시장을 혁신하는 환경 스타트업. 수집운반 토탈 서비스 \'업박스(UpBox)\' 서비스 개발',
    achievements: [
      '업박스 클라우드 프론트엔드 개발 (Vue3, TypeScript, Pinia)',
      '안드로이드 네이티브앱 WebView 개발 (Kotlin)',
      'Datadog 도입으로 에러 모니터링 및 사용성 측정',
      'vue-i18n 적용으로 국제화 기반 마련',
      'Vitest를 활용한 유닛테스트 도입',
      'GPS 서비스를 활용한 실시간 위치 정보 수집',
      '올바로 시스템 자동화 구현',
      '정산 시스템 및 청구 자동화 개발'
    ],
    technologies: ['Vue3', 'TypeScript', 'Pinia', 'Android Kotlin', 'WebView', 'Datadog', 'i18n', 'Vitest', 'GPS']
  },
  {
    company: '뱅크비',
    period: '2017.01.02 ~ 2020.12.31',
    duration: '3년 11개월',
    position: 'C++ 개발자',
    description: '금융권 디지털 전환을 위한 핵심 솔루션과 컨설팅 제공',
    achievements: [
      '하나카드 앱카드 Whitebox 난독화 모듈 개발 (C++, LLVM, Android NDK)',
      'OmniDoc 스크래핑 모듈 개발 (C++, Lua)',
      'TaSIM e2e 암호화 솔루션 개발 (C++, JavaCOS)',
      '17개 민원사이트에서 40여개 민원문서 발급 솔루션 개발',
      '여신협회 taSIM Application Specification 인증',
      'EMVCo 및 CC(Common Criteria) 인증 획득'
    ],
    technologies: ['C++', 'LLVM', 'Android NDK', 'Java', 'Lua', 'JavaCOS']
  }
]);

// 포트폴리오 데이터
const portfolioData = ref([
  {
    title: '업박스 클라우드',
    type: 'B2B 웹 애플리케이션',
    period: '2021.01 ~ 현재',
    description: '폐기물 수집운반 토탈 서비스 관리 시스템',
    features: [
      '배출장 및 계약 관리 시스템',
      '스케줄 관리 및 경로 최적화',
      '올바로 시스템 자동화',
      '정산 및 청구 자동화',
      '드라이버 수거 및 차량 관리',
      '고객 배출량 확인 및 모니터링'
    ],
    technologies: ['Vue3', 'TypeScript', 'Pinia', 'Android Kotlin', 'WebView'],
    image: '/assets/img/upboxbox2.png',
    link: 'https://upbox.us/'
  },
  {
    title: '업박스 홈페이지',
    type: '기업 홈페이지',
    period: '2021.01 ~ 현재',
    description: '업박스 서비스 소개 및 고객 지원 홈페이지',
    features: [
      'Google Sheet 기반 CMS 구현',
      'Next.js를 활용한 서버리스 아키텍처',
      'Firebase Firestore 연동',
      'Google OAuth 인증',
      'Summernote 에디터 포팅'
    ],
    technologies: ['Next.js', 'Firebase', 'Google Sheets', 'Google OAuth'],
    image: '/assets/img/upboxbox3.png',
    link: 'https://upbox.us/'
  },
  {
    title: '리코 홈페이지',
    type: '기업 홈페이지',
    period: '2021.01 ~ 현재',
    description: '리코 기업 소개 및 서비스 홈페이지',
    features: [
      'Google Sheet 기반 CMS 구현',
      'Next.js를 활용한 서버리스 아키텍처',
      'Firebase Firestore 연동',
      'Google OAuth 인증'
    ],
    technologies: ['Next.js', 'Firebase', 'Google Sheets', 'Google OAuth'],
    image: '/assets/img/resource_connector.png',
    link: 'https://recokr.com/'
  },
  {
    title: '하나카드 앱카드 Whitebox 난독화 모듈',
    type: '모바일 보안 모듈',
    period: '2017.01 ~ 2020.12',
    description: '하나카드 1QPay 앱 NFC 결제 보안 모듈',
    features: [
      'NFC 모듈 개발 (Android Java, JNI)',
      'Whitebox 암호화 모듈 LLVM 난독화',
      'VISA token 발급 및 EMV 카드 결제 스펙 구현',
      'HCE 스펙 기반 NFC 결제 통신',
      'SharedObject 분석 방지'
    ],
    technologies: ['C++', 'LLVM', 'Android NDK', 'Java', 'JNI'],
    image: '/assets/img/bank_bee.png',
    link: null
  },
  {
    title: 'OmniDoc 스크래핑 모듈',
    type: '자동화 솔루션',
    period: '2017.01 ~ 2020.12',
    description: '민원사이트 자동 스크래핑 솔루션',
    features: [
      '17개 민원사이트 지원',
      '40여개 민원문서 자동 발급',
      '금융결제원 Payinfo 연동',
      '신용조회 KCB 연동',
      '범죄자조회 Crime 연동'
    ],
    technologies: ['C++', 'Lua'],
    image: '/assets/img/bank_bee.png',
    link: null
  },
  {
    title: 'TaSIM e2e 암호화',
    type: '보안 솔루션',
    period: '2017.01 ~ 2020.12',
    description: '카드사-가맹점 간 E2E 암호화 솔루션',
    features: [
      '중간 VAN사 영향 없는 암호화',
      '여신협회 taSIM Application Specification 인증',
      'EMVCo 및 CC(Common Criteria) 인증',
      'JavaCOS Applet 개발',
      'MFC UI 제작'
    ],
    technologies: ['C++', 'JavaCOS'],
    image: '/assets/img/bank_bee.png',
    link: null
  }
]);

// 발표 및 컨퍼런스 데이터
const presentationData = ref([
  {
    title: '데이터독 User Journey 세션 발표',
    event: 'Datadog Korea Observability Day 2024',
    date: '2024',
    description: 'O2O 환경의 리코 특성을 살려 데이터독을 에러 분석과 사용성 측정 면에서 활용한 경험 공유',
    topics: [
      '에러 대응: HEIC 파일 형식 에러 해결, 대시보드 구성, 알림 시스템',
      '데이터 기반 의사결정: 패치 시간 변경, OS 비율 분석',
      '사용성 측정: Custom Action 활용, Funnel 전환율 측정'
    ],
    link: 'https://tech.e3view.com/datadog-live-seoul-2024-balpyojaryo/'
  }
]);
</script>

<template>
  <div class="portfolio-wrapper min-h-screen mx-auto max-w-7xl my-24">
    <!-- Header Section -->
    <section class="header-section p-4">
      <div class="title-section relative w-full mt-2 pt-2 pb-4">
          <div class="title-area flex justify-center">
            <div class="title-text">
              <h1 class="text-6xl font-bold m-0 text-center leading-none">
                Portfolio & Career
              </h1>
              <h2 class="text-2xl font-bold m-0 text-right leading-tight">
                이현수
              </h2>
            </div>
          </div>
      </div>
    </section>
    <!-- 자기소개 Section -->
    <section class="my-info-section mt-16">
      <div class="img-area w-[200px] h-[200px] bg-stone-300"></div>
      
    </section>

    <!-- 경력기술서 Section -->
    <section class="career-section mt-16">
      <div class="flex justify-center items-center mb-16">
        <h2 class="text-4xl font-bold bg-stone-800 text-white px-[240px] py-2">경력기술서</h2>
      </div>

      <div class="career-entries">
        <div 
          v-for="(career, index) in careerData" 
          :key="index"
          class="career-entry mb-16"
        >
          <div class="company-info relative min-h-[400px] p-8 border border-stone-300">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-3xl font-bold mb-2">{{ career.company }}</h3>
                <p class="text-lg text-stone-600">{{ career.position }}</p>
                <p class="text-sm text-stone-500">{{ career.period }} ({{ career.duration }})</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in career.technologies" 
                  :key="tech"
                  class="border border-stone-400 px-2 py-1 rounded-md text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <p class="text-base mb-6 leading-relaxed">{{ career.description }}</p>
            
            <div class="achievements">
              <h4 class="text-xl font-bold mb-4">주요 성과</h4>
              <ul class="space-y-2">
                <li 
                  v-for="achievement in career.achievements" 
                  :key="achievement"
                  class="flex items-start"
                >
                  <span class="text-stone-500 mr-2">•</span>
                  <span>{{ achievement }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 포트폴리오 Section -->
    <section class="portfolio-section mt-32">
      <div class="flex justify-center items-center mb-16">
        <h2 class="text-4xl font-bold bg-stone-800 text-white px-[240px] py-2">포트폴리오</h2>
      </div>

      <div class="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in portfolioData" 
          :key="index"
          class="portfolio-card border border-stone-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="project-image h-48 bg-stone-200 flex items-center justify-center">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="text-stone-500 text-center">
              <div class="text-4xl mb-2">📱</div>
              <div>{{ project.type }}</div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">{{ project.title }}</h3>
              <span class="text-sm text-stone-500">{{ project.period }}</span>
            </div>
            
            <p class="text-sm text-stone-600 mb-3">{{ project.type }}</p>
            <p class="text-base mb-4 leading-relaxed">{{ project.description }}</p>
            
            <div class="features mb-4">
              <h4 class="text-sm font-bold mb-2">주요 기능</h4>
              <ul class="space-y-1">
                <li 
                  v-for="feature in project.features.slice(0, 3)" 
                  :key="feature"
                  class="text-sm flex items-start"
                >
                  <span class="text-stone-400 mr-2">•</span>
                  <span>{{ feature }}</span>
                </li>
                <li v-if="project.features.length > 3" class="text-sm text-stone-500">
                  + {{ project.features.length - 3 }}개 더...
                </li>
              </ul>
            </div>
            
            <div class="technologies mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div v-if="project.link" class="mt-4">
              <a 
                :href="project.link" 
                target="_blank"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                프로젝트 보기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 발표 및 컨퍼런스 Section -->
    <section class="presentation-section mt-32">
      <div class="flex justify-center items-center mb-16">
        <h2 class="text-4xl font-bold bg-stone-800 text-white px-[240px] py-2">발표 & 컨퍼런스</h2>
      </div>

      <div class="presentation-entries">
        <div 
          v-for="(presentation, index) in presentationData" 
          :key="index"
          class="presentation-entry mb-8 p-6 border border-stone-300 rounded-lg"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">{{ presentation.title }}</h3>
            <span class="text-sm text-stone-500">{{ presentation.date }}</span>
          </div>
          
          <p class="text-lg text-stone-600 mb-2">{{ presentation.event }}</p>
          <p class="text-base mb-4 leading-relaxed">{{ presentation.description }}</p>
          
          <div class="topics">
            <h4 class="text-lg font-bold mb-3">주요 내용</h4>
            <ul class="space-y-2">
              <li 
                v-for="topic in presentation.topics" 
                :key="topic"
                class="flex items-start"
              >
                <span class="text-stone-500 mr-2">•</span>
                <span>{{ topic }}</span>
              </li>
            </ul>
          </div>
          
          <div v-if="presentation.link" class="mt-4">
            <a 
              :href="presentation.link" 
              target="_blank"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              발표 자료 보기 →
            </a>
          </div>
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

.portfolio-wrapper {
  width: 1440px;
  color: #1f1f14;
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  white-space: pre-line;
  word-break: break-all;

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
  font-family: 'Marcellus', serif;
  font-weight: 700;
  letter-spacing: 2px;

  .title-separate {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
  }
}

/* Career Section */
.career-section {
  .career-entry {
    .company-info {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
    }
  }
}

/* Portfolio Section */
.portfolio-section {
  .portfolio-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}

/* Presentation Section */
.presentation-section {
  .presentation-entry {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }
}

a {
  color: #2b8e61;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 700;
  &::after {
    content: '🔗';
    margin-left: 4px;
    font-size: 12px;
    vertical-align: middle;
  }
}
</style>
