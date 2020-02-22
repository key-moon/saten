type Handler = (message: object) => Promise<object>;
const handlerDict: { [title: string]: Handler } = {};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const func = handlerDict[request.title];
    if (!func) {
        sendResponse({ success: false, error: "key not found" });
        return true;
    }
    const message = request.message;
    try {
        const res = await func(message);
        sendResponse({ success: true, result: res });
    } catch (e) {
        sendResponse({ success: false, error: e });
    }
});

export function addMessageListener(title: string, handler: Handler): void {
    handlerDict[title] = handler;
}
