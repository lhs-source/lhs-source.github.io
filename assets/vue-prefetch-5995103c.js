import{d as s,c as a,v as t,o as p}from"./index-fb6929c2.js";const e={class:"markdown-body"},o=t(`<p><div class="table-of-contents"><ul><li><a href="#code-spliting">Code Spliting</a><ul><li><a href="#vue-%EC%97%90%EC%84%9C%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B8%B0%EB%8A%A5%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%82%98">Vue 에서는 어떻게 기능을 사용하나</a></li></ul></li><li><a href="#prefetch%3F">Prefetch?</a></li><li><a href="#vue-cli">Vue-Cli</a></li><li><a href="#vite">Vite</a></li></ul></div></p><h1 id="code-spliting" tabindex="-1">Code Spliting</h1><p>우리가 Vue 프로젝트에서 Code Spliting 을 사용하는 이유는 <strong>빌드 결과물의 데이터 양을 분산시키기 위해서</strong>다. 기본적으로 SPA 프론트엔드 프로젝트를 번들링할 때, 스크립트 파일은 하나로 뭉쳐진다. 프로젝트 크기에 따라서 이 파일의 크기는 선형으로 증가하며, 초기에 모든 기능을 로드하는 SPA 특성상 초기 렌더링 시간이 급격하게 늘어난다.</p><h2 id="vue-%EC%97%90%EC%84%9C%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B8%B0%EB%8A%A5%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%82%98" tabindex="-1">Vue 에서는 어떻게 기능을 사용하나</h2><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">&#39;../views/HomeView.vue&#39;</span>
<span class="token punctuation">{</span>
  path<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Home&#39;</span><span class="token punctuation">,</span>
  component<span class="token operator">:</span> Home
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  path<span class="token operator">:</span> <span class="token string">&#39;/:id&#39;</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Datail&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: &quot;detail&quot; */</span> <span class="token string">&#39;../views/DetailView.vue&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><p>vue-router 에서 컴포넌트를 정적으로 로드할 경우 app.js 에 컴포넌트 코드가 함께 번들링된다. 위 코드의 Detail 컴포넌트 처럼 함수를 통해 동적으로 로드할 경우 코드는 분산된다. <code class="">webpackChunkName</code> 에 정의된 이름으로 하나의 청크로 묶인다. 서로 다른 두 개의 라우트에서 같은 <code class="">webpackChunkName</code> 을 사용하면, 하나의 파일에 두 라우트 컴포넌트가 묶인다.</p><h3 id="%EB%A7%8C%EC%95%BD-%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EB%9D%BC%EC%9A%B0%ED%8A%B8%EC%97%90%EC%84%9C-%EA%B0%99%EC%9D%80-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C%EB%8B%A4%EB%A9%B4%3F" tabindex="-1">만약 서로 다른 라우트에서 같은 컴포넌트를 사용한다면?</h3><pre class="language-tsx"><code class="language-tsx"><span class="token punctuation">{</span>
	<span class="token comment">// Input 컴포넌트를 사용</span>
  path<span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Home&#39;</span><span class="token punctuation">,</span>
	<span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: &quot;home&quot; */</span> <span class="token string">&#39;../views/HomeView.vue&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token comment">// 마찬가지로 Input 컴포넌트를 사용</span>
  path<span class="token operator">:</span> <span class="token string">&#39;/:id&#39;</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Datail&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: &quot;detail&quot; */</span> <span class="token string">&#39;../views/DetailView.vue&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><p>만약 Home과 Detail 컴포넌트 모두 Input 컴포넌트를 공통으로 사용하고 있다면, 코드는 어떻게 묶일까.</p><ul><li>home.js</li><li>detail.js</li><li>home-detail.js</li></ul><p>위처럼 공통된 컴포넌트는 별도의 파일로 묶이며 각 페이지 진입 시에 <strong>home-detail.js</strong> 파일을 똑같이 로드한다.</p><ul><li>Home 컴포넌트 진입 시 <strong>home.js</strong> 와 <strong>home-detail.js</strong> 로드 + <strong>detail.js</strong> 로드 안함</li><li>Detail 컴포넌트 진입 시 <strong>detail.js</strong> 와 <strong>home-detail.js</strong> 로드 + <strong>home.js</strong> 로드 안함</li></ul><h1 id="prefetch%3F" tabindex="-1">Prefetch?</h1><p>Code Spliting 을 통해 번들을 여러 파일로 분산하고, 필요에 따라 브라우저가 동적으로 요청하게끔 하는 것으로 초기 렌더링 시간을 줄일 수 있게 되었다. 그런데 여기서 설명하는 <code class="">prefetch</code> 라는 것은 분산 시킨 코드들을 <code class="">index.html</code> 에서 미리 로드해 갖고 있는 것이다.</p><pre class="language-tsx"><code class="language-tsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
	</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/js/somepart1.js<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>prefetch<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
	</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/js/somepart2.js<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>prefetch<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span></code></pre><p>이런 식으로 말이다. 이렇게 되면 코드를 분산시켰음에도 처음에 다 로드를 하게 된다. 의도한대로 작동하지 않는다.</p><h1 id="vue-cli" tabindex="-1">Vue-Cli</h1><pre class="language-tsx"><code class="language-tsx">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> config <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;prefetch&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>vue-cli</strong> 에서는 기본적으로 사용하게끔 웹팩 설정이 되어 있다. 하지만 끄게끔 권장한다. <code class="">vue.config.json</code> 에다가 <code class="">prefetch</code> 플러그인을 제거하면 간단하게 기능을 끌 수 있다.</p><pre class="language-tsx"><code class="language-tsx"><span class="token punctuation">{</span>
	path<span class="token operator">:</span> <span class="token string">&#39;/page&#39;</span><span class="token punctuation">,</span>
	name<span class="token operator">:</span> <span class="token string">&#39;SomePage&#39;</span><span class="token punctuation">,</span>
	<span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPrefetch: true */</span> <span class="token string">&#39;@/src/SomePage.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><p>단 전략에 따라서 미리 로드해야하는 코드에 대해서는 <strong>vue-router</strong> 의 주석으로 prefetch 를 적용할 수 있다.</p><h1 id="vite" tabindex="-1">Vite</h1><p>Vite 의 경우 Webpack 이 아닌 Rollup 을 사용한다. 기본적인 웹팩 설정들은 사용할 수 없고, 기본적으로 동적로딩을 하는 경우 모두 항상 코드는 분산되어 빌드된다.</p><p>추가로 알아보아야 함!</p>`,24),c=[o],r={},g="",d=s({__name:"vue-prefetch",setup(l,{expose:n}){return n({frontmatter:{},excerpt:void 0}),(u,i)=>(p(),a("div",e,c))}});export{d as default,g as excerpt,r as frontmatter};