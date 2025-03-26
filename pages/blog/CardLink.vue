<script setup lang="ts">
// const props = withDefaults(defineOptions<{
//   // link
// }>, {

// })
const slots = useSlots();
const attrs = useAttrs();


const htmlCode = slots?.default?.().map((slot) => {
  const children = slot.children?.default?.();
  if (children) {
    return children.map((child) => {
      console.log(child.type, child.type === Symbol('v-txt'));
      if(typeof child.children === 'string') {
        console.log('child.children', child.children);
        return child.children ?? '';
      } else if(typeof child.type === 'object' && child.type.name === 'AsyncComponentWrapper') {
        return child.props.href ?? '';
      } else {
        return '';
      }
    }).join('');
  }
}).join('')
.replaceAll("\"", "")
.split("\n")
.map((line) => {
  const token = line.trim().split(": ");
  const key = token[0];
  const value = token[1];
  return { key, value };
}).reduce((acc, curr) => {
  acc[curr.key] = curr.value;
  return acc;
}, {} as any)
</script>

<template>
  <div class="p-3 flex border border-stone-500 rounded-sm">
    <div class="content-center">
      <img :src="htmlCode.image" alt="image" class="w-36 h-auto" />
    </div>
    <div class="flex-2 ml-4">
      <div class="text-;">
        <a :href="htmlCode.link">
          {{ htmlCode.title }}
          <img :src="htmlCode.favicon" alt="image" class="bg-stone-400 ml-2 w-4 h-4 inline-block" />
        </a>
      </div>
      <div class="text-sm">
        {{ htmlCode.description }}
      </div>
    </div>
  </div>
</template>

<style>

</style>