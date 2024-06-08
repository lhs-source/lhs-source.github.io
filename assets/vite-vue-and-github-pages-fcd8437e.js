import{u as s}from"./vue.f36acd1f-f6c87614.js";import{d as a,c as t,b as p,a as o}from"./app-f2535a55.js";const e="/assets/git_blog-43bea08c.png",c="/assets/git_blog 2-a34b9dbf.png",u={class:"markdown-body"},l=p(`<h1 id="vite-vue-%2B-github-pages-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%EC%B6%95" tabindex="-1">Vite vue + Github Pages 페이지 구축</h1><p>기존 vue-cli 를 사용한 vue 프로젝트로 github pages 를 구축했는데, 대세에 따라 vite 로 변경하기로 했다. 말이 변경이지 새로 만들었다.</p><p>기존 vue-cli 로 했던 것에서 vite 로 변경하며 필요한 부분만 작성하였고, github actions 등의 기능은 <a href="https://lhs-source.github.io/posts/making-blog-githubio-vue3-1#github-actions-%EB%A1%9C-github-pages-%EB%B0%B0%ED%8F%AC">Github.io + Vue3 로 블로그 만들기</a> 를 참고하면 된다.</p><h1 id="vite-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%9D%EC%84%B1" tabindex="-1">vite 프로젝트 생성</h1><pre><code class="">npm create vite@latest
</code></pre><p>우선 빈 vite 프로젝트를 만들어준다. 우리는 vue3 와 typescript 를 활용해서 개발할 것이다.</p><h1 id="vite-ssg" tabindex="-1">vite-ssg</h1><blockquote><p>Vite SSG<br><a href="https://www.npmjs.com/package/vite-ssg">https://www.npmjs.com/package/vite-ssg</a></p></blockquote><p>vite 로 static site generating 하는 라이브러리이다. 우리가 만드는 포스트 마다 정적 사이트로 만들어준다</p><pre><code class="">npm i -D vite-ssg vue-router @vueuse/head
</code></pre><p>위 커맨드로 <code class="">vue-router</code>  와 <code class="">@vueuse/head</code>  도 함께 설치해주라고 나와 있는데, 나는 <code class="">@unhead/vue</code> 를 사용했다.</p><pre class="language-json"><code class="language-json"><span class="token comment">// package.json</span>
<span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;build:ssg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite-ssg build&quot;</span>
<span class="token punctuation">}</span>
</code></pre><p>빌드 커맨드를 대체 혹은 추가해준다.</p><pre class="language-ts"><code class="language-ts"><span class="token comment">// main.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token function">ViteSSG</span><span class="token punctuation">(</span>
    <span class="token comment">// 루트 컴포넌트</span>
    App<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> routes <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> routes<span class="token punctuation">,</span> isClient<span class="token punctuation">,</span> initialState <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 플러그인 세팅</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><p><code class="">createApp</code>  을 <code class="">ViteSSG</code>  로 변경한다. 이러면 빌드했을 때, SPA 앱이 아니라, MPA로 빌드가 된다. 각 라우트마다 html 페이지가 따로 생성된다.</p><h1 id="vite-plugin-pages-sitemap" tabindex="-1">vite-plugin-pages-sitemap</h1><blockquote><p>vite-plugin-pages-sitemap<br><a href="https://github.com/jbaubree/vite-plugin-pages-sitemap">https://github.com/jbaubree/vite-plugin-pages-sitemap</a></p></blockquote><p>사이트맵 자동 생성기이다. <code class="">vite-ssg</code>  와 <code class="">vite-plugin-pages</code>  를 같이 지원한다.</p><pre><code class="">npm install -D vite-plugin-pages-sitemap
</code></pre><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> Pages <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-pages&#39;</span>
<span class="token keyword">import</span> generateSitemap <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-pages-sitemap&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// ...</span>
    <span class="token function">Pages</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">onRoutesGenerated</span><span class="token operator">:</span> routes <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token function">generateSitemap</span><span class="token punctuation">(</span><span class="token punctuation">{</span> routes <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><p><img src="`+e+`" alt=""></p><p><code class="">npm run build</code>  를 하면 바로 사이트맵과 로보츠 파일이 만들어진다. 기본 사용법대로 사이트맵 파일을 만들면 주소가 <code class="">localhost</code>  로 되는데, <code class="">hostname</code>  을 변경해서 내 사이트 주소를 설정해주어야 한다.</p><h1 id="vite-plugin-pages" tabindex="-1">vite-plugin-pages</h1><blockquote><p>vite-plugin-pages<br><a href="https://www.npmjs.com/package/vite-plugin-pages">https://www.npmjs.com/package/vite-plugin-pages</a></p></blockquote><p>파일 시스템 기반의 라우트를 생성한다.</p><pre><code class="">npm install -D vite-plugin-pages

</code></pre><p>이녀석도 vue-router 가 필요한데, 위에서 설치했기 때문에 생략한다.</p><pre class="language-ts"><code class="language-ts"><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> Pages <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-pages&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">Pages</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;md&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      pagesDir<span class="token operator">:</span> <span class="token string">&#39;src/pages&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">/**
       * 생성된 라우트에 추가 로직을 작성한다.
       * @param route 생성된 라우트
       * @returns 
       */</span>
      <span class="token function">extendRoute</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;route&#39;</span><span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> route<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><p><code class="">Pages</code>  플러그인을 설정파일에 추가하자. md 파일이 있는 경로와, 확장자를 추가해주면 된다.</p><h2 id="%ED%8C%8C%EC%9D%BC-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0" tabindex="-1">파일 추가하기</h2><p><code class="">Pages</code>  플러그인에 등록해둔 경로에 <code class="">.vue</code>  혹은 <code class="">.md</code>  파일을 만들면 자동으로 라우트로 인식한다. 기본적으로 만들어야 할 파일이 두가지 있다.</p><ul><li><strong>[…all].vue →</strong> 접속한 페이지에 해당하는 라우트가 없을 때 띄워줄 404 페이지</li><li><strong>index.vue</strong> → 루트 페이지</li></ul><p>나머지는 파일을 만드는대로 라우트에 등록된다.</p><h2 id="nested-routes" tabindex="-1">nested routes</h2><blockquote><p>Nested Routes<br><a href="https://github.com/hannoeru/vite-plugin-pages#nested-routes">https://github.com/hannoeru/vite-plugin-pages#nested-routes</a></p></blockquote><p>메인 페이지와 포스트 페이지의 디자인을 완전히 분리하고 nested routes 로 관리할 것이다.</p><p><img src="`+c+`" alt=""></p><pre class="language-ts"><code class="language-ts">route <span class="token punctuation">{</span>
  path<span class="token operator">:</span> <span class="token string">&#39;/posts&#39;</span><span class="token punctuation">,</span>
  component<span class="token operator">:</span> <span class="token string">&#39;/src/pages/posts.vue&#39;</span><span class="token punctuation">,</span>
  customBlock<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  children<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      name<span class="token operator">:</span> <span class="token string">&#39;posts-post2&#39;</span><span class="token punctuation">,</span>
      path<span class="token operator">:</span> <span class="token string">&#39;post2&#39;</span><span class="token punctuation">,</span>
      component<span class="token operator">:</span> <span class="token string">&#39;/src/pages/posts/post2.md&#39;</span><span class="token punctuation">,</span>
      customBlock<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
      props<span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ....</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  props<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

</code></pre><p>/pages 폴더 아레, <code class="">posts</code>  로 폴더와 vue 파일을 하나씩 만든다. 그럼 자동으로 nested routes 로 인식한다.</p><pre class="language-vue"><code class="language-vue">&lt;script setup&gt;&lt;/script&gt;
&lt;template&gt;
  &lt;div class=&quot;post-index-wrapper&quot;&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
&lt;/style&gt;

</code></pre><p><code class="">posts.vue</code>  파일에는 <code class="">router-view</code>  를 사용하면 끝!</p><h1 id="vite-plugin-vue-layouts" tabindex="-1">vite-plugin-vue-layouts</h1><blockquote><p>vite-plugin-vue-layouts<br><a href="https://www.npmjs.com/package/vite-plugin-vue-layouts">https://www.npmjs.com/package/vite-plugin-vue-layouts</a></p></blockquote><p>vite-plugin-pages 와 세트이다. main 에서 createApp 을 할 때, 라우트를 인식시키기 위함이다. 무조건 필요한지는 잘 모르겠다. 더 알아봐야 함.</p><pre><code class="">npm install -D vite-plugin-vue-layouts
</code></pre><pre class="language-ts"><code class="language-ts"><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> Layouts <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-vue-layouts&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">Layouts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>vite 설정에 <code class="">Layouts</code>  추가하기</p><pre class="language-json"><code class="language-json"><span class="token comment">// tsconfig.json</span>
<span class="token property">&quot;compileOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;vite/client&quot;</span><span class="token punctuation">,</span> 
      <span class="token string">&quot;vite-plugin-pages/client&quot;</span><span class="token punctuation">,</span> 
      <span class="token string">&quot;vite-plugin-vue-layouts/client&quot;</span><span class="token punctuation">,</span> 
      <span class="token string">&quot;node&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><p><code class="">virtual</code>  import 를 인식하기 위해서 types 항목을 추가한다.</p><pre class="language-ts"><code class="language-ts"><span class="token comment">// main.ts</span>
<span class="token comment">// virtual:generated-layouts</span>
<span class="token comment">//   tsconfig.json-compilerOptions-types</span>
<span class="token comment">//   &quot;vite-plugin-vue-layouts/client&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> setupLayouts <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;virtual:generated-layouts&#39;</span>
<span class="token comment">// virtual:generated-pages</span>
<span class="token comment">//   tsconfig.json-compilerOptions-types</span>
<span class="token comment">//   &quot;vite-plugin-pages/client&quot;</span>
<span class="token keyword">import</span> generatedRoutes <span class="token keyword">from</span> <span class="token string">&#39;virtual:generated-pages&#39;</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token function">setupLayouts</span><span class="token punctuation">(</span>generatedRoutes<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token function">ViteSSG</span><span class="token punctuation">(</span>
    <span class="token comment">// 루트 컴포넌트</span>
    App<span class="token punctuation">,</span>
    <span class="token punctuation">{</span> routes <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> routes<span class="token punctuation">,</span> isClient<span class="token punctuation">,</span> initialState <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 플러그인 세팅</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><p>pages 플러그인이 셍성한 라우트를 main 에서 적용시킨다.</p><h1 id="vite-plugin-md" tabindex="-1">vite-plugin-md</h1><blockquote><p>vite-plugin-md<br><a href="https://github.com/antfu/vite-plugin-md">https://github.com/antfu/vite-plugin-md</a></p></blockquote><p>마크다운을 뷰 컴포넌트로 만들어준다.</p><pre><code class="">npm i vite-plugin-md -D
</code></pre><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> Markdown <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-md&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      include<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.md$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 마크다운 파일도 인식하기</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><p>기본적으로 있던 <code class="">vue</code>  플러그인에 <code class="">md</code>  파일도 인식할 수 있게 항목을 추가해주고, <code class="">Markdown</code>  플로그인을 추가한다.</p><h2 id="%EB%A9%94%ED%83%80%ED%83%9C%EA%B7%B8-%EC%B6%94%EA%B0%80" tabindex="-1">메타태그 추가</h2><p><a href="https://github.com/mdit-vue/vite-plugin-vue-markdown#document-head-and-meta">GitHub - mdit-vue/vite-plugin-vue-markdown: Compile Markdown to Vue component</a></p><p>페이지별로 메타태그를 추가하고싶은데, <code class="">.md</code> 파일로는 어떻게 해줘야 할까? <code class="">vite-ssg</code> 와 <code class="">vite-plugin-md</code> 에서 이미 <code class="">vueuse/head</code> 를 사용한다. 그래서 <code class="">unhead/vue</code> 를 사용해보려고 했지만, 충돌 문제가 있어서 <code class="">vueuse/head</code> 의 방식을 따르기로 했다.</p><pre class="language-md"><code class="language-md"><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml">meta:
  - name: My Cool App
    description: cool things happen to people who use cool apps</span>
<span class="token punctuation">---</span></span>
</code></pre><p>md 파일의 최상단에 <code class="">---</code> 로 구분선을 위아래로 넣어주고, 안에 내용을 넣어준다.</p><pre class="language-md"><code class="language-md"><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml">meta:
  - name: description
    content: Github.io 와 Vue3 를 활용해서 블로그를 시작. SPA를 prerendering 하여 개별 페이지를 생성하고, 메타태그를 추가. 구글 검색 엔진에 등록할 사이트맵 자동 생성. 마크다운을 html 로 변환. Google Analytics 도입으로 방문자 수 체크.</span>
<span class="token punctuation">---</span></span>
</code></pre><p>이런 형식도 된다.</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Github.io + Vue3 로 블로그 만들기<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>description<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Github.io 와 Vue3 를 활용해서 블로그를 시작. SPA를 prerendering 하여 개별 페이지를 생성하고, 메타태그를 추가. 구글 검색 엔진에 등록할 사이트맵 자동 생성. 마크다운을 html 로 변환. Google Analytics 도입으로 방문자 수 체크.<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>og:title<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Github.io + Vue3 로 블로그 만들기<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><p>html 파일에 자동으로 <code class="">meta</code> 태그가 추가된다.</p><h1 id="markdown-it-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8" tabindex="-1">markdown-it 플러그인</h1><h2 id="markdown-it-anchor" tabindex="-1">markdown-it-anchor</h2><blockquote><p>markdown-it-anchor<br><a href="https://www.npmjs.com/package/markdown-it-anchor">https://www.npmjs.com/package/markdown-it-anchor</a></p></blockquote><p><code class="">H</code>  태그에 기본적으로 anchor 를 달아서 이동할 수 있게 한다. 한글도 지원한다.</p><h2 id="markdown-it-table-of-contents" tabindex="-1">markdown-it-table-of-contents</h2><blockquote><p>markdown-it-table-of-contents<br><a href="https://www.npmjs.com/package/markdown-it-table-of-contents">https://www.npmjs.com/package/markdown-it-table-of-contents</a></p></blockquote><p><code class="">[[toc]]</code>  를 사용하면 목차를 만들 수 있다.</p><h3 id="%EB%AA%A9%EC%B0%A8-%EC%9A%94%EC%86%8C%EB%A5%BC-%EB%94%B0%EB%A1%9C-%EB%96%BC%EC%84%9C-%EB%8B%A4%EB%A5%B8-%EA%B3%B3%EC%97%90-%EB%B6%99%EC%9D%B4%EA%B8%B0" tabindex="-1">목차 요소를 따로 떼서 다른 곳에 붙이기</h3><p>목차가 md 페이지 컴포넌트의 상단에 고정되어 있어서 원하는 곳에서 사용할 수 없다. 예를 들어, 오른쪽 부분에 고정을 시킨다던지.</p><pre class="language-ts"><code class="language-ts"><span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 목차를 markdown-body 내부에서 제거한 후, </span>
  <span class="token comment">// 옆에 붙인다.</span>
  <span class="token keyword">const</span> mdBody <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;.markdown-body&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> targetToc <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;.new-table-of-contents&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> toc <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;.markdown-body .table-of-contents&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span>mdBody <span class="token operator">&amp;&amp;</span> targetToc <span class="token operator">&amp;&amp;</span> toc <span class="token operator">&amp;&amp;</span> main<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    targetToc<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> toc<span class="token operator">?.</span>innerHTML<span class="token operator">!</span><span class="token punctuation">;</span>
    <span class="token comment">// 라우트 변경 시 \`.table-of-contents\` 의 innerHTML 이 한번 제거되고 undefined 로 뜨기 때문에</span>
    <span class="token comment">// display: none 만 붙여서 숨긴다.</span>
    <span class="token punctuation">(</span>toc <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span><span class="token operator">?.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;display&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>자바스크립트로 간단하게 <code class="">innerHTML</code>  을 붙이려는 요소에 넣어주고, 해당 요소는 제거하면 된댜.</p><blockquote><p>[!attention] 원래는 <code class="">toc</code> 를 remove 로 제거했으나, 그러면 라우트를 두번 이상 이동할 때, 이미 제거된 <code class="">.table-of-contents</code> 에서 내용을 찾아 <code class="">undefined</code> 를 얻게 된다. 라우트 시 toc 요소가 없으면 생성하지 못하는듯 하다. 그래서 <code class="">display: none;</code> 속성만 주어서 보이지만 않게 한다.</p></blockquote><pre class="language-ts"><code class="language-ts"><span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> route<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token comment">// SPA 라우트가 바뀔 때마다 toc 변경</span>
	<span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">createToc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>라우트가 변경될 때마다 TOC를 옮겨주기 위해서 <code class="">watch</code> 를 추가한다.</p><h2 id="markdown-it-prism" tabindex="-1">markdown-it-prism</h2><blockquote><p>markdown-it-prism<br><a href="https://www.npmjs.com/package/markdown-it-prism">https://www.npmjs.com/package/markdown-it-prism</a></p></blockquote><p><code class="">prism</code>  라이브러를 래핑했다. 마크다운 파일 내의 소스코드를 위한 <code class="">pre</code>  태그를 하이라이팅한다.</p><pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">markdownItSetup</span><span class="token punctuation">(</span>md<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// prism 코드 하이라이터</span>
        md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MDPrism<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p><code class="">markdownItSetup</code> 함수에서 use 로 사용선언하면 자동으로 마크다운 코드 영역은 하이라이팅 된다. 클래스가 부여되기만 해서 css 는 직접 넣어주어야 한다.</p><pre class="language-scss"><code class="language-scss">&lt;style&gt;
<span class="token keyword">@import</span> <span class="token string">&quot;../assets/scss/prism-vscode.scss&quot;</span><span class="token punctuation">;</span> 
&lt;/style&gt;
</code></pre><p>우리의 경우 포스트가 <code class="">RouterView</code> 에서 자동으로 페이지화되어 보여지기 때문에, <code class="">scoped style</code> 로는 스타일을 적용할 수 없다. 그래서 전역 css 로 선언해주어야 한다.</p><h3 id="%ED%85%8C%EB%A7%88" tabindex="-1">테마</h3><p><a href="https://github.com/PrismJS/prism-themes">GitHub - PrismJS/prism-themes: A wider selection of Prism themes</a> 여러가지 테마를 모아둔 깃헙이다. 가장 익숙한 vscode 를 사용했다.</p><h1 id="pinia" tabindex="-1">pinia</h1><blockquote><p>pinia<br><a href="https://pinia.vuejs.org/getting-started.html#installation">https://pinia.vuejs.org/getting-started.html#installation</a><br> vite-ssg pinia<br><a href="https://github.com/antfu/vite-ssg#initial-state">https://github.com/antfu/vite-ssg#initial-state</a></p></blockquote><p>포스트 목록을 관리하기 위해서 pinia 를 설치하자.</p><pre><code class="">npm install pinia
</code></pre><pre class="language-ts"><code class="language-ts"><span class="token comment">// main.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token function">ViteSSG</span><span class="token punctuation">(</span>
  App<span class="token punctuation">,</span>
  <span class="token punctuation">{</span> routes <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> initialState <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> pinia <span class="token operator">=</span> <span class="token function">createPinia</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span><span class="token punctuation">)</span>
      initialState<span class="token punctuation">.</span>pinia <span class="token operator">=</span> pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value
    <span class="token keyword">else</span>
      pinia<span class="token punctuation">.</span>state<span class="token punctuation">.</span>value <span class="token operator">=</span> initialState<span class="token punctuation">.</span>pinia <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useRootStore</span><span class="token punctuation">(</span>pinia<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>store<span class="token punctuation">.</span>ready<span class="token punctuation">)</span>
        <span class="token comment">// perform the (user-implemented) store action to fill the store&#39;s state</span>
        store<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

</code></pre><p>vite-ssg 깃헙에서 나온 설명서인데, 글로벌로 store 를 등록하는 게 아니라면, <code class="">app.use</code>  까지만 해주어도 된다.</p><pre class="language-ts"><code class="language-ts"><span class="token comment">// src/store/posts.ts</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pinia&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  fileName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  tags<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  data<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> usePosts <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">&#39;post&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> postList <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>Post<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> currentUrl <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchPostList</span><span class="token punctuation">(</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    axios<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>Post<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/postlist.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      postList<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
      <span class="token keyword">return</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    postList<span class="token punctuation">,</span>
    currentUrl<span class="token punctuation">,</span>
    fetchPostList<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><p>post 목록을 가져오는 store 를 하나 만든다. 포스트를 단순히 json 파일로 저장해두고, 사용할 것이다.</p><pre class="language-ts"><code class="language-ts"><span class="token comment">// public/postlist.json</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vue-Prefetch&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;fileName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vue-Prefetch&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vue Code Spliting 간단히 알아보기 (+ Prefetch)&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Vue 프로젝트의 Code Spliting 이 어떻게 작동하는지와 webpack prefetch 옵션 에 대해서 간략한 설명.&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;createdAt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022-08-05&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;updatedAt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022-08-05&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Vue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Vue2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Vue3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Code Spliting&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;코드분산&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Prefecth&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Webpack&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">]</span>

</code></pre><p>public 폴더에 파일을 두면, 그 항목은 사이트의 루트에 포함되게 된다. 같은 호스트이기 때문에 cors 없이 axios 로 동적으로 조회할 수 있다.</p><h1 id="%EB%AC%B8%EC%A0%9C" tabindex="-1">문제</h1><h2 id="vite-ssg-%2B-gsap" tabindex="-1">vite-ssg + gsap</h2><pre><code class="">[vite-ssg] An internal error occurred.
[vite-ssg] Please report an issue, if none already exists: https://github.com/antfu/vite-ssg/issues
file:///Users/hslee/Workspaces/something/lhs-source.github.io/.vite-ssg-temp/main.mjs:6
import { ScrollTrigger } from &quot;gsap/ScrollTrigger.js&quot;;
         ^^^^^^^^^^^^^
SyntaxError: Named export &#39;ScrollTrigger&#39; not found. The requested module &#39;gsap/ScrollTrigger.js&#39; is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from &#39;gsap/ScrollTrigger.js&#39;;
const { ScrollTrigger } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:123:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:189:5)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async build (file:///Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/vite-ssg/dist/shared/vite-ssg.62550b28.mjs:996:87)
    at async Object.handler (file:///Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/vite-ssg/dist/node/cli.mjs:29:5)

Node.js v18.12.1
</code></pre><p><a href="https://stackoverflow.com/a/76578317">javascript - GSAP ScrollTrigger with Next.js - Stack Overflow</a></p><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token constant">MPP</span> <span class="token keyword">from</span> <span class="token string">&#39;gsap/dist/MotionPathPlugin&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ScrollTrigger <span class="token keyword">from</span> <span class="token string">&#39;gsap/dist/ScrollTrigger&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> MotionPathPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token constant">MPP</span><span class="token punctuation">;</span>
gsap<span class="token punctuation">.</span><span class="token function">registerPlugin</span><span class="token punctuation">(</span>ScrollTrigger<span class="token punctuation">)</span><span class="token punctuation">;</span>
gsap<span class="token punctuation">.</span><span class="token function">registerPlugin</span><span class="token punctuation">(</span>MotionPathPlugin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>이런식으로 바꿔주었다. <code class="">vite-ssg</code> 로 사용할 때는 다른 빌드 방식을 사용하나보다. <code class="">esbuild</code> 라거나, commonJS 라거나… 그래서 <code class="">/dist</code> 폴더 안의 라이브러리를 사용해주었다.</p><h2 id="axios" tabindex="-1">axios</h2><p><code class="">vite-ssg</code> 는 정적 html 사이트를 생성하기 때문에 <code class="">setup</code> 안에 있는 함수를 무조건 실행한다. 그래서 최초에 데이터를 가져오는 axios 함수가 실행되면서 없는 서버로 데이터를 가져오려고 해서 에러가 발생한다.</p><pre><code class="">file:///Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/axios/lib/core/AxiosError.js:89
  AxiosError.call(axiosError, error.message, code, config, request, response);
             ^
AxiosError: connect ECONNREFUSED ::1:80
    at AxiosError.from (file:///Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/axios/lib/core/AxiosError.js:89:14)
    at RedirectableRequest.handleRequestError (file:///Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/axios/lib/adapters/http.js:591:25)
    at RedirectableRequest.emit (node:events:513:28)
    at eventHandlers.&lt;computed&gt; (/Users/hslee/Workspaces/something/lhs-source.github.io/node_modules/follow-redirects/index.js:14:24)
    at ClientRequest.emit (node:events:513:28)
    at Socket.socketErrorListener (node:_http_client:494:9)
    at Socket.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
</code></pre><p><code class="">::1:80</code> 경로로 데이터를 가져오면서 에러가 발생한 것이다.</p><pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token function">usePosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">animPostList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  posts<span class="token punctuation">.</span><span class="token function">fetchPostList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><p>onMounted 내부에서 fetch 를 실행하면, <code class="">setup</code> 훅과 다르게 빌드 시 실행하지 않는다.</p>`,111),i=[l],f={title:"Vite vue + Github Pages 페이지 구축",meta:[{name:"description",content:"기존 vue-cli 를 사용한 vue 프로젝트로 github pages 를 구축했는데, 대세에 따라 vite 로 변경하기로 했다."},{property:"og:title",content:"Vite vue + Github Pages 페이지 구축"}]},v="",b=a({__name:"vite-vue-and-github-pages",setup(r,{expose:n}){return s({title:"Vite vue + Github Pages 페이지 구축",meta:[{name:"description",content:"기존 vue-cli 를 사용한 vue 프로젝트로 github pages 를 구축했는데, 대세에 따라 vite 로 변경하기로 했다."},{property:"og:title",content:"Vite vue + Github Pages 페이지 구축"}]}),n({frontmatter:{title:"Vite vue + Github Pages 페이지 구축",meta:[{name:"description",content:"기존 vue-cli 를 사용한 vue 프로젝트로 github pages 를 구축했는데, 대세에 따라 vite 로 변경하기로 했다."},{property:"og:title",content:"Vite vue + Github Pages 페이지 구축"}]},excerpt:void 0}),(d,g)=>(o(),t("div",u,i))}});export{b as default,v as excerpt,f as frontmatter};
