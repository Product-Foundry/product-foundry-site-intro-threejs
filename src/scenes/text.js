import overpassBlackFnt from 'file!../fonts/overpass_black.fnt';
import overpassBlackPng from 'file!../fonts/overpass_black.png';

import textVs from 'raw!glslify!../shaders/text.vert';
import textFs from 'raw!glslify!../shaders/text.frag';

import * as fontUtils from '../utils/font';

import buffer from 'three-buffer-vertex-data';
import createText from 'three-bmfont-text';

const texts = [
  'we BUILD\nREAL-TIME, REAL-LIFE\nSYSTEMS',
  'by COLLABORATING\nWITH COMMUNITIES\nFOR COHERENCE',
  'through IMMERSION\nIN COMPLEXITY',
  'creating SOFTWARE\nAS CULTURAL ARTIFACTS'
];

class TextScene {

  constructor() {
    this.material = undefined;

    this.time = 0;
    this.nextIndex = 0;
  }

  init(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    return fontUtils.load({font: overpassBlackFnt, image: overpassBlackPng})
      .then((options) => {
        this.initFont(options);
      });
  }

  initFont(options) {
    this.geometry = createText({
      text: "test",
      font: options.font,
      align: 'center',
      width: 800,
      lineHeight: 64
    });

    this.material = new THREE.RawShaderMaterial({
      vertexShader: textVs,
      fragmentShader: textFs,
      uniforms: {
        animate: {type: 'f', value: 1},
        iGlobalTime: {type: 'f', value: 0},
        map: {type: 't', value: options.texture},
        color: {type: 'c', value: new THREE.Color('#ffffff')}
      },
      transparent: true,
      side: THREE.FrontSide,
      depthTest: false
    });

    this.text = new THREE.Mesh(this.geometry, this.material);

    const textAnchor = new THREE.Object3D();
    textAnchor.add(this.text);

    const mS = (new THREE.Matrix4()).identity();
    // mS.elements[0] = 1;
    mS.elements[5] = -1;
    mS.elements[10] = -1;
    textAnchor.applyMatrix(mS);

    this.scene.add(textAnchor);

    this.next();
  }

  next() {
    this.geometry.update(texts[this.nextIndex]);

    this.nextIndex++;
    if (this.nextIndex === texts.length) {
      this.nextIndex = 0;
    }

    const lines = this.geometry.visibleGlyphs.map(function (glyph) {
      return glyph.line
    });

    const lineCount = 1 + lines.reduce(function (a, b) {
      return Math.max(a, b)
    }, 0);

    // for each quad, let's give it a vertex attribute with the line index
    const lineData = lines.map(function (line) {
      // map to 0..1 for attribute
      const t = lineCount <= 1 ? 1 : (line / (lineCount - 1));
      // quad - 4 verts
      return [t, t, t, t]
    }).reduce(function (a, b) {
      return a.concat(b)
    }, []);

    // update the "line" vertex attribute
    buffer.attr(this.geometry, 'line', lineData, 1);

    // center the text
    const layout = this.geometry.layout;
    this.text.position.x = -layout.width / 2;
    this.text.position.y = layout.height / 2;
  }

  render(delta) {
    this.time += delta;
    const duration = 8;
    this.material.uniforms.iGlobalTime.value = this.time;
    this.material.uniforms.animate.value = this.time / duration;

    if (this.time > duration) {
      this.time = 0;
      this.next();
    }
  }
}

export default TextScene;
