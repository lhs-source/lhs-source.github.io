<script setup lang="ts">
const techStack = ['Spring Boot', 'JPA', 'MySQL']

const techIconMap: Record<string, string> = {
    'Spring Boot': '/assets/portfolio/tools/spring-boot-logo.svg',
    'JPA': '/assets/portfolio/tools/java-4-logo-svgrepo-com.svg',
    'MySQL': '/assets/portfolio/tools/mysql-logo.svg'
}

const getTechIcon = (techName: string): string | null => {
    return techIconMap[techName] ?? null
}
</script>

<template>
    <div class="project-page">
        <div class="project-content">
            <h1 class="project-title">오픈망 직승인 프로젝트</h1>
            <h2 class="project-subtitle">뱅크비 · Spring Boot (2018.08 ~ 2019.03)</h2>

            <div class="project-description">
                카드사와 가맹점 간 E2E 보안을 제공하는 클라우드 POS 환경에서,
                테스트용 더미 카드사 서버와 가맹점 관리 기능을 구현했습니다.
            </div>

            <div class="project-body">
                <div class="project-text">
                    오픈망 직승인 프로젝트는 VAN사를 통하지 않고 카드사와 가맹점 간 직접 통신을 수행하는 클라우드 POS 서비스입니다.<br><br>

                    담당 역할:<br><br>
                    - 카드사 승인/매입 프로세스를 테스트하기 위한 더미 카드사 서버 구현 (Spring Boot, JPA, MySQL)<br>
                    - VAN사가 제공하는 가맹점 관리, 결제내역 조회 기능을 직접 구현<br><br>

                    결제/승인 시스템의 전체 플로우와 보안 요구사항을 이해하고,<br>
                    테스트 환경을 스스로 만들면서 결제 도메인에 대한 이해를 넓힌 경험입니다.<br>
                </div>
            </div>

            <section class="section">
                <h2 class="section-title">사용 기술</h2>
                <div class="tech-stack-grid">
                    <div v-for="tech in techStack" :key="tech" class="tech-item-grid">
                        <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)!" :alt="tech" class="tech-icon" />
                        <span class="tech-name">{{ tech }}</span>
                    </div>
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
