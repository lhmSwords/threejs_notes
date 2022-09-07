export default defineComponent({
  setup() {
    const router = useRouter();

    const defaultActive = ref<string>("0");

    const menus = ref<any[]>([
      {
        name: "note01",
        children: [
          {
            name: "基本内容",
            route: "/note01/01",
          },
          {
            name: "控制器",
            route: "/note01/02",
          },
          {
            name: "移动缩放旋转",
            route: "/note01/03",
          },
          {
            name: "reqAnimationFrame",
            route: "/note01/04",
          },
          {
            name: "Clock",
            route: "/note01/05",
          },
          {
            name: "Gsap",
            route: "/note01/06",
          },
          {
            name: "Resize",
            route: "/note01/07",
          },
          {
            name: "模型控制",
            route: "/note01/08",
          },
          {
            name: "三角形",
            route: "/note01/09",
          },
          {
            name: "几何体介绍",
            route: "/note01/10",
          },
          {
            name: "材质纹理",
            route: "/note01/11",
          },
          {
            name: "透明材质纹理",
            route: "/note01/12",
          },
          {
            name: "标准网格材质",
            route: "/note01/13",
          },
          {
            name: "光照物理效果",
            route: "/note01/14",
          },
          {
            name: "光照物理效果",
            route: "/note01/14",
          },
          {
            name: "纹理进度加载",
            route: "/note01/15",
          },
          {
            name: "环境贴图",
            route: "/note01/16",
          },
          {
            name: "经纬映射贴图",
            route: "/note01/17",
          },
          {
            name: "灯光与阴影",
            route: "/note01/18",
          },
          {
            name: "聚光灯",
            route: "/note01/19",
          },
          {
            name: "点光源",
            route: "/note01/20",
          },
          {
            name: "示例:加载模型",
            route: "/note01/21",
          },
        ],
      },
      {
        name: "note02",
        children: [],
      },
    ]);

    function init() {
      const index = menus.value.findIndex(
        (f: any) => f.route === router.currentRoute.value.path
      );
      defaultActive.value =
        index > -1 ? `${index}` : router.currentRoute.value.path;
    }

    function menuClick(item: any): void {
      router.push({ path: item.route });
    }
    init();

    return () => {
      const menuItem = (item: any, index: string) => {
        return (
          <el-menu-item
            index={item.route}
            key={item.route}
            onClick={() => menuClick(item)}
          >
            <span>{item.name}</span>
          </el-menu-item>
        );
      };

      const menuItems = (menuList: any[]) =>
        menuList.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <el-sub-menu
                index={`${index}`}
                v-slots={{
                  title: () => <span>{item.name}</span>,
                }}
              >
                {menuItems(item.children)}
              </el-sub-menu>
            );
          } else {
            return menuItem(item, item.route);
          }
        });

      const date1 = ref("2022/9/6");

      return (
        <>
          {/* {h(
            resolveComponent("el-select"),
            {
              "model-value": date1.value,
              onChange: (value: any) => {
                console.log("33333333333333333", value);
              },
            },
            [
              h(resolveComponent("el-option"), { label: "label1", value: 1 }),
              h(resolveComponent("el-option"), { label: "label2", value: 2 }),
            ]
          )} */}
          {h(resolveComponent("el-date-picker"), {
            "model-value": date1.value,
            onChange: (value: any) => {
              console.log("33333333333333333", value);
            },
          })}
          <div class="page-container">
            <el-scrollbar class="side-container">
              <el-menu default-active={defaultActive.value}>
                {menuItems(menus.value)}
              </el-menu>
            </el-scrollbar>
            <div class="main-container">
              <router-view>
                {{
                  default: (item: any) => {
                    return h(item.Component);
                  },
                }}
              </router-view>
            </div>
          </div>
        </>
      );
    };
  },
});
