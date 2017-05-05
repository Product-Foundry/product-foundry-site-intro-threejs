import * as THREE from "three/build/three";
import SkyBoxScene from "./scenes/skybox";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.autoClear = false;

export default function (element) {

  const skyboxScene = new SkyBoxScene(renderer);

  skyboxScene.init().then(() => {
    render();
  });

  function render() {
    requestAnimationFrame(render);
    skyboxScene.render();
  }

  element.insertBefore(renderer.domElement, element.firstChild);
}
