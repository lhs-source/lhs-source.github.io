<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { createError } from 'h3';

const route = useRoute();
const projectId = computed(() => route.params.project as string);

// 프로젝트 데이터 (실제로는 API나 별도 파일에서 가져올 수 있음)
const projectData: Record<string, any> = {
  'upbox-cloud': {
    title: 'Upbox Cloud',
    subtitle: '리코 · 폐기물 매니지먼트 클라우드 (2021.01 ~ 진행중)',
    description:
      '폐기물 처리 전 과정을 데이터화하여 투명하게 관리하는 업박스 클라우드의 프론트엔드 핵심 멤버로, 1.0 온보딩부터 2.0 론칭, 현재 2.x 운영까지 전체 흐름을 리드했습니다.',
    content: `
업박스 클라우드는 폐기물 산업의 복잡한 행정·법적 요구사항을 디지털화하여, 기사님과 업장, 본사를 하나의 흐름으로 연결하는 클라우드 서비스입니다.

이 프로젝트에서는 다음과 같은 역할을 담당했습니다.

- 업박스 어드민 핵심 화면(고객·계약·폐기물 처리·청구 데이터 관리) 설계 및 구현
- 복잡한 조건과 권한 체계를 반영한 폼/테이블 UX 설계 및 검증 로직 구현
- 지도 기반 수거 일정 관리(업장 위치, 방문 일정 최적화) 화면 개발
- 전자계약, 가상계좌, 자동이체, 채널톡 등 외부 서비스 연동

또한 프론트엔드 리드로서 다음을 정비했습니다.

- Vue3, TypeScript, Vite 기반 FE 아키텍처 설계
- 디자인팀과 함께 UDS(Upbox Design System) 수립 및 컴포넌트 가이드화
- i18n 도입을 통한 용어 통일 및 해외 진출 대비

운영 효율 측면에서는 Datadog, Github Actions를 적극 도입하여

- Sourcemap 업로드 자동화 및 에러 추적 대시보드 구성
- 배포 파이프라인 최적화로 배포 시간 단축 및 롤백 프로세스 정비
- 사용성 측정(액션 로그, 퍼널 분석)을 통한 데이터 기반 의사결정 체계를 구축했습니다.
    `,
  },
  'rico-homepage': {
    title: '리코 & 업박스 홈페이지',
    subtitle: '리코 · 웹사이트 제작/운영 (2021 ~ 상시)',
    description:
      '회사 소개 및 제품 인바운드를 목표로 하는 리코/업박스 홈페이지를 제작하고, 마케팅 팀과 함께 지표 설계·운영을 진행했습니다.',
    content: `
리코 홈페이지와 업박스 제품 홈페이지를 제작·운영하며, 회사가 전달하고 싶은 메시지와 실제 유입 데이터를 연결하는 작업을 담당했습니다.

주요 내용

- 회사/제품 소개 페이지 정보 구조(IA) 설계
- 마케팅팀과 협업하여 유입 채널 및 전환 지표 정의
- 이벤트·캠페인에 맞춘 랜딩 페이지 개편과 유지보수

개발 관점에서는 심플한 구조를 유지하면서도, 운영자가 쉽게 수정 가능한 구조를 고민하여 구현했습니다.
    `,
  },
  'bankb-bankb': {
    title: '뱅크비 통합계좌관리',
    subtitle: '뱅크비 · C/C++ (2019.09 ~ 2020.12)',
    description:
      '베트남 여러 은행을 자동으로 연결해 계좌를 통합 조회하는 모바일 서비스의 스크래핑 모듈과 핵심 로직을 담당했습니다.',
    content: `
베트남 은행을 자동으로 연결해 입출금 내역을 조회하고, 여러 계좌를 한 번에 관리할 수 있는 통합계좌관리 서비스입니다.

담당 역할

- 각 은행(BIDV, Vietcom, TP 등)에 대한 스크래핑 모듈 개발(C/C++)
- 은행별 로그인/보안 정책 차이에 대응하는 공통 모듈 설계
- 크로스 플랫폼 CMake 빌드 환경 구성

추가로, 베트남 현지에서 직접 협력사와 업무를 진행하며

- 현지 금융 환경과 네트워크 특성을 이해하고
- 실제 사용자 시나리오에 맞춘 에러 케이스 보완 작업을 수행했습니다.
    `,
  },
  omnidoc: {
    title: 'Omnidoc 문서발급 솔루션',
    subtitle: '뱅크비 · C/C++ (2019.04 ~ 2020.12)',
    description:
      '여러 민원 사이트에서 다양한 문서를 자동 발급하는 솔루션에서, 주요 사이트 스크래핑 모듈을 담당했습니다.',
    content: `
Omnidoc은 17여 개 민원 사이트에서 40여 종의 민원 문서를 자동 발급해주는 솔루션입니다.

담당 역할

- 금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등 주요 사이트 스크래핑 담당
- 사이트별 보안/인증 흐름을 분석하고, 변경에 대응하기 위한 구조 설계

민원 특성상 장애 허용 범위가 매우 낮기 때문에, 장애 시 빠르게 원인을 파악할 수 있도록 로깅과 모듈 구조를 세심하게 설계했습니다.
    `,
  },
  'open-approval': {
    title: '오픈망 직승인 프로젝트',
    subtitle: '뱅크비 · Spring Boot (2018.08 ~ 2019.03)',
    description:
      '카드사와 가맹점 간 E2E 보안을 제공하는 클라우드 POS 환경에서, 테스트용 더미 카드사 서버와 가맹점 관리 기능을 구현했습니다.',
    content: `
오픈망 직승인 프로젝트는 VAN사를 통하지 않고 카드사와 가맹점 간 직접 통신을 수행하는 클라우드 POS 서비스입니다.

담당 역할

- 카드사 승인/매입 프로세스를 테스트하기 위한 더미 카드사 서버 구현 (Spring Boot, JPA, MySQL)
- VAN사가 제공하는 가맹점 관리, 결제내역 조회 기능을 직접 구현

결제/승인 시스템의 전체 플로우와 보안 요구사항을 이해하고, 테스트 환경을 스스로 만들면서 결제 도메인에 대한 이해를 넓힌 경험입니다.
    `,
  },
  'hana-1qpay': {
    title: '하나1QPay NFC 결제 모듈',
    subtitle: '뱅크비 · Java, C/C++ (2017.06 ~ 2018.08)',
    description:
      '하나카드 1QPay 앱 내 NFC 결제 모듈을 유지보수하며, EMV 스펙과 토큰화 기반 보안 구조를 이해하고 개선했습니다.',
    content: `
하나카드 1QPay 앱에 탑재되는 NFC 모듈로, EMV 스펙 기반의 HCE 결제 통신과 토큰화 보안을 제공합니다.

담당 역할

- Android Java/JNI를 활용한 NFC 결제 모듈 유지보수
- VISA 토큰 발급 및 EMV 결제 스펙 분석·적용
- C++로 구현된 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 빌드하고, JNI로 연동

보안 모듈을 실제 상용 서비스에 적용하며, 모바일 결제 보안 체계 전반을 경험한 프로젝트입니다.
    `,
  },
  tasim: {
    title: 'TaSIM 카드 암호화 모듈',
    subtitle: '뱅크비 · Java Card OS (2017.01 ~ 2017.06)',
    description:
      '가맹점 단말기와 카드사 간 E2E 암호화를 제공하는 임베디드 카드 암호화 모듈의 Applet과 관리 도구를 개발했습니다.',
    content: `
TaSIM은 카드사와 가맹점 사이의 E2E 암호화를 수행하는 임베디드 카드 암호화 모듈입니다.

담당 역할

- Java Card OS 상에서 동작하는 암호화 Applet 개발 및 유지보수
- 가맹점 단말기에 Applet을 탑재하고 관리하기 위한 MFC 기반 설치 도구 개발

카드 결제 단말의 제한된 환경에서 동작하는 암호화 모듈을 다루며, 저수준 시스템과 보안의 접점을 경험했습니다.
    `,
  },
  'datadog-talk': {
    title: 'Datadog Observability 발표',
    subtitle: 'Datadog Korea Observability Day 2024',
    description:
      '웨이스트 매니지먼트 스타트업 프론트엔드 개발자로서 Datadog을 활용해 에러 분석과 사용성 측정, 데이터 기반 의사결정을 정착시킨 경험을 공유한 세션입니다.',
    content: `
Datadog Korea Observability Day 2024에서 "웨이스트 매니지먼트 스타트업 프론트엔드 개발자의 Datadog을 활용한 효율적인 모니터링 시스템 구축기"라는 주제로 발표했습니다.

발표 주요 내용

- 에러 대응
  - HEIC 파일 형식 업로드 이슈를 Datadog 에러 스택과 로그를 통해 빠르게 파악하고, 업로드 파이프라인을 개선한 사례
  - 서비스 특성에 맞는 대시보드와 알림 룰 구성
- 데이터 기반 의사결정
  - 실제 사용량 데이터를 바탕으로 배포 시간대를 조정하여 장애 리스크와 사용자 불편 최소화
  - OS/기기 비율 분석을 통해 우선 지원 환경을 결정
- 사용성 측정
  - Custom Action을 활용해 주요 행동 퍼널을 정의하고, 단계별 이탈 지점을 분석

스타트업 환경에서 "감"이 아닌 데이터 기반으로 제품·운영 의사결정을 내릴 수 있도록 만든 여정을 공유했습니다.
    `,
  },
  'freelance-projects': {
    title: '프리랜서 & 사이드 프로젝트',
    subtitle: 'MGX, KlookPay 등 (2020 ~ 2021)',
    description:
      '업무 시간 외에 진행했던 프리랜서 및 사이드 프로젝트를 한 곳에서 정리했습니다. 실 서비스 런칭과 PoC를 모두 경험했습니다.',
    content: `
프리랜서와 사이드 프로젝트를 통해 다양한 도메인과 기술 스택을 경험했습니다.

1) MGX 모바일 게임 시세조회 어플리케이션 (React Native)

- 리니지M/리니지2M/바람의나라 등 모바일 게임의 아이템 시세 조회·추이·검색 기능 개발
- 소식 전하기, 커뮤니티 기능 구현
- Firebase 기반 구글 로그인, 카카오 로그인 연동

2) KlookPay POC 어플리케이션 (NodeJS, Angular, NativeScript)

- KB카드 마일리지·포인트·결제 시스템을 Klook에 연동하는 POC 프로젝트
- Nativescript-ng 기반 안드로이드 앱 기술 지원
- 개인 JIRA를 활용한 일정 관리와 태스크 트래킹으로 1인 진행 환경에서도 체계적인 개발 프로세스를 유지했습니다.

업무 외 프로젝트를 통해 새로운 스택을 빠르게 학습하고, 작은 팀 혹은 개인 단위로도 제품을 끝까지 완성하는 경험을 쌓았습니다.
    `,
  },
};

const project = computed(() => projectData[projectId.value] || null);

// 프로젝트가 없으면 404 처리
if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  });
}
</script>

<template>
  <div class="project-page">
    <div v-if="project" class="project-content">
      <h1 class="project-title">{{ project.title }}</h1>
      <h2 class="project-subtitle">{{ project.subtitle }}</h2>
      
      <div class="project-description">
        {{ project.description }}
      </div>

      <div class="project-body">
        <div class="project-text" v-html="project.content.replace(/\n/g, '<br>')"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-page {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-title {
  font-size: 40px;
  line-height: 1.2;
  margin: 0;
  color: #0f172a;
  font-weight: 600;
}

.project-subtitle {
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  color: #64748b;
  font-weight: 400;
}

.project-description {
  font-size: 18px;
  line-height: 1.8;
  color: #334155;
  margin-top: 8px;
}

.project-body {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
}

.project-text {
  font-size: 16px;
  line-height: 1.8;
  color: #475569;

  :deep(br) {
    margin-bottom: 16px;
  }
}
</style>

