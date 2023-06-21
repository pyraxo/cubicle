import React, { useEffect } from "react";
import Phaser from "phaser";
// import tilemap from "assets/iso-64x64-outside.png";
// import tilemap2 from "assets/iso-64x64-building.png";
// import isorpg from "assets/isorpg.json";
import tilemap from "../../assets/iso-sandbox.png";
import sandbox from "assets/sandbox.json";
import "./style.css";

class CubicleScene extends Phaser.Scene {
  preload() {
    // this.load.image("tiles", tilemap);
    // this.load.image("tiles2", tilemap2);
    // this.load.tilemapTiledJSON("map", isorpg);
    this.load.image("tiles", tilemap);
    this.load.tilemapTiledJSON("map", sandbox);
  }

  create() {
    const map = this.add.tilemap("map");

    // const tileset1 = map.addTilesetImage("iso-64x64-outside", "tiles");
    // const tileset2 = map.addTilesetImage("iso-64x64-building", "tiles2");

    // map.createLayer("Tile Layer 1", [tileset1, tileset2]);
    // map.createLayer("Tile Layer 2", [tileset1, tileset2]);
    // map.createLayer("Tile Layer 3", [tileset1, tileset2]);
    // map.createLayer("Tile Layer 4", [tileset1, tileset2]);
    // map.createLayer("Tile Layer 5", [tileset1, tileset2]);

    const tileset = map.addTilesetImage("isometric-sandbox-sheet", "tiles");
    map.createLayer("Tile Layer 1", [tileset]);

    // this.cameras.main.centerOn(0, 150);
    this.cameras.main.centerOn(0, 150);

    const cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );
  }

  update(time, delta) {
    this.controls.update(delta);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  pixelArt: true,
  parent: "phaser-container",
  scene: CubicleScene,
  transparent: true,
};

const Cubicle = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      // Clean up Phaser game instance if needed
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container" />;
};

export default Cubicle;
