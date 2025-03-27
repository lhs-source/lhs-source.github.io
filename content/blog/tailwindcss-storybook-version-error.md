---
tags:
  - tailwindcss
  - error
  - Vite
  - vue3
  - storybook
created: 2025-03-21
updated: 2025-03-21
title: tailwindcss 4.0.8 버전 storybook 호환성 오류
description: tailwindcss 와 storybook 의 호환성 문제 해결 과정. 특정 버전의 문제로 핫픽스 적용.
subject: Tailwindcss
filename: tailwindcss-storybook-version-error
volumne: medium
---

## Error: ENOENT: no such file or directory, stat 'C:\Users\PROJECTPATH\iframe.html'

어느날 갑자기 CICD가 안되어서 내용을 보니 storybook 빌드를 하면서 에러가 발생했었다. 분명 로컬에서는 되는데 원격 환경에서만 에러가 발생하는 것이었다. 

사용 중인 버전정보는 다음과 같다,
* tailwindcss@4.0.8
* storybook@8.6.0
* vite@6.1.0
* vue3@3.5.13

```
{projectname} build-storybook
storybook build

@storybook/core v8.6.0

info => Cleaning outputDir: storybook-static
info => Loading presets
WARN The "@storybook/addon-mdx-gfm" addon is meant as a migration assistant for Storybook 8.0; and will likely be removed in a future version.
WARN It's recommended you read this document:
WARN https://storybook.js.org/docs/writing-docs/mdx#markdown-tables-arent-rendering-correctly
WARN
WARN Once you've made the necessary changes, you can remove the addon from your package.json and storybook config.
info => Building manager..
info => Manager built (236 ms)
info => Building preview..
mode production
npm_package_version 2.12.3
plugin 'rollup-plugin-html-env' uses deprecated 'transform' option. Use 'handler' option instead.
vite v6.1.0 building for production...
transforming (1) virtual:@storybook\builder-vite\vite-app.jsC:\Users\PROJECTPATH\node_modules\storybook\bin\index.cjs:23
throw error;
^

Error: ENOENT: no such file or directory, stat 'C:\Users\PROJECTPATH\iframe.html'
at async Object.stat (node:internal/fs/promises:1036:18)
at async C.addBuildDependency (file:///C:/Users/PROJECTPATH/node_modules/@tailwindcss/vite/dist/index.mjs:1:5226) {
errno: -4058,
code: 'ENOENT',
syscall: 'stat',
path: 'C:\Users\PROJECTPATH\iframe.html'
}
```

iframe.html 파일을 찾지 못해서 발생한 에러이다. storybook 과 tailwindcss 를 같이 사용할 때, 미리보기 파일이 생성이 안되면서 발생하는 것으로 보인다.

::cardlink
url: https://github.com/tailwindlabs/tailwindcss/issues/16785
title: "4.0.8 + Vite + Storybook = new crash · Issue #16785 · tailwindlabs/tailwindcss"
description: "What version of Tailwind CSS are you using? v4.0.8 What build tool (or framework if it abstracts the build tool) are you using? Storybook v8.5.8 Vite v5.4.14 What version of Node.js are you using? ..."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/e7a6f8fe1ba78e023dbfa9f44388e93bcbe3c43841cf0e9034777d276d47677c/tailwindlabs/tailwindcss/issues/16785
::

::cardlink
url: https://github.com/tailwindlabs/tailwindcss/pull/16780
title: "Vite: Don't crash with virtual module dependencies by philipp-spiess · Pull Request #16780 · tailwindlabs/tailwindcss"
description: "Fixes #16732If we can not get the mtime from a file, chances are that the resource is a virtual module. This is perfectly legit and we can fall back to what we did before the changes in 4.0.8 (whi..."
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/f4e77eb4132aa99f9be1cfadae376ec84a4a99df80f95e1692ae31ba1d1ef10a/tailwindlabs/tailwindcss/pull/16780
::

헤당 이슈 혹은 비슷한 이슈가 이미 오픈되어 있었다. 이 문제를 발견한 시점으로부터 바로 하루 전이었다.

> [!success] 
> 여기서 insider 라는 용어를 처음 알았다. 공식적으로 발표되지 않았지만, 사용해볼 수 있는 버전을 뜻하는듯 하다. 

