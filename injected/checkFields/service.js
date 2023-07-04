
(function main() {
    const observer1 = new MutationObserver(() => {
        const elem = document.querySelectorAll(`[id*="ServiceOfferingLookupEdit-link-el"]`);
        if (elem.length > 0) {
            elem.forEach((elem, key) => {
                checkValue(elem);
            })
        }
    })
    const config = { attributes: false, childList: true, subtree: true };
    observer1.observe(document, config);
})()

function checkValue(elem) {
    let found = false
    for (const el of mainServices) {
        if (elem.innerText == el.text) {
            found = true
            elem.style.backgroundColor = (el.color != null ? el.color : null);
        }
    }
    if (!found) {
        elem.style.backgroundColor = "#ff262638";
    }
}