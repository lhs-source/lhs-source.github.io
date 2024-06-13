<script setup lang="ts">
import { defineEmits, defineProps, watch, withDefaults } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });
const emits = defineEmits<{
  (e: 'emit1', value: any): void,
  (e: 'emit2', value: any): void,
  (e: 'update:modelValue', value: any): void,
}>();

function onClick() {
  console.log('before emit update:modelValue =>', props.modelValue);
  emits('update:modelValue', 'modelValue');
  console.log('after emit update:modelValue (변경된 문자열)=>', props.modelValue);
  emits('emit1', 'emit1');
  console.log('after emit1 (부모가 변경함)', props.modelValue);
  emits('emit2', 'emit2');
  console.log('after emit2 (부모가 변경함)', props.modelValue);
}

watch(props.modelValue, (newValue, oldValue) => {
  console.log('[WATCH] 문자열 변경 체크는 자식에서 onClick 끝나고 한번만 하기', newValue, oldValue);
});
</script>

<template>
  <button @click="onClick">{{ props.modelValue }}</button>
</template>

<style scoped lang="scss">
</style>