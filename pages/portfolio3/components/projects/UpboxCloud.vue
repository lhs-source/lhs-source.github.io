<script setup lang="ts">
const portfolioItems = [
    {
        title: '유효성 검사 시스템 경량화',
        subtitle: 'Validation System',
        headline: '사내 디자인 시스템과 100% 호환되는 경량 검증 구조 구축',
        resumeContext: {
            role: '업박스 클라우드 프론트엔드 리드',
            period: '2023년 6월 ~ 2023년 12월',
            team: 'FE 2명 · 기획 1명 · 디자인 1명',
            stack: 'Vue3, TypeScript, Vite, TailwindCSS',
        },
        situation:
            '외부 유효성 검사 라이브러리는 사내 디자인 시스템과 호환이 어렵고, 불필요한 기능이 많아 프론트엔드 유지보수가 부담스러웠음.',
        task:
            '경량화된 직접 구현 방식을 도입하고 컴포넌트별 커스텀과 복잡한 유효성 케이스를 지원하는 composable 구조로 새롭게 구성하기로 결정함.',
        action: [
            '외부 라이브러리 의존성을 제거하고 Vue composable 패턴으로 useValidate, useValidateRoot를 개발하여 독립적·전역적 검증 시나리오를 모두 대응.',
            '디자인 요구와 업무 맥락에 맞춘 옵션을 설계해 다양한 UI 컴포넌트에서 유연하게 재사용할 수 있도록 확장.',
        ],
        result:
            '불필요한 코드가 크게 감소했고 번들 사이즈가 약 15% 축소됨. 사내 디자인 시스템과 100% 호환을 이루며 폼 표준화를 추진할 기반을 마련함.',
        problemSolving: [
            {
                title: '경량 검증 엔진 직접 구현',
                details: [
                    '기존 라이브러리의 옵션과 에러 메시지 구조를 역설계해 조직 맞춤형 스키마 DSL을 정의.',
                    'provide/inject 를 활용해 루트-자식 간 상태 공유를 단순화하고 커스텀 메시지/비동기 검증을 지원.',
                ],
            },
            {
                title: '디자인 시스템과의 정합성 확보',
                details: [
                    'UDS(Upbox Design System)의 에러 표현 방식과 토큰을 정리해 계산된 상태로 주입하여 스타일 파편화 제거.',
                    'Storybook 자동 문서화를 통해 QA와 디자인팀이 검증 규칙을 즉시 확인하도록 워크플로우 개선.',
                ],
            },
        ],
    },
    {
        title: '웹뷰 캐시 및 배포 버전 관리',
        subtitle: 'WebView Cache & Release',
        headline: '실시간 버전 관제와 강제 업데이트 도입으로 배포 안정성 확보',
        resumeContext: {
            role: '업박스 클라우드 프론트엔드 개발',
            period: '2022년 3월 ~ 2022년 8월',
            team: 'FE 2명 · Android 1명 · PO 1명',
            stack: 'Vue3, Android Kotlin, Github Actions, AWS S3',
        },
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
        problemSolving: [
            {
                title: '버전 추적 자동화',
                details: [
                    'DataDog 세션리플레이와 릴리즈 태그를 연동해 장애 발생 버전을 자동으로 식별.',
                    'S3 meta.json에 Git SHA와 배포 시간을 기록하고 클라이언트에서 폴링해 불일치 즉시 안내.',
                ],
            },
            {
                title: '강제 업데이트 UX 설계',
                details: [
                    'Android WebView에 Google Play 강제 업데이트 로직을 연계해 현장 사용자가 즉시 최신 빌드를 수신.',
                    '구버전 접근 시 데이터 손실을 방지하기 위해 IndexedDB 백업과 안내 모달을 병행 제공.',
                ],
            },
        ],
    },
    {
        title: '푸시 알림 로컬 저장 구조 개선',
        subtitle: 'Push Notification Persistence',
        headline: 'FCM 알림 누락 0% 달성을 위한 저장 및 전달 구조 리빌딩',
        resumeContext: {
            role: '업박스 클라우드 Android · Web 연동',
            period: '2022년 10월 ~ 2023년 2월',
            team: 'Android 1명 · FE 1명',
            stack: 'Android Kotlin, Room DB, Vue3, IndexedDB',
        },
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
        problemSolving: [
            {
                title: '상태별 데이터 파이프라인 재설계',
                details: [
                    'Foreground, Background, 앱 종료 상태를 분리해 저장 경로를 정의하고 공통 인터페이스로 웹에 전달.',
                    'Room DB와 IndexedDB 간 데이터 중복을 방지하기 위해 타임스탬프 기반 멱등 처리 로직 추가.',
                ],
            },
            {
                title: '알림 UX 개선',
                details: [
                    '웹뷰 재진입 시 미확인 알림을 배치로 전달하고, 사용자에게 읽음 상태를 명확히 안내.',
                    '신규 구조를 QA 시나리오로 문서화해 현장 피드백 수집 시간을 절반으로 단축.',
                ],
            },
        ],
    },
    {
        title: '스케줄 편집 화면 구조 개선',
        subtitle: 'Schedule Editor',
        headline: '데이터 흐름 재설계로 렌더링 성능 20% 향상',
        resumeContext: {
            role: '업박스 클라우드 프론트엔드 개발',
            period: '2023년 1월 ~ 2023년 4월',
            team: 'FE 2명 · 기획 1명',
            stack: 'Vue3, TypeScript, Pinia',
        },
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
        problemSolving: [
            {
                title: '데이터 흐름 최적화',
                details: [
                    'useScheduleInjection composable을 설계해 필요한 데이터만 제공하고, 나머지는 지연 로딩으로 전환.',
                    '복잡한 권한 조건을 런타임 체크에서 compile-time 유효성으로 전환해 오류 발생률을 낮춤.',
                ],
            },
            {
                title: '성능 안정화',
                details: [
                    '렌더링 비용이 큰 섹션을 가상 스크롤과 lazy evaluation으로 치환해 첫 렌더 시간을 단축.',
                    'Pinia 스토어를 계층별로 분해하여 구독 범위를 좁히고 디버깅 가시성을 높임.',
                ],
            },
        ],
    },
];
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

            <!-- 포트폴리오 항목들 -->
            <section class="portfolio-section">
                <h2 class="section-title">주요 프로젝트 경험</h2>
                <p class="section-description">
                    복잡한 제품 환경에서 비즈니스 가치를 빠르게 전달하기 위해 STAR 사고방식으로 문제를 정의하고 실행한 경험들입니다.
                </p>

                <div class="portfolio-timeline">
                    <div v-for="(item, index) in portfolioItems" :key="item.title" class="timeline-entry">
                        <div class="timeline-axis">
                            <div class="timeline-dot" />
                            <div v-if="index !== portfolioItems.length - 1" class="timeline-line" />
                            <span class="timeline-period">{{ item.resumeContext.period }}</span>
                        </div>

                        <article class="timeline-card portfolio-card">
                            <header class="card-header">
                                <div>
                                    <p class="card-subtitle">{{ item.subtitle }}</p>
                                    <h3 class="card-title">{{ item.title }}</h3>
                                </div>
                                <p class="card-headline">
                                    {{ item.headline }}
                                </p>
                            </header>

                            <div class="resume-context">
                                <div class="resume-context-block">
                                    <span class="resume-context-label">역할</span>
                                    <p class="resume-context-text">{{ item.resumeContext.role }}</p>
                                </div>
                                <div class="resume-context-block">
                                    <span class="resume-context-label">기간</span>
                                    <p class="resume-context-text">{{ item.resumeContext.period }}</p>
                                </div>
                                <div class="resume-context-block">
                                    <span class="resume-context-label">팀 구성</span>
                                    <p class="resume-context-text">{{ item.resumeContext.team }}</p>
                                </div>
                                <div class="resume-context-block">
                                    <span class="resume-context-label">핵심 기술</span>
                                    <p class="resume-context-text">{{ item.resumeContext.stack }}</p>
                                </div>
                            </div>

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
                                            <li v-for="action in item.action" :key="action" class="star-list-item">
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

                            <div class="problem-solving-detail">
                                <h4 class="problem-solving-heading">문제 해결 경험 심화</h4>
                                <div class="problem-solving-grid">
                                    <article v-for="problem in item.problemSolving" :key="problem.title"
                                        class="problem-card">
                                        <h5 class="problem-title">{{ problem.title }}</h5>
                                        <ul class="problem-list">
                                            <li v-for="detail in problem.details" :key="detail" class="problem-item">
                                                {{ detail }}
                                            </li>
                                        </ul>
                                    </article>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
