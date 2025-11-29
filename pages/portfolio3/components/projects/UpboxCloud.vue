<script setup lang="ts">
// Upbox Cloud 포트폴리오
</script>

<template>
  <div class="project-page">
    <div class="project-content">
      <h1 class="project-title">Upbox Cloud</h1>

      <div class="project-description">
        <p>
          폐기물 수집운반 업계를 디지털화하여 투명하고 신뢰성 높은 데이터를 관리하고 제공하는 서비스입니다.
        </p>
        <p>
          리코에 입사한 후 바로 맡아서 진행하게 된 프론트엔드 프로젝트입니다.
        </p>
        <p>
          이 프로덕트의 궁극적 목표와 가치는 지속 가능한 폐기물 관리의 새로운 기준을 설정하는 것입니다.
        </p>
      </div>

      <!-- 프로젝트 개요 -->
      <section class="tech-section">
        <h2 class="section-title">프로젝트 개요</h2>
        <div class="section-content">
          <p>
            업박스 클라우드는 폐기물의 처리 과정에서 발생하는 모든 데이터를 투명하고 정확하게 관리하는 클라우드 서비스입니다. 
            제공되는 앱의 종류로는 업박스 어드민, 업박스 드라이버, 업박스 커스터머가 있으며, 
            각각 기사님들의 수거 및 차량 관리, 업장의 수거 일정 및 정보 확인에 사용됩니다.
          </p>
          <p>
            모든 앱은 담당하는 법인과 역할에 맞춰 권한이 부여되고, 권한별로 메뉴와 기능이 차등 제공됩니다. 
            고객의 업장 특성과 계약을 기반해 맞춤으로 법적 문제가 발생하지 않도록 수거 일정을 조율합니다. 
            폐기물 처리 데이터 기반한 청구서를 생성하고, 정산까지 자동으로 이루어집니다.
          </p>
          <p>
            폐기물 산업 특성상 법적인 문제가 굉장히 복잡하고 행정 처리 업무가 많습니다. 
            고객들은 번거로운 과정을 줄이고, 행정 처리에 필요한 서류를 원할 때 바로 확인이 가능하도록 
            업박스에서 서식에 맞는 데이터를 제공합니다.
          </p>
          <p>
            초기 음식물류 폐기물 중심에서 현재는 재활용과 폐수오니(슬러지) 등 여러 폐기물 종류를 종합 지원하는 형태로 발전했습니다.
          </p>
        </div>
      </section>

      <!-- 기술 스택 -->
      <section class="tech-section">
        <h2 class="section-title">기술 스택</h2>
        <div class="section-content">
          <div class="tech-stack-list">
            NodeJS, Vite, Vue3, Android Kotlin, Webview, Github Actions, AWS, TailwindCSS, i18n, Storybook
          </div>
        </div>
      </section>

      <!-- 주요 역할 및 기여 -->
      <section class="tech-section">
        <h2 class="section-title">주요 역할 및 기여</h2>
        <div class="contribution-grid">
          <div class="contribution-column">
            <h3 class="contribution-title">프론트엔드 리드</h3>
            <ul class="contribution-list">
              <li>업박스 클라우드 FE 개발을 처음부터 현재까지 핵심 멤버로 참여 (1.0 온보딩 → 2.0 론칭 → 현재 2.14.0 버전)</li>
              <li>약 3~4주마다 전략 과제 배포를 통한 지속적인 제품 개선 및 기능 확장</li>
            </ul>
          </div>
          <div class="contribution-column">
            <h3 class="contribution-title">핵심 기능 개발</h3>
            <ul class="contribution-list">
              <li>고객, 계약, 폐기물 처리, 청구 데이터를 관리하는 업박스 어드민 핵심 기능 개발</li>
              <li>복잡한 조건과 권한의 데이터 유효성 검증 및 사용자 친화적 입력 프로세스 구현</li>
              <li>지도 기반 수거 일정 관리 시스템 - 방문 업장 표시 및 일정 최적화 기능</li>
              <li>전자계약, 가상계좌, 자동이체, 채널톡 등 외부 서비스 연동</li>
            </ul>
          </div>
          <div class="contribution-column">
            <h3 class="contribution-title">안드로이드 개발</h3>
            <ul class="contribution-list">
              <li>안드로이드 Kotlin 네이티브를 개발하여 권한 요청, 푸시, 네비게이션, 파일 선택 기능 구현</li>
              <li>WebView와 네이티브 간 통신 및 데이터 연동 - 푸시 알림을 Room DB에 저장 후 웹으로 전달</li>
              <li>마케팅 연동을 위한 딥링크 지원</li>
            </ul>
          </div>
          <div class="contribution-column">
            <h3 class="contribution-title">디자인 시스템 구축</h3>
            <ul class="contribution-list">
              <li>디자인팀과 협업하여 UDS(Upbox Design System) 설립 및 컴포넌트 가이드화</li>
              <li>복잡한 프로덕트 특성에 맞는 유기적 컴포넌트 설계</li>
            </ul>
          </div>
          <div class="contribution-column">
            <h3 class="contribution-title">DevOps & 모니터링</h3>
            <ul class="contribution-list">
              <li>데이터독 도입 추진 및 초기 구성 - Sourcemap 업로드 자동화로 에러 추적 시스템 구축</li>
              <li>사용량 기반 배포 시간 결정, 사용성 측정을 통한 데이터 기반 의사결정 체계 구축</li>
              <li>Github Actions CICD 구축 - 상용서버 CI/CD 분리로 배포 시간 단축 (5분 → 1분 40초)</li>
              <li>Storybook, Sourcemap 자동 배포 및 Github 릴리즈 자동 생성으로 롤백 시스템 구축</li>
            </ul>
          </div>
          <div class="contribution-column">
            <h3 class="contribution-title">기술 표준화 & 조직 기여</h3>
            <ul class="contribution-list">
              <li>i18n 도입으로 용어 통일 및 해외 진출 대비</li>
              <li>Atlassian 툴(Jira 자동화) 및 데이터독 사용법 내부 교육 및 공유</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 목표 -->
      <section class="tech-section">
        <h2 class="section-title">목표</h2>
        <div class="section-content">
          <ul class="goal-list">
            <li>수거 일정과 동선 관리</li>
            <li>기사님의 작업 효율 극대화</li>
            <li>정산 자동화</li>
            <li>정확한 데이터 관리</li>
          </ul>
        </div>
      </section>

      <!-- 개발 가치관 -->
      <section class="tech-section">
        <h2 class="section-title">개발 가치관</h2>
        <div class="section-content">
          <p>
            나중에 언제 보더라도, 빠른 파악이 가능하게끔 직관적으로 설계
          </p>
          <p>
            백오피스 특성 상 UI의 빠른 피드백이 중요하고, 필요한 정보를 친절하게 제공해야 한다.
          </p>
        </div>
      </section>

      <!-- 인원 구성 -->
      <section class="tech-section">
        <h2 class="section-title">인원 구성</h2>
        <div class="section-content">
          <div class="team-diagram">
            <div class="team-box">
              <div class="team-year">2020</div>
              <div class="team-members">백엔드(1), 프론트(1), 디자이너(1), PM(1)</div>
            </div>
            <div class="team-arrow">↓</div>
            <div class="team-box">
              <div class="team-year">2025</div>
              <div class="team-members">백엔드(4), 프론트(2), 디자이너(2), PO(3), QA(1), PM(1)</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 설계 관점 -->
      <section class="tech-section">
        <h2 class="section-title">설계 관점</h2>
        <div class="design-grid">
          <div class="design-column">
            <h3 class="design-column-title">유효성 체크</h3>
            <p>
              입력 form 을 위한 유효성 체크 로직은 직접 구현함.
              업박스의 컴포넌트 수준에서 원하는 방식으로 사용할 수 있음.
              다중 depth 유효성 검사 존재
            </p>
          </div>
          <div class="design-column">
            <h3 class="design-column-title">권한 체계</h3>
            <p>
              권한별 접근 가능한 메뉴, 페이지, 필드가 존재함.
              user 의 권한을 가지고 접근 가능한지 여부를 한곳에서 관리.
            </p>
          </div>
          <div class="design-column">
            <h3 class="design-column-title">enum 관리</h3>
            <p>
              enum 과 locale 을 함께 관리
              프론트에서 관리하기 때문에,
              서버와 통신이 불필요하지만, 변경이되면 패치가 필요하다는 단점
              i18n 과 연관되어 있음
            </p>
          </div>
        </div>

        <!-- DTO 도식화 -->
        <div class="dto-diagram-section">
          <h3 class="subsection-title">DTO 구조</h3>
          <div>
            여러 형태의 dto (리스트 조회, 상세 조회, 그 외 기타 조회 dto) 를 하나의 모델에서 관리할 수 있도록 함.
            각 dto 사이의 브릿지 역할을 하고, 프론트에서는 모델을 공통으로 핸들링하고, dto 로 상호 변환하는 과정을 가짐.
          </div>
          <div>
            스케줄의 경우 스케줄과 코스를 같은 UI에서 같은 형태로 처리하지만 DTO 형태가 다름.
            하나의 모델로 처리하고, 상황에 맞는 DTO로 변환함.
          </div>
          <div>
            <img src="/assets/portfolio/dto.png" alt="DTO 구조" />
          </div>
        </div>
      </section>

      <!-- provide / inject -->
      <section class="tech-section">
        <h2 class="section-title">provide / inject</h2>
        <div class="section-content">
          <p>
            하나의 페이지에서 다수의 컴포넌트가 높은수의 깊이를 가지고 있는 경우가 많음.
            store 로도 처리할 수 있지만,
            앱 레벨이 아닌, 컴포넌트 단위로 데이터를 관리하고 싶었음
          </p>

          <!-- 스케줄 -->
          <div class="provide-inject-subsection">
            <h3 class="subsection-title">provide / inject - 스케줄</h3>
            <p>
              스케줄 편집 화면이 프론트의 작업이 가장 많이 들어가는 영역.
              다루는 데이터 다수.
              컴포넌트 다수.
            </p>
            <p>
              스케줄 편집 페이지에서 전역으로 다루는 데이터를 provide
              자식 컴포넌트에서 필요한 데이터 inject
              useScheduleInjection 에 구현하여,
              어떤 데이터를 inject 하는지 누락되지 않음.
              prop drilling 방지.
            </p>

            <div class="component-tree-diagram">
              <div class="tree-root">스케줄 편집 화면</div>
              <div class="tree-provide">prop provide</div>
              <div class="tree-level">
                <div class="tree-branch">
                  <div class="tree-node">컴포넌트 1</div>
                  <div class="tree-level">
                    <div class="tree-node">컴포넌트 3</div>
                    <div class="tree-level">
                      <div class="tree-node">컴포넌트 6</div>
                    </div>
                  </div>
                </div>
                <div class="tree-branch">
                  <div class="tree-node">컴포넌트 2</div>
                  <div class="tree-level">
                    <div class="tree-node">컴포넌트 4</div>
                    <div class="tree-node">컴포넌트 5</div>
                    <div class="tree-level">
                      <div class="tree-node">컴포넌트 7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 계약 -->
          <div class="provide-inject-subsection">
            <h3 class="subsection-title">provide / inject - 계약</h3>
            <p>
              계약도 탭으로 나뉘어 있고, 탭 간의 데이터 끼리 유효성 검사 케이스가 많음.
            </p>

            <div class="component-tree-diagram">
              <div class="tree-root">계약 수정</div>
              <div class="tree-provide">prop provide</div>
              <div class="tree-level">
                <div class="tree-branch">
                  <div class="tree-node">컴포넌트 1</div>
                  <div class="tree-level">
                    <div class="tree-node">컴포넌트 3</div>
                    <div class="tree-level">
                      <div class="tree-node">컴포넌트 6</div>
                    </div>
                  </div>
                </div>
                <div class="tree-branch">
                  <div class="tree-node">컴포넌트 2</div>
                  <div class="tree-level">
                    <div class="tree-node">컴포넌트 4</div>
                  </div>
                </div>
                <div class="tree-branch">
                  <div class="tree-node">컴포넌트 5</div>
                </div>
                <div class="tree-branch">
                  <div class="tree-node">...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 웹뷰 캐시 문제 -->
      <section class="tech-section">
        <h2 class="section-title">웹뷰</h2>
        <div class="section-content">
          <p>
            적은 인력으로 앱 지원, 웹과 동일한 UI 제공.
          </p>
        </div>

        <div class="webview-cache-section">
          <h3 class="subsection-title">웹뷰 캐시 문제</h3>

          <!-- 문제 설명 -->
          <div class="flow-box">
            <div class="flow-box-title">문제 상황</div>
            <p>
              지속적으로 발생하는 원인 불명 프론트엔드 이상 동작
              내부 사용자가 주 고객이기 때문에, 업무가 마비되기도 함. (야간 업무자들 다수)
              CS팀에 인입이 다수 되어 비효율.
            </p>
          </div>

          <div class="flow-arrow-down">↓</div>

          <!-- 데이터독 도입 이전 -->
          <div class="flow-box">
            <div class="flow-box-title">데이터독 도입 이전</div>
            <p>
              캐시문제인지 확실하지 않았으며 기능 버그로 오인하여 분석 공수 증가
              야간 빠른 대응 놓침
              배포 직후 주로 발생하여 업데이트가 제대로 되지 않는 것으로 추측
            </p>
          </div>

          <div class="flow-arrow-down">↓</div>

          <!-- 데이터독 도입 -->
          <div class="flow-box">
            <div class="flow-box-title">데이터독 도입 적극 추진</div>
            <div class="flow-box-subtitle">모니터링의 필요성</div>
            <p>
              버그 발생 시점을 세션 리플레이로 확인
              기록된 버전을 확인하여, 이전 버전을 사용중임을 확인.
              새로운 버전이 배포가 되어도 웹뷰 SPA 특성상 캐시가 남아서 일주일 넘게 까지도 옛 버전 사용
            </p>
          </div>

          <div class="flow-arrow-down">↓</div>

          <!-- 해결 방법 1 -->
          <div class="flow-box">
            <div class="flow-box-title">신규 버전으로 업데이트를 강제로 진행할 수 있도록 기능 추가</div>
            <p>
              CICD 과정 중 버전 정보가 담긴 파일을 업로드
              * 서버 관리가 없어야 함
              * 프론트 파일은 이미 캐시되어 있기에 별도 파일을 s3에 업로드하여 이를 동적으로 확인하는 형태를 취함
              관리 포인트 없이 자동화
            </p>
          </div>

          <div class="flow-arrow-down">↓</div>

          <!-- 해결 방법 2 -->
          <div class="flow-box">
            <div class="flow-box-title">버전을 체크하고 업데이트를 안내하는 컴포넌트 추가</div>
            <p>
              페이지 로딩 이전에 전처리를 함.
              안드로이드 역시 새로운 버전이 존재하면 강제로 업데이트 하도록 Google Play 서비스을 활용해 구현.
            </p>
          </div>

          <!-- UI 예제 및 meta.json -->
          <div class="webview-ui-examples">
            <div class="ui-example">
              <div class="modal-preview">
                <div class="modal-header">
                  <span class="modal-title">버전 업데이트</span>
                  <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                  <p class="modal-message">새로운 버전이 존재하여 새로고침이 필요합니다!</p>
                  <div class="version-info">
                    <div class="version-item">
                      <span class="version-label">현재 버전:</span>
                      <span class="version-value">2.12.5</span>
                    </div>
                    <div class="version-item">
                      <span class="version-label">최신 버전:</span>
                      <span class="version-value">2.13.0</span>
                    </div>
                  </div>
                  <button class="modal-button">확인</button>
                </div>
              </div>
            </div>

            <div class="ui-example">
              <div class="modal-preview error">
                <div class="modal-header">
                  <span class="modal-title">버전 업데이트</span>
                  <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                  <p class="modal-message">새로운 버전이 존재하여 새로고침이 필요합니다!</p>
                  <div class="error-message">
                    <span class="error-icon">⚠</span>
                    <span>버전 정보를 가져오지 못했습니다. 다시 가져옵니다. 지속되는 경우 관리자에게 문의해주세요.</span>
                  </div>
                  <button class="modal-button">확인</button>
                </div>
              </div>
            </div>
          </div>

          <!-- meta.json 구조 -->
          <div class="meta-json-section">
            <div class="meta-flow">
              <div class="meta-label">페이지 진입 시 버전 체크</div>
              <div class="meta-arrow">→</div>
              <div class="meta-box">
                <div class="meta-icon">📦</div>
                <div class="meta-title">meta.json</div>
                <div class="meta-content">
                  <pre>{ version: "2.1.2.3" }</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 푸시 데이터 관리 -->
      <section class="tech-section">
        <h2 class="section-title">푸시 데이터 관리</h2>
        <div class="section-content">
          <p>
            서버에 푸시 데이터를 저장하지 않고, 프론트엔드에서 디바이스에 저장/관리.
            푸시 알림은 네이티브 기능이고 UI는 웹뷰로 구현.
            네이티브 앱과 웹뷰 간의 데이터 전달이 중요.
          </p>
          <div>
            <img src="/assets/portfolio/push.png" alt="푸시 데이터 관리" />
          </div>

          <div class="push-flow-diagram">
            <!-- Server → FCM -->
            <div class="push-flow-row">
              <div class="push-node">Server</div>
              <div class="push-arrow">→</div>
              <div class="push-node">FCM</div>
            </div>

            <!-- FCM 분기 -->
            <div class="push-flow-row">
              <div class="push-node">FCM</div>
            </div>

            <div class="push-branch-container">
              <!-- Background 경로 -->
              <div class="push-branch">
                <div class="push-flow-row">
                  <div class="push-node state">Background</div>
                  <div class="push-arrow">→</div>
                  <div class="push-node">안드로이드 앱 (Native)</div>
                  <div class="push-label">Noti 표시</div>
                </div>
                <div class="push-note">
                  앱이 꺼져 있는 상태이기 때문에, ROOM 에 노티 데이터를 일단 저장
                </div>
                <div class="push-flow-row">
                  <div class="push-node storage">ROOM</div>
                  <div class="push-arrow-bidirectional">↔</div>
                  <div class="push-node">안드로이드 앱 (Native)</div>
                </div>
                <div class="push-note">
                  앱이 가동되는 순간 웹뷰로 푸시 데이터 전달
                </div>
                <div class="push-flow-row">
                  <div class="push-node">안드로이드 앱 (Native)</div>
                  <div class="push-arrow">→</div>
                  <div class="push-node">웹뷰</div>
                </div>
              </div>

              <!-- Foreground 경로 -->
              <div class="push-branch">
                <div class="push-flow-row">
                  <div class="push-node state">Foreground</div>
                  <div class="push-arrow">→</div>
                  <div class="push-node">안드로이드 앱 (Native)</div>
                  <div class="push-label">Noti 표시</div>
                </div>
                <div class="push-note">
                  켜져 있는 웹뷰에 바로 전달
                </div>
                <div class="push-flow-row">
                  <div class="push-node">안드로이드 앱 (Native)</div>
                  <div class="push-arrow">→</div>
                  <div class="push-node">웹뷰</div>
                </div>
              </div>
            </div>

            <!-- 웹뷰 저장 -->
            <div class="push-flow-row">
              <div class="push-node">웹뷰</div>
            </div>
            <div class="push-note final">
              웹뷰에서는 IndexedDB 에 저장
            </div>
            <div class="push-flow-row">
              <div class="push-node storage">IndexedDB</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CICD -->
      <section class="tech-section">
        <h2 class="section-title">CICD</h2>
        <div class="section-content">
          <p>
            Github actions 를 활용해 CICD 진행
          </p>

          <!-- 초기 CICD 프로세스 -->
          <div class="cicd-subsection">
            <h3 class="subsection-title">초기 CICD 프로세스</h3>
            <p>
              초기에는 단순히 빌드 후 배포까지 한번에 진행
            </p>
            <div class="cicd-flow">
              <div class="cicd-flow-row">
                <div class="cicd-node">Build Storybook</div>
                <div class="cicd-node">Build</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-down">↓</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Artifact</div>
                <div class="cicd-node sub">Datadog sourcemap</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-right">→</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Deploy</div>
                <div class="cicd-node sub">Datadog upload</div>
              </div>
            </div>
          </div>

          <!-- CI/CD 분리 -->
          <div class="cicd-subsection">
            <h3 class="subsection-title">CI/CD 분리</h3>
            <p>
              CI CD를 분리함
            </p>
            <p>
              스토리북은 보는 이는 없고 관리포인트가 늘어서 삭제함
            </p>
            <div class="cicd-flow">
              <div class="cicd-flow-row">
                <div class="cicd-node">Build</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-down">↓</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Artifact</div>
                <div class="cicd-node sub">Datadog sourcemap</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-right">→</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Github</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-down">↓</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Deploy (workflow_dispatch)</div>
                <div class="cicd-node sub">Datadog upload</div>
              </div>
            </div>
          </div>

          <!-- release 자동 생성 -->
          <div class="cicd-subsection">
            <h3 class="subsection-title">release 자동 생성</h3>
            <p>
              지정 태그로 배포/롤백 구조 구성
            </p>
            <div class="cicd-flow">
              <div class="cicd-flow-row">
                <div class="cicd-node">Build</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-arrow-down">↓</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-node">Artifact</div>
              </div>
              <div class="cicd-flow-row">
                <div class="cicd-branch-container">
                  <div class="cicd-arrow-right">→</div>
                  <div class="cicd-node">Github</div>
                </div>
                <div class="cicd-branch-container">
                  <div class="cicd-arrow-down">↓</div>
                  <div class="cicd-node">Github release</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 앱 별 빌드 분리 -->
          <div class="cicd-subsection">
            <h3 class="subsection-title">앱 별 빌드 분리, 배포 분리</h3>
            <div class="cicd-app-grid">
              <div class="cicd-app-pair">
                <div class="cicd-node">Build admin</div>
                <div class="cicd-arrow-right">→</div>
                <div class="cicd-node">Artifact admin</div>
              </div>
              <div class="cicd-app-pair">
                <div class="cicd-node">Build driver</div>
                <div class="cicd-arrow-right">→</div>
                <div class="cicd-node">Artifact driver</div>
              </div>
              <div class="cicd-app-pair">
                <div class="cicd-node">Build customer</div>
                <div class="cicd-arrow-right">→</div>
                <div class="cicd-node">Artifact customer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 기획 및 디자인 협업 관점 -->
      <section class="tech-section">
        <h2 class="section-title">기획 및 디자인 협업 관점</h2>
        <div class="section-content">
          <p>
            개발자로서 개발만 하는 것이 아니라 프로덕트를 함께 만들어나간다고 생각합니다.
          </p>
          <p>
            기획 및 디자인이 진행되면서도 좋은 방향을 떠올리려 하고 도움이 될 수 있도록 의견을 피력합니다.
          </p>

          <!-- 드라이버 계근 플로우 화면 설계 -->
          <div class="design-collaboration-subsection">
            <h3 class="subsection-title">드라이버 계근 플로우 화면 설계</h3>
            <p>
              기사님이 여러 사진을 한번에 계근 작업으로 등록하는 플로우가 제안됨
              사진 하나씩 등록하는 게 맞다고 의견을 제시하고, 받아들여짐
            </p>

            <div class="consideration-list">
              <div class="consideration-item">
                <span class="consideration-bullet">*</span>
                <span>기사님의 연령대</span>
              </div>
              <div class="consideration-item">
                <span class="consideration-bullet">*</span>
                <span>UIUX 복잡도를 고려</span>
              </div>
              <div class="consideration-item">
                <span class="consideration-bullet">*</span>
                <span>여러개를 한번에 왔다갔다하며 수정하는 것보다. 하나씩 흐름대로 진행하는 편이 직관적일 것이라 예상</span>
              </div>
              <div class="consideration-item">
                <span class="consideration-bullet">*</span>
                <span>여러장을 한번에 업로드하는 횟수가 적음</span>
              </div>
              <div class="consideration-item">
                <span class="consideration-bullet">*</span>
                <span>화면 설계 복잡도도 낮춤</span>
              </div>
            </div>

            <!-- 화면 이미지 공간 -->
            <div class="driver-flow-screenshots">
              <div class="screenshot-container">
                <img src="/assets/portfolio/driver-flow-1.png" alt="Step 1: 계근 정보 입력" />
              </div>
              <div class="screenshot-container">
                <img src="/assets/portfolio/driver-flow-2.png" alt="Step 2: 수거 작업 선택" />
              </div>
              <div class="screenshot-container">
                <img src="/assets/portfolio/driver-flow-3.png" alt="Step 3: 총 계근 정보" />
              </div>
              <div class="screenshot-container">
                <img src="/assets/portfolio/driver-flow-4.png" alt="Step 4: 계근 작업 등록" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './project-styles.scss';

