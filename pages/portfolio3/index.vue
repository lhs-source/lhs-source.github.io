<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, markRaw } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TypewriterScene from '../../components/portfolio/TypewriterScene.vue'
import ResumePaper from '../../components/portfolio/projects/ResumePaper.vue'
import ResumePreview from '../../components/portfolio/ResumePreview.vue'
import UpboxCloud from '../../components/portfolio/projects/UpboxCloud.vue'
import UpboxCloud2 from '../../components/portfolio/projects/UpboxCloud2.vue'
import RicoHomepage from '../../components/portfolio/projects/RicoHomepage.vue'
import BankB from '../../components/portfolio/projects/BankB.vue'
import DatadogTalk from '../../components/portfolio/projects/DatadogTalk.vue'
import FreelanceProjects from '../../components/portfolio/projects/FreelanceProjects.vue'
import Hana1QPay from '../../components/portfolio/projects/Hana1QPay.vue'
import Omnidoc from '../../components/portfolio/projects/Omnidoc.vue'
import OpenApproval from '../../components/portfolio/projects/OpenApproval.vue'
import Tasim from '../../components/portfolio/projects/Tasim.vue'

// Register GSAP plugin only on client side
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// State
const isReading = ref(false)
const currentPageIndex = ref(0)
const isHoveringTabs = ref(false)
const pageScrollY = ref(0)
const showTypewriter = ref(true)
const typewriterSceneRef = ref<any>(null)
const scrollSpacerRef = ref<HTMLElement | null>(null)
const typewriterWrapperRef = ref<HTMLElement | null>(null)
const deskContainerRef = ref<HTMLElement | null>(null)
const hasTriggeredAutoAnimation = ref(false)
const isDesktop = ref(false)
let typewriterScrollTrigger: ScrollTrigger | null = null

// Mobile Modal State
const showMobileModal = ref(false)
const mobileModalPageIndex = ref<number | null>(null)

// Pages data
const pages = ref([
  { id: 'resume', title: '0. 이력서', type: 'resume', color: '#ffeb3b', rotation: -2, component: markRaw(ResumePaper), tapeImage: 'masking1.png' },
  // { id: 'upbox', title: '업박스 클라우드', type: 'portfolio', color: '#4caf50', rotation: 1, component: markRaw(UpboxCloud), tapeImage: 'masking2.png' },
  { id: 'upbox2', title: '1-a. 업박스 클라우드', type: 'portfolio', color: '#4caf50', rotation: 1, component: markRaw(UpboxCloud2), tapeImage: 'masking2.png' },
  { id: 'reco', title: '1-b. 리코 홈페이지', type: 'portfolio', color: '#2196f3', rotation: -1, component: markRaw(RicoHomepage), tapeImage: 'masking2.png' },
  { id: 'datadog', title: '1-c. 데이터독 발표', type: 'portfolio', color: '#ff9800', rotation: 2, component: markRaw(DatadogTalk), tapeImage: 'masking2.png' },
  { id: 'bankb', title: '2-a. 뱅크비', type: 'portfolio', color: '#3f51b5', rotation: 1, component: markRaw(BankB), tapeImage: 'masking3.png' },
  { id: 'omnidoc', title: '2-b. Omnidoc', type: 'portfolio', color: '#00bcd4', rotation: -1, component: markRaw(Omnidoc), tapeImage: 'masking3.png' },
  // { id: 'open', title: '오픈망 직승인', type: 'portfolio', color: '#8bc34a', rotation: 2, component: markRaw(OpenApproval), tapeImage: 'masking3.png' },
  { id: 'hana', title: '3-a. 하나 1QPay', type: 'portfolio', color: '#e91e63', rotation: -2, component: markRaw(Hana1QPay), tapeImage: 'masking4.png' },
  { id: 'tasim', title: '3-b. TaSIM', type: 'portfolio', color: '#607d8b', rotation: 1, component: markRaw(Tasim), tapeImage: 'masking4.png' },
  { id: 'freelance', title: '4. 그 외', type: 'portfolio', color: '#9c27b0', rotation: -2, component: markRaw(FreelanceProjects), tapeImage: 'masking4.png' },

])

// Stack Order State
// Tracks the visual order of pages from bottom to top.
// Initial: [N-1, ..., 0] (Index 0 is top)
// Actually, let's store page INDICES.
// Visual Order: [Bottom Page Index, ..., Top Page Index]
const stackOrder = ref<number[]>([])

// Initialize stack order
const initStackOrder = () => {
  stackOrder.value = Array.from({ length: pages.value.length }, (_, i) => pages.value.length - 1 - i)
}
initStackOrder()

// Z-Index 관리 함수 - stackOrder를 기준으로 z-index를 계산하고 DOM에 직접 설정
const updateZIndices = () => {
  pages.value.forEach((_, pageIdx) => {
    const el = pageRefs.value[pageIdx]
    if (!el) return

    const stackPosition = stackOrder.value.indexOf(pageIdx)
    // stackOrder는 [bottom, ..., top] 순서이므로
    // stackPosition이 클수록 위에 있고, z-index도 높아야 함
    // stackPosition은 0부터 시작하므로 +1
    const zIndex = stackPosition + 1
      ; (el as HTMLElement).style.setProperty('z-index', zIndex.toString(), 'important')
  })
}

// Refs
const deskContainer = ref<HTMLElement | null>(null)
const stackContainer = ref<HTMLElement | null>(null)
const pageRefs = ref<HTMLElement[]>([])

