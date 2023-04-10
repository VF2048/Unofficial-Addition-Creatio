
// (function () {
//     'use strict';

//     main();
// })();

function main() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            ifTask();
        }
    })
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document, config);
    ifTask();
}

function ifTask() {
    const elem = document.querySelectorAll(`[id*="ServiceOfferingLookupEdit-link-el"]`);
    if (elem.length > 0) {
        elem.forEach((value, key) => {
            if (value.innerText != mainServiceName) {
                value.style.backgroundColor = "#ff262638";
            } else if (value.innerText == mainServiceName)
                value.style.backgroundColor = null;
            })
        clearInterval(loadWait);
    }
}