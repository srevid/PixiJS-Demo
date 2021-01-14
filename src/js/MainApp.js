import _ from "lodash";

//PIXI Import
import { Application, Loader, Sprite, Texture, TilingSprite } from "pixi.js";

//App Import
import Constants from "./data/Constants";
class MainApp {

  constructor() {
    console.log("PixiJS Demo v" + Constants.APP_VERSION);

    this.app = new Application({
      width: Constants.APP_SIZE[ 0 ],
      height: Constants.APP_SIZE[ 1 ],
    });

    this.appTextures = {};

    this.appLoader = new Loader();

    document.body.appendChild(this.app.view);

    this.initApp();
  }

  initApp() {
    // Listen for window resize events
    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.loadInitApp();
  }

  loadInitApp() {

    this.appLoader.add('pixijslogo', 'assets/images/pixi_v3_github-pad.png');

    this.appLoader.load((loader, resources) => {
      this.appTextures.pixijslogo = new Texture(resources.pixijslogo.texture);
      console.log(this.appTextures.pixijslogo);
    });

    // throughout the process multiple signals can be dispatched.
    this.appLoader.onProgress.add(() => { }); // called once per loaded/errored file
    this.appLoader.onError.add(() => { }); // called once per errored file
    this.appLoader.onLoad.add(() => { }); // called once per loaded file
    this.appLoader.onComplete.add(() => {
      this.startDemo();
    }); // called once when the queued resources all load.
  }

  startDemo() {

    this.spPixijslogo = new Sprite(this.appTextures.pixijslogo)
    this.spPixijslogo.anchor.set(0.5);
    this.spPixijslogo.x = this.app.screen.width / 2;
    this.spPixijslogo.y = this.app.screen.height / 2;

    this.app.stage.addChild(this.spPixijslogo);
  }

  /* ------------------ Events Handler ------------------ */
  onWindowResize() {

  }
}

export default MainApp;