![Untitled](img/tailwindcss-storybook-version-error/tailwindcss-storybook-version-error.png)

내용으로 봐서는 4.0.8 버전에 일부 문제가 있었던 것 같고, 4.0.9 버전에서 픽스가 되어서 바로 사용해볼 수 있었다. `"tailwindcss": "^4.0.9"` 으로 세팅해서 lock 파일과 node_modules 폴더를 모두 지우고 다시 설치해서 이 문제는 해결되었다.
## Cannot be closed: a

```
✗ Build failed in 8.40s
=> Failed to build the preview
[vite:build-html] Cannot be closed: a
    at ParseHTML.onCloseTagEndEvent (.\node_modules\vite-plugin-html-env\lib\parse\index.js:313:15)
    at ParseHTML.parse (.\node_modules\vite-plugin-html-env\lib\parse\index.js:189:16)
    at transform (.\node_modules\vite-plugin-html-env\lib\index.js:148:19)
    at applyHtmlTransforms (file:///C:/Users/PROJECTPATH/node_modules/vite/dist/node/chunks/dep-ByPKlqZ5.js:42504:23)
    at async Object.generateBundle (file:///C:/Users/PROJECTPATH/node_modules/vite/dist/node/chunks/dep-ByPKlqZ5.js:42244:18)
    at async Bundle.generate (file:///C:/Users/PROJECTPATH/node_modules/rollup/dist/es/shared/node-entry.js:20116:9)
    at async file:///C:/Users/PROJECTPATH/node_modules/rollup/dist/es/shared/node-entry.js:22805:27
    at async catchUnfinishedHookActions (file:///C:/Users/PROJECTPATH/node_modules/rollup/dist/es/shared/node-entry.js:22187:16)
    at async buildEnvironment (file:///C:/Users/PROJECTPATH/node_modules/vite/dist/node/chunks/dep-ByPKlqZ5.js:51450:16)
    at async build (.\node_modules\@storybook\builder-vite\dist\index.js:80:230)
```

다시 최신 커밋으로 돌아가 tailwindcss 버전만 4.0.9 로 올린다고 성공하진 않았다. storybook 버전은 그대로 사용해야 충돌이 안나는듯 했다. 이 에러는 storybook 의 에러로 보인다. story 파일도 모두 지우고 테스트해봐도 같은 결과인 걸 보면, 작성한 stories 에서 문제가 있던 건 아닌 거로 보인다.

문제가 된 커밋을 찾아보니, 이번엔 storybook 의 버전 문제였다. 원래 되던 것이 안되면 무조건 버전 문제다. `8.4.7` -> `8.6.0` 으로 올렸던 것이 문제가 되었었다. 이 커밋을 revert 하고 시도하니 해결되었다. 무작정 신버전이 능사는아니다.

## @tailwindcss/oxide-linux-x64-gnu 

```
failed to load config from /home/runner/work/Upbox-2.0-Front-Application/Upbox-2.0-Front-Application/vite.config.ts
=> Failed to build the preview
Error: Cannot find module '@tailwindcss/oxide-linux-x64-gnu'
Require stack:
- ./node_modules/@tailwindcss/oxide/index.js
    at Function.<anonymous> (node:internal/modules/cjs/loader:1225:15)
    at Module._resolveFilename (./node_modules/esbuild-register/dist/node.js:4794:36)
    at Function._load (node:internal/modules/cjs/loader:1055:27)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:220:24)
    at Module.require (node:internal/modules/cjs/loader:1311:12)
    at require (node:internal/modules/helpers:136:16)
    at Object.<anonymous> (./node_modules/@tailwindcss/oxide/index.js:190:31)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at node:internal/modules/cjs/loader:1706:10
```

github actions 에서 빌드를 하려니 또 이런 에러가 발생한다. `^4.0.6` 버전일 때는 에러가 없었는데, `^4.0.9` 로 올리면서 에러가 발생한듯 하다. 일단 optionalDependencies 에 추가해주었다.

```json
"optionalDependencies": {
	"@tailwindcss/oxide-linux-x64-gnu": "^4.0.9"
}
```

버전은 tailwindcss 버전과 맞추면 될듯 하다.











