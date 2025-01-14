---
title: Vitest Fake Timer 로 setInterval 테스트 중 다음 루프가 실행 안되는 경우
description: setInterval 로 돌아가는 로직을 vitest 의 Fake Timer 를 사용해 테스트. fetch 함수가 포함된 interval 로직은 flushPromise 없이 다음 루프가 돌지 않음.
subject: Vue
volumne: short
tags: Vitest, Javscript, Jest, Async
created: 2025-01-14
updated: 2025-01-14
filename: vitest-timer-flushpromise
---

[vitest 공식 홈페이지 #fake-timers](https://vitest.dev/api/vi#fake-timers)

타이머를 가짜로 돌려서, 원하는 시간만큼 컨트롤할 수 있다. 시간을 기다리지 않고, 임의로 시간을 흐르게 해서 빠른 테스트를 가능하게 한다.

```ts
let i = 0
setInterval(() => console.log(++i), 50)

vi.advanceTimersByTime(150)

// log: 1
// log: 2
// log: 3
```

## 타이머 내부에 async fetch 코드가 있다면 flushPromise 필수

```ts
async function fetchFunction() {
  await fetchDetail();
	// ...
}

function startTimer() {
  refreshTimer = setInterval(fetchFunction, 5 * 1000);
}
```

이런식으로 fetch 함수가 타이머 함수 내부에 실행되는 경우, `flushPromise` 없이는 다음 타이머가 동작하지 않는다. vi.advanceTimersByTime()은 시간만 진행시킬 뿐, 비동기 작업의 완료를 보장하지 않는다. 즉, 비동기 작업은 flushPromise 호출 전까지 대기한다. 




