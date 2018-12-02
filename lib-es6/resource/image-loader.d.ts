export declare class ImageLoader {
    private _loaded;
    private _nbToload;
    private _images;
    private _isAllLoaded;
    constructor();
    preload(callback: Function, ...imageUrls: string[]): void;
    readonly loaded: number;
    readonly nbToload: number;
    readonly isAllLoaded: boolean;
}