// Actions
const openPortfolio = () => {
  const deskResume = document.querySelector('.desk-resume') as HTMLElement
  if (!deskResume) return

  const tl = gsap.timeline()

  // 이력서가 화면 하단으로 이동하며 사라지는 애니메이션
  tl.to(deskResume, {
    y: window.innerHeight * 1.5,
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out',
    onComplete: () => {
      isReading.value = true
      // Initialize stack order if needed, ensuring Resume (0) is top
      // stackOrder is [3, 2, 1, 0] -> 0 is last (top)

      // Wait for next tick to ensure DOM is updated
      setTimeout(() => {
        animatePagesEntry()
      }, 50)
    }
  })
}

const animatePagesEntry = () => {
  // 모바일에서는 단순 페이드인만 적용
  if (window.innerWidth <= 720) {
    pages.value.forEach((page, index) => {
      const el = pageRefs.value[index]
      if (!el) return

      gsap.set(el, {
        opacity: 0
      })

      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1
      })
    })
    return
  }

  // Set initial positions for all pages (below viewport)
  pages.value.forEach((page, index) => {
    const el = pageRefs.value[index]
    if (!el) return

    // Save current transform values to preserve x and rotation
    const currentTransform = gsap.getProperty(el, 'transform')

    // Set initial position (below viewport) while preserving other transforms
    gsap.set(el, {
      y: window.innerHeight * 1.2,
      opacity: 0,
      clearProps: 'none' // Don't clear other properties
    })
  })

  // Calculate final positions by calling updateStackState first (but without animating)
  // We'll manually set the final positions after animation
  const finalPositions: Array<{ x: number; y: number; rotation: number }> = []

  pages.value.forEach((page, i) => {
    const isCurrent = i === currentPageIndex.value
    let x = 0
    let rotationZ = isCurrent ? 0 : page.rotation
    let y = isCurrent ? -pageScrollY.value : 0

    const pivotY = 2500
    const transformOrigin = `30% ${pivotY}px`

    if (!isCurrent) {
      const randomRotation = page.rotation
      const visualIndex = stackOrder.value.indexOf(i)
      const reverseIndex = (pages.value.length - 1) - visualIndex
      const stackFanRotation = -1 * reverseIndex * 0.05
      rotationZ = randomRotation + stackFanRotation
      const rad = randomRotation * (Math.PI / 180)
      const shiftX = Math.sin(rad) * pivotY
      x = -shiftX
    }

    finalPositions.push({ x, y, rotation: rotationZ })
  })

  // Animate pages from bottom to their final positions
  const pivotY = 2500
  const transformOrigin = `30% ${pivotY}px`

  pages.value.forEach((page, index) => {
    const el = pageRefs.value[index]
    if (!el) return

    const finalPos = finalPositions[index]

    // Set transform origin
    gsap.set(el, { transformOrigin })

    // Animate to final position
    // First page (index 0) starts immediately, each next page starts 0.1s later
    gsap.to(el, {
      x: finalPos.x,
      y: finalPos.y,
      rotation: finalPos.rotation,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      delay: index * 0.1
    })
  })

  // After all animations complete, update stack state immediately (no additional animation)
  const totalAnimationTime = (pages.value.length - 1) * 0.1 + 0.3
  setTimeout(() => {
    updateZIndices()
    updateStackState(true) // immediate = true to avoid additional animation
  }, totalAnimationTime * 1000)
}

const selectPageById = (pageId: string) => {
  const index = pages.value.findIndex(p => p.id === pageId)
  if (index !== -1) {
    // 모바일에서는 팝업으로 표시
    if (window.innerWidth <= 720) {
      mobileModalPageIndex.value = index
      showMobileModal.value = true
      // 모바일 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden'
    } else {
      selectPage(index)
    }
  }
}

// 모바일 모달 닫기
const closeMobileModal = () => {
  showMobileModal.value = false
  mobileModalPageIndex.value = null
  document.body.style.overflow = ''
}

// 컴포넌트 언마운트 시 body 스크롤 복원
onUnmounted(() => {
  document.body.style.overflow = ''
})

// 이전/다음 페이지로 이동하는 함수
const goToPreviousPage = () => {
  if (currentPageIndex.value > 0) {
    selectPage(currentPageIndex.value - 1)
  }
}

const goToNextPage = () => {
  if (currentPageIndex.value < pages.value.length - 1) {
    selectPage(currentPageIndex.value + 1)
  }
}

