<script setup lang="ts">
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">뱅크비 통합계좌관리</h1>
      <h2 class="project-subtitle">뱅크비 · C/C++ (2019.09 ~ 2020.12)</h2>

      <div class="project-description">
        베트남 여러 은행을 자동으로 연결해 계좌를 통합 조회하는 모바일 서비스의
        스크래핑 모듈과 핵심 로직을 담당했습니다.
      </div>

      <div class="project-body">
        <div class="project-text">
          베트남 은행을 자동으로 연결해 입출금 내역을 조회하고,<br>
          여러 계좌를 한 번에 관리할 수 있는 통합계좌관리 서비스입니다.<br><br>

          담당 역할:<br><br>
          - 각 은행(BIDV, Vietcom, TP 등)에 대한 스크래핑 모듈 개발(C/C++)<br>
          - 은행별 로그인/보안 정책 차이에 대응하는 공통 모듈 설계<br>
          - 크로스 플랫폼 CMake 빌드 환경 구성<br><br>

          추가로, 베트남 현지에서 직접 협력사와 업무를 진행하며:<br><br>
          - 현지 금융 환경과 네트워크 특성을 이해하고,<br>
          - 실제 사용자 시나리오에 맞춘 에러 케이스 보완 작업을 수행했습니다.<br>
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
