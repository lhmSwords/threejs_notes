<script lang="ts" setup>
import * as THREE from 'three';
import useThree from '@/hooks/use-three';
import gsap from 'gsap';
import dat from 'dat.gui';
// 模型导入器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// 模型解压器
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { AnimationObjectGroup } from 'three';

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree({ scenebgcolor: "#f5f5f5" });

onMounted(() => {
    const container = document.querySelector(".demo");
    crateScene(container as Element);
    initRenderer();
    perspectiveCamera({ x: 10, y: 10, z: 10 }, 0.1, 800);
    const controls = orbitControls();
    axesHelper();

    if (currentThree.renderer) {
        currentThree.renderer.shadowMap.enabled = true;
    }

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

    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    // 材质
    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(0, 0, 0)
    plane.rotation.x = - Math.PI / 2;
    // 设置接收阴影开启
    plane.receiveShadow = true;
    currentThree.scene?.add(plane);

    // // 环境光，四面八方，不会产生阴影
    const light = new THREE.AmbientLight("#fff", 0.8); // 颜色，强度
    currentThree.scene?.add(light);

    const spotLight = new THREE.SpotLight("#fff", 0.8)
    spotLight.position.set(20, 20, 20);

    // 导入模型
    const loader = new GLTFLoader(loadingManager);
    // const dracoLoader = new DRACOLoader(loadingManager);
    // dracoLoader.setDecoderPath(new URL(`./../../assets/textures/03/draco`, import.meta.url).href);
    // loader.setDRACOLoader(dracoLoader);

    let mixers: any[] = [];
    loader.load(new URL(`./../../assets/textures/03/02.glb`, import.meta.url).href, (gltf: any) => {
        gltf.scene.traverse((object: any) => {
            if (object.isMesh) object.castShadow = true;
        });
        const model1 = SkeletonUtils.clone(gltf.scene);
        const model2 = SkeletonUtils.clone(gltf.scene);
        model1.rotation.y = -Math.PI / 1.5;
        model2.rotation.y = -Math.PI / 1.5;
        const mixer1 = new THREE.AnimationMixer(model1);
        mixer1.clipAction(gltf.animations[1]).play(); // run
        mixers.push(mixer1);
        const mixer2 = new THREE.AnimationMixer(model2);
        mixer2.clipAction(gltf.animations[3]).play(); // run
        mixers.push(mixer2);
        model1.position.z = - 2;
        model2.position.z = 0;
        currentThree.scene?.add(model1, model2);
    })
    const clock = new THREE.Clock();
    render(() => {
        const delta = clock.getDelta();
        mixers.length > 0 && mixers.map((mixer) => mixer.update(delta));
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
    color: rgb(167, 211, 244);
}
</style>