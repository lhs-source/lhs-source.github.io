<script setup lang="ts">
import { ref } from 'vue';
import PropsComponent from './PropsComponent.vue';
import PropsSpreadComponent from './PropsSpreadComponent.vue';
import SlotsComponent from './SlotsComponent.vue';
import StoreComponent from './StoreComponent.vue';
import StoreSpreadComponent from './StoreSpreadComponent.vue';

const parentData = ref({
  message: 'Hello Vue 3 Reactivity',
  value: 1,
});
const parentPrimitive = ref('parent');


</script>
<template>
  <div>
    <h1>Vue3Reactivity Parent</h1>
    <dl>
      <dt>parentData.message</dt>
      <dd>{{ parentData.message }}</dd>
      <dt>parentData.value</dt>
      <dd>{{ parentData.value }}</dd>
    </dl>
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="parentData.value++">
      parentData.value++
    </button>
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="parentPrimitive = 'parent2'">
      primitive = 'parent2'
    </button>
    <div class="grid grid-cols-2 gap-4">
      <PropsComponent :childData="parentData" />
      <PropsSpreadComponent :childData="parentData" :primitive="parentPrimitive" />
    </div>
    <SlotsComponent>
      <template #default>
        <h1>name: default</h1>
      </template>
    </SlotsComponent>
    
    <div class="grid grid-cols-2 gap-4">
      <StoreComponent />
      <StoreSpreadComponent />
    </div>
  </div>
</template>
<style scoped>
h1 {
  color: #42b983;
}
</style>