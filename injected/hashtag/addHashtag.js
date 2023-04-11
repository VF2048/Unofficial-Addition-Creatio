let conf = {
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
    hashtags: Hashtags,
    disableComment:{
        RITM: disableCommentRitm,
        INC: disableCommentInc,
    },
    Answers: {
        RITM: AnswersRitm,
        INC: AnswersINC,
    },
};

const Ritm = {
    type: "Ritm",
    max: "maxElemRITM",
    closeComment_el: "ActivityPageV2DetailedResultMemoEdit-el",
    closeComment_virtual: "ActivityPageV2DetailedResultMemoEdit-virtual",
    buttonslayout: "ActivityPageV2InformationClosedAndPausedGridLayoutGridLayout-item-ActivityPageV2DetailedResultContainer",
    answer: conf.Answers.RITM,
    sort: conf.sort.RITM,
    hashtagsLevelStart: conf.hashLevel.RITM.start,
    hashtagsLevelEnd: conf.hashLevel.RITM.end,
    hashtagCont: conf.hashCount.RITM,
    defHashtagCont: conf.hashCount.RITM,
    disableComment:conf.disableComment.RITM,
}

const Inc = {
    type: "Inc",
    max: "maxElemINC",
    closeComment_el: "ActivityPageV2DetailedResultIncidentMemoEdit-el",
    closeComment_virtual: "ActivityPageV2DetailedResultIncidentMemoEdit-virtual",
    buttonslayout: "ActivityPageV2InformationClosedAndPausedIncidentGridLayoutGridLayout-item-ActivityPageV2DetailedResultIncidentContainer",
    answer: conf.Answers.INC,
    sort: conf.sort.INC,
    hashtagsLevelStart: conf.hashLevel.INC.start,
    hashtagsLevelEnd: conf.hashLevel.INC.end,
    hashtagCont: conf.hashCount.INC,
    defHashtagCont: conf.hashCount.INC,
    disableComment:conf.disableComment.INC,
}

let Task;
let commend;
const regHash = /(#\S+)\s+?/gm;

(function () {
    'use strict';

    main();
    inputRecheak();
})();

function main() {
    ifTask();
}

function ifTask() {
    const ifReady = setInterval(function () {
        const elem = document.getElementById("MainHeaderSchemaPageHeaderCaptionLabel");
        if (elem != null) {
            const regex = /(TASK)\d*/gm;
            if (elem.textContent.match(regex)) {
                clearInterval(ifReady);
                tasktype();
                addButtons();
            }
        }
    }, 100)
}

function tasktype() {
    const task = document.getElementById("ActivityPageV2CaseLookupEdit-link-el");
    const taskText = task.textContent
    const incReg = /(INC)\d*/gm;
    const ritReg = /(RITM)\d*/gm;
    if (taskText.match(incReg))
        Task = Inc;
    if (taskText.match(ritReg))
        Task = Ritm;
    checkHashtag();
    addStyle();
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
    let text = commend.closeComment_virtual.value;
    let hashtagIt = text.match(regHash);
    if (hashtagIt)
        hashtagIt.push(hashtag);
    else
        hashtagIt = [hashtag];
    let hashArray = new Array(conf.hashtags.length + 1).fill(``);
    resetMaxHashtags();
    while (hashtagIt.length > 0) {
        const lvElem = valideteHashtag(hashtagIt[0].trim())
        if (lvElem >= 0 && Task.sort)
            hashArray[lvElem] += hashtagIt[0];
        else
            hashArray[hashArray.length - 1] += hashtagIt[0];
        text = text.replace(hashtagIt[0], ``);
        hashtagIt.shift();
    }
    let com = ``;
    for (const el of hashArray)
        com += el;
    com += text;
    setText(com);
    checkHashtag();
}

function addStyle() {
    const styleElement = document.createElement(`style`);
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

function checkHashtag() {
    commend = getCommentField();
    const text = commend.closeComment_virtual.value;
    let hashtagIt = text.match(regHash);
    if (hashtagIt == null) {
        if (Task.disableComment) {
            commend.closeComment_el.style.backgroundColor = null;
            commend.closeComment_el.disabled = true;
            return;
        }
        else {
            commend.closeComment_el.style.backgroundColor = "#ff262638";
            commend.closeComment_el.disabled = false;
        }
    }
    else if (hashtagIt.length < Task.hashtagCont && Task.disableComment == "one") {
        commend.closeComment_el.style.backgroundColor = "#ff262638";
        commend.closeComment_el.disabled = false;
    }
    else if (hashtagIt.length >= Task.hashtagCont) {
        commend.closeComment_el.style.backgroundColor = null;
        commend.closeComment_el.disabled = false;
    }
}

function genButton(type, el) {
    return `<button class="${type}" title="${el.title}">${el.name}</button>`
}

function genRow(el) {
    if (el != ``)
        return `<div class="grid-layout-row ts-box-sizing hashButtons" id="hashButtons">
            <div class="ts-box-sizing base-edit-with-right-icon base-edit-disabled date-edit datetime-datecontrol">
                ${el}
            </div>
        </div>`
}

function generateButtHash() {
    let buttons = ``;
    for (let i = Task.hashtagsLevelStart - 1; i < Task.hashtagsLevelEnd; i++) {
        let batton = ``;
        for (let el of conf.hashtags[i]) {
            batton += genButton("Hashtag", el);
        }
        buttons += genRow(batton);
    }
    return `
        <div  id="el1">
            ${buttons}
            ${Task.sort ? genRow(`<button class="Sort">Отсортировать #</button>`) : ``}
            ${generateButtAns()}
        </div>`;
}

function generateButtAns() {
    let buttons = ``;
    for (const el of Task.answer) {
        buttons += genButton("Answer", el);
    }
    return genRow(buttons);
}

function addButtons() {
    if (document.getElementById("hashButtons") != null)
        return;
    const closeLayout = document.getElementById(Task.buttonslayout);
    const parent = closeLayout.parentElement;
    parent.insertAdjacentHTML("beforebegin", generateButtHash());
    buttonHandler();
}

function buttonHandler() {
    document.getElementById("el1").onclick = (e) => {
        if (e.target.tagName == "BUTTON") {
            if (e.target.className == "Hashtag")
                addHashtag(e.target.textContent + " ");
            if (e.target.className == "Sort")
                hashSort();
            if (e.target.className == "Answer")
                setText(e.target.title);
        }
    };
}

function addHashtag(hashtag) {
    hashSort(hashtag);
    generateEvent();
    tasktype();
}

function setText(text) {
    commend.closeComment_virtual.value = text;
    commend.closeComment_el.value = text;
    generateEvent();
    tasktype();
}

function getCommentField() {
    const closeComment_el = document.getElementById(Task.closeComment_el);
    const closeComment_virtual = document.getElementById(Task.closeComment_virtual);
    return { closeComment_el, closeComment_virtual };
}

function generateEvent() {
    document.getElementById(Task.closeComment_el).focus();
}

function inputRecheak() {
    const inputCheak = setInterval(function () {
        const body = document.getElementsByTagName("body");
        if (body.length > 0) {
            clearInterval(inputCheak);
            body[0].addEventListener("mousedown", () => {
                main();
            })
            body[0].addEventListener("keydown", () => {
                main();
            })
        }
    })
}