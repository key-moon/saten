let handlerDict: { [title: string]: (message: any) => void } = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const func = handlerDict[request.title];
        if (!func) {
            sendResponse({"success": false, "error": "key not found"});
            return true;
        }
        const message = request.message;
        try{
            let res = func(message);
            sendResponse({"success": true, "result": res});
        }
        catch (e) {
            sendResponse({"success": false, "error": e.message});
        }
    }
);

export function addMessageListner(title: string, handler: (message: any) => void) {
    if (handlerDict[title]){
        const oldHandler = handlerDict[title];
        handlerDict[title] = title => {
            oldHandler(title);
            handler(title);
        };
    }
    else{
        handlerDict[title] = handler;
    }
}
