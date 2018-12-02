export function loadJSON(
    url: string,
    onLoaded: (result: { url: string, result: string }) => void,
    onError?: (request: XMLHttpRequest) => void) {
    const request = new XMLHttpRequest();
    request.overrideMimeType('application/json');
    request.onreadystatechange = () => {
        // if DONE and SUCCESS
        if (request.readyState === 4) {
            if (request.status === 200) {
                onLoaded({url, result: JSON.parse(request.responseText)});
            } else if (onError) {
                onError(request);
            }
        }
    };
    request.open('GET', url, true);
    request.send();
  }

export function loadJSONInBatch(
    urls: string[],
    onAllLoaded: (jsonResult: Array<{ url: string, result: string}>) => void) {

    const allUrlJsonResult: Array<{ url: string, result: string}> = [];
    function urlLoaded(urlJsonResult: { url: string, result: string}) {
        allUrlJsonResult.push(urlJsonResult);
        if (allUrlJsonResult.length === urls.length) {
            onAllLoaded(allUrlJsonResult);
        }
    }

    urls.forEach((url) => loadJSON(url, urlLoaded));
}
