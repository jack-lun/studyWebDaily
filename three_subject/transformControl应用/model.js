import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const box1 = new THREE.Mesh(geometry, material);
box1.position.set(0,5,0);

const box2 = new THREE.Mesh(geometry, material);
box2.position.set(-2, 0, 0);

const model = new THREE.Group();
model.add(box1);
model.add(box2);

export default model;