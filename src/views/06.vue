<script lang="ts" setup>
// 目标：Gsap动画使用,适用于知道终点，和总时间情况
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap';

onMounted(() => {
    init();
})

const animateList: any = [];

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

    // clock时间控制器
    const clock = new THREE.Clock();

    render3D({ time: undefined, render, scene, camera, cube, clock });

    const animate1 = gsap.to(cube.position, {
        x: 5, // 动画变更属性
        duration: 5, //持续时间
        ease: "power1.inOut", // 动画类型
        repeat: -1, // 循环次数，-1表示无限循环
        yoyo: true, // 是否往返运动
        onComplete: () => {
            // console.log('动画完成')
        },
        onStart: () => {
            // console.log('动画开始')
        }
    });
    const animate2 = gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inout" });
    animateList.push(animate1, animate2);
}

function animateStart() {
    // 重新开始
    animateList.forEach((animate: any) => animate.restart())
}

function animatePause() {
    // 暂停
    animateList.forEach((animate: any) => animate.pause())
}

function animateStop() {
    // 杀死
    animateList.forEach((animate: any) => animate.kill())
}

function animateResume() {
    // 恢复
    animateList.forEach((animate: any) => animate.resume())
}

type ThreeOptions = {
    time?: number,
    render: THREE.WebGL1Renderer, //渲染器
    scene: THREE.Scene, // 场景
    camera: THREE.PerspectiveCamera, // 相机
    cube: THREE.Mesh, // 物体
    clock: THREE.Clock
}

function render3D(option: ThreeOptions) {
    const { time = 0, render, scene, camera, cube, clock } = option;
    render.render(scene, camera);
    // 浏览器每一次刷新都执行渲染
    requestAnimationFrame((time) => render3D(option));
}

</script>

<template>
    <div class="tool">
        <el-button @click="animateStart">开始</el-button>
        <el-button @click="animatePause">暂停</el-button>
        <el-button @click="animateResume">继续</el-button>
        <el-button @click="animateStop">停止</el-button>
    </div>
    <div class="demo02"></div>
</template>
<style lang="scss" scoped>
.demo02 {
    height: 100%;
}
</style>