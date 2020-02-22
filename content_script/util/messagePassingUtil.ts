export async function sendMessage(title: string, message: object): Promise<object> {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ title: title, message: message }, response => {
            if (!response.success) reject(response.error);
            else resolve(response.res);
        });
    });
}