.project-page {
    // Removed animation to let stack handle it
    width: 100%;
}

.project-content {
    display: flex;
    flex-direction: column;
}

.project-title {
    font-size: 32px; // Adjusted for paper
    line-height: 1.2;
    margin: 0;
    color: #050505;
    font-weight: 600;
}

.project-subtitle {
    font-size: 18px; // Adjusted
    line-height: 1.4;
    margin: 0;
    color: #171717;
    font-weight: 400;
}

.project-description {
    font-size: 16px; // Adjusted
    line-height: 1.8;
    color: #111111;
    margin-top: 8px;
}

.project-body {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #e2e8f0;
}

.project-text {
    font-size: 15px; // Adjusted
    line-height: 1.8;
    color: #181818;
}

.portfolio-section {
    margin-top: 64px;
    padding-top: 48px;
    border-top: 2px solid rgba(153, 153, 102, 0.3);
}

.section-title {
    font-size: 28px; // Adjusted
    line-height: 1.2;
    margin: 0 0 12px 0;
    color: #050505;
    font-weight: 600;
}

.section-description {
    font-size: 15px;
    line-height: 1.7;
    color: #111111;
    margin: 0 0 48px 0;
}

.portfolio-timeline {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.timeline-entry {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 32px;
    position: relative;
}

.timeline-axis {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 4px;
}

.timeline-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #433021;
    box-shadow: 0 0 0 4px rgba(67, 48, 33, 0.15);
    flex-shrink: 0;
}

