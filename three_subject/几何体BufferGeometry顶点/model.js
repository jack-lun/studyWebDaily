import * as THREE from 'three';

// 创建缓冲类型集合体
const geometry = new THREE.BufferGeometry();

// 定义顶点坐标
const vertice = new Float32Array([
    0, 0, 0,
    10, 0, 0,
    10, 10, 0,
    0, 10, 0,
]);

// 创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertice, 3); // 三个为一组表示一个点
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribute;

// 定义顶点法线数据
const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
]);
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

// 类型化数组创建顶点数据
const indexs = new Uint16Array([
    0, 1, 2, 2, 3, 0
]);
geometry.index = new THREE.BufferAttribute(indexs, 1);

// 缩放
geometry.scale(2, 2, 2);
// 平移
geometry.translate(10, 0, 0);
// 旋转
geometry.rotateX(Math.PI / 4);
// 居中
geometry.center();

/*************************  点模型 *************************/
// 创建点模型材质
// const material = new THREE.PointsMaterial({
//     color: 0xfff000,
//     size: 10
// });
// 创建点模型对象
// const point = new THREE.Points(geometry, material);
// 导出
// export default point;

/**************************** 线模型 ****************************/

// 创建线模型材质
// const material = new THREE.LineBasicMaterial({
//     color: 0xff0000
// });
// 创建线模型
// 非闭合的（从第一个点到最后一个点依次相连）
// const line = new THREE.Line(geometry, material)
// 闭合的（第一个点和最后一个点会连起来）
// const line = new THREE.LineLoop(geometry, material);
// 非连续的，一段一段
// const line = new THREE.LineSegments(geometry, material);
//导出线模型
// export default line;

/**************************** 面模型 ********************************/

// 创建面模型材质
const material = new THREE.MeshLambertMaterial({
    color: 0xff000,
    side: THREE.DoubleSide,
    wireframe: true
});
// 创建面模型
const mesh = new THREE.Mesh(geometry, material);
// 导出
export default mesh;