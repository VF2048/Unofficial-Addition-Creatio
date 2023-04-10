let Scripts = {
    "configs": [
        "configHashtag",
        "configService",
    ],
    "injected": {
        "checkFields":{
            files: [
                "service",
            ], enable: true
        },
        "filter": {
            files: [
                "filterManager",
                "keyboardHandler",
                "filterMain",
            ], enable: true
        },
        "hashtag": {
            files: [
                "addHashtag",
            ], enable: true
        }
    }
}


async function main() {
    let conf = await getConf();
    for (const [folderMain, folder] of Object.entries(conf)) {
        if (!Array.isArray(folder)) {
            for (const [foldername, scripts] of Object.entries(folder))
                if (scripts.enable)
                    for (let sc of scripts.files)
                        addScript(folderMain, foldername, sc);
        } else
            for (let conf of folder)
                addConfig(folderMain, conf)
    }

}
main();

async function getKeyConfig() {
    let ans = await chrome.storage.local.get(["key"]);
    return ans
}

function addScript(folderMain, folder, name) {
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL(`${folderMain}/${folder}/${name}.js`);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement || document.body).appendChild(s);
    console.log("Loaded: ", folder, "->", name);
}

function addConfig(folderMain, name) {
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL(`${folderMain}/${name}.js`);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement || document.body).appendChild(s);
    console.log("Loaded: ", folderMain, "->", name);
}

async function getConf() {
    let result = await chrome.storage.local.get(["Scripts"])
    if (Object.keys(result).length == 0) {
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