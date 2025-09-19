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
  <div v-if="props.title" class="card-link-wrapper">
    <div class="card-link-content">
      <div class="card-link-image">
        <img :src="props.image" alt="link preview" class="preview-image" />
      </div>
      <div class="card-link-text">
        <div class="card-link-title">
          <a :href="props.url" class="title-link">
            {{ props.title }}
            <img :src="props.favicon" alt="favicon" class="favicon" />
          </a>
        </div>
        <div class="card-link-description">
          {{ props.description }}
        </div>
        <div class="card-link-url">
          <a :href="props.url" class="url-link">{{ props.url }}</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card-link-wrapper">
    <div class="card-link-content">
      <div class="card-link-image">
        <img :src="htmlCode.image" alt="link preview" class="preview-image" />
      </div>
      <div class="card-link-text">
        <div class="card-link-title">
          <a :href="htmlCode.url" class="title-link">
            {{ htmlCode.title }}
            <img :src="htmlCode.favicon" alt="favicon" class="favicon" />
          </a>
        </div>
        <div class="card-link-description">
          {{ htmlCode.description }}
        </div>
        <div class="card-link-url">
          <a :href="htmlCode.url" class="url-link">{{ htmlCode.url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');

.card-link-wrapper {
  background: white;
  border: 2px solid #3d3d29;
  border-radius: 0;
  margin: 16px 0;
  box-shadow: 3px 3px 0px rgba(61, 61, 41, 0.2);
  transition: all 0.2s ease;
  font-family: 'Noto Serif KR', 'Noto Serif', sans-serif;
  
  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0px rgba(61, 61, 41, 0.3);
  }
}

.card-link-content {
  display: flex;
  padding: 16px;
  gap: 16px;
  align-items: flex-start;
}

.card-link-image {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #f8f8f8;
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-link-text {
  flex: 1;
  min-width: 0;
  
  .card-link-title {
    margin-bottom: 8px;
    
    .title-link {
      color: #1f1f14;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.1rem;
      line-height: 1.3;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s ease;
      
      &:hover {
        color: #2b8e61;
      }
      
      .favicon {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        flex-shrink: 0;
      }
    }
  }
  
  .card-link-description {
    color: #555;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 8px;
    text-align: justify;
  }
  
  .card-link-url {
    .url-link {
      color: #2b8e61;
      text-decoration: underline;
      font-size: 0.8rem;
      font-weight: 500;
      word-break: break-all;
      
      &:hover {
        color: #1f6b47;
        font-weight: bold;
      }
      
      &::after {
        content: '🔗';
        margin-left: 4px;
        font-size: 10px;
        vertical-align: middle;
      }
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .card-link-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .card-link-image {
    width: 100%;
    height: 120px;
  }
}
</style>