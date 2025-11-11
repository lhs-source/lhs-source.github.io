<script setup lang="ts">
import ResumePage from './resume.vue';

const portfolioItems = [
  {
    title: '유효성 검사 시스템 경량화',
    subtitle: 'Validation System',
    headline: '사내 디자인 시스템과 100% 호환되는 경량 검증 구조 구축',
    situation:
      '외부 유효성 검사 라이브러리는 사내 디자인 시스템과 호환이 어렵고, 불필요한 기능이 많아 프론트엔드 유지보수가 부담스러웠음.',
    task:
      '경량화된 직접 구현 방식을 도입하고 컴포넌트별 커스텀과 복잡한 유효성 케이스를 지원하는 composable 구조로 새롭게 구성하기로 결정함.',
    action: [
      '외부 라이브러리 의존성을 제거하고 Vue composable 패턴으로 useValidate, useValidateRoot를 개발하여 독립적·전역적 검증이 가능하도록 구성.',
      '디자인 요구와 업무 맥락에 맞춘 옵션을 설계해 다양한 UI 컴포넌트에서 유연하게 재사용할 수 있도록 확장.',
    ],
    result:
      '불필요한 코드가 크게 감소했고 번들 사이즈가 약 15% 축소됨. 사내 디자인 시스템과 100% 호환을 이루며 폼 표준화를 추진할 기반을 마련함.',
  },
  {
    title: '웹뷰 캐시 및 배포 버전 관리',
    subtitle: 'WebView Cache & Release',
    headline: '실시간 버전 관제와 강제 업데이트 도입으로 배포 안정성 확보',
    situation:
      '내부 직원 사용자 위주의 웹앱에서 캐시 때문에 배포 후에도 옛 버전이 지속적으로 로딩되어 기능 버그로 오인되는 상황이 빈번했음.',
    task:
      '실시간 버전 관제와 강제 업데이트 기능을 추가해 캐시로 인한 구버전 사용 문제를 해결하고 배포 안정성을 확보해야 했음.',
    action: [
      'DataDog 세션 리플레이로 버그 발생 시점과 사용 버전을 추적하여 문제 원인을 선제적으로 파악.',
      'CICD 과정에서 S3에 meta.json을 업로드하고 프론트엔드에서 버전 정보를 실시간 비교하여 mismatch 시 안내·업데이트를 유도.',
      'Android 앱에는 Google Play 서비스를 활용한 강제 업데이트 정책을 도입해 운영 일관성을 높임.',
    ],
    result:
      '캐시 오동작 관련 CS 문의가 70% 이상 감소했고, 긴급 배포 대응 속도가 3배 빨라져 운영 안정성이 확보됨.',
  },
  {
    title: '푸시 알림 로컬 저장 구조 개선',
    subtitle: 'Push Notification Persistence',
    headline: 'FCM 알림 누락 0% 달성을 위한 저장 및 전달 구조 리빌딩',
    situation:
      'FCM 푸시 알림이 웹뷰 환경에서 일관되게 저장·전달되지 않아 일부 알림이 손실되는 문제가 발생함.',
    task:
      '앱 Foreground/Background 상태에 관계없이 모든 푸시 알림이 누락 없이 저장되고 전달되도록 구조를 개선해야 했음.',
    action: [
      'Foreground에서는 FCM → 안드로이드 → 웹뷰 → IndexedDB로 이어지는 즉시 저장 파이프라인을 구성.',
      'Background에서는 FCM → Room DB 저장 → 앱 실행 시 웹뷰 전달 → IndexedDB 저장 순서로 안정적인 동기화를 구현.',
    ],
    result:
      '푸시 알림 누락률을 0%로 개선했고, 오프라인 환경에서도 알림 이력을 안정적으로 조회할 수 있는 경험을 제공함.',
  },
  {
    title: '스케줄 편집 화면 구조 개선',
    subtitle: 'Schedule Editor',
    headline: '데이터 흐름 재설계로 렌더링 성능 20% 향상',
    situation:
      '스케줄 편집 화면에서 props drilling이 심각했고 복잡한 데이터 전달로 인해 오류와 성능 저하가 발생했음.',
    task:
      '컴포넌트 간 데이터 공유 방식을 개선해 유지보수성과 렌더링 효율을 동시에 끌어올릴 구조가 필요했음.',
    action: [
      'provide/inject 기반 composable인 useScheduleInjection을 설계해 필요한 데이터만 우아하게 주입하도록 구조화.',
      '정적 분석을 통해 데이터 누락을 방지하고 각 컴포넌트가 맡은 책임에 집중하도록 재배치.',
    ],
    result:
      '코드량을 약 25% 축소했고, 렌더링 성능을 20% 개선하여 신규 모듈 투입 시 props 연결 실수 없이 안정성을 확보함.',
  },
];
</script>

