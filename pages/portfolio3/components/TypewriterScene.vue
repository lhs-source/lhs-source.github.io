<template>
    <div ref="container" class="w-full h-full absolute top-0 left-0 z-0 pointer-events-none"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let typewriterGroup: THREE.Group;
let paperMesh: THREE.Mesh;
let animationId: number;

const init = () => {
    if (!container.value) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a); // Dark background to match portfolio
    // Add some fog for depth
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

    // Camera
    const aspect = container.value.clientWidth / container.value.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.value.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Models
    createTypewriter();
    createPaper();

    // Animation Loop
    animate();

    // Resize Handler
    window.addEventListener('resize', onResize);
};

const createTypewriter = () => {
    typewriterGroup = new THREE.Group();
    scene.add(typewriterGroup);

    const materialBody = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.7 });
    const materialKeys = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const materialRoller = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9 });
    const materialSilver = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 });

    // Base
    const baseGeo = new THREE.BoxGeometry(4, 0.5, 3);
    const base = new THREE.Mesh(baseGeo, materialBody);
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    typewriterGroup.add(base);

    // Upper Body
    const upperGeo = new THREE.BoxGeometry(4, 1, 1.5);
    const upper = new THREE.Mesh(upperGeo, materialBody);
    upper.position.set(0, 1, -0.75);
    upper.castShadow = true;
    upper.receiveShadow = true;
    typewriterGroup.add(upper);

    // Roller
    const rollerGeo = new THREE.CylinderGeometry(0.4, 0.4, 3.5, 32);
    rollerGeo.rotateZ(Math.PI / 2);
    const roller = new THREE.Mesh(rollerGeo, materialRoller);
    roller.position.set(0, 1.5, -0.75);
    roller.castShadow = true;
    typewriterGroup.add(roller);

    // Keys Area
    const keysBaseGeo = new THREE.BoxGeometry(3.5, 0.2, 1.5);
    keysBaseGeo.rotateX(0.2);
    const keysBase = new THREE.Mesh(keysBaseGeo, materialBody);
    keysBase.position.set(0, 0.6, 0.8);
    typewriterGroup.add(keysBase);

    // Individual Keys (Simplified rows)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 10; j++) {
            const keyGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16);
            const key = new THREE.Mesh(keyGeo, materialKeys);
            key.position.set((j - 4.5) * 0.3, 0.7 + (i * 0.1), 0.5 + (i * 0.3));
            key.rotation.x = 0.2;
            typewriterGroup.add(key);
        }
    }
};

const createPaper = () => {
    // Paper dimensions (A4 ratio roughly)
    const paperWidth = 2.5;
    const paperHeight = 3.5;
    const paperGeo = new THREE.PlaneGeometry(paperWidth, paperHeight);
    const paperMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        roughness: 0.4
    });

    paperMesh = new THREE.Mesh(paperGeo, paperMat);
    // Initial position: hidden inside/behind the roller
    // We want it to come out from the roller top
    paperMesh.position.set(0, 1.5, -0.8);
    // Rotate slightly to match roller exit angle
    paperMesh.rotation.x = -0.2;

    // We will animate scaleY and position to make it look like it's being typed out
    // Or we can use a mask? 
    // Easier approach: Position it so the bottom is at the roller, and move it up.
    // But to make it look like it's growing, we might need to use a clipping plane or just move it up from behind the typewriter body.
    // Let's try moving it up.

    // Reset for animation start
    paperMesh.position.set(0, 1.5, -0.85);
    paperMesh.scale.set(1, 0, 1); // Start with 0 height

    // Pivot point adjustment? 
    // PlaneGeometry is centered. If we scale Y, it scales from center.
    // We want it to scale from bottom.
    paperGeo.translate(0, paperHeight / 2, 0); // Move geometry up so origin is at bottom

    paperMesh.position.set(0, 1.5, -0.85);
    paperMesh.scale.set(1, 0.01, 1); // Start tiny

    scene.add(paperMesh);
};

const animate = () => {
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

const onResize = () => {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

// Expose animation control
// We'll use a GSAP timeline that the parent can control or we can set up ScrollTrigger here if we know the trigger element.
// For now, let's expose a function to update the paper progress (0 to 1)
const setPaperProgress = (progress: number) => {
    if (paperMesh) {
        // Animate scale to reveal paper
        const maxScale = 1;
        paperMesh.scale.y = Math.max(0.01, progress * maxScale);

        // Slight rotation change as it comes out?
        // paperMesh.rotation.x = -0.2 + (progress * 0.1);
    }

    if (typewriterGroup) {
        // Shake typewriter slightly when typing (progress changing)
        typewriterGroup.position.x = (Math.random() - 0.5) * 0.02;
        typewriterGroup.position.z = (Math.random() - 0.5) * 0.02;
    }
};

// Function to lift paper up after typing is done
const liftPaper = (progress: number) => {
    if (paperMesh) {
        // Move paper up and towards camera or screen center
        // progress 0 -> 1 (lifting phase)
        paperMesh.position.y = 1.5 + (progress * 5);
        paperMesh.rotation.x = -0.2 + (progress * 0.2); // Straighten up
        paperMesh.position.z = -0.85 + (progress * 2);
    }
};

defineExpose({
    setPaperProgress,
    liftPaper,
    camera,
    paperMesh
});

onMounted(() => {
    init();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    if (renderer) {
        renderer.dispose();
    }
});
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
