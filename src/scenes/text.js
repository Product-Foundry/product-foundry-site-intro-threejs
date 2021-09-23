import overpassBlackFnt from 'url!../fonts/overpass.fnt';
import overpassBlackPng from 'url!../fonts/overpass.png';

import textVs from 'raw!glslify!../shaders/text.vert';
import textFs from 'raw!glslify!../shaders/text.frag';

import * as fontUtils from '../utils/font';

import input from '../input';

import buffer from 'three-buffer-vertex-data';
import createText from 'three-bmfont-text';

const texts = [
  'we build\nPRODUCTS\nfor\nPURPOSE-ORIENTED BRANDS\n',
  'with\nSTRATEGIES\ndeveloped through\nCOMPREHENSIVE RESEARCH\n',
  'for EXPERIENCE and\nSYSTEM DESIGN\n',
  'delivered with\nSOFTWARE, HARDWARE\nand\nMATERIAL ENGINEERING'
];

class TextScene {

  constructor() {
    this.material = undefined;

    this.time = 0;
    this.nextIndex = 0;
  }

  init(renderer, scene) {
    this.scale = 1;

    this.renderer = renderer;
    this.scene = scene;

    input.onResize.add((event) => this._onResize(event));

    return fontUtils.load({font: overpassBlackFnt, image: overpassBlackPng})
      .then((options) => {
        this.font = options.font;
        this.texture = options.texture;
        this.refreshFont();
        this.refreshText();
      });
  }

  _onResize(event) {
    this.scale = event.width / event.height / 1.8;

    this.refreshFont();
    this.refreshText();
  }

  refreshFont() {
    if (!!this.textAnchor) {
      this.scene.remove(this.textAnchor);
    }

    this.geometry = createText({
      text: "",
      font: this.font,
      align: 'center',
      width: 800,
      lineHeight: 56
    });

    this.material = new THREE.RawShaderMaterial({
      vertexShader: textVs,
      fragmentShader: textFs,
      uniforms: {
        animate: {type: 'f', value: 1},
        iGlobalTime: {type: 'f', value: 0},
        map: {type: 't', value: this.texture},
        color: {type: 'c', value: new THREE.Color('#ffffff')}
      },
      transparent: true,
      side: THREE.FrontSide,
      depthTest: false
    });

    this.text = new THREE.Mesh(this.geometry, this.material);

    this.textAnchor = new THREE.Object3D();
    this.textAnchor.add(this.text);

    const mS = (new THREE.Matrix4()).identity();
    mS.elements[0] = this.scale;
    mS.elements[5] = -this.scale;
    mS.elements[10] = -this.scale;
    this.textAnchor.applyMatrix(mS);

    this.scene.add(this.textAnchor);
  }

  refreshText() {
    this.geometry.update(texts[this.nextIndex]);

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

  nextText() {
    this.nextIndex++;
    if (this.nextIndex === texts.length) {
      this.nextIndex = 0;
    }
  }

  render(delta) {
    this.time += delta;
    const duration = 8;
    this.material.uniforms.iGlobalTime.value = this.time;
    this.material.uniforms.animate.value = this.time / duration;

    if (this.time > duration) {
      this.time = 0;
      this.nextText();
      this.refreshText();
    }
  }
}

export default TextScene;
