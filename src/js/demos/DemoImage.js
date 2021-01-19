import { Application, Loader, Sprite, Texture } from "pixi.js";
import * as PIXI from "pixi.js";

class DemoImage {

    constructor() {

        console.log("PixiJS Image Demo v0.1");

        this.mainDiv = document.getElementById("div_container");

        this.app = new Application({
            width: 1000,
            height: 1000,
            sharedTicker: true
        });
        this.mainDiv.appendChild(this.app.view);

        this.appTicker = this.app.ticker
        this.appTicker.add(this.onUpdate, this);

        this.appTextures = {};

        this.appLoader = new Loader();

        this.appLoader.add('pixijslogo', 'assets/images/pixi_v3_github-pad.png');

        this.appLoader.load((loader, resources) => {
            this.appTextures.pixijslogo = new Texture(resources.pixijslogo.texture);
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

        this.appTicker.add((time) => {
            this.spPixijslogo.rotation += (360 / 600) * PIXI.DEG_TO_RAD;
        })

        this.app.stage.addChild(this.spPixijslogo);
    }
}

export default DemoImage;