const selectPage = async (index: number) => {
  if (index === currentPageIndex.value) return
  if (isAnimating.value) return

  // 모바일에서는 스크롤로 이동
  if (window.innerWidth <= 720) {
    scrollToPage(index)
    return
  }

  isAnimating.value = true
  const oldIndex = currentPageIndex.value
  const newIndex = index

  console.log('selectPage old, new', oldIndex, newIndex)

  const oldEl = pageRefs.value[oldIndex]
  const newEl = pageRefs.value[newIndex]

  if (!oldEl || !newEl) {
    isAnimating.value = false
    return
  }

  await gsap.set(oldEl, {
    z: 2000
  })
  // 1. Update Stack Order Logic
  // We want to keep the natural order for all pages EXCEPT the new active one.
  // Natural order is [N-1, ..., 0] (reversed indices)

  const naturalOrder = Array.from({ length: pages.value.length }, (_, i) => pages.value.length - 1 - i)

  // Remove newIndex from natural order
  const newOrder = naturalOrder.filter(i => i !== newIndex)

  // Add newIndex to the END (Top)
  newOrder.push(newIndex)

  stackOrder.value = newOrder

  console.log('stackOrder', stackOrder.value)

  // 2. 애니메이션을 위한 임시 z-index 설정
  // oldpage가 위로 올라갈 때 가장 높은 z-index를 가져야 함
  // pages.value.forEach((_, pageIdx) => {
  //   const el = pageRefs.value[pageIdx]
  //   if (!el) return

  //   let zIndex: number
  //   if (pageIdx === oldIndex) {
  //     zIndex = 1000 // oldpage가 가장 높음
  //   } else if (pageIdx === newIndex) {
  //     zIndex = 999 // newpage는 그 다음
  //   } else {
  //     // 나머지 페이지는 현재 stack 순서에 따라
  //     const stackPosition = stackOrder.value.indexOf(pageIdx)
  //     zIndex = stackPosition + 2
  //   }
  //   ; (el as HTMLElement).style.setProperty('z-index', zIndex.toString(), 'important')
  // })

  // 브라우저 렌더링 대기
  // await nextTick()
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  // 3. Old Page를 위로 올리는 애니메이션
  await gsap.to(oldEl, {
    y: -oldEl.scrollHeight,
    rotationX: 0,
    duration: 0.5,
    ease: 'power2.out'
  })

  // 4. 상태 교환
  currentPageIndex.value = newIndex
  pageScrollY.value = 0

  // 5. Old Page 위치 초기화
  gsap.set(oldEl, {
    y: -window.innerHeight * 1.2,
    z: 0,
    rotationX: 0,
    opacity: 1,
    x: 0,
    rotation: pages.value[oldIndex].rotation
  })

  // 6. z-index를 최종 stack 순서에 맞춰 재설정
  updateZIndices()
  await nextTick()

  // 7. Animate Old Page DROP (Restack at bottom)
  // 튕김 효과 없이 부드럽게 내려가기
  gsap.to(oldEl, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  })
  console.log('here');

  isAnimating.value = false
  updateStackState()
  // z-index 재확인 (updateStackState 후에도 유지)
  updateZIndices()
}

// 모바일에서 페이지로 스크롤하는 함수
const scrollToPage = (index: number) => {
  const el = pageRefs.value[index]
  if (!el) return

  currentPageIndex.value = index
  pageScrollY.value = 0

  // 부드러운 스크롤 (모바일 네비게이션 높이 고려)
  const yOffset = -10 // 약간의 여백
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  })
}

const isAnimating = ref(false)

let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const onTabHover = (hovering: boolean) => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }

  if (hovering) {
    isHoveringTabs.value = true
    updateStackState()
  } else {
    hoverTimeout = setTimeout(() => {
      isHoveringTabs.value = false
      updateStackState()
    }, 200)
  }
}

