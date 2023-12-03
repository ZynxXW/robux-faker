let totalstr = "";
let loaded = false;
let incoming = "";
let fullRobux, pending, bought;
let total = 0;
let element;

chrome.storage.sync.get("fullrobux", function(items){
    fullRobux = items["fullrobux"];
    // Call your functions here if they depend on this value
})

function setTotal() {
    total = 0; // Reset total here
    for (let i = 0; i < 6; i++){
        if (element[i] && element[i].children[2]) {
            total += parseInt(element[i].children[2].innerHTML.split('.').join("").split(",").join(""));
        }
    }
    totalstr = total.toLocaleString("en-150");
    loaded = true;
    if (element[7] && element[7].children[2]) {
        element[7].children[2].innerHTML = totalstr;
    }
}


function OnBalanceChange(){
    if (loaded && element[7] && element[7].children[2] && element[7].children[2].innerHTML != totalstr){
        setTotal();
    } else {
        setTimeout(OnBalanceChange, 1);
    }
}

OnBalanceExist();
OnBalanceChange();
