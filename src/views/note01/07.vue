<script lang="ts" setup>
// 目标：尺寸变换自适应动画
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap';

onMounted(() => {
    init();
})

const animateList: any = [];

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
    // 添加物体
    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 几何体材质
    const material = new THREE.MeshBasicMaterial({ color: "#999" })
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

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
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // clock时间控制器
    const clock = new THREE.Clock();

    render3D({ time: undefined, scene, camera, cube, clock, controls });

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
    const animate2 = gsap.to(cube.rotation, {
        x: 2 * Math.PI, // 动画变更属性
        duration: 5, //持续时间
        repeat: -1, // 循环次数，-1表示无限循环
        yoyo: true, // 是否往返运动
        onComplete: () => {
            // console.log('动画完成')
        },
        onStart: () => {
            // console.log('动画开始')
        }
    });
    animateList.push(animate1, animate2);

    window.addEventListener("resize", () => {
        // 更新相机
        camera.aspect = (container?.scrollHeight || 1000) / (container?.scrollHeight || 800);
        // 更新相机投影矩阵
        camera.updateProjectionMatrix();
        // 更新渲染器
        render.setSize(container?.scrollWidth || 1000, container?.scrollHeight || 800);
        // 设置渲染器像素比
        render.setPixelRatio(window.devicePixelRatio);
    })
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

function fullScreen() {
    render && render.domElement.requestFullscreen();
}

function resumeScreen() {
    render && document.exitFullscreen();
}

type ThreeOptions = {
    time?: number,
    scene: THREE.Scene, // 场景
    camera: THREE.PerspectiveCamera, // 相机
    cube: THREE.Mesh, // 物体
    clock: THREE.Clock,
    controls: OrbitControls
}

function render3D(option: ThreeOptions) {
    const { time = 0, scene, camera, cube, clock, controls } = option;
    controls.update();
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
        <el-button @click="fullScreen">全屏</el-button>
        <el-button @click="resumeScreen">退出全屏</el-button>
    </div>
    <div class="demo02"></div>
</template>
<style lang="scss" scoped>
.demo02 {
    height: 100%;
}

.tool {
    position: absolute;
    top: 30px;
    left: 40px;
    right: 0;
    z-index: 1000;
}
</style>