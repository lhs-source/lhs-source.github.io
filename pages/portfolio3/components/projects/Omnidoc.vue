<script setup lang="ts">
</script>

<template>
    <div class="project-page">
        <div class="project-content">
            <h1 class="project-title">Omnidoc 문서발급 솔루션</h1>
            <h2 class="project-subtitle">뱅크비 · C/C++ (2019.04 ~ 2020.12)</h2>

            <div class="project-description">
                여러 민원 사이트에서 다양한 문서를 자동 발급하는 솔루션에서,
                주요 사이트 스크래핑 모듈을 담당했습니다.
            </div>

            <div class="project-body">
                <div class="project-text">
                    Omnidoc은 17여 개 민원 사이트에서 40여 종의 민원 문서를 자동 발급해주는 솔루션입니다.<br><br>

                    담당 역할:<br><br>
                    - 금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등 주요 사이트 스크래핑 담당<br>
                    - 사이트별 보안/인증 흐름을 분석하고, 변경에 대응하기 위한 구조 설계<br><br>

                    민원 특성상 장애 허용 범위가 매우 낮기 때문에,<br>
                    장애 시 빠르게 원인을 파악할 수 있도록 로깅과 모듈 구조를 세심하게 설계했습니다.<br>
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
