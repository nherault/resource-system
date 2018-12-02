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
var defaultOptions = {
    autoReload: false,
    forceReload: false,
    loaderNotDefineMessage: "Loader not define for type",
    loadResourceAlreadyInProgress: "Load Resources already in progress !",
};
var ResourceSystemDefault = /** @class */ (function () {
    function ResourceSystemDefault() {
        this.resourcesData = {};
        this.resourcesInput = {};
        this.loaded = 0;
        this.nbToLoad = 0;
        this.resourcesInError = [];
        this.loaders = {};
        this.options = __assign({}, defaultOptions);
    }
    ResourceSystemDefault.prototype.reset = function () {
        this.resourcesData = {};
        this.resourcesInput = {};
        this.loaded = 0;
        this.nbToLoad = 0;
        this.resourcesInError = [];
        return this;
    };
    ResourceSystemDefault.prototype.addLoader = function (loader) {
        this.loaders[loader.type] = loader;
        return this;
    };
    ResourceSystemDefault.prototype.removeLoader = function (loader) {
        delete this.loaders[loader.type];
        return this;
    };
    ResourceSystemDefault.prototype.removeAllLoaders = function () {
        this.loaders = {};
        return this;
    };
    ResourceSystemDefault.prototype.updateOptions = function (options) {
        this.options = __assign({}, this.options, options);
        return this;
    };
    ResourceSystemDefault.prototype.loadResources = function () {
        var _this = this;
        var resourcesInput = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resourcesInput[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (!_this.isAllLoaded()) {
                reject(new Error(_this.options.loadResourceAlreadyInProgress));
            }
            _this.nbToLoad += resourcesInput.length;
            // Iterate from the resources.
            resourcesInput.forEach(function (resourceInput) {
                // Load if not already load or if autoReload is set to 'true'
                if (_this.options.autoReload || _this.resourcesInput[resourceInput.id] === undefined) {
                    _this.resourcesInput[resourceInput.id] = resourceInput;
                    var LOADER = _this.loaders[resourceInput.type];
                    // Add directly the function resources.
                    if (LOADER) {
                        LOADER.load(resourceInput, function (id, resourceOutput) {
                            _this.resourcesData[id] = resourceOutput;
                            _this.onResourceLoaded(resolve);
                        }, function (id, error) {
                            // Error while loading the resource.
                            _this.resourcesInError[id] = error;
                            _this.onResourceLoaded(resolve);
                        });
                    }
                    else {
                        // Loader does not exist.
                        _this.resourcesInError[resourceInput.id] = _this.options.loaderNotDefineMessage + ": " + resourceInput.type;
                        _this.onResourceLoaded(resolve);
                    }
                }
                else {
                    // Already loaded, no need to reload
                    _this.onResourceLoaded(resolve);
                }
            });
        });
    };
    ResourceSystemDefault.prototype.getResource = function (id) {
        return this.resourcesData[id];
    };
    ResourceSystemDefault.prototype.getResources = function () {
        return Object.values(this.resourcesData);
    };
    ResourceSystemDefault.prototype.getResourcesInput = function () {
        return Object.values(this.resourcesInput);
    };
    ResourceSystemDefault.prototype.getLoaded = function () {
        return this.loaded;
    };
    ResourceSystemDefault.prototype.getNbToLoad = function () {
        return this.nbToLoad;
    };
    ResourceSystemDefault.prototype.isAllLoaded = function () {
        return this.loaded == this.nbToLoad;
    };
    ResourceSystemDefault.prototype.isResourcesInError = function () {
        return this.resourcesInError.length > 0;
    };
    ResourceSystemDefault.prototype.getResourcesInError = function () {
        return this.resourcesInError;
    };
    ResourceSystemDefault.prototype.onResourceLoaded = function (resolve) {
        this.loaded++;
        if (this.isAllLoaded()) {
            resolve(this.resourcesData);
        }
    };
    return ResourceSystemDefault;
}());
export { ResourceSystemDefault };
;
//# sourceMappingURL=../../src/src/resource/resource-system.js.map