<script lang="ts" setup>
// 了解threejs基本内容，场景、相机、物体、渲染器
import * as THREE from 'three';

onMounted(() => {
    init();
})

function init() {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机,透视相机
    const camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
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
    render.setSize(window.innerWidth, window.innerHeight);
    // 挂在到元素上
    document.querySelector('.demo01')?.appendChild(render.domElement);
    // 使用渲染器，通过相机将场景渲染出来
    render.render(scene, camera);
}

</script>

<template>
    <div class="demo01"></div>
</template>
<style lang="scss" scoped>
.demo01 {
    height: 100%;
}
</style>