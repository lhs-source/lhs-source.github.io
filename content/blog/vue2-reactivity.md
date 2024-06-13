---
title: Vue2, Vue3 Reactivity 비교 - Vue2 편
description: Vue2 Vue3 의 Reactivity 비교. Vue2 Reactive에 대한 설명. VNODE, Watcher, Dependency, ref, reactive, update, vue hook 에 대해서 전반적인 설명.
tags: Vue, Vue2, Vue Reactivity, 반응성, Vue Rendering
created: 2022-07-12
updated: 2022-07-12
---

[[toc]]

# 반응성?

Vue 프레임워크로 컴포넌트를 작업하다보면, 데이터를 바꿨을 뿐인데 화면에 바뀐 데이터를 바로바로 반영하는 것이 그저 익숙할 것이다. 그런데 Vue를 비롯한 프론트엔드 프레임워크를 사용하지 않을 때, 데이터만 바꿨다고 화면에 바로 뿌려줬는가? 아니다. 개발자가 직접 DOM을 수정해서 보여주어야 했다. 아니면 서버에서 바뀐 데이터로 렌더링한 결과물을 새로 받아야 했다. 

Vue에서는 컴포넌트의 데이터 정보만 바꾸면 화면에 알아서 적용된다. 이를 반응성이라 한다. 컴포넌트의 데이터를 관찰하고 있다가 변경이 감지되면 Virtual DOM을 다시 컴파일한 후 만들어진 트리를 실제 DOM에 적용시킨다. 

개발자는 이러한 내부적 로직은 알 필요 없이 데이터에 집중하는 개발을 하도록 Vue 는 유도하고 있다. 하지만 개발자는 내가 사용하는 도구; 여기서는 프레임워크가 어떻게 작동하는 녀석인지 알아야 입맛대로 작업할 수 있고, 문제 해결을 할 수 있다. 처음엔 쉬워도 언젠가 구조적 문제에 직면하는 게 개발자 삶이다.

# Vue2에서는 반응성을 어떻게 구현했나.

![Untitled](./Untitled.png)

Vue의 모든 컴포넌트는 Watcher 를 갖고 있다. 또 data option에 등록한 데이터는 자동으로 `getter` 와 `setter` 를 주입받는다. 데이터의 `setter` 가 실행되는 순간, 컴포넌트의 Watcher 가 이를 감지하고, 렌더 함수를 발동시킨다. 그로 인해 Virtual DOM을 다시 구성하게 되고, 이것이 화면에 나타나는 것이다. data 뿐 아니라 computed 도 마찬가지다. data 의 변경 감지 → computed 로직 실행 → computed 변경 감지 → 렌더링의 순서로 이루어진다.

## Getter/Setter 주입

Vue의 코드를 조금 살펴보면서 반응형을 어떻게 구현했는지 간단하게 알아보자.

Vue의 데이터에 주입하는 getter/setter은 `defineReactive` 라는 함수에서 주입한다.

```jsx
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
          if (process.env.NODE_ENV !== 'production') {
              dep.depend({
                  target: obj,
                  type: "get" /* TrackOpTypes.GET */,
                  key: key
              });
          }
          else {
              dep.depend();
          }
          if (childOb) {
              childOb.dep.depend();
              if (isArray(value)) {
                  dependArray(value);
              }
          }
      }
      return isRef(value) && !shallow ? value.value : value;
  },
  set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
          return;
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
          customSetter();
      }
      if (setter) {
          setter.call(obj, newVal);
      }
      else if (getter) {
          // #7981: for accessor properties without setter
          return;
      }
      else if (isRef(value) && !isRef(newVal)) {
          value.value = newVal;
          return;
      }
      else {
          val = newVal;
      }
      childOb = !shallow && observe(newVal, false, mock);
      if (process.env.NODE_ENV !== 'production') {
          dep.notify({
              type: "set" /* TriggerOpTypes.SET */,
              target: obj,
              key: key,
              newValue: newVal,
              oldValue: value
          });
      }
      else {
          dep.notify();
      }
  }
});
```

해당 함수는 객체의 속성마다 실행되는데, 그 속성에 대한 `enumerable` , `configurable` 과 `get` , `set` 을 `Object.defineProperty` 로 추가한다. 반응형인 대상에 변경이 일어나면 아래 과정을 거친다.

