---
title: npm 의존성 설치 문제 애플 실리콘에서의 Rollup 패키지 (npm ERR notsup Unsupported platform for rollup-darwin-arm64)
description: npm의 의존성 설치 실패 문제. @rollup/rollup-darwin-arm64 패키지가 애플 실리콘에서만 설치 가능하다. Windows 및 Linux 환경에서의 설치 불가 원인. optionalDependencies의 사용 방법.
subject: Node
volume: short
tags:
  - rollup
  - error
  - dependencies
  - node
  - npm
created: 2025-01-20
updated: 2025-01-20
filename: npm-rollup-os
---


::cardlink
---
url: https://github.com/rollup/rollup/issues/5295#issuecomment-1942985686
title: "Unsupported platform · Issue #5295 · rollup/rollup"
description: "Rollup Version 4.8.0 Operating System (or Browser) MacOS M2 Pro Node Version (if applicable) 20.10.0 Link To Reproduction Nuxt 3, npm i Expected Behaviour module should be installed as expected. Ac..."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/4f1a9d9ff77dc018315c5faae0716be8d6e371e7a8f96f7acf8f9e0a847b5069/rollup/rollup/issues/5295
---
::


> npm ERR! code EBADPLATFORM
>
> npm ERR! notsup Unsupported platform for @rollup/rollup-darwin-arm64@4.30.1: wanted {"os":"darwin","cpu":"arm64"} (current: {"os":"win32","cpu":"x64"})
>
> npm ERR! notsup Valid os:   darwin
>
> npm ERR! notsup Actual os:  win32
>
> npm ERR! notsup Valid cpu:  arm64
>
> npm ERR! notsup Actual cpu: x64

```json
"dependencies": {
	"@rollup/rollup-darwin-arm64": "^4.30.1",
}
```

package.json 파일에서 dependencies 에 `@rollup/rollup-darwin-arm64` 를 종속성으로 등록해두었지만, 실행하는 환경이 Windows 혹은 Linux 등 애플실레콘이 아닐 때 일 때 설치할 수 없기 때문에 발생한다. dependencies 나 devDependencies 의 경우 설치에 실패하면 무조건 중단되며 실패로 끝난다.

```json
"optionalDependencies": {
	"@rollup/rollup-darwin-arm64": "^4.30.1"
},
```

`optionalDependencies`에 등록한 의존성은 **설치 실패해도 전체 설치 과정에 영향을 주지 않는** 의존성이다. 즉, **설치 가능하면 설치하고**, 불가능하면 **무시**한다.

플랫폼 환경에 따라서 설치해야하는 의존성이 있는 경우, 특히 이 파트를 사용한다. `@rollup/rollup-darwin-arm64`는 애플실리콘에서만 설치되는 패키지이다.
