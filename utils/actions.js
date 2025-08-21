import { buildSignedRequest } from "./request.js";

//reusable function to handle spinner show/hide
export const handleSpinner = (hide = false, tabId = "") => {
  const action = (hide) ? "hideSpinner" : "showSpinner";
  chrome.tabs.sendMessage(tabId, { action });
}

//reusable function to send last response to popup
export const sendLastResponse = (response = "", tabId = "") => {
  const action = "replaceText";
  chrome.tabs.sendMessage(tabId, {
    action,
    newText: response
  });
}

export async function callRewriteAPI(content, translateToFrench = false) {
  try {
    const { url, options } = await buildSignedRequest(
      "https://smart-rewrite-backend.vercel.app/api/rewrite",
      "POST",
      { content, translateToFrench }
    );

    const res = await fetch(url, options).then(r => r.json());
    if (res?.success) return res.data.response;
  } catch (err) {
    throw err
  }
}