1. `set` 함수가 실행된다. (observe 혹은 proxy 를 통해서)
2. 새로운 데이터로 변경이 되었을 때만 진행한다.
3. 새로운 데이터로 값을 바꾼다.
4. `observe` 함수로 새로운 데이터에 대한 observe를 할당한다.
5. `dep.notify` 가 발생하고, 렌더링을 트리깅 한다.
6. Watcher 가 queue 에 추가하고, `flushSchedulerQueue` 를 통해 queue 를 플러시한다.
7. queue 에 있는 모든 watcher의 `run` 함수를 호출하고 vue 인스턴스들의 `updated` 훅을 호출한다.

![Untitled](img/Vue2-Reactivity/Untitled1.png)

위 함수가 실행되는 부분은 다음과 같다.

- 컴포넌트의 props 를 초기화할 때, props 데이터도 반응형이다. (initProps$1)
- 컴포넌트의 inject 를 초기화할 때 (initInjection)
- 컴포넌트의 data 를 초기화할 때(initData)
- watch 를 등록할 때,
- set 등으로 인한 Observer 할당시(__ob__) (observe)
- vuex state 초기화 + mutate (initData, set)
- …

## Watcher

```jsx
var Watcher = /** @class */ (function () {
    Watcher.prototype.addDep = function (dep) {};
    Watcher.prototype.update = function () {
        if (this.lazy) {
            this.dirty = true;
        }
        else if (this.sync) {
            this.run();
        }
        else {
            queueWatcher(this);
        }
    };
// ...
  return Watcher;
}());
```

우선 코드는 많은 부분을 생략했다. Watcher 의 경우 `set` 발생 시 notify 를 전달할 Dependency 들을 관리한다. `notify` 발생 시  `queueWatcher` 를 통해 큐에 자기 자신을 담아서 실행을 기다린다. Watcher가 `sync` 속성을 가졌다면 큐에 넣어서 비동기로 작동하지 않고, 동기적으로 바로 `run` 을 실행한다.

```jsx
function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    queue.sort(function (a, b) { return a.id - b.id; });
    for (index$1 = 0; index$1 < queue.length; index$1++) {
        watcher = queue[index$1];
        if (watcher.before) {
            watcher.before();
        }
        id = watcher.id;
        has[id] = null;
        watcher.run();
        if (process.env.NODE_ENV !== 'production' && has[id] != null) {
            circular[id] = (circular[id] || 0) + 1;
            if (circular[id] > MAX_UPDATE_COUNT) {
                warn$2('You may have an infinite update loop ' +
                    (watcher.user
                        ? "in watcher with expression \"".concat(watcher.expression, "\"")
                        : "in a component render function."), watcher.vm);
                break;
            }
        }
    }
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();
    resetSchedulerState();
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
}
```

여기서 큐의 Watcher 들을 실행하기 전에 정렬을 하는데, 이유는 3가지가 있다.

1. 컴포넌트들이 부모부터 자식 순서로 업데이트되도록 한다. (부모가 자식보다 전에 만들어지기 때문에)
2. 컴포넌트의 Watcher들은 render watcher 의 Watcher보다 먼저 업데이트한다.
3. 부모 컴포넌트의 watcher 가 실행될 때 자식 컴포넌트가 파괴되었다면 그 watcher 들은 스킵될 수 있다.

queue 에 있는 watcher를 순회하며 `before` 과 `run` 을 차례대로 호출한다. 여기서 before 은 `beforeUpdated` 훅을 발생시킨다.

모두 완료되면 `activateChildComponent` 을 통해 `_inactive` 를 켜고 **activated** 훅을 발생시킨다. 대상 컴포넌트는 `keepAlive` 속성을 가진 컴포넌트들이다.

그 다음으로는 `callUpdatedHooks` 를 통해 컴포넌트의 `updated` 훅을 발생시킨다.

```jsx
Watcher.prototype.run = function () {
	if (this.active) {
    var value = this.get();
    if (value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        var info = "callback for watcher \"".concat(this.expression, "\"");
        invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
      }
      else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
	}
};
```

결국은 Watcher 의 `run` 함수를 위해서 위 과정들을 열심히 진행한 것이다. 그렇다면 `run` 함수는 내부적으로 어떤 것을 처리할까? 

디버깅을 걸어보면 알겠지만, 화면의 렌더링은 `this.get` 에서 끝난다. 그리고 그 뒤로는 콜백을 실행하는 것 뿐이다. 그럼 `get` 함수를 살펴봐야 한다.

```jsx
Watcher.prototype.get = function () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  }
  catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"".concat(this.expression, "\""));
    }
    else {
      throw e;
    }
  }
  finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};
```

단순히 `this.getter` 를 호출한다. 이 `getter` 함수는 Watcher 초기화 시 외부로부터 받는다. 

