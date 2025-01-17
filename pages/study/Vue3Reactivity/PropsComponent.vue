<script setup lang="ts">
const props = defineProps<{
  childData: {
    message: string;
    value: number;
  }
}>();

</script>
<template>
  <Card>
    <CardHeader>Vue3Reactivity Props Child</CardHeader>
    <CardContent>
      <dl>
        <dt>childData.message</dt>
        <dd>{{ childData.message }}</dd>
        <dt>childData.value</dt>
        <dd>{{ childData.value }}</dd>
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