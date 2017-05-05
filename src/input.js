import Signal from 'signals';

class Input {

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.onMouseMove = new Signal();
    this.onResize = new Signal();
  }

  init(renderer) {
    this.renderer = renderer;

    document.addEventListener('mousemove', (event) => {
      this.mouseX = (event.clientX - event.target.clientWidth / 2) / 2;
      this.mouseY = (event.clientY - event.target.clientHeight / 2) / 2;
      this.onMouseMove.dispatch({
        mouseX: this.mouseX,
        mouseY: this.mouseY
      });
    });
  }

  update() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth * window.devicePixelRatio;
    const height = canvas.clientHeight * window.devicePixelRatio;

    if (canvas.width !== width || canvas.height !== height) {
      this.renderer.setSize(width, height, false);
      const aspect = width / height;
      this.onResize.dispatch({
        width,
        height,
        aspect
      });
    }
  }
}

const input = new Input();

export default input;
