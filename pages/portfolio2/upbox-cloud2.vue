<script setup lang="ts">
// 이미지 기반 Upbox Cloud Journey 포트폴리오
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">Upbox Cloud Journey</h1>
      <h2 class="project-subtitle">리코 · 폐기물 매니지먼트 클라우드 (2021.01 ~ 진행중)</h2>

      <div class="project-description">
        업박스 클라우드의 프론트엔드 핵심 멤버로 초기 1.0 온보딩부터 2.0 론칭, 2.x 운영까지 전체 흐름을 리드한 경험입니다.
        복잡한 비즈니스 요구사항을 해결하기 위한 기술적 접근과 문제 해결 과정을 정리했습니다.
      </div>

      <!-- 작업 기치관 -->
      <section class="tech-section">
        <h2 class="section-title">작업 기치관 (Job Principles)</h2>
        <div class="section-content">
          <p>
            업박스 클라우드에서 작업을 처리하는 핵심 원칙과 메커니즘을 설계했습니다.
            복잡한 폐기물 처리 업무 흐름을 효율적으로 관리하기 위한 작업 처리 시스템을 구축했습니다.
          </p>
          <div class="diagram-box">
            <div class="diagram-title">작업 처리 흐름</div>
            <div class="flow-diagram">
              <div class="flow-node">작업 생성</div>
              <div class="flow-arrow">→</div>
              <div class="flow-node">유효성 검증</div>
              <div class="flow-arrow">→</div>
              <div class="flow-node">상태 관리</div>
              <div class="flow-arrow">→</div>
              <div class="flow-node">완료 처리</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 유효성 체크 -->
      <section class="tech-section">
        <h2 class="section-title">유효성 체크 시스템</h2>
        <div class="section-content">
          <p>
            Grapevine 방식의 유효성 검증 시스템을 구축했습니다.
            컴포넌트 간 유효성 상태를 효율적으로 전파하고 관리하는 구조를 설계했습니다.
          </p>
          <div class="feature-grid">
            <div class="feature-card">
              <h3 class="feature-title">컴포넌트 간 검증</h3>
              <p>여러 컴포넌트에 걸친 복합적인 유효성 검증을 지원합니다.</p>
            </div>
            <div class="feature-card">
              <h3 class="feature-title">실시간 피드백</h3>
              <p>사용자 입력에 대한 즉각적인 유효성 피드백을 제공합니다.</p>
            </div>
            <div class="feature-card">
              <h3 class="feature-title">커스텀 규칙</h3>
              <p>비즈니스 로직에 맞춘 커스텀 유효성 검증 규칙을 정의할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Enum 관리 -->
      <section class="tech-section">
        <h2 class="section-title">Enum 관리 시스템</h2>
        <div class="section-content">
          <p>
            서버와의 통신에서 사용되는 Enum 값들을 효율적으로 관리하고,
            Deprecated된 항목을 안전하게 처리하는 시스템을 구축했습니다.
          </p>
          <div class="diagram-box">
            <div class="diagram-title">Enum 관리 구조</div>
            <div class="tree-diagram">
              <div class="tree-node root">Enum 정의</div>
              <div class="tree-branch">
                <div class="tree-node">활성 Enum</div>
                <div class="tree-node deprecated">Deprecated Enum</div>
              </div>
              <div class="tree-branch">
                <div class="tree-node">프론트엔드 매핑</div>
                <div class="tree-node">서버 통신</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 컴포넌트 설계 -->
      <section class="tech-section">
        <h2 class="section-title">컴포넌트 설계</h2>
        <div class="section-content">
          <h3 class="subsection-title">테이블 컴포넌트</h3>
          <p>
            대량의 데이터를 효율적으로 표시하기 위한 재사용 가능한 테이블 컴포넌트를 개발했습니다.
            정렬, 필터링, 페이지네이션 기능을 포함합니다.
          </p>

          <h3 class="subsection-title">통합검색 컴포넌트</h3>
          <p>
            키워드 기반 통합 검색 기능을 제공하는 컴포넌트입니다.
            여러 데이터 소스에서 검색 결과를 통합하여 표시합니다.
          </p>

          <h3 class="subsection-title">커스텀 컴포넌트 제작</h3>
          <p>
            비즈니스 요구사항에 맞춘 커스텀 컴포넌트를 제작했습니다.
            선택 가능한 텍스트, 동시 컴포넌트 사용 등 특수한 요구사항을 지원합니다.
          </p>
        </div>
      </section>

      <!-- 권한 체계 -->
      <section class="tech-section">
        <h2 class="section-title">권한 체계</h2>
        <div class="section-content">
          <p>
            메뉴, 페이지, 필드 단위의 세밀한 권한 관리 시스템을 구축했습니다.
            사용자 역할에 따라 접근 가능한 기능을 동적으로 제어합니다.
          </p>
          <div class="permission-diagram">
            <div class="permission-level">
              <div class="permission-node">메뉴 권한</div>
              <div class="permission-arrow">↓</div>
              <div class="permission-node">페이지 권한</div>
              <div class="permission-arrow">↓</div>
              <div class="permission-node">필드 권한</div>
            </div>
          </div>
        </div>
      </section>

      <!-- DTO 관리 -->
      <section class="tech-section">
        <h2 class="section-title">DTO 관리</h2>
        <div class="section-content">
          <p>
            서버와의 데이터 통신을 위한 DTO를 체계적으로 관리했습니다.
            각 기능별로 필요한 DTO를 정의하고 재사용성을 높였습니다.
          </p>
          <div class="diagram-box">
            <div class="diagram-title">DTO 구조</div>
            <div class="dto-tree">
              <div class="dto-node root">Model / DTO</div>
              <div class="dto-branches">
                <div class="dto-branch">
                  <div class="dto-node">스케줄 DTO</div>
                  <div class="dto-sub-branch">
                    <div class="dto-node">스케줄 수정 DTO</div>
                  </div>
                </div>
                <div class="dto-branch">
                  <div class="dto-node">코스 생성 DTO</div>
                </div>
                <div class="dto-branch">
                  <div class="dto-node">그 외 다른 DTO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Provide/Inject 패턴 -->
      <section class="tech-section">
        <h2 class="section-title">Provide/Inject 패턴</h2>
        <div class="section-content">
          <p>
            Vue의 Provide/Inject 패턴을 활용하여 컴포넌트 간 데이터 공유를 효율적으로 관리했습니다.
            Props drilling 문제를 해결하고 코드 재사용성을 높였습니다.
          </p>

          <h3 class="subsection-title">스케줄 편집</h3>
          <p>
            스케줄 편집 화면에서 Provide/Inject를 활용하여 복잡한 데이터 흐름을 단순화했습니다.
          </p>
          <div class="diagram-box">
            <div class="diagram-title">스케줄 편집 컴포넌트 구조</div>
            <div class="component-tree">
              <div class="comp-node root">Provide / Inject</div>
              <div class="comp-branches">
                <div class="comp-branch">
                  <div class="comp-node">컴포넌트 1</div>
                  <div class="comp-sub-branch">
                    <div class="comp-node">컴포넌트 3</div>
                    <div class="comp-node">컴포넌트 4</div>
                  </div>
                </div>
                <div class="comp-branch">
                  <div class="comp-node">컴포넌트 2</div>
                </div>
                <div class="comp-branch">
                  <div class="comp-node">컴포넌트 5</div>
                </div>
              </div>
            </div>
          </div>

          <h3 class="subsection-title">계약 관리</h3>
          <p>
            계약 관리 화면에서도 Provide/Inject 패턴을 적용하여 수많은 테스트 케이스를 효율적으로 처리했습니다.
          </p>
        </div>
      </section>

      <!-- 웹뷰 아키텍처 -->
      <section class="tech-section">
        <h2 class="section-title">웹뷰 아키텍처</h2>
        <div class="section-content">
          <p>
            Android WebView 환경에서 발생하는 캐시 이슈, 프론트엔드 이상 현상, 내부 사용자 운영 문제를 해결했습니다.
          </p>
          <div class="diagram-box">
            <div class="diagram-title">웹뷰 데이터 흐름</div>
            <div class="webview-flow">
              <div class="flow-row">
                <div class="flow-item">Server</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">RCM</div>
              </div>
              <div class="flow-row">
                <div class="flow-item">RCM</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item-group">
                  <div class="flow-item">Background</div>
                  <div class="flow-item">Foreground</div>
                </div>
              </div>
              <div class="flow-row">
                <div class="flow-item-group">
                  <div class="flow-item">Background</div>
                  <div class="flow-item">Foreground</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">Noti 표시</div>
              </div>
              <div class="flow-row">
                <div class="flow-item">Noti 표시</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">안드로이드 앱 (Native)</div>
              </div>
              <div class="flow-row">
                <div class="flow-item">안드로이드 앱 (Native)</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">웹뷰</div>
              </div>
              <div class="flow-row">
                <div class="flow-item">ROCM</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">안드로이드 앱 (Native)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 푸시 알림 시스템 -->
      <section class="tech-section">
        <h2 class="section-title">푸시 알림 시스템</h2>
        <div class="section-content">
          <p>
            Foreground와 Background 상태에 따라 다른 방식으로 푸시 알림을 처리하는 시스템을 구축했습니다.
            Android Native 앱과의 연동을 통해 안정적인 알림 전달을 보장합니다.
          </p>
          <div class="push-flow">
            <div class="push-state">
              <h4 class="push-title">Foreground 상태</h4>
              <div class="push-steps">
                <div class="push-step">FCM 수신</div>
                <div class="push-arrow">→</div>
                <div class="push-step">즉시 표시</div>
                <div class="push-arrow">→</div>
                <div class="push-step">웹뷰 전달</div>
              </div>
            </div>
            <div class="push-state">
              <h4 class="push-title">Background 상태</h4>
              <div class="push-steps">
                <div class="push-step">FCM 수신</div>
                <div class="push-arrow">→</div>
                <div class="push-step">로컬 저장</div>
                <div class="push-arrow">→</div>
                <div class="push-step">앱 실행 시 전달</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 필드 Deprecated 처리 -->
      <section class="tech-section">
        <h2 class="section-title">필드 Deprecated 처리</h2>
        <div class="section-content">
          <p>
            Select 컴포넌트의 문제점을 해결하고, 더 이상 사용하지 않는 필드를 안전하게 제거하는 프로세스를 구축했습니다.
            History Back 처리와 연계하여 사용자 경험을 유지하면서 점진적으로 마이그레이션했습니다.
          </p>
        </div>
      </section>

      <!-- 드라이버 게근 플로우 -->
      <section class="tech-section">
        <h2 class="section-title">드라이버 게근 플로우 화면 설계</h2>
        <div class="section-content">
          <p>
            드라이버 가이던스를 위한 플로우 화면을 설계하고 구현했습니다.
            단일 플로우로 구성하여 사용자의 혼란을 최소화했습니다.
          </p>
        </div>
      </section>

      <!-- 기술 스택 -->
      <section class="tech-section">
        <h2 class="section-title">기술 스택</h2>
        <div class="section-content">
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-label">프론트엔드</span>
              <span class="tech-value">Vue3, TypeScript, Vite</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">상태 관리</span>
              <span class="tech-value">Pinia, Provide/Inject</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">스타일링</span>
              <span class="tech-value">SCSS, TailwindCSS</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">모바일</span>
              <span class="tech-value">Android WebView, Kotlin</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">인프라</span>
              <span class="tech-value">AWS S3, Github Actions</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">모니터링</span>
              <span class="tech-value">Datadog</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./project-common.scss"></style>

