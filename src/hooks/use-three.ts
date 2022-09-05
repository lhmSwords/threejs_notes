import { Scene, WebGLRenderer, Camera, AxesHelper, Color, Texture, sRGBEncoding, PerspectiveCamera } from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeTarget, BoxGeometryOption, Point } from '@/shared/types';

type ThreeOption = {
  scenebgcolor?: string;
  scenebg?: Texture;
};

interface UseThree {
  /**three */
  currentThree: ThreeTarget;
  /**
   * 初始化场景
   * @returns 场景
   */
  crateScene: (dom: Element) => Scene;
  /**
   * 初始化渲染器
   * @returns 渲染器
   */
  initRenderer: () => WebGLRenderer;
  /**
   * 创建透视摄像机
   * @returns 摄像机
   */
  perspectiveCamera: (point?: Point, near?: number, far?: number) => Camera;
  /**
   * 创建轨道控制器
   * @param camera 相机
   * @param domElement dom
   * @returns
   */
  orbitControls: () => OrbitControls;
  /**
   * 创建坐标辅助器
   * @param scene 场景
   * @param size 坐标轴长度,默认10
   */
  axesHelper: (size?: number) => AxesHelper;
  /**
   * three渲染
   * @param renderer 渲染器
   * @param scene 场景
   * @param camera 相机
   * @param renderAction 渲染行为
   */
  render: (renderAction?: Function) => void;
}
/**
 * three
 * @param container 容器
 */
export default function useThree(
  options: ThreeOption = {
    scenebgcolor: '#000',
    scenebg: undefined,
  }
): UseThree {
  /**three对象 */
  const currentThree: ThreeTarget = {
    scene: undefined,
    renderer: undefined,
    camera: undefined,
  };

  let container: Element;

  /**
   * 初始化场景
   * @returns 场景
   */
  function crateScene(dom: Element): Scene {
    container = dom;
    // 场景
    currentThree.scene = new Scene();
    const { scenebgcolor, scenebg } = options;
    // 背景色
    scenebgcolor && (currentThree.scene.background = new Color(scenebgcolor));
    // 纹理
    scenebg && (currentThree.scene.background = scenebg);

    return currentThree.scene;
  }

  /**
   * 初始化渲染器
   * @returns 渲染器
   */
  function initRenderer(): WebGLRenderer {
    // 渲染器
    currentThree.renderer = new WebGLRenderer({
      // 抗锯齿
      antialias: true,
      // 对数深度缓冲区 (加载外部模型去除闪烁适用)
      logarithmicDepthBuffer: true,
    });
    currentThree.renderer.outputEncoding = sRGBEncoding;
    currentThree.renderer.setSize(container?.scrollWidth || 1000, container?.scrollHeight || 800);
    container?.appendChild(currentThree.renderer.domElement);
    return currentThree.renderer;
  }

  /**
   * 创建透视摄像机
   * @returns 摄像机
   */
  function perspectiveCamera(point: Point = { x: 0, y: 0, z: 10 }, near?: number, far?: number): Camera {
    currentThree.camera && currentThree.scene?.remove(currentThree.camera);
    currentThree.camera = new PerspectiveCamera(
      75, // 视野角度
      (container?.scrollWidth || 1000) / (container?.scrollHeight || 800), // 长宽比
      near || 0.1, // 近截面,小于这个距离，不渲染
      far || 800 // 远截面，超过这个距离，不渲染
    );
    // 设置相机位置
    const { x, y, z } = point;
    currentThree.camera.position.set(x, y, z); // x,y,z
    currentThree.scene?.add(currentThree.camera);
    return currentThree.camera;
  }

  /**
   * 创建轨道控制器
   * @param camera 相机
   * @param domElement dom
   * @returns
   */
  function orbitControls(): OrbitControls {
    const controls = new OrbitControls(currentThree.camera as Camera, currentThree.renderer?.domElement);
    // 设置控制器阻尼，类似重力感应效果，并设置控制器update
    controls.enableDamping = true;
    return controls;
  }

  /**
   * 创建坐标辅助器
   * @param scene 场景
   * @param size 坐标轴长度,默认10
   */
  function axesHelper(size: number = 20): AxesHelper {
    // 红色代表X轴,绿色代表Y轴,黄色代表Z轴
    const axesHelper = new AxesHelper(size);
    currentThree.scene?.add(axesHelper);
    return axesHelper;
  }

  /**
   * three渲染
   * @param renderer 渲染器
   * @param scene 场景
   * @param camera 相机
   * @param renderAction 渲染行为
   */
  function render(renderAction?: Function): void {
    renderAction && renderAction();
    currentThree.renderer?.render(currentThree.scene as Scene, currentThree.camera as Camera);
    // 浏览器每一次刷新都执行渲染
    requestAnimationFrame(() => render(renderAction));
  }

  return {
    currentThree,
    crateScene,
    initRenderer,
    perspectiveCamera,
    orbitControls,
    axesHelper,
    render,
  };
}
