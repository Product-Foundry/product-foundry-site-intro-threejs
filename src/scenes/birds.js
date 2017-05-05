import GPUComputationRenderer from '../lib/GPUComputationRenderer';

import * as THREE from 'three/build/three';

import input from '../input';

import fragmentShaderVelocity from '../shaders/bird-velocity.frag';
import fragmentShaderPosition from '../shaders/bird-position.frag';
import fragmentShader from '../shaders/bird-geometry.frag';
import vertexShader from '../shaders/bird.vert';

const BIRDS_SIZE = 32;
const BIRDS_BOUNDS = 800;
const BIRDS_BOUNDS_HALF = BIRDS_BOUNDS / 2;

const BIRDS_COUNT = BIRDS_SIZE * BIRDS_SIZE;

class BirdGeometry extends THREE.BufferGeometry {

  constructor() {
    super();

    const triangles = BIRDS_COUNT * 3;
    const points = triangles * 3;
    const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    const references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
    const birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);
    this.addAttribute('position', vertices);
    this.addAttribute('birdColor', birdColors);
    this.addAttribute('reference', references);
    this.addAttribute('birdVertex', birdVertex);
    // this.addAttribute( 'normal', new Float32Array( points * 3 ), 3 );

    let verticesIndex = 0;

    function verticesPush() {
      for (let i = 0; i < arguments.length; i++) {
        vertices.array[verticesIndex++] = arguments[i];
      }
    }

    const wingsSpan = 10;
    for (let f = 0; f < BIRDS_COUNT; f++) {
      // Body
      verticesPush(
        0, -0, -20,
        0, 4, -20,
        0, 0, 30
      );
      // Left Wing
      verticesPush(
        0, 0, -15,
        -wingsSpan, 0, 0,
        0, 0, 15
      );
      // Right Wing
      verticesPush(
        0, 0, 15,
        wingsSpan, 0, 0,
        0, 0, -15
      );
    }
    for (let v = 0; v < triangles * 3; v++) {
      const i = ~~(v / 3);
      const x = (i % BIRDS_SIZE) / BIRDS_SIZE;
      const y = ~~(i / BIRDS_SIZE) / BIRDS_SIZE;
      const c = new THREE.Color(
        0x222222 + ~~(v / 9) / BIRDS_COUNT * 0x444444
      );

      birdColors.array[v * 3] = c.r;
      birdColors.array[v * 3 + 1] = c.g;
      birdColors.array[v * 3 + 2] = c.b;
      references.array[v * 2] = x;
      references.array[v * 2 + 1] = y;
      birdVertex.array[v] = v % 9;
    }
    this.scale(0.2, 0.2, 0.2);
  }
}

class BirdsScene {

  constructor() {
    this.gpuCompute = undefined;
    this.velocityVariable = undefined;
    this.positionVariable = undefined;
    this.positionUniforms = undefined;
    this.velocityUniforms = undefined;
    this.birdUniforms = undefined;
  }

  init(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    input.onResize.add((event) => this._onResize(event));
    input.onPositionUpdate.add((event) => this._onPositionUpdate(event));

    this._initComputeRenderer();
    this._initBirds();
  }

  _initComputeRenderer() {
    this.gpuCompute = new GPUComputationRenderer(BIRDS_SIZE, BIRDS_SIZE, this.renderer);
    const dtPosition = this.gpuCompute.createTexture();
    const dtVelocity = this.gpuCompute.createTexture();
    BirdsScene._fillPositionTexture(dtPosition);
    BirdsScene._fillVelocityTexture(dtVelocity);
    this.velocityVariable = this.gpuCompute.addVariable("textureVelocity", fragmentShaderVelocity, dtVelocity);
    this.positionVariable = this.gpuCompute.addVariable("texturePosition", fragmentShaderPosition, dtPosition);
    this.gpuCompute.setVariableDependencies(this.velocityVariable, [this.positionVariable, this.velocityVariable]);
    this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable, this.velocityVariable]);
    this.positionUniforms = this.positionVariable.material.uniforms;
    this.velocityUniforms = this.velocityVariable.material.uniforms;
    this.positionUniforms.time = {value: 0.0};
    this.positionUniforms.delta = {value: 0.0};
    this.velocityUniforms.time = {value: 1.0};
    this.velocityUniforms.delta = {value: 0.0};
    this.velocityUniforms.testing = {value: 1.0};
    this.velocityUniforms.seperationDistance = {value: 20.0};
    this.velocityUniforms.alignmentDistance = {value: 20.0};
    this.velocityUniforms.cohesionDistance = {value: 50.0};
    this.velocityUniforms.freedomFactor = {value: 0.75};
    this.velocityUniforms.predator = {value: new THREE.Vector3()};
    this.velocityVariable.material.defines.BOUNDS = BIRDS_BOUNDS.toFixed(2);
    this.velocityVariable.wrapS = THREE.RepeatWrapping;
    this.velocityVariable.wrapT = THREE.RepeatWrapping;
    this.positionVariable.wrapS = THREE.RepeatWrapping;
    this.positionVariable.wrapT = THREE.RepeatWrapping;
    const error = this.gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
  }

  static _fillPositionTexture(texture) {
    const theArray = texture.image.data;
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() * BIRDS_BOUNDS - BIRDS_BOUNDS_HALF;
      const y = Math.random() * BIRDS_BOUNDS - BIRDS_BOUNDS_HALF;
      const z = Math.random() * BIRDS_BOUNDS - BIRDS_BOUNDS_HALF;
      theArray[k] = x;
      theArray[k + 1] = y;
      theArray[k + 2] = z;
      theArray[k + 3] = 1;
    }
  }

  static _fillVelocityTexture(texture) {
    const theArray = texture.image.data;
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;
      theArray[k] = x * 10;
      theArray[k + 1] = y * 10;
      theArray[k + 2] = z * 10;
      theArray[k + 3] = 1;
    }
  }

  _initBirds() {
    const geometry = new BirdGeometry();

    // For Vertex and Fragment
    this.birdUniforms = {
      color: {value: new THREE.Color(0xff2200)},
      texturePosition: {value: null},
      textureVelocity: {value: null},
      time: {value: 1.0},
      delta: {value: 0.0}
    };

    // ShaderMaterial
    const material = new THREE.ShaderMaterial({
      uniforms: this.birdUniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide
    });

    const birdMesh = new THREE.Mesh(geometry, material);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();
    this.scene.add(birdMesh);
  }

  _onResize(event) {
    this.windowHalfX = event.windowHalfX;
    this.windowHalfY = event.windowHalfY;
  }

  _onPositionUpdate(event) {
    this.mouseX = event.mouseX;
    this.mouseY = event.mouseY;
  }

  render(delta, time) {
    this.positionUniforms.time.value = time;
    this.positionUniforms.delta.value = delta;
    this.velocityUniforms.time.value = time;
    this.velocityUniforms.delta.value = delta;
    this.birdUniforms.time.value = time;
    this.birdUniforms.delta.value = delta;
    this.velocityUniforms.predator.value.set(0.5 * this.mouseX / this.windowHalfX, -0.5 * this.mouseY / this.windowHalfY, 0);
    this.gpuCompute.compute();
    this.birdUniforms.texturePosition.value = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture;
    this.birdUniforms.textureVelocity.value = this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture;
  }
}

export default BirdsScene;
