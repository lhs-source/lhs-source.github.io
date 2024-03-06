
<template>
  <div class="flex" style="display: flex;">
    <div class="sudoku-table">
      <div
        v-for="(num, index) of sudoku.board.cells" 
        :key="index" 
        class="cell-frame"
        :class="{
          'selected': selectedCell === index,
          'same-number': selectedCellValue != 0 && (selectedCellValue === (num.digit)),

          
          'left-border': index % 3 === 0,
          'top-border': Math.floor(index / 9) % 3 === 0,
          'right-border': index % 3 === 2,
          'bottom-border': Math.floor(index / 9) % 3 === 2,
        }"
        @click="onClickCell(index)">
        <span v-if="num.input" class="input-number">
          {{ num.digit }}
        </span>
        <span v-else-if="num.digit !== 0" class="initial-number">
          {{ num.digit }}
        </span>
        <!-- <span v-else-if="num.input !== null" class="input-number">
          {{ num.input }}
        </span> -->
        <div v-else class="candidate-list">
          <div class="candidate" 
            v-for="i in 9" 
            :key="i"
            :class="{
              'same-number': num.candidateList.indexOf(i) >= 0 && i === (selectedCellValue ?? 0)
            }">
            {{ num.candidateList.indexOf(i) >= 0 ? i : '' }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div class="mode-list">
        <div 
          :class="{'selected': selectedMode === 'number'}"
          @click="onClickMode('number')">
          정답
        </div>
        <div 
          :class="{'selected': selectedMode === 'candidate'}"
          @click="onClickMode('candidate')">
          후보자
        </div>
      </div>
      <button @click="onClickNextStep">next step</button>
      <button @click="onClickCandidate">candidate</button>
      <button @click="onClickHint">regen hint</button> -->
      <button @click="onClickGenerateCR">generate candidate random(fail)</button>
      <button @click="onClickFirstBoxMatrix">first box matrix</button>
      <button @click="onClickRemoveDigit">remove digit</button>
      <button @click="onClickMixVerticalRow">mix vertical row</button>
      <button @click="onClickMixHorizontalRow">mix horizontal row</button>
      <button @click="onClickRecursive">recursive</button>
      <div class="number-pad">
        <div 
          class="num" 
          v-for="i in 9" 
          :key="i"
          @click="onClickNumber(i)">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { LHSSudoku } from './LHSSudoku';

const sudoku = ref<LHSSudoku>(new LHSSudoku());
const selectedCell = ref<number | null>(null);
const selectedCellValue = computed(() => {
  if(selectedCell.value !== null) {
    return sudoku.value.board.cells[selectedCell.value].digit;
  }
  return null;
})

function onClickCell(index: number) {
  selectedCell.value = index;
}
function onClickNumber(number: number) {
  if(selectedCell.value)
    sudoku.value.setNumberIndex(selectedCell.value, number, true);
}
function onClickGenerateCR() {
  selectedCell.value = sudoku.value.generateOneCellCandidateRandom();
}
const matrixStep = ref(0);
function onClickFirstBoxMatrix() {
  for(let i = 0; i < 9; i++) {
    sudoku.value.generateMatrixMultiple(matrixStep.value++);
  }
  // sudoku.value.generateMatrixMultiple(matrixStep.value++);
}
function onClickRemoveDigit() {
  sudoku.value.removeDigitRandom(5);
}
function onClickMixVerticalRow() {
  sudoku.value.mixVerticalRow();
}
function onClickMixHorizontalRow() {
  sudoku.value.mixHorizontalColumn();
}
function onClickRecursive() {
  sudoku.value.generateOneRandomSafe(0);
}


onMounted(() => {
  // keyup 이벤트를 사용하기 위해 window에 이벤트를 등록
  // window.addEventListener('keyup', (event) => {
  //   if(selectedCell.value !== null) {
  //     onKeyupNumber(selectedCell.value, event);
  //   }
  // });
});
onUnmounted(() => {
  // window.removeEventListener('keyup', (event) => {
  //   if(selectedCell.value !== null) {
  //     onKeyupNumber(selectedCell.value, event);
  //   }
  // });
});

</script>

<style lang="scss">
$border-color : rgb(60, 121, 75);
$cell-size: 36px;

.sudoku-table {
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(9, 1fr);
  width: calc($cell-size * 9 * 1.5);
  height: calc($cell-size * 9 * 1.5);

  .cell-frame {
    position: relative;
    border: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: $cell-size;
    min-height: $cell-size;

    &:has(.initial-number) {
      font-weight: bold;
      color: rgb(39, 146, 92);
      font-size: 1.2em;
      background-color: rgb(211, 245, 227);
    }
    &:has(.input-number) {
      font-weight: bold;
      color: rgb(39, 121, 146);
      background-color: rgb(206, 230, 238);
    }
    // 후보자 리스트
    .candidate-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      justify-items: center;
      width: 100%;
      height: 100%;
      
      .candidate {
        width: calc($cell-size / 3);
        height: calc($cell-size / 3);
        font-size: 10px;
        color: rgb(39, 121, 146);
        text-align: center;

        &.same-number {
          background-color: rgb(39, 121, 146);
          color: white;
        }
        &.remove-target {
          background-color: rgb(184, 170, 170);
          color: rgb(212, 26, 26);
        }
      }
    }
    // 같은 숫자를 표시
    &.same-number {
      background-color: rgb(39, 121, 146);
      .initial-number, .input-number {
        color: white;
      }
    }
    &.selected {
      background-color: $border-color;
      .initial-number, .input-number {
        color: white;
      }
      .candidate {
        color: white;
      }
    }
    &.error {
      background-color: rgb(184, 170, 170);
      font-weight: bold;
      .initial-number, .input-number {
        color: rgb(212, 26, 26);
      }
    }
    &.left-border {
      border-left: 2px solid $border-color;
    }
    &.top-border {
      border-top: 2px solid $border-color;
    }
    &.right-border {
      border-right: 2px solid $border-color;
    }
    &.bottom-border {
      border-bottom: 2px solid $border-color;
    }
  }
  &.hint {
    width: calc($cell-size * 10);
    height: calc($cell-size * 10);
    .cell-frame {
      &.hint-target {
        background-color: rgb(39, 121, 146);
        color: white;
        .candidate {
          color: white;
        }
      }
    }

  }
}
.mode-list {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(209, 209, 209);
  div {
    padding: 16px;
    border: 1px solid rgb(128, 122, 122);
    &.selected {
      background-color: rgb(53, 42, 42);
      color: white;
    }
  }
}
.number-pad {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .num {
    border: 1px solid rgb(74, 74, 74);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;

    &:hover {
      cursor: pointer;
      background-color: rgb(74, 74, 74);
      color: white;
    }
  }
}
.hint-list {
  margin-top: 36px;
  .hint-item {
    margin-top: 12px;
    padding: 12px;
    border: 1px solid rgb(74, 74, 74);
    .cell-frame{
      .index {
        visibility: hidden;
        position:absolute; 
        top:0; 
        left:0; 
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%; 
        background-color: blue;
        color: white;
        font-size: 0.6em;
        text-align: center;
      }
      &:hover {
        .index {
          visibility: visible;
        }
      }
    }
    
    // 다음 전략 추천
    .step-list{
      .step {
        margin-top: 12px;
        padding: 12px;
        background-color: rgb(209, 209, 209);
      }
    }
    // 전략 분석 목록
    .strategy-list {
        border: 1px solid rgb(173, 173, 173);
      .strategy {
        padding: 12px;
      }
    }
  }
}
</style>
  
import { onMounted, onUnmounted } from 'vue';
