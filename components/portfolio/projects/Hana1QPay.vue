<script setup lang="ts">
const techStack = ['Java', 'C/C++']

const techIconMap: Record<string, string> = {
    'Java': '/assets/portfolio/tools/java-4-logo-svgrepo-com.svg',
    'C/C++': '/assets/portfolio/tools/ISO_C++_Logo.svg'
}

const getTechIcon = (techName: string): string | null => {
    return techIconMap[techName] ?? null
}
</script>

<template>
    <div class="resume-background">
        <div class="resume-container">
            <header class="resume-header">
                <div class="profile-section">
                    <div class="profile-info">
                        <h1 class="name">하나1QPay NFC 결제 모듈</h1>
                        <h2 class="title">뱅크비 · Java, C/C++ (2017.06 ~ 2018.08)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">프로젝트 내용</h2>
                <div class="content-text">
                    <p>하나카드 1QPay 앱 내 NFC 결제 모듈을 유지보수하며, EMV 스펙과 토큰화 기반 보안 구조를 이해하고 개선했습니다.</p>
                    <p>하나카드 1QPay 앱에 탑재되는 NFC 모듈로, EMV 스펙 기반의 HCE 결제 통신과 토큰화 보안을 제공합니다.</p>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">사용 기술</h2>
                <div class="tech-stack-grid">
                    <div v-for="tech in techStack" :key="tech" class="tech-item-grid">
                        <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)!" :alt="tech" class="tech-icon" />
                        <span class="tech-name">{{ tech }}</span>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">역할 및 기여</h2>
                <div class="content-text">
                    <p><strong>담당 역할:</strong></p>
                    <ul class="content-list">
                        <li class="content-item">Android Java/JNI를 활용한 NFC 결제 모듈 유지보수</li>
                        <li class="content-item">VISA 토큰 발급 및 EMV 결제 스펙 분석·적용</li>
                        <li class="content-item">C++로 구현된 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 빌드하고, JNI로 연동</li>
                    </ul>
                    <p class="mt-4">보안 모듈을 실제 상용 서비스에 적용하며, 모바일 결제 보안 체계 전반을 경험한 프로젝트입니다.</p>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './project-styles.scss';

.tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
    margin-top: 16px;

    @media (max-width: 720px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
    }

    .tech-item-grid {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        background: #f0f0f0;
        padding: 8px;
        border-radius: 6px;
        min-height: 60px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        @media (max-width: 720px) {
            padding: 6px;
            min-height: 50px;
            gap: 3px;
        }

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tech-icon {
            width: 30px;
            height: 30px;
            object-fit: contain;
            flex-shrink: 0;

            @media (max-width: 720px) {
                width: 24px;
                height: 24px;
            }
        }

        .tech-name {
            font-size: 12px;
            color: #555;
            text-align: center;
            font-weight: 500;
            line-height: 1.4;
            word-break: keep-all;

            @media (max-width: 720px) {
                font-size: 12px;
                line-height: 1.2;
            }
        }
    }
}
</style>