.project-content {
  display: flex;
  flex-direction: column;
}

.project-description {
  font-size: 16px;
  line-height: 1.2;
  color: #111111;
  margin-top: 8px;

  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

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
  font-size: 28px;
  line-height: 1.2;
  margin: 0 0 24px 0;
  color: #050505;
  font-weight: 600;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 16px;

  >p {
    font-size: 15px;
    line-height: 1.8;
    color: #111111;
    margin: 0;
  }
}

.goal-list {
  margin: 0;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    font-size: 15px;
    line-height: 1.8;
    color: #111111;
  }
}

.tech-stack-list {
  font-size: 15px;
  line-height: 1.8;
  color: #111111;
  padding: 16px 20px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
}

.contribution-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
}

.contribution-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
  padding: 24px;
}

.contribution-title {
  font-size: 18px;
  font-weight: 600;
  color: #433021;
  margin: 0 0 8px 0;
}

.contribution-list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    font-size: 14px;
    line-height: 1.7;
    color: #111111;
  }
}

.team-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.team-box {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
  padding: 20px 24px;
  min-width: 300px;
  text-align: center;
}

.team-year {
  font-size: 18px;
  font-weight: 600;
  color: #433021;
  margin-bottom: 8px;
}

.team-members {
  font-size: 14px;
  line-height: 1.6;
  color: #111111;
}

