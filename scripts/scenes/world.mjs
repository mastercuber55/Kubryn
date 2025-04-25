'use strict';

import { Scene, Sprite, keyPressed, initKeys } from "../kontra.mjs";

let player = Sprite({
  x: 100,
  y: 80,
  color: "red",
  width: 32,
  height: 32,
  anchor: { x: 0.5, y: 0.5 },

  update: function(dt) {
    const speed = 400

    if (keyPressed('w')) this.y -= speed * dt;
    if (keyPressed('s')) this.y += speed * dt;
    if (keyPressed('a')) this.x -= speed * dt;
    if (keyPressed('d')) this.x += speed * dt;
  }
});

const world = Scene({
  id: "world",
  objects: [player],
});

export default world;
