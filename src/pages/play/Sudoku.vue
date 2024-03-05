
<template>
  <div class="sudoku-table">
    <div
      v-for="(num, index) of sudokuTable" 
      :key="index" 
      class="cell-frame">
      {{ num }}
    </div>
  </div>
  <button @click="onClickHint">힌트</button>
  <div class="hint-list">
    <div 
      v-for="(hint, index) of hintList"
      :key="index">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { generate, hint2 } from './sudoku2index';
import { ref } from 'vue';

const sudokuTable = ref<any[]>([]);
const hintList = ref<any[]>([]);
sudokuTable.value = generate('easy');
console.log('sudoku',sudokuTable)


function onClickHint() {
  const hint = hint2(sudokuTable.value);
  hintList.value.push(hint);
}

</script>

<style lang="scss">
.sudoku-table {
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(9, 1fr);

  .cell-frame {
    border: 1px solid rgb(74, 74, 74);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
  }
}
</style>
  