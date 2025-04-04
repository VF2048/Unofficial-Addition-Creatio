const Hashtags = [
    { name: "#УП", title: "Выполнено удалённо  или может быть выполнено удаленно." },
    { name: "#локал", title: "Выполнено локально и не может быть выполнено по другому" },
];

const AnswersRitm = [
    { name: "Доп РЗ", title: "Создано Доп РЗ" },
    { name: "Ноте", title: "Установлена корпоративная операционная система на ноутбук " }
];

const AnswersINC = [
    { name: "Маршрутизация", title: "Создано Доп РЗ" },
];

let Scripts = {
    version: 6,
    injected: {
        checkFields: {
            type: "js",
            files: [
                "service",
                "ke"
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
                "TreeHandler",
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

function getLocalFile(url, regex) {
    const hashtagTreeURL = chrome.runtime.getURL(url);
    return fetch(hashtagTreeURL)
        .then(responce => responce.text())
        .then(text => {
            // const regex = /const hashtagVersion = "([^"]+)"/;
            const matchs = text.match(regex);
            if (matchs && matchs.length >= 2)
                return matchs[1];
        })
        .catch(error => console.log(`Не был найден файл ${url}`));
}

function checkstore(elem, data) {
    chrome.storage.local.get(elem, (result) => {
        if (!result[elem]) {
            chrome.storage.local.set(data);
            console.log(`Data ${elem} set`);
        }else{
            console.log(`Data ${elem} skipped`);
        };
    });
}

async function main() {
    checkstore("Hashtags", { Hashtags });
    checkstore("AnswersRitm", { AnswersRitm });
    checkstore("AnswersINC", { AnswersINC });
    // await checkhashtagTreeVersion();
    let conf = await getConf();
    for (const [folderMain, folder] of Object.entries(conf)) {
        for (const [folderName, elem] of Object.entries(folder))
            if (elem.files)
                genInjectForFile(`${folderMain}/${folderName}`, elem, "/");
    }
    chrome.runtime.sendMessage({ action: "injectScript" });
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