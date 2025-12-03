<script setup lang="ts">
const techStack = ['Java Card OS', 'MFC']

const techIconMap: Record<string, string> = {
    'Java Card OS': '/assets/portfolio/tools/sim-card-chip-svgrepo-com.svg',
    'MFC': '/assets/portfolio/tools/Microsoft_Foundation_Class_logo.svg'
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
                        <h1 class="name">TaSIM 카드 암호화 모듈</h1>
                        <h2 class="title">뱅크비 · Java Card OS (2017.01 ~ 2017.06)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">프로젝트 내용</h2>
                <div class="content-text">
                    <p>가맹점 단말기와 카드사 간 E2E 암호화를 제공하는 임베디드 카드 암호화 모듈의 Applet과 관리 도구를 개발했습니다.</p>
                    <p>TaSIM은 카드사와 가맹점 사이의 E2E 암호화를 수행하는 임베디드 카드 암호화 모듈입니다.</p>
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
                        <li class="content-item">Java Card OS 상에서 동작하는 암호화 Applet 개발 및 유지보수</li>
                        <li class="content-item">가맹점 단말기에 Applet을 탑재하고 관리하기 위한 MFC 기반 설치 도구 개발</li>
                    </ul>
                    <p class="mt-4">카드 결제 단말의 제한된 환경에서 동작하는 암호화 모듈을 다루며, 저수준 시스템과 보안의 접점을 경험했습니다.</p>
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
