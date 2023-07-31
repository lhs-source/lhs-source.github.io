<script setup lang="ts">
import { defineEmits, defineProps, onMounted, withDefaults } from "vue";
import { gsap } from 'gsap';
import { usePosts } from "../../store/posts";

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

const posts = usePosts();

function animPostList() {
  // 포스트 목록의 제목
  gsap.timeline({
    scrollTrigger: {
      trigger: ".post-list",
      start: '-500',
      end: 'top',
      // pin: true,
      toggleActions: "restart none none reverse",
    }
  }).set(".post-list .title-area .title-bg", {
    right: 0,
    left: 'unset',
  }).from(".post-list .title-area .title", {
    yPercent: 10,
    opacity: 0,
  }).to(".post-list .title-area .title-bg", {
    width: '100%',
  }).set(".post-list .title-area .title-bg", {
    right: 'unset',
    left: 0,
  }).to(".post-list .title-area .title-bg", {
    width: 0,
    delay: 0.5,
  })

  // 포스트 개별 애니메이션
  // 각 행의 첫번째 포스트에 스크롤이 닿으면 순서대로 재생한다.
  setTimeout(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: `.post-area .post:nth-child(${1})`,
        start: 'top center',
        end: 'top center',
        toggleActions: "restart none none reverse",
      }
    }).from(".post-area .post:nth-child(1)", {
      y: -32,
      duration: 0.2,
    }).from(".post-area .post:nth-child(2)", {
      y: -32,
      duration: 0.2,
    }).from(".post-area .post:nth-child(3)", {
      y: -32,
      duration: 0.2,
    })
  }, 100)
}

onMounted(() => {
  posts.fetchPostList().then(() => {
    // 포스트 목록을 가져온 후 애니메이션을 등록한다.
    animPostList();
  })
})

</script>

<template>
  <section class="post-list">
    <div class="section" style="justify-content: flex-start;">
      <div class="title-area">
        <div class="title">POST LIST</div>
        <div class="title-bg top"></div>
        <div class="title-bg bottom"></div>
      </div>
      <div class="post-area">
        <div 
          class="post"
          v-for="post in posts.postList" 
          :key="post.fileName">
          <router-link :to="`/posts/${post.fileName}`">
            <div class="post-title">{{ post.title }}</div>
            <div class="tag-list">
              <div 
                class="tag"
                v-for="tag of post.tags"
                :key="tag">
                {{ tag }}
              </div>
            </div>
            <div class="description">{{ post.description }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";
.post-list {
  z-index: 2;
  .title-area {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2rem 0 6rem;
    .title {
      font-weight: 600;
      font-size: 5rem;
      line-height: 6rem;
      color: white;
      // 배경의 그라데이션을 텍스트에 맞게 클립한다.
      background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    // 제목 훑고 지나가는 막대
    .title-bg {
      position: absolute;
      right: 0;
      width: 0;
      height: 3.5rem;
      mix-blend-mode: exclusion;

      &.top {
        top: 2rem;
        background: -webkit-linear-gradient(315deg,#42b883 25%,#42b883);
      }
      &.bottom {
        bottom: 5rem;
        background: -webkit-linear-gradient(315deg,#35495e 25%,#35495e);
      }
    }
  }
  .post-area {
    padding: 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;
    .post {
      a {
        color: $color-text-darker;
        text-decoration: unset;

        &:hover {
          filter: brightness(1.2);
        }
      }
      .post-title {
        color: $color-text-normal;
        text-decoration-style: dashed;
        text-decoration-line: underline;
        text-decoration-thickness: 3px;
        text-decoration-color: #42d392aa;
        font-size: 1.125rem;
      }
      .tag-list {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 8px;
        .tag {
          background-color: #2f2f2f;
          padding: 4px 6px;
          border-radius: 4px;
          color: #42d392;
          font-weight: 400;
          font-size: 0.875rem;
        }
      }
      .description {
        margin-top: 8px;
        font-weight: 400;
        font-size: 0.875rem;
      }
    }
  }
}
</style>