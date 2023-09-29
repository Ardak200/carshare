export const reloadPageWarning =  () => {
    const unloadCallback = (event:any) => {
        event.preventDefault();
        event.returnValue = "";
        return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
}