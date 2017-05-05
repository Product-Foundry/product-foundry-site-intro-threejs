import * as THREE from "three/build/three";
import input from './input';

import SkyBoxScene from "./scenes/skybox";
import BirdsScene from "./scenes/birds";

export default function (element) {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.autoClear = false;

  const clock = new THREE.Clock();

  const skyboxScene = new SkyBoxScene();
  const birdsScene = new BirdsScene();

  input.init(renderer);

  skyboxScene.init(renderer).then(() => {
    birdsScene.init(renderer, skyboxScene.scene);
    animate();
  });

  function animate() {
    let delta = clock.getDelta();
    if (delta > 1) {
      // safety cap on large deltas
      delta = 1;
    }

    const time = clock.elapsedTime;

    render(delta, time);
    requestAnimationFrame(animate);
  }

  function render(delta, time) {
    input.update();
    skyboxScene.render();
    birdsScene.render(delta, time);
  }

  element.insertBefore(renderer.domElement, element.firstChild);
}