const handleScroll = (e: WheelEvent) => {
  if (!isReading.value) return
  // 모바일에서는 일반 스크롤 사용
  if (window.innerWidth <= 720) return

  const currentEl = pageRefs.value[currentPageIndex.value]
  if (!currentEl) return

  const contentHeight = currentEl.scrollHeight
  const viewHeight = window.innerHeight
  const maxScroll = Math.max(0, contentHeight - viewHeight + 200)

  let newScroll = pageScrollY.value + e.deltaY
  newScroll = Math.max(0, Math.min(newScroll, maxScroll))

  pageScrollY.value = newScroll

  gsap.to(currentEl, {
    y: -pageScrollY.value,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

// 모바일에서 현재 보이는 페이지 추적
const handleMobileScroll = () => {
  if (window.innerWidth > 720) return
  if (!isReading.value) return
  if (showMobileModal.value) return // 모달이 열려있을 때는 스크롤 추적 안 함

  const scrollY = window.scrollY || window.pageYOffset
  const viewportHeight = window.innerHeight
  const centerY = scrollY + viewportHeight / 2

  // 각 페이지의 위치 확인
  pages.value.forEach((page, index) => {
    const el = pageRefs.value[index]
    if (!el) return

    const rect = el.getBoundingClientRect()
    const elementTop = rect.top + scrollY
    const elementCenter = elementTop + rect.height / 2

    // 뷰포트 중앙에 가장 가까운 페이지를 현재 페이지로 설정
    if (Math.abs(elementCenter - centerY) < viewportHeight / 2) {
      if (currentPageIndex.value !== index) {
        currentPageIndex.value = index
        pageScrollY.value = 0
      }
    }
  })
}

const updateStackState = (immediate = false) => {
  if (isAnimating.value) return
  // 모바일에서는 스택 상태 업데이트 불필요
  if (window.innerWidth <= 720) return

  // z-index도 함께 업데이트
  updateZIndices()

  // Calculate responsive spacing
  // Available space on the left = (Window Width - Paper Width) / 2
  // But paper is centered.
  // Let's assume paper width is 800px (max).
  // If window is 1200px, left space is 200px.
  // We want to fit (N-1) pages in that space.
  const paperWidth = 800
  const windowWidth = window.innerWidth
  const leftSpace = Math.max(0, (windowWidth - paperWidth) / 2 - 200) // -100 padding for safety
  const totalPages = pages.value.length
  const maxSpacing = 20 // Reduced from 60 to keep it tighter
  const spacing = Math.min(maxSpacing, leftSpace / (totalPages - 1 || 1))

  pages.value.forEach((page, i) => {
    const el = pageRefs.value[i]
    if (!el) return

    const isCurrent = i === currentPageIndex.value

    // Base transforms
    let x = 0
    let rotationZ = isCurrent ? 0 : page.rotation
    let y = isCurrent ? -pageScrollY.value : 0

    // Unified transform origin to prevent stutter
    // Use the far-away pivot for everything to ensure smooth transitions
    const pivotY = 2500
    const transformOrigin = `30% ${pivotY}px`

    if (isHoveringTabs.value && !isCurrent) {
      // Fan out logic
      // Reset base rotation to ensure uniform fan-out regardless of stack randomness
      rotationZ = 0

      const visualIndex = stackOrder.value.indexOf(i)
      const reverseIndex = (totalPages - 1) - visualIndex

      // Explicit spacing to ensure visibility but prevent overflow
      // Calculate available space to the left
      const paperWidth = 800 // Approx width of paper
      const windowWidth = window.innerWidth
      const leftMargin = (windowWidth - paperWidth) / 2
      const safeLeftSpace = Math.max(0, leftMargin - 40) // 40px padding

      // User wants "very little" spread
      const maxSpacing = 5 // Reduced spacing
      const availableSpacing = safeLeftSpace / (totalPages - 1 || 1)
      const xSpacing = Math.min(maxSpacing, availableSpacing)

      x = -1 * xSpacing * reverseIndex

      // 뒤쪽 문서로 갈수록 아래로 배치
      const yOffset = 8 // 각 문서마다 8px씩 아래로
      y = reverseIndex * yOffset

      // 부채꼴 효과를 위한 회전 각도 증가
      rotationZ += -1 * reverseIndex * 0.4
    } else if (!isCurrent) {
      // Stack state compensation with subtle fan effect

      // 1. Random component (keep pile messy)
      const randomRotation = page.rotation

      // 2. Fan component (subtle arc)
      const visualIndex = stackOrder.value.indexOf(i)
      const reverseIndex = (totalPages - 1) - visualIndex
      const stackFanRotation = -1 * reverseIndex * 0.05 // Very subtle fan

      // Combine rotations
      rotationZ = randomRotation + stackFanRotation

      // 3. X Compensation
      // We only want to compensate for the RANDOM rotation shift, 
      // so the pile stays centered but the fan arc (from stackFanRotation) remains.
      const rad = randomRotation * (Math.PI / 180)
      const shiftX = Math.sin(rad) * pivotY
      x = -shiftX
    }

    const animationProps = {
      x: x,
      y: y,
      rotation: rotationZ,
      transformOrigin: transformOrigin,
      overwrite: 'auto' as const
    }

    if (immediate) {
      gsap.set(el, animationProps)
    } else {
      gsap.to(el, {
        ...animationProps,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  })
}

const setPageRef = (el: any, index: number) => {
  if (el) {
    pageRefs.value[index] = el
    // 초기 z-index 설정
    if (stackOrder.value.length > 0) {
      const stackPosition = stackOrder.value.indexOf(index)
      if (stackPosition !== -1) {
        const zIndex = stackPosition + 1
          ; (el as HTMLElement).style.setProperty('z-index', zIndex.toString(), 'important')
      }
    }
  }
}

// Typewriter Scroll Animation Setup
const setupTypewriterAnimation = () => {
  if (!scrollSpacerRef.value) {
    console.warn('scrollSpacerRef is not available')
    return
  }
  if (!typewriterSceneRef.value) {
    console.warn('typewriterSceneRef is not available')
    return
  }

  console.log('Setting up typewriter animation', {
    scrollSpacer: scrollSpacerRef.value,
    typewriterScene: typewriterSceneRef.value
  })

  // Initial desk position (above viewport) and opacity
  if (deskContainerRef.value) {
    gsap.set(deskContainerRef.value, { y: '-100%', opacity: 0 })
  }

  const typingEnd = 0.4
  const liftEnd = 0.65
  const autoTriggerThreshold = 0.4 // 이력서가 이 높이까지 올라가면 자동 트리거 (타이핑 완료 시점)

  // GSAP 타임라인 생성
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scrollSpacerRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self: ScrollTrigger) => {
        const progress = self.progress

        // 디버깅: progress가 업데이트되는지 확인 (너무 많이 찍히지 않도록 제한)
        if (Math.floor(progress * 100) % 10 === 0) {
          console.log('ScrollTrigger progress:', progress.toFixed(2))
        }

        // 자동 애니메이션이 시작되면 스크롤 기반 업데이트를 완전히 중단
        if (hasTriggeredAutoAnimation.value) {
          return
        }

        // 자동 트리거: 이력서가 일정 높이까지 올라가면 자동으로 위로 사라지는 애니메이션 시작
        // 먼저 체크해서 스크롤 효과를 즉시 중단
        if (progress >= autoTriggerThreshold && !hasTriggeredAutoAnimation.value) {
          console.log('Auto trigger condition met!', {
            progress: progress.toFixed(3),
            autoTriggerThreshold,
            hasTriggered: hasTriggeredAutoAnimation.value,
            liftEnd,
            typingEnd
          })
          hasTriggeredAutoAnimation.value = true
          // 스크롤 트리거 즉시 비활성화하여 스크롤 효과 완전히 중단
          if (mainTimeline.scrollTrigger) {
            mainTimeline.scrollTrigger.kill()
          }
          triggerAutoAnimation()
          return // 이후 스크롤 기반 업데이트 중단
        }

        if (progress <= typingEnd) {
          const typingProgress = progress / typingEnd
          typewriterSceneRef.value?.setPaperProgress(typingProgress)
          typewriterSceneRef.value?.hideTypewriter(0)
        } else if (progress <= liftEnd) {
          typewriterSceneRef.value?.setPaperProgress(1)
          const liftProgress = (progress - typingEnd) / (liftEnd - typingEnd)
          typewriterSceneRef.value?.liftPaper(liftProgress)
          typewriterSceneRef.value?.hideTypewriter(0)
        }
      },
      onEnter: () => {
        console.log('ScrollTrigger entered')
      },
      onLeave: () => {
        console.log('ScrollTrigger left')
        showTypewriter.value = false
        if (deskContainerRef.value) {
          gsap.set(deskContainerRef.value, { y: 0 })
        }
        if (typewriterWrapperRef.value) {
          gsap.set(typewriterWrapperRef.value, { y: '0%' })
        }
        typewriterSceneRef.value?.fadeOutScene(1)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 100)
      }
    }
  })

  // ScrollTrigger 인스턴스 저장
  typewriterScrollTrigger = mainTimeline.scrollTrigger as ScrollTrigger
}

// 자동 애니메이션 트리거: 이력서가 위로 사라지고, 2초 후 테이블과 타자기가 하단으로 사라짐
const triggerAutoAnimation = () => {
  if (!typewriterSceneRef.value) {
    console.warn('TypewriterSceneRef is not available')
    return
  }

  console.log('Triggering auto animation')

  // GSAP 타임라인으로 자동 애니메이션 구현
  const autoTimeline = gsap.timeline({
    onStart: () => {
      console.log('Auto animation started')
    }
  })

  // 1. 이력서가 상단으로 올라가는 애니메이션 (1초)
  const paperProgress = { value: 0 }
  autoTimeline.to(paperProgress, {
    value: 1,
    duration: 1,
    ease: 'power2.in',
    onUpdate: function () {
      if (typewriterSceneRef.value && typewriterSceneRef.value.movePaperUp) {
        typewriterSceneRef.value.movePaperUp(paperProgress.value)
      }
    },
    onComplete: () => {
      console.log('Paper moved up')
    }
  })

  // 2. 이력서가 상단으로 올라간 후 1초 대기
  autoTimeline.to({}, {
    duration: 0.5,
    onComplete: () => {
      console.log('1 second wait completed')
    }
  })

  // 3. 테이블과 타자기가 하단으로 사라지는 애니메이션 (1초)
  const sceneProgress = { value: 0 }
  autoTimeline.to(sceneProgress, {
    value: 1,
    duration: 0.7,
    ease: 'power2.in',
    onUpdate: function () {
      if (typewriterSceneRef.value && typewriterSceneRef.value.moveSceneDown) {
        typewriterSceneRef.value.moveSceneDown(sceneProgress.value)
      }
    },
    onComplete: () => {
      console.log('Scene moved down')
      // 애니메이션 완료 후 타자기 씬 및 텍스트/스크롤 인디케이터 숨김
      if (typewriterSceneRef.value && typewriterSceneRef.value.fadeOutScene) {
        typewriterSceneRef.value.fadeOutScene(1)
      }

      const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement | null
      const backgroundText = document.querySelector('.background-text') as HTMLElement | null

      // 데스크 뷰가 상단에서 내려올 때 텍스트와 스크롤 안내를 함께 fade out
      const deskTimeline = gsap.timeline()

      deskTimeline.to([backgroundText, scrollIndicator].filter(Boolean), {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0)

      if (deskContainerRef.value) {
        deskTimeline.to(deskContainerRef.value, {
          y: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            // desk가 나타나면 스크롤을 못하도록 showTypewriter를 false로 설정
            showTypewriter.value = false
          }
        }, 0)
      }
    }
  })
}

onMounted(() => {
  // Initialize desktop check
  isDesktop.value = window.innerWidth > 720

  window.addEventListener('wheel', handleScroll, { passive: false })
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth > 720
    updateStackState()
    // 모바일 레이아웃 변경 시 스크롤 이벤트 재설정
    if (window.innerWidth <= 720) {
      window.addEventListener('scroll', handleMobileScroll, { passive: true })
    } else {
      window.removeEventListener('scroll', handleMobileScroll)
    }
  })
  window.addEventListener('scroll', handleMobileScroll, { passive: true })

  // Setup typewriter animation after a short delay to ensure refs are ready
  setTimeout(() => {
    setupTypewriterAnimation()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
  window.removeEventListener('scroll', handleMobileScroll)
  window.removeEventListener('resize', () => updateStackState())
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

</script>

<template>
  <div class="portfolio-container" :class="{ 'no-scroll': !showTypewriter }">

    <!-- Typewriter Intro (3D Scene) -->
    <div v-if="showTypewriter" class="typewriter-intro">
      <div ref="scrollSpacerRef" class="scroll-spacer">
        <div ref="typewriterWrapperRef" class="typewriter-scene-wrapper">
          <TypewriterScene ref="typewriterSceneRef" />
          <div class="scroll-indicator">
            <!-- Desktop: Mouse Icon -->
            <svg class="mouse-svg" width="24" height="36" viewBox="0 0 24 36" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2" />
              <rect class="mouse-wheel" x="10" y="8" width="4" height="6" rx="2" fill="rgba(255, 255, 255, 0.7)" />
            </svg>
            <!-- Mobile: Touch Gesture Icon -->
            <svg class="touch-svg" width="32" height="48" viewBox="0 0 32 48" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <!-- Finger/Hand -->
              <ellipse class="touch-finger" cx="16" cy="12" rx="8" ry="10" fill="rgba(255, 255, 255, 0.7)" />
              <!-- Swipe Path -->
              <path class="touch-path" d="M16 22L16 38" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2.5"
                stroke-linecap="round" />
              <!-- Arrow at bottom -->
              <path class="touch-arrow" d="M12 34L16 38L20 34" stroke="rgba(255, 255, 255, 0.7)" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
            <span class="scroll-text-desktop">SCROLL DOWN</span>
            <span class="scroll-text-mobile">아래로 스와이프</span>
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desk View (Always rendered, animated in) -->
    <div ref="deskContainerRef" class="desk-view-wrapper" :style="{ zIndex: showTypewriter ? 5 : 20 }">
      <!-- Desk Surface View -->
      <div v-if="!isReading" ref="deskContainer" class="desk-view">
        <div class="desk-surface">
          <div class="desk-resume" @click="openPortfolio">
            <ResumePreview />
          </div>
        </div>
      </div>

      <!-- Stack View (Reading Mode) -->
      <div v-else ref="stackContainer" class="stack-view">
        <div class="stack-overlay"></div>
        <div class="stack-wrapper">

          <!-- Hover Zone for Fan-out -->
          <div class="hover-zone" @mouseenter="onTabHover(true)" @mouseleave="onTabHover(false)"></div>

          <!-- Pages Stack -->
          <div class="pages-stack">
            <div v-for="(page, index) in pages" :key="page.id" :ref="(el) => setPageRef(el, index)" class="page-sheet"
              :class="{ 'inactive': index !== currentPageIndex }" :data-page-id="page.id">
              <!-- Attached Post-it Tab -->
              <div class="post-it-tab" :style="{
                top: `${40 + index * 60 + (isHoveringTabs ? 0 : page.rotation * 7)}px`
              }" @click.stop="selectPage(index)" @mouseenter="onTabHover(true)" @mouseleave="onTabHover(false)">
                <img :src="`/assets/portfolio/${page.tapeImage}`" class="tape-bg" alt="" />
                <span class="tab-text">{{ page.title }}</span>
              </div>

              <!-- Hover Gutter (Left margin trigger) -->
              <div class="hover-gutter" @mouseenter="onTabHover(true)" @mouseleave="onTabHover(false)"></div>

              <!-- Front Face -->
              <div class="page-face page-front">
                <div class="page-texture"></div>
                <div class="page-content">
                  <component :is="page.component" @select-project="selectPageById" />
                </div>
              </div>

              <!-- Back Face -->
              <div class="page-face page-back">
                <!-- Blank or texture -->
              </div>

            </div>
          </div>

          <!-- Navigation Arrows -->
          <div v-if="isReading" class="page-navigation-arrows">
            <button class="nav-arrow nav-arrow-left" @click.stop="goToPreviousPage" :disabled="currentPageIndex === 0"
              :class="{ 'disabled': currentPageIndex === 0 }" aria-label="이전 페이지">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <div class="nav-divider"></div>
            <button class="nav-arrow nav-arrow-right" @click.stop="goToNextPage"
              :disabled="currentPageIndex === pages.length - 1"
              :class="{ 'disabled': currentPageIndex === pages.length - 1 }" aria-label="다음 페이지">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Mobile Navigation (Bottom Tape Grid) - Removed for 720px and below -->

        </div>
      </div>
    </div>

    <!-- Mobile Modal (720px 이하) -->
    <Transition name="mobile-modal">
      <div v-if="showMobileModal && mobileModalPageIndex !== null" class="mobile-modal-overlay"
        @click.self="closeMobileModal">
        <div class="mobile-modal-container">
          <div class="mobile-modal-header">
            <button class="mobile-modal-close-btn" @click="closeMobileModal" aria-label="이력서로 돌아가기">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <h2 class="mobile-modal-title">{{ pages[mobileModalPageIndex]?.title }}</h2>
          </div>
          <div class="mobile-modal-content">
            <component :is="pages[mobileModalPageIndex].component" @select-project="selectPageById" />
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped lang="scss">
@use '../../components/portfolio/projects/project-styles.scss';

.portfolio-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #1a1a1a; // Match 3D scene background
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.03em;
  font-size: 0.95rem;

  &.no-scroll {
    height: 100vh;
    overflow: hidden;
  }
}

/* Typewriter Intro */
.typewriter-intro {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.scroll-spacer {
  width: 100%;
  height: 1500vh; // Increased from 1000vh for slower scroll
  position: relative;
}

.typewriter-scene-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  z-index: 20;
  pointer-events: none;
  animation: bounce 2s infinite;

  .mouse-svg {
    margin-bottom: 8px;
    display: block;

    .mouse-wheel {
      animation: scrollWheel 1.5s infinite;
    }
  }

  .touch-svg {
    margin-bottom: 8px;
    display: none;

    .touch-finger {
      animation: touchPulse 1.5s infinite;
    }

    .touch-path {
      stroke-dasharray: 16;
      animation: touchSwipe 1.5s infinite;
    }

    .touch-arrow {
      animation: touchArrow 1.5s infinite;
    }
  }

  .scroll-text-desktop {
    display: block;
  }

  .scroll-text-mobile {
    display: none;
  }

  .arrow {
    margin-top: 8px;
    width: 12px;
    height: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    transform: rotate(45deg);
  }
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-10px);
  }

  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes scrollWheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(6px);
    opacity: 0;
  }
}

