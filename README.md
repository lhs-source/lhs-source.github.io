# lhs-githubio

## Project setup
```
yarn install
```

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
