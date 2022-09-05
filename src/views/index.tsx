{
  /* <template>
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

<script lang="ts" setup> */
}

export default defineComponent({
  setup() {
    const router = useRouter();

    const defaultActive = ref<string>('0');

    const menus = ref<any[]>([
      {
        name: '基本内容',
        route: '/note01/01',
      },
      {
        name: '控制器',
        route: '/note01/02',
      },
      {
        name: '移动缩放旋转',
        route: '/note01/03',
      },
      {
        name: 'reqAnimationFrame',
        route: '/note01/04',
      },
      {
        name: 'Clock',
        route: '/note01/05',
      },
      {
        name: 'Gsap',
        route: '/note01/06',
      },
      {
        name: 'Resize',
        route: '/note01/07',
      },
      {
        name: '模型控制',
        route: '/note01/08',
      },
      {
        name: '三角形',
        route: '/note01/09',
      },
      {
        name: '几何体介绍',
        route: '/note01/10',
      },
      {
        name: '材质纹理',
        route: '/note01/11',
      },
      {
        name: '透明材质纹理',
        route: '/note01/12',
      },
      {
        name: '标准网格材质',
        route: '/note01/13',
      },
      {
        name: '光照物理效果',
        route: '/note01/14',
      },
      {
        name: '光照物理效果',
        route: '/note01/14',
      },
      {
        name: '纹理进度加载',
        route: '/note01/15',
      },
      {
        name: '环境贴图',
        route: '/note01/16',
      },
      {
        name: '经纬映射贴图',
        route: '/note01/17',
      },
      {
        name: '灯光与阴影',
        route: '/note01/18',
      },
      {
        name: '聚光灯',
        route: '/note01/19',
      },
      {
        name: '点光源',
        route: '/note01/20',
      },
      {
        name: '示例:加载模型',
        route: '/note01/21',
      },
    ]);

    function init() {
      const index = menus.value.findIndex((f: any) => f.route === router.currentRoute.value.path);
      index > -1 && (defaultActive.value = `${index}`);
    }

    function menuClick(item: any): void {
      router.push({ path: item.route });
    }
    init();

    return () => {
      const menuItems = menus.value.map((item, index) => {
        return (
          <el-menu-item index={`${index}`} key={item.name} on-click='menuClick(item)'>
            <span>{item.name}</span>
          </el-menu-item>
        );
      });

      return (
        <>
          <div class='page-container'>
            <el-scrollbar class='side-container'>
              <el-menu default-active={defaultActive.value}>{menuItems}</el-menu>
            </el-scrollbar>
            <div class='main-container'>
              <router-view
                v-slots={{
                  default: (item: any) => {
                    const ComponentName = item;
                    debugger
                    return <ComponentName />;
                  },
                }}
              ></router-view>
            </div>
          </div>
        </>
      );
    };
  },
});

// </script>

// <style lang="scss" scoped>
// .page-container {
//     display: flex;
//     flex: 1 0 0%;
//     overflow: hidden;
// }

// .side-container {
//     width: 200px;
//     flex-shrink: 0;
//     border-right: 1px solid var(--el-border-color);
//     overflow: auto;
// }

// .el-menu {
//     border: none;
// }

// .main-container {
//     padding: 20px 30px;
//     flex: 1 0 0%;
//     display: flex;
//     flex-direction: column;
//     position: relative;
// }
// </style>
