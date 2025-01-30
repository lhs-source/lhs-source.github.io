<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  direction?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left'
});

const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!containerRef.value || !contentRef.value) return;

  // 컨테이너를 채우기 위해 필요한 반복 횟수 계산
  const containerWidth = containerRef.value.offsetWidth;
  const contentWidth = contentRef.value.offsetWidth;
  const repeatCount = Math.ceil(containerWidth / contentWidth) * 2 + 1; // 여유있게 2배 + 1

  // 텍스트 반복
  const originalText = contentRef.value.innerHTML;
  contentRef.value.innerHTML = originalText.repeat(repeatCount);
});
</script>

<template>
  <div 
    class="scroll-container" 
    ref="containerRef"
    :class="{ 
      'border-bottom': direction === 'left',
      'border-top': direction === 'right'
    }"
  >
    <div 
      class="scroll-content" 
      ref="contentRef"
      :class="{ 'scroll-right': direction === 'right' }"
    >
      <span class="scroll-text">CROW</span>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  /* height: 24px; */
  background-color: #1a1a1a;
  overflow: hidden;
  position: relative;
}

.scroll-container.border-bottom {
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 4px;
}

.scroll-container.border-bottom::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1a1a1a;
}

.scroll-container.border-top {
  border-top: 1px solid #1a1a1a;
}

.scroll-container.border-top::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1a1a1a;
}

.scroll-content {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 20s linear infinite;
}


.scroll-content.scroll-right {
  animation: scroll-right 20s linear infinite;
}

.scroll-text {
  color: #e5e5e5;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 2px;
  margin: 0 12px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style> 