<script lang="ts" setup>
import * as THREE from 'three';
import useThree from '@/hooks/use-three';

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
    geometry = new THREE.BoxGeometry(1, 1, 1);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material = new THREE.MeshBasicMaterial({ color: materialColor });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    currentThree.scene?.add(cube);

    // 圆形几何体
    geometry = new THREE.CircleGeometry(0.5, 32);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material = new THREE.MeshBasicMaterial({ color: materialColor });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(1.5, 0, 0);
    currentThree.scene?.add(circle);

    // 锥形几何体
    geometry = new THREE.ConeGeometry(0.5, 2, 32);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material = new THREE.MeshBasicMaterial({ color: materialColor });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(3, 0, 0);
    currentThree.scene?.add(cone);

    // 圆柱几何体
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material = new THREE.MeshBasicMaterial({ color: materialColor });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 0, 1.5);
    currentThree.scene?.add(cylinder);

    // 十二面缓冲体

    geometry = new THREE.DodecahedronGeometry(0.5, 30);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material = new THREE.MeshBasicMaterial({ color: materialColor });
    const dodecdahedron = new THREE.Mesh(geometry, material);
    dodecdahedron.position.set(0, 0, 3);
    currentThree.scene?.add(dodecdahedron);

    // 边缘几何体(与其他几何体结合而成)
    geometry = new THREE.DodecahedronGeometry(0.5, 20);
    const edges = new THREE.EdgesGeometry(geometry);
    materialColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: materialColor }));
    line.position.set(1.5, 1.5, 1.5);
    currentThree.scene?.add(line);
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