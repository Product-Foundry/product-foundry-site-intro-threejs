import overpassBlack from 'file!../fonts/overpass_black-regular.typeface.json';

const text = "we BUILD\nREAL-TIME, REAL-LIFE\nSOFTWARE",
  height = 8,
  size = 48,
  fontName = "overpass",
  fontWeight = "black-regular";

class TextScene {

  constructor() {
    this.font = undefined;
    this.textMesh = undefined;
    this.textMaterial = undefined;
  }

  init(renderer, scene, skybox) {
    this.renderer = renderer;
    this.scene = scene;

    this.textMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      envMap: skybox.reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.8
    });

    this.group = new THREE.Group();
    this.group.position.y = -20;
    this.scene.add(this.group);

    this.loadFont();
  }

  loadFont() {
    const loader = new THREE.FontLoader();
    loader.load(overpassBlack, (response) => {
      this.font = response;
      this.refreshText();
    });
  }

  refreshText() {
    this.group.remove(this.textMesh);
    if (!text) return;
    this.createText();
  }

  createText() {
    let xMid, yMid;
    const textShape = new THREE.BufferGeometry();

    const shapes = this.font.generateShapes(text, size, height);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    xMid = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    yMid = 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );
    geometry.translate(xMid, yMid, 100);
    // make shape ( N.B. edge view not visible )
    textShape.fromGeometry(geometry);
    this.textMesh = new THREE.Mesh(textShape, this.textMaterial);

    this.group.add(this.textMesh);
  }
}

export default TextScene;
