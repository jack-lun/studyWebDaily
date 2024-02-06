import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import model from './model.js'; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

// 获取场景中的mesh对象
const meshList = [];

// 存储场景中当前选中的网格模型
let curMesh;

function getMeshList(model) {
    if (model.type !== 'Mesh') {
        if (!model.children.length) {
            return;
        } else {
            model.children.forEach(item => {
                getMeshList(item);
            });
        }
    } else {
        meshList.push(model);
    }
}
getMeshList(model);
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(50, 20, 50);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

// transformControls
const transformControl = new TransformControls( camera, renderer.domElement );
scene.add( transformControl );
transformControl.addEventListener('change', () => {
});
transformControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = !event.value;
});

// 射线拾取模型
document.addEventListener('click', (e) => {
   const px = e.clientX;
   const py = e.clientY;
   // 屏幕坐标转webGL标准设备坐标x, y
    const x = (px / width) * 2 - 1;
    const y = -(py / height) * 2 + 1;
    // 创建一个射线投射器
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects([...meshList]);
    if (intersects.length) {
        curMesh = intersects[0].object;
        transformControl.attach(intersects[0].object);
        transformControl.enabled = true;
        transformControl.visible = true;
    }
});

// 渲染循环
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();



