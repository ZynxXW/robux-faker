// transactions.js
let totalStr = "";
let loaded = false;

chrome.storage.sync.get(["fullrobux", "incoming", "pending", "bought"], function (items) {
    let fullRobux = items.fullrobux;

    function setTotal() {
        let total = 0;
        const elements = document.getElementsByClassName("amount icon-robux-container");
        for (let i = 0; i < 6; i++) {
            if (elements[i]) {
                total += parseInt(elements[i].children[2].textContent.split('.').join("").split(",").join(""));
            }
        }
        totalStr = total.toLocaleString("en-150");
        loaded = true;
        if (elements[7]) {
            elements[7].children[2].textContent = totalStr;
        }
    }

    function updateElements() {
        const balanceLabel = document.getElementsByClassName("balance-label icon-robux-container")[0];
        const amountElements = document.getElementsByClassName("amount icon-robux-container");

        if (balanceLabel && balanceLabel.children[0].textContent !== `<span class="shimmer-line"></span>`) {
            balanceLabel.children[0].innerHTML = `My Balance: <span class="icon-robux-16x16"></span>${fullRobux}`;
        }

        if (amountElements.length > 0) {
            if (amountElements[2]) {
                amountElements[2].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.incoming}</span>`;
            }
            if (amountElements[5]) {
                amountElements[5].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.pending}</span>`;
            }
            if (amountElements[1]) {
                amountElements[1].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${items.bought}</span>`;
            }
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
    updateElements();
});
