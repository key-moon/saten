type Handler = (message: object) => void;
const handlerDict: { [title: string]: Handler } = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const func = handlerDict[request.title];
    if (!func) {
        sendResponse({ success: false, error: "key not found" });
        return true;
    }
    const message = request.message;
    try {
        const res = func(message);
        sendResponse({ success: true, result: res });
    } catch (e) {
        sendResponse({ success: false, error: e.message });
    }
});

export function addMessageListener(title: string, handler: Handler): void {
    if (handlerDict[title]) {
        const oldHandler = handlerDict[title];
        handlerDict[title] = (message: object): void => {
            oldHandler(message);
            handler(message);
        };
    } else {
        handlerDict[title] = handler;
    }
}
