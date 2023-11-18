
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, withDefaults } from "vue";
import { gsap } from 'gsap';
import {Flip} from 'gsap/dist/Flip';

gsap.registerPlugin(Flip);

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

const curLayout = ref<number>(0);
const container = ref<HTMLElement | null>(null);
const layouts = ["final", "plain", "columns", "grid"];

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
    onEnter: (elements: any, animation: any) => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
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
    <div class="container final">
      <div class="letter F">F</div>
      <div class="letter l">L</div>
      <div class="letter i">I</div>
      <div class="letter p">P</div>
      <div class="for">for</div>
      <div class="gsap">GSAP</div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "./main.scss";

section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  flex-basis: 25%;
}
.for, .gsap {
  font-size: 5vmax;
  color: var(--color-surface-white);
}
.for {
  padding: 2px 1.6vmax;
  font-weight: 300;
  display: none;
}
.gsap {
  padding: 2px 0;
  font-weight: 600;
  display: none;
}
.container.final .for, .container.final .gsap {
  display: block;
}
.F {
  background: green;
}
.l {
  background: blue;
}
.i {
   background: red;
}
.p {
  background: lightcoral;
}
.container.plain .letter {
  background: transparent;
  color: white;
  padding: 0;
}

</style>