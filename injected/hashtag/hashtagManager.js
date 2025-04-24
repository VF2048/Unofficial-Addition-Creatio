class HashtagManager {
    static regHash = /(#\S+)(\s+?|$)/gm;

    constructor(configManager, pageHandler) {
        this.conf = configManager.config;
        this.configManager = configManager;
        this.pageHandler = pageHandler;
        this.init();
    }

    init() {
        this.checkHashtagsAvailability();
        // this.setupEventListeners();
    }

    checkHashtagsAvailability() {
        // const checkExist = setInterval(() => {
        //     if (typeof Hashtags !== "undefined") {
        //         clearInterval(checkExist);
        this.setConfig();
        //     }
        // }, 100);
    }

    setConfig() {
        this.treeHandler = new HashtagTreeHandler(hashtagTree, this.addHashtagToEnd.bind(this));
        this.monitorTaskState();
        this.inputRecheak();
    }

    getTaskType() {
        this.pageHandler.getRequestType();
        this.handleFields();
    }

    monitorTaskState() {
        const ifReady = setInterval(() => {
            if (this.pageHandler.ifTask()) {
                clearInterval(ifReady);
                this.getTaskType();
            }
        }, 100)
    }

    handleFields() {
        const ifFieldsFound = setInterval(() => {
            if (!this.pageHandler.ifTask()) {
                clearInterval(ifFieldsFound);
                return;
            }

            let fieldsState = false;
            try {
                fieldsState = this.pageHandler.getCommentField();
                this.closeText = this.pageHandler.getTechInfoFieldText();
            } catch (err) {
                // console.log(err);
                this.pageHandler.select_TechInfo();
                fieldsState = this.pageHandler.getCommentField();
            }
            if (fieldsState) {
                clearInterval(ifFieldsFound);
                this.findService();
                this.addButtons();
                // setcolor(Task.color);
                this.checkContentInfo();
                this.addStyle();
            }
        }, 1000)
    }


    checkContentInfo() {
        this.pageHandler.getCommentField();
        if (!this.configManager.task.TechInfo_find || !this.configManager.config.treeEnable) return;

        if (this.configManager.page.service) {
            const redex = new RegExp(this.treeHandler.getRegex(), "gm");
            this.closeText = this.pageHandler.getTechInfoFieldText();
            const hashtagTreeMatch = redex.exec(this.closeText)
            if (!hashtagTreeMatch && this.configManager.task.type === "Inc")
                this.pageHandler.addOverlay();
            else
                this.pageHandler.removeOverlay();
        }
        else {
            this.pageHandler.removeOverlay();
        }

        // let hashtagIt = this.closeText.match(regHash);
        // let text = this.closeText.replace(regHash, '').trim();
        // if (this.configManager.page.type === "Inc")
        // if (!text) {
        //     this.pageHandler.setTechInfoStyle("#ff262638", false);
        //     this.pageHandler.setTechInfoNotation();
        // }
        // else {
        //     this.pageHandler.setTechInfoStyle(null, false);
        //     this.pageHandler.removeTechInfoNotation();
        // }
        // if (hashtagIt == null) {
        //     if (this.configManager.page.disableComment) {
        //         this.pageHandler.setCloseCommentStyle(null, true);
        //         return;
        //     }
        //     else {
        //         this.pageHandler.setCloseCommentStyle(null, false);
        //     }
        // }
        // else if (hashtagIt.length < this.configManager.page.hashtagCont && this.configManager.page.disableComment == "one") {
        //     this.pageHandler.setCloseCommentStyle("#ff262638", false);
        // }
        // else if (hashtagIt.length >= this.configManager.page.hashtagCont) {
        //     this.pageHandler.setCloseCommentStyle(null, false);
        // }
    }

    findService() {
        const elem = this.pageHandler.getAllServiceFields();
        this.configManager.page.service = Object.keys(serviceList).find(key => elem.text === serviceList[key]);
    }

    generateButtHash() {
        let buttons = '';
        if (this.configManager.task.TechInfo_find && this.conf.enable) {
            buttons = this.conf.hashtags.map(elem =>
                this.pageHandler.genButton("Hashtag", elem)
            ).join('');
        }
        return `
            <div  id="el1">
                ${buttons ? this.pageHandler.genRow(buttons) : ``}
                ${this.configManager.task.sort ? this.pageHandler.genRow(`<button class="Sort">Отсортировать #</button>`) : ``}
                ${this.configManager.task.clearButton ? this.pageHandler.genRow(`<button class="ClearButton">ClearText</button>`) : ``}
                ${this.generateAnswerButtons()}
            </div>`;
    }

    handleDynamicButtons(parent) {
        if (!this.configManager.config.treeEnable) return;
        const type = this.pageHandler.getButtType();
        if (!type) {
            if (this.configManager.task.type === "Inc" && this.configManager.page.service && this.configManager.task.TechInfo_find) {
                parent.insertAdjacentHTML("afterend", this.pageHandler.generateButtType());
            }
        }
        else if (!this.configManager.page.service) {
            type.remove();
        }
    }

    addButtons() {
        const closeLayout = this.pageHandler.getButtonslayout();
        const parent = closeLayout.parentElement;

        if (!this.pageHandler.getElementById("el1")) {
            parent.insertAdjacentHTML("beforebegin", this.generateButtHash());
        }

        this.handleDynamicButtons(parent);
        this.setupButtonHandlers();
    }

    setupButtonHandlers() {
        let el1 = this.pageHandler.getElementById("el1");
        if (el1)
            el1.onclick = (e) => this.handleButtonel1Click(e);
        if (!this.configManager.page.service)
            return;
        let el2 = this.pageHandler.getElementById("el2");
        if (el2)
            el2.onclick = (e) => this.handleButtonel2Click(e);
    }

    handleButtonel1Click(e) {
        if (!e.target.tagName == "BUTTON" || !this.pageHandler.getCommentField()) return;

        switch (e.target.className) {
            case "Hashtag":
                this.addHashtag(e.target.textContent + " ");
                break;
            case "Sort":
                this.hashSort();
                break;
            case "ClearButton":
                this.pageHandler.setCloseCommentText(" ");
                break;
            case "Answer":
                this.generateAnswer(e.target.title);
                break;
        }
    }

    handleButtonel2Click(e) {
        if (!e.target.tagName == "BUTTON" || !e.target.className == "type-define") return;
        this.treeHandler.generateThree(this.configManager.page);
    }

    inputRecheak() {
        const inputCheak = setInterval(() => {
            const body = this.pageHandler.getBody();
            if (body.length > 0) {
                clearInterval(inputCheak);
                body[0].addEventListener("mousedown", () => {
                    this.monitorTaskState();
                })
                body[0].addEventListener("keydown", () => {
                    this.monitorTaskState();
                })
            }
        })
    }

    valideteHashtag(hashtag) {
        for (let level = 0; level < this.conf.hashtags.length; level++) {
            const found = this.conf.hashtags[level].find(h => h.name === hashtag);
            if (found) {
                this.checkMaxHashtags(found[this.configManager.page.max]);
                return level;
            }
        }
        return -1;
    }

    resetMaxHashtags() {
        this.configManager.page.hashtagCont = this.configManager.page.defHashtagCont;
    }

    checkMaxHashtags(max) {
        if (max && this.configManager.page.hashtagCont > max) {
            this.configManager.page.hashtagCont = max;
        }
    }

    hashSort(hashtag = ``) {
        if (this.configManager.page.new_visualization) {
            this.generateCloseCommentEvent();
            this.pageHandler.to_additional_info_page();
        }
        this.pageHandler.getCommentField();
        let text = this.pageHandler.getTechInfoFieldText();
        const redex = new RegExp(this.treeHandler.getRegex(), "gm");
        let hashtagTree = redex.exec(text);
        if (hashtagTree === null)
            hashtagTree = "";
        else
            hashtagTree = hashtagTree.map(s => s.trim());
        text = text.replace(redex, ``);
        let hashtagIt = text.match(this.regHash);
        if (hashtagIt) {
            if (hashtag !== "")
                hashtagIt.push(hashtag);
        }
        else
            hashtagIt = [hashtag];
        hashtagIt = hashtagIt.map(s => s.trim());
        let hashArray = new Array(this.conf.hashtags.length + 1).fill(``);
        this.resetMaxHashtags();
        while (hashtagIt.length > 0) {
            // const lvElem = valideteHashtag(hashtagIt[0] + " ")
            const lvElem = 1
            if (lvElem >= 0 && this.configManager.page.sort)
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
        this.setText(com);
        this.checkContentInfo();
    }

    addStyle() {
        const styleElement = this.pageHandler.createStyle("closeStyle");
        let color = (() => {
            if (this.conf.disableCommentTheme == "redLines")
                return "background-image: repeating-linear-gradient(-45deg, transparent, transparent 20px,#ff262638 20px,#ff262638 40px);"
            else if (this.conf.disableCommentTheme == "gray")
                return "background-color: #f9f9f9;"
        })()
        styleElement.innerHTML = `#${this.configManager.page.closeComment_el}[disabled] {
            ${color};
            cursor: not-allowed;
        }`;
        document.head.appendChild(styleElement);
    }

    addHashtag(hashtag) {
        this.hashSort(hashtag);
        // generateEvent();
        this.getTaskType();
    }

    addHashtagToEnd(text) {
        let redex = new RegExp(this.treeHandler.getRegex(), "gm");
        if (this.configManager.page.new_visualization) {
            this.pageHandler.to_additional_info_page();
        }

        let closeText = this.pageHandler.getTechInfoFieldText();
        closeText = redex.test(closeText)
            ? closeText.replace(redex, text)
            : closeText + text;

        this.setText(closeText);

        if (!this.configManager.page.new_visualization) {
            this.hashSort();
        }
    }

    setText(text) {
        if (this.configManager.page.new_visualization) {
            this.pageHandler.to_additional_info_page();
        }
        this.pageHandler.getCommentField();
        this.configManager.page.TechInfo_el.click();
        this.configManager.page.TechInfo_el.focus();
        this.pageHandler.setTechInfoText(text);
        this.generateTechInfoEvent();
        this.getTaskType();
    }

    generateTechInfoEvent() {
        if (this.configManager.page.TechInfo_el) {
            if (this.configManager.task.new_visualization) {
                this.pageHandler.to_additional_info_page();
            }
            this.configManager.page.TechInfo_el.click();
            this.configManager.page.TechInfo_el.focus();

        }
        setTimeout(() => {
            this.generateCloseCommentEvent();
        }, 10);
    }

    generateCloseCommentEvent() {
        if (this.configManager.page.new_visualization) {
            this.pageHandler.to_main_page();
        }
        if (this.configManager.page.closeComment_el)
            this.configManager.page.closeComment_el.focus();
    }

    generateAnswerButtons() {
        let buttons = ``;
        if (!this.configManager.task.answer.length)
            return "";
        for (const el of this.configManager.task.answer) {
            buttons += this.pageHandler.genButton("Answer", el);
        }
        return this.pageHandler.genRow(buttons);
    }

    generateAnswer(answerText) {
        // const regex = new RegExp(this.treeHandler.getRegex(), "gm");
        let text = this.pageHandler.getCloseFieldText();
        // let hashTree = regex.exec(text);
        // if (hashTree !== null) {
        //     hashTree = hashTree[0].trim();
        //     text = text.replace(regex, ``);
        // }
        // else
        //     hashTree = "";
        // setText(text + " " + answerText + " " + hashTree);
        this.pageHandler.setCloseCommentText(text + " " + answerText);
        if (this.configManager.page.closeComment_el)
            this.configManager.page.closeComment_el.focus();
    }
}