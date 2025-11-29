<script setup lang="ts">
</script>

<template>
    <div class="resume-background">
        <div class="resume-container">
            <header class="resume-header">
                <div class="profile-section">
                    <div class="profile-info">
                        <h1 class="name">뱅크비 통합계좌관리</h1>
                        <h2 class="title">뱅크비 · C/C++ (2019.09 ~ 2020.12)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">프로젝트 내용</h2>
                <div class="content-text">
                    <p>베트남 여러 은행을 자동으로 연결해 계좌를 통합 조회하는 모바일 서비스의 스크래핑 모듈과 핵심 로직을 담당했습니다.</p>
                    <p>베트남 은행을 자동으로 연결해 입출금 내역을 조회하고, 여러 계좌를 한 번에 관리할 수 있는 통합계좌관리 서비스입니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">역할 및 기여</h2>
                <div class="content-text">
                    <p><strong>담당 역할:</strong></p>
                    <ul class="content-list">
                        <li class="content-item">각 은행(BIDV, Vietcom, TP 등)에 대한 스크래핑 모듈 개발(C/C++)</li>
                        <li class="content-item">은행별 로그인/보안 정책 차이에 대응하는 공통 모듈 설계</li>
                        <li class="content-item">크로스 플랫폼 CMake 빌드 환경 구성</li>
                    </ul>
                    <p class="mt-4"><strong>추가 성과:</strong></p>
                    <ul class="content-list">
                        <li class="content-item">베트남 현지에서 직접 협력사와 업무 진행</li>
                        <li class="content-item">현지 금융 환경과 네트워크 특성을 이해하고, 실제 사용자 시나리오에 맞춘 에러 케이스 보완 작업 수행</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './project-styles.scss';
</style>
