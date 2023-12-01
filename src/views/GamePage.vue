<template>
  <ion-page>
    <!--ion-header>
      <ion-toolbar>
        <ion-title>Game</ion-title>
      </ion-toolbar>
    </ion-header-->
    <ion-content :fullscreen="true">
      <div id="scenebox" ref="scenebox"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref, onMounted, render } from 'vue';
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00d000 });
const cube = new THREE.Mesh(geometry, material);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

onMounted(() => {
  const scenebox = document.getElementById("scenebox");
  const canvasElement = scenebox as unknown as HTMLDivElement;
  const innerTab = document.getElementsByClassName("tabs-inner");

  // from tutorial
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerTab[0].clientWidth, innerTab[0].clientHeight);
  canvasElement.appendChild(renderer.domElement);

  camera.position.set(2, 2, 2);
  camera.lookAt(0, 0, 0);

  scene.add(cube);

  animate();
});


</script>