@keyframes touchPulse {

  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes touchSwipe {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.5;
  }

  50% {
    stroke-dashoffset: -16;
    opacity: 1;
  }

  100% {
    stroke-dashoffset: -32;
    opacity: 0.5;
  }
}

@keyframes touchArrow {

  0%,
  100% {
    opacity: 0.5;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(4px);
  }
}

/* Desk View Wrapper */
.desk-view-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
}

/* Desk View */
.desk-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/assets/portfolio/axe.png') no-repeat center center;
  background-size: cover;

  .desk-surface {
    perspective: 1000px;
  }

  .desk-resume {
    width: 300px;
    height: 420px;
    background: white;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    transform: rotateX(10deg) rotateZ(-5deg);
    cursor: pointer;
    transition: transform 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: rotateX(0deg) rotateZ(0deg) scale(1.05);
    }
  }
}

/* Stack View */
.stack-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // Use the same background
  background: url('/assets/portfolio/axe.png') no-repeat center center;
  background-size: cover;
  perspective: 2500px; // Increased perspective for better 3D feel
  position: relative;
}

.stack-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // Dark overlay
  pointer-events: none; // Allow clicks to pass through
}

.stack-wrapper {
  position: relative;
  width: 800px; // A4 ish ratio width
  height: 90vh;
  max-height: 1100px;
  display: flex;
  z-index: 1; // Above overlay
  margin-left: 200px; // 살짝 오른쪽으로 이동
}

