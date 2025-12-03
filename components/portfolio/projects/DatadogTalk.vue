<script setup lang="ts">
</script>

<template>
    <div class="resume-background">
        <div class="resume-container">
            <header class="resume-header">
                <div class="profile-section">
                    <div class="profile-info">
                        <h1 class="name">Datadog Live Seoul 2024 발표</h1>
                        <h2 class="title">Datadog Live Seoul 2024 - 웨이스트 매니지먼트 스타트업 프론트엔드 개발자의 Datadog을 활용한 효율적인 모니터링 시스템 구축기</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">개요</h2>
                <div class="content-text">
                    <p>웨이스트 매니지먼트 스타트업 프론트엔드 개발자로서 Datadog을 활용해 에러 분석과 사용성 측정, 데이터 기반 의사결정을 정착시킨 경험을 공유한 세션입니다.</p>
                    <p>Datadog Korea Observability Day 2024에서 "웨이스트 매니지먼트 스타트업 프론트엔드 개발자의 Datadog을 활용한 효율적인 모니터링 시스템
                        구축기"라는 주제로 발표했습니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">발표 주요 내용</h2>

                <h3 class="subsection-title">에러 대응</h3>
                <ul class="content-list">
                    <li class="content-item">
                        <strong>HEIC 업로드 에러 모니터링</strong>
                        <ul class="content-list">
                            <li class="content-item">Datadog 에러 스택과 로그를 활용해 HEIC 업로드 실패 구간을 정확히 추적</li>
                            <li class="content-item">문제가 되는 업로드 경로를 분리하고, 포맷/용량 검증 로직을 추가해 재발률을 크게 감소</li>
                        </ul>
                    </li>
                    <li class="content-item">
                        <strong>대시보드 & 알림 룰 구성</strong>
                        <ul class="content-list">
                            <li class="content-item">서비스 특성(야간·주간 트래픽 등)에 맞는 에러/성능 지표를 선별해 전용 대시보드 구성</li>
                            <li class="content-item">중요도에 따라 알림 채널(슬랙/이메일)을 분리해 노이즈를 줄이고, 꼭 필요한 알림만 받도록 설계</li>
                        </ul>
                    </li>
                </ul>

                <h3 class="subsection-title">데이터 기반 의사결정</h3>
                <ul class="content-list">
                    <li class="content-item">
                        <strong>배포 시간대 최적화</strong>
                        <ul class="content-list">
                            <li class="content-item">실제 사용량·에러율 데이터를 기반으로 트래픽이 가장 적은 시간대를 분석</li>
                            <li class="content-item">해당 시간대로 정기 배포를 고정해 장애 리스크와 사용자 체감 불편을 최소화</li>
                        </ul>
                    </li>
                    <li class="content-item">
                        <strong>지원 환경 우선순위 결정</strong>
                        <ul class="content-list">
                            <li class="content-item">OS/기기 비율 데이터를 수집해 실제 사용 비중이 높은 환경을 파악</li>
                            <li class="content-item">우선 지원 대상(브라우저/OS)을 정의하고, 테스트·QA 우선순위에 반영</li>
                        </ul>
                    </li>
                </ul>

                <h3 class="subsection-title">사용성 측정</h3>
                <ul class="content-list">
                    <li class="content-item">
                        <strong>퍼널 기반 행동 분석</strong>
                        <ul class="content-list">
                            <li class="content-item">Custom Action으로 주요 행동 단계(조회 → 편집 → 저장 등)를 퍼널로 정의</li>
                            <li class="content-item">단계별 이탈 지점을 찾아 UI 개선, 가이드 추가 등 구체적인 액션으로 연결</li>
                        </ul>
                    </li>
                </ul>

                <div class="content-text mt-6">
                    <p>스타트업 환경에서 "감"이 아닌 데이터 기반으로 제품·운영 의사결정을 내릴 수 있도록 만든 여정을 공유했습니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">발표 자료 및 링크</h2>
                <div class="link-cards">
                    <a href="https://www.datadoghq.com/ko/event/datadogliveseoul2024/#speakers" target="_blank" class="link-card">
                        <img src="/assets/portfolio/dd/speaker.png" alt="컨퍼런스" class="link-card-image" />
                        <div class="link-card-content">
                            <h3 class="link-card-title">컨퍼런스</h3>
                            <p class="link-card-text">Datadog Live Seoul 2024</p>
                        </div>
                    </a>
                    <a href="https://tech.e3view.com/content/files/2024/10/--------------------------------------------------------------------------------------.pdf"
                        target="_blank" class="link-card">
                        <img src="/assets/portfolio/dd/speech.png" alt="발표 자료" class="link-card-image" />
                        <div class="link-card-content">
                            <h3 class="link-card-title">발표 자료</h3>
                            <p class="link-card-text">웨이스트 매니지먼트 스타트업 프론트엔드 효율적인 모니터링 시스템 구축 - 리코</p>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use './project-styles.scss';

.link-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .link-card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
            border-color: #333;
        }

        .link-card-image {
            width: 100%;
            height: 160px;
            object-fit: cover;
            flex-shrink: 0;
            display: block;
        }

        .link-card-content {
            padding: 16px 20px 18px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;

            .link-card-title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin: 0;
            }

            .link-card-text {
                font-size: 14px;
                color: #666;
                margin: 0;
                line-height: 1.5;
            }
        }
    }
}
</style>
