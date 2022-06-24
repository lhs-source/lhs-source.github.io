# lhs-githubio

## Project setup
```
yarn install
```

### prerender-spa-plugin 이슈 해결

```javascript
// node_modules/prerender-spa-plugin/es6/index.js

// 58 line
// mkdirp 함수를 대체한다.
const mkdirp = function (dir, opts) {
  return new Promise((resolve, reject) => {
    console.log('\ndir', dir, opts, '\n');
    try {
      compilerFS.mkdirp(dir, opts, (err, made) => err === null ? resolve(made) : reject(err))
    } catch(e) {
      compilerFS.mkdir(dir, opts, (err, made) => err === null ? resolve(made) : reject(err))
    }
  })
}

// 124 line
// recursive 옵션을 추가해준다.
return mkdirp(path.dirname(processedRoute.outputPath), {recursive: true})
```

위 fix 는 webpack5 에서 다음 두 문제가 발생하기 때문이다.
1. webpack5 에서 `compiler.outputFileSystem.mkdirp` 함수가 없다.
2. `mkdir` 함수로 바꾼다 하더라도, route 가 여러개인 경우, 폴더를 여러번 만드려고 시도하는데, 이미 존재하는 폴더라 에러가 발생한다.

> [prerender-spa-plugin] Unable to prerender all routes!

그래서 아무 정보 없이 위 에러가 발생하는데, 이를 해결하기 위함이다.

### For Windows (deprecated)

**node-sass 를 사용하지 않으면서 이 부분은 필요 없게 됐다.**

**Windows** 유저의 경우에는 python2 버전 설치가 추가로 필요하다. (node-sass 때문)
[Python 2.7.18](https://www.python.org/downloads/release/python-2718/)

```
npm config set python "C:\Python27\python.exe"
```
python27 을 설치한 후 해당 경로를 npm 에 등록해준다.


```
npm install --global windows-build-tools
```
`.node_modules` 폴더를 지운 후 위 명령어로 인스톨한다면 모든 필요한 설정을 자동으로 해준다. powershell 및 cmd 가 관리자 권한으로 실행되어야 진행된다. (자동으로 python 2.7.15 가 설치됨)
-> 잘 안돼서 처음 방법으로 진행

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
