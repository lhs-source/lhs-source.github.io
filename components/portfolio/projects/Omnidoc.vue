<script setup lang="ts">
const techStack = ['C/C++']

const techIconMap: Record<string, string> = {
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
                        <h1 class="name">Omnidoc 문서발급 솔루션</h1>
                        <h2 class="title">뱅크비 · C/C++ (2019.04 ~ 2020.12)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">프로젝트 내용</h2>
                <div class="content-text">
                    <p>여러 민원 사이트에서 다양한 문서를 자동 발급하는 솔루션에서, 주요 사이트 스크래핑 모듈을 담당했습니다.</p>
                    <p>Omnidoc은 17여 개 민원 사이트에서 40여 종의 민원 문서를 자동 발급해주는 솔루션입니다.</p>
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
                        <li class="content-item">금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등 주요 사이트 스크래핑 담당</li>
                        <li class="content-item">사이트별 보안/인증 흐름을 분석하고, 변경에 대응하기 위한 구조 설계</li>
                    </ul>
                    <p class="mt-4">민원 특성상 장애 허용 범위가 매우 낮기 때문에, 장애 시 빠르게 원인을 파악할 수 있도록 로깅과 모듈 구조를 세심하게 설계했습니다.</p>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use './project-styles.scss';

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
