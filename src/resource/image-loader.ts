export class ImageLoader {

    private _loaded: number;
    private _nbToload: number;
    private _images: HTMLImageElement[];
    private _isAllLoaded: boolean;

    constructor() {
        this._loaded = 0;
        this._nbToload = 0;
        this._images = [];
        this._isAllLoaded = false;
    }

    preload( callback: Function, ...imageUrls: string[]): void {

        this._loaded = 0;
        this._isAllLoaded = false;
        this._images = [];

        this._nbToload = imageUrls.length;

        let i: number = imageUrls.length;
        while (i--) {
            this._images[i] = new Image();
            this._images[i].onload = this._images[i].onerror = this._images[i].onabort = () => {
                // Callback when images loaded.
                this._loaded += 1;
                if (this._loaded === imageUrls.length && callback ) {
                    this._isAllLoaded = true;
                    callback( this._images );
                }
            };
            this._images[i].src = imageUrls[i];
        }
    }

    get loaded(): number {
        return this._loaded;
    }

    get nbToload(): number {
        return this._nbToload;
    }

    get isAllLoaded(): boolean {
        return this._isAllLoaded;
    }
}
