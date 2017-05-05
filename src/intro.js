import * as THREE from 'three/build/three';
import SkyBoxScene from './scenes/skybox';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

export default function (element) {

  const skyboxScene = new SkyBoxScene(renderer);

  skyboxScene.init().then(() => {
    render();
  });

  function render() {
    requestAnimationFrame(render);
    skyboxScene.render();
  }

  element.appendChild(renderer.domElement);
}
