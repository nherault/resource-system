"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var resourceReloaderOptionDefault = {
    assetsPrefix: "",
    forceReloadModifier: "?",
    intervalTime: 2000,
    resourceTypesException: []
};
var ResourceReloaderDefault = /** @class */ (function () {
    function ResourceReloaderDefault() {
        this.options = __assign({}, resourceReloaderOptionDefault);
    }
    ResourceReloaderDefault.prototype.forceReload = function (resourceSystem, options) {
        var _this = this;
        this.options = options ? __assign({}, this.options, options) : this.options;
        return window.setInterval(function () {
            if (resourceSystem.isAllLoaded()) {
                var resourcesInputDebug = resourceSystem.getResourcesInput().map(function (resource) {
                    if (_this.options.resourceTypesException.indexOf(resource.type) === -1) {
                        return _this.generate(resource);
                    }
                    return resource;
                });
                resourceSystem.loadResources.apply(resourceSystem, resourcesInputDebug);
            }
        }, this.options.intervalTime);
    };
    ResourceReloaderDefault.prototype.generate = function (resource) {
        var now = Date.now();
        var resourceCopy = JSON.parse(JSON.stringify(resource));
        if (this.options.assetsPrefix) {
            resourceCopy.source = this.options.assetsPrefix + resourceCopy.source + this.options.forceReloadModifier + now;
        }
        else {
            resourceCopy.source = resourceCopy.source + this.options.forceReloadModifier + now;
        }
        return resourceCopy;
    };
    return ResourceReloaderDefault;
}());
exports.ResourceReloaderDefault = ResourceReloaderDefault;
//# sourceMappingURL=../../src/src/resource/resource-reloader.js.map