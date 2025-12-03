<script setup lang="ts">
import { ref } from 'vue';

const techStack = [
  'Vite', 'Vue3', 'Android Kotlin', 'Webview', 'Github Actions',
  'AWS', 'TailwindCSS', 'i18n', 'Storybook', 'ai'
];

const teamComposition = {
  2020: ['백엔드(1)', '프론트(1)', '디자이너(1)', 'PM&CTO(1)'],
  2025: ['백엔드(4)', '프론트(2)', '디자이너(2)', 'PO(3)', 'QA(1)', 'PM&CTO(1)']
};

const techIconMap: Record<string, string> = {
  'Vue3': '/assets/portfolio/tools/Vue.js_Logo_2.svg',
  'Vite': '/assets/portfolio/tools/Vitejs-logo.svg',
  'TypeScript': '/assets/portfolio/tools/icons8-타이프스크립트.svg',
  'Java': '/assets/portfolio/tools/java-4-logo-svgrepo-com.svg',
  'Android Kotlin': '/assets/portfolio/tools/kotlin-svgrepo-com.svg',
  'Kotlin': '/assets/portfolio/tools/kotlin-svgrepo-com.svg',
  'React': '/assets/portfolio/tools/react-svgrepo-com.svg',
  'AWS': '/assets/portfolio/tools/aws-svgrepo-com.svg',
  'Github Actions': '/assets/portfolio/tools/githubactions-svgrepo-com.svg',
  'Datadog': '/assets/portfolio/tools/datadog-svgrepo-com.svg',
  'Git': '/assets/portfolio/tools/git-svgrepo-com.svg',
  'Storybook': '/assets/portfolio/tools/storybook-icon-svgrepo-com.svg',
  'Atlassian': '/assets/portfolio/tools/atlassian-svgrepo-com.svg',
  'Figma': '/assets/portfolio/tools/figma-svgrepo-com.svg',
  'TailwindCSS': '/assets/portfolio/tools/tailwind-svgrepo-com.svg',
  'Tailwind': '/assets/portfolio/tools/tailwind-svgrepo-com.svg',
  'i18n': '/assets/portfolio/tools/i18n.svg',
  'Webview': '/assets/portfolio/tools/google-webview-devtools-svgrepo-com.svg'
};

const getTechIcon = (techName: string): string | null => {
  return techIconMap[techName] ?? null;
};

const roleIconMap: Record<string, string> = {
  '백엔드': '/assets/portfolio/backend.png',
  '프론트': '/assets/portfolio/front.png',
  '디자이너': '/assets/portfolio/uiux.png',
  'PM&CTO': '/assets/portfolio/pm.png',
  'PO': '/assets/portfolio/po.png',
  'QA': '/assets/portfolio/qa.svg'
};

const getRoleInfo = (role: string) => {
  const match = role.match(/(.+)\((\d+)\)/);
  const label = match ? match[1].trim() : role;
  const count = match ? Number(match[2]) : 1;
  const icon = roleIconMap[label] ?? null;

  return {
    label,
    count,
    icon
  };
};

