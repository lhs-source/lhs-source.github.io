<script setup lang="ts">
</script>

<template>
    <div class="resume-background">
        <div class="resume-container">
            <header class="resume-header">
                <div class="profile-section">
                    <div class="profile-info">
                        <h1 class="name">Datadog Observability 발표</h1>
                        <h2 class="title">Datadog Korea Observability Day 2024</h2>
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

                <h3 class="subsection-title">1. 에러 대응</h3>
                <ul class="content-list">
                    <li class="content-item">HEIC 파일 형식 업로드 이슈를 Datadog 에러 스택과 로그를 통해 빠르게 파악하고, 업로드 파이프라인을 개선한 사례</li>
                    <li class="content-item">서비스 특성에 맞는 대시보드와 알림 룰 구성</li>
                </ul>

                <h3 class="subsection-title">2. 데이터 기반 의사결정</h3>
                <ul class="content-list">
                    <li class="content-item">실제 사용량 데이터를 바탕으로 배포 시간대를 조정하여 장애 리스크와 사용자 불편 최소화</li>
                    <li class="content-item">OS/기기 비율 분석을 통해 우선 지원 환경을 결정</li>
                </ul>

                <h3 class="subsection-title">3. 사용성 측정</h3>
                <ul class="content-list">
                    <li class="content-item">Custom Action을 활용해 주요 행동 퍼널을 정의하고, 단계별 이탈 지점을 분석</li>
                </ul>

                <div class="content-text mt-6">
                    <p>스타트업 환경에서 "감"이 아닌 데이터 기반으로 제품·운영 의사결정을 내릴 수 있도록 만든 여정을 공유했습니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">발표 자료 및 링크</h2>
                <ul class="content-list">
                    <li class="content-item">
                        <strong>컨퍼런스</strong>: <a
                            href="https://www.datadoghq.com/ko/event/datadogliveseoul2024/#speakers" target="_blank"
                            class="content-link">Datadog Live Seoul 2024</a>
                    </li>
                    <li class="content-item">
                        <strong>발표 자료</strong>: <a
                            href="https://tech.e3view.com/content/files/2024/10/--------------------------------------------------------------------------------------.pdf"
                            target="_blank" class="content-link">웨이스트 매니지먼트 스타트업 프론트엔드 효율적인 모니터링 시스템 구축 - 리코</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './project-styles.scss';
</style>
