import { generateUUID } from "./crypto.js";

export async function getOrCreate(key, generator) {
  //Get stored value
  const data = await chrome.storage.local.get(key);
  let value = data[key];

  //If missing, generate and save
  if (!value) {
    value = generator();
    await chrome.storage.local.set({ [key]: value });
  }

  return value;
}


export async function getDeviceId() {
  return await getOrCreate("deviceId", generateUUID);
}

export async function getDeviceSecret() {
  return await getOrCreate("deviceSecret", () => generateUUID() + generateUUID());
}