const roleCards = [
  {
    title: '프로젝트 구조 설계 관점',
    summary: '3개 앱(어드민, 드라이버, 커스터머) 통합 구조 설계 및 웹뷰 기반 모바일 앱 구축. 공통 기능(폼 검증, 팝업, 토스트, 테이블) 및 권한 체계 모듈화.',
    id: 'structure'
  },
  {
    title: '개발 개선 관점',
    summary: 'DTO/모델 구조 통합, CI/CD 분리 및 자동화, 모바일 푸시/웹뷰 캐시 최적화, TailwindCSS/i18n 도입을 통한 생산성 및 유지보수성 향상.',
    id: 'improvement'
  },
  {
    title: '비즈니스 문제 해결 관점',
    summary: '지도 기반 수거 일정 관리, 폐기물 법적 리스트/계약 관리 자동화, GPS 경로 최적화 등 비즈니스 핵심 로직 구현 및 사용자 경험 개선.',
    id: 'business'
  },
  {
    title: '협업 관점',
    summary: '기획/디자인 단계부터 적극적인 피드백 및 제안(UI 단순화, 프로세스 분리 등)을 통해 효율적인 개발 방향성 수립 및 의사결정 주도.',
    id: 'collaboration'
  }
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const subSectionItems = {
  structure: [
    { title: '3개 앱 구조', description: '어드민, 드라이버, 커스터머 앱 통합 빌드 및 배포' },
    { title: '메뉴 및 Bread Crumb', description: '라우트 기반 자동 네비게이션 시스템' },
    { title: '웹뷰', description: '네이티브 기능 래핑 및 Build Variant 관리' },
    { title: '폼 데이터 검증', description: '복잡한 입력 조건 대응을 위한 자체 검증 시스템' },
    { title: 'Popup/Toast', description: '개발 생산성을 고려한 직관적인 전역 UI 모듈' },
    { title: '데이터 테이블', description: '필드 커스텀 및 조회 설정이 가능한 고기능 테이블' },
    { title: '권한 체계', description: '사용자 권한 기반 UI/API 제어 시스템' }
  ],
  improvement: [
    { title: 'DTO/모델 구조', description: '다양한 DTO를 하나의 모델로 통합 관리' },
    { title: 'CI/CD 개선', description: '빌드/배포 분리 및 Github Release 자동화' },
    { title: '모바일 푸시', description: '웹뷰-네이티브 간 데이터 동기화 및 Room DB 활용' },
    { title: '웹뷰 캐시 개선', description: '버전 체킹 및 강제 업데이트 메커니즘 도입' },
    { title: 'TailwindCSS 도입', description: '디자인 시스템 통합 및 생산성 향상' },
    { title: 'i18n 도입', description: '다국어 지원 및 용어 통일 (인도네시아어 등)' },
    { title: '데이터독 활용', description: 'RUM/Product Analytics 기반 사용성 개선' }
  ],
  business: [
    { title: '스케줄 편집', description: '지도 기반 수거 일정 및 동선 최적화' },
    { title: '법적 리스트 관리', description: '올바로 시스템 연동 및 처리 상태 자동화' },
    { title: '전자계약', description: '계약 데이터 연동 및 승인 시스템 구현' },
    { title: 'GPS 수집', description: '수거 경로 추적 및 최적화 데이터 확보' },
    { title: '적법성 검증', description: '허가 정보 기반 수거/처리 유효성 피드백' }
  ],
  collaboration: [
    { title: 'UI 단순화', description: '사용자 특성(연령) 고려한 직관적 UI 제안' },
    { title: 'Form 최적화', description: '조회 전용 데이터의 불필요한 Form 제거' },
    { title: '디자인 피드백', description: '가독성 문제(Chip 폰트) 즉각 수정 및 반영' },
    { title: '프로세스 개선', description: '복잡한 정산/환불 로직 분리 제안' }
  ]
};
</script>

<template>
  <div class="resume-background">
    <div class="resume-container">
      <!-- Header -->
      <header class="resume-header">
        <div class="profile-section">
          <div class="profile-info">
            <h1 class="name">업박스 클라우드</h1>
            <h2 class="title">폐기물 매니지먼트 클라우드 서비스</h2>
          </div>
        </div>
      </header>

      <!-- Project Goal -->
      <section class="section">
        <h2 class="section-title">프로젝트 내용 (목표)</h2>
        <div class="content-text">
          <p>업박스 클라우드는 폐기물의 처리 과정에서 발생하는 모든 데이터를 투명하고 정확하게 관리하는 클라우드 서비스입니다. 이 프로덕트의 궁극적 목표와 가치는 지속 가능한 폐기물
            관리의 새로운 기준을 설정하는 것입니다. 제공되는 앱의 종류로는 업박스 어드민, 업박스 드라이버, 업박스 커스터머가 있으며, 각각 기사님들의 수거 및 차량 관리, 업장의
            수거 일정 및 정보 확인에 사용됩니다.</p>
          <p>모든 앱은 담당하는 법인과 역할에 맞춰 권한이 부여되고, 권한별로 메뉴와 기능이 차등 제공됩니다. 고객의 업장 특성과 계약을 기반해 맞춤으로 법적 문제가 발생하지 않도록 수거
            일정을 조율합니다. 폐기물 처리 데이터 기반한 청구서를 생성하고, 정산까지 자동으로 이루어집니다.</p>
          <p>폐기물 산업 특성상 법적인 문제가 굉장히 복잡하고 행정 처리 업무가 많습니다. 고객들은 번거로운 과정을 줄이고, 행정 처리에 필요한 서류를 원할 때 바로 확인이 가능하도록
            업박스에서 서식에 맞는 데이터를 제공합니다.</p>
          <p>초기 음식물류 폐기물 중심에서 현재는 재활용과 폐수오니(슬러지) 등 여러 폐기물 종류를 종합 지원하는 형태로 발전했습니다.</p>
        </div>
      </section>

      <!-- Team Composition -->
      <section class="section">
        <h2 class="section-title">인원 구성</h2>
        <div class="team-grid">
          <div class="team-year">
            <h3 class="year-title">2020</h3>
            <div class="member-list">
              <div v-for="member in teamComposition[2020]" :key="member" class="member-role">
                <img v-if="getRoleInfo(member).icon" :src="getRoleInfo(member).icon!" :alt="getRoleInfo(member).label"
                  class="member-role-icon" />
                <div v-else class="member-role-placeholder">{{ getRoleInfo(member).label.charAt(0) }}</div>
                <span class="member-role-text">
                  {{ getRoleInfo(member).label }}
                  <span class="member-role-count">({{ getRoleInfo(member).count }})</span>
                </span>
              </div>
            </div>
          </div>
          <div class="team-year">
            <h3 class="year-title">2025</h3>
            <div class="member-list">
              <div v-for="member in teamComposition[2025]" :key="member" class="member-role">
                <img v-if="getRoleInfo(member).icon" :src="getRoleInfo(member).icon!" :alt="getRoleInfo(member).label"
                  class="member-role-icon" />
                <div v-else class="member-role-placeholder">{{ getRoleInfo(member).label.charAt(0) }}</div>
                <span class="member-role-text">
                  {{ getRoleInfo(member).label }}
                  <span class="member-role-count">({{ getRoleInfo(member).count }})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="section">
        <h2 class="section-title">사용 기술</h2>
        <div class="tech-stack-grid">
          <div v-for="tech in techStack" :key="tech" class="tech-item-grid">
            <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)!" :alt="tech" class="tech-icon" />
            <span class="tech-name">{{ tech }}</span>
          </div>
        </div>
      </section>

      <!-- Role & Contribution -->
      <section class="section">
        <h2 class="section-title">역할 및 기여</h2>
        <div class="content-text mb-8">
          <p>리코에 입사한 후 바로 맡아서 진행하게 된 프로젝트입니다. 프론트엔드 개발 1명으로 시작해, 현재 두명이 함께 개발하고 있습니다. 직급의 차이는 없지만 주도적으로 프론트엔드
            파트를 리드하고 있습니다. 업무 할당, 일정 관리, 우선순위 관리, 메인 전략 과제에 대한 기획과 디자인 소통 주도 등 업무 프로세스 전반적으로 소통의 창구 역할을 합니다.
          </p>
          <p>애자일 방법론을 기반으로 프로젝트를 진행했습니다. 지라, 데이터독을 도입 및 사용하면서 기능과 사용법을 주도적으로 학습하고 가이드합니다. 가장 오랜 기간 개발에 참여한
            인원으로서 기능 설명, 기획 검토, 디자인 검토, 에러 발생 시 추적 및 대응을 해왔습니다.</p>
        </div>

        <!-- Summary Cards -->
        <div class="keywords-grid mb-12">
          <div v-for="card in roleCards" :key="card.title"
            class="keyword-item cursor-pointer hover:shadow-md transition-shadow" @click="scrollToSection(card.id)">
            <h4 class="keyword-title">{{ card.title }}</h4>
            <p class="keyword-description">{{ card.summary }}</p>
            <!-- <div class="mt-4 text-sm text-gray-500 text-right">더 보기 →</div> -->
          </div>
        </div>

        <!-- Detailed Sections -->
        <div class="details-container">
          <!-- Project Structure -->
          <div id="structure" class="detail-section">
            <h3 class="subsection-title">프로젝트 구조 설계 관점</h3>
            <p class="content-description mb-4">프론트엔드 파트의 초반 설계부터 유지 보수까지 모든 과정을 함께했습니다.</p>

            <div class="subsection-card-grid mb-6">
              <div v-for="item in subSectionItems.structure" :key="item.title" class="subsection-card">
                <h5 class="subsection-card-title">{{ item.title }}</h5>
                <p class="subsection-card-desc">{{ item.description }}</p>
              </div>
            </div>

            <h4 class="content-title">프로젝트 구조</h4>
            <ul class="content-list">
              <li class="content-item">
                <strong>3개 앱 구조</strong>: 업박스는 사용자에 따라 3개 앱(어드민, 드라이버, 커스터머)으로 구분됩니다. 어드민 앱은 PC 웹 화면을
                중점적으로 제공됩니다. 드라이버, 커스터머는 모바일 웹 화면을 웹뷰로 띄운 모바일 어플리케이션으로 제공됩니다. 하나의 프로젝트와 빌드 결과물로 3개 앱을
                동시에 제공합니다. 디자인 시스템을 기반으로 설계된 컴포넌트와 톤앤 매너로 제작되었습니다.
              </li>
              <li class="content-item">
                <strong>메뉴 및 Bread Crumb 구조</strong>: 내부 사용자가 사용하는 어드민 앱은 사이드 메뉴와 BreadCrumb 를 표시합니다.
                라우트 경로를 인식하여 선택된 메뉴와 BreadCrumb 를 자동으로 표시할 수 있도록 구성하였습니다.
              </li>
              <li class="content-item">
                <strong>웹뷰</strong>: 메인 기능은 웹으로 제공하되, 네이티브로 필요한 기능을 위해 웹뷰로 래핑하여 모바일 어플리케이션을 제공합니다. 모바일 앱
                개발자가 없으며 적은 공수로 관리하기 위해서 선택하였습니다. 그 중 안드로이드 앱을 개발하고 유지보수하였습니다. 드라이버와 커스터머앱을 하나의 프로젝트에서
                Build Variant 를 구분하여 빌드할 수 있도록 하였습니다.
              </li>
            </ul>

            <h4 class="content-title mt-6">공통 기능 및 동작 설계</h4>
            <ul class="content-list">
              <li class="content-item">
                <strong>폼 데이터 유효성 검증 로직</strong>: 데이터 입력의 조건이 많은 특성 때문에, 입력 유효성 검증을 치밀하게 하고 유저에게 자세하게
                설명하는 것이 중요합니다. 업박스의 컴포넌트와 잘 맞고 원하는대로 커스텀하기 위해 라이브러리가 아닌 직접 시스템을 제작해서 사용하고 있습니다. 유효성 검증과
                form data 로 생성하는 기능을 구현했습니다.
              </li>
              <li class="content-item">
                <strong>Popup 기능</strong>: 많은 UI를 Popup으로 표현하며, Popup 을 사용하는 데에 부담이 없어야 합니다. 개발자가 가장 간단한
                방법으로 사용할 수 있도록 구현했습니다.
              </li>
              <li class="content-item">
                <strong>Toast 기능</strong>: 사용지에게 기능 동작의 결과를 전달하는 데 가장 많이 사용합니다. Toast 는 화면 상단에서 일정 시간동안
                보여주고 사라지며, 원할 때 지울 수도 있어야 합니다. 직관적이고 간단하게 Toast 에 메세지를 추가하고 관리할 필요 없도록 구현했습니다.
              </li>
              <li class="content-item">
                <strong>데이터 테이블 구현</strong>: 데이터를 테이블로 표현하는 UI가 많으며, 필드의 개수가 많습니다. 가장 많이 사용하는 기능을 모아
                직관적으로 사용할 수 있도록 구성했습니다. 조회항목을 조정하거나, 순서, 너비, 한번에 보여지는 개수를 커스텀합니다.
              </li>
              <li class="content-item">
                <strong>권한 체계</strong>: 업박스는 사용자의 권한 별로 제공하는 UI 및 API 동작이 달라집니다. 프론트에서 권한 정보를 관리하고,
                갱신하거나 삭제합니다.
              </li>
            </ul>
          </div>

          <!-- Development Improvements -->
          <div id="improvement" class="detail-section">
            <h3 class="subsection-title">개발 개선 관점</h3>
            <p class="content-description mb-4">문제점과 개선점을 찾아 더 나은 프로젝트를 만들어왔습니다.</p>

            <div class="subsection-card-grid mb-6">
              <div v-for="item in subSectionItems.improvement" :key="item.title" class="subsection-card">
                <h5 class="subsection-card-title">{{ item.title }}</h5>
                <p class="subsection-card-desc">{{ item.description }}</p>
              </div>
            </div>

            <ul class="content-list">
              <li class="content-item">
                <strong>DTO 와 모델 구조</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 같은 스키마이지만 리스트 조회, 상세 조회 등 다양한 형태의
                    DTO가 존재하여 관리가 어려웠습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> 모든 DTO를 아우르는 하나의 통합 모델을 설계하고, 각 DTO와
                    모델 간의 상호 변환(Bridge) 로직을 구현하여 프론트엔드에서는 통합 모델만 핸들링하도록 구조화했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 모델의 정보만 정확하다면 어떤 DTO로도 변환이 가능해져 데이터 관리의 일관성과 개발
                    편의성을 확보했습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>CI/CD 개선</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 초기에는 빌드와 배포가 통합되어 있어 실패 시 대응이 어렵고,
                    백엔드 배포 시간과의 동기화가 힘들어 서비스 순단 발생 위험이 컸습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> CI(빌드)와 CD(배포)를 분리하고 Github Actions와
                    Release 기능을 활용해 자동화했습니다. 3개 앱의 빌드 파이프라인을 독립적으로 구성했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 원하는 시점에 정확한 버전으로 배포 및 롤백이 가능해졌으며, 한 앱의 배포가 다른 앱에
                    영향을 주지 않는 안정적인 배포 환경을 구축했습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>모바일 푸시</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 서버에서 푸시 데이터를 저장하지 않아 프론트엔드에서 기기별 푸시
                    데이터 관리 및 웹뷰-네이티브 간 데이터 동기화가 필요했습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> 포그라운드에서는 웹뷰로 직접 전달, 백그라운드에서는 Android
                    Room DB에 저장 후 앱 실행 시 웹뷰로 전달하는 이원화된 처리 로직을 구현했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 앱의 상태(Foreground/Background)에 관계없이 푸시 데이터 누락 없이
                    안정적인 알림 및 데이터 처리가 가능해졌습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>웹뷰 캐시 개선</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 배포 후에도 사용자 기기에 남아있는 이전 버전의 웹뷰 캐시로 인해
                    버그 발생 및 업무 지장을 초래했습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> CI 과정에서 버전 정보를 파일 서버에 업로드하고, 앱 실행 시
                    이를 대조하여 강제 업데이트를 유도하는 버전 체킹 컴포넌트를 도입했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 모든 사용자가 항상 최신 버전의 앱을 사용하도록 보장하여 구버전 캐시로 인한 잠재적 오류를
                    원천 차단했습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>TailwindCSS 도입</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 파편화된 스타일 속성과 매번 정의해야 하는 단일 클래스로 인해
                    디자인 일관성 유지 어려움 및 개발 피로도가 증가했습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> TailwindCSS를 도입하여 Typography,
                    Spacing, Color 등 디자인 시스템을 유틸리티 클래스 체계로 통합했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 직관적인 클래스 사용으로 마크업 양 감소 및 디자인 시스템의 일관된 적용으로 개발 생산성이
                    대폭 향상되었습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>i18n 도입</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 코드 내 하드코딩된 문자열로 인해 용어 통일이 어렵고 다국어 지원
                    확장이 불가능했습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> i18n 라이브러리를 도입하여 모든 정적 문자열을 리소스 파일로
                    분리하고, 본부와 협업하여 용어집(Glossary) 정립 및 인도네시아어 등 다국어를 추가했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 용어의 일관성 확보 및 글로벌 서비스 확장을 위한 기반을 마련했으며, 인도네시아 앱 개발
                    시 리소스 재활용으로 개발 시간이 단축되었습니다.</p>
                </div>
              </li>
              <li class="content-item">
                <strong>데이터독으로 사용성 개선</strong>
                <div class="mt-2 pl-2">
                  <p class="mb-1"><span class="font-bold text-gray-700">문제:</span> 사용자 행동에 대한 정량적 데이터 부족으로 UI/UX 개선 시
                    직관에 의존해야 하는 한계가 있었습니다.</p>
                  <p class="mb-1"><span class="font-bold text-gray-700">과정:</span> Datadog RUM 및 Product Analytics를 연동하여
                    사용자 트래픽, 클릭 흐름, 에러 로그 등을 시각화하고 분석했습니다.</p>
                  <p><span class="font-bold text-gray-700">결과:</span> 데이터 기반의 의사결정 문화가 정착되었으며, 실제 사용 빈도가 높은 기능을 중심으로 UI를
                    개편하여 사용자 경험이 실질적으로 개선되었습니다.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Business Problems -->
          <div id="business" class="detail-section">
            <h3 class="subsection-title">비즈니스 문제 해결 관점</h3>
            <p class="content-description mb-4">폐기물 수집운반 서비스 관점에서 비즈니스 과제를 팀과 함께 해결해왔습니다.</p>

            <div class="subsection-card-grid mb-6">
              <div v-for="item in subSectionItems.business" :key="item.title" class="subsection-card">
                <h5 class="subsection-card-title">{{ item.title }}</h5>
                <p class="subsection-card-desc">{{ item.description }}</p>
              </div>
            </div>

            <ul class="content-list">
              <li class="content-item">
                지도에 기반한 스케줄 편집 기능을 주로 담당했습니다. 프론트엔드에서 가장 많은 기능과 정책이 담겨 있는 영역입니다. 기사님의 수거 일정과 동선을 정의하는
                단계로 실질적으로 업무를 할당하는 중요한 단계입니다. 이 과정에서 사용자가 법적으로 알맞은 곳에서 수거하여 처리할 수 있도록 친절하게 안내하는 것에
                집중하였습니다.
              </li>
              <li class="content-item">
                폐기물은 법적 리스트에 매우 민감합니다. 고객들의 올바로 시스템 등록 과정을 자동화하고, 처리 상태를 표시합니다.
              </li>
              <li class="content-item">
                고객과의 계약 관리를 위해 전자계약을 사용합니다. 업박스의 계약 데이터와 전자계약 서비스의 계약과 연동하여, 전자계약을 바로 확인하고 관계자들에게 계약서
                정보를 전송하고 계약 승인 시스템을 구현했습니다.
              </li>
              <li class="content-item">
                기사님의 수거 과정에서 GPS 정보를 수집합니다. 데이터는 동선을 파악하고 경로 최적화를 위한 발판으로 사용됩니다.
              </li>
              <li class="content-item">
                폐기물은 신고/허가 정보에 따라 정해진 곳에서 수거하여 정해진 곳에서 처리해야 합니다. 이 정보를 데이터화하고, 수거 스케줄이 적법하고 유효한지 사용자에게
                피드백을 제공합니다.
              </li>
            </ul>
          </div>

          <!-- Collaboration -->
          <div id="collaboration" class="detail-section">
            <h3 class="subsection-title">협업 관점</h3>

            <div class="subsection-card-grid mb-6">
              <div v-for="item in subSectionItems.collaboration" :key="item.title" class="subsection-card">
                <h5 class="subsection-card-title">{{ item.title }}</h5>
                <p class="subsection-card-desc">{{ item.description }}</p>
              </div>
            </div>

            <ul class="content-list">
              <li class="content-item">
                <strong>기획 및 디자인 논의</strong>: 기사님의 연령 특성상 한번에 많은 작업이 가능하지만 복잡한 UI 보다는 간단하고 직렬적인 UI 가
                적합함을 피드백하고 채택되었습니다.
              </li>
              <li class="content-item">
                데이터의 수정 페이지에서 조회만 가능한 데이터는 Form 컴포넌트일 필요 없음을 전달하고 결정했습니다.
              </li>
              <li class="content-item">
                Chip 의 font-weight 가 400이었는데 잘 안보이는 거 같다고 주제가 나와서, 바로 프론트에서 조정해서 확인해보자고 제안했습니다. 빠르게 실제
                화면에서 확인하고 바로 컴포넌트의 유형을 추가하기로 결정을 내렸습니다.
              </li>
              <li class="content-item">
                정산 과정 중 입출금 내역의 처리와 관련하여 PO에서 함께 아이디어를 모아보길 원하였습니다. 복잡한 상태를 관리하는 것보다, 환불 프로세스를 따로 분리하여
                직관적으로 관리할 수 있도록 의견을 제시했고 받아들여졌습니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './project-styles.scss';

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 16px;

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
  }
}

.team-grid {
  .member-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;

    @media (max-width: 720px) {
      gap: 10px;
    }
  }

  .member-role {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid #ececec;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  .member-role-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .member-role-placeholder {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f0f0f0;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }

  .member-role-text {
    font-weight: 600;
    color: #2c2c2c;
  }

  .member-role-count {
    margin-left: 4px;
    font-weight: 500;
    color: #8a8a8a;
  }
}
</style>
