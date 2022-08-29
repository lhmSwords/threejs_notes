<script lang="ts" setup>
import * as THREE from 'three';
import { PlaneGeometry } from 'three';
import useThree from '../hooks/use-three';
import gsap from 'gsap';

// LoadingManager 加载管理器

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree();

onMounted(() => {
    const container = document.querySelector(".demo");
    crateScene(container as Element);
    initRenderer();
    perspectiveCamera({ x: 10, y: 10, z: 30 });
    const controls = orbitControls();
    axesHelper();

    let material: THREE.Material;
    //  设置加载器
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = () => {
        console.log("加载完成")
        // 记载完成将物体添加到场景
        currentThree.scene?.add(sphere);
    }
    loadingManager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
        // itemsLoaded 已加载数
        // itemsTotal 总数
        console.log("加载进度", Number(((itemsLoaded / itemsTotal) * 100).toFixed(2)) + '%')
    }
    loadingManager.onError = (url) => {
        console.log("加载错误", url)
    }

    // 纹理加载器
    // 设置环境贴图
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
    const envMapTexture = cubeTextureLoader.load([
        new URL(`./../assets/textures/01/px.jpg`, import.meta.url).href,
        new URL(`./../assets/textures/01/nx.jpg`, import.meta.url).href,
        new URL(`./../assets/textures/01/py.jpg`, import.meta.url).href,
        new URL(`./../assets/textures/01/ny.jpg`, import.meta.url).href,
        new URL(`./../assets/textures/01/pz.jpg`, import.meta.url).href,
        new URL(`./../assets/textures/01/nz.jpg`, import.meta.url).href,
    ]);
    // 几何体
    const sphereGeometry = new THREE.SphereBufferGeometry(10, 30, 30);
    // 材质
    material = new THREE.MeshStandardMaterial({
        envMap: envMapTexture, // 环境贴图
        metalness: 1, //金属材质 0越白，1越黑
        roughness: 0, //0.0表示平滑的镜面反射，1.0表示完全漫反射
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    // 灯光设置

    // 环境光，四面八方，不会产生阴影
    const light = new THREE.AmbientLight("#fff", 0.5); // 颜色，强度
    currentThree.scene?.add(light);

    // 平行光(灯泡，太阳)
    // const directionalLight = new THREE.DirectionalLight("#fff", 1);
    // directionalLight.position.set(10, 10, 10);
    // currentThree.scene?.add(directionalLight);

    // 设置场景背景
    currentThree.scene && (currentThree.scene.background = envMapTexture);

    // gsap.to(light, {
    //     intensity: 0, // 动画变更属性
    //     duration: 5, //持续时间
    //     repeat: -1, // 循环次数，-1表示无限循环
    //     yoyo: true, // 是否往返运动
    // })

    render(() => {
        controls.update();
    });
})

</script>

<template>
    <div class="demo"></div>
</template>
<style lang="scss" scoped>
.demo02 {
    height: 100%;
}
</style>