.team-arrow {
  font-size: 24px;
  color: #433021;
  font-weight: bold;
}

// 설계 관점
.design-grid {
  display: flex;
  gap: 24px;
  margin: 24px 0;
}

.design-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
  padding: 24px;
}

.design-column-title {
  font-size: 18px;
  font-weight: 600;
  color: #433021;
  margin: 0;
}

.design-column p {
  font-size: 14px;
  line-height: 1.7;
  color: #111111;
  margin: 0;
}

// DTO 도식화
.dto-diagram-section {
  margin-top: 48px;

  >div {
    font-size: 15px;
    line-height: 1.8;
    color: #111111;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 16px;
  }
}

.subsection-title {
  font-size: 20px;
  line-height: 1.4;
  margin: 0 0 24px 0;
  color: #050505;
  font-weight: 600;
}

// provide / inject
.provide-inject-subsection {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(153, 153, 102, 0.2);

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  >p {
    font-size: 15px;
    line-height: 1.8;
    color: #111111;
    margin-bottom: 16px;
  }
}

// 컴포넌트 트리 다이어그램
.component-tree-diagram {
  margin-top: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
}

.tree-root {
  background: rgba(67, 48, 33, 0.15);
  border: 2px solid rgba(67, 48, 33, 0.4);
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #433021;
  text-align: center;
  margin-bottom: 12px;
}