/* Hover Zone */
.hover-zone {
  position: absolute;
  top: 0;
  left: -300px; // Extend to the left
  width: 400px; // Cover the tabs and some space
  height: 100%;
  z-index: 50; // Below tabs but above background? 
  // Actually, tabs are z-index 10 inside page-sheet.
  // We want this zone to catch mouse events around the tabs.
  // If tabs are inside page-sheet, and page-sheet is z-index 1..100.
  // This zone should be high enough to catch empty space, but let tabs receive clicks?
  // If we put it *behind* the stack, it won't catch hover over the stack.
  // If we put it *in front*, it blocks clicks unless pointer-events: none, but then it doesn't catch hover.
  // Solution: Use it for the empty space to the left, and let tabs also trigger hover.
  // Tabs already have @mouseenter.
  // This zone is for the "left remaining part".
}

/* Pages Stack */
.pages-stack {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 60; // Ensure stack (and tabs) are above hover-zone
  pointer-events: none; // Allow hover to pass through empty areas
}

.page-sheet {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: transparent;
  border-radius: 2px;
  transform-origin: center bottom;
  transform-style: preserve-3d;

  overflow: visible;
  box-sizing: border-box;
  pointer-events: none; // Allow hover to pass through
  opacity: 0; // Initially hidden to prevent flash before animation
}

