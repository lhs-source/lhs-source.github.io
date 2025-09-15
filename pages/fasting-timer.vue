<template>
  <div class="fasting-timer-page min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-green-400">간헐적 단식 타이머</h1>
      
      <!-- 설정 섹션 -->
      <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4 text-blue-300">설정</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">섭취 시간 (시간)</label>
            <input 
              v-model.number="settings.eatingWindow"
              type="number" 
              min="1" 
              max="12"
              class="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">공복 시간 (시간)</label>
            <input 
              v-model.number="settings.fastingWindow"
              type="number" 
              min="8" 
              max="24"
              class="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
            />
          </div>
        </div>
      </div>

      <!-- 마지막 식사 시간 설정 -->
      <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4 text-blue-300">마지막 식사 시간</h2>
        <div class="space-y-4">
          <button 
            @click="setLastMealNow"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            지금 식사 완료
          </button>
          
          <div>
            <label class="block text-sm font-medium mb-2">직접 입력</label>
            <input 
              v-model="lastMealInput"
              @change="setLastMealFromInput"
              type="datetime-local" 
              class="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
            />
          </div>
        </div>
      </div>

      <!-- 타이머 표시 -->
      <div class="bg-gray-800 rounded-lg p-6 text-center">
        <div v-if="lastMealTime">
          <div class="mb-4">
            <p class="text-sm text-gray-300 mb-2">마지막 식사</p>
            <p class="text-lg">{{ formatDateTime(lastMealTime) }}</p>
          </div>

          <div v-if="!canEat" class="text-center">
            <h3 class="text-xl font-semibold mb-4 text-yellow-400">공복 중...</h3>
            <div class="text-4xl font-mono mb-4 text-yellow-400">
              {{ timeRemaining }}
            </div>
            <div class="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                class="bg-yellow-400 h-3 rounded-full transition-all duration-1000"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-300">다음 식사까지</p>
          </div>

          <div v-else class="text-center">
            <h3 class="text-2xl font-bold mb-4 text-green-400 animate-pulse">
              🍽️ 식사 가능! 🍽️
            </h3>
            <p class="text-lg text-green-300 mb-4">
              공복 시간을 완료했습니다!
            </p>
            <div class="text-xl font-semibold text-green-400">
              {{ Math.floor((currentTime - lastMealTime) / (1000 * 60 * 60)) }}시간 
              {{ Math.floor(((currentTime - lastMealTime) % (1000 * 60 * 60)) / (1000 * 60)) }}분 공복 유지
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-400">
          <p>마지막 식사 시간을 설정해주세요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FastingSettings {
  eatingWindow: number
  fastingWindow: number
}

const settings = ref<FastingSettings>({
  eatingWindow: 8,
  fastingWindow: 16
})

const lastMealTime = ref<number | null>(null)
const lastMealInput = ref('')
const currentTime = ref(Date.now())

// 로컬 스토리지에서 데이터 로드
onMounted(() => {
  loadSettings()
  loadLastMealTime()
  
  // 1초마다 현재 시간 업데이트
  setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
})

// 설정 감시 및 저장
watch(settings, () => {
  saveSettings()
}, { deep: true })

// 설정 저장/로드
const saveSettings = () => {
  localStorage.setItem('fasting-settings', JSON.stringify(settings.value))
}

const loadSettings = () => {
  const saved = localStorage.getItem('fasting-settings')
  if (saved) {
    settings.value = JSON.parse(saved)
  }
}

// 마지막 식사 시간 관리
const saveLastMealTime = () => {
  if (lastMealTime.value) {
    localStorage.setItem('last-meal-time', lastMealTime.value.toString())
  }
}

const loadLastMealTime = () => {
  const saved = localStorage.getItem('last-meal-time')
  if (saved) {
    lastMealTime.value = parseInt(saved)
    lastMealInput.value = formatForInput(new Date(lastMealTime.value))
  }
}

const setLastMealNow = () => {
  lastMealTime.value = Date.now()
  lastMealInput.value = formatForInput(new Date(lastMealTime.value))
  saveLastMealTime()
}

const setLastMealFromInput = () => {
  if (lastMealInput.value) {
    lastMealTime.value = new Date(lastMealInput.value).getTime()
    saveLastMealTime()
  }
}

// 계산된 속성들
const canEat = computed(() => {
  if (!lastMealTime.value) return false
  const elapsed = currentTime.value - lastMealTime.value
  const fastingDuration = settings.value.fastingWindow * 60 * 60 * 1000
  return elapsed >= fastingDuration
})

const timeRemaining = computed(() => {
  if (!lastMealTime.value || canEat.value) return '00:00:00'
  
  const elapsed = currentTime.value - lastMealTime.value
  const fastingDuration = settings.value.fastingWindow * 60 * 60 * 1000
  const remaining = fastingDuration - elapsed
  
  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const progressPercentage = computed(() => {
  if (!lastMealTime.value) return 0
  
  const elapsed = currentTime.value - lastMealTime.value
  const fastingDuration = settings.value.fastingWindow * 60 * 60 * 1000
  const progress = (elapsed / fastingDuration) * 100
  
  return Math.min(100, Math.max(0, progress))
})

// 유틸리티 함수들
const formatDateTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatForInput = (date: Date) => {
  return date.toISOString().slice(0, 16)
}

// 페이지 메타데이터
useHead({
  title: '간헐적 단식 타이머',
  meta: [
    { name: 'description', content: '간헐적 단식을 위한 타이머 도구' }
  ]
})
</script>

<style scoped>
/* 추가적인 애니메이션 스타일 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style> 