<style scoped lang="scss">
.tech-section {
  margin-top: 64px;
  padding-top: 48px;
  border-top: 2px solid rgba(153, 153, 102, 0.3);

  &:first-of-type {
    margin-top: 32px;
    padding-top: 32px;
    border-top: none;
  }
}

.section-title {
  font-size: 32px;
  line-height: 1.2;
  margin: 0 0 24px 0;
  color: #050505;
  font-weight: 600;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 24px;

  > p {
    font-size: 16px;
    line-height: 1.8;
    color: #111111;
    margin: 0;
  }
}

.subsection-title {
  font-size: 20px;
  line-height: 1.4;
  margin: 16px 0 12px 0;
  color: #050505;
  font-weight: 600;
}

// 다이어그램 스타일
.diagram-box {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
}

.diagram-title {
  font-size: 14px;
  font-weight: 600;
  color: #433021;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

// 플로우 다이어그램
.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.flow-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  min-width: 100px;
  text-align: center;
}

.flow-arrow {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
}

// 트리 다이어그램
.tree-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.tree-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  text-align: center;

  &.root {
    background: rgba(67, 48, 33, 0.2);
    font-weight: 600;
  }

  &.deprecated {
    opacity: 0.5;
    text-decoration: line-through;
  }
}

.tree-branch {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

// 권한 다이어그램
.permission-diagram {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.permission-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.permission-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 500;
  color: #433021;
  min-width: 150px;
  text-align: center;
}

.permission-arrow {
  font-size: 18px;
  color: #433021;
  font-weight: bold;
}

// DTO 트리
.dto-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.dto-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  text-align: center;

  &.root {
    background: rgba(67, 48, 33, 0.2);
    font-weight: 600;
    font-size: 16px;
  }
}

