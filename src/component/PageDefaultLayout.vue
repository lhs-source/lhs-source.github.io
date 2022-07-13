<template>
<div class="page-wrapper">
  <div class="background">
    <div class="panel">
    <div class="words">
      <div class="sentense typo-3"> The bird fights its way out of the egg. The egg is the world. </div>
      <div class="sentense typo-2"> Who would be born must first destroy a world. The bird flies to God. </div>
      <div class="sentense typo-4"> That God's name is Abraxas.</div>
      <div class="sentense typo-3"> 우리들 속에는 모든 것을 알고, 모든 것을 하고자 하고, 모든 것을 우리들 자신보다 더 잘해내는 어떤 사람이 있다.</div>
      <div class="sentense typo-4"> 블로그 까짓거 대충, 하고는 싶은데 해보는 김에 잘 해봐야지. 속도는 빨라야 하니까 간단한 게 좋겠다. </div>
      <div class="sentense typo-5"> You've never lived what you are thinking, and that isn't good. </div>
    </div></div>
  </div>
  <div class="frame">
    <div class="body">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
$section-margin-top: 112px;

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;

  .panel {
    width: 100%;
    height: 28vh;
    background-color: $color-primary;


    .words {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      mix-blend-mode: screen;
      font-size: 4rem;
      line-height: 0.85;
      font-weight: 600;
      text-align: left;
      color: #1d1d1d;

      .sentense {
        position: relative;
        width: 100%;
        text-align: justify;
        // text-align-last: justify;
        word-break: keep-all;
        text-transform: uppercase;
      }
    }
  }
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: center;

  .body {
    width: 92vw;
    margin-top: 20vh;
    margin-bottom: calc($section-margin-top * 1);
    min-height: 50vh;
    box-shadow: 1px 2px 6px #1d1d1d55;
    background: linear-gradient(
      rgba(255, 255, 255, 0.92) 64px,
      $color-primary-white calc($section-margin-top * 4)
    );
    transition: margin .2s;
  }
}

@media (min-width: 1280px) and (max-width: 4000px) {
  .background {
    .panel {
    }
  }

  .frame {
    .body {
    }
  }
}
</style>

