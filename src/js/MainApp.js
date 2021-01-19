import Stats from "stats.js";
import DemoCircles from "./demos/DemoCircles";
import DemoImage from "./demos/DemoImage";

class MainApp {

  constructor() {
    this.mainDiv = document.getElementById("div_container");

    this.stats = new Stats();
    this.stats.showPanel(0);
    this.mainDiv.appendChild(this.stats.dom);

    requestAnimationFrame(this.onUpdateStats.bind(this));

    // this.demo = new DemoImage();
    this.demo = new DemoCircles();
  }

  onUpdateStats() {

    this.stats.begin();
    this.stats.end();

    requestAnimationFrame(this.onUpdateStats.bind(this));

  }
}

export default MainApp;
