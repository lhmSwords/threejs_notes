<script lang="ts" setup>
import * as THREE from 'three';
import useThree from '@/hooks/use-three';
import gsap from 'gsap';
import dat from 'dat.gui';

// 灯光与阴影
// - 具备条件
// 1.材质要满足能够对光照有反应
// 2.设置渲染器开启后阴影的计算 renderer.shadowMap.enabled=true;
// 3.设置光照投射阴影 directionalLight.castShadow = true
// 4.设置物体的投射阴影 sphere.castShadow = true
// 5.设置物体接收阴影 plane.receiveShadow = true

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree({ scenebgcolor: "#f5f5f5" });

onMounted(() => {
    const container = document.querySelector(".demo");
    crateScene(container as Element);
    initRenderer();
    perspectiveCamera({ x: 10, y: 10, z: 30 });
    const controls = orbitControls();
    axesHelper();

    currentThree.renderer && (currentThree.renderer.shadowMap.enabled = true);

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

    const sphereGeometry = new THREE.SphereBufferGeometry(5, 30, 30);
    // 材质
    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(0, 0, 0)
    //物体的投射阴影开启
    sphere.castShadow = true;
    currentThree.scene?.add(sphere);


    //  生成一个平面1
    const planeGeometry1 = new THREE.PlaneBufferGeometry(80, 80);
    const plane1 = new THREE.Mesh(planeGeometry1, material);
    plane1.position.set(0, -5, 0)
    plane1.rotation.x = - Math.PI / 2
    // 设置接收阴影开启
    plane1.receiveShadow = true;
    currentThree.scene?.add(plane1);

    // 环境光，四面八方，不会产生阴影
    const light = new THREE.AmbientLight("#fff", 0.8); // 颜色，强度
    currentThree.scene?.add(light);

    // 设置聚光灯
    const spotLight = new THREE.SpotLight("#fff", 0.8)
    spotLight.position.set(20, 20, 20);

    // 光照投射阴影开启
    spotLight.castShadow = true;
    currentThree.scene?.add(spotLight);

    const gui = new dat.GUI();
    gui.add(spotLight.position, 'x').min(0).max(20).step(0.01).name("光源X轴").onChange((value: any) => {
        console.log('移动X轴->', value)
    });
    gui.add(spotLight.position, 'y').min(0).max(20).step(0.01).name("光源y轴").onChange((value: any) => {
        console.log('移动Y轴->', value)
    });
    gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01).name("光源范围").onChange((value: any) => {
        console.log('光源范围->', value)
    });
    gui.add(spotLight, 'distance').min(0).max(200).step(0.01).name("距离衰减").onChange((value: any) => {
        console.log('光源距离->', value)
    });
    // gsap.to(spotLight.position, {
    //     y: 150, // 动画变更属性
    //     ease: "none", // "none"标识匀速运动
    //     duration: 10, //持续时间
    //     repeat: -1, // 循环次数，-1表示无限循环
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