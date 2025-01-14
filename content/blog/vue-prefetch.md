---
title: Vue Code Spliting 간단히 알아보기 (+ Prefetch)
description: Vue 프로젝트의 Code Spliting 이 어떻게 작동하는지와 webpack prefetch 옵션 에 대해서 간략한 설명.
subject: Vue
volumne: short
tags: Vue, Vue2, Vue3, Code Spliting, 코드분산, Prefetch, Webpack
created: 2022-08-05
updated: 2022-08-05
filename: vue-prefetch
---

# Code Spliting

우리가 Vue 프로젝트에서 Code Spliting 을 사용하는 이유는 **빌드 결과물의 데이터 양을 분산시키기 위해서**다. 기본적으로 SPA 프론트엔드 프로젝트를 번들링할 때, 스크립트 파일은 하나로 뭉쳐진다. 프로젝트 크기에 따라서 이 파일의 크기는 선형으로 증가하며, 초기에 모든 기능을 로드하는 SPA 특성상 초기 렌더링 시간이 급격하게 늘어난다.

## Vue 에서는 어떻게 기능을 사용하나

```tsx
import Home from '../views/HomeView.vue'
{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/:id',
  name: 'Datail',
  component: () => import(/* webpackChunkName: "detail" */ '../views/DetailView.vue')
}
```

vue-router 에서 컴포넌트를 정적으로 로드할 경우 app.js 에 컴포넌트 코드가 함께 번들링된다. 위 코드의 Detail 컴포넌트 처럼 함수를 통해 동적으로 로드할 경우 코드는 분산된다. `webpackChunkName` 에 정의된 이름으로 하나의 청크로 묶인다. 서로 다른 두 개의 라우트에서 같은 `webpackChunkName` 을 사용하면, 하나의 파일에 두 라우트 컴포넌트가 묶인다.

### 만약 서로 다른 라우트에서 같은 컴포넌트를 사용한다면?

```tsx
{
	// Input 컴포넌트를 사용
  path: '/',
  name: 'Home',
	component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
}, {
	// 마찬가지로 Input 컴포넌트를 사용
  path: '/:id',
  name: 'Datail',
  component: () => import(/* webpackChunkName: "detail" */ '../views/DetailView.vue')
}
```

만약 Home과 Detail 컴포넌트 모두 Input 컴포넌트를 공통으로 사용하고 있다면, 코드는 어떻게 묶일까.

- home.js
- detail.js
- home-detail.js

위처럼 공통된 컴포넌트는 별도의 파일로 묶이며 각 페이지 진입 시에 **home-detail.js** 파일을 똑같이 로드한다.

- Home 컴포넌트 진입 시 **home.js** 와 **home-detail.js** 로드 + **detail.js** 로드 안함
- Detail 컴포넌트 진입 시 **detail.js** 와 **home-detail.js** 로드 + **home.js** 로드 안함

# Prefetch?

Code Spliting 을 통해 번들을 여러 파일로 분산하고, 필요에 따라 브라우저가 동적으로 요청하게끔 하는 것으로 초기 렌더링 시간을 줄일 수 있게 되었다. 그런데 여기서 설명하는 `prefetch` 라는 것은 분산 시킨 코드들을 `index.html` 에서 미리 로드해 갖고 있는 것이다. 

```tsx
<head>
	<link href="/js/somepart1.js" rel="prefetch">
	<link href="/js/somepart2.js" rel="prefetch">
<head>
```

이런 식으로 말이다. 이렇게 되면 코드를 분산시켰음에도 처음에 다 로드를 하게 된다. 의도한대로 작동하지 않는다. 

# Vue-Cli

```tsx
module.exports = {
	chainWebpack: config => {
		config.plugins.delete('prefetch');
	}
}
```

**vue-cli** 에서는 기본적으로 사용하게끔 웹팩 설정이 되어 있다. 하지만 끄게끔 권장한다. `vue.config.json` 에다가 `prefetch` 플러그인을 제거하면 간단하게 기능을 끌 수 있다.

```tsx
{
	path: '/page',
	name: 'SomePage',
	component: () => import(/* webpackPrefetch: true */ '@/src/SomePage.vue'),
}
```

단 전략에 따라서 미리 로드해야하는 코드에 대해서는 **vue-router** 의 주석으로 prefetch 를 적용할 수 있다.

# Vite

Vite 의 경우 Webpack 이 아닌 Rollup 을 사용한다. 기본적인 웹팩 설정들은 사용할 수 없고, 기본적으로 동적로딩을 하는 경우 모두 항상 코드는 분산되어 빌드된다.

추가로 알아보아야 함!