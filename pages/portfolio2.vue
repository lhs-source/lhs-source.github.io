<script setup lang="ts">
const journeyOverview = {
  title: '업박스 클라우드 저니',
  description:
    '업박스 프로젝트를 시작부터 끝까지 책임져오며 했던 고민과 문제 해결 과정을 간단히 스케치한다.',
};

const workPhilosophy = {
  title: '작업 가치관',
  principles: [
    '나중에 언제 보더라도, 빠른 파악이 가능하게끔 직관적으로 설계',
    '백오피스 특성 상 UI의 빠른 피드백이 중요하고, 필요한 정보를 최대한 제공해야 한다.',
  ],
};

const technicalSections = [
  {
    id: 'validation',
    title: '유효성 체크',
    description: '입력 form을 위한 유효성 체크 로직은 직접 구현함.',
    details: [
      '업박스의 컴포넌트 수준에서 원하는 방식으로 사용할 수 있음.',
      '다중 depth 유효성 검사 존재',
    ],
  },
  {
    id: 'enum',
    title: 'Enum 관리',
    description: 'enum과 locale를 함께 관리',
    details: [
      '프론트에서 관리하기 때문에, 서버와 통신이 불필요하지만, 변경이되면 패치가 필요하다는 단점',
      'i18n과 연관되어 있음',
    ],
  },
  {
    id: 'table',
    title: 'Table 컴포넌트',
    description: '데이터를 주로 보여주는 테이블',
    details: [
      '컬럼과 데이터만으로 표시 가능',
      'named slot을 통해 커스텀',
    ],
  },
  {
    id: 'search',
    title: '통합검색 컴포넌트',
    description: 'disabled, 조건부 등 케이스가 많음',
    details: [],
  },
  {
    id: 'permission',
    title: '권한 체계',
    description: '권한별 접근 가능한 메뉴, 페이지, 필드가 존재함.',
    details: [
      'user의 권한을 가지고 접근 가능한지 여부를 한곳에서 관리',
    ],
  },
];

const provideInjectSections = [
  {
    id: 'schedule',
    title: 'Provide/Inject - 스케줄',
    description: '스케줄 편집 화면이 프론트의 작업이 가장 많이 들어가는 영역',
    details: [
      '다루는 데이터 다수.',
      '컴포넌트 다수.',
      '스케줄 편집 페이지에서 전역으로 다루는 데이터를 provide',
      '자식 컴포넌트에서 필요한 데이터 inject',
      'useScheduleInjection에 구현하여, 어떤 데이터를 inject 하는지 누락되지 않음.',
      'prop drilling 방지.',
    ],
  },
  {
    id: 'contract',
    title: 'Provide/Inject - 계약',
    description: '계약도 법으로 나뉘어 있고, 법 간의 데이터 끼리 유효성 검사 케이스가 많음.',
    details: [],
  },
];

const dtoManagement = {
  title: 'DTO 관리',
  description:
    '여러 형태의 dto (리스트 조회 상세조회, 그 외 기타 조회 dto)를 하나의 모델에서 관리할 수 있도록 함.',
  details: [
    '각 dto 사이의 브릿지 역할을 하고, 프론트에서는 모델을 공동으로 핸들링하고, dto로 상호 변환하는 과정을 가짐.',
    '스케줄의 경우 스케줄과 코스를 같은 UI에서 같은 형태로 처리하지만 DTO 형태가 다름.',
    '하나의 모델로 처리하고, 상황에 맞는 DTO로 변환함',
  ],
  flow: [
    { from: ['스케줄 생성 DTO', '코스 DTO', '그 외 다른 DTO'], to: 'Model (프론트에서 핸들링)' },
    { from: 'Model', to: ['스케줄 DTO', '코스 생성 DTO', '배정 가능 유효성 체크 DTO', '코스 수정 DTO'] },
    { from: '스케줄 DTO', to: '스케줄 수정 DTO' },
  ],
};

