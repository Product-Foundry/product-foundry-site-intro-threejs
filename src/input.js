import Signal from 'signals';

class Input {

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.windowHalfX = 0;
    this.windowHalfY = 0;

    this.onPositionUpdate = new Signal();
    this.onResize = new Signal();
  }

  init(renderer) {
    this.renderer = renderer;

    document.addEventListener('mousemove', (event) => this._onMouseMove(event));
    document.addEventListener('touchstart', (event) => this._onTouchEvent(event), false);
    document.addEventListener('touchmove', (event) => this._onTouchEvent(event), false);
  }

  _onMouseMove(event) {
    this.mouseX = (event.clientX - event.target.clientWidth / 2) / 2;
    this.mouseY = (event.clientY - event.target.clientHeight / 2) / 2;
    this.onPositionUpdate.dispatch({
      mouseX: this.mouseX,
      mouseY: this.mouseY,
    });
  }

  _onTouchEvent(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;

      this.onPositionUpdate.dispatch({
        mouseX: this.mouseX,
        mouseY: this.mouseY,
      });
    }
  }

  update() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth * window.devicePixelRatio;
    const height = canvas.clientHeight * window.devicePixelRatio;

    if (canvas.width !== width || canvas.height !== height) {
      this.renderer.setSize(width, height, false);

      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;

      const aspect = width / height;

      this.onResize.dispatch({
        width,
        height,
        aspect,
        windowHalfX: this.windowHalfX,
        windowHalfY: this.windowHalfY
      });
    }
  }
}

const input = new Input();

export default input;
