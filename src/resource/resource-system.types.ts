export interface ResourceOutputData {
    [propName: string]: ResourceOutput;
}

export interface ResourceInputData {
    [propName: string]: ResourceInput;
}

export interface ResourceInput {
    id: string;
    type: string;
    source: any;
    [propName: string]: any;
}

export interface ResourceOutput {
    id: string;
    type: string;
    value: any;
}

export interface Loader {
    type: string;
    load: (
        resourceInput: ResourceInput,
        onSuccess: (id: string, resourceOutput: ResourceOutput) => void,
        onError?: (id: string, error: any) => void) => void;
}

export interface Loaders {
    [propName: string]: Loader;
}

export interface ResourceSystemOption {
    autoReload: boolean;
    forceReload: boolean;
    loaderNotDefineMessage: string;
    loadResourceAlreadyInProgress: string;
}

export interface ResourceSystemOptionParam {
    autoReload?: boolean;
    forceReload?: boolean;
    loaderNotDefineMessage?: string;
    loadResourceAlreadyInProgress?: string;
}

export interface ResourceSystem {
    reset(): ResourceSystem;
    addLoader(loader: Loader): ResourceSystem;
    removeLoader(loader: Loader): ResourceSystem;
    removeAllLoaders(): ResourceSystem;
    loadResources(...resourcesInput: ResourceInput[]): Promise<{ [propName: string]: ResourceOutput }>;
    updateOptions(options: ResourceSystemOptionParam): ResourceSystem;
    isAllLoaded(): boolean;
    getResource(id: string): ResourceOutput | undefined;
    getResources(): ResourceOutput[];
    getResourcesInput(): ResourceInput[];
}

export interface ResourceReloaderOption {
    assetsPrefix: string;
    forceReloadModifier: string;
    intervalTime: number;
    resourceTypesException: string[];
}

export interface ResourceReloaderOptionParam {
    assetsPrefix?: string;
    forceReloadModifier?: string;
    intervalTime?: number;
    resourceTypesException?: string[];
}

export interface ResourceReloader {
    forceReload(resourceSystem: ResourceSystem, options?: ResourceReloaderOptionParam): number;
}
