let Task;
const regHash = /(#\S+)(\s+?|$)/gm;
let TechInfoState = false;

let conf = {};
let pageHandler;
let treeHandler;

(function () {
    'use strict';

    var checkExist = setInterval(function () {
        if (typeof Hashtags !== "undefined") {
            clearInterval(checkExist);
            setConfig();
        }
    }, 100);
})();

function setConfig() {
    conf = {
        hashLevel: {
            RITM: {
                start: startLevelRitm,
                end: endLevelRitm,
            },
            INC: {
                start: startLevelINC,
                end: endLevelINC,
            },
        },
        hashCount: {
            RITM: minHashtagCountRITM,
            INC: minHashtagCountINC,
        },
        sort: {
            RITM: sortEnableRITM,
            INC: sortEnableINC,
        },
        clearButton: {
            RITM: typeof clearButtonRITM !== "undefined" ? clearButtonRITM : false,
            INC: typeof clearButtonINC !== "undefined" ? clearButtonINC : false,
        },
        hashtags: Hashtags,
        disableComment: {
            RITM: disableCommentRitm,
            INC: disableCommentInc,
        },
        Answers: {
            RITM: AnswersRitm,
            INC: AnswersINC,
        },
        color: {
            RITM: colorRITM,
            INC: colorINC,
        }
    };

    pageHandler = new PageHandler();
    treeHandler = new HashtagTreeHandler(hashtagTree, addHashtagToEnd);
    ifTask();
    inputRecheak();
}

function ifTask() {
    const ifReady = setInterval(function () {
        if (pageHandler.ifTask()) {
            clearInterval(ifReady);
            getTaskType();
        }
    }, 100)
}

function getFilds() {
    const ifFieldsFound = setInterval(() => {
        let fieldsState = false;
        try {
            fieldsState = pageHandler.getCommentField();
            closeText = pageHandler.getTechInfoFieldText();
            TechInfoState = true;
        } catch {
            TechInfoState = false;
        }
        if (fieldsState) {
            clearInterval(ifFieldsFound);
            findService();
            addButtons();
            // setcolor(Task.color);
            checkContentInfo();
            addStyle();
        }
    }, 100)
}

function getTaskType() {
    Task = pageHandler.getRequestType();
    getFilds();
}

function checkContentInfo() {
    pageHandler.getCommentField();
    if (!TechInfoState)
        return;
    if (Task.service) {
        const redex = new RegExp(treeHandler.getRegex(), "gm");
        let hashtagTree = redex.exec(closeText)
        if (hashtagTree === null && Task.type === "Inc")
            pageHandler.addOverlay();
        else
            pageHandler.removeOverlay();
    }
    else
        pageHandler.removeOverlay();
    let hashtagIt = closeText.match(regHash);
    let text = closeText.replace(regHash, '').trim();
    // if (Task.type === "Inc")
    // if (!text) {
    //     pageHandler.setTechInfoStyle("#ff262638", false);
    //     pageHandler.setTechInfoNotation();
    // }
    // else {
    //     pageHandler.setTechInfoStyle(null, false);
    //     pageHandler.removeTechInfoNotation();
    // }
    // if (hashtagIt == null) {
    //     if (Task.disableComment) {
    //         pageHandler.setCloseCommentStyle(null, true);
    //         return;
    //     }
    //     else {
    //         pageHandler.setCloseCommentStyle(null, false);
    //     }
    // }
    // else if (hashtagIt.length < Task.hashtagCont && Task.disableComment == "one") {
    //     pageHandler.setCloseCommentStyle("#ff262638", false);
    // }
    // else if (hashtagIt.length >= Task.hashtagCont) {
    //     pageHandler.setCloseCommentStyle(null, false);
    // }
}

function findService() {
    const elem = pageHandler.getAllServiceFields();
    Task.service = undefined;
    for (let key in serviceList)
        if (elem.text == serviceList[key])
            Task.service = key;
}

function generateButtHash() {
    let buttons = ``;
    if (TechInfoState)
        if (Task.hashtagsLevelStart)
            for (let i = Task.hashtagsLevelStart - 1; i < Task.hashtagsLevelEnd; i++) {
                let batton = ``;
                for (let el of conf.hashtags[i]) {
                    batton += pageHandler.genButton("Hashtag", el);
                }
                buttons += pageHandler.genRow(batton);
            }
    return `
        <div  id="el1">
            ${buttons}
             ${Task.sort ? pageHandler.genRow(`<button class="Sort">Отсортировать #</button>`) : ``}
             ${Task.clearButton ? pageHandler.genRow(`<button class="ClearButton">ClearText</button>`) : ``}
            ${generateButtAns()}
        </div>`;
}

function addButtons() {
    const closeLayout = pageHandler.getButtonslayout();
    const parent = closeLayout.parentElement;
    if (!pageHandler.getElementById("el1"))
        parent.insertAdjacentHTML("beforebegin", generateButtHash());
    let type = pageHandler.getButtType();
    if (!type) {
        if (Task.type === "Inc" && Task.service && TechInfoState) {
            parent.insertAdjacentHTML("afterend", pageHandler.generateButtType());
        }
    }
    else if (!Task.service) {
        type.remove();
    }
    buttonHandler();
}

function buttonHandler() {
    let el1 = pageHandler.getElementById("el1");
    if (el1)
        el1.onclick = function (e) {
            if (e.target.tagName == "BUTTON")
                if (pageHandler.getCommentField())
                    switch (e.target.className) {
                        case "Hashtag":
                            addHashtag(e.target.textContent + " ");
                            break;
                        case "Sort":
                            hashSort();
                            break;
                        case "ClearButton":
                            pageHandler.setCloseCommentText(" ");
                            break;
                        case "Answer":
                            generateAnswer(e.target.title);
                            break;
                    }
        };
    if (!Task.service)
        return;
    let el2 = pageHandler.getElementById("el2");
    if (el2)
        el2.onclick = (e) => {
            if (e.target.tagName == "BUTTON") {
                if (e.target.className == "type-define") {
                    treeHandler.generateThree(Task);
                }
            }
        };
}

function inputRecheak() {
    const inputCheak = setInterval(function () {
        const body = pageHandler.getBody();
        if (body.length > 0) {
            clearInterval(inputCheak);
            body[0].addEventListener("mousedown", () => {
                ifTask();
            })
            body[0].addEventListener("keydown", () => {
                ifTask();
            })
        }
    })
}

function valideteHashtag(hashtag) {
    for (let level = 0; level < conf.hashtags.length; level++)
        for (const hash of conf.hashtags[level])
            if (hashtag === hash.name) {
                checkMaxHashtags(hash[Task.max]);
                return level;
            }
    return -1;
}

function resetMaxHashtags() {
    Task.hashtagCont = Task.defHashtagCont;
}

function checkMaxHashtags(max) {
    if (max) {
        if (Task.hashtagCont > max)
            Task.hashtagCont = max;
    }
}

function hashSort(hashtag = ``) {
    let text = pageHandler.getTechInfoFieldText();
    const redex = new RegExp(treeHandler.getRegex(), "gm");
    let hashtagTree = redex.exec(text);
    if (hashtagTree === null)
        hashtagTree = "";
    else
        hashtagTree = hashtagTree.map(s => s.trim());
    text = text.replace(redex, ``);
    let hashtagIt = text.match(regHash);
    if (hashtagIt) {
        if (hashtag !== "")
            hashtagIt.push(hashtag);
    }
    else
        hashtagIt = [hashtag];
    hashtagIt = hashtagIt.map(s => s.trim());
    let hashArray = new Array(conf.hashtags.length + 1).fill(``);
    resetMaxHashtags();
    while (hashtagIt.length > 0) {
        const lvElem = valideteHashtag(hashtagIt[0] + " ")
        if (lvElem >= 0 && Task.sort)
            hashArray[lvElem] += hashtagIt[0];
        else
            hashArray[hashArray.length - 1] += hashtagIt[0] + " ";
        text = text.replace(hashtagIt[0], ``);
        hashtagIt.shift();
    }
    let com = ``;
    for (const el of hashArray)
        com += el;
    text = text.trim();
    com += text + " " + hashtagTree;
    setText(com);
    checkContentInfo();
}

function addStyle() {
    const styleElement = pageHandler.createStyle("closeStyle");
    let color = (() => {
        if (disableCommentTheme == "redLines")
            return "background-image: repeating-linear-gradient(-45deg, transparent, transparent 20px,#ff262638 20px,#ff262638 40px);"
        else if (disableCommentTheme == "gray")
            return "background-color: #f9f9f9;"
    })()
    styleElement.innerHTML = `#${Task.closeComment_el}[disabled] {
        ${color};
        cursor: not-allowed;
    }`;
    document.head.appendChild(styleElement);
}

function addHashtag(hashtag) {
    hashSort(hashtag);
    generateEvent();
    getTaskType();
}

function addHashtagToEnd(text) {
    redex = new RegExp(treeHandler.getRegex(), "gm");
    let closeText = pageHandler.getTechInfoFieldText();
    if (redex.exec(closeText) !== null)
        closeText = closeText.replace(redex, text);
    else
        closeText += text;
    setText(closeText);
    hashSort();
}

function setText(text) {
    pageHandler.setTechInfoText(text);
    generateEvent();
    getTaskType();
}

function generateEvent() {
    if (pageHandler.Page.closeComment_el)
        pageHandler.Page.closeComment_el.focus();
    if (pageHandler.Page.TechInfo_el)
        pageHandler.Page.TechInfo_el.focus();
}

function generateButtAns() {
    let buttons = ``;
    if (!Task.answer.length)
        return "";
    for (const el of Task.answer) {
        buttons += pageHandler.genButton("Answer", el);
    }
    return pageHandler.genRow(buttons);
}

function generateAnswer(answerText) {
    // const regex = new RegExp(treeHandler.getRegex(), "gm");
    let text = pageHandler.getCloseFieldText();
    // let hashTree = regex.exec(text);
    // if (hashTree !== null) {
    //     hashTree = hashTree[0].trim();
    //     text = text.replace(regex, ``);
    // }
    // else
    //     hashTree = "";
    // setText(text + " " + answerText + " " + hashTree);
    pageHandler.setCloseCommentText(text + " " + answerText);
    if (pageHandler.Page.closeComment_el)
        pageHandler.Page.closeComment_el.focus();
}