```jsx
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook$1(vm, 'beforeMount');
  var updateComponent;
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:".concat(id);
      var endTag = "vue-perf-end:".concat(id);
      mark(startTag);
      **var vnode = vm._render();**
      mark(endTag);
      measure("vue ".concat(name, " render"), startTag, endTag);
      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue ".concat(name, " patch"), startTag, endTag);
    };
  }
  else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, 'beforeUpdate');
      }
    }
  };
  if (process.env.NODE_ENV !== 'production') {
    watcherOptions.onTrack = function (e) { return callHook$1(vm, 'renderTracked', [e]); };
    watcherOptions.onTrigger = function (e) { return callHook$1(vm, 'renderTriggered', [e]); };
  }
  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
  hydrating = false;
  // flush buffer for flush: "pre" watchers queued in setup()
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, 'mounted');
  }
  return vm;
}
```

`mountComponent` 함수 실행 시 작동은 다음과 같다.

1. beforeMount 훅 실행
2. watcher 옵션으로 beforeUpdate 훅을 등록한다.
3. `vm._render` 를 실행하는 `vm._update` 함수를 Watcher 옵션으로 넘긴다.
4. mounted 훅 실행

일부 경우에 따라 `getter` 함수가 달라질 순 있지만, 대부분의 경우 결론적으로는 `vm._render` 를 Watcher 의 `getter` 로 실행한다.

```jsx
vnode = render.call(vm._renderProxy, vm.$createElement);
```

최종적으로는 컴포넌트에 동적으로 생성된 render 함수를 실행하게 된다. 이 render 함수는 컴포넌트의 템플릿을 가지고 생성된다. 혹은 render 함수를 직접 구현하거나. 

render 함수로 생성된 `vnode` 를 가지고 `vm._update` 함수를 실행한다.

```tsx
Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; 

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
```

`vm.__patch__` 를 호출하면서, 실제 DOM;여기서는 `vm.$el` 에 업데이트한다.

# Vue2의 반응성 문제 및 특징

Vue2의 반응성 구현에는 문제가 있다. 이는 자바스크립트의 한계 때문에 발생한 것이다. Vue의 데이터들은 추가, 감소가 발생했을 때는 변화를 감지하지 못한다. `getter` 와 `setter` 를 주입받지 못하기 때문이다.

## data option 에 데이터 추가하기

```jsx
data: {
	some: 1
}

this.other = 2;
```

컴포넌트의 data option 에 기존에 선언한 `some` 은 반응형이지만, `other` 는 반응형이 아니다. other 를 아무리 바꿔도 화면에는 아무런 영향을 주지 못한다.

```jsx
this.$set(this, 'other', 2);
```

하지만 Vue 인스턴스의 `$set` 함수를 이용해 반응형을 이끌어낼 수 있다.

## object 에 assign 으로 새로운 프로퍼티 추가하기

`Object.assign` 혹은 `_.extend()` 를 통한 객체 복사 역시 감지하지 못한다. 속성을 가져올 때는 `[[Get]]` 을 사용하고 속성을 지정할 때 `[[Set]]` 을 사용하기 때문에 `getter/setter` 를 트리깅하지 못한다.

```jsx
Object.assign(this.someObject, { a: 1, b: 2 }) // 이렇게 하면 반응성을 이끌어내지 못함.
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

그래서 새로운 객체에 대상을 2개로 엮어서 병합한 후에 새로운 객체로 반환해야 한다.

## 배열 문제

배열을 다루면서 아래 행동은 변화를 감지할 수 없다.

1. 배열의 인덱스에 값을 넣으려는 것
2. 배열의 크기를 바꾸는 것

```jsx
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x'
vm.items.length = 2
```

아래 두 코드는 반응성을 이끌어내지 못했다. 그렇다면 배열은 어떻게 다뤄야 반응형일까? 배열의 특정 함수들을 이용해야 한다.

- push 배열에 뒤에 값을 추가
- shift 배열 맨 처음 값을 빼냄
- unshift 배열 앞에 값을 추가
- splice 일부를 교체함

```jsx
this.$set(this.items, 1, changedValue);
```

혹은 `$set` 함수를 이용해 특정 인덱스의 값을 변경한다.

### Object 배열

```jsx
animals: [
	{id: 1, comments: 'cat',},
	{id: 2, comments: 'bird',},
	{id: 3, comments: 'dog',},
]

