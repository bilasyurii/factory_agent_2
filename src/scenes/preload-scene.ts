export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });
  }

  public preload(): void {
    const load = this.load;

    this.loadFolder("assets/images/tiles/", [
      "platform",
    ]);

    this.loadFolder("assets/images/buildings/", [
      "assembly_orange",
      "mine_iron",
    ]);

    load.on(Phaser.Loader.Events.COMPLETE, this.onAssetsLoaded, this);
  }

  private loadFolder(folderPath: string, keys: string[]) {
    const load = this.load;

    load.setPath(folderPath);

    keys.forEach((key) => {
      load.image(key, key + ".png");
    });
  }

  private onAssetsLoaded(): void {
    this.scene.start("game");
  }
}