const webviewCacheIssue = {
  title: '웹뷰 캐시 문제',
  problem: {
    description: '지속적으로 발생하는 원인 불명 프론트엔드 이상 동작',
    impact: [
      '내부 사용자가 주 고객이기 때문에, 업무가 마비되기도 함. (야간 업무자들 다수)',
      'CS팀에 인임이 다수 되어 비효율.',
    ],
    beforeDatadog: [
      '캐시문제인지 확실하지 않았으며 기능 버그로 오인하여 분석 공수 증가',
      '야간 빠른 대응 농침',
      '배포 직후 주로 발생하여 업데이트가 제대로 되지 않는 것으로 추측',
    ],
  },
  solution: {
    datadog: [
      '데이터독 도입 적극 추진',
      '모니터링의 필요성',
      '버그 발생 시점을 세션 리플레이로 확인',
      '기록된 버전을 확인하여, 이전 버전을 사용중임을 확인.',
    ],
    versionControl: [
      '새로운 버전이 배포가 되어도 웹뷰 SPA 특성상 캐시가 남아서 일주일 넘게 까지도 옛 버전 사용',
      '신규 버전으로 업데이트를 강제로 진행할 수 있도록 기능 추가',
      'CICD 과정 중 버전 정보가 담긴 파일을 업로드',
      '*서버 관리가 없어야 함',
      '*프론트 파일은 이미 캐시되어 있기에 별도 파일을 S3에 업로드하여 이를 동적으로 확인하는 형태를 취함',
      '*관리 포인트 없이 자동화',
      '버전을 체크하고 업데이트를 안내하는 컴포넌트 추가',
      '페이지 로딩 이전에 전처리를 함.',
    ],
    android: [
      '안드로이드 역시 새로운 버전이 존재하면 강제로 업데이트 하도록 Google Play 서비스를 활용해 구현',
    ],
  },
};

const pushDataFlow = {
  title: '푸시 데이터',
  description: '서버-> FCM -> 안드로이드 네이티브 앱',
  flows: [
    {
      type: 'Foreground',
      steps: [
        'Notification 표시',
        '웹뷰에 바로 전달',
        'IndexedDB에 저장',
      ],
    },
    {
      type: 'Background',
      steps: [
        'Notification 표시',
        '안드로이드 Room에 저장',
        '앱 가동 시 Room에서 꺼내 웹뷰로 전달',
        'IndexedDB에 저장',
      ],
    },
  ],
};

const versionUpdate = {
  title: '버전 업데이트',
  description: '페이지 진입 시 버전 체크',
  flow: {
    trigger: '페이지 진입 시 버전 체크',
    check: 'meta.json',
    versionFormat: '{version: "2.1.2.3"}',
  },
};

const fieldDeprecated = {
  title: '필드 deprecated',
  description:
    'Select 컴포넌트는 목록에 있는 항목이 선택된 경우만 보여주게끔 되어 있었음',
  details: [
    '필드는 deprecated 되어도, 이미 존재하는 데이터도 있기 때문에 표시할 필요가 있었음',
    'enum 값 역시 추가, 수정만 이루어지지 삭제되면 안되는 영역임',
  ],
};

const driverWeighingFlow = {
  title: '드라이버 계근 플로우 화면 설계',
  context: '기사님이 여러 사진을 한번에 계근 작업으로 등록하는 플로우가 제안될',
  decision: '사진 하나씩 등록하는 게 맞다고 의견을 제시하고, 받아들여짐',
  reasons: [
    '*기사님의 연령대',
    '*UIUX 복잡도를 고려',
    '여러개를 한번에 왔다갔다하며 수정하는 것보다.',
    '하나씩 흐름대로 진행하는 편이 직관적일 것이라 예상',
    '* 여러장을 한번에 업로드하는 횟수가 적음',
    '* 화면 설계 복잡도도 낮춤',
  ],
};
</script>

