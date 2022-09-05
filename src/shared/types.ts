export type ThreeTarget = {
  /**场景 */
  scene?: THREE.Scene;
  /**渲染器 */
  renderer?: THREE.WebGLRenderer;
  /**相机 */
  camera?: THREE.Camera;
};

export type BoxGeometryOption = {
  width?: number | undefined;
  height?: number | undefined;
  depth?: number | undefined;
  widthSegments?: number | undefined;
  heightSegments?: number | undefined;
  depthSegments?: number | undefined;
};

export type Point = {
  x: number;
  y: number;
  z: number;
};
