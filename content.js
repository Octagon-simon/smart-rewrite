chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if (request.action === "replaceText") {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(request.newText);
        range.insertNode(textNode);
        sendResponse({ status: "success" });
    }
});
