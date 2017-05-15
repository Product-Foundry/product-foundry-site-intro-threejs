import * as imageUtils from '../utils/image';
import * as urlUtils from '../utils/url';

import input from '../input';

import brokenclouds from 'file!../textures/cubemap/brokenclouds.jpg';
import brokenclouds_night from 'file!../textures/cubemap/brokenclouds-night.jpg';

import clearsky from 'file!../textures/cubemap/clearsky.jpg';
import clearsky_night from 'file!../textures/cubemap/clearsky-night.jpg';

import cloudy from 'file!../textures/cubemap/cloudy.jpg';

import fewclouds from 'file!../textures/cubemap/fewclouds.jpg';
import fewclouds_night from 'file!../textures/cubemap/fewclouds-night.jpg';

import mist from 'file!../textures/cubemap/mist.jpg';
import mist_night from 'file!../textures/cubemap/mist-night.jpg';

import rain from 'file!../textures/cubemap/rain.jpg';
import rain_night from 'file!../textures/cubemap/rain-night.jpg';

import scatteredclouds from 'file!../textures/cubemap/scatteredclouds.jpg';
import scatteredclouds_night from 'file!../textures/cubemap/scatteredclouds-night.jpg';

import showerrain from 'file!../textures/cubemap/showerrain.jpg';
import showerrain_night from 'file!../textures/cubemap/showerrain-night.jpg';

import snow from 'file!../textures/cubemap/snow.jpg';
import snow_night from 'file!../textures/cubemap/snow-night.jpg';

import stormy from 'file!../textures/cubemap/stormy.jpg';

import thunderstorm from 'file!../textures/cubemap/thunderstorm.jpg';
import thunderstorm_night from 'file!../textures/cubemap/thunderstorm-night.jpg';

import vertexShader from 'raw!../shaders/skybox.vert';
import fragmentShader from 'raw!../shaders/skybox.frag';

const skyboxes = {
  day: {
    brokenclouds : {
      url: brokenclouds,
      width: 1024,
      height: 1024,
    },
    clearsky : {
      url: clearsky,
      width: 1024,
      height: 1024,
    },
    cloudy: {
      url: cloudy,
      width: 512,
      height: 512
    },
    fewclouds : {
      url: fewclouds,
      width: 1024,
      height: 1024,
    },
    mist : {
      url: mist,
      width: 1024,
      height: 1024,
    },
    scatteredclouds : {
      url: scatteredclouds,
      width: 1024,
      height: 1024,
    },
    rain: {
      url: rain,
      width: 1024,
      height: 1024
    },
    showerrain: {
      url: showerrain,
      width: 1024,
      height: 1024
    },
    snow: {
      url: snow,
      width: 1024,
      height: 1024
    },
    stormy: {
      url: stormy,
      width: 1024,
      height: 1024
    },
    thunderstorm: {
      url: thunderstorm,
      width: 1024,
      height: 1024
    }
  },
  night: {
    brokenclouds: {
      url: brokenclouds_night,
      width: 1024,
      height: 1024
    },
    clearsky: {
      url: clearsky_night,
      width: 1024,
      height: 1024
    },
    fewclouds: {
      url: fewclouds_night,
      width: 1024,
      height: 1024
    },
    mist: {
      url: mist_night,
      width: 1024,
      height: 1024
    },
    rain: {
      url: rain_night,
      width: 1024,
      height: 1024
    },
    scatteredclouds: {
      url: scatteredclouds_night,
      width: 1024,
      height: 1024
    },
    showerrain: {
      url: showerrain_night,
      width: 1024,
      height: 1024
    },
    snow: {
      url: snow_night,
      width: 1024,
      height: 1024
    },
    thunderstorm: {
      url: thunderstorm_night,
      width: 1024,
      height: 1024
    }
  }
};

function getSkybox() {
  let time = urlUtils.getParameterByName('time');
  const possibleTimes = Object.getOwnPropertyNames(skyboxes);
  if (!time || !possibleTimes.includes(time)) {
    const hour = (new Date()).getHours();
    if (hour > 6 && hour < 23) {
      time = 'day'
    } else {
      time = 'night';
    }
  }

  const skyboxDefinitions = skyboxes[time];
  const skyboxNames = Object.getOwnPropertyNames(skyboxDefinitions);
  let skyBoxName = urlUtils.getParameterByName('skybox');
  if (!skyBoxName || !skyboxNames.includes(skyBoxName)) {
    skyBoxName = skyboxNames[Math.floor(Math.random() * skyboxNames.length)];
  }

  return skyboxDefinitions[skyBoxName];
}

const cloud = getSkybox();

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
