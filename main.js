let robux = "";
let fullRobux = "";

chrome.storage.sync.get(["robux", "fullrobux"], function (items) {
    robux = items.robux || "";
    fullRobux = items.fullrobux || "";

    function updateRobuxDisplay() {
        const robuxAmountElement = document.getElementById('nav-robux-amount');
        if (robuxAmountElement && robuxAmountElement.textContent !== robux) {
            robuxAmountElement.textContent = robux;
        }

        const robuxBalanceElement = document.getElementById('nav-robux-balance');
        if (robuxBalanceElement) {
            const spanElement = robuxBalanceElement.querySelector('span');
            const balanceText = spanElement ? spanElement.textContent : "";
            if (balanceText !== fullRobux) {
                robuxBalanceElement.innerHTML = `<span>${fullRobux} Robux</span>`;
            }
        }
    }

    const robuxObserver = new MutationObserver(updateRobuxDisplay);

    robuxObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    updateRobuxDisplay(); // Initial update
});