<template>
  <div class="portfolio2-page">
    <section class="page-hero">
      <div class="hero-label">Upbox Cloud Journey</div>
      <h1 class="hero-title">{{ journeyOverview.title }}</h1>
      <p class="hero-description">
        {{ journeyOverview.description }}
      </p>
    </section>

    <section class="philosophy-section">
      <h2 class="section-title">{{ workPhilosophy.title }}</h2>
      <div class="philosophy-list">
        <p
          v-for="(principle, index) in workPhilosophy.principles"
          :key="index"
          class="philosophy-item"
        >
          {{ principle }}
        </p>
      </div>
    </section>

    <section class="technical-section">
      <h2 class="section-title">기술적 구현</h2>
      <div class="technical-grid">
        <article
          v-for="section in technicalSections"
          :key="section.id"
          class="technical-card"
        >
          <h3 class="card-title">{{ section.title }}</h3>
          <p class="card-description">{{ section.description }}</p>
          <ul
            v-if="section.details.length > 0"
            class="card-details"
          >
            <li
              v-for="(detail, idx) in section.details"
              :key="idx"
            >
              {{ detail }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="provide-inject-section">
      <h2 class="section-title">Provide/Inject 패턴</h2>
      <div class="provide-inject-grid">
        <article
          v-for="section in provideInjectSections"
          :key="section.id"
          class="provide-inject-card"
        >
          <h3 class="card-title">{{ section.title }}</h3>
          <p class="card-description">{{ section.description }}</p>
          <ul
            v-if="section.details.length > 0"
            class="card-details"
          >
            <li
              v-for="(detail, idx) in section.details"
              :key="idx"
            >
              {{ detail }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="dto-section">
      <h2 class="section-title">{{ dtoManagement.title }}</h2>
      <p class="section-description">{{ dtoManagement.description }}</p>
      <ul class="dto-details">
        <li
          v-for="(detail, idx) in dtoManagement.details"
          :key="idx"
        >
          {{ detail }}
        </li>
      </ul>
      <div class="dto-flow">
        <div
          v-for="(step, idx) in dtoManagement.flow"
          :key="idx"
          class="flow-step"
        >
          <div class="flow-from">
            <span
              v-for="(item, i) in (Array.isArray(step.from) ? step.from : [step.from])"
              :key="i"
              class="flow-item"
            >
              {{ item }}
            </span>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-to">
            <span
              v-for="(item, i) in (Array.isArray(step.to) ? step.to : [step.to])"
              :key="i"
              class="flow-item"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="webview-cache-section">
      <h2 class="section-title">{{ webviewCacheIssue.title }}</h2>
      
      <div class="problem-block">
        <h3 class="block-title">문제 상황</h3>
        <p class="block-description">{{ webviewCacheIssue.problem.description }}</p>
        <div class="impact-list">
          <h4 class="list-title">영향</h4>
          <ul>
            <li
              v-for="(impact, idx) in webviewCacheIssue.problem.impact"
              :key="idx"
            >
              {{ impact }}
            </li>
          </ul>
        </div>
        <div class="before-datadog">
          <h4 class="list-title">DataDog 도입 이전</h4>
          <ul>
            <li
              v-for="(item, idx) in webviewCacheIssue.problem.beforeDatadog"
              :key="idx"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="solution-block">
        <h3 class="block-title">해결 과정</h3>
        <div class="solution-datadog">
          <h4 class="list-title">DataDog 도입</h4>
          <ul>
            <li
              v-for="(item, idx) in webviewCacheIssue.solution.datadog"
              :key="idx"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="solution-version">
          <h4 class="list-title">버전 관제 시스템</h4>
          <ul>
            <li
              v-for="(item, idx) in webviewCacheIssue.solution.versionControl"
              :key="idx"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="solution-android">
          <h4 class="list-title">Android 강제 업데이트</h4>
          <ul>
            <li
              v-for="(item, idx) in webviewCacheIssue.solution.android"
              :key="idx"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="push-data-section">
      <h2 class="section-title">{{ pushDataFlow.title }}</h2>
      <p class="section-description">{{ pushDataFlow.description }}</p>
      <div class="push-flow-grid">
        <article
          v-for="flow in pushDataFlow.flows"
          :key="flow.type"
          class="push-flow-card"
        >
          <h3 class="flow-type">{{ flow.type }}</h3>
          <ol class="flow-steps">
            <li
              v-for="(step, idx) in flow.steps"
              :key="idx"
            >
              {{ step }}
            </li>
          </ol>
        </article>
      </div>
    </section>

    <section class="version-update-section">
      <h2 class="section-title">{{ versionUpdate.title }}</h2>
      <p class="section-description">{{ versionUpdate.description }}</p>
      <div class="version-flow">
        <div class="flow-box">{{ versionUpdate.flow.trigger }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ versionUpdate.flow.check }}</div>
        <div class="version-format">
          {{ versionUpdate.flow.versionFormat }}
        </div>
      </div>
    </section>

    <section class="field-deprecated-section">
      <h2 class="section-title">{{ fieldDeprecated.title }}</h2>
      <p class="section-description">{{ fieldDeprecated.description }}</p>
      <ul class="deprecated-details">
        <li
          v-for="(detail, idx) in fieldDeprecated.details"
          :key="idx"
        >
          {{ detail }}
        </li>
      </ul>
    </section>

    <section class="driver-weighing-section">
      <h2 class="section-title">{{ driverWeighingFlow.title }}</h2>
      <p class="section-description">{{ driverWeighingFlow.context }}</p>
      <p class="decision-text">{{ driverWeighingFlow.decision }}</p>
      <ul class="decision-reasons">
        <li
          v-for="(reason, idx) in driverWeighingFlow.reasons"
          :key="idx"
        >
          {{ reason }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.portfolio2-page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #1f2933;
  padding: 96px 32px 160px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.page-hero {
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

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #0f172a;
}

.section-description {
  font-size: 16px;
  line-height: 1.6;
  color: #1f2933;
  margin: 0 0 16px 0;
}

.philosophy-section {
  .philosophy-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .philosophy-item {
    font-size: 16px;
    line-height: 1.7;
    color: #1f2933;
    margin: 0;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #3b5bdb;
  }
}

.technical-section,
.provide-inject-section {
  .technical-grid,
  .provide-inject-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
}

.technical-card,
.provide-inject-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px -4px rgba(15, 23, 42, 0.15);

  .card-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 12px 0;
    color: #1d4ed8;
  }

  .card-description {
    font-size: 15px;
    line-height: 1.6;
    color: #1f2933;
    margin: 0 0 12px 0;
  }

  .card-details {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
    }
  }
}

