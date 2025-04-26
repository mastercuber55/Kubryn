"use strict";

import { Scene, Sprite, keyPressed } from "../kontra.mjs";
import { db, uid } from "../firebase.mjs";
import {
  ref,
  set,
  // doesnt work apparently, like it doesnt even trigger. so I just use onChildChanged.
  onValue,
  onChildChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

let player = Sprite({
  x: 100,
  y: 80,
  color: "red",
  width: 32,
  height: 32,
  anchor: { x: 0.5, y: 0.5 },

  update: function (dt) {
    const speed = 400;

    const x = this.x;
    const y = this.y;
    // storing previous values.

    if (keyPressed("w")) this.y -= speed * dt;
    if (keyPressed("s")) this.y += speed * dt;
    if (keyPressed("a")) this.x -= speed * dt;
    if (keyPressed("d")) this.x += speed * dt;

    // syncing position only if position has changed.
    if (x != this.x || y != this.y) this.syncPos();
  },

  syncPos: function () {
    set(ref(db, `players/${uid}`), { x: this.x, y: this.y });
  },
});

let players = {};

onChildChanged(ref(db, "players"), (ss) => {
  const id = ss.key;
  const pos = ss.val();

  if(id == uid) return;

  if (!players[id]) {
    players[id] = Sprite({
      x: 0,
      y: 0,
      color: "orange",
      width: 32,
      height: 32,
      anchor: { x: 0.5, y: 0.5 },
    });

    world.add(players[id])
  }
    players[id].x = pos.x
    players[id].y = pos.y
});

const world = Scene({
  id: "world",
  objects: [player],

  // render() {
  //   Object.values(players).forEach((plr) => plr.render());
  //   player.render();
  // },
});

export default world;
