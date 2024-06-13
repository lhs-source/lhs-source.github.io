<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TestChildComponent from './TestChildComponent.vue';

const string = ref('string');

function onEmit1(value: any) {
  console.log('[parent] onEmit1 값 변경 이전', string.value);
  string.value = value;
}
function onEmit2(value: any) {
  console.log('[parent] onEmit2 값 변경 이전', string.value);
  string.value = value;
}

watch(string, (newValue, oldValue) => {
  console.log('[parent] [WATCH] 문자열 변경 체크는 자식에서 onClick 끝나고 한번만 하기', newValue, oldValue);
});
const computedString = computed(() => {
  console.log('[parent] [COMPUTED] computedString', string.value);
  return string.value;
});

</script>

<template>
  {{ string }} - {{ computedString }}
  <TestChildComponent v-model="string" @emit1="onEmit1" @emit2="onEmit2" />
</template>

<style scoped lang="scss">
</style>