created() {
	this.animals[3] = {id: 4, comments: 'cow'};
}
```

우리는 개발을 하면서 흔하게 Object 를 여러개 담아놓은 배열을 다루게 된다. 이를 리스트 렌더링을 통해 화면에 심심치 않게 보여준다. 그런데 아까 얘기하기로는 Vue2의 배열은 인덱스에 해당하는 값을 바꾸려고 하면 반응성이 안나타난다고 했다. 

```jsx
this.animals[1].comments = "whale";
```

배열 1번의 객체의 데이터를 바꾸려고 하니, 세상에나 반응한다! 배열 내부의 객체는 반응형이다. 

![Untitled](img/Vue2-Reactivity/Untitled2.png)

이는 콘솔에 데이터를 찍어보면 간단하게 알 수 있다. 배열의 경우 getter, setter 함수는 없지만 Observer 를 갖고 있다. 

![Untitled](img/Vue2-Reactivity/Untitled3.png)

다만 내부에 있는 객체 3개는 각각 속성에 대해서 getter, setter 를 갖고 있다. 그렇기 때문에 배열 내부의 객체에 대해서는 반응형이다.

![Untitled](img/Vue2-Reactivity/Untitled4.png)

단 `created` 에서 인덱스로 할당한 객체의 경우 Observer 할당이 안되어 있다. 또 getter, setter 역시 주입되지 않았기 때문에, `this.animals[3].comments = "some";` 코드는 반응형이 아니다.

```jsx
const newObject = { 
  "id": 1, 
  "comments": "새로운 오브젝트를 넣음!", 
};
this.animals[1] = newObject; // 반응형 x
this.$set(this.animals, 1, newObject); // 반응형 o
this.animals[1].comments = "내가 바꾸었다!!!"; // 반응형 o
this.$set(this.animals[1], 'comments', "내가 바꾸었다!!!"); // 반응형 o
```

물론 위 코드를 하나의 함수에서 실행하면 모든 변경대상이 반응형이다. 왜냐하면 반응을 감지하고 re-rendering 할 때는, 바뀐 데이터를 모두 적용하기 때문이다. 데이터는 변경이 되어 있지만, 화면에 적용만 안 되어 있던 것이다. 렌더링 시점에 모든 변경사항이 적용된다.

### 다중 배열

```jsx
twoDimensionalArray: [
  [
    {id: 1, cat: 'first'},
    {id: 2, cat: 'first'},
  ],
  [
    {id: 1, cat: 'second'},
    {id: 2, cat: 'second'},
  ],
  [],
]

