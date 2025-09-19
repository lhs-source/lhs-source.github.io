<script setup lang="ts">

import dayjs from 'dayjs';
import CardLink from './CardLink.vue';

const route = useRoute();
console.log('route.params.slug', route.params.slug);
const { data: article } = await useAsyncData(route.path, () =>
  // 파일 이름을 [...slug].vue 로 하면 route.params.slug 로 접근 가능
  queryContent("blog").where({ filename: route.params.slug[0] }).findOne()
);

console.log('article?.value', article?.value);

// {
//    "toc": { 
//     "title": "", 
//     "searchDepth": 2, 
//     "depth": 2, 
//     "links": [ 
//         { "id": "pinia-설치", "depth": 2, "text": "Pinia 설치" }, 
//         { "id": "nuxt-설정-파일에-pinia-추가", "depth": 2, "text": "Nuxt 설정 파일에 Pinia 추가" }, 
//         { "id": "스토어-생성", "depth": 2, "text": "스토어 생성" }, 
//         { "id": "컴포넌트에서-사용하기", "depth": 2, "text": "컴포넌트에서 사용하기" }, 
//         { "id": "선택-서버-사이드-렌더링ssr-설정", "depth": 2, "text": "(선택) 서버 사이드 렌더링(SSR) 설정", "children": [ 
//             { "id": "캐시-및-라이브러리-다시-설치", "depth": 3, "text": "캐시 및 라이브러리 다시 설치" }, 
//             { "id": "pinia-사용을-수동으로-등록", "depth": 3, "text": "Pinia 사용을 수동으로 등록" } 
//         ] } 
//     ] }
// }
const tableOfContents = article?.value?.body?.toc;

// console.log('article?.value', article?.value);

const components = {
  'cardlink': CardLink,
}

</script>

<template>
  <div class="wrapper w-full">
    <GlobalHeader />
    <div class="article-wrapper min-h-screen mx-auto max-w-7xl my-24">
      <template v-if="article">
      <!-- Post Title Section -->
      <section class="post-title-section p-4">
        <div class="barcode mt-8">
          <div class="barcode-font self-end text-right text-3xl">
            BLOG ARTICLE
          </div>
        </div>
      </section>

      <!-- Title Section -->
      <section class="title-section relative w-full mt-2 pt-2 pb-4">
        <div class="title-separate grid">
          <div class="github-link p-4">
            <a href="/blog" target="_self">
              <img
                class="w-12 h-12"
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="Back to Blog"
              />
            </a>
          </div>
          <div class="title-area flex justify-center">
            <div class="title-text">
              <h1 class="text-6xl font-bold m-0 text-center leading-none">
                {{ article.title }}
              </h1>
              <h2 class="text-2xl font-bold m-0 text-right leading-tight">
                기술 블로그
              </h2>
            </div>
          </div>
        </div>
      </section>

      <!-- Inter-band Section -->
      <section class="inter-band text-sm px-4">
        <div class="flex justify-between">
          <span><b>{{ dayjs(article.created).format("YYYY년 MM월 DD일 ddd") }}</b></span>
          <span><u>https://lhs-source.github.io{{ article._path }}</u></span>
          <span>편집자 : 이현수</span>
          <span v-if="article.updated !== article.created">수정: {{ dayjs(article.updated).format('YYYY-MM-DD') }}</span>
        </div>
      </section>

      <!-- Tags Section -->
      <section class="tags-section mt-2 pt-2 pb-4 px-4" v-if="article.tags">
        <div class="tags-filter">
          <span class="tags-label">태그:</span>
          <span v-for="tag in article.tags" :key="tag" class="tag-item">
            {{ tag }}
          </span>
        </div>
      </section>

      <!-- Table of Contents -->
      <section v-if="tableOfContents?.links" class="toc-section mt-2 px-4">
        <div class="toc-wrapper">
          <h2 class="toc-title">목차</h2>
          <ul class="toc-list">
            <li v-for="link in tableOfContents.links" :key="link.id" class="toc-item">
              <a :href="'#' + link.id" class="toc-link">{{ link.text }}</a>
              <ul v-if="link.children" class="toc-sublist">
                <li v-for="child in link.children" :key="child.id" class="toc-subitem">
                  <a :href="'#' + child.id" class="toc-sublink">{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <!-- Article Content -->
      <section class="article-content mt-2 px-4">
        <ContentRenderer 
          :value="article"
          :components="components">
        </ContentRenderer>
      </section>
    </template>
    <template v-else>
      <div class="no-content">
        <p>No content found.</p>
      </div>
    </template>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');

.article-wrapper {
  width: 1440px;
  color: #1f1f14;
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  white-space: pre-line;
  word-break: break-all;

  
  background: linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)), url('/assets/gray-dirty-paperboard_95678-93.avif');
  background-size: 626px 443px;
}

