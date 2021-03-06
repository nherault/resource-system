"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadJSON(url, onLoaded, onError) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        // if DONE and SUCCESS
        if ((request.readyState == 4) && (request.status == 200)) {
            onLoaded({ url: url, result: JSON.parse(request.responseText) });
        }
        else if (onError) {
            onError(request);
        }
    };
    request.open("GET", url, true);
    request.send();
}
exports.loadJSON = loadJSON;
function loadJSONInBatch(urls, onAllLoaded) {
    var allUrlJsonResult = [];
    function urlLoaded(urlJsonResult) {
        allUrlJsonResult.push(urlJsonResult);
        if (allUrlJsonResult.length === urls.length) {
            onAllLoaded(allUrlJsonResult);
        }
    }
    urls.forEach(function (url) { return loadJSON(url, urlLoaded); });
}
exports.loadJSONInBatch = loadJSONInBatch;
//# sourceMappingURL=../../src/src/resource/json-loader.js.map