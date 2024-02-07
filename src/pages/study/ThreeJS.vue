<script setup lang="ts">
import { onMounted, ref } from "vue";

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const three = ref<HTMLElement | null>(null);

onMounted(() => {
  let mirror: any = null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
  three.value?.appendChild( renderer.domElement );
  camera.position.set(0,0,250);

  scene.background = new THREE.Color('white');

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.        
  controls.zoomSpeed = 1.2;    // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

  for(let i = 0; i < 5; ++i) {
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    scene.add( cube );
  }

  const glbLoader = new GLTFLoader();
  glbLoader.load('/assets/3dmodels/Fox.gltf', (gltf) => {
    // texture 
    const texture = new THREE.TextureLoader().load('/assets/3dmodels/Texture.png');
    gltf.scene.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({ map: texture });
      }
    });

    mirror = gltf.scene;
    mirror.scale.set( 2, 2, 2 );			   
	  mirror.position.x = 0;				    //Position (x = right+ left-) 
    mirror.position.y = 0;				    //Position (y = up+, down-)
	  mirror.position.z = 0;				    //Position (z = front +, back-)
	
    scene.add(gltf.scene);
  });


  function animate() {
    requestAnimationFrame( animate );

    // for(let i = 0; i < scene.children.length; ++i) {
    //   const cube = scene.children[i];
    //   // cube.rotation.x += Math.random() / 100;
    //   cube.rotation.y += Math.random() / 80;
    // }
    if(mirror) {
      // mirror.rotation.y += 0.01;
    }
    renderer.render( scene, camera );
  }

  animate();
})

</script>

<template>
  asdfsd
  <div id="three" ref="three"></div>
</template>

<style scoped lang="scss">
#three {
  border: 1px solid red;
}
</style>