created() {
	this.twoDimensionalArray[2] = [
    {id: 1, cat: 'third'},
    {id: 2, cat: 'third'},
  ]
  this.twoDimensionalArray[3] = [
    {id: 1, cat: 'forth'},
    {id: 2, cat: 'forth'},
  ]
}
```

만약 다중 배열의 경우 어떻게 될까? 배열 요소가 배열이고, 그 안에는 객체들이 있는 구조이다.

```jsx
const newObject = { 
  "id": 1, 
  "comments": "새로운 오브젝트를 넣음!", 
};
this.twoDimensionalArray[1][1] = newObject // 반응형 x
this.$set(this.twoDimensionalArray[1], 1, newObject); // 반응형 o
this.twoDimensionalArray[0][0].cat = "내가 바꾸었다!!!"; // 반응형 o
this.twoDimensionalArray[2][0].cat = "새로 넣은 오브젝트인데 바뀔까?"; // 반응형 x
this.$set(this.twoDimensionalArray[3][1], 'comments', "내가 바꾸었다!!!"); // 반응형 x
```

기본적으로 배열의 인덱스에 직접 할당하는 것은 무조건 반응형이 아니다.

2번 인덱스의 객체는, 처음에는 빈 배열이다가 인덱스에 직접 할당되었다. 그래서 반응형 설정이 되지 않았고, 다중배열 안의 객체 속성을 바꾸려고 했을 때 반응이 없다. 처음부터 할당이 되어 있거나, `push` 등으로 추가된 항목이 아니기 때문이다. 반대 상황으로 0번 인덱스와 1번 인덱스는 반응형으로 내부 속성을 변경하려고 할 때 반응형이다.

3번 인덱스는 처음부터 객체에 없다가, 인덱스로 할당된 객체이다. 2번과 사실상 같은 유형이다. 이 경우 `$set` 함수로도 반응이 없다.

3번 항목이야 `push` 를 통해 항목을 추가하면 된다곤 하지만, 2번 항목을 반응형으로 할당하려면 어떻게 해야할까?

```jsx
this.twoDimensionalArray[2].push(...[
  {id: 1, cat: 'third'},
  {id: 2, cat: 'third'},
])
this.twoDimensionalArray.splice(2, 1, [
  {id: 1, cat: 'third'},
  {id: 2, cat: 'third'},
]);
```

- spread 문으로 내용물을 펼쳐서 push 를 하는 방법
- `splice` 함수로 대상 교체하기

배열은 간단하게 생각하면 꼭 함수를 거쳐야 한다고 보면 된다. 그럼 쉽게 반응형을 끌어낼 수 있다.

## 비동기 업데이트 큐

이 부분은 딱히 문제는 아니지만 알아두면 좋은 Vue 의 특성이다. Vue 의 UI 업데이트를 위해 컴파일되는 Virtual DOM은 비동기로 생성되고 화면에 렌더링된다. 즉, queue 에 담긴 여러 변경사항들을 flush 하기 전까지는 바로 화면에 적용되지 않고, 한 번에 렌더링한다. 그 시점은 다음 **tick** 이 된다. 또, queue 에 담긴 Watcher 중 중복인 항목은 제거하고 최신으로 유지한다. 

```tsx
template: `<span>{{msg}}</span>`,
ata: {
	msg: "before update",
}
methods: {
	update: () => {
		this.msg = "updated";
    console.log(this.$el.textContent) // => 'not updated'
    this.$nextTick(function () {
      console.log(this.$el.textContent) // => 'updated'
    })
	}
}
```

간단하게 update 함수를 통해 변경된 `msg` 는 실제 DOM에 적용되기 전이라서 함수 실행 중에는 이전 데이터로 여전히 남아 있다. 그러다 함수 호출이 끝나고, 다음 이벤트 루프가 발생할 때가 되어서야 갱신된 데이터가 화면에 보인다. 이를 추적할 수 있는 게 `this.$nextTick` 이다. 이는 함수의 호출을 다음 **tick** 으로 미루는 작업이다. tick 에 대해서는 추후에 이벤트 루프에 대해서 작성할 때 자세하게 다룰 것이다.

## created 와 mounted

앞서 Vue 컴포넌트는 mount 시점에 렌더링을 한 번 실행한다는 것을 알았다. beforeMounted → 렌더링 → mounted 순서로 훅이 실행된다. 그렇기 때문에 발생하는 현상이 있다. created 훅과 mounted 훅에서 data 에 반응형이 아닌 데이터를 추가를 하면 UI에 표시가 될까 안될까?

```tsx
template: `
	<div v-for="item of notReactive" :key="item.id">
    {{item}}
  </div>
`,
created() {
  this.notReactive[1] = {id: 2, cat: 'reactive from created'};
},
mounted() {
  this.notReactive[2] = {id: 3, cat: 'not reactive from mounted'};
},
data: () => {
  return {
    notReactive: [
      {id: 1, cat: 'reactive'},
    ]
  }
}
```

말로는 헷갈릴 수 있으니 예시를 보자. 0번 인덱스는 데이터 초기화 시점에 이미 할당되어 있기 때문에 당연하게도 반응형이다. 그렇다면, 1번 인덱스와 2번 인덱스는 반응형일까? 우리가 테스트했을 때는 배열의 인덱스에 할당한 대상은 반응형이 아니다. 그렇기 때문에, UI에는 0번 인덱스 항목만 보일 거라고 예상한다. 결과는 0번 1번 인덱스 항목은 출력되고, 2번 인덱스 항목은 출력되지 않는다. 즉, created 에서 넣은 객체는 렌더가 되었고, mounted 에서 넣은 객체는 무시됐다. 렌더링과 훅의 순서 때문이다. created 시점에서는 렌더링 전이기 때문에, 렌더링 시점에 데이터는 인지되고 적용된다. 하지만 mounted 시점에는 이미 렌더링이 끝난 시점이라, 이때 추가된 데이터는 값만 바뀐 채 렌더링은 무시된다. 여담으로 mounted 에서 넣은 데이터는 `this.$forceUpdate` 를 호출하면 화면에 보인다. `watcher.update` 를 강제로 호출하기 때문이다.

```tsx
methods: {
  onClick() {
		// 아래를 개별로 실행
		// 한번에 실행하면 1번 행이 반응형이기 때문에, 모두 렌더링 된다.
    this.notReactive[0].cat = 'reactive from onClick'; // 반응형
		this.$set(this.notReactive[1], 'cat', 'reactive from onClick') // 반응형 x
    this.notReactive[1].cat = 'reactive from onClick'; // 반응형 x
    this.notReactive[2].cat = 'reactive from onClick'; // 반응형 x
  }
},
```

mount 시점에 렌더링되어 화면에 나타났다고 해서 반응형인 건 아니다. mount 이후 데이터를 바꾸려고 하면 반응형이 아니기 때문에 반응이 없다.