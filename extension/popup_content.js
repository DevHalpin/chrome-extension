"use strict"

const blurFilter = "blur(6px)"
let textToBlur = ""

// Search this DOM node for text to blur and blur the parent element if found.
function processNode(node, clearAll) {
    console.log(clearAll)
    if (node.childNodes.length > 0) {
        Array.from(node.childNodes).forEach((node) => processNode(node, clearAll))
    }
    if (node.nodeType === Node.TEXT_NODE &&
        node.textContent !== null && node.textContent.trim().length > 0) {
        const parent = node.parentElement
        if (parent !== null && parent.style.filter === blurFilter) {
            if (!node.textContent.includes(textToBlur) || clearAll) {
                console.log("Removing filter")
                parent.style.filter = "none"
            }
            // Already blurred
            return
        }
        if (!clearAll  && node.textContent.includes(textToBlur)) {
            blurElement(parent)
        }
    }
}

function blurElement(elem) {
    elem.style.filter = blurFilter
    console.debug("blurred id:" + elem.id + " class:" + elem.className +
        " tag:" + elem.tagName + " text:" + elem.textContent)
}

// Create a MutationObserver to watch for changes to the DOM.
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => processNode(node))
        } else {
            processNode(mutation.target)
        }
    })
})

function startObserving(clear = false) {
    console.log("Running")
    if (!clear) {
        observer.observe(document, {
            attributes: false,
            characterData: true,
            childList: true,
            subtree: true,
        })
    }
    // Loop through all elements on the page for initial processing.
    processNode(document, clear)
}


// Enable the content script by default.
let enabled = true
const keys = ["enabled", "item"]

chrome.storage.sync.get(keys, (data) => {
    if (data.enabled === false) {
        enabled = false
    }
    if (data.item) {
        textToBlur = data.item
    }
    // Only start observing the DOM if the extension is enabled and there is text to blur.
    if (enabled && textToBlur.trim().length > 0) {
       startObserving()
    }
})

chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log("Detected Storage Change")
    if (areaName === 'sync') {
        if (changes.item) {
            textToBlur = changes.item.newValue || ""
            console.log("New text to blur: ", textToBlur)

            observer.disconnect()

            if (enabled && textToBlur.trim().length > 0) {
                startObserving()
            }
        }
        if (changes.enabled) {
            enabled = changes.enabled.newValue;

            if (!enabled) {
                console.log("Extension disabled, removing blurs")
                observer.disconnect()
                startObserving(true);
            } else {
                console.log("Extension enabled, starting blur process");
                observer.disconnect();
                startObserving()
            }
        }
    }
});