.page-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 120vh;
  height: auto; // Allow to grow
  backface-visibility: hidden;
  // background-image: url('/assets/textures/paper-crumpled.png'); // Moved to .page-texture
  // background-repeat: repeat;
  // background-size: 400px 400px;
  // background-blend-mode: overlay;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 50px;
  box-sizing: border-box;
  border-radius: 2px;
  pointer-events: auto; // Re-enable interactions
  background-color: white; // Base color
}

.page-texture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/textures/paper-crumpled.png');
  background-repeat: repeat;
  background-size: 400px 400px;
  background-blend-mode: overlay;
  opacity: 1;
  z-index: 0;
  pointer-events: none;
}

.page-front {
  z-index: 2;
  // background-image: url('/assets/textures/paper-crumpled.png'); // Moved
  // background-repeat: repeat;
  // background-size: 400px 400px;
  // background-blend-mode: overlay;
}

.page-back {
  z-index: 1;
  transform: rotateY(180deg);
  background-color: #f5f5f5;
  background-image: url('/assets/textures/paper-crumpled.png');
  background-repeat: repeat;
  background-size: 400px 400px;
  background-blend-mode: overlay;
  // Add texture or pattern if desired
}

/* Hover Gutter */
.hover-gutter {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px; // Cover the padding area
  height: 100%;
  z-index: 5; // Above page face, below tabs
  pointer-events: auto; // Catch hover
}

/* Post-it Tabs (Attached to Page) */
.post-it-tab {
  position: absolute;
  left: -120px; // Positioned to stick out from the stack (moved further inward)
  width: 200px;
  height: 55px;
  padding: 10px 15px 10px 15px; // Adjust padding for left alignment
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  // box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.2); // Removed box-shadow
  filter: drop-shadow(-2px 3px 2px rgba(0, 0, 0, 0.2)); // Use drop-shadow for transparency
  transition: width 0.2s ease, left 0.2s ease, top 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start; // Left align text
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); // Removed clip-path
  // border-radius: 2px 0 0 2px; // Removed border-radius
  z-index: 10; // Ensure tabs are above the page content
  pointer-events: auto; // Re-enable interactions
  background-color: transparent; // Transparent background
  overflow: visible; // Allow tape to extend beyond bounds

  .tape-bg {
    position: absolute;
    top: 0;
    left: -15px; // Extend to the left
    width: calc(100% + 30px); // Extend 15px on each side
    height: 100%;
    object-fit: fill;
    z-index: -1;
  }

  .tab-text {
    position: relative;
    z-index: 1;
    white-space: nowrap; // Prevent text wrapping
  }

  &:hover {
    width: 170px;
    left: -90px; // Move further out on hover (adjusted for new position)
  }
}

