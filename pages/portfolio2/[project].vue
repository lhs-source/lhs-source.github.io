<script setup lang="ts">
import { createError } from 'h3';

// 개별 프로젝트 페이지는 /portfolio2/{id}.vue 파일로 분리되어 있습니다.
// 이 동적 라우트는 잘못된 경로로 접근했을 때 404를 반환하는 Fallback 용도로만 사용합니다.

throw createError({
  statusCode: 404,
  statusMessage: 'Project not found',
});
</script>

<template>
  <div class="project-page">
    <p>존재하지 않는 프로젝트입니다.</p>
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

p {
  font-size: 16px;
  line-height: 1.8;
  color: #475569;
}
</style>

