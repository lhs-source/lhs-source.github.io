<script setup></script>

<template>
  <div class="index-wrapper">
    <header class="">
      <div class="image-area">
        <img src="../assets/2025560.svg" />
      </div>
      <div class="line-area"></div>
      <!-- <div class="circle"></div> -->
      <div class="title-frame">
        <div class="title"><span class="text-line">D</span>U<span class="text-line">M</span>MY.</div>
        <div class="description">DESCRIPTION</div>
        <div class="author">LEE HYUN SOO</div>
      </div>
    </header>
    <main>
      <div class="dummy-text">
        All men are prepared to accomplish the incredible if their ideals are threatened. I have always believed,
        and I still believe, that whatever good or bad fortune may come our way we can always give it meaning and
        transform it into something of value. If a man has nothing to eat, fasting is the most intelligent thing he
        can do. It is not our purpose to become each other; it is to recognize each other, to learn to see the other
        and honor him for what he is.
      </div>
    </main>
  </div>
</template>

<style>
/* .circle {
    position: absolute;
    top: -250px;
    left: 0;
    width: 100%;
    height: 500px;
    border-radius: 45%;
    background-color: rgb(69, 51, 90);
} */
.index-wrapper {
  background: linear-gradient(130deg, #303b45 0%, #303b45 50%, #303b45 100%);
}

header {
  position: relative;
  overflow: hidden;
}

header .image-area {
  width: 100%;
  height: 100vh;
}

header .image-area img {
  /* filter: blur(4px); */
  position: absolute;
  right: -600px;
}

.line-area {
  position: absolute;
  top: -50vh;
  right: 900px;
  height: 200vh;
  width: 20rem;
  background-color: #303b45;
  mix-blend-mode: difference;
  transform: rotate(45deg);
}

/* .line-area:nth-child(2) {
    right: -20rem;
} */
.title-frame {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 45vh;
  right: 72px;
  text-align: right;
}

.title {
  font-weight: 900;
  font-size: 10rem;
  line-height: 12rem;
  color: #516170;
}

.description {
  font-weight: 700;
  font-size: 7rem;
  line-height: 7rem;
  color: #384551;
  mix-blend-mode: difference;
}

.author {
  border: 2px solid #516170;
  padding: 2px 16px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2rem;
  color: #516170;
  mix-blend-mode: difference;
}

.text-line {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #384551;
}

.dummy-text {
  padding: 2rem;
  word-break: break-all;
  font-size: 2rem;
  color: #000000;
}
</style>