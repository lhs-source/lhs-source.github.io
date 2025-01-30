<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const three = ref<HTMLElement | null>(null);

onMounted(() => {
  let crowModel: any = null;
  let mouseX = 0;
  let mouseY = 0;
  const width = 1024;

  // ✅ 초기 회전값 (오른쪽 45도)
  const initialRotation = new THREE.Euler(0, Math.PI / 3, 0, "YXZ");

  function onMouseMove(event: MouseEvent) {
    mouseX = (event.clientX / width) * 2 - 1; // X 정규화 (-1 ~ 1)
    mouseY = -(event.clientY / width) * 2 + 1; // Y 정규화 (-1 ~ 1)
  }

  window.addEventListener('mousemove', onMouseMove);

  const scene = new THREE.Scene();
  const aspectRatio = width / (width / 2);
  const camera = new THREE.PerspectiveCamera(40, aspectRatio, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, width / 2);
  renderer.setPixelRatio(window.devicePixelRatio);
  three.value?.appendChild(renderer.domElement);
  camera.position.set(0, 0, 10);

  // ✅ 최대 회전 범위 설정 (각도 제한)
  const maxMouseRotation = {
    x: 20 * (Math.PI / 180), // 위아래 ±10도
    y: 60 * (Math.PI / 180), // 좌우 ±20도
  };
  const maxRandomRotation = {
    x: 5 * (Math.PI / 180), // 위아래 ±5도
    y: 5 * (Math.PI / 180), // 좌우 ±5도
  };

  const rotationSpeed = 0.08; // ✅ 부드러운 보간 속도
  const targetRotation = new THREE.Euler();
  const currentRotation = new THREE.Euler();
  const randomRotation = new THREE.Euler();
  let lastChangeTime = 0;
  const changeInterval = 2000; // ✅ 랜덤 회전 변경 주기 (2초)

  function setNewRandomRotation() {
    randomRotation.set(
      (Math.random() - 0.5) * maxRandomRotation.x * 2,
      (Math.random() - 0.5) * maxRandomRotation.y * 2,
      0
    );
    lastChangeTime = Date.now();
  }

  function updateRotation() {
    if (crowModel) {
      const currentTime = Date.now();
      if (currentTime - lastChangeTime > changeInterval) {
        setNewRandomRotation();
      }

      // ✅ 마우스 이동 방향 회전 적용
      const mouseRotation = new THREE.Vector3(
        mouseY * maxMouseRotation.x,
        -mouseX * maxMouseRotation.y,
        0
      );

      // ✅ 최종 목표 회전 값 (초기 + 마우스 + 랜덤)
      targetRotation.set(
        initialRotation.x - mouseRotation.x + randomRotation.x,
        initialRotation.y - mouseRotation.y + randomRotation.y,
        initialRotation.z
      );

      // ✅ 부드러운 보간 적용
      currentRotation.x += (targetRotation.x - currentRotation.x) * rotationSpeed;
      currentRotation.y += (targetRotation.y - currentRotation.y) * rotationSpeed;
      currentRotation.z += (targetRotation.z - currentRotation.z) * rotationSpeed;

      // ✅ 최종적으로 적용
      crowModel.quaternion.setFromEuler(currentRotation);
    }
  }

  const glbLoader = new GLTFLoader();
  glbLoader.load('/assets/3dmodels/crow.glb', (gltf: any) => {
    crowModel = gltf.scene;
    crowModel.scale.set(4, 4, 4);
    crowModel.quaternion.setFromEuler(initialRotation); // ✅ 초기 회전값 유지
    scene.add(crowModel);

    setNewRandomRotation();
  });

  function animate() {
    requestAnimationFrame(animate);
    updateRotation();
    renderer.render(scene, camera);
  }

  animate();

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove);
  });
});
</script>

<template>
  <div class="relative w-full h-[512px]">
    <div class="absolute inset-0 flex flex-col leading-[0.9] items-center justify-center z-0">
      <span class="font-bold text-stone-800 text-[400px] leading-none w-full text-center">CROW</span>
    </div>
    <div id="three" ref="three" class="absolute inset-0 z-10" style="width: calc(100%); height: 50vw"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.font-bold {
  font-family: 'Anton', sans-serif;
}
</style>
