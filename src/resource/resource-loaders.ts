// import {TilesPicture, TileDirection} from '../tiles/tiles-picture';
import { Loader, ResourceInput, ResourceOutput } from './resource-system.types';

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

const createCanvasFromImage = (image: HTMLImageElement): HTMLCanvasElement => {

    let canvas: HTMLCanvasElement = createCanvas(image.width, image.height);
    let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
        context.drawImage(image, 0, 0);
    }    
    return canvas;
}

const createCanvasFromFunction = (drawingFunction: Function, width: number, height: number): HTMLCanvasElement => {

    let canvas: HTMLCanvasElement = createCanvas(width, height);
    let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
        drawingFunction(context, 0, 0);
    }
    return canvas;
}

export const imageLoader: Loader = {
    type: 'image',
    load(resourceInput: ResourceInput, onSuccess: (id: string, resourceOutput: ResourceOutput) => void, onError?: (id: string, error: any) => void) {
        let image = new Image();
        image.onload = () => {
            let canvas: HTMLCanvasElement = createCanvasFromImage(image);
            onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: canvas });
        };
        if (onError) {
            image.onabort = (error) => {
                onError(resourceInput.id, error);
            }
            image.onerror = (error) => {
                onError(resourceInput.id, error);
            }
        }
        image.src = resourceInput.source;
    }
}

export const functionLoader: Loader = {
    type: 'function',
    load(resourceInput: ResourceInput, onSuccess: (id: string, resourceOutput: ResourceOutput) => void) {
        let canvas: HTMLCanvasElement = createCanvasFromFunction(resourceInput.source, 
            resourceInput.width, resourceInput.height);
            onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: canvas });
    }
}

export const canvasLoader: Loader = {
    type: 'canvas',
    load(resourceInput: ResourceInput, onSuccess: (id: string, resourceOutput: ResourceOutput) => void) {
        onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: resourceInput.source });
    }
}
/* 
export const tilePictureLoader: Loader = {
    type: 'tilepicture',
    load(resourceInput: ResourceInput, onSuccess: (id: string, resourceOutput: ResourceOutput) => void) {
        let image = new Image();
        image.onload = image.onerror = image.onabort = () => {
            let canvas:HTMLCanvasElement = createCanvasFromImage(image);
            onSuccess(resourceInput.id, { id: resourceInput.id, type: 'tilepicture', value: new TilesPicture(canvas, resourceInput.nbTiles, TileDirection.LINE, resourceInput.width, resourceInput.height) });
        };
        image.src = resourceInput.source;
    }
}
 */
export const jsonLoader: Loader = {
    type: 'json',
    load(resourceInput: ResourceInput, onSuccess: (id: string, resourceOutput: ResourceOutput) => void, onError?: (id: string, error: any) => void) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            // if DONE and SUCCESS
            if ((request.readyState == 4) && (request.status == 200)) {                
                onSuccess(resourceInput.id, { id: resourceInput.id, type: 'json', value: JSON.parse(request.responseText) });
            } else if (onError) {
                onError(resourceInput.id, request);
            }
        };
        request.open("GET", resourceInput.source, true);
        request.send();
    }
}
