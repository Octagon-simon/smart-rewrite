import { callRewriteAPI, handleSpinner, sendLastResponse } from "./utils/actions.js";

let lastResponse = null; //store latest rewrite
const documentUrlPatterns = Array("*://*.freshdesk.com/*");
const rewriteEnglish = "rewriteText_english";
const rewriteFrench = "rewriteText_french";

chrome.runtime.onInstalled.addListener(() => {
	// Set default language if not stored yet
	chrome.storage.local.get("selectedLanguage", (data) => {
		const selectedLang = data.selectedLanguage || rewriteEnglish;

		// Parent menu
		chrome.contextMenus.create({
			id: "rewriteText",
			title: "Rewrite Text",
			contexts: ["selection"],
			documentUrlPatterns
		});

		// Submenu: English
		chrome.contextMenus.create({
			id: rewriteEnglish,
			parentId: "rewriteText",
			title: "English (default)",
			type: "radio",
			checked: selectedLang === rewriteEnglish,
			contexts: ["selection"],
			documentUrlPatterns
		});

		// Submenu: French
		chrome.contextMenus.create({
			id: rewriteFrench,
			parentId: "rewriteText",
			title: "French",
			type: "radio",
			checked: selectedLang === rewriteFrench,
			contexts: ["selection"],
			documentUrlPatterns
		});
	});
});

//when user picks a language, save it
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId.startsWith("rewriteText_")) {
		chrome.storage.local.set({ selectedLanguage: info.menuItemId });
		console.log("Language saved:", info.menuItemId);
	}
});

//When popup asks for latest result
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getResponse") {
		sendResponse({ text: lastResponse });
	}
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "rewriteText") {
		handleRewrite(tab, info.selectionText, false);
	} else if (info.menuItemId === rewriteEnglish) {
		handleRewrite(tab, info.selectionText, false);
	} else if (info.menuItemId === rewriteFrench) {
		handleRewrite(tab, info.selectionText, true);
	}
});

//listen for keyboard shortcut for quick rewrite
chrome.commands.onCommand.addListener((command) => {
	if (command === "quick_rewrite") {
		//Get active tab
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tab = tabs[0];
			if (tab.id) {
				//Inject a script to grab selection and send message
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					func: () => window.getSelection()?.toString()
				}, (results) => {
					//get selected text
					const selectedText = results?.[0]?.result;
					//get selected language
					chrome.storage.local.get("selectedLanguage", (data) => {
						const translateToFrench = (data.selectedLanguage === rewriteFrench) ? true : false;
						if (selectedText) {
							handleRewrite(tab, selectedText, translateToFrench);
						}
					})
				});
			}
		});
	}
});

//reusable function to handle the rewrite
const handleRewrite = async (tab, text, translateToFrench) => {
	chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] }, async () => {
		//show spinner
		handleSpinner(false, tab.id);
		try {
			lastResponse = await callRewriteAPI(text, translateToFrench);
			//hide spinner
			handleSpinner(true, tab.id);
			sendLastResponse(lastResponse, tab.id);
		} catch (err) {
			//hide spinner
			handleSpinner(true, tab.id);
			console.error("Rewrite error:", err);
		}
	});
}