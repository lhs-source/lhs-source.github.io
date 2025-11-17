<script setup lang="ts">
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">리코 &amp; 업박스 홈페이지</h1>
      <h2 class="project-subtitle">리코 · 웹사이트 제작/운영 (2021 ~ 상시)</h2>

      <div class="project-description">
        회사 소개 및 제품 인바운드를 목표로 하는 리코/업박스 홈페이지를 제작하고,
        마케팅 팀과 함께 지표 설계·운영을 진행했습니다.
      </div>

      <div class="project-body">
        <div class="project-text">
          리코 홈페이지와 업박스 제품 홈페이지를 제작·운영하며,<br>
          회사가 전달하고 싶은 메시지와 실제 유입 데이터를 연결하는 작업을 담당했습니다.<br><br>

          주요 내용:<br><br>
          - 회사/제품 소개 페이지 정보 구조(IA) 설계<br>
          - 마케팅팀과 협업하여 유입 채널 및 전환 지표 정의<br>
          - 이벤트·캠페인에 맞춘 랜딩 페이지 개편과 유지보수<br><br>

          개발 관점에서는 심플한 구조를 유지하면서도,<br>
          운영자가 쉽게 수정 가능한 구조를 고민하여 구현했습니다.<br>
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
