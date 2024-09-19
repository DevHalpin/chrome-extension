"use strict";

console.log("Hello world from popup!")

function setBadgeText(enabled) {
    const text = enabled ? "ON" : "OFF"
    chrome.action.setBadgeText({text: text})
}

const checkbox = document.getElementById("enabled")
chrome.storage.sync.get("enabled", (data) => {
    checkbox.checked = !!data.enabled
    setBadgeText(data.enabled)
})

checkbox.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({"enabled": event.target.checked})
        setBadgeText(event.target.checked)
    }
})

const input = document.getElementById("item")
chrome.storage.sync.get("item", (data) => {
    input.value = data.item || ""
})

input.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({"item": event.target.value})
    }
})