<script setup lang="ts">
// const props = withDefaults(defineOptions<{
//   // link
// }>, {

// })
const slots = useSlots();
const attrs = useAttrs();
const props = defineProps<{
  url?: string;
  title?: string;
  description?: string;
  host?: string;
  favicon?: string;
  image?: string;
}>();
console.log('props', props);
const htmlCode = slots?.default?.().map((slot) => {
  if(props.url) { return ''; }
  const children = slot.children?.default?.();
  if (children) {
    return children.map((child) => {
      if(typeof child.children === 'string') {
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
  <div v-if="props.title" class="p-3 flex border border-stone-500 rounded-sm">
    <div class="content-center">
      <img :src="props.image" alt="image" class="w-36 h-auto" />
    </div>
    <div class="flex-2 ml-4">
      <div class="text-l">
        <a :href="props.url">
          {{ props.title }}
          <img :src="props.favicon" alt="image" class="bg-stone-400 ml-2 w-4 h-4 inline-block" />
        </a>
      </div>
      <div class="text-sm">
        {{ props.description }}
      </div>
    </div>
  </div>
  <div v-else>
    <div class="content-center">
      <img :src="htmlCode.image" alt="image" class="w-36 h-auto" />
    </div>
    <div class="flex-2 ml-4">
      <div class="text-l">
        <a :href="htmlCode.url">
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