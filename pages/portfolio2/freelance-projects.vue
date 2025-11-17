<script setup lang="ts">
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">프리랜서 &amp; 사이드 프로젝트</h1>
      <h2 class="project-subtitle">MGX, KlookPay 등 (2020 ~ 2021)</h2>

      <div class="project-description">
        업무 시간 외에 진행했던 프리랜서 및 사이드 프로젝트를 한 곳에서 정리했습니다.
        실 서비스 런칭과 PoC를 모두 경험했습니다.
      </div>

      <div class="project-body">
        <div class="project-text">
          프리랜서와 사이드 프로젝트를 통해 다양한 도메인과 기술 스택을 경험했습니다.<br><br>

          1) MGX 모바일 게임 시세조회 어플리케이션 (React Native)<br><br>
          - 리니지M/리니지2M/바람의나라 등 모바일 게임의 아이템 시세 조회·추이·검색 기능 개발<br>
          - 소식 전하기, 커뮤니티 기능 구현<br>
          - Firebase 기반 구글 로그인, 카카오 로그인 연동<br><br>

          2) KlookPay POC 어플리케이션 (NodeJS, Angular, NativeScript)<br><br>
          - KB카드 마일리지·포인트·결제 시스템을 Klook에 연동하는 POC 프로젝트<br>
          - Nativescript-ng 기반 안드로이드 앱 기술 지원<br>
          - 개인 JIRA를 활용한 일정 관리와 태스크 트래킹으로, 1인 진행 환경에서도 체계적인 개발 프로세스를 유지했습니다.<br><br>

          업무 외 프로젝트를 통해 새로운 스택을 빠르게 학습하고,<br>
          작은 팀 혹은 개인 단위로도 제품을 끝까지 완성하는 경험을 쌓았습니다.<br>
        </div>
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
}
</style>
