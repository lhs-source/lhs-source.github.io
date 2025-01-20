---
title: Nuxt Pinia 시작하기 + getActivePinia 에러
description: Nuxt 프로젝트에서 Pinia를 설정하고 사용하는 방법을 안내. Pinia 설치, Nuxt 설정 파일에 추가하는 방법, 스토어 생성을 포함하여 컴포넌트에서의 사용 예시. 서버 사이드 렌더링(SSR) 설정 및 일반적인 오류 해결 방법.
subject: Nuxt
volume: medium
tags:
  - nuxt
  - vue3
  - vue3/pinia
created: 2025-01-20
updated: 2025-01-20
filename: nuxt-pinia-get-active-pinia
---

Nuxt 프로젝트에서 Pinia를 사용하는 방법은 Vue3와 다르다. 
## Pinia 설치

```bash
npm install @pinia/nuxt
yarn add @pinia/nuxt
```

## Nuxt 설정 파일에 Pinia 추가

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
})
```
`nuxt.config.ts` 파일에 모듈을 추가해야 한다.

## 스토어 생성

`stores` 폴더를 만들고 그 안에 스토어 파일을 작성한다. Nuxt에서 `stores` 폴더를 자동으로 인식해서 따로 import할 필요 없다.

예시: `stores/counter.ts`

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

## 컴포넌트에서 사용하기

컴포넌트에서 `useCounterStore`를 불러와서 사용하면 된다.

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">증가</button>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore()
</script>
```

## (선택) 서버 사이드 렌더링(SSR) 설정

Pinia는 SSR도 지원한다. 특별한 설정 없이도 기본적으로 SSR에서 잘 작동하지만, 커스텀이 필요하면 `nuxt.config.ts`에 아래와 같이 옵션을 추가할 수 있다.

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
})
```

이렇게 하면 Pinia를 Nuxt 프로젝트에서 손쉽게 사용할 수 있다.

# getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?

> \[nuxt\] error caught during app initialization Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
>
> See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
>
> This will fail in production.
>             at useStore (pinia.js?v=859d6957:1322:13) 

다 설정하고 보니 위 에러가 발생했다.

1. 모듈 누락 확인
2. `@pinia/nuxt` 추가했는지 확인
3. 비동기 로직 이후 스토어 접근 ㄴㄴ

### 캐시 및 라이브러리 다시 설치

```sh
rm -rf node_modules/.cache
rm -rf .nuxt
rm -rf node_modules
npm install  # 또는 yarn install
npm run dev
```

잔류 캐시나 이전버전 라이브러리 등의 충돌이 있을 수 있으니!

> [!hint] 
> WARN  Module pinia is disabled due to incompatibility issues:                      오후 9:18:14  
 >- [nuxt] Nuxt version ^2.0.0 || >=3.13.0 is required but currently using 3.12.1 

버전도 확인해보자. 호환이 안되는 라이브러리일 수 있다. 나의 경우 nuxt 는 3.12.1 버전인데, pinia 2.3.x 버전을 사용하려면 3.13.0 이상의 버전을 요한다고 경고한다.

|**라이브러리**|**현재 버전**|**권장 버전**|
|---|---|---|
|**Nuxt**|`3.12.1`|`3.13.0` 이상|
|**Pinia**|`^2.3.0`|`2.3.x` (OK)|
|**@pinia/nuxt**|`^0.9.0`|`0.9.x` (OK)|

```sh
npm install nuxt@latest
```

nuxt 버전을 최신버전으로 업데이트 한다. 그럼 아래 pinia 를 수동등록하지 않아도 위 방법대로 잘 동작한다.
### Pinia 사용을 수동으로 등록

```ts
// plugins/pinia.ts
import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
```

결국 이 방법으로 해결했다. nuxt 를 

```json
"dependencies": {
	"@pinia/nuxt": "^0.9.0",
	"nuxt": "^3.12.1",
	"pinia": "^2.3.0",
},
```

이 버전들의 조합으로는 수동으로 등록하는 것이 답이었다
