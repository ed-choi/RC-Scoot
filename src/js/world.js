import * as THREE from 'three';

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00d000 });

export class World extends THREE.Group {
  constructor(size={ width: 64, height: 32 }) {
    super();
    this.size = size;
  }

  generate() {
    const instancedMesh = new THREE.InstancedMesh(
      geometry, material, this.size.width * this.size.height * this.size.width);
    instancedMesh.count = 0;

    const matrix = new THREE.Matrix4();
    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        for (let z = 0; z < this.size.width; z++) {
          // const block = new THREE.Mesh(geometry, material);
          matrix.setPosition(x, y, z);
          instancedMesh.setMatrixAt(instancedMesh.count, matrix);
          instancedMesh.count++;
        }
      }
    }

    this.add(instancedMesh);
  }
}