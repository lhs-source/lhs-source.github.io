<script setup lang="ts">
const profileSummary = {
  name: '이현수',
  title: '프론트엔드 개발자',
  experience: '8년차 (2017 ~ 현재)',
  narrative:
    '업박스 클라우드의 핵심 멤버로 스타트업의 빠른 변화 속에서 제품의 일관성과 성장을 동시에 만들어온 문제 해결형 개발자입니다. 사용자 경험을 비즈니스 성과로 연결하는 것을 목표로 설계부터 배포까지 전 과정을 책임집니다.',
  focusPoints: [
    'Vue3와 TypeScript 기반 엔터프라이즈 웹앱 설계 및 운영',
    'Android WebView와 네이티브 연동을 아우르는 하이브리드 환경 경험',
    'Data 기반 의사결정과 배포 파이프라인 자동화로 운영 효율 향상',
  ],
  contact: [
    { label: 'Email', value: 'iddms5446@gmail.com' },
    { label: 'GitHub', value: 'github.com/lhs-source' },
  ],
};
</script>

<template>
  <div class="about-page">
    <div class="intro-section">
      <p class="intro-text">
        나중에 언제 보더라도, 빠른 파악이 가능하게끔 직관적으로 설계합니다.
        백오피스 특성 상 UI의 빠른 피드백이 중요하고, 필요한 정보를 최대한 제공해야 한다.
      </p>
    </div>

    <div class="profile-section">
      <h2 class="section-title">{{ profileSummary.name }}</h2>
      <h3 class="section-subtitle">{{ profileSummary.title }} · {{ profileSummary.experience }}</h3>
      
      <p class="narrative">{{ profileSummary.narrative }}</p>

      <div class="focus-points">
        <h4 class="focus-title">주요 경험</h4>
        <ul class="focus-list">
          <li v-for="(point, index) in profileSummary.focusPoints" :key="index">
            {{ point }}
          </li>
        </ul>
      </div>

      <div class="contact-section">
        <h4 class="contact-title">연락처</h4>
        <div class="contact-list">
          <div v-for="(item, index) in profileSummary.contact" :key="index" class="contact-item">
            <span class="contact-label">{{ item.label }}:</span>
            <span class="contact-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
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

.intro-section {
  margin-bottom: 64px;
}

.intro-text {
  font-size: 18px;
  line-height: 1.8;
  color: #475569;
  margin: 0;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-title {
  font-size: 40px;
  line-height: 1.2;
  margin: 0;
  color: #0f172a;
  font-weight: 600;
}

.section-subtitle {
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  color: #64748b;
  font-weight: 400;
}

.narrative {
  font-size: 16px;
  line-height: 1.8;
  color: #334155;
  margin: 0;
}

.focus-points {
  margin-top: 8px;
}

.focus-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.focus-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.focus-list li {
  font-size: 15px;
  line-height: 1.7;
  color: #475569;
  padding-left: 24px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 8px;
    color: #3b82f6;
    font-weight: bold;
  }
}

.contact-section {
  margin-top: 8px;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
}

.contact-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  gap: 12px;
  font-size: 15px;
  line-height: 1.6;
}

.contact-label {
  color: #64748b;
  font-weight: 500;
  min-width: 60px;
}

.contact-value {
  color: #1e293b;
}
</style>

