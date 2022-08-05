<template>
  <Teleport to="#modal-portal">
    <transition name="show">
      <div
        v-if="props.open" 
        class="modal-background" 
        @click="onClickBackground">
        <transition name="show-body">
        <div 
          class="modal-body"
          @click="onClickBody">
          <slot></slot>
        </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits } from 'vue';

interface Props {
  open: boolean,
  avoidCloseTouch?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  open: false,
  avoidCloseTouch: false,
});
interface Emits {
  (eventName: 'close', open: boolean): void
}
const emits = defineEmits<Emits>();

const onClickBackground = () => {
  if(props.open === true) {
    // 닫아야 함
  } else {
    // 열어야 함
  }

  emits('close', !props.open);
}
const onClickBody = (event: Event) => {
  if(props.avoidCloseTouch === true) {
    event.stopPropagation();
  }
}

</script>

<style scoped lang="scss">
.modal-background {
  background-color: rgba(black, 0.36);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  .modal-body {
    background-color: white;
    width: 88vw;
    max-height: 72vh;

    transition: .3s;
  }
}

.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s ease;
  .modal-body {
    transition: transform 0.5s ease;
  }
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
  .modal-body {
    transform: translateX(100vw);
  }
}
</style>
