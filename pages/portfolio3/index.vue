<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ResumePaper from './components/ResumePaper.vue'
import UpboxCloud from './components/projects/UpboxCloud.vue'
import RicoHomepage from './components/projects/RicoHomepage.vue'
import BankB from './components/projects/BankB.vue'
import DatadogTalk from './components/projects/DatadogTalk.vue'
import FreelanceProjects from './components/projects/FreelanceProjects.vue'
import Hana1QPay from './components/projects/Hana1QPay.vue'
import Omnidoc from './components/projects/Omnidoc.vue'
import OpenApproval from './components/projects/OpenApproval.vue'
import Tasim from './components/projects/Tasim.vue'

// State
const isReading = ref(false)
const currentPageIndex = ref(0)
const isHoveringTabs = ref(false)
const pageScrollY = ref(0)

// Pages data
const pages = ref([
  { id: 'resume', title: 'Resume', type: 'resume', color: '#ffeb3b', rotation: -2, component: ResumePaper },
  { id: 'upbox', title: 'Upbox Cloud', type: 'portfolio', color: '#4caf50', rotation: 1, component: UpboxCloud },
  { id: 'rico', title: 'Rico Homepage', type: 'portfolio', color: '#2196f3', rotation: -1, component: RicoHomepage },
  { id: 'datadog', title: 'Datadog Talk', type: 'portfolio', color: '#ff9800', rotation: 2, component: DatadogTalk },
  { id: 'freelance', title: 'Freelance', type: 'portfolio', color: '#9c27b0', rotation: -2, component: FreelanceProjects },
  { id: 'bankb', title: 'BankB', type: 'portfolio', color: '#3f51b5', rotation: 1, component: BankB },
  { id: 'omnidoc', title: 'Omnidoc', type: 'portfolio', color: '#00bcd4', rotation: -1, component: Omnidoc },
  { id: 'open', title: 'Open Approval', type: 'portfolio', color: '#8bc34a', rotation: 2, component: OpenApproval },
  { id: 'hana', title: 'Hana 1QPay', type: 'portfolio', color: '#e91e63', rotation: -2, component: Hana1QPay },
  { id: 'tasim', title: 'TaSIM', type: 'portfolio', color: '#607d8b', rotation: 1, component: Tasim },
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

// Z-Index state (dynamic) - mapped by page index
const zIndices = ref<number[]>([])
const initZIndices = () => {
  zIndices.value = Array.from({ length: pages.value.length }, (_, i) => {
    // If i is 0 (Resume), it should be top (highest index)
    // Stack order is [Bottom, ..., Top]
    // Resume is at index 0 in pages array.
    // In stackOrder, Resume (0) is at the end (Top).
    // So Resume gets highest Z.
    // Let's just map based on initial stack order.
    return pages.value.length - i
  })
}
initZIndices()

// Refs
const deskContainer = ref<HTMLElement | null>(null)
const stackContainer = ref<HTMLElement | null>(null)
const pageRefs = ref<HTMLElement[]>([])

// Actions
const openPortfolio = () => {
  const tl = gsap.timeline()

  tl.to('.desk-resume', {
    scale: 1.5,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      isReading.value = true
      // Initialize stack order if needed, ensuring Resume (0) is top
      // stackOrder is [3, 2, 1, 0] -> 0 is last (top)
      updateStackState()
    }
  })
}

const selectPage = async (index: number) => {
  if (index === currentPageIndex.value) return
  if (isAnimating.value) return

  isAnimating.value = true
  const oldIndex = currentPageIndex.value
  const newIndex = index

  const oldEl = pageRefs.value[oldIndex]
  const newEl = pageRefs.value[newIndex]

  if (!oldEl || !newEl) {
    isAnimating.value = false
    return
  }

  // 1. Update Stack Order Logic
  // We are moving newIndex to TOP.
  // We are moving oldIndex to BOTTOM (visually).
  // Current Order: [..., newIndex, ..., oldIndex] (oldIndex is top)

  // Remove newIndex and oldIndex from current order
  const newOrder = stackOrder.value.filter(i => i !== newIndex && i !== oldIndex)

  // Add oldIndex to the BEGINNING (Bottom)
  newOrder.unshift(oldIndex)

  // Add newIndex to the END (Top)
  newOrder.push(newIndex)

  stackOrder.value = newOrder

  // 2. Update Z-Indices based on new Stack Order
  // Top (last) gets 100. Others get 1..N
  stackOrder.value.forEach((pageIdx, visualIdx) => {
    if (pageIdx === newIndex) {
      zIndices.value[pageIdx] = 100
    } else {
      zIndices.value[pageIdx] = visualIdx + 1
    }
  })

  // Temporarily keep oldIndex high for the animation?
  // No, we want newIndex to be revealed.
  // But oldIndex is flying UP. It should be above everything until it drops.
  // So let's force oldIndex to 101 temporarily.
  const tempZ = [...zIndices.value]
  tempZ[oldIndex] = 101
  // We need to apply this immediately to the DOM? 
  // Vue reactivity will handle it.
  // But we need to wait for Vue to update? 
  // Let's just set it directly on the element style if we can, or rely on reactivity.
  // We'll update the ref and hope it's fast enough.
  zIndices.value[oldIndex] = 101

  // 3. Animate Old Page UP and AWAY
  await gsap.to(oldEl, {
    y: -window.innerHeight * 1.2,
    z: 500, // Lift off the stack to prevent clipping
    rotationX: 45,
    opacity: 1, // Keep opacity 1 as requested
    duration: 0.5,
    ease: 'power2.in'
  })

  // 4. Swap State
  currentPageIndex.value = newIndex
  pageScrollY.value = 0

  // Restore Z-Indices (Old index goes to bottom)
  stackOrder.value.forEach((pageIdx, visualIdx) => {
    if (pageIdx === newIndex) {
      zIndices.value[pageIdx] = 100
    } else {
      zIndices.value[pageIdx] = visualIdx + 1
    }
  })

  // 5. Reset Old Page Position (Instant)
  gsap.set(oldEl, {
    y: -window.innerHeight * 1.2,
    z: 0, // Reset Z
    rotationX: 0,
    opacity: 1,
    x: 0,
    rotation: pages.value[oldIndex].rotation
  })

  // 6. Animate Old Page DROP (Restack at bottom)
  gsap.to(oldEl, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out', // Smooth landing
    delay: 0.1
  })

  isAnimating.value = false
  updateStackState()
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

const updateStackState = () => {
  if (isAnimating.value) return

  // Calculate responsive spacing
  // Available space on the left = (Window Width - Paper Width) / 2
  // But paper is centered.
  // Let's assume paper width is 800px (max).
  // If window is 1200px, left space is 200px.
  // We want to fit (N-1) pages in that space.
  const paperWidth = 800
  const windowWidth = window.innerWidth
  const leftSpace = Math.max(0, (windowWidth - paperWidth) / 2 - 50) // -50 padding
  const totalPages = pages.value.length
  const maxSpacing = 60 // Max pixels between pages
  const spacing = Math.min(maxSpacing, leftSpace / (totalPages - 1 || 1))

  pages.value.forEach((page, i) => {
    const el = pageRefs.value[i]
    if (!el) return

    const isCurrent = i === currentPageIndex.value

    // Base transforms
    let x = 0
    let rotationZ = isCurrent ? 0 : page.rotation
    let y = isCurrent ? -pageScrollY.value : 0

    if (isHoveringTabs.value && !isCurrent) {
      // Fan out logic based on Stack Order
      // Find position in stackOrder
      // stackOrder: [Bottom, ..., Top]
      // We want Bottom to be furthest Left.
      // Top (Current) stays at 0.

      const visualIndex = stackOrder.value.indexOf(i)
      const reverseIndex = (totalPages - 1) - visualIndex
      // Top page (last in array) -> reverseIndex = 0 -> x = 0
      // Bottom page (first in array) -> reverseIndex = total - 1 -> x = max offset

      x = -1 * spacing * reverseIndex
    }

    gsap.to(el, {
      x: x,
      y: y,
      rotation: rotationZ,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  })
}

const setPageRef = (el: any, index: number) => {
  if (el) pageRefs.value[index] = el
}

onMounted(() => {
  window.addEventListener('wheel', handleScroll, { passive: false })
  window.addEventListener('resize', updateStackState)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
  window.removeEventListener('resize', updateStackState)
})

</script>

<template>
  <div class="portfolio-container">

    <!-- Desk View -->
    <div v-if="!isReading" ref="deskContainer" class="desk-view">
      <div class="desk-surface">
        <div class="desk-resume" @click="openPortfolio">
          <div class="resume-preview">
            <h1>Resume</h1>
            <p>Lee Hyun Soo</p>
            <span class="click-hint">(Click to Open)</span>
          </div>
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
            :style="{ zIndex: zIndices[index] }">
            <!-- Attached Post-it Tab -->
            <div class="post-it-tab" :style="{
              backgroundColor: page.color,
              top: `${40 + index * 60}px`
            }" @click.stop="selectPage(index)" @mouseenter="onTabHover(true)" @mouseleave="onTabHover(false)">
              {{ page.title }}
            </div>

            <!-- Hover Gutter (Left margin trigger) -->
            <div class="hover-gutter" @mouseenter="onTabHover(true)" @mouseleave="onTabHover(false)"></div>

            <!-- Front Face -->
            <div class="page-face page-front">
              <div class="page-content">
                <component :is="page.component" />
              </div>
            </div>

            <!-- Back Face -->
            <div class="page-face page-back">
              <!-- Blank or texture -->
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.portfolio-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #2c3e50; // Dark background for focus
  font-family: 'Noto Sans KR', sans-serif;
}

/* Desk View */
.desk-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('https://blog.kakaocdn.net/dna/bwpmFU/btsP3eOfPHO/AAAAAAAAAAAAAAAAAAAAAG_g7Pf8IJuIcI_oYMNCZLKgUNKw_Y2d5UxlGwGD_jeZ/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=X3Xxsm%2FBzrLRWaEHKSNkWo6kX5Y%3D') no-repeat center center;
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:hover {
      transform: rotateX(0deg) rotateZ(0deg) scale(1.05);
    }

    .resume-preview {
      h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      p {
        color: #666;
      }

      .click-hint {
        display: block;
        margin-top: 2rem;
        color: #999;
        font-size: 0.8rem;
      }
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
  background: url('https://blog.kakaocdn.net/dna/bwpmFU/btsP3eOfPHO/AAAAAAAAAAAAAAAAAAAAAG_g7Pf8IJuIcI_oYMNCZLKgUNKw_Y2d5UxlGwGD_jeZ/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1764514799&allow_ip=&allow_referer=&signature=X3Xxsm%2FBzrLRWaEHKSNkWo6kX5Y%3D') no-repeat center center;
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
  transform-origin: center center;
  transform-style: preserve-3d;

  overflow: visible;
  box-sizing: border-box;
  pointer-events: none; // Allow hover to pass through
}

.page-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%; // Allow to grow
  height: auto; // Allow to grow
  backface-visibility: hidden;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 50px;
  box-sizing: border-box;
  border-radius: 2px;
  pointer-events: auto; // Re-enable interactions
}

.page-front {
  z-index: 2;
}

.page-back {
  z-index: 1;
  transform: rotateY(180deg);
  background-color: #f5f5f5;
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
  left: -85px; // Positioned to stick out from the stack
  width: 90px;
  height: 45px;
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.2);
  transition: width 0.2s ease, left 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  border-radius: 2px 0 0 2px;
  z-index: 10; // Ensure tabs are above the page content
  pointer-events: auto; // Re-enable interactions
  // The tab is a sibling of the faces, so it will rotate with the sheet.
  // Its content (text) will be mirrored when the sheet is flipped.
  // This is acceptable for a simple colored tab.

  &:hover {
    width: 100px;
    left: -95px; // Move further out on hover
  }
}

.page-content {
  max-width: 100%;
  overflow-wrap: break-word; // Prevent horizontal overflow
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
  }

  :deep(.resume-container) {
    padding-bottom: 0;
    box-shadow: none;
    max-width: none; // Allow full width
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
