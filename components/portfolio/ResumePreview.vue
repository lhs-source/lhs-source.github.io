<script setup lang="ts">
import dayjs from 'dayjs'

// 이력서 미리보기 데이터 (ResumePaper.vue 기반)
const previewData = {
  name: '이현수',
  title: '프론트엔드 개발자',
  summary: '주도적인 업무 수행과 협업을 통해 팀의 성장을 이끌어가며 지속 가능한 개발을 추구하는 개발자입니다.',
  keywords: ['오너십', '신뢰', '커뮤니케이션', '효율성'],
  mainTech: ['Vue3', 'TypeScript'],
  experience: [
    {
      company: '주식회사 리코',
      period: '2021년 1월 ~ 재직중',
      duration: `약 ${dayjs().diff(dayjs("2021-01-01"), 'year')}년 ${dayjs().diff(dayjs("2021-01-01"), 'month') % 12}개월`,
      position: '프론트엔드 개발자'
    },
    {
      company: '주식회사 뱅크비',
      period: '2017년 1월 ~ 2020년 12월',
      duration: '약 4년',
      position: 'C++ 개발자'
    }
  ],
  totalExperience: `${dayjs().diff(dayjs("2017-01-01"), 'year')}년 ${dayjs().diff(dayjs("2021-01-01"), 'month') % 12}개월`
}
</script>

<template>
  <div class="resume-preview">
    <div class="preview-header">
      <h1 class="preview-name">{{ previewData.name }}</h1>
      <h2 class="preview-title">{{ previewData.title }}</h2>
    </div>
    
    <div class="preview-summary">
      <p class="summary-text">{{ previewData.summary }}</p>
    </div>

    <div class="preview-keywords">
      <div 
        v-for="keyword in previewData.keywords" 
        :key="keyword" 
        class="keyword-tag"
      >
        {{ keyword }}
      </div>
    </div>

    <div class="preview-tech">
      <span class="tech-label">주요 기술:</span>
      <span class="tech-items">{{ previewData.mainTech.join(', ') }}</span>
    </div>

    <div class="preview-experience">
      <div class="experience-item">
        <span class="company-name">{{ previewData.experience[0].company }}</span>
        <span class="experience-period">{{ previewData.experience[0].duration }}</span>
      </div>
      <div class="experience-item">
        <span class="company-name">{{ previewData.experience[1].company }}</span>
        <span class="experience-period">{{ previewData.experience[1].duration }}</span>
      </div>
    </div>

    <div class="preview-footer">
      <span class="total-experience">총 경력: {{ previewData.totalExperience }}</span>
      <span class="click-hint">클릭하여 전체 보기</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resume-preview {
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
  box-sizing: border-box;
  overflow: hidden;
}

.preview-header {
  border-bottom: 2px solid #333;
  padding-bottom: 12px;
  margin-bottom: 4px;

  .preview-name {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: #333;
    line-height: 1.2;
  }

  .preview-title {
    font-size: 11px;
    font-weight: 400;
    margin: 0;
    color: #666;
    line-height: 1.2;
  }
}

.preview-summary {
  flex: 1;
  min-height: 0;

  .summary-text {
    font-size: 9px;
    line-height: 1.6;
    color: #555;
    margin: 0;
    white-space: pre-line;
  }
}

.preview-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;

  .keyword-tag {
    font-size: 8px;
    padding: 3px 6px;
    background: #f0f0f0;
    border-radius: 12px;
    color: #555;
    font-weight: 500;
  }
}

.preview-tech {
  font-size: 8px;
  color: #666;
  margin-top: 4px;

  .tech-label {
    font-weight: 600;
    margin-right: 6px;
  }

  .tech-items {
    color: #333;
  }
}

.preview-experience {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e0e0e0;

  .experience-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8px;

    .company-name {
      font-weight: 600;
      color: #333;
    }

    .experience-period {
      color: #888;
      font-size: 7px;
    }
  }
}

.preview-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
  font-size: 7px;

  .total-experience {
    color: #666;
    font-weight: 500;
  }

  .click-hint {
    color: #999;
    font-style: italic;
    font-size: 6px;
  }
}
</style>

