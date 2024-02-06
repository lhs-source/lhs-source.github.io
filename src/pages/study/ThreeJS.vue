<script setup lang="ts">
import { onMounted, ref } from "vue";

import * as THREE from 'three';

const three = ref<HTMLElement | null>(null);

onMounted(() => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
  three.value?.appendChild( renderer.domElement );


  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

  for(let i = 0; i < 5; ++i) {
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    scene.add( cube );
  }

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame( animate );

    for(let i = 0; i < scene.children.length; ++i) {
      const cube = scene.children[i];
      // cube.rotation.x += Math.random() / 100;
      cube.rotation.y += Math.random() / 80;
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