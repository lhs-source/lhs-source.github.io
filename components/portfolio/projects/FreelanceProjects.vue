<script setup lang="ts">
</script>

<template>
    <div class="resume-background">
        <div class="resume-container">
            <header class="resume-header">
                <div class="profile-section">
                    <div class="profile-info">
                        <h1 class="name">프리랜서 & 사이드 프로젝트</h1>
                        <h2 class="title">MGX, KlookPay 등 (2020 ~ 2021)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">개요</h2>
                <div class="content-text">
                    <p>업무 시간 외에 진행했던 프리랜서 및 사이드 프로젝트를 한 곳에서 정리했습니다. 실 서비스 런칭과 PoC를 모두 경험했습니다.</p>
                    <p>프리랜서와 사이드 프로젝트를 통해 다양한 도메인과 기술 스택을 경험했습니다. 업무 외 프로젝트를 통해 새로운 스택을 빠르게 학습하고, 작은 팀 혹은 개인 단위로도 제품을
                        끝까지 완성하는 경험을 쌓았습니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">주요 프로젝트</h2>

                <h3 class="subsection-title">1. MGX 모바일 게임 시세조회 어플리케이션</h3>
                <p class="content-description mb-4">React Native</p>
                <ul class="content-list">
                    <li class="content-item">리니지M/리니지2M/바람의나라 등 모바일 게임의 아이템 시세 조회·추이·검색 기능 개발</li>
                    <li class="content-item">소식 전하기, 커뮤니티 기능 구현</li>
                    <li class="content-item">Firebase 기반 구글 로그인, 카카오 로그인 연동</li>
                </ul>

                <h3 class="subsection-title">2. KlookPay POC 어플리케이션</h3>
                <p class="content-description mb-4">NodeJS, Angular, NativeScript</p>
                <ul class="content-list">
                    <li class="content-item">KB카드 마일리지·포인트·결제 시스템을 Klook에 연동하는 POC 프로젝트</li>
                    <li class="content-item">Nativescript-ng 기반 안드로이드 앱 기술 지원</li>
                    <li class="content-item">개인 JIRA를 활용한 일정 관리와 태스크 트래킹으로, 1인 진행 환경에서도 체계적인 개발 프로세스를 유지했습니다.</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './project-styles.scss';
</style>
