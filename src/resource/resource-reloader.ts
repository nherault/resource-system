import {ResourceInput, ResourceSystem, ResourceReloader, ResourceReloaderOptionParam, ResourceReloaderOption } from './resource-system.types';

const resourceReloaderOptionDefault: ResourceReloaderOption = {
    assetsPrefix: "",
    forceReloadModifier: "?", // #
    intervalTime: 2000,
    resourceTypesException: []
}

export class ResourceReloaderDefault implements ResourceReloader {

    private options: ResourceReloaderOption;

    constructor() {
        this.options = { ... resourceReloaderOptionDefault };
    }

    forceReload(resourceSystem: ResourceSystem, options?: ResourceReloaderOptionParam): number {
        this.options = options ? { ...this.options, ...options } : this.options;
        return window.setInterval(() => {
            if (resourceSystem.isAllLoaded()) {
                const resourcesInputDebug: ResourceInput[] = resourceSystem.getResourcesInput().map((resource) => {
                    if (this.options.resourceTypesException.indexOf(resource.type) === -1) {
                        return this.generate(resource);
                    }
                    return resource;
                });
                resourceSystem.loadResources(...resourcesInputDebug);
            }
        }, this.options.intervalTime);
    }

    private generate(resource: ResourceInput): ResourceInput {

        const now = Date.now();
        const resourceCopy = JSON.parse(JSON.stringify(resource));
        if (this.options.assetsPrefix) {
            resourceCopy.source = this.options.assetsPrefix + resourceCopy.source + this.options.forceReloadModifier + now;
        } else {
            resourceCopy.source = resourceCopy.source + this.options.forceReloadModifier + now;
        }

        return resourceCopy;
    }    
}