.dto-branches {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.dto-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dto-sub-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-left: 20px;
  border-left: 2px dashed rgba(67, 48, 33, 0.3);
}

// 컴포넌트 트리
.component-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.comp-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  text-align: center;

  &.root {
    background: rgba(67, 48, 33, 0.2);
    font-weight: 600;
    font-size: 16px;
  }
}

.comp-branches {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.comp-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.comp-sub-branch {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 2px dashed rgba(67, 48, 33, 0.3);
}

// 웹뷰 플로우
.webview-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flow-row {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.flow-item {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  color: #433021;
  text-align: center;
}

.flow-item-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

// 푸시 알림 플로우
.push-flow {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 20px 0;
}

.push-state {
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.push-title {
  font-size: 16px;
  font-weight: 600;
  color: #433021;
  margin: 0 0 16px 0;
}

.push-steps {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.push-step {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #433021;
}

.push-arrow {
  font-size: 18px;
  color: #433021;
  font-weight: bold;
}

// 기능 그리드
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.feature-card {
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #433021;
  margin: 0 0 12px 0;
}

.feature-card p {
  font-size: 14px;
  line-height: 1.6;
  color: #111111;
  margin: 0;
}

// 기술 스택 그리드
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.tech-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 8px;
  padding: 16px;
}

.tech-label {
  font-size: 12px;
  font-weight: 600;
  color: #433021;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.tech-value {
  font-size: 14px;
  color: #111111;
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }

  .flow-diagram,
  .push-steps {
    flex-direction: column;
  }

  .flow-arrow,
  .push-arrow {
    transform: rotate(90deg);
  }

  .feature-grid,
  .tech-grid {
    grid-template-columns: 1fr;
  }

  .dto-branches,
  .comp-branches {
    flex-direction: column;
  }
}
</style>

