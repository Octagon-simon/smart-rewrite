import { generateUUID, signPayload } from "./crypto.js";
import { getDeviceId, getDeviceSecret } from "./storage.js";

export async function buildSignedRequest(url, method = "POST", body = {}) {
  const timestamp = Date.now().toString();
  const nonce = generateUUID();
  const deviceId = await getDeviceId();
  const deviceSecret = await getDeviceSecret();
  const fullUrl = new URL(url);

  const payload = `${method}|${fullUrl.pathname}|${timestamp}|${nonce}|${deviceId}`;
  const signature = await signPayload(payload, deviceSecret);

  return {
    url: fullUrl.toString(),
    options: {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": deviceId,
        "X-Timestamp": timestamp,
        "X-Nonce": nonce,
        "X-Signature": signature,
        "X-Extension-Id": chrome.runtime.id,
        "X-Device-Secret": deviceSecret
      },
      body: JSON.stringify(body)
    }
  };
}
