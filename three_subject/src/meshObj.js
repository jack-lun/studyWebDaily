import * as THREE from 'three';

const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(50);
// 高光镜面反射材质
// const material = new THREE.MeshPhongMaterial({
//     color: 0xff0000,
//     shininess: 10, // 高光强度属性
//     specular: 0xffffff // 设置高光的颜色
// });

// 漫反射材质
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh