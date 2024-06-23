<template>
  <div v-if="props.filename || props.language" class="bg-stone-300 font-mono text-sm border
           border-slate-300 py-1 px-2 rounded-t-md text-black">
    {{ props.filename ? props.filename : props.language }}
  </div>
  <pre 
    :class="props.class" class="bg-stone-800 p-2 text-sm"><slot /></pre>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
</script>

<style>
pre code .line {
  /* display: block; */
  
}
pre {
  overflow-x: auto;
}
</style>