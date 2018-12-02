import { ResourceSystem, ResourceReloader, ResourceReloaderOptionParam } from './resource-system.types';
export declare class ResourceReloaderDefault implements ResourceReloader {
    private options;
    constructor();
    forceReload(resourceSystem: ResourceSystem, options?: ResourceReloaderOptionParam): number;
    private generate;
}
