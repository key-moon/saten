const blazorStartingPromise = Blazor.start({});

export const binName = "DotnetExecutor";

async function get(url: string, responseType: XMLHttpRequestResponseType): Promise<object> {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = responseType;
        xhr.onload = (): void => resolve(xhr.response);
        xhr.send();
    });
}

async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (): void => {
            const data = reader.result as string;
            const b64 = data.substr(data.indexOf(",") + 1);
            resolve(b64);
        };
    });
}

export async function loadAssemblies(): Promise<void> {
    const res = (await get("/framework/blazor.boot.json", "json")) as { assemblyReferences: string };
    const asmRefs = res.assemblyReferences;
    for (let index = 0; index < asmRefs.length; index++) {
        const asmRef = asmRefs[index];
        if (!asmRef.endsWith(".dll") || asmRef.startsWith("Microsoft.CodeAnalysis")) continue;
        const b64 = await blobToBase64((await get(`/framework/bin/${asmRef}`, "blob")) as Blob);
        console.log(`${index + 1} / ${asmRefs.length} ${asmRef}`);
        const step = 1000000;
        for (let index = 0; index < b64.length; index += step) {
            DotNet.invokeMethod(binName, "BuildBase64", b64.substr(index, step));
        }
        DotNet.invokeMethod(binName, "Apply");
    }
}

export async function loadBlazor(): Promise<void> {
    return blazorStartingPromise;
}
