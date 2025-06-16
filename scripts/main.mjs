"use strict";
import { 
  init, 
  initKeys,
  GameLoop,
} from "./kontra.mjs";

import world from "./scenes/world.mjs"

const initCanvas = () => {
  let { canvas } = init();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas = init().canvas
}

// For initiallizing on any platform
initCanvas()

// For Phone
window.addEventListener("orientationchange", () => {
  initCanvas();
});
// eslint-disable-next-line no-undef
export const joystick = new JoyStick('joyDiv');

initKeys();

let loop = GameLoop({
  update: function (dt) {
    world.update(dt);
  },
  render: function () {
    world.render();
  },
});

loop.start();