.tree-provide {
  background: rgba(67, 48, 33, 0.1);
  border: 2px dashed rgba(67, 48, 33, 0.3);
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  color: #433021;
  text-align: center;
  margin: 0 auto 16px;
  width: fit-content;
}

.tree-level {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.tree-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #433021;
  text-align: center;
  min-width: 100px;
}

// 웹뷰 캐시 문제
.webview-cache-section {
  margin-top: 32px;
}

.flow-box {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
  padding: 20px 24px;
  margin: 16px 0;
}

.flow-box-title {
  font-size: 16px;
  font-weight: 600;
  color: #433021;
  margin-bottom: 12px;
}

.flow-box-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  margin-bottom: 8px;
  font-style: italic;
}

.flow-box p {
  font-size: 14px;
  line-height: 1.7;
  color: #111111;
  margin: 0;
}

.flow-arrow-down {
  font-size: 24px;
  color: #433021;
  font-weight: bold;
  text-align: center;
  margin: 8px 0;
}

// UI 예제
.webview-ui-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.ui-example {
  display: flex;
  justify-content: center;
}

.modal-preview {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  overflow: hidden;

  &.error {
    border-color: rgba(239, 68, 68, 0.3);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(153, 153, 102, 0.2);
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #050505;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    color: #333;
  }
}

