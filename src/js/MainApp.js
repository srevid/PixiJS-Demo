import _ from "lodash";

//PIXI Import
import { Application } from "pixi.js";

//App Import
import Constants from "./data/Constants";

class MainApp
{
  constructor()
  {
    this.app = new Application({
      width: Constants.APP_SIZE[0],
      height: Constants.APP_SIZE[1],
    });

    document.body.appendChild(this.app.view);

    // Listen for window resize events
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize()
  {

  }
}

export default MainApp;
