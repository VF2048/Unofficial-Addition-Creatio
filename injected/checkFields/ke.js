(function mainKE() {
    const observerKE = new MutationObserver(() => {
        const elemKE = document.querySelectorAll(`[id*="NNCaseTaskPageConfItemLookupEdit-el"]`);
        if (elemKE.length > 0) {
            elemKE.forEach((elemKE, key) => {
                checkValueKE(elemKE);
            })
        }
    })
    const config = { attributes: false, childList: true, subtree: true };
    observerKE.observe(document, config);
})()

function checkValueKE(elemKE) {
    const elemKEValue = document.querySelectorAll(`[id*="NNCaseTaskPageConfItemLookupEdit-link-el"]`)
    if (elemKEValue.length > 0) {
        elemKEValue.forEach((elemValue, key) => {
            if (elemValue.innerText != "") {
                elemValue.style.backgroundColor = null;
                pageHandler.removeNotationKE();
            } else {
                elemKE.style.backgroundColor = "#ff262638";
                pageHandler.addNotationKE();
            }
        })
    }
}