import * as THREE from "three/build/three";
import input from './input';

import SkyBoxScene from "./scenes/skybox";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.autoClear = false;

export default function (element) {

  const skyboxScene = new SkyBoxScene(renderer);

  input.init(renderer);

  skyboxScene.init().then(() => {
    render();
  });

  function render() {
    requestAnimationFrame(render);
    input.update();
    skyboxScene.render();
  }

  element.insertBefore(renderer.domElement, element.firstChild);
}
