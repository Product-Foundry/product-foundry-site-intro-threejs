import * as THREE from 'three/build/three';

import * as ImageUtils from '../utils/image';

import input from '../input';

import cloudy from 'file!../textures/cubemap/cloudy.jpg';

import vertexShader from 'raw!../shaders/skybox.vert';
import fragmentShader from 'raw!../shaders/skybox.frag';

// FIXME [AK] Separate intro scene and SkyBox layer
class SkyboxScene {

  constructor() {
    this.camera = undefined;
    this.cameraCube = undefined;

    this.scene = undefined;
    this.sceneCube = undefined;

    this.viewDirectionProjectionInverse = undefined;

    this.reflectionCube = undefined;
    this.refractionCube = undefined;

    this.mouseX = 0;
    this.mouseY = 0;
  }

  init(renderer) {
    this.renderer = renderer;

    input.onResize.add((event) => this._onResize(event));
    input.onPositionUpdate.add((event) => this._onPositionUpdate(event));

    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 5000);
    this.camera.position.z = 500;

    this.cameraCube = new THREE.PerspectiveCamera(75, 1, 1, 100);

    this.scene = new THREE.Scene();
    this.sceneCube = new THREE.Scene();

    const ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

    return ImageUtils.loadCubeMap(cloudy, 512, 512).then((imageUris) => {
      this.reflectionCube = new THREE.CubeTextureLoader().load(imageUris);
      this.reflectionCube.format = THREE.RGBFormat;

      this.refractionCube = new THREE.CubeTextureLoader().load(imageUris);
      this.refractionCube.mapping = THREE.CubeRefractionMapping;
      this.refractionCube.format = THREE.RGBFormat;

      this.viewDirectionProjectionInverse = new THREE.Matrix4();
      const geometry = new THREE.PlaneBufferGeometry(2, 2);
      const uniforms = {
        skybox: {type: "t", value: this.reflectionCube},
        viewDirectionProjectionInverse: {type: "m4", value: this.viewDirectionProjectionInverse}
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);

      const g = new THREE.BoxGeometry(1, 1, 1);
      const m = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const cube = new THREE.Mesh(g, m);
      this.scene.add(cube);
    });
  }

  _onResize(event) {
    this.camera.aspect = event.aspect;
    this.camera.updateProjectionMatrix();

    this.cameraCube.aspect = event.aspect;
    this.cameraCube.updateProjectionMatrix();
  }

  _onPositionUpdate(event) {
    this.mouseX = event.mouseX;
    this.mouseY = event.mouseY;
  }

  render() {
    this.camera.position.x += ( this.mouseX - this.camera.position.x * 10 ) * .001;
    this.camera.position.y += ( -this.mouseY - this.camera.position.y * 10 ) * .0005;

    this.camera.lookAt(this.scene.position);
    this.cameraCube.rotation.copy(this.camera.rotation);

    this.cameraCube.matrixWorldInverse.getInverse(this.cameraCube.matrixWorld);
    this.viewDirectionProjectionInverse.multiplyMatrices(this.cameraCube.projectionMatrix, this.cameraCube.matrixWorldInverse);
    this.viewDirectionProjectionInverse.getInverse(this.viewDirectionProjectionInverse);

    this.renderer.render(this.sceneCube, this.cameraCube);
    this.renderer.render(this.scene, this.camera);
  }
}

export default SkyboxScene;
