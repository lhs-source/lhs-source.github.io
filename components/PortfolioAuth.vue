<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  correctPassword?: string
}

const props = withDefaults(defineProps<Props>(), {
  correctPassword: 'crow950921'
})

const emit = defineEmits<{
  authenticated: []
}>()

const inputPassword = ref('')
const errorMessage = ref('')
const isAuthenticated = ref(false)

const handleSubmit = () => {
  if (inputPassword.value === props.correctPassword) {
    isAuthenticated.value = true
    errorMessage.value = ''
    
    // 1달간 인증 상태 유지 (localStorage에 저장)
    const authData = {
      authenticated: true,
      timestamp: Date.now()
    }
    localStorage.setItem('portfolio-auth', JSON.stringify(authData))
    
    emit('authenticated')
  } else {
    errorMessage.value = '비밀번호가 올바르지 않습니다.'
    inputPassword.value = ''
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSubmit()
  }
}

// 페이지 로드 시 인증 상태 확인
const checkAuthStatus = () => {
  try {
    const authData = localStorage.getItem('portfolio-auth')
    if (authData) {
      const { authenticated, timestamp } = JSON.parse(authData)
      
      // 1달 (30일) 체크
      const oneMonthInMs = 30 * 24 * 60 * 60 * 1000
      const isWithinMonth = Date.now() - timestamp < oneMonthInMs
      
      if (authenticated && isWithinMonth) {
        isAuthenticated.value = true
        emit('authenticated')
      }
    }
  } catch (error) {
    console.error('인증 상태 확인 중 오류:', error)
  }
}

// 컴포넌트 마운트 시 인증 상태 확인
checkAuthStatus()
</script>

<template>
  <div v-if="!isAuthenticated" class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">포트폴리오 접근</h2>
        <p class="auth-description">이 포트폴리오를 보려면 비밀번호가 필요합니다.</p>
      </div>
      
      <div class="auth-form">
        <div class="input-group">
          <label for="password" class="input-label">비밀번호</label>
          <input
            id="password"
            v-model="inputPassword"
            type="password"
            class="password-input"
            placeholder="비밀번호를 입력하세요"
            @keypress="handleKeyPress"
            autocomplete="off"
          />
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <button 
          type="button"
          class="submit-button"
          :disabled="!inputPassword.trim()"
          @click="handleSubmit"
        >
          확인
        </button>
      </div>
      
      <div class="auth-footer">
        <p class="auth-note">인증 후 1달간 다시 입력할 필요가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-header {
  margin-bottom: 30px;
  
  .auth-title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0 0 12px 0;
  }
  
  .auth-description {
    color: #666;
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
  }
}

.auth-form {
  margin-bottom: 20px;
  
  .input-group {
    margin-bottom: 20px;
    text-align: left;
    
    .input-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }
    
    .password-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 16px;
      color: #333;
      background-color: #fff;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      
      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
      
      &::placeholder {
        color: #999;
      }
      
      /* 비밀번호 필드의 텍스트 가시성 개선 */
      &[type="password"] {
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
        font-weight: 500;
      }
    }
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-bottom: 20px;
    padding: 8px 12px;
    background: #fdf2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
  }
  
  .submit-button {
    width: 100%;
    padding: 14px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover:not(:disabled) {
      background: #5a6fd8;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}

.auth-footer {
  .auth-note {
    color: #999;
    font-size: 12px;
    margin: 0;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 16px;
  }
  
  .auth-card {
    padding: 30px 24px;
  }
  
  .auth-header {
    .auth-title {
      font-size: 20px;
    }
  }
}
</style>
