<template>
    <div class="page-container">
        <el-scrollbar class="side-container">
            <el-menu :default-active="defaultActive">
                <el-menu-item :index="`${index}`" v-for="item, index in menus" :key="item.name"
                    @click="menuClick(item)">
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
        <div class="main-container">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const defaultActive = ref<string>("0");

const menus = ref<any[]>([{
    name: "基本内容",
    route: "/01"
}, {
    name: "控制器",
    route: "/02"
}, {
    name: "移动缩放旋转",
    route: "/03"
}, {
    name: "reqAnimationFrame",
    route: "/04"
}, {
    name: "Clock",
    route: "/05"
}, {
    name: "Gsap",
    route: "/06"
}, {
    name: "Resize",
    route: "/07"
}, {
    name: "模型控制",
    route: "/08"
}, {
    name: "三角形",
    route: "/09"
}, {
    name: "几何体介绍",
    route: "/10"
}, {
    name: "材质纹理",
    route: "/11"
}, {
    name: "透明材质纹理",
    route: "/12"
}, {
    name: "标准网格材质",
    route: "/13"
}, {
    name: "光照物理效果",
    route: "/14"
}, {
    name: "光照物理效果",
    route: "/14"
}, {
    name: "纹理进度加载",
    route: "/15"
}, {
    name: "环境贴图",
    route: "/16"
}, {
    name: "经纬映射贴图",
    route: "/17"
}, {
    name: "灯光与阴影",
    route: "/18"
}, {
    name: "聚光灯",
    route: "/19"
}, {
    name: "点光源",
    route: "/20"
}, {
    name: "示例:加载模型",
    route: "/21"
}])

function init() {
    const index = menus.value.findIndex((f: any) => f.route === router.currentRoute.value.path);
    index > -1 && (defaultActive.value = `${index}`);
}

function menuClick(item: any): void {
    router.push({ path: item.route })
}
init();
</script>

<style lang="scss" scoped>
.page-container {
    display: flex;
    flex: 1 0 0%;
    overflow: hidden;
}

.side-container {
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid var(--el-border-color);
    overflow: auto;
}

.el-menu {
    border: none;
}

.main-container {
    padding: 20px 30px;
    flex: 1 0 0%;
    display: flex;
    flex-direction: column;
    position: relative;
}
</style>