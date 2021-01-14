import './css/style.css';
import MainApp from './js/MainApp.js';  

$(document).ready(function () {
    let wfconfig = {
        active: function () {
            console.log("Google Font Loaded 8");
            setTimeout(function () {
                new MainApp();
            }, 10);
        },
        google: {
            families: ['Delius:400', 'Fredoka One:400', 'Roboto Mono:400']
        }
    };
    WebFont.load(wfconfig);
});