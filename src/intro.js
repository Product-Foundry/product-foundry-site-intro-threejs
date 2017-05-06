import input from './input';

import MainScene from "./scenes/main";

export default function (element) {

  THREE.Cache.enabled = true;

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.autoClear = false;

  const clock = new THREE.Clock();
  const mainScene = new MainScene();
  input.init(renderer);

  mainScene.init(renderer).then(() => {
    animate();
  });

  function animate() {
    let delta = clock.getDelta();
    if (delta > 1) {
      delta = 1; // safety cap on large deltas
    }

    const time = clock.elapsedTime;

    render(delta, time);
    requestAnimationFrame(animate);
  }

  function render(delta, time) {
    input.update();
    mainScene.render(delta, time);
  }

  element.insertBefore(renderer.domElement, element.firstChild);
}
