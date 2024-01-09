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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { World } from '../js/world.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createOutline } from 'ionicons/icons';
import { createUI } from '../js/ui.js';

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const scene = new THREE.Scene();
const world = new World();

const stats = new Stats();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

function setupLights() {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(1, 1, 1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light2.position.set(-1, -1, 0.5);
  scene.add(light2);

  const light3 = new THREE.AmbientLight();
  light3.intensity = 0.1;
  scene.add(light3);
}

onMounted(() => {
  const scenebox = document.getElementById("scenebox");
  const canvasElement = scenebox as unknown as HTMLDivElement;
  const innerTab = document.getElementsByClassName("tabs-inner");

  // add FPS counter
  canvasElement.append(stats.dom);

  // from tutorial
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(innerTab[0].clientWidth, innerTab[0].clientHeight);
  renderer.setSize(window.innerWidth, window.innerHeight - 60); // substitute this out in the future
  renderer.setClearColor(0x80a0e0);
  const controller = new OrbitControls(camera, renderer.domElement);
  canvasElement.appendChild(renderer.domElement);

  camera.position.set(-32, 16, -32);
  camera.lookAt(0, 0, 0);

  controller.target.set(16, 0, 16);
  controller.update();

  setupLights();
  world.generate();
  createUI(world);
  scene.add(world);
  animate();
});


</script>
