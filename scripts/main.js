"use strict";
import { 
  init, 
  initKeys,
  GameLoop,
} from "./kontra.mjs";

import world from "./scenes/world.mjs"

let { canvas } = init();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas = init().canvas
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
