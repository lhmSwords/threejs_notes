<script lang="ts" setup>
import * as THREE from 'three';
import { PlaneGeometry } from 'three';
import useThree from '@/hooks/use-three';
import gsap from 'gsap';

// LoadingManager 加载管理器

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree({ scenebgcolor: "#eee" });

onMounted(() => {
    const container = document.querySelector(".demo");
    crateScene(container as Element);
    initRenderer();
    perspectiveCamera({ x: 10, y: 10, z: 30 });
    const controls = orbitControls();
    axesHelper();

    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;
    let materialColor: THREE.Color;
    // 立方缓冲几何体
    geometry = new THREE.BoxGeometry(5, 5, 5);
    // materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());

    //  设置加载器
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = () => {
        console.log("加载完成")
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
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const treeTexture = textureLoader.load(new URL(`./../assets/images/test.png`, import.meta.url).href);
    // const alphaTexture = textureLoader.load("");// 加载黑白底色图片，黑色部分为透明部分，白色为不透明部分
    // 设置纹理中心点
    treeTexture.center.set(0.5, 0.5);
    material = new THREE.MeshStandardMaterial({
        color: "#fff", // 颜色
        map: treeTexture, // 贴图
        // alphaMap: alphaTexture,  // 灰度纹理贴图
        transparent: true, // 是否呈现透明
        side: THREE.DoubleSide  // 设置渲染哪一面，默认设置渲染正面
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    currentThree.scene?.add(cube);

    const planeGeometry = new PlaneGeometry(1, 1)
    const plan = new THREE.Mesh(planeGeometry, material);
    planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))
    plan.position.set(6, 0, 0);
    currentThree.scene?.add(plan);

    // 灯光设置

    // 环境光，四面八方，不会产生阴影
    // const light = new THREE.AmbientLight(undefined, 1); // 颜色，强度
    // currentThree.scene?.add(light);

    // 平行光(灯泡，太阳)
    const directionalLight = new THREE.DirectionalLight("#fff", 1);
    directionalLight.position.set(10, 10, 10);
    currentThree.scene?.add(directionalLight);


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