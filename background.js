chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "rewriteText",
        title: "Rewrite Text",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "rewriteText") {

        console.log("have clicked on " + tab.id)


        fetch('http://localhost:5000/rewrite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: info.selectionText,
            })
        })
            .then(response => response.json())
            .then((res) => {

                if (res?.success === true) {
                    const { data: { response } } = res

                    console.log("Rewritten text: ", response);

                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tab.id },
                            files: ['content.js']
                        },
                        () => {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "replaceText",
                                newText: response,
                                how: "why"
                            }, response => {
                                if (chrome.runtime.lastError) {
                                    console.error(chrome.runtime.lastError.message);
                                }
                            });
                        }
                    );
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
});
