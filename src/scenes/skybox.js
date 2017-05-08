import * as imageUtils from '../utils/image';

import input from '../input';

import cloudy from 'file!../textures/cubemap/cloudy.jpg';
import stormy from 'file!../textures/cubemap/stormy.jpg';

import vertexShader from 'raw!../shaders/skybox.vert';
import fragmentShader from 'raw!../shaders/skybox.frag';

const clouds = {
  cloudy: {
    url: cloudy,
    width: 512,
    height: 512
  },
  stormy: {
    url: stormy,
    width: 1024,
    height: 1024
  }
};

const cloudKeys = Object.getOwnPropertyNames(clouds);

const cloud = clouds[cloudKeys[Math.floor(Math.random() * cloudKeys.length)]];

class SkyboxScene {

  constructor() {
    this.cameraCube = undefined;
    this.sceneCube = undefined;

    this.viewDirectionProjectionInverse = undefined;

    this.reflectionCube = undefined;
  }

  init(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    input.onResize.add((event) => this._onResize(event));

    this.cameraCube = new THREE.PerspectiveCamera(75, 1, 1, 100);
    this.sceneCube = new THREE.Scene();

    return imageUtils.loadCubeMap(cloud.url, cloud.width, cloud.height).then((imageUris) => {
      this.reflectionCube = new THREE.CubeTextureLoader().load(imageUris);
      this.reflectionCube.format = THREE.RGBFormat;

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
    });
  }

  _onResize(event) {
    this.cameraCube.aspect = event.aspect;
    this.cameraCube.updateProjectionMatrix();
  }

  render() {
    this.cameraCube.rotation.copy(this.camera.rotation);
    this.cameraCube.matrixWorldInverse.getInverse(this.cameraCube.matrixWorld);
    this.viewDirectionProjectionInverse.multiplyMatrices(this.cameraCube.projectionMatrix, this.cameraCube.matrixWorldInverse);
    this.viewDirectionProjectionInverse.getInverse(this.viewDirectionProjectionInverse);
    this.renderer.render(this.sceneCube, this.cameraCube);
  }
}

export default SkyboxScene;