.modal-body {
  padding: 20px;
}

.modal-message {
  font-size: 14px;
  line-height: 1.6;
  color: #111111;
  margin: 0 0 16px 0;
}

.version-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(248, 247, 242, 0.6);
  border-radius: 8px;
}

.version-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.version-label {
  color: #666;
}

.version-value {
  font-weight: 600;
  color: #433021;
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 1.5;
  color: #dc2626;
}

.error-icon {
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
}

.modal-button {
  width: 100%;
  padding: 12px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b91c1c;
  }
}

// meta.json 구조
.meta-json-section {
  margin-top: 32px;
  padding: 24px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
}

.meta-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-label {
  font-size: 14px;
  font-weight: 500;
  color: #433021;
}

.meta-arrow {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
}

.meta-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
}

.meta-icon {
  font-size: 24px;
}

.meta-title {
  font-size: 14px;
  font-weight: 600;
  color: #433021;
}

.meta-content {
  background: rgba(67, 48, 33, 0.05);
  border: 1px solid rgba(67, 48, 33, 0.2);
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
  color: #433021;

  pre {
    margin: 0;
    font-family: inherit;
  }
}

// 푸시 데이터 관리
.push-flow-diagram {
  margin-top: 32px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
}

.push-flow-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 12px 0;
  flex-wrap: wrap;
}

