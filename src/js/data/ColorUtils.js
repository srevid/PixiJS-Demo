class ColorUtils {
    static hex(c) {
        var s = "0123456789abcdef";
        var i = parseInt(c);
        if (i == 0 || isNaN(c))
            return "00";
        i = Math.round(Math.min(Math.max(0, i), 255));
        return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
    }

    /* Convert an RGB triplet to a hex string */
    static convertToHex(rgb) {
        return ColorUtils.hex(rgb[ 0 ]) + ColorUtils.hex(rgb[ 1 ]) + ColorUtils.hex(rgb[ 2 ]);
    }

    /* Remove '#' in color hex string */
    static trim(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

    /* Convert a hex string to an RGB triplet */
    static convertToRGB(hex) {
        var color = [];
        color[ 0 ] = parseInt((ColorUtils.trim(hex)).substring(0, 2), 16);
        color[ 1 ] = parseInt((ColorUtils.trim(hex)).substring(2, 4), 16);
        color[ 2 ] = parseInt((ColorUtils.trim(hex)).substring(4, 6), 16);
        return color;
    }

    static padToTwo(numberString) {
        if (numberString.length < 2) {
            numberString = '0' + numberString;
        }
        return numberString;
    }

    static hexAverage() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function (previousValue, currentValue) {
            return currentValue
                .replace(/^#/, '')
                .match(/.{2}/g)
                .map(function (value, index) {
                    return previousValue[ index ] + parseInt(value, 16);
                });
        }, [ 0, 0, 0 ])
            .reduce(function (previousValue, currentValue) {
                return previousValue + ColorUtils.padToTwo(Math.floor(currentValue / args.length).toString(16));
            }, '#');
    }

    static hexToString(hex) {
        return hex.replace("#", "0x");
    }
}

export default ColorUtils;