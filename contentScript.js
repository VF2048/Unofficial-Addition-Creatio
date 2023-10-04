let Scripts = {
    version: 4,
    injected: {
        checkFields: {
            type: "js",
            files: [
                "service"
            ]
        },
        coloring: {
            type: "js",
            files: [
                "setcolor"
            ]
        },
        configs: {
            type: "js",
            files: [
                "configHashtag",
                "configService",
                "hashtagTree"
            ]
        },
        filter: {
            type: "js",
            files: [
                "filterManager",
                "keyboardHandler",
                "filterMain"
            ]
        },
        hashtag: {
            type: "js",
            files: [
                "addHashtag",
                "hashtagTree",
                "pageHandler"
            ]
        },
        style: {
            type: "css",
            files: [
                "main"
            ]
        },
    }
}

async function checkhashtagTreeVersion() {
    const hashtagTreeURL = chrome.runtime.getURL("injected/configs/hashtagTree.js");
    let version = await fetch(hashtagTreeURL)
        .then(responce => responce.text())
        .then(text => {
            const regex = /const hashtagVersion = "([^"]+)"/;
            const matchs = text.match(regex);
            if (matchs && matchs.length >= 2)
                return matchs[1];
        })
        .catch(error => console.error(error));

    let netVersion = await chrome.runtime.sendMessage({ action: "fetchData", url: "file://softcloud//Library//SoftArm//hashtagTree//hashtagTree.js" });
    if(!netVersion){
        alert("Не удалось найти hashtagTree.js на softcloud!");
        return;
    }
    if (version !== netVersion){
        chrome.runtime.sendMessage({ action: "download", url: "file://softcloud//Library//SoftArm//hashtagTree//hashtagTree.js" });
        alert("Файл hashtagTree.js устарел и требует замены.\nСкачайте данный файл и поместите его в папку расширения\ninjected/configs/hashtagTree.js");
    }
}

async function main() {
    await checkhashtagTreeVersion();
    let conf = await getConf();
    for (const [folderMain, folder] of Object.entries(conf)) {
        for (const [folderName, elem] of Object.entries(folder))
            if (elem.files)
                genInjectForFile(`${folderMain}/${folderName}`, elem, "/");
    }
}
main();

function genInjectForFile(path, files, separator) {
    for (const iterator of files.files) {
        let s = document.createElement(files.type === "js" ? "script" : "link");
        let src;
        src = chrome.runtime.getURL(`${path}${separator}${iterator}.${files.type}`);
        if (files.type === "css") {
            s.href = src;
            s.type = "text/css";
            s.rel = "stylesheet";
        } else {
            s.src = src;
            s.onload = function () {
                this.remove();
            };
        }
        (document.head || document.documentElement || document.body).appendChild(s);
        console.log(`Loaded: ${path} -> ${iterator}`);
    }
}

async function getConf() {
    let result = await chrome.storage.local.get(["Scripts"])
    if (!result || Object.keys(result).length === 0 || result.Scripts.version != Scripts.version) {
        console.log("Config set!");
        chrome.storage.local.set({ "Scripts": Scripts });
        return Scripts;
    }
    let ret;
    await chrome.storage.local.get(["Scripts"]).then((result) => {
        ret = result.Scripts;
    });
    console.log("Config load!");
    return ret;
}