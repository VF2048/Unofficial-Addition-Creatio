let cbk1 = document.getElementById("cbk1");
let cbk2 = document.getElementById("cbk2");
let keySet = document.getElementById("keySet");

cbk1.addEventListener('change', async function () {
    let data = await chrome.storage.local.get(["Scripts"]);
    data = data.Scripts;
    if (this.checked) {
        data.injected.filter.enable = true;
    } else {
        data.injected.filter.enable = false;
    }
    chrome.storage.local.set({ "Scripts": data })
});

cbk2.addEventListener('change', async function () {
    let data = await chrome.storage.local.get(["Scripts"]);
    data = data.Scripts;
    if (this.checked) {
        data.injected.hashtag.enable = true;
    } else {
        data.injected.hashtag.enable = false;
    }
    chrome.storage.local.set({ "Scripts": data })
});

let defKeyConf = {
    pressed: null,
    firstKey: null,
    shortcut: [],
    shortcutName: [],
};

let keyConf = copuObject(defKeyConf);

function copuObject(obj) {
    return JSON.parse(JSON.stringify(obj))
}

// chrome.storage.local.set({"key":{}});
async function getKeyConfig() {
    let key = keyConf;
    let result = await chrome.storage.local.get(["key"]);
    result = result.key;
    // console.log(result);
    if (Object.keys(result).length === 0) {
        console.log("Config key set!");
        chrome.storage.local.set({ "key": key });
        return key;
    }
    console.log("Config key load!");
    return result;
}

function saveKeyConfig() {
    chrome.storage.local.set({ "key": keyConf });
}

function removeKeyListener() {
    document.removeEventListener("keydown", getKey);
    document.removeEventListener("keyup", getKey);
}

function keyUpHandler(e) {
    if (keyConf.firstKey === e.code) {
        saveKeyConfig();
        removeKeyListener();
    }
}

function keyDownHandler(e) {
    if (keyConf.shortcut.length >= 2) {
        saveKeyConfig();
        removeKeyListener();
        return;
    }
    if (keyConf.firstKey == null) {
        keyConf.firstKey = e.code;
    }
    if (keyConf.pressed == e.code)
        return;
    keyConf.pressed = e.code;
    keyConf.shortcut.push(e.code);
    keyConf.shortcutName.push(e.code);
    // console.log(e, keySet.pressed, keySet.shortcut);
    keySet.textContent = keyConf.shortcutName.join("+");
    saveKeyConfig();
}

function getKey(e) {
    console.log(e);
    if (e.type == "keydown")
        keyDownHandler(e);
    else if (e.type == "keyup")
        keyUpHandler(e);
}

async function main() {
    chrome.storage.local.get(["Scripts"]).then((data) => {
        cbk1.checked = data.Scripts.injected.filter.enable;
        cbk2.checked = data.Scripts.injected.hashtag.enable;
    })

    keyConf = await getKeyConfig();

    console.log(keyConf);
    keySet.textContent = keyConf.shortcutName.join("+");

    keySet.addEventListener("click", () => {
        keyConf = copuObject(defKeyConf);
        document.addEventListener("keydown", getKey);
        document.addEventListener("keyup", getKey);
    })
}
main();