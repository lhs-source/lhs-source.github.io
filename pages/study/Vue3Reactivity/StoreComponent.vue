<script setup lang="ts">
import { useTestStore } from '~/stores/testStore';

const testStore = useTestStore();

testStore.fetchSomeData();

</script>
<template>
  <Card>
    <CardHeader>Vue3Reactivity Store Child</CardHeader>
    <CardContent>
      <template class="block" v-for="(post, index) of testStore.postList">
        <h1>post: {{ post }}</h1>
      </template>
    </CardContent>
  </Card>
</template>
<style scoped>
h1 {
  color: #42b983;
}
</style>