<template>
  <div class="portfolio-page">
    <section class="portfolio-hero">
      <div class="hero-label">Portfolio</div>
      <h1 class="hero-title">문제 해결 중심 프론트엔드 포트폴리오</h1>
      <p class="hero-description">
        복잡한 제품 환경에서 비즈니스 가치를 빠르게 전달하기 위해 STAR 사고방식으로 문제를 정의하고 실행합니다.
        아래 사례는 실제 조직에 도입해 성과를 만든 프로젝트들입니다.
      </p>
    </section>

    <section class="portfolio-list">
      <article
        v-for="item in portfolioItems"
        :key="item.title"
        class="portfolio-card"
      >
        <header class="card-header">
          <div>
            <p class="card-subtitle">{{ item.subtitle }}</p>
            <h2 class="card-title">{{ item.title }}</h2>
          </div>
          <p class="card-headline">
            {{ item.headline }}
          </p>
        </header>

        <div class="star-grid">
          <div class="star-column">
            <div class="star-item">
              <span class="star-label">Situation</span>
              <p class="star-text">
                {{ item.situation }}
              </p>
            </div>
            <div class="star-item">
              <span class="star-label">Task</span>
              <p class="star-text">
                {{ item.task }}
              </p>
            </div>
          </div>
          <div class="star-column">
            <div class="star-item">
              <span class="star-label">Action</span>
              <ul class="star-list">
                <li
                  v-for="action in item.action"
                  :key="action"
                  class="star-list-item"
                >
                  {{ action }}
                </li>
              </ul>
            </div>
            <div class="star-item">
              <span class="star-label">Result</span>
              <p class="star-text">
                {{ item.result }}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="embedded-resume">
      <ResumePage />
    </section>
  </div>
</template>

<style scoped lang="scss">
.portfolio-page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1f2933;
  padding: 96px 32px 160px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;

  .item-period {
    color: #666;
    font-size: 13px;
  }

  .item-tech {
    color: #333333;
    font-size: 13px;
    font-weight: 500;
  }
  gap: 64px;
  font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.portfolio-hero {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .hero-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 14px;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border-radius: 24px;
    background-color: #edf2ff;
    color: #3b5bdb;
    width: fit-content;
  }

  .hero-title {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    color: #0f172a;
  }

  .hero-description {
    margin: 0;
    font-size: 18px;
    line-height: 1.6;
    color: #475569;
  }
}

.portfolio-list {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 32px;
}

.embedded-resume {
  display: flex;
  justify-content: center;
  margin-top: 64px;
  width: 100%;
}

.embedded-resume :deep(.resume-background) {
  width: 100%;
  background: transparent;
  padding-top: 0;
}

.embedded-resume :deep(.resume-container) {
  padding: 0 0 160px;
}

.embedded-resume :deep(.profile-section) {
  position: relative;
}

.embedded-resume :deep(.profile-section .profile-background) {
  width: 100%;
  left: 0;
}

.portfolio-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  padding: 32px 36px;
  box-shadow: 0 24px 60px -40px rgba(15, 23, 42, 0.45);
  display: flex;
  flex-direction: column;
  gap: 32px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 32px 80px -48px rgba(30, 41, 59, 0.55);
  }
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .card-subtitle {
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #64748b;
    margin: 0;
  }

  .card-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #0f172a;
  }

  .card-headline {
    font-size: 18px;
    margin: 0;
    color: #1f2937;
    line-height: 1.5;
  }
}

.star-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.star-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.star-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(241, 245, 249, 0.5);
  padding: 20px;
  border-radius: 16px;
}

.star-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #475569;
}

.star-text {
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  color: #1e293b;
}

.star-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.star-list-item {
  font-size: 15px;
  line-height: 1.6;
  color: #1e293b;
}

@media (max-width: 1200px) {
  .portfolio-page {
    padding: 72px 24px 120px;
  }

    .presentation-description {
      @extend .content-description;
    }

    .presentation-topics {
      .topics-title {
        @extend .content-title;
      }
      
      .topics-list {
        @extend .content-list;
        margin-bottom: 15px;

        .topic-item {
          @extend .content-item;
        }
      }
    }

    .presentation-links {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .presentation-link {
        .link {
          color: #333333; // musinsa dark gray
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          text-decoration: underline;
          
          &.event-link {
            color: #333333; // musinsa dark gray
            font-size: 14px;
          }
          
          &:hover {
            color: #000000; // musinsa black
          }
        }
      }
    }
  .portfolio-card {
    padding: 28px 30px;
  }
}

@media (max-width: 768px) {
  .portfolio-page {
    padding: 56px 20px 96px;
    gap: 48px;
  }

  .portfolio-hero {
    gap: 16px;

    .hero-title {
      font-size: 32px;
    }

    .hero-description {
      font-size: 16px;
    }
  }

  .portfolio-card {
    border-radius: 20px;
    padding: 24px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-headline {
    font-size: 17px;
  }

  .star-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .star-column {
    gap: 20px;
  }

  .star-item {
    padding: 18px;
  }

  .star-text,
  .star-list-item {
    font-size: 14px;
  }
}
</style>

