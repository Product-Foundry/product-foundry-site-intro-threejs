import input from './input';

import MainScene from './scenes/main';

export default function (element, texts) {

  return checkWebGLAvailable()
    .then(() => start());

  function checkWebGLAvailable() {
    return new Promise(resolve => {
      const canvas = document.createElement("canvas");
      const webGlAvailable = !!window.WebGLRenderingContext &&
        (canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"));

      if (!webGlAvailable) {
        throw "WebGL not available";
      } else {
        resolve();
      }
    });
  }

  function start() {
    THREE.Cache.enabled = true;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.autoClear = false;

    input.init(renderer);
    const clock = new THREE.Clock();
    const mainScene = new MainScene(texts);

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
}