.dto-section {
  .dto-details {
    margin: 0 0 24px 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 15px;
      line-height: 1.7;
      color: #1f2933;
    }
  }

  .dto-flow {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background: #f8fafc;
    border-radius: 16px;
  }

  .flow-step {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .flow-from,
  .flow-to {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .flow-item {
    padding: 8px 14px;
    background: #ffffff;
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 8px;
    font-size: 14px;
    color: #1f2933;
    font-weight: 500;
  }

  .flow-arrow {
    font-size: 20px;
    color: #6366f1;
    font-weight: 700;
  }
}

.webview-cache-section {
  .problem-block,
  .solution-block {
    margin-bottom: 32px;
    padding: 24px;
    background: #f8fafc;
    border-radius: 16px;
  }

  .block-title {
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #0f172a;
  }

  .block-description {
    font-size: 16px;
    line-height: 1.7;
    color: #1f2933;
    margin: 0 0 20px 0;
  }

  .impact-list,
  .before-datadog,
  .solution-datadog,
  .solution-version,
  .solution-android {
    margin-bottom: 20px;
  }

  .list-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #1d4ed8;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 15px;
      line-height: 1.6;
      color: #1f2933;
    }
  }
}

.push-data-section {
  .push-flow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 24px;
  }

  .push-flow-card {
    background: #ffffff;
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 12px -4px rgba(15, 23, 42, 0.15);
  }

  .flow-type {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #6366f1;
  }

  .flow-steps {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 15px;
      line-height: 1.6;
      color: #1f2933;
    }
  }
}

.version-update-section {
  .version-flow {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 24px;
    padding: 24px;
    background: #f8fafc;
    border-radius: 16px;
  }

  .flow-box {
    padding: 12px 20px;
    background: #ffffff;
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 8px;
    font-size: 15px;
    color: #1f2933;
    font-weight: 500;
  }

  .flow-arrow {
    font-size: 20px;
    color: #6366f1;
    font-weight: 700;
  }

  .version-format {
    padding: 12px 20px;
    background: #312e81;
    color: #f8fafc;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
  }
}

.field-deprecated-section {
  .deprecated-details {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 15px;
      line-height: 1.7;
      color: #1f2933;
    }
  }
}

.driver-weighing-section {
  .decision-text {
    font-size: 16px;
    font-weight: 600;
    color: #1d4ed8;
    margin: 16px 0;
    padding: 16px;
    background: #edf2ff;
    border-radius: 12px;
    border-left: 4px solid #3b5bdb;
  }

  .decision-reasons {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      font-size: 15px;
      line-height: 1.7;
      color: #1f2933;
    }
  }
}

@media (max-width: 768px) {
  .portfolio2-page {
    padding: 56px 20px 96px;
    gap: 48px;
  }

  .page-hero {
    .hero-title {
      font-size: 32px;
    }

    .hero-description {
      font-size: 16px;
    }
  }

  .section-title {
    font-size: 24px;
  }

  .technical-grid,
  .provide-inject-grid,
  .push-flow-grid {
    grid-template-columns: 1fr;
  }

  .flow-step {
    flex-direction: column;
    align-items: flex-start;
  }

  .version-flow {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

