export function loadJSON(url: string, onLoaded: Function, onError?: Function) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        // if DONE and SUCCESS
        if ((request.readyState == 4) && (request.status == 200)) {                
            onLoaded({url, result: JSON.parse(request.responseText)});
        } else if (onError) {
            onError(request);
        }
    };
    request.open("GET", url, true);
    request.send();
  }

  export function loadJSONInBatch(urls: string[], onAllLoaded: Function) {
    
    const allUrlJsonResult: { url: string, result: string}[] = [];
    function urlLoaded(urlJsonResult: { url: string, result: string}) {
        allUrlJsonResult.push(urlJsonResult);
      if (allUrlJsonResult.length === urls.length) {
        onAllLoaded(allUrlJsonResult);
      }
    }
    
    urls.forEach((url) => loadJSON(url, urlLoaded));
  }