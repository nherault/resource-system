export class ImageLoader {

    private loaded: number;
    private nbToload: number;
    private images: HTMLImageElement[];
    private isAllLoaded: boolean;

    constructor() {
        this.loaded = 0;
        this.nbToload = 0;
        this.images = [];
        this.isAllLoaded = false;
    }

    public preload(callback: Function, ...imageUrls: string[]): void {

        this.loaded = 0;
        this.isAllLoaded = false;
        this.images = [];

        this.nbToload = imageUrls.length;

        let i: number = imageUrls.length;
        while (i--) {
            this.images[i] = new Image();
            this.images[i].onload = this.images[i].onerror = this.images[i].onabort = () => {
                // Callback when images loaded.
                this.loaded += 1;
                if (this.loaded === imageUrls.length && callback) {
                    this.isAllLoaded = true;
                    callback(this.images);
                }
            };
            this.images[i].src = imageUrls[i];
        }
    }

    get getLoaded(): number {
        return this.loaded;
    }

    get getNbToload(): number {
        return this.nbToload;
    }

    get getIsAllLoaded(): boolean {
        return this.isAllLoaded;
    }
}
