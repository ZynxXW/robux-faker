let robux = "";
let fullRobux = "";

chrome.storage.sync.get("fullrobux", function(items){
    fullRobux = items.fullrobux || "";

    function updateRobux() {
        const robuxElement = document.getElementById("nav-robux-amount");
        const robuxBalanceElement = document.getElementById('nav-robux-balance');

        if (robuxElement && robuxElement.textContent !== robux) {
            robuxElement.textContent = robux;
        }

        if (robuxBalanceElement && !robuxBalanceElement.innerHTML.includes(fullRobux)) {
            robuxBalanceElement.innerHTML = `<span>${fullRobux} Robux</span>`;
        }
    }

    function fetchAndUpdateRobux() {
        chrome.storage.sync.get("robux", function(items){
            if (items.robux !== undefined) {
                robux = items.robux;
                updateRobux();
            }
        });
    }

    setInterval(fetchAndUpdateRobux, 500); // Adjust interval as needed
});
