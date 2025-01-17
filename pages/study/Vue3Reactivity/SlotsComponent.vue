<script setup lang="ts">

const slots = useSlots();
console.log('slots', slots);
// const children = (slotLength > 0 && slots.default) ? slots.default() : [];

</script>
<template>
  <div>
    <h1>Vue3Reactivity Slots Child 1</h1>
    <template class="block" v-for="(slot, index) of slots">
      <h1>slot: {{ index }}</h1>
      <slot :name="slot" />
    </template>
  </div>
</template>
<style scoped>
h1 {
  color: #42b983;
}
</style>