/* Header가 신문 스타일 배경을 상속받지 않도록 */
.wrapper {
  background: transparent;
}

/* Barcode font styling */
.barcode-font {
  font-family: 'Libre Barcode 128 Text', cursive;
}

/* Title Section */
.title-section {
  border-top: 1px solid #3d3d29;
  font-family: 'Marcellus', serif;
  font-weight: 700;
  letter-spacing: 2px;

  .title-separate {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
  }
}

/* Inter-band Section */
.inter-band {
  border-top: 2px solid #3d3d29;
  border-bottom: 1px solid #3d3d29;
}

/* Tags Section */
.tags-section {
  border-bottom: 1px solid #999966;
  
  .tags-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    
    .tags-label {
      font-weight: bold;
      margin-right: 8px;
    }
    
    .tag-item {
      padding: 4px 12px;
      border: 1px solid #3d3d29;
      background: #f0f0f0;
      font-size: 14px;
    }
  }
}

/* Table of Contents */
.toc-section {
  border-bottom: 1px solid #999966;
  
  .toc-wrapper {
    .toc-title {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 12px;
    }
    
    .toc-list {
      list-style: none;
      padding: 0;
      
      .toc-item {
        margin-bottom: 8px;
        
        .toc-link {
          color: #2b8e61;
          text-decoration: underline;
          font-weight: 500;
          
          &:hover {
            font-weight: bold;
          }
        }
        
        .toc-sublist {
          list-style: none;
          margin-left: 20px;
          margin-top: 4px;
          
          .toc-subitem {
            margin-bottom: 4px;
            
            .toc-sublink {
              color: #2b8e61;
              text-decoration: underline;
              font-size: 0.9em;
              
              &:hover {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}

/* Article Content */
.article-content {
  font-size: 0.9rem;
  line-height: 1.6;
  
  h1 {
    font-size: 1.8em;
    padding-top: 24px;
    padding-bottom: 12px;
    font-weight: bold;
    border-bottom: 2px solid #3d3d29;
  }
  
  h2 {
    font-size: 1.5em;
    padding-top: 20px;
    padding-bottom: 10px;
    font-weight: bold;
  }
  
  h3 {
    font-size: 1.3em;
    padding-top: 16px;
    padding-bottom: 8px;
    font-weight: bold;
  }
  
  p {
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    text-align: justify;
  }
  
  a {
    color: #2b8e61;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 700;
    
    &::after {
      content: '🔗';
      margin-left: 4px;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  
  ol, ul {
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 2em;
  }
  
  li {
    list-style-type: disc;
    margin-bottom: 0.5em;
  }
  
  blockquote {
    padding: 1em;
    margin: 1em 0;
    background-color: #f8f8f8;
    border-left: 4px solid #3d3d29;
    font-style: italic;
  }
  
  /* Code styling */
  :not(pre) > code {
    background-color: #f0f0f0;
    padding: 0.2em 0.4em;
    border-radius: 0.3em;
    font-size: 0.85em;
    color: #d63384;
    border: 1px solid #ccc;
  }
  
  pre {
    font-size: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f8f8f8;
    padding: 1em;
    overflow-x: auto;
  }
  
  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    border: 1px solid #3d3d29;
  }
  
  table th {
    border: 1px solid #3d3d29;
    padding: 0.8em 1em;
    background: #f0f0f0;
    font-weight: bold;
  }
  
  table td {
    border: 1px solid #3d3d29;
    padding: 0.8em 1em;
  }
}

.no-content {
  text-align: center;
  padding: 4em 0;
  font-size: 1.2em;
  color: #666;
}
</style>