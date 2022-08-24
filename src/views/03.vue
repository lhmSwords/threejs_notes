<script lang="ts" setup>
// 目标：物体移动、缩放、旋转
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

onMounted(() => {
    init();
})

function init() {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机,透视相机
    const camera = new THREE.PerspectiveCamera(75,
        1000 / 800,
        0.1,
        800
    );
    // 设置相机位置
    camera.position.set(0, 0, 10); // x,y,z
    scene.add(camera);
    // 添加物体
    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 几何体材质
    const material = new THREE.MeshBasicMaterial({ color: "#999" })
    const cube = new THREE.Mesh(geometry, material);
    // 修改位置
    // cube.position.set(5, 0, 0);
    // cube.position.x = 5;

    // 设置缩放
    // cube.scale.set(3, 2, 1);
    // cube.scale.x = 3;

    // 设置旋转x,y,z,order=>"XYZ"/"XZY"/"YZX"等等
    // cube.rotation.set(Math.PI / 3, 0, 0);

    scene.add(cube);

    // 初始化渲染器
    const render = new THREE.WebGL1Renderer();
    render.setSize(1000, 800);
    // 挂在到元素上
    document.querySelector('.demo02')?.appendChild(render.domElement);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, render.domElement);

    // 添加坐标轴辅助器
    // 红色代表X轴,绿色代表Y轴,黄色代表Z轴
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    render3D(render, scene, camera, cube);
}

function render3D(render: THREE.WebGL1Renderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, cube: THREE.Mesh) {
    // 移动动画
    cube.position.x += 0.01;
    cube.position.y += 0.01;
    cube.position.z += 0.01;
    if (cube.position.x > 5) {
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
    }
    cube.rotation.x += 0.02;
    render.render(scene, camera);
    // 浏览器每一次刷新都执行渲染
    requestAnimationFrame(() => render3D(render, scene, camera, cube));
}

</script>

<template>
    <div class="demo02"></div>
</template>
<style lang="scss" scoped>
.demo02 {
    height: 100%;
}
</style>