<script setup lang="ts">
const { 
  childData = {message: 'default', value: 1000}, 
  primitive = 'child default' } 
  = defineProps<{
  childData: {
    message: string;
    value: number;
  },
  primitive: string;
}>();

</script>
<template>
  <Card>
    <CardHeader>Vue3Reactivity Props Child Destructure</CardHeader>
    <CardContent>
      <dl>
        <dt>childData.message</dt>
        <dd>{{ childData.message }}</dd>
        <dt>childData.value</dt>
        <dd>{{ childData.value }}</dd>
        <dt>primitive</dt>
        <dd>{{ primitive }}</dd>
      </dl>
    </CardContent>
    <CardFooter>
      <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="childData.value++">
        childData.value++
      </button>
    </CardFooter>
  </Card>
</template>
<style scoped>
h1 {
  color: #42b983;
}
</style>