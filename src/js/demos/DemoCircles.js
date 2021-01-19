import { cos, sin } from "mathjs";
import { Application, Container, Graphics } from "pixi.js";
import * as PIXI from "pixi.js";
import Utils from "../data/Utils";
import Gradient from "javascript-color-gradient";
import Rainbow from "./../Utils/Rainbow";
import ColorUtils from "../data/ColorUtils";

class DemoCircles {
    constructor() {
        //125 largeur/hauteur carré

        this.nbrXCases = 8;
        this.nbrYCases = 8;

        this.appWidth = 1000;
        this.appHeight = 1000;

        this.widthZone = this.appWidth / this.nbrXCases;
        this.heightZone = this.appHeight / this.nbrYCases;

        this.mainDiv = document.getElementById("div_container");

        this.app = new Application({
            width: this.appWidth,
            height: this.appHeight,
            sharedTicker: true,
            antialias: true
        });

        this.mainDiv.appendChild(this.app.view);

        this.createZones();
        this.createCircleIndicator();
        this.createDots();

        this.app.ticker.add(this.onDrawDotsIndicator, this);
        this.timeElapse = 0;
        this.degree = 0;

        let _colorA = 0xFF0000;
        let _colorB = 0x0000FF;
        console.log(ColorUtils.hexAverage("#FF0000", "#0000FF"));
    }

    onTestTicker(deltaTime) {
        console.log(deltaTime);
    }

    createZones() {
        this.zones = [];

        for (let iY = 0; iY < this.nbrYCases; iY++) {
            for (let iX = 0; iX < this.nbrYCases; iX++) {

                let _container = new Container();
                _container.x = (this.app.screen.width / this.nbrXCases) * iX;
                _container.y = (this.app.screen.height / this.nbrYCases) * iY;
                this.zones.push(_container);
                this.app.stage.addChild(_container);

                let _graphics = new Graphics();
                let _backgroundColorRandom = '0x' + (Math.random() * 0xFFFFFF << 0).toString(16);
                let _backgroundColor = '0x282D38';
                _graphics.beginFill(_backgroundColor);
                _graphics.lineStyle(2.5, 0xA8BD77, 0.1);
                _graphics.drawRect(0, 0, this.widthZone, this.heightZone);
                _container.addChild(_graphics);
            }
        }
    }

    createCircleIndicator() {
        this.colorsIndicator = [];
        this.dotsIndicator = [];
        this.dots = [];
        this.dotsDraw = [];

        let _rainbowX = new Rainbow();
        _rainbowX.setNumberRange(1, this.nbrXCases - 1);
        _rainbowX.setSpectrum('green', 'red');

        let _rainbowY = new Rainbow();
        _rainbowY.setNumberRange(1, this.nbrYCases - 1);
        _rainbowY.setSpectrum('blue', 'yellow');

        for (let i = 1; i < this.nbrXCases; i++) {

            let _color = "0x" + _rainbowX.colourAt(i);
            let _circleIndicatorX = new Graphics();
            _circleIndicatorX.lineStyle(2.5, _color, 1);
            _circleIndicatorX.drawCircle(this.widthZone / 2, this.heightZone / 2, 50);
            this.zones[ i ].addChild(_circleIndicatorX);
            this.colorsIndicator[ i ] = _color;

            _color = "0x" + _rainbowY.colourAt(i);
            let _circleIndicatorY = new Graphics();
            _circleIndicatorY.lineStyle(2.5, _color, 1);
            _circleIndicatorY.drawCircle(this.widthZone / 2, this.heightZone / 2, 50);
            this.zones[ (i * 8) ].addChild(_circleIndicatorY);
            this.colorsIndicator[ (i * 8) ] = _color;

            let _dotIndicatorX = new Graphics();
            _dotIndicatorX.beginFill(0xFFFAF0, 1);
            _dotIndicatorX.drawCircle(0, 0, 4);
            _dotIndicatorX.degree = 0;
            this.dotsIndicator[ i ] = _dotIndicatorX;
            this.zones[ i ].addChild(_dotIndicatorX);

            let _dotIndicatorY = new Graphics();
            _dotIndicatorY.beginFill(0xFFFAF0, 1);
            _dotIndicatorY.drawCircle(0, 0, 4);
            _dotIndicatorY.degree = 0;
            this.dotsIndicator[ i * 8 ] = _dotIndicatorY;
            this.zones[ i * 8 ].addChild(_dotIndicatorY);
        }
    }