.timeline-line {
    flex: 1;
    width: 2px;
    background: linear-gradient(180deg, rgba(67, 48, 33, 0.4), rgba(67, 48, 33, 0));
    min-height: 40px;
}

.timeline-period {
    font-size: 12px;
    font-weight: 500;
    color: #433021;
    text-align: center;
    line-height: 1.4;
    writing-mode: vertical-rl;
    text-orientation: mixed;
}

.portfolio-card {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(153, 153, 102, 0.2);
    border-radius: 16px;
    padding: 32px 36px;
    box-shadow: 0 8px 24px -12px rgba(17, 17, 17, 0.2);
    display: flex;
    flex-direction: column;
    gap: 28px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px -16px rgba(17, 17, 17, 0.3);
    }
}

.card-header {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .card-subtitle {
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #433021;
        margin: 0;
        font-weight: 500;
    }

    .card-title {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #050505;
        line-height: 1.3;
    }

    .card-headline {
        font-size: 16px;
        margin: 0;
        color: #111111;
        line-height: 1.6;
        font-weight: 500;
    }
}

.resume-context {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    background: rgba(214, 211, 196, 0.4);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(153, 153, 102, 0.15);
}

.resume-context-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.resume-context-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #433021;
}

.resume-context-text {
    margin: 0;
    font-size: 13px;
    color: #111111;
    line-height: 1.5;
    font-weight: 500;
}

.star-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.star-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.star-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(248, 247, 242, 0.6);
    padding: 18px;
    border-radius: 12px;
    border: 1px solid rgba(153, 153, 102, 0.1);
}

.star-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #433021;
}

.star-text {
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    color: #111111;
    font-weight: 500;
}

.star-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.star-list-item {
    font-size: 14px;
    line-height: 1.6;
    color: #111111;
    font-weight: 500;
}

.problem-solving-detail {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .problem-solving-heading {
        font-size: 16px;
        font-weight: 600;
        color: #050505;
        margin: 0;
    }
}

.problem-solving-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}

.problem-card {
    border: 1px solid rgba(153, 153, 102, 0.2);
    border-radius: 12px;
    padding: 18px;
    background: rgba(248, 247, 242, 0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;

    .problem-title {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        color: #433021;
    }

    .problem-list {
        margin: 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .problem-item {
            font-size: 13px;
            line-height: 1.5;
            color: #111111;
            font-weight: 500;
        }
    }
}

@media (max-width: 768px) {
    .timeline-entry {
        grid-template-columns: minmax(0, 1fr);
        gap: 20px;
    }

    .timeline-axis {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
    }

    .timeline-dot {
        width: 12px;
        height: 12px;
        box-shadow: 0 0 0 3px rgba(67, 48, 33, 0.15);
    }

    .timeline-line {
        display: none;
    }

    .timeline-period {
        writing-mode: horizontal-tb;
        text-orientation: mixed;
    }

    .portfolio-card {
        padding: 24px;
    }

    .card-title {
        font-size: 20px;
    }

    .card-headline {
        font-size: 15px;
    }

    .resume-context {
        grid-template-columns: 1fr 1fr;
    }

    .star-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .star-column {
        gap: 16px;
    }

    .problem-solving-grid {
        grid-template-columns: 1fr;
    }
}
</style>
