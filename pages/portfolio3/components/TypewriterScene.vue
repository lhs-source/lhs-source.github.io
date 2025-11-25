<template>
    <div ref="container" class="w-full h-full absolute top-0 left-0 z-0 pointer-events-none"></div>
</template>

<script setup lang="ts">
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const container = ref<HTMLElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let typewriterModel: THREE.Group | null = null;
let deskModel: THREE.Group | null = null;
let paperMesh: THREE.Mesh;
let animationId: number;
let initialPaperY = 1.5; // Will be updated when model loads
let initialTypewriterY = 0;

const init = () => {
    if (!container.value) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

    // Camera - positioned to look at typewriter centered on screen
    const aspect = container.value.clientWidth / container.value.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0.8, 5);
    camera.lookAt(0, 0.3, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.value.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xbfbfbf, 0.35);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffffff, 1.4, 20, Math.PI / 6, 0.3, 1);
    keyLight.position.set(0, 5, 2);
    keyLight.target.position.set(0, 0.5, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    scene.add(keyLight.target);

    const rimLight = new THREE.PointLight(0xffe1c4, 0.4, 10);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    // Desk model
    loadDeskModel();

    // Load typewriter model
    loadTypewriterModel();
    createPaper();

    // Animation Loop
    animate();

    // Resize Handler
    window.addEventListener('resize', onResize);
};

const loadTypewriterModel = () => {
    const loader = new GLTFLoader();
    
    loader.load(
        '/assets/3dmodels/typewriter.glb',
        (gltf: any) => {
            typewriterModel = gltf.scene;
            
            // Calculate bounding box to determine proper scale
            const box = new THREE.Box3().setFromObject(typewriterModel);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            console.log('Typewriter model size:', size);
            console.log('Typewriter model center:', center);
            
            // Scale to fit nicely in view (target size ~1.5 units)
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetSize = 1.0;
            const scale = targetSize / maxDim;
            
            typewriterModel.scale.setScalar(scale);
            
            // Recalculate bounding box after scaling
            const scaledBox = new THREE.Box3().setFromObject(typewriterModel);
            const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
            
            // Center the model and place it on the ground
            typewriterModel.position.x = -scaledCenter.x;
            typewriterModel.position.z = -scaledCenter.z;
            typewriterModel.position.y = -scaledBox.min.y; // Place on ground
            
            // Store initial position for animations
            initialTypewriterY = typewriterModel.position.y;
            typewriterModel.userData.baseX = typewriterModel.position.x;
            typewriterModel.userData.baseZ = typewriterModel.position.z;
            typewriterModel.userData.baseRotZ = typewriterModel.rotation.z || 0;
            
            console.log('Applied scale:', scale);
            console.log('Final position:', typewriterModel.position);
            
            // Enable shadows for all meshes
            typewriterModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(typewriterModel);
            
            // Adjust paper position based on typewriter model
            // Paper starts at the roller position (top back of typewriter)
            if (paperMesh) {
                const paperHeight = paperMesh.userData.height || 0.9;
                const paperY = scaledBox.max.y - 0.05 - (paperHeight * 0.5); // start deeper inside roller
                const paperZ = scaledBox.min.z + 0.1; // Slightly behind center (at roller)
                const paperX = 0.06;
                paperMesh.position.set(paperX, paperY, paperZ);
                initialPaperY = paperY;
                paperMesh.userData.initialZ = paperZ;
                paperMesh.userData.initialX = paperX;
                setPaperProgress(0);
            }
        },
        (progress: ProgressEvent) => {
            console.log('Loading typewriter:', (progress.loaded / progress.total * 100).toFixed(1) + '%');
        },
        (error: Error) => {
            console.error('Error loading typewriter model:', error);
            // Fallback: create simple typewriter if model fails
            createFallbackTypewriter();
        }
    );
};

const loadDeskModel = () => {
    const loader = new GLTFLoader();

    loader.load(
        '/assets/3dmodels/mahogany_table.glb',
        (gltf: any) => {
            deskModel = gltf.scene;

            const box = new THREE.Box3().setFromObject(deskModel);
            const size = box.getSize(new THREE.Vector3());
            const targetWidth = 6; // desired desk width in scene units
            const scale = targetWidth / Math.max(size.x, 0.0001);
            deskModel.scale.setScalar(scale);

            const scaledBox = new THREE.Box3().setFromObject(deskModel);
            const center = scaledBox.getCenter(new THREE.Vector3());

            // Center desk and place top surface slightly below origin
            deskModel.position.x = -center.x;
            deskModel.position.z = -center.z;
            deskModel.position.y = -scaledBox.max.y - 0.05;

            deskModel.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(deskModel);
        },
        undefined,
        (error: Error) => {
            console.error('Failed to load mahogany table model:', error);
            createDeskSurfaceFallback();
        }
    );
};

const createFallbackTypewriter = () => {
    const typewriterGroup = new THREE.Group();
    
    const materialBody = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.7 });
    const materialKeys = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const materialRoller = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9 });

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

    // Individual Keys
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 10; j++) {
            const keyGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16);
            const key = new THREE.Mesh(keyGeo, materialKeys);
            key.position.set((j - 4.5) * 0.3, 0.7 + (i * 0.1), 0.5 + (i * 0.3));
            key.rotation.x = 0.2;
            typewriterGroup.add(key);
        }
    }

    typewriterModel = typewriterGroup;
    scene.add(typewriterGroup);
    setPaperProgress(0);
};

