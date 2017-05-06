import input from '../input';

import SkyBoxScene from "./skybox";
import BirdsScene from "./birds";
import TextScene from "./text";

class MainScene {

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 5000);
    this.camera.position.z = 500;

    this.scene = new THREE.Scene();

    const ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

    this.skyboxScene = new SkyBoxScene();
    this.birdsScene = new BirdsScene();
    this.textScene = new TextScene();

    this.mouseX = 0;
    this.mouseY = 0;
  }

  init(renderer) {
    this.renderer = renderer;

    input.onResize.add((event) => this._onResize(event));
    input.onPositionUpdate.add((event) => this._onPositionUpdate(event));

    return this.skyboxScene.init(renderer, this.scene, this.camera)
      .then(() => this.birdsScene.init(renderer, this.scene))
      .then(() => this.textScene.init(renderer, this.scene));
  }

  _onPositionUpdate(event) {
    this.mouseX = event.mouseX;
    this.mouseY = event.mouseY;
  }

  _onResize(event) {
    this.camera.aspect = event.aspect;
    this.camera.updateProjectionMatrix();
  }

  render(delta, time) {
    this.camera.position.x += ( this.mouseX - this.camera.position.x * 10 ) * .001;
    this.camera.position.y += ( -this.mouseY - this.camera.position.y * 10 ) * .0005;
    this.camera.lookAt(this.scene.position);

    this.skyboxScene.render(delta, time);
    this.birdsScene.render(delta, time);
    this.textScene.render(delta, time);

    this.renderer.render(this.scene, this.camera);
  }
}

export default MainScene;
