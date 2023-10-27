<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Game</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="scenebox" ref="scenebox"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

let renderer;

onMounted(() => {
  let scenebox = document.getElementById("scenebox");
  let canvasElement = scenebox as unknown as HTMLDivElement;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1.0);
  canvasElement.append(renderer.domElement);
  renderer.render(scene, camera);
});


</script>
