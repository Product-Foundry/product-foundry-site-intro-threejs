import * as THREE from "three/build/three";
import input from './input';

import SkyBoxScene from "./scenes/skybox";
import BirdsScene from "./scenes/birds";
import TextScene from "./scenes/text";

export default function (element) {

  THREE.Cache.enabled = true;

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.autoClear = false;

  const clock = new THREE.Clock();

  const skyboxScene = new SkyBoxScene();
  const birdsScene = new BirdsScene();
  const textScene = new TextScene();

  input.init(renderer);

  skyboxScene.init(renderer).then(() => {
    birdsScene.init(renderer, skyboxScene.scene);
    textScene.init(renderer, skyboxScene.scene, skyboxScene);
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
