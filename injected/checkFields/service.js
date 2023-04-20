
(function main() {
    const observer1 = new MutationObserver(() => {
        const elem = document.querySelectorAll(`[id*="ServiceOfferingLookupEdit-link-el"]`);
        if (elem.length > 0) {
            elem.forEach((elem, key) => {
                checkValue(elem);
            })
        }
    })
    const config = { attributes: true, childList: true, subtree: true };
    observer1.observe(document, config);
})()

function checkValue(elem) {
    if (elem.innerText != mainServiceName) {
        elem.style.backgroundColor = "#ff262638";
    } else if (elem.innerText == mainServiceName)
        elem.style.backgroundColor = null;
}