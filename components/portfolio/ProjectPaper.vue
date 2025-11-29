<script setup lang="ts">
defineProps<{
    title: string;
    id: string;
}>();
</script>

<template>
    <div class="page-content portfolio-page">
        <div class="portfolio-header">
            <h2>{{ title }}</h2>
            <span class="project-date">2024.01 - 2024.03</span>
        </div>

        <div class="portfolio-body">
            <div class="main-image">
                <img :src="`https://picsum.photos/seed/${id}/800/400`" alt="Project Image" />
            </div>

            <div class="project-info">
                <h3>Project Overview</h3>
                <p>
                    This is a detailed case study of {{ title }}. It explores the challenges faced during development
                    and the innovative solutions implemented to overcome them. The project focuses on user experience
                    and performance optimization.
                </p>

                <h3>Key Features</h3>
                <ul>
                    <li>Responsive Design for all devices</li>
                    <li>Real-time data synchronization</li>
                    <li>Advanced interactive animations</li>
                    <li>Secure authentication system</li>
                </ul>

                <h3>Tech Stack</h3>
                <div class="tech-tags">
                    <span class="tag">Vue 3</span>
                    <span class="tag">TypeScript</span>
                    <span class="tag">GSAP</span>
                    <span class="tag">Node.js</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page-content {
    max-width: 100%;
    overflow-wrap: break-word;
}

.portfolio-page {
    .portfolio-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 30px;
        border-bottom: 2px solid #eee;
        padding-bottom: 15px;

        h2 {
            font-size: 2rem;
            color: #333;
            margin: 0;
        }

        .project-date {
            color: #888;
            font-size: 0.9rem;
        }
    }

    .main-image {
        width: 100%;
        height: 350px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 30px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;

            &:hover {
                transform: scale(1.02);
            }
        }
    }

    .project-info {
        h3 {
            font-size: 1.2rem;
            margin: 25px 0 15px;
            color: #444;
            border-left: 4px solid #333;
            padding-left: 10px;
        }

        p {
            line-height: 1.7;
            color: #555;
            margin-bottom: 15px;
        }

        ul {
            padding-left: 20px;

            li {
                margin-bottom: 8px;
                color: #555;
            }
        }

        .tech-tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;

            .tag {
                background: #f0f0f0;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                color: #666;
                font-weight: 500;
            }
        }
    }
}
</style>
