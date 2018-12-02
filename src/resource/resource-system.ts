import { ResourceSystem, ResourceInput, Loaders, Loader, ResourceOutput, ResourceSystemOption, ResourceSystemOptionParam } from "./resource-system.types";

const defaultOptions: ResourceSystemOption = {
  autoReload: false,
  forceReload: false,
  loaderNotDefineMessage: "Loader not define for type",
  loadResourceAlreadyInProgress: "Load Resources already in progress !",
};

export class ResourceSystemDefault implements ResourceSystem {

  private resourcesData: { [propName: string]: ResourceOutput };
  private resourcesInput: { [propName: string]: ResourceInput };
  private loaded: number;
  private nbToLoad: number;
  private resourcesInError: { [propName: string]: any };
  private loaders: Loaders;
  private options: ResourceSystemOption;

  constructor() {
    this.resourcesData = {};
    this.resourcesInput = {};
    this.loaded = 0;
    this.nbToLoad = 0;
    this.resourcesInError = [];
    this.loaders = {};
    this.options = { ...defaultOptions };
  }

  reset(): ResourceSystem {
    this.resourcesData = {};
    this.resourcesInput = {};
    this.loaded = 0;
    this.nbToLoad = 0;
    this.resourcesInError = [];
    return this;
  }

  addLoader(loader: Loader): ResourceSystem {
    this.loaders[loader.type] = loader;
    return this;
  }

  removeLoader(loader: Loader): ResourceSystem {
    delete this.loaders[loader.type];
    return this;
  }

  removeAllLoaders(): ResourceSystem {
    this.loaders = {};
    return this;
  }

  updateOptions(options: ResourceSystemOptionParam): ResourceSystem {
    this.options = {
      ...this.options,
      ...options
    }
    return this;
  }

  loadResources(...resourcesInput: ResourceInput[]): Promise<{ [propName: string]: ResourceOutput }> {

    return new Promise((resolve, reject) => {
      if (!this.isAllLoaded()) {
        reject( new Error(this.options.loadResourceAlreadyInProgress));
      }
  
      this.nbToLoad += resourcesInput.length;
  
      // Iterate from the resources.
      resourcesInput.forEach((resourceInput) => {
  
        // Load if not already load or if autoReload is set to 'true'
        if (this.options.autoReload || this.resourcesInput[resourceInput.id] === undefined) {

          this.resourcesInput[resourceInput.id] = resourceInput;
          const LOADER = this.loaders[resourceInput.type];
  
          // Add directly the function resources.
          if (LOADER) {
            LOADER.load(resourceInput, (id, resourceOutput) => {
              this.resourcesData[id] = resourceOutput;
              this.onResourceLoaded(resolve);
            }, (id, error) => {
              // Error while loading the resource.
              this.resourcesInError[id] = error;
              this.onResourceLoaded(resolve);
            });
          } else {
            // Loader does not exist.
            this.resourcesInError[resourceInput.id] = `${this.options.loaderNotDefineMessage}: ${resourceInput.type}`;
            this.onResourceLoaded(resolve);
          }
        } else {
          // Already loaded, no need to reload
          this.onResourceLoaded(resolve);
        }
      });
    });    
  }

  getResource(id: string): ResourceOutput | undefined {
    return this.resourcesData[id];
  }

  getResources(): ResourceOutput[] {    
    return Object.values(this.resourcesData);
  }

  getResourcesInput(): ResourceInput[] {
    return Object.values(this.resourcesInput);
  }

  getLoaded(): number {
    return this.loaded;
  }

  getNbToLoad(): number {
    return this.nbToLoad;
  }

  isAllLoaded(): boolean {
    return this.loaded == this.nbToLoad;
  }

  isResourcesInError(): boolean {
    return this.resourcesInError.length > 0;
  }

  getResourcesInError(): { [propName: string]: any } {
    return this.resourcesInError;
  }

  private onResourceLoaded(resolve: Function) {
    this.loaded++;
    if (this.isAllLoaded()) {
      resolve(this.resourcesData);
    }
  }
};
