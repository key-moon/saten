export async function sendMessage(title: string, message: any): Promise<any> {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ title: title, message: message }, response => {
            if (response.error) reject(response.error);
            else resolve(response);
        });
    });
}