.page-content {
  max-width: 100%;
  overflow-wrap: break-word; // Prevent horizontal overflow
  position: relative;
  z-index: 1;
  opacity: 0.95; // Allow texture to show through
}

/* Page Navigation Arrows (PC only) */
/* Page Navigation Arrows */
.page-navigation-arrows {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px;
  gap: 0; // Attached

  // PC: Top Center
  top: 20px;
  bottom: auto;

  @media (max-width: 720px) {
    // Mobile: Bottom Center
    top: auto;
    bottom: 20px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #333;
    transition: background 0.2s ease;
    border-radius: 20px; // Pill ends

    &:hover:not(.disabled) {
      background: rgba(0, 0, 0, 0.05);
    }

    &:active:not(.disabled) {
      background: rgba(0, 0, 0, 0.1);
    }

    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .nav-divider {
    width: 1px;
    height: 24px;
    background: rgba(0, 0, 0, 0.1);
    margin: 0 2px;
  }
}

.page-face {
  transition: filter 0.3s ease;
}

.page-sheet.inactive .page-face {
  filter: brightness(0.8);
}

.page-sheet.inactive .tape-bg {
  filter: none !important; // 마스킹 테이프는 어둡게 하지 않음
}

.resume-page {
  width: 100%;

  // Override resume styles to fit in the sheet
  :deep(.resume-background) {
    min-height: auto;
    padding: 0;
    width: 100%; // Ensure it fits
    max-width: 100%;
    box-sizing: border-box;
    background: transparent; // Make resume background transparent so page texture shows
  }

  :deep(.resume-container) {
    padding-bottom: 0;
    box-shadow: none;
    max-width: none; // Allow full width
    width: 100%;
    box-sizing: border-box;
    background: transparent; // Make resume container transparent
  }
}

/* Mobile Navigation (Bottom Tape Grid) */
.mobile-nav {
  display: none;
}

/* Mobile Styles (720px 이하) */
@media (max-width: 720px) {
  .scroll-indicator {
    .mouse-svg {
      display: none;
    }

    .touch-svg {
      display: block;
    }

    .scroll-text-desktop {
      display: none;
    }

    .scroll-text-mobile {
      display: block;
      font-size: 0.7rem;
    }
  }

  .stack-view {
    position: relative;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    perspective: none;
  }

  .stack-overlay {
    display: none;
  }

  .stack-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 100vh;
    margin-left: 0;
    padding-bottom: 20px; // 네비게이션 제거로 padding 감소
  }

  .hover-zone {
    display: none;
  }

  .pages-stack {
    position: relative;
    width: 100%;
    height: auto;
    transform-style: flat;
    pointer-events: auto;
  }

  .page-sheet {
    position: relative;
    width: 100%;
    min-height: 100vh;
    margin-bottom: 20px;
    transform: none !important;
    opacity: 1 !important;
    transform-style: flat;
    pointer-events: auto;

    // 모바일에서는 이력서(index 0)만 표시
    &:not(:first-child) {
      display: none;
    }
  }

  .post-it-tab {
    display: none;
  }

  .hover-gutter {
    display: none;
  }

  .page-face {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: none !important;
  }

  .page-back {
    display: none;
  }

  .page-content {
    width: 100%;
    max-width: 100%;
  }

  /* Mobile Navigation */
  .mobile-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 12px 10px;
    background-color: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
    max-height: 120px;
    overflow-y: auto;
  }

  .mobile-tape-item {
    position: relative;
    width: 100%;
    min-height: 50px;
    height: auto;
    padding: 8px 12px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: transform 0.2s ease, filter 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    &.active {
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
    }
  }

  .mobile-tape-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 0;
  }

  .mobile-tape-text {
    position: relative;
    z-index: 1;
    font-size: 0.75rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Mobile Modal */
.mobile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  overflow: hidden;
}

.mobile-modal-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Mobile Modal Transition */
.mobile-modal-enter-active {
  transition: opacity 0.3s ease;

  .mobile-modal-container {
    transition: transform 0.3s ease;
  }
}

.mobile-modal-leave-active {
  transition: opacity 0.3s ease;

  .mobile-modal-container {
    transition: transform 0.3s ease;
  }
}

.mobile-modal-enter-from {
  opacity: 0;

  .mobile-modal-container {
    transform: translateX(100%);
  }
}

.mobile-modal-enter-to {
  opacity: 1;

  .mobile-modal-container {
    transform: translateX(0);
  }
}

.mobile-modal-leave-from {
  opacity: 1;

  .mobile-modal-container {
    transform: translateX(0);
  }
}

.mobile-modal-leave-to {
  opacity: 0;

  .mobile-modal-container {
    transform: translateX(100%);
  }
}

.mobile-modal-header {
  position: relative;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.mobile-modal-close-btn {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.6;
  }

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
}

.mobile-modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
}

.mobile-modal-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  background-color: white;

  // 페이지 텍스처 제거 (모바일에서는 깔끔하게)
  :deep(.page-texture) {
    display: none;
  }

  // 페이지 페이스 스타일 조정
  :deep(.page-face) {
    padding: 0;
    box-shadow: none;
    background-color: transparent;
  }
}
</style>
