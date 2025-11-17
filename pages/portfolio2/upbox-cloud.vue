<script setup lang="ts">
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">Upbox Cloud</h1>
      <h2 class="project-subtitle">리코 · 폐기물 매니지먼트 클라우드 (2021.01 ~ 진행중)</h2>

      <div class="project-description">
        폐기물 처리 전 과정을 데이터화하여 투명하게 관리하는 업박스 클라우드의 프론트엔드 핵심 멤버로,
        1.0 온보딩부터 2.0 론칭, 현재 2.x 운영까지 전체 흐름을 리드한 경험입니다.
      </div>

      <div class="project-body">
        <div class="project-text">
          업박스 클라우드는 폐기물 산업의 복잡한 행정·법적 요구사항을 디지털화하여,
          기사님과 업장, 본사를 하나의 흐름으로 연결하는 클라우드 서비스입니다.<br><br>

          이 프로젝트에서는 다음과 같은 역할을 담당했습니다.<br><br>

          - 업박스 어드민 핵심 화면(고객·계약·폐기물 처리·청구 데이터 관리) 설계 및 구현<br>
          - 복잡한 조건과 권한 체계를 반영한 폼/테이블 UX 설계 및 검증 로직 구현<br>
          - 지도 기반 수거 일정 관리(업장 위치, 방문 일정 최적화) 화면 개발<br>
          - 전자계약, 가상계좌, 자동이체, 채널톡 등 외부 서비스 연동<br><br>

          또한 프론트엔드 리드로서 다음을 정비했습니다.<br><br>

          - Vue3, TypeScript, Vite 기반 FE 아키텍처 설계<br>
          - 디자인팀과 함께 UDS(Upbox Design System) 수립 및 컴포넌트 가이드화<br>
          - i18n 도입을 통한 용어 통일 및 해외 진출 대비<br><br>

          운영 효율 측면에서는 Datadog, Github Actions를 적극 도입하여:<br><br>

          - Sourcemap 업로드 자동화 및 에러 추적 대시보드 구성<br>
          - 배포 파이프라인 최적화로 배포 시간 단축 및 롤백 프로세스 정비<br>
          - 사용성 측정(액션 로그, 퍼널 분석)을 통한 데이터 기반 의사결정 체계를 구축했습니다.<br>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./project-common.scss"></style>
