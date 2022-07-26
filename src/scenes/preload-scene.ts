export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'preload',
    });
  }

  public preload(): void {
    // const load = this.load;

    // this.loadFolder('assets/images/tiles/', [
    //   'grass',
    // ]);

    // this.loadFolder('assets/images/buildings/', [
    //   'water_pump',
    // ]);

    // this.loadFolder('assets/images/conveyor/', [
    //   'conveyor_down',
    // ]);

    // load.on(Phaser.Loader.Events.COMPLETE, this.onAssetsLoaded, this);

    this.onAssetsLoaded();
  }

  // private loadFolder(folderPath: string, keys: string[]) {
  //   const load = this.load;

  //   load.setPath(folderPath);

  //   keys.forEach((key) => {
  //     load.image(key, key + '.png');
  //   });
  // }

  private onAssetsLoaded(): void {
    this.scene.start('game');
  }
}
