<script setup lang="ts">
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">오픈망 직승인 프로젝트</h1>
      <h2 class="project-subtitle">뱅크비 · Spring Boot (2018.08 ~ 2019.03)</h2>

      <div class="project-description">
        카드사와 가맹점 간 E2E 보안을 제공하는 클라우드 POS 환경에서,
        테스트용 더미 카드사 서버와 가맹점 관리 기능을 구현했습니다.
      </div>

      <div class="project-body">
        <div class="project-text">
          오픈망 직승인 프로젝트는 VAN사를 통하지 않고 카드사와 가맹점 간 직접 통신을 수행하는 클라우드 POS 서비스입니다.<br><br>

          담당 역할:<br><br>
          - 카드사 승인/매입 프로세스를 테스트하기 위한 더미 카드사 서버 구현 (Spring Boot, JPA, MySQL)<br>
          - VAN사가 제공하는 가맹점 관리, 결제내역 조회 기능을 직접 구현<br><br>

          결제/승인 시스템의 전체 플로우와 보안 요구사항을 이해하고,<br>
          테스트 환경을 스스로 만들면서 결제 도메인에 대한 이해를 넓힌 경험입니다.<br>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./project-common.scss"></style>
