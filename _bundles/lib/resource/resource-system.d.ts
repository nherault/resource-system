import { ResourceSystem, ResourceInput, Loader, ResourceOutput, ResourceSystemOptionParam } from "./resource-system.types";
export declare class ResourceSystemDefault implements ResourceSystem {
    private resourcesData;
    private resourcesInput;
    private loaded;
    private nbToLoad;
    private resourcesInError;
    private loaders;
    private options;
    constructor();
    reset(): ResourceSystem;
    addLoader(loader: Loader): ResourceSystem;
    removeLoader(loader: Loader): ResourceSystem;
    removeAllLoaders(): ResourceSystem;
    updateOptions(options: ResourceSystemOptionParam): ResourceSystem;
    loadResources(...resourcesInput: ResourceInput[]): Promise<{
        [propName: string]: ResourceOutput;
    }>;
    getResource(id: string): ResourceOutput | undefined;
    getResources(): ResourceOutput[];
    getResourcesInput(): ResourceInput[];
    getLoaded(): number;
    getNbToLoad(): number;
    isAllLoaded(): boolean;
    isResourcesInError(): boolean;
    getResourcesInError(): {
        [propName: string]: any;
    };
    private onResourceLoaded;
}
