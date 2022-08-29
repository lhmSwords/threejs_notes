<script lang="ts" setup>
import * as THREE from 'three';
import useThree from '../hooks/use-three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// LoadingManager 加载管理器

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree();

onMounted(() => {
    const container = document.querySelector(".demo");
    crateScene(container as Element);
    initRenderer();
    perspectiveCamera({ x: 10, y: 10, z: 30 });
    const controls = orbitControls();
    axesHelper();

    //  设置加载器
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = () => {
        console.log("加载完成")
        // 记载完成将物体添加到场景
        // currentThree.scene?.add(sphere);
    }
    loadingManager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
        // itemsLoaded 已加载数
        // itemsTotal 总数
        console.log("加载进度", Number(((itemsLoaded / itemsTotal) * 100).toFixed(2)) + '%')
    }
    loadingManager.onError = (url) => {
        console.log("加载错误", url)
    }

    const sphereGeometry = new THREE.SphereBufferGeometry(10, 30, 30);
    // 材质
    const material = new THREE.MeshStandardMaterial({
        metalness: 1, //金属材质 0越白，1越黑
        roughness: 0, //0.0表示平滑的镜面反射，1.0表示完全漫反射
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    currentThree.scene?.add(sphere);

    const rgbeLoader = new RGBELoader(loadingManager);
    // 必须加载hdr文件
    rgbeLoader.loadAsync(new URL(`./../assets/textures/02/05.hdr`, import.meta.url).href).then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        currentThree.scene && (currentThree.scene.background = texture);
        currentThree.scene && (currentThree.scene.environment = texture);
    })

    // 环境光，四面八方，不会产生阴影
    const light = new THREE.AmbientLight("#fff", 0.5); // 颜色，强度
    currentThree.scene?.add(light);

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