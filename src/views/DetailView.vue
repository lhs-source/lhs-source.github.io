<template>
  <PageDefaultLayout class="page-custom">
    <div class="detail-wrapper">
      <div class="info">
        <div class="to-home"><a href="/">🏠</a></div>
        <div class="who">
          Written by <b>LeeHyunsoo</b><br/>
          Contact me <b>iddms5446@gmail.com</b>
        </div>
        <div class="post-list">
          <div class="post" v-for="post of postList" :key="post.url">
            <a :href="`/${post.url}`">
              <span class="icon">📜</span>
              <span class="title">{{post.title}}</span></a>
          </div>
        </div>
      </div>

      <div class="contents">
        <h1 class="title">
          {{post.title}}
        </h1>
        <div class="tag-list">
          <label
            v-for="tag of post.tags"
            :key="tag">
            {{tag}}
          </label>
        </div>
        <div class="date">
          작성일 : {{post.createdAt}}, <b>마지막 업데이트 : {{post.updatedAt}}</b>
        </div>
        <div 
          ref="postArea"
          class="post"
          v-html="postContents">
        </div>
        <div class="post-footer">
          포스팅은 여기까지입니다. <br />
          의견은 <a href="mailto:iddms5446@gmail.com">iddms5446@gmail.com</a>으로 보내주시면 감사드리겠습니다!
        </div>
      </div>
      
      <div class="toc" :class="{open: openToc === true}">
        <div class="toc-contents">
          <div class="toc-list" v-html="tocContents"></div>
        </div>
      </div>

      <div class="control-list">
        <div class="info-toggle control" @click="onClickToggleInfo">
          <span>🧙‍♂️</span>
          <span>정보</span>
        </div>
        <div class="toc-toggle control" @click="onClickToggleToc">
          <span>📚</span>
          <span>목차</span>
        </div>
      </div>
    </div>
  </PageDefaultLayout>
  <TOCModal 
    :open="openInfo"
    :avoid-close-touch="true"
    @close="onClickCloseInfo">
      <div class="mobile-info">
        <div class="to-home"><a href="/">🏠</a></div>
        <div class="who">
          Written by <b>LeeHyunsoo</b><br/>
          Contact me <b>iddms5446@gmail.com</b>
        </div>
        <div class="post-list">
          <div class="post" v-for="post of postList" :key="post.url">
            <a :href="`/${post.url}`">
              <span class="icon">📜</span>
              <span class="title">{{post.title}}</span></a>
          </div>
        </div>
      </div>
  </TOCModal>
  <TOCModal 
    :open="openToc"
    @close="onClickCloseToc">
    <div class="mobile-toc" :class="{open: openToc === true}">
      <div class="toc-contents">
        <div class="toc-list" v-html="tocContents"></div>
      </div>
    </div>
  </TOCModal>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PageDefaultLayout from "@/component/Atom/PageDefaultLayout.vue";
import TOCModal from '@/component/Atom/TOCModal.vue';
import { Post } from '@/store/posts';

const store = useStore();
const route = useRoute();
const router = useRouter();

const paramId = route.params.id;
const postContents = ref("");
const tocContents = ref("");
const postArea = ref();

const openToc = ref<boolean>(false);
const openInfo = ref<boolean>(false);

store.dispatch("Posts/moveCurrentUrl", paramId);
const post = computed(() => {
  return store.getters["Posts/currentPost"];
});

const postList = computed<Post[]>(() => {
  return store.state.Posts.postList;
}) 

onMounted(() => {
  store.dispatch("Posts/requestGetMarkdoen", post.value.fileName).then((res) => {
    const re = /<div class="table-of-contents">.*<\/div>/g;
    const toc = re.exec(res);
    postContents.value = res;
    tocContents.value = toc[0];
  })
})

/**
 * * 목차 버튼을 눌러서 TOC 모달을 오픈한다.
 */
const onClickToggleToc = () => {
  openToc.value = !openToc.value;
  document.body.style.overflowY = 'hidden';
  console.log('openToc.value', openToc.value, document.body.style.overflowY);
}
/**
 * * 목차 모달에서 닫기 혹은 배경을 눌러서 목차 모달을 닫는다.
 */
const onClickCloseToc = (isOpen: boolean) => {
  openToc.value = isOpen;
  document.body.style.overflowY = 'auto';
  console.log('openToc.value', openToc.value);
}

/**
 * * 정보 버튼을 눌러서 TOC 모달을 오픈한다.
 */
const onClickToggleInfo = () => {
  openInfo.value = !openInfo.value;
  document.body.style.overflowY = 'hidden';
  console.log('openInfo.value', openInfo.value);
}
/**
 * * 정보 모달에서 닫기 혹은 배경을 눌러서 목차 모달을 닫는다.
 */
const onClickCloseInfo = (isOpen: boolean) => {
  openInfo.value = isOpen;
  document.body.style.overflowY = 'auto';
  console.log('openInfo.value', openInfo.value);
}


</script>


<style lang="scss">
@import "./vs2015.min.css";
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap');

.frame {
  .body {
    min-width: 100vw;
    margin-bottom: 0 !important;
  }
}

a {
  padding: 4px 0;
  &:link {
    color: $color-primary-b;
    font-weight: 500;
    line-height: 1.2;
    text-decoration: none;
  }
  &:visited {
    color: $color-primary-b;
  }
}

