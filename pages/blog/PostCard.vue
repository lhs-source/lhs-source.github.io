<script setup lang="ts">
import dayjs from 'dayjs';

interface BlogPost {
  id: string;       // "blog/blog/npm-rollup-os.md"
  title: string;    // "npm 의존성 설치 문제 애플 실리콘에서의 Rollup 패키지 (npm ERR notsup Unsupported platform for rollup-darwin-arm64)"
  subject: string;  // "Node"
  tags: string;     // ['rollup', 'error', 'dependencies', 'node', 'npm']
  volume: string;   // "short" "long" "medium"
  created: string;  // "2025-01-20"
  updated: string;  // "2025-01-20"
  image: string;
  description: string;  // "npm의 의존성 설치 실패 문제. @rollup/rollup-darwin-arm64 패키지가 애플 실리콘에서만 설치 가능하다. Windows 및 Linux 환경에서의 설치 불가 원인. optionalDependencies의 사용 방법."
  _path: string;     // "/blog/npm-rollup-os"
}
const props = defineProps<{
  post: BlogPost;
}>();

const volumeString = computed(() => {
  switch(props.post.volume) {
    case 'short': return '짧은글';
    case 'long': return '긴글';
    case 'medium': return '중간글';
  }
});

</script>
<template>
  <article class="post-card-wrapper">
    <!-- Post Header -->
    <div class="post-header">
      <div class="post-date">
        {{ dayjs(post.created).format('YYYY년 MM월 DD일') }}
        <template v-if="post.updated !== post.created">
          <span class="update-info">[수정: {{ dayjs(post.updated).format('MM-DD') }}]</span>
        </template>
      </div>
      
      <a :href="post._path" class="post-title-link">
        <h2 class="post-title">
          {{ post.title }}
        </h2>
      </a>
      <div class="text-sm">{{ post.subject }} {{ volumeString }}</div>
      
    </div>
    
    <!-- Post Content -->
    <div class="post-content">
      <img 
        v-if="post.image" 
        class="post-image" 
        :src="`/images/${post.image}`" 
        :alt="`image for ${post.title} article`" />
      <p class="post-description">{{ post.description }}</p>
    </div>
    
    <!-- Post Footer -->
    <footer class="post-footer">
      <div v-if="post.tags" class="post-tags">
        <span v-for="tag of post.tags" :key="tag" class="post-tag">
          {{ tag }}
        </span>
      </div>
    </footer>
  </article>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');

.post-card-wrapper {
  background: white;
  border: 2px solid #3d3d29;
  border-radius: 0;
  padding: 0;
  margin-bottom: 16px;
  box-shadow: 4px 4px 0px rgba(61, 61, 41, 0.3);
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  line-height: 1.5;
}

.post-header {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e0e0e0;
  
  .post-date {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 4px;
    font-weight: 500;
    
    .update-info {
      color: #999;
      font-size: 0.75rem;
    }
  }
  
  .post-title-link {
    text-decoration: none;
    color: inherit;
  }
  
  .post-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 0 12px 0;
    line-height: 1.3;
    color: #1f1f14;
  }
}

.post-content {
  padding: 16px 20px;
  
  .post-image {
    width: 100%;
    height: auto;
    margin-bottom: 12px;
    border: 1px solid #ddd;
  }
  
  .post-description {
    font-size: 0.9rem;
    color: #333;
    margin: 0;
    line-height: 1.6;
    text-align: justify;
  }
}
  
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  
  .post-tag {
    background: #f0f0f0;
    border: 1px solid #ccc;
    padding: 2px 8px;
    font-size: 0.75rem;
    color: #2b2b2b;
    border-radius: 0;
  }
}

.post-footer {
  padding: 12px 20px 16px;
  border-top: 1px solid #e0e0e0;
  background: #f8f8f8;
}
</style>