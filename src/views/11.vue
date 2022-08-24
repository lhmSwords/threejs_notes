<script lang="ts" setup>
import * as THREE from 'three';
import useThree from '../hooks/use-three';

const { currentThree, crateScene, initRenderer, perspectiveCamera, orbitControls, axesHelper, render } = useThree();

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
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    // 纹理加载器
    const textureLoader = new THREE.TextureLoader().load(new URL(`./../assets/images/test.png`, import.meta.url).href);
    // 设置纹理中心点
    textureLoader.center.set(0.5, 0.5);
    // 设置纹理旋转
    textureLoader.rotation = Math.PI / 4;
    material = new THREE.MeshBasicMaterial({
        color: materialColor, // 颜色
        map: textureLoader
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    currentThree.scene?.add(cube);

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