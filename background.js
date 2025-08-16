let lastResponse = null; //store latest rewrite

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "rewriteText",
		title: "Rewrite Text",
		contexts: ["selection"],
		documentUrlPatterns: ["*://*.freshdesk.com/*"]
	});
});

//When popup asks for latest result
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getResponse") {
		sendResponse({ text: lastResponse });
	}
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "rewriteText") {
		chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] }, async () => {
			chrome.tabs.sendMessage(tab.id, { action: "showSpinner" });

			try {
				const res = await fetch("https://smart-rewrite-backend.vercel.app/api/rewrite", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ content: info.selectionText })
				}).then(r => r.json());

				if (res?.success) {
					lastResponse = res.data.response;
					console.log("Rewritten text:", lastResponse);

					chrome.tabs.sendMessage(tab.id, { action: "hideSpinner" });
					chrome.tabs.sendMessage(tab.id, {
						action: "replaceText",
						newText: lastResponse
					});
				}
			} catch (err) {
				chrome.tabs.sendMessage(tab.id, { action: "hideSpinner" });
				console.error("Rewrite error:", err);
			}
		});
	}
});


