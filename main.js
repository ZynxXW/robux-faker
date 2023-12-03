let robux = "";
let fullRobux = "";

// Function to update an element's innerHTML from Chrome storage
function updateElementFromStorage(storageKey, elementId, callback) {
    chrome.storage.sync.get(storageKey, function(items) {
        if (typeof items[storageKey] !== "undefined") {
            let element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = items[storageKey];
                if (callback) {
                    callback();
                }
            }
        }
    });
}

// Check and update Robux balance
function onRobuxMade() {
    if (document.getElementById('nav-robux-amount')) {
        updateElementFromStorage("robux", "nav-robux-amount", onRobuxChange);
    } else {
        setTimeout(onRobuxMade, 5);
    }
}

// Monitor changes in Robux balance
function onRobuxChange() {
    let robuxElement = document.getElementById('nav-robux-amount');
    if (robuxElement && robuxElement.innerHTML !== robux) {
        robuxElement.innerHTML = robux;
        setTimeout(onRobuxChange, 1);
    } else {
        setTimeout(onRobuxChange, 1);
    }
}

// Check and update full Robux display
function onFullShow() {
    let fullRobuxElement = document.getElementById('nav-robux-balance');
    if (fullRobuxElement && fullRobuxElement.innerHTML !== `<span>${fullRobux} Robux</span>`) {
        fullRobuxElement.innerHTML = `<span>${fullRobux} Robux</span>`;
        fullRobuxElement.title = fullRobux;
        fullRobuxElement.count = fullRobux;
        setTimeout(onFullShow, 1);
    } else {
        setTimeout(onFullShow, 1);
    }
}

// Initial calls to start the functionality
onRobuxMade();
onFullShow();
