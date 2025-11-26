<script setup lang="ts">
</script>

<template>
    <div class="project-page">
        <div class="project-content">
            <h1 class="project-title">TaSIM 카드 암호화 모듈</h1>
            <h2 class="project-subtitle">뱅크비 · Java Card OS (2017.01 ~ 2017.06)</h2>

            <div class="project-description">
                가맹점 단말기와 카드사 간 E2E 암호화를 제공하는 임베디드 카드 암호화 모듈의
                Applet과 관리 도구를 개발했습니다.
            </div>

            <div class="project-body">
                <div class="project-text">
                    TaSIM은 카드사와 가맹점 사이의 E2E 암호화를 수행하는 임베디드 카드 암호화 모듈입니다.<br><br>

                    담당 역할:<br><br>
                    - Java Card OS 상에서 동작하는 암호화 Applet 개발 및 유지보수<br>
                    - 가맹점 단말기에 Applet을 탑재하고 관리하기 위한 MFC 기반 설치 도구 개발<br><br>

                    카드 결제 단말의 제한된 환경에서 동작하는 암호화 모듈을 다루며,<br>
                    저수준 시스템과 보안의 접점을 경험했습니다.<br>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.project-page {
    width: 100%;
}

.project-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.project-title {
    font-size: 32px;
    line-height: 1.2;
    margin: 0;
    color: #050505;
    font-weight: 600;
}

.project-subtitle {
    font-size: 18px;
    line-height: 1.4;
    margin: 0;
    color: #64748b;
    font-weight: 400;
}

.project-description {
    font-size: 16px;
    line-height: 1.8;
    color: #334155;
    margin-top: 8px;
}

.project-body {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #e2e8f0;
}

.project-text {
    font-size: 15px;
    line-height: 1.8;
    color: #475569;
}
</style>
