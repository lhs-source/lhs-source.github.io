<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 프로젝트 목록 데이터
const projects = [
  {
    id: 'upbox-cloud',
    title: 'Upbox Cloud',
    subtitle: '리코 · 폐기물 매니지먼트 클라우드 (2021.01 ~ 진행중)',
    description: '업박스 클라우드의 프론트엔드 핵심 멤버로 초기 1.0 온보딩부터 2.0 론칭, 2.x 운영까지 전체 흐름을 리드한 경험입니다.',
  },
  {
    id: 'rico-homepage',
    title: '리코 & 업박스 홈페이지',
    subtitle: '리코 · 웹사이트 제작/운영 (2021 ~ 상시)',
    description: '회사 및 제품 소개 홈페이지를 제작하고 마케팅 팀과 협업하여 인바운드 측정을 위한 데이터를 설계·운영했습니다.',
  },
  {
    id: 'datadog-talk',
    title: 'Datadog Observability 발표',
    subtitle: 'Datadog Korea Observability Day 2024',
    description: '웨이스트 매니지먼트 스타트업에서 Datadog으로 에러 대응·사용성 측정·데이터 기반 의사결정 체계를 구축한 경험을 공유한 세션입니다.',
  },
  {
    id: 'bankb-bankb',
    title: '뱅크비 통합계좌관리',
    subtitle: '뱅크비 · C/C++ (2019.09 ~ 2020.12)',
    description: '베트남 은행 계좌를 통합 조회·관리하는 모바일 서비스의 스크래핑 모듈과 핵심 계좌 연동 로직을 담당했습니다.',
  },
  {
    id: 'omnidoc',
    title: 'Omnidoc 문서발급 솔루션',
    subtitle: '뱅크비 · C/C++ (2019.04 ~ 2020.12)',
    description: '다수의 민원 사이트에서 다양한 문서를 자동 발급하는 솔루션의 스크래핑 모듈 개발을 담당했습니다.',
  },
  {
    id: 'open-approval',
    title: '오픈망 직승인 프로젝트',
    subtitle: '뱅크비 · Spring Boot (2018.08 ~ 2019.03)',
    description: '카드사·가맹점 직승인 클라우드 POS 환경에서 테스트용 더미 카드사 서버와 결제 관련 기능을 구현했습니다.',
  },
  {
    id: 'hana-1qpay',
    title: '하나1QPay NFC 모듈',
    subtitle: '뱅크비 · Java, C/C++ (2017.06 ~ 2018.08)',
    description: 'NFC 결제 모듈과 보안 토큰화, Whitebox 암호화 모듈 연동 등 보안·결제 영역을 담당했습니다.',
  },
  {
    id: 'tasim',
    title: 'TaSIM 카드 암호화 모듈',
    subtitle: '뱅크비 · Java Card OS (2017.01 ~ 2017.06)',
    description: '가맹점 단말기와 카드사 간 E2E 암호화를 제공하는 임베디드 카드 암호화 모듈의 Applet 및 관리 도구를 개발했습니다.',
  },
  {
    id: 'freelance-projects',
    title: '프리랜서 & 사이드 프로젝트',
    subtitle: 'MGX, KlookPay 등 (2020 ~ 2021)',
    description: '모바일 게임 시세조회 앱과 결제 POC 등 프리랜서 및 개인 프로젝트를 한 메뉴에서 모아 소개합니다.',
  },
  // 추가 프로젝트는 여기에 추가
];

const currentProjectId = computed(() => route.params.project as string | undefined);

function navigateToProject(projectId: string) {
  router.push(`/portfolio2/${projectId}`);
}

function navigateToHome() {
  router.push('/portfolio2');
}
</script>

<template>
  <div class="portfolio2-wrapper">
    <div class="portfolio2-container">
      <!-- 왼쪽 사이드바 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h1 @click="navigateToHome" class="sidebar-title">이현수 Portfolio</h1>
        </div>
        <nav class="sidebar-nav">
          <div 
            class="nav-item" 
            :class="{ active: !currentProjectId }"
            @click="navigateToHome"
          >
            <span class="nav-item-label">소개</span>
          </div>
          <div class="nav-divider"></div>
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="nav-item"
            :class="{ active: currentProjectId === project.id }"
            @click="navigateToProject(project.id)"
          >
            <span class="nav-item-label">{{ project.title }}</span>
            <span class="nav-item-subtitle">{{ project.subtitle }}</span>
          </div>
        </nav>
      </aside>

      <!-- 메인 컨텐츠 영역 -->
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');

.portfolio2-wrapper {
  min-height: 100vh;
  color: #111111;
  font-family: 'Noto Serif KR', 'Noto Serif', serif;
  font-weight: 300;
  background-repeat: repeat;
  background:
    linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)),
    url('/assets/gray-dirty-paperboard_95678-93.avif');
  background-size: 626px 443px;
}

.portfolio2-container {
  display: flex;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

.sidebar {
  width: 280px;
  min-width: 280px;
  background-color: transparent;
  border-right: 1px solid #999966;
  padding: 32px 24px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 32px;
}

.sidebar-title {
  font-size: 24px;
  line-height: 1.2;
  margin: 0;
  color: #111111;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #b45309;
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    background-color: rgba(214, 211, 196, 0.7);
  }

  &.active {
    background-color: rgba(188, 181, 164, 0.9);
    color: #433021;
    font-weight: 500;
  }
}

.nav-item-label {
  font-size: 15px;
  line-height: 1.4;
  font-weight: 500;
}

.nav-item-subtitle {
  font-size: 12px;
  color: #111111;
  line-height: 1.3;
}

.nav-item.active .nav-item-subtitle {
  color: #050505;
}

.nav-divider {
  height: 1px;
  background-color: #999966;
  margin: 12px 0;
}

.main-content {
  flex: 1;
  padding: 80px 64px 160px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  color: #111111;
  font-size: 15px;
  line-height: 1.8;
}

.main-content :deep(p),
.main-content :deep(li),
.main-content :deep(span),
.main-content :deep(h1),
.main-content :deep(h2),
.main-content :deep(h3),
.main-content :deep(h4),
.main-content :deep(h5),
.main-content :deep(h6) {
  color: #111111;
}

.main-content :deep(p),
.main-content :deep(li),
.main-content :deep(span) {
  font-weight: 600;
}
</style>
