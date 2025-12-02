<script setup lang="ts">
const techStack = ['VanilaJS', 'EJS', 'AWS']

const techIconMap: Record<string, string> = {
    'VanilaJS': '/assets/portfolio/tools/js-svgrepo-com.svg',
    'VanillaJS': '/assets/portfolio/tools/js-svgrepo-com.svg',
    'EJS': '/assets/portfolio/tools/ejs-svgrepo-com.svg',
    'AWS': '/assets/portfolio/tools/aws-svgrepo-com.svg'
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
                        <h1 class="name">리코 & 업박스 홈페이지</h1>
                        <h2 class="title">리코 · 웹사이트 제작/운영 (2021 ~ 상시)</h2>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">프로젝트 내용</h2>
                <div class="content-text">
                    <p>회사 소개 및 제품 인바운드를 목표로 하는 리코/업박스 홈페이지를 제작하고, 마케팅 팀과 함께 지표 설계·운영을 진행했습니다.</p>
                    <p>리코 홈페이지와 업박스 제품 홈페이지를 제작·운영하며, 회사가 전달하고 싶은 메시지와 실제 유입 데이터를 연결하는 작업을 담당했습니다.</p>
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
                    <p><strong>주요 내용:</strong></p>
                    <ul class="content-list">
                        <li class="content-item">회사/제품 소개 페이지 정보 구조(IA) 설계</li>
                        <li class="content-item">마케팅팀과 협업하여 유입 채널 및 전환 지표 정의</li>
                        <li class="content-item">이벤트·캠페인에 맞춘 랜딩 페이지 개편과 유지보수</li>
                    </ul>
                    <p class="mt-4">개발 관점에서는 심플한 구조를 유지하면서도, 운영자가 쉽게 수정 가능한 구조를 고민하여 구현했습니다.</p>
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
