"use strict";

import { Scene, Sprite, keyPressed } from "../kontra.mjs";
import { db, uid } from "../firebase.mjs";
import {
  ref,
  set,
  onChildChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { joystick } from "../main.mjs"

let player = Sprite({
  x: 100,
  y: 80,
  color: "red",
  width: 32,
  height: 32,
  anchor: { x: 0.5, y: 0.5 },

  update: function (dt) {
    const speed = 400;

    // storing previous values.
    const x = this.x;
    const y = this.y;


    // For PC
    if (keyPressed("w") || keyPressed("2")) this.y -= speed * dt;
    if (keyPressed("s") || keyPressed("8")) this.y += speed * dt;
    if (keyPressed("a") || keyPressed("4")) this.x -= speed * dt;
    if (keyPressed("d") || keyPressed("6")) this.x += speed * dt;
    
    // Lets check direction for phone
    const joyDir = joystick.GetDir()

    switch (joyDir) {
      case "N":
      case "NE":
      case "NW":
        this.y -= speed * dt;
        break;

      case "S":
      case "SE":
      case "SW":
        this.y += speed * dt;
        break;
    }

    switch (joyDir) {
      case "E":
      case "NE":
      case "SE":
        this.x += speed * dt;
        break;

      case "W":
      case "NW":
      case "SW":
        this.x -= speed * dt;
        break;
    }


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
});

export default world;