const createPaper = () => {
    // Paper dimensions (A4 ratio)
    const paperWidth = 0.55;
    const paperHeight = 0.9;
    const paperGeo = new THREE.PlaneGeometry(paperWidth, paperHeight);
    
    // Pivot from bottom (translate geometry before creating mesh)
    paperGeo.translate(0, paperHeight / 2, 0);
    
    // Create paper texture with subtle lines and typed content
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d')!;
    
    // White background
    ctx.fillStyle = '#fffef5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Subtle horizontal lines
    ctx.strokeStyle = '#e8e8e0';
    ctx.lineWidth = 1;
    for (let y = 60; y < canvas.height - 40; y += 28) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(canvas.width - 40, y);
        ctx.stroke();
    }
    
    // Typed content
    const typedLines = [
        'LEE HYUN SOO — CREATIVE FRONTEND ENGINEER',
        'Building delightful UX with Vue.js, Three.js, GSAP.',
        'Focused on immersive motion + polished storytelling.',
        '',
        'Selected Works',
        '- Upbox Cloud  •  BankB  •  Hana 1QPay  •  Omnidoc',
        '',
        'Let\'s craft experiences people remember.'
    ];

    ctx.font = '700 52px "Courier New", monospace';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#111';

    typedLines.forEach((line, idx) => {
        const textY = 160 + idx * 90;
        // Soft shadow for better readability
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 2;
        ctx.strokeText(line, 90, textY);
        ctx.fillText(line, 90, textY);
    });

    const paperTexture = new THREE.CanvasTexture(canvas);
    
    const paperMat = new THREE.MeshStandardMaterial({
        map: paperTexture,
        side: THREE.DoubleSide,
        roughness: 0.6
    });

    paperMesh = new THREE.Mesh(paperGeo, paperMat);
    paperMesh.userData.height = paperHeight;
    
    // Initial position (will be adjusted when typewriter loads)
    // Paper comes out from inside the typewriter (negative z offset)
    paperMesh.position.set(0.06, initialPaperY, -0.25);
    paperMesh.rotation.x = -0.3; // Tilted back more to match roller angle
    paperMesh.scale.set(1, 1, 1);
    paperMesh.userData.initialZ = -0.2;

    scene.add(paperMesh);
};

const createDeskSurfaceFallback = () => {
    const deskGeo = new THREE.PlaneGeometry(6, 6);
    const woodTexture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80');
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 2);

    const deskMat = new THREE.MeshStandardMaterial({
        map: woodTexture,
        roughness: 0.8,
        metalness: 0.1
    });

    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.rotation.x = -Math.PI / 2;
    deskMesh.position.y = -0.1;
    deskMesh.receiveShadow = true;
    scene.add(deskMesh);
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

// Paper progress: 0 to 1 (paper comes out from typewriter)
const setPaperProgress = (progress: number) => {
    if (paperMesh) {
        const initialZ = paperMesh.userData.initialZ || -0.2;
        const initialX = paperMesh.userData.initialX || 0;

        const clamped = Math.min(Math.max(progress, 0), 0.9999);
        const steps = 4;
        const rawStep = clamped * steps;
        const stepIndex = Math.floor(rawStep);
        const stepFraction = rawStep - stepIndex;

        const perStepLift = 0.18;
        const cumulativeLift = stepIndex * perStepLift;
        const easing = stepFraction * stepFraction;

        const startOffset = -0.35;
        const lift = startOffset + cumulativeLift + easing * perStepLift;

        paperMesh.position.y = initialPaperY + lift;
        paperMesh.position.z = initialZ; // keep depth fixed
        paperMesh.position.x = initialX; // keep horizontal fixed
        paperMesh.rotation.x = -0.3; // constant tilt
        paperMesh.scale.set(1, 1, 1); // ensure size constant
    }

    // Typewriter keystroke vibration
    if (typewriterModel) {
        const baseX = typewriterModel.userData.baseX || 0;
        const baseZ = typewriterModel.userData.baseZ || 0;
        const baseRotZ = typewriterModel.userData.baseRotZ || 0;

        if (progress > 0 && progress < 1) {
            const beat = Math.max(0, Math.sin(progress * Math.PI * 24)); // rapid keystrokes
            const jitter = (Math.random() - 0.5) * 0.005;
            typewriterModel.position.x = baseX + beat * 0.04 + jitter;
            typewriterModel.position.z = baseZ + jitter;
            typewriterModel.position.y = initialTypewriterY + beat * 0.08;
            typewriterModel.rotation.z = baseRotZ + beat * 0.05;
        } else {
            typewriterModel.position.x = baseX;
            typewriterModel.position.z = baseZ;
            typewriterModel.position.y = initialTypewriterY;
            typewriterModel.rotation.z = baseRotZ;
        }
    }
};

// Typewriter moves down and disappears
const hideTypewriter = (progress: number) => {
    if (typewriterModel) {
        // Move typewriter down from its initial position (slower, smoother)
        typewriterModel.position.y = initialTypewriterY - (progress * 3);
        // Reset vibration to base position
        typewriterModel.position.x = typewriterModel.userData.baseX || 0;
        typewriterModel.position.z = typewriterModel.userData.baseZ || 0;
    }
};

// Paper lifts up and centers
const liftPaper = (progress: number) => {
    if (paperMesh) {
        // Move paper up and towards camera center
        const initialZ = paperMesh.userData.initialZ || -0.2;
        paperMesh.position.y = initialPaperY + 0.35 + (progress * 3.2); // faster ascent toward top
        paperMesh.position.z = initialZ;
        // Maintain orientation and scale
        paperMesh.rotation.x = -0.3;
        paperMesh.scale.set(1, 1, 1);
    }
};

// Fade out entire scene
const fadeOutScene = (progress: number) => {
    if (renderer) {
        renderer.domElement.style.opacity = String(1 - progress);
    }
};

defineExpose({
    setPaperProgress,
    hideTypewriter,
    liftPaper,
    fadeOutScene,
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
