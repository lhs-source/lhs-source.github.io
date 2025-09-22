<script setup lang="ts">
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import PostCard from './PostCard.vue';
// import { Header } from '@/components'

// updated 기준으로 내림차순 정렬
const blog = ref<any[]>([]);
const route = useRoute();
const { data: blogData } = await useAsyncData(() => queryCollection('content').where({ _path: { $regex: '^/blog' } }).find());
if(blogData.value) {
  console.log('blogData.value', blogData.value);
  blog.value = blogData.value.sort((a, b) => {
    return dayjs(b.updated).unix() - dayjs(a.updated).unix();
  });
}
// 태그 목록 생성
const allTagList: any[] = [];
const allSubjectList: any[] = [];

// 블로그 데이터에서 태그 추출 및 카운트
if(blogData.value) {
  const tagList = blogData.value
    .map(post => post.tags)
    .filter(Boolean)
    .flat();
  const subjectList = blogData.value
    .map(post => post.subject)
    .filter(Boolean)
    .flat();
  const tagCount = tagList.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const subjectCount = subjectList.reduce((acc, subject) => {
    acc[subject] = (acc[subject] || 0) + 1;
    return acc;
  }, {});
  for(let tagName of Object.keys(tagCount)) {
    allTagList.push({
      tagName,
      count: tagCount[tagName]
    });
  }
  allTagList.sort((a, b) => b.count - a.count);

  for(let subjectName of Object.keys(subjectCount)) {
    allSubjectList.push({
      subjectName,
      count: subjectCount[subjectName]
    });
  }
  allSubjectList.sort((a, b) => b.count - a.count); 
}
const selectedTag = ref<string | null>(null);
const selectedSubject = ref<string | null>(null);
async function onClickTag(tag: { tagName: string, count: number } | null) {
  if(tag === null) {
    selectedTag.value = null;
    const data = await queryContent('/blog').find();
    blog.value = (data || []).sort((a, b) => {
      return dayjs(b.updated).unix() - dayjs(a.updated).unix();
    });
  } else {
    selectedTag.value = tag.tagName;
    const data = await queryContent('/blog').where({ tags: { $contains: selectedTag.value } }).find();
    blog.value = (data || []).sort((a, b) => {
      return dayjs(b.updated).unix() - dayjs(a.updated).unix();
    });
    console.log('blog.value', blog.value);
  }
}
async function onClickSubject(subject: { subjectName: string, count: number } | null) {
  if(subject === null) {
    selectedSubject.value = null;
    const data = await queryContent('/blog').find();
    blog.value = (data || []).sort((a, b) => {
      return dayjs(b.updated).unix() - dayjs(a.updated).unix();
    });
  } else {
    selectedSubject.value = subject.subjectName;
    const data = await queryContent('/blog').where({ subject: { $contains: selectedSubject.value } }).find();
    blog.value = (data || []).sort((a, b) => {
      return dayjs(b.updated).unix() - dayjs(a.updated).unix();
    });
  }
}
</script>

<template>
  <div class="wrapper w-full">
    <GlobalHeader />
    <div class="blog-wrapper min-h-screen mx-auto max-w-7xl mt-16">
      <!-- Post Title Section -->
      <section class="post-title-section p-4">
        <div class="barcode mt-8">
          <div class="barcode-font self-end text-right text-3xl">
            BLOG POSTS COLLECTION
          </div>
        </div>
      </section>

    <!-- Title Section -->
    <section class="title-section relative w-full mt-2 pt-2 pb-4">
      <div class="title-separate grid">
        <div class="github-link p-4">
          <a href="/" target="_self">
            <img
              class="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Home"
            />
          </a>
        </div>
        <div class="title-area flex justify-center">
          <div class="title-text">
            <h1 class="text-6xl font-bold m-0 text-center leading-none">
              이현수의 블로그
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
        <span><b>{{ dayjs().format("YYYY년 MM월 DD일 ddd") }}</b></span>
        <span><u>https://lhs-source.github.io/blog/</u></span>
        <span>편집자 : 이현수</span>
        <span>총 {{ blog.length }}개 포스트</span>
      </div>
    </section>

    <!-- Tag Filter Section -->
    <section class="tag-section mt-8 pt-2 pb-4 px-4">
      <div class="tag-filter">
        <span class="tag-label">태그:</span>
        <button 
          :class="['tag-button', selectedTag === null ? 'active' : '']"
          @click="onClickTag(null)">
          전체보기
        </button>
        <button 
          v-for="tag of allTagList" 
          :key="tag"
          :class="['tag-button', selectedTag === tag.tagName ? 'active' : '']"
          @click="onClickTag(tag)">
          {{ tag.tagName }}({{ tag.count }})
        </button>
      </div>
    </section>

    <section class="subject-section mt-2 pt-2 pb-4 px-4">
      <div class="subject-filter">
        <span class="subject-label">주제:</span>
        <button 
          :class="['subject-button', selectedSubject === null ? 'active' : '']"
          @click="onClickSubject(null)">
          전체보기
        </button>
        <button 
          v-for="subject of allSubjectList" 
          :key="subject.subjectName"
          :class="['subject-button', selectedSubject === subject.subjectName ? 'active' : '']"
          @click="onClickSubject(subject)">
          {{ subject.subjectName }}({{ subject.count }})
        </button>
      </div>
    </section>

    <!-- Posts Grid Section -->
    <section class="posts-section mt-2 px-4 pt-4">
      <div class="posts-grid">
        <PostCard 
          v-for="item in blog"
          :key="item.id"
          :post="item" />
      </div>
    </section>
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

.blog-wrapper {
  width: 1440px;
  color: #1f1f14;
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  white-space: pre-line;
  word-break: break-all;

  background: 
    linear-gradient(rgba(220, 216, 200, 0.379), rgba(220, 216, 200, 0.379)),
    url('/assets/gray-dirty-paperboard_95678-93.avif');
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

/* Tag Section */
.tag-section {
  .tag-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    
    .tag-label {
      font-weight: bold;
      margin-right: 8px;
    }
    
    .tag-button {
      padding: 4px 12px;
      border: 1px solid #3d3d29;
      background: transparent;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      
      &:hover {
        background: #f0f0f0;
        font-weight: bold;
      }
      
      &.active {
        background: #3d3d29;
        color: white;
        font-weight: bold;
      }
    }
  }
}

/* Subject Section */
.subject-section {  
  .subject-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .subject-label {
    font-weight: bold;
    margin-right: 8px;
  }
  .subject-button {
    padding: 4px 12px;
    border: 1px solid #3d3d29;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  .subject-button.active {
    background: #3d3d29;
    color: white;
    font-weight: bold;
  }
  .subject-button:hover {
    background: #f0f0f0;
    font-weight: bold;
  }
}

/* Posts Grid Section */
.posts-section {
  border-top: 1px solid #999966;
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 16px;
  }
}

a {
  color: #2b8e61;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 700;
}
</style>