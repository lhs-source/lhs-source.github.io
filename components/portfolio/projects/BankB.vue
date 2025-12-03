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
