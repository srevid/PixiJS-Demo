import _ from "lodash";
import chroma from "chroma-js";
import { cos, sin } from "mathjs";
import { Application, Container, Graphics } from "pixi.js";
import * as PIXI from "pixi.js";

class DemoCircles {
    constructor() {
        //125 largeur/hauteur carré

        this.nbrXCases = 8;
        this.nbrYCases = 8;

        this.appWidth = 1000;
        this.appHeight = 1000;

        this.dotColor = "0xFFFAF0";
        this.circleIndicatorXColor = chroma.scale([ '#48EDFA', '#FADF2F', '#FA169E' ]).mode('lch').colors(this.nbrXCases);
        this.circleIndicatorYColor = chroma.scale([ '#AB17E6', '#84E62E', '#4561E6' ]).mode('lch').colors(this.nbrYCases);

        this.colorsIndicator = [];
        this.dotsIndicator = [];
        this.dots = [];
        this.dotsDraw = [];

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

        this.testContainer = new Container();
        this.app.stage.addChild(this.testContainer);

        this.createZones();
        this.createCircleIndicator();
        this.createDots();
        this.app.ticker.add(this.onDrawDotsIndicator, this);

        this.timeElapse = 0;
        this.degree = 0;

        // this.app.ticker.add(this.drawSample, this);
        // this.drawSample();
    }

    drawSample() {
        let _foo = new Graphics();
        _foo.beginFill('0xFF0000');
        _foo.drawRect(0, 0, 150, 150);

        let _texture = this.app.renderer.generateTexture(_foo);
        let _sprite = new PIXI.Sprite(_texture);
        _sprite.x = 150 * Math.random();
        _sprite.y = 150 * Math.random();
        this.app.stage.addChild(_sprite);
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
        for (let i = 1; i < this.nbrXCases; i++) {

            let _color = PIXI.utils.string2hex(this.circleIndicatorXColor[ i - 1 ]);
            let _circleIndicatorX = new Graphics();
            _circleIndicatorX.lineStyle(2.5, _color, 1);
            _circleIndicatorX.drawCircle(this.widthZone / 2, this.heightZone / 2, 50);
            this.zones[ i ].addChild(_circleIndicatorX);
            this.colorsIndicator[ i ] = _color;

            _color = PIXI.utils.string2hex(this.circleIndicatorYColor[ i - 1 ]);
            let _circleIndicatorY = new Graphics();
            _circleIndicatorY.lineStyle(2.5, _color, 1);
            _circleIndicatorY.drawCircle(this.widthZone / 2, this.heightZone / 2, 50);
            this.zones[ (i * this.nbrXCases) ].addChild(_circleIndicatorY);
            this.colorsIndicator[ (i * this.nbrXCases) ] = _color;

            let _dotIndicatorX = new Graphics();
            _dotIndicatorX.beginFill(this.dotColor, 1);
            _dotIndicatorX.drawCircle(0, 0, 4);
            _dotIndicatorX.degree = 0;
            this.dotsIndicator[ i ] = _dotIndicatorX;
            this.zones[ i ].addChild(_dotIndicatorX);

            let _dotIndicatorY = new Graphics();
            _dotIndicatorY.beginFill(this.dotColor, 1);
            _dotIndicatorY.drawCircle(0, 0, 4);
            _dotIndicatorY.degree = 0;
            this.dotsIndicator[ i * this.nbrXCases ] = _dotIndicatorY;
            this.zones[ i * this.nbrXCases ].addChild(_dotIndicatorY);
        }
    }

    createDots() {
        for (let i = 1; i < this.nbrXCases; i++) {
            for (let k = 1; k < this.nbrYCases; k++) {
                let _dot = new Graphics();
                _dot.beginFill(this.dotColor, 1);
                _dot.drawCircle(0, 0, 3);
                this.zones[ k + (i * this.nbrXCases) ].addChild(_dot);
                this.dots[ k + (i * this.nbrXCases) ] = _dot;
                this.dots[ k + (i * this.nbrXCases) ].x = this.widthZone / 2 + 50;
                this.dots[ k + (i * this.nbrXCases) ].y = this.heightZone / 2;

                let _colorDotDraw = PIXI.utils.string2hex(chroma.mix(
                    PIXI.utils.hex2string(this.colorsIndicator[ i ]),
                    PIXI.utils.hex2string(this.colorsIndicator[ k * this.nbrXCases ])).hex());

                let _dotDraw = new Graphics();
                _dotDraw.colorFill = _colorDotDraw;
                _dotDraw.lineStyle(2.5, _dotDraw.colorFill);
                this.dotsDraw[ k + (i * this.nbrXCases) ] = _dotDraw;
                this.zones[ k + (i * this.nbrXCases) ].addChild(_dotDraw);
            }
        }
    }

    generateSpriteFromGraphics(_graphics, _index) {

        let _texture = this.app.renderer.generateTexture(_graphics, PIXI.SCALE_MODES, window.devicePixelRatio, new PIXI.Rectangle(0, 0, this.widthZone, this.heightZone));
        let _sprite = new PIXI.Sprite(_texture);
        this.zones[ _index ].addChild(_sprite);

        // this.app.ticker.remove(this.onDrawDotsIndicator, this);
    }

    /* ------------------ Update ------------------ */

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

            this.dotsIndicator[ i * this.nbrXCases ].x = this.widthZone / 2 + _x;
            this.dotsIndicator[ i * this.nbrXCases ].y = this.heightZone / 2 + _y;

            for (let k = 1; k < this.nbrYCases; k++) {

                let _dot = this.dots[ k + (i * this.nbrXCases) ];

                this.onMoveToIllustration(this.dotsDraw[ k + (i * this.nbrXCases) ], _dot.x, _dot.y);

                _dot.x = this.dotsIndicator[ k ].x
                _dot.y = this.dotsIndicator[ i * this.nbrXCases ].y

                this.onLineToIllustration(this.dotsDraw[ k + (i * this.nbrXCases) ], _dot.x, _dot.y);
            }
        }
    }

    onCleanDrawIllustration() {
        for (let i = 1; i < this.nbrXCases; i++) {
            for (let k = 1; k < this.nbrYCases; k++) {
                let _dotDraw = this.dotsDraw[ k + (i * this.nbrXCases) ];

                this.zones[ k + i * this.nbrXCases ].removeChild(_dotDraw);
                this.generateSpriteFromGraphics(_dotDraw, k + i * this.nbrXCases);
                this.zones[ k + i * this.nbrXCases ].addChild(_dotDraw);


                _dotDraw.clear();
                _dotDraw.lineStyle(2.5, _dotDraw.colorFill);

                console.log(this.zones[ k + i * this.nbrXCases ].children.length);
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