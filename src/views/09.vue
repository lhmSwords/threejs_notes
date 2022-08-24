<script lang="ts" setup>
// 目标：随机生成三角形
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

onMounted(() => {
    init();
})
let render: THREE.WebGL1Renderer;

function init() {
    // 创建场景
    const scene = new THREE.Scene();
    const container = document.querySelector('.demo02');
    // 创建相机,透视相机
    const camera = new THREE.PerspectiveCamera(75,
        (container?.scrollWidth || 1000) / (container?.scrollHeight || 800),
        0.1,
        800
    );
    // 设置相机位置
    camera.position.set(0, 0, 10); // x,y,z
    scene.add(camera);
    scene.background = new THREE.Color("#bbb");
    // 初始化渲染器
    render = new THREE.WebGL1Renderer();

    render.setSize((container?.scrollWidth || 1000), (container?.scrollHeight || 800));
    // 挂在到元素上
    document.querySelector('.demo02')?.appendChild(render.domElement);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, render.domElement);
    // 设置控制器阻尼，类似重力感应效果，并设置控制器update
    controls.enableDamping = true;
    // 添加坐标轴辅助器
    // 红色代表X轴,绿色代表Y轴,黄色代表Z轴
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);


    // 创建缓冲几何体
    for (let i = 0; i < 50; i++) {
        // 每个三角形，需要三个顶点，每个顶点需要三个值
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(9);
        for (let j = 0; j < 9; j++) {
            vertices[j] = Math.random() * 5;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        // 几何体材质
        const materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        const material = new THREE.MeshBasicMaterial({ color: materialColor, transparent: true, opacity: 0.8 })
        // 物体
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        render3D({ scene, camera, cube, controls });
    }
}

type ThreeOptions = {
    scene: THREE.Scene, // 场景
    camera: THREE.PerspectiveCamera, // 相机
    cube: THREE.Mesh, // 物体
    controls: OrbitControls
}

function render3D(option: ThreeOptions) {
    const { scene, camera, cube, controls } = option;
    controls.update();
    render.render(scene, camera);
    // 浏览器每一次刷新都执行渲染
    requestAnimationFrame((time) => render3D(option));
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