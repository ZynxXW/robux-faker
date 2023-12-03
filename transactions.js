let totalStr = "";
let loaded = false;

chrome.storage.sync.get(["fullrobux", "incoming", "pending", "bought"], function (items) {
    let fullRobux = items.fullrobux || "";

    function setTotal() {
        let total = 0;
        const elements = document.getElementsByClassName("amount icon-robux-container");
        for (let i = 0; i < elements.length && i < 6; i++) {
            const amountText = elements[i]?.children[2]?.textContent || "0";
            total += parseInt(amountText.split('.').join("").split(",").join(""));
        }
        totalStr = total.toLocaleString("en-150");
        loaded = true;
        const totalElement = elements[7]?.children[2];
        if (totalElement && totalElement.textContent !== totalStr) {
            totalElement.textContent = totalStr;
        }
    }

    function updateElements() {
        const balanceLabel = document.getElementsByClassName("balance-label icon-robux-container")[0];
        if (balanceLabel && !balanceLabel.innerHTML.includes(fullRobux)) {
            balanceLabel.children[0].innerHTML = `My Balance: <span class="icon-robux-16x16"></span>${fullRobux}`;
        }

        const amountElements = document.getElementsByClassName("amount icon-robux-container");
        if (amountElements.length > 0) {
            // Update incoming, pending, and bought amounts
            const incomingElement = amountElements[2];
            const pendingElement = amountElements[5];
            const boughtElement = amountElements[1];

            if (incomingElement) incomingElement.innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.incoming || ''}</span>`;
            if (pendingElement) pendingElement.innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.pending || ''}</span>`;
            if (boughtElement) boughtElement.innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.bought || ''}</span>`;

            setTotal();
        }
    }

    const observer = new MutationObserver(function (mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                updateElements();
                break;
            }
        }
    });

    observer.observe(document, { childList: true, subtree: true, characterData: true });
    updateElements(); // Initial update
});
