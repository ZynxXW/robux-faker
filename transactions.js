let totalstr = "";
let loaded = false;
let fullRobux, incoming, pending, bought, total, element;

function setTotal() {
    total = 0;
    for (let i = 0; i < 6; i++){
        if (element && element[i] && element[i].children[2]) {
            total += parseInt(element[i].children[2].innerHTML.split('.').join("").split(",").join(""));
        }
    }
    totalstr = total.toLocaleString("en-150");
    loaded = true;
    if (element && element[7] && element[7].children[2]) {
        element[7].children[2].innerHTML = totalstr;
    }
}

function updateBalances() {
    element = document.getElementsByClassName("amount icon-robux-container");
    
    if (element && element[2]) {
        element[2].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${incoming}</span>`;
    }
    if (element && element[5]) {
        element[5].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${pending}</span>`;
    }
    if (element && element[1]) {
        element[1].innerHTML = `<span></span><span class="icon-robux-16x16"></span><span>${bought}</span>`;
    }
    setTotal();
}

function retrieveDataAndSetup() {
    chrome.storage.sync.get(["fullrobux", "incoming", "pending", "bought"], function(items){
        fullRobux = items["fullrobux"];
        incoming = items["incoming"];
        pending = items["pending"];
        bought = items["bought"];
        updateBalances();
    });
}

function OnBalanceExist() {
    if (document.getElementsByClassName("balance-label icon-robux-container")[0]
    && document.getElementsByClassName("balance-label icon-robux-container")[0].children[0].innerHTML != `<span class="shimmer-line"></span>`){
        document.getElementsByClassName("balance-label icon-robux-container")[0].children[0].innerHTML = `My Balance: <span class="icon-robux-16x16"></span>${fullRobux}`;
        retrieveDataAndSetup();
    }
    else {
        setTimeout(OnBalanceExist, 1);
    }
}

function OnBalanceChange(){
    if (loaded && element && element[7] && element[7].children[2] && element[7].children[2].innerHTML != totalstr){
        updateBalances();
    }
    else {
        setTimeout(OnBalanceChange, 1);
    }
}

OnBalanceExist();
OnBalanceChange();
