"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoader = /** @class */ (function () {
    function ImageLoader() {
        this._loaded = 0;
        this._nbToload = 0;
        this._images = [];
        this._isAllLoaded = false;
    }
    ImageLoader.prototype.preload = function (callback) {
        var _this = this;
        var imageUrls = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            imageUrls[_i - 1] = arguments[_i];
        }
        this._loaded = 0;
        this._isAllLoaded = false;
        this._images = [];
        this._nbToload = imageUrls.length;
        var i = imageUrls.length;
        while (i--) {
            this._images[i] = new Image();
            this._images[i].onload = this._images[i].onerror = this._images[i].onabort = function () {
                // Callback when images loaded.
                _this._loaded += 1;
                if (_this._loaded === imageUrls.length && callback) {
                    _this._isAllLoaded = true;
                    callback(_this._images);
                }
            };
            this._images[i].src = imageUrls[i];
        }
    };
    Object.defineProperty(ImageLoader.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "nbToload", {
        get: function () {
            return this._nbToload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "isAllLoaded", {
        get: function () {
            return this._isAllLoaded;
        },
        enumerable: true,
        configurable: true
    });
    return ImageLoader;
}());
exports.ImageLoader = ImageLoader;
//# sourceMappingURL=../../src/src/resource/image-loader.js.map