.push-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #433021;
  text-align: center;
  min-width: 120px;

  &.state {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.4);
    color: #1e40af;
  }

  &.storage {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.4);
    color: #15803d;
  }
}

.push-arrow {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
  flex-shrink: 0;
}

.push-arrow-bidirectional {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
  flex-shrink: 0;
}

.push-label {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  padding: 4px 8px;
  background: rgba(248, 247, 242, 0.8);
  border-radius: 4px;
}

.push-branch-container {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin: 24px 0;
  flex-wrap: wrap;
}

.push-branch {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(248, 247, 242, 0.4);
  border: 1px dashed rgba(153, 153, 102, 0.3);
  border-radius: 12px;
}

.push-note {
  font-size: 12px;
  line-height: 1.5;
  color: #666;
  text-align: center;
  margin: 8px 0;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  font-style: italic;

  &.final {
    margin-top: 16px;
    font-weight: 500;
    color: #433021;
  }
}

// CICD
.cicd-subsection {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(153, 153, 102, 0.2);

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  >p {
    font-size: 15px;
    line-height: 1.8;
    color: #111111;
    margin-bottom: 16px;
  }
}

.cicd-flow {
  margin-top: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(153, 153, 102, 0.3);
  border-radius: 12px;
}

.cicd-flow-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 8px 0;
  flex-wrap: wrap;
}

