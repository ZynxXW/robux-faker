// main.js
let robux = "";
let fullRobux = "";

chrome.storage.sync.get(["robux", "fullrobux"], function (items) {
    robux = items.robux;
    fullRobux = items.fullrobux;

    const robuxObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                const robuxAmount = document.getElementById('nav-robux-amount');
                if (robuxAmount && robuxAmount.textContent !== robux) {
                    robuxAmount.textContent = robux;
                }

                const robuxBalance = document.getElementById('nav-robux-balance');
                if (robuxBalance && robuxBalance.textContent !== `<span>${fullRobux} Robux</span>`) {
                    robuxBalance.innerHTML = `<span>${fullRobux} Robux</span>`;
                }
            }
        });
    });

    robuxObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
});
