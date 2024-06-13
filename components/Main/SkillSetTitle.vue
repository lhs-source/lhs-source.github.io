
<script setup lang="ts">
import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { onMounted, ref } from "vue";

gsap.registerPlugin(Flip);

const curLayout = ref<number>(0); // 클래스 이름을 바꿔주기 위한 변수
const container = ref<HTMLElement | null>(null);  // 컨테이너를 참조하기 위한 변수
const layouts = ["final", "plain", "columns", "grid"];  // 단계별 클래스 이름

function animSkillSet() {
  const state = Flip.getState(".letter, .for, .gsap", {props: "color,backgroundColor", simple: true}); // capture current state
  
  container.value?.classList.remove(layouts[curLayout.value]); // remove old class
  curLayout.value = (curLayout.value + 1) % layouts.length;   // increment (loop back to the start if at the end)
  container.value?.classList.add(layouts[curLayout.value]);    // add the new class

  Flip.from(state, { // animate from the previous state
    absolute: true,
    stagger: 0.07,
    duration: 0.7,
    ease: "power2.inOut",
    spin: curLayout.value === 0, // only spin when going to the "final" layout
    simple: true,
    // onEnter: (elements: any, animation: any) => {gsap.fromTo(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
    onLeave: elements => gsap.to(elements, {opacity: 0})
  });

  gsap.delayedCall(curLayout.value === 0 ? 3.5 : 1.5, animSkillSet);
}

onMounted(() => {
  gsap.delayedCall(1, animSkillSet);
})

</script>

<template>
  <section class="skill-set">
    <div class="container final" ref="container">
      <div class="letter l1">S</div>
      <div class="letter l2">K</div>
      <div class="letter l3">I</div>
      <div class="letter l4">L</div>
      <div class="letter l5">L</div>
      <div class="letter l6">S</div>
      <div class="for">of</div>
      <div class="gsap">LHS</div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";

section {
  width: 100%;
  height: 110vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.container {
  position: relative;
  display: flex;
  height: 100%;
  width: 110vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  mix-blend-mode: difference;

}
.container.grid, .container.columns {
  align-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;
}

.letter {
  text-align: center;
  color: black;
  font-size: 10vmax;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
}
.container.grid .letter {
  flex-basis: 50%;
}
.container.columns .letter {
  flex-basis: calc((100% / 7) - 6px);
}
.for, .gsap {
  font-size: 5vmax;
  color: var(--color-surface-white);
}
.for {
  padding: 2px 1.6vmax;
  font-weight: 300;
  display: none;
  color: white;
}
.gsap {
  padding: 2px 0;
  font-weight: 600;
  display: none;
  color: white;
}
.container.final .for, .container.final .gsap {
  display: block;
}
// https://colorhunt.co/palette/faf1e4cedebd9eb384435334
// https://colorhunt.co/palette/040d12183d3d5c837493b1a6
// https://colorhunt.co/palette/12486b41919778d6c6f5fccd
.letter:nth-child(1) {
  background: #435334;
}
.letter:nth-child(2) {
  background: #FAF1E4;
}
.letter:nth-child(3) {
   background: #9EB384;
}
.letter:nth-child(4) {
  background: #5C8374;
}
.letter:nth-child(5) {
  background: #CEDEBD;
}
.letter:nth-child(6) {
  background: #F5FCCD;
}
.container.plain .letter {
  background: transparent;
  color: white;
  padding: 0;
}

</style>