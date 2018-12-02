var createCanvas = function (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};
var createCanvasFromImage = function (image) {
    var canvas = createCanvas(image.width, image.height);
    var context = canvas.getContext('2d');
    if (context) {
        context.drawImage(image, 0, 0);
    }
    return canvas;
};
var createCanvasFromFunction = function (drawingFunction, width, height) {
    var canvas = createCanvas(width, height);
    var context = canvas.getContext('2d');
    if (context) {
        drawingFunction(context, 0, 0);
    }
    return canvas;
};
export var imageLoader = {
    type: 'image',
    load: function (resourceInput, onSuccess, onError) {
        var image = new Image();
        image.onload = function () {
            var canvas = createCanvasFromImage(image);
            onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: canvas });
        };
        if (onError) {
            image.onabort = function (error) {
                onError(resourceInput.id, error);
            };
            image.onerror = function (error) {
                onError(resourceInput.id, error);
            };
        }
        image.src = resourceInput.source;
    }
};
export var functionLoader = {
    type: 'function',
    load: function (resourceInput, onSuccess) {
        var canvas = createCanvasFromFunction(resourceInput.source, resourceInput.width, resourceInput.height);
        onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: canvas });
    }
};
export var canvasLoader = {
    type: 'canvas',
    load: function (resourceInput, onSuccess) {
        onSuccess(resourceInput.id, { id: resourceInput.id, type: 'canvas', value: resourceInput.source });
    }
};
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
export var jsonLoader = {
    type: 'json',
    load: function (resourceInput, onSuccess, onError) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            // if DONE and SUCCESS
            if ((request.readyState == 4) && (request.status == 200)) {
                onSuccess(resourceInput.id, { id: resourceInput.id, type: 'json', value: JSON.parse(request.responseText) });
            }
            else if (onError) {
                onError(resourceInput.id, request);
            }
        };
        request.open("GET", resourceInput.source, true);
        request.send();
    }
};
//# sourceMappingURL=../../src/src/resource/resource-loaders.js.map