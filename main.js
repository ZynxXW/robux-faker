function updateElementFromStorage(storageKey, elementId) {
  chrome.storage.sync.get(storageKey, function(items){
    if (typeof items[storageKey] !== "undefined") {
      let element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = items[storageKey];
      }
    }
  });
}

function onRobuxMade() {
  if (document.getElementById('nav-robux-amount')) {
    updateElementFromStorage("robux", "nav-robux-amount");
    // Other logic...
  } else {
    setTimeout(onRobuxMade, 5);
  }
}

// Other functions...

onRobuxMade();
