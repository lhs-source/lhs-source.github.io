<script setup lang="ts">
</script>

<template>
    <div class="project-page">
        <div class="project-content">
            <h1 class="project-title">하나1QPay NFC 결제 모듈</h1>
            <h2 class="project-subtitle">뱅크비 · Java, C/C++ (2017.06 ~ 2018.08)</h2>

            <div class="project-description">
                하나카드 1QPay 앱 내 NFC 결제 모듈을 유지보수하며,
                EMV 스펙과 토큰화 기반 보안 구조를 이해하고 개선했습니다.
            </div>

            <div class="project-body">
                <div class="project-text">
                    하나카드 1QPay 앱에 탑재되는 NFC 모듈로,<br>
                    EMV 스펙 기반의 HCE 결제 통신과 토큰화 보안을 제공합니다.<br><br>

                    담당 역할:<br><br>
                    - Android Java/JNI를 활용한 NFC 결제 모듈 유지보수<br>
                    - VISA 토큰 발급 및 EMV 결제 스펙 분석·적용<br>
                    - C++로 구현된 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 빌드하고, JNI로 연동<br><br>

                    보안 모듈을 실제 상용 서비스에 적용하며,<br>
                    모바일 결제 보안 체계 전반을 경험한 프로젝트입니다.<br>
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