    createDots() {
        for (let i = 1; i < this.nbrXCases; i++) {
            for (let k = 1; k < this.nbrYCases; k++) {
                let _dot = new Graphics();
                _dot.beginFill(0xFFFAF0, 1);
                _dot.drawCircle(0, 0, 3);
                this.zones[ k + (i * 8) ].addChild(_dot);
                this.dots[ k + (i * 8) ] = _dot;
                this.dots[ k + (i * 8) ].x = this.widthZone / 2 + 50;
                this.dots[ k + (i * 8) ].y = this.heightZone / 2;

                let _dotDraw = new Graphics();
                _dotDraw.colorFill = ColorUtils.hexAverage(
                    this.colorsIndicator[ i ].replace("0x", "#"),
                    this.colorsIndicator[ k * 8 ].replace("0x", "#")).replace("#", "0x")
                _dotDraw.lineStyle(2.5, _dotDraw.colorFill);
                this.dotsDraw[ k + (i * 8) ] = _dotDraw;
                this.zones[ k + (i * 8) ].addChild(_dotDraw);
            }
        }
    }

    onDrawDotsIndicator(deltaTime) {

        if (this.timeElapse > 2500) {
            this.timeElapse = 0;
            this.onCleanDrawIllustration();
        }
        this.timeElapse += this.app.ticker.elapsedMS;

        for (let i = 1; i < this.nbrXCases; i++) {
            this.dotsIndicator[ i ].degree += (360 / (60 * ((10 / i) * this.app.ticker.deltaTime))) * PIXI.DEG_TO_RAD;

            let _x = cos(this.dotsIndicator[ i ].degree) * 50;
            let _y = sin(this.dotsIndicator[ i ].degree) * 50;

            this.dotsIndicator[ i ].x = this.widthZone / 2 + _x;
            this.dotsIndicator[ i ].y = this.heightZone / 2 + _y;

            this.dotsIndicator[ i * 8 ].x = this.widthZone / 2 + _x;
            this.dotsIndicator[ i * 8 ].y = this.heightZone / 2 + _y;

            for (let k = 1; k < this.nbrYCases; k++) {

                let _dot = this.dots[ k + (i * 8) ];

                this.onMoveToIllustration(this.dotsDraw[ k + (i * 8) ], _dot.x, _dot.y);

                _dot.x = this.dotsIndicator[ k ].x
                _dot.y = this.dotsIndicator[ i * 8 ].y

                this.onLineToIllustration(this.dotsDraw[ k + (i * 8) ], _dot.x, _dot.y);
            }
        }
    }

    onCleanDrawIllustration() {
        for (let i = 1; i < this.nbrXCases; i++) {
            for (let k = 1; k < this.nbrYCases; k++) {
                let _dotDraw = this.dotsDraw[ k + (i * 8) ];
                _dotDraw.clear();
                _dotDraw.lineStyle(2.5, _dotDraw.colorFill);
            }
        }
    }

    onMoveToIllustration(_dotIllustration, _x, _y) {
        if (_x != NaN && _x != 0) {
            _dotIllustration.moveTo(
                _x,
                _y
            )
        }
    }

    onLineToIllustration(_dotIllustration, _x, _y) {
        if (_x != NaN && _x != 0) {
            _dotIllustration.lineTo(
                _x,
                _y
            )
        }
    }
}

export default DemoCircles;