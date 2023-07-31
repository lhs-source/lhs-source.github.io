<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, withDefaults, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), { });

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>();

const router = useRouter();
const route = useRoute();

function onEvent(event: any) {
}

function someFunc() {
}
</script>

<template>
  <div class="white">
    <div class="box">
      sadf
      <div class="box red">
        RED
      </div>
    </div>
    <div class="box blue">
      BLUE
    </div>
    <div class="box green">
      GREEN
    </div>
  </div>
</template>

<style scoped lang="scss">
.white {
  background-color: white;
  isolation: isolate;
}

.box {
  position: relative;
  width: 100px;
  height: 100px;
  mix-blend-mode: difference;
  &.red {
    background-color: white;
    top: 70px;
    left: 50px;
  }
  &.blue {
    background-color: black;
  }
  &.green {
    background-color: rgb(0, 0, 0);
    top: -70px;
    left: 30px;
  }
}
</style>