.detail-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  
  // 글쓴이 정보 + 글 목록 보여주는 부분.
  // 왼쪽에 위치한다.
  .info {
    position: sticky;
    top:0;
    left:0;
    width: 24vw;
    min-width: 240px;
    max-width: 360px;
    height: 100vh;

    padding: 24px 8px;
    box-sizing: border-box;
    border-right: 1px solid $color-primary-g-dark;

    .to-home {
      width: 48px;
      height: 48px;
      font-size: 1.6rem;
      padding: 16px;
      margin: 0 auto;

      cursor: pointer;
      user-select: none;
      filter: grayscale(1);
      transition: .2s;

      &:hover {
        filter: grayscale(0) brightness(1.05);
      }
    }
    .who {
      padding: 16px 0 48px 0;
    }
    .post-list {
      .post {
        width: 100%;
        padding: 8px 0;
        text-align: left;
        a {
          display: flex;
          .icon {
            display: inline-block;
          }
          .title {
            margin-left: 4px;
            display: inline-block;
          }
        }
      }
    }
  }
  .contents {
    flex-grow: 5;
    min-width: 100px;
    .title {
      margin: 64px 32px;
    }

    .tag-list {
      margin-top: 24px;
      padding: 24px 24px;

      border-top: 1px solid $color-primary-g-dark;
      border-bottom: 1px solid $color-primary-g-dark;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px 16px;
      label {
        background-color: $color-primary-g-dark;
        color: $color-primary-white;
        padding: 4px 8px;
      }
    }

    .date {
      margin-top: 16px;
    }

    .post {
      margin: 0 auto;
      padding: 64px 32px;
      max-width: 720px;
      text-align: left;
      word-break: keep-all;
      line-height: 1.4;

      .table-of-contents {
        display: none;
        position: sticky;
        left: -24vw;
        top: 0;
        width: 24vw;
        background-color: #fafafa;
        padding: 16px 0;
      }

      img {
        max-width: 100%;
        outline: 1px solid $color-primary-g-dark;
      }
      pre {
        background-color: #07120e;
        margin: 24px 0;
        padding: 16px;
        overflow-x: auto;
        line-height: 1.3;
        code {
          background-color: #07120e;
        }
      }
      code {
        font-family: 'Nanum Gothic Coding', monospace;
        background-color: #dadada;
        // color: $color-primary-g-darker;
        padding: 2px 3px 2px 4px;
        border-radius: 2px;
      }
      a {
        &:link {
          color: $color-primary-g-dark;
          font-weight: 700;
        }
        &:visited {
          color: $color-primary-g-dark;
        }
        &:before {
          content: "📎 ";
        }
      }
    }
  }
  
  .toc {
    flex-grow: 3;
    max-width: 360px;
    min-width: 280px;

    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;

    display: flex;
    align-items: center;
    border-left: 1px solid $color-primary-g-dark;

    .toc-contents {
      .toc-list {
        .table-of-contents {
          padding-right: 16px;
          ul {
            padding-left: 16px;
            list-style-type: none;
            text-align: left;
            margin: 0;
            li {
              a {
                &:link {
                  color: $color-primary-g-dark;
                  font-weight: 500;
                  line-height: 2;
                  text-decoration: none;
                }
                &:visited {
                  color: $color-primary-g-dark;
                }
                &:before {
                  content: "📌 ";
                }
              }
            }
          }
        }
      }
    }

  }
  .control-list {
    display: none;
  }
  .post-footer {
    margin: 0 auto;
    padding: 32px 0;
    max-width: 720px;
    // border-top: 2px solid #dadada;
  }
}

@media screen and (max-width: 720px) {
  .detail-wrapper {
    .info {
      display: none;
    }
    .toc {
      display: none;
    }
    .control-list {
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 64px;
      background-color: white;

      border-top: 1px solid $color-primary-black;

      display: flex;
      justify-content: center;
      .control {
        width: 25vw;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span {
          &:first-child {
            font-size: 1.25rem;
          }
          &:last-child {
            margin-top: 4px;
            font-size: 0.875rem;
          }
        }
      }
    }
  }
  
  // 글쓴이 정보 + 글 목록 보여주는 부분.
  // 왼쪽에 위치한다.
  .mobile-info {
    box-sizing: border-box;
    padding: 16px 8px;

    .to-home {
      width: 48px;
      height: 48px;
      font-size: 1.6rem;
      padding: 16px;
      margin: 0 auto;

      filter: grayscale(0);
      transition: .2s;
    }
    .who {
      padding: 16px 0 48px 0;
    }
    .post-list {
      padding: 16px;
      max-height: 50vh;
      .post {
        width: 100%;
        padding: 4px 0;
        text-align: left;
        font-size: 0.875rem;
        a {
          display: flex;
          .icon {
            display: inline-block;
          }
          .title {
            margin-left: 4px;
            display: inline-block;
          }
        }
      }
    }
  }
  .mobile-toc {
    overflow-y: auto;
    padding: 16px 8px;

    .toc-contents {
      .toc-list {
        .table-of-contents {
          padding-right: 16px;
          ul {
            padding-left: 16px;
            list-style-type: none;
            font-size: 0.875rem;
            text-align: left;
            margin: 0;
            li {
              a {
                &:link {
                  font-weight: 500;
                  line-height: 2;
                  text-decoration: none;
                }
                &:visited {
                }
                &:before {
                  content: "📌 ";
                }
              }
            }
          }
        }
      }
    }
  }
}


@media screen and (max-width: 480px) {
  .detail-wrapper {
    .contents {
      .post {
        ul {
          padding-left: 24px;
        }
        pre {
          font-size: 0.75rem;
        }
      }
    }
  }
}


</style>