.cicd-node {
  background: rgba(67, 48, 33, 0.1);
  border: 2px solid rgba(67, 48, 33, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #433021;
  text-align: center;
  min-width: 100px;

  &.sub {
    font-size: 11px;
    padding: 6px 12px;
    background: rgba(67, 48, 33, 0.05);
    border-color: rgba(67, 48, 33, 0.2);
  }
}

.cicd-arrow-down {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
}

.cicd-arrow-right {
  font-size: 20px;
  color: #433021;
  font-weight: bold;
}

.cicd-branch-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px;
}

.cicd-app-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.cicd-app-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
}

// 기획 및 디자인 협업 관점
.design-collaboration-subsection {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(153, 153, 102, 0.2);
}

.consideration-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  padding: 20px;
  background: rgba(248, 247, 242, 0.6);
  border: 1px solid rgba(153, 153, 102, 0.2);
  border-radius: 12px;
}

.consideration-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: #111111;
}

.consideration-bullet {
  font-weight: 600;
  color: #433021;
  flex-shrink: 0;
}

// 드라이버 플로우 화면
.driver-flow-screenshots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 32px 0;
}

.screenshot-container {
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: rgba(248, 247, 242, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }

  .team-box {
    min-width: auto;
    width: 100%;
  }

  .design-grid {
    flex-direction: column;
    gap: 16px;
  }

  .dto-flow {
    flex-direction: column;
  }

  .dto-arrow {
    transform: rotate(90deg);
  }

  .tree-level {
    flex-direction: column;
    align-items: center;
  }

  .webview-ui-examples {
    grid-template-columns: 1fr;
  }

  .meta-flow {
    flex-direction: column;
  }

  .meta-arrow {
    transform: rotate(90deg);
  }

  .push-branch-container {
    flex-direction: column;
  }

  .push-branch {
    min-width: auto;
    width: 100%;
  }

  .push-flow-row {
    flex-direction: column;
  }

  .push-arrow,
  .push-arrow-bidirectional {
    transform: rotate(90deg);
  }

  .driver-flow-screenshots {
    grid-template-columns: 1fr;
  }
}
</style>
