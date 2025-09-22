<template>
  <GlobalHeader />
  <div class="p-8">
    <h1 class="text-xl font-bold mb-8">CSS Overflow와 min-width: 0 예시</h1>
    
    <h2 class="text-lg font-semibold mb-4">... 처리가 안됨 (min-width: auto)</h2>
    <div class="flex flex-col gap-y-4 w-[240px] border-2 border-red-300">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-y-4 border-2">
          <div class="flex items-center gap-x-4">
            Some badges
          </div>
          <div class="flex items-center gap-x-[8px]">
            <span class="truncate text-sm">매우긴텍스트가들어가서부모컨테이너를벗어나게되는상황이어다</span>
            <div class="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">N</div>
          </div>
          <div class="flex items-center gap-x-8 text-size-11 text-base-70">
            some text
          </div>
          <div class="text-sm text-gray-600 mt-2">
            → 부모 컨테이너(256px)를 벗어나서 overflow 발생
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-y-4 min-w-0 border-2">
          <div class="flex items-center gap-x-4">
            Some badges
          </div>
          <div class="flex items-center gap-x-[8px]">
            <span class="truncate text-sm">매우긴텍스트가들어가서부모컨테이너를벗어나게되는상황이어다</span>
            <div class="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">N</div>
          </div>
          <div class="flex items-center gap-x-8 text-size-11 text-base-70">
            some text
          </div>
          <div class="text-sm text-gray-600 mt-2">
            → min-w-0으로 인해 텍스트가 잘리고 ellipsis(...) 표시
          </div>
        </div>
      </div>
    </div>

    <!-- 원리 설명 -->
    <div class="p-4 rounded">
      <h3 class="font-semibold mb-2">min-width: 0의 원리</h3>
      <div class="text-sm space-y-1">
        <div><strong>기본값:</strong> min-width: auto → 최소 너비를 보장하여 텍스트가 줄어들지 않음</div>
        <div><strong>해결책:</strong> min-width: 0 → 0px까지 줄어들 수 있어서 flex item이 부모를 벗어나지 않음</div>
        <div><strong>결과:</strong> whitespace-nowrap + truncate + min-w-0 = 텍스트 오버플로우 처리</div>
      </div>
    </div>

    <hr />

    <!-- 1줄 vs n줄 말줄임 비교 -->
    <div class="mt-12">
      <h2 class="text-xl font-bold mb-6">1줄 말줄임 vs n줄 말줄임 비교</h2>
      
      <!-- 1줄 말줄임 -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">1줄 말줄임 (truncate)</h3>
        <div class="w-64 border-2 border-blue-300 p-4">
          <div class="truncate text-sm">
            매우긴텍스트가들어가서한줄로만표시되고나머지는말줄임처리가되는텍스트
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">
          → white-space: nowrap + overflow: hidden + text-overflow: ellipsis
        </div>
      </div>

      <!-- 2줄 말줄임 (문제 상황) -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">2줄 말줄임 실패</h3>
        <div class="w-64 border-2 border-red-300 p-4">
          <div class="line-clamp-2-problem text-sm">
            매우긴텍스트가들어가서두줄로표시되어야하는데한줄로만표시되고말줄임처리가되는텍스트
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">
          → white-space: nowrap 상속으로 인해 1줄만 표시됨
        </div>
      </div>

      <!-- 2줄 말줄임 (해결 상황) -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">2줄 말줄임</h3>
        <div class="w-64 border-2 border-green-300 p-4">
          <div class="line-clamp-2-normal text-sm">
            매우긴텍스트가들어가서두줄로표시되어야하는데한줄로만표시되고말줄임처리가되는텍스트
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">
          → white-space: normal 명시로 2줄 표시됨
        </div>
      </div>

      <!-- 다양한 줄 수 비교 -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">다양한 줄 수 비교</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="w-48 border-2 border-gray-300 p-4">
            <div class="text-xs text-gray-500 mb-2">1줄 말줄임</div>
            <div class="line-clamp-1-normal text-sm">
              매우긴텍스트가들어가서한줄로만표시되고나머지는말줄임처리가되는텍스트
            </div>
          </div>
          <div class="w-48 border-2 border-gray-300 p-4">
            <div class="text-xs text-gray-500 mb-2">2줄 말줄임</div>
            <div class="line-clamp-2-normal text-sm">
              매우긴텍스트가들어가서두줄로표시되어야하는데한줄로만표시되고말줄임처리가되는텍스트
            </div>
          </div>
          <div class="w-48 border-2 border-gray-300 p-4">
            <div class="text-xs text-gray-500 mb-2">3줄 말줄임</div>
            <div class="line-clamp-3-normal text-sm">
              매우긴텍스트가들어가서세줄로표시되어야하는데한줄로만표시되고말줄임처리가되는텍스트
            </div>
          </div>
        </div>
      </div>

      <!-- 주의사항 설명 -->
      <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 class="font-semibold mb-4 text-yellow-800">⚠️ 주의사항</h3>
        <div class="text-sm space-y-2 text-yellow-700">
          <div><strong>1. white-space 상속 문제:</strong> 부모 요소에서 white-space: nowrap이 상속될 수 있음</div>
          <div><strong>2. -webkit-line-clamp 조건:</strong> display: -webkit-box + -webkit-box-orient: vertical 필수</div>
          <div><strong>3. 브라우저 호환성:</strong> -webkit- 접두사가 필요한 구형 브라우저 지원</div>
          <div><strong>4. 명시적 white-space:</strong> n줄 말줄임 시 white-space: normal 명시 권장</div>
        </div>
      </div>

      <!-- Flexbox 안에서의 말줄임 처리 -->
      <div class="mt-12">
        <h2 class="text-xl font-bold mb-6">Flexbox 안에서의 말줄임 처리</h2>
        
        <!-- Flexbox 문제 상황 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">Flexbox에서 말줄임 실패</h3>
          <div class="w-80 border-2 border-red-300 p-4">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm font-bold">1</div>
              <div class="flex-1">
                <div class="truncate text-sm">
                  매우긴텍스트가들어가서flexbox안에서말줄임처리가안되는상황입니다
                </div>
              </div>
              <div class="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">N</div>
            </div>
          </div>
          <div class="text-sm text-gray-600 mt-2">
            → min-width: auto로 인해 flex item이 텍스트 너비만큼 확장되어 말줄임 처리 안됨
          </div>
        </div>

        <!-- Flexbox 해결 상황 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">Flexbox에서 말줄임 성공</h3>
          <div class="w-80 border-2 border-green-300 p-4">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm font-bold">2</div>
              <div class="flex-1 min-w-0">
                <div class="truncate text-sm">
                  매우긴텍스트가들어가서flexbox안에서말줄임처리가안되는상황입니다
                </div>
              </div>
              <div class="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">N</div>
            </div>
          </div>
          <div class="text-sm text-gray-600 mt-2">
            → min-w-0으로 인해 flex item이 줄어들 수 있어서 말줄임 처리됨
          </div>
        </div>

        <!-- 다양한 Flexbox 레이아웃 예시 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">다양한 Flexbox 레이아웃에서의 말줄임</h3>
          
          <!-- 카드 레이아웃 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">카드 레이아웃</h4>
            <div class="w-72 border-2 border-gray-300 p-4 rounded-lg">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 bg-gray-300 rounded flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <div class="truncate text-sm font-medium mb-1">매우긴카드제목이들어가서말줄임처리가되는상황</div>
                  <div class="line-clamp-2-normal text-xs text-gray-600">
                    카드의 설명 텍스트가 매우 길어서 두 줄로 표시되고 나머지는 말줄임 처리되는 상황입니다
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 리스트 아이템 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">리스트 아이템</h4>
            <div class="w-80 border-2 border-gray-300 rounded-lg overflow-hidden">
              <div class="flex items-center gap-3 p-3 border-b">
                <div class="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">1</div>
                <div class="flex-1 min-w-0">
                  <div class="text-overflow-ellipsis overflow-hidden text-sm">white-space: nowrap 없어서 줄바꿈되고 말줄임도 안일어남</div>
                </div>
                <div class="text-xs text-gray-500">2024.01.01</div>
              </div>
              <div class="flex items-center gap-3 p-3 border-b">
                <div class="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">2</div>
                <div class="flex-1 min-w-0">
                  <div class="truncate text-sm">의도한대로 줄바꿈이 일어난 경우입니다람쥐</div>
                </div>
                <div class="text-xs text-gray-500">2024.01.02</div>
              </div>
              <div class="flex items-center gap-3 p-3">
                <div class="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">3</div>
                <div class="flex-1">
                  <div class="truncate text-sm">min-width: 0 없어서 줄어들지 않음</div>
                </div>
                <div class="text-xs text-gray-500">2024.01.03</div>
              </div>
            </div>
          </div>

          <!-- 네비게이션 메뉴 -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">네비게이션 메뉴</h4>
            <div class="w-80 border-2 border-gray-300 rounded-lg overflow-hidden">
              <div class="flex items-center gap-3 p-3 hover:bg-gray-50">
                <div class="w-5 h-5 bg-gray-400 rounded"></div>
                <div class="flex-1 min-w-0">
                  <div class="truncate text-sm">홈</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 hover:bg-gray-50">
                <div class="w-5 h-5 bg-gray-400 rounded"></div>
                <div class="flex-1 min-w-0">
                  <div class="truncate text-sm">매우긴메뉴이름이들어가서말줄임처리되는상황</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 hover:bg-gray-50">
                <div class="w-5 h-5 bg-gray-400 rounded"></div>
                <div class="flex-1 min-w-0">
                  <div class="truncate text-sm">설정</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Flexbox 말줄임 조건 정리 -->
        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 class="font-semibold mb-4 text-yellow-800">⚠️ Flexbox에서 말줄임 처리 조건</h3>
          <div class="text-sm space-y-2 text-yellow-700">
            <div><strong>1. min-width: 0 필수:</strong> flex item에 min-width: 0 또는 min-w-0 클래스 적용</div>
            <div><strong>2. flex-1 또는 flex-grow:</strong> 남은 공간을 차지하도록 설정</div>
            <div><strong>3. overflow: hidden:</strong> 넘치는 텍스트 숨김 처리</div>
            <div><strong>4. text-overflow: ellipsis:</strong> 말줄임 표시</div>
            <div><strong>5. white-space: nowrap:</strong> 1줄 말줄임의 경우 필수</div>
          </div>
        </div>
      </div>

      <!-- 추가 공부 포인트 -->
      <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
        <h3 class="font-semibold mb-4 text-blue-800">📚 추가 공부 포인트</h3>
        <div class="text-sm space-y-2 text-blue-700">
          <div><strong>1. CSS Grid와 Flexbox:</strong> 컨테이너에서 말줄임 처리 시 min-width: 0 필요</div>
          <div><strong>2. 반응형 디자인:</strong> 화면 크기별로 다른 줄 수 적용</div>
          <div><strong>3. JavaScript 대안:</strong> clamp.js, react-lines-ellipsis 등 라이브러리 활용</div>
          <div><strong>4. 접근성:</strong> 말줄임 처리된 텍스트의 전체 내용 접근 방법</div>
          <div><strong>5. 성능:</strong> 대량의 텍스트에서 말줄임 처리 최적화</div>
        </div>
      </div>
    </div>







    
  </div>
</template>

<script setup lang="ts">
// 이 예시는 CSS의 min-width 속성과 overflow 처리에 대한 데모입니다.
</script>

<style scoped>
/* min-w-auto 클래스 추가 (Tailwind에 기본적으로 없음) */
.min-w-auto {
  min-width: auto;
}

/* 2줄 말줄임 문제 상황 (white-space: nowrap으로 인해 1줄만 표시) */
.line-clamp-2-problem {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 문제: nowrap으로 인해 줄바꿈이 안됨 */
}

/* n줄 말줄임을 위한 커스텀 클래스 */
.line-clamp-1-normal {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.line-clamp-2-normal {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.line-clamp-3-normal {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
