class PageHandler {

    Task;

    #Ritm = {
        type: "Ritm",
        max: "maxElemRITM",
        closeComment_el: "#NNCaseTaskPageDetailedResultContainer_Control",
        closeComment_elNew: "#NNCaseTaskPageDetailedResultContainer_Control",
        closeComment_virtual: "NNCaseTaskPageDetailedResultMemoEdit-virtual",
        TechInfoContainer: "NNCaseTaskPageInformationClosedAndPausedGridLayoutGridLayout-item-NNCaseTaskPageIteSecondHandMaterialsContainer",
        TechInfoContainerNew: "NNCaseTaskPageNNAdditionalParametersGridLayoutGridLayout-item-NNCaseTaskPageIteSecondHandMaterialsContainer",
        TechInfoControl: "NNCaseTaskPageIteSecondHandMaterialsContainer_Control",
        TechInfoControlNew: "NNCaseTaskPageIteSecondHandMaterialsContainer",
        TechInfo_el: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-el",
        TechInfo_elNew: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-el",
        TechInfo_virtual: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-virtual",
        TechInfo_virtualNew: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-virtual",
        closeCode: "NNCaseTaskPageIteClosureCodeContainer",
        closeCodeNew: "NNCaseTaskPageIteClosureCodeContainer",
        closeCodeControl: "NNCaseTaskPageIteClosureCodeContainer_Control",
        closeCodeControlNew: "NNCaseTaskPageIteClosureCodeContainer_Control",
        buttonslayout: "NNCaseTaskPageInformationClosedAndPausedGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultContainer",
        buttonslayoutNew: "NNCaseTaskPageNNClosureGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultContainer",
        page_selector: "NNCaseTaskPageTabsTabPanel-tabpanel-items",
        TechInfo_find: false,
        answer: conf.Answers.RITM,
        sort: conf.sort.RITM,
        clearButton: conf.clearButton.RITM,
        hashtagsLevelStart: conf.hashLevel.RITM.start,
        hashtagsLevelEnd: conf.hashLevel.RITM.end,
        hashtagCont: conf.hashCount.RITM,
        defHashtagCont: conf.hashCount.RITM,
        disableComment: conf.disableComment.RITM,
        color: conf.color.RITM,
    }

    #Inc = {
        type: "Inc",
        max: "maxElemINC",
        closeComment_el: "#NNCaseTaskPageDetailedResultIncidentContainer_Control",
        closeComment_elNew: "#NNCaseTaskPageDetailedResultContainer_Control",
        closeComment_virtual: "NNCaseTaskPageDetailedResultIncidentMemoEdit-virtual",
        // closeComment_virtualNew: "NNCaseTaskPageDetailedResultMemoEdit-virtual",
        TechInfoContainer: "NNCaseTaskPageInformationClosedAndPausedIncidentGridLayoutGridLayout-item-NNCaseTaskPageIteSecondHandMaterialsIncidentContainer",
        TechInfoContainerNew: "NNCaseTaskPageNNAdditionalParametersGridLayoutGridLayout-item-NNCaseTaskPageIteSecondHandMaterialsContainer",
        TechInfoControl: "NNCaseTaskPageIteSecondHandMaterialsIncidentContainer",
        TechInfoControlNew: "NNCaseTaskPageIteSecondHandMaterialsContainer",
        TechInfo_el: "NNCaseTaskPageIteSecondHandMaterialsIncidentMemoEdit-el",
        TechInfo_elNew: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-el",
        TechInfo_virtual: "NNCaseTaskPageIteSecondHandMaterialsIncidentMemoEdit-virtual",
        TechInfo_virtualNew: "NNCaseTaskPageIteSecondHandMaterialsMemoEdit-virtual",
        closeCode: "NNCaseTaskPageIteClosureCodeIncidentContainer",
        closeCodeNew: "NNCaseTaskPageIteClosureCodeContainer",
        closeCodeControl: "NNCaseTaskPageIteClosureCodeIncidentContainer_Control",
        closeCodeControlNew: "NNCaseTaskPageIteClosureCodeContainer_Control",
        buttonslayout: "NNCaseTaskPageInformationClosedAndPausedIncidentGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultIncidentContainer",
        buttonslayoutNew: "NNCaseTaskPageNNClosureGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultContainer",
        page_selector: "NNCaseTaskPageTabsTabPanel-tabpanel-items",
        new_visualization: false,
        TechInfo_find: false,
        answer: conf.Answers.INC,
        sort: conf.sort.INC,
        clearButton: conf.clearButton.INC,
        hashtagsLevelStart: conf.hashLevel.INC.start,
        hashtagsLevelEnd: conf.hashLevel.INC.end,
        hashtagCont: conf.hashCount.INC,
        defHashtagCont: conf.hashCount.INC,
        disableComment: conf.disableComment.INC,
        color: conf.color.INC,
    }

    Page = {};

    ifTask() {
        const elem = this.getCreatioHeader();
        if (elem != null) {
            const regex = /(TASK)\d*/gm;
            if (elem.textContent.match(regex)) {
                return true;
            }
        }
        return false;
    }

    getRequestType() {
        const taskText = this.getNumberRequest();
        const incReg = /(INC)\d*/gm;
        const ritReg = /(RITM)\d*/gm;
        if (taskText.match(incReg))
            return this.setTask(this.#Inc);
        if (taskText.match(ritReg))
            return this.setTask(this.#Ritm);
    }

    setTask(type) {
        return this.Task = type;
    }

    getCreatioHeader() {
        return this.getElementById("MainHeaderSchemaPageHeaderCaptionLabel");
    }

    getNumberRequest() {
        return this.getElementById("NNCaseTaskPageCaseLookupEdit-link-el").textContent;
    }

    getAllServiceFields() {
        return document.querySelector(`[id*="ServiceOfferingLookupEdit-link-el"]`);
    }

    getIframe(elem) {
        let doc = document.querySelector(elem + " iframe")
        if (doc) {
            return doc.contentDocument.body;
        }
    }

    getIframe(elem1, elem2) {
        let doc = document.querySelector(elem1 + " iframe") || document.querySelector(elem2 + " iframe")
        if (doc) {
            return doc.contentDocument.body;
        }
    }

    setSizeTechInfo() {
        this.Page.TechInfoContainer.style.width = "100%";
    }

    getCommentField() {
        const TechInfoContainer = this.getElementById(Task.TechInfoContainer, Task.TechInfoContainerNew);
        const TechInfoControl = this.getElementById(Task.TechInfoControl, Task.TechInfoControlNew);
        const TechInfo_el = this.getElementById(Task.TechInfo_el, Task.TechInfo_elNew);
        const TechInfo_virtual = this.getElementById(Task.TechInfo_virtual, Task.TechInfo_virtualNew);
        const closeComment_el = this.getIframe(Task.closeComment_el, Task.closeComment_elNew);
        // const closeComment_virtual = this.getElementById(Task.closeComment_virtual);
        const closeCodeControl = this.getElementById(Task.closeCodeControl, Task.closeCodeControlNew);
        const closeCode = this.getElementById(Task.closeCode, Task.closeCodeNew);
        this.Page.TechInfoControl = TechInfoControl;
        this.Page.TechInfoContainer = TechInfoContainer;
        this.Page.TechInfo_el = TechInfo_el;
        this.Page.TechInfo_virtual = TechInfo_virtual;
        if (closeComment_el) {
            if (closeComment_el.clientHeight > 0) {
                this.Page.closeComment_el = closeComment_el;
                this.Page.closeComment_virtual = closeComment_el.children[0];
            }
        }
        this.Page.closeCodeControl = closeCodeControl;
        this.Page.closeCode = closeCode;
        if (TechInfoContainer) {
            if (TechInfoContainer.id == Task.TechInfoContainer) {
                this.setSizeTechInfo();
                this.Page.TechInfo_find = true;
            }
            if (TechInfoContainer.id == Task.TechInfoContainerNew)
                this.Page.TechInfo_find = true;
        }
        else {
            this.Page.TechInfo_find = false;
        }
        if (this.Page.closeComment_el && closeCodeControl && closeCode !== "undefined")
            return true;
        else
            return false;
    }

    select_TechInfo() {
        this.Page.new_visualization = true
        const selector = this.getElementById(this.Task.page_selector);
        selector.children[2].click();
        selector.children[0].click();
    }

    to_additional_info_page() {
        const selector = this.getElementById(this.Task.page_selector);
        selector.children[2].click();
    }

    to_main_page() {
        const selector = this.getElementById(this.Task.page_selector);
        selector.children[0].click();
    }

    getOverlay() {
        return this.getElementById("overlay");
    }

    generateOverlay() {
        return `<div class="overlay" id="overlay"></div>`;
    }

    getNotationKE() {
        return this.getElementById("NotationKE");
    }

    generateOverlayNotation() {
        return `<div class="overlay-notation" id="overlay"><a class="text-notation">Нет привязки к типу проблемы!</a></div>`;
    }

    generateNotationKE() {
        return `<div class="NotationKE" id="NotationKE"><a class="text-notation">Нет привязки к KE!</a></div>`;
    }

    generateTechInfoNotation() {
        return `<div class="overlay-notation" id="tech-info-notation"><a class="text-notation">С чем проблема? Как проявлялась? Как решено?</a></div>`;
    }

    getBody() {
        return document.getElementsByTagName("body");
    }

    getHashButtons() {
        return this.getElementById("hashButtons");
    }

    createStyle(id) {
        let existElem = document.getElementById(id);
        if (!existElem) {
            existElem = document.createElement(`style`);
            existElem.id = id;
        }
        return existElem
    }

    addOverlay() {
        if (!this.getOverlay()) {
            this.Page.closeCodeControl.insertAdjacentHTML("afterbegin", pageHandler.generateOverlay())
            this.Page.closeCode.insertAdjacentHTML("beforeend", pageHandler.generateOverlayNotation())
        }
    }

    addNotationKE() {
        if (this.Page.closeCode)
            if (!this.getNotationKE()) {
                this.Page.closeCode.insertAdjacentHTML("beforeend", pageHandler.generateNotationKE())
            }
    }

    removeOverlay() {
        let overlay = this.getOverlay();
        if (overlay)
            overlay.remove();
    }

    removeNotationKE() {
        let NotationKE = this.getNotationKE();
        if (NotationKE)
            NotationKE.remove();
    }

    getElementById(id) {
        return document.getElementById(id);
    }

    getElementById(id1, id2) {
        return document.getElementById(id1) || document.getElementById(id2);
    }

    getTechInfoFieldText() {
        return this.Page.TechInfo_virtual.value;
    }

    getCloseFieldText() {
        if (this.Page.closeComment_virtual)
            return this.Page.closeComment_virtual.innerText;
    }

    getCloseFieldTextEl() {
        return this.Page.TechInfo_el.value;
    }

    getButtonslayout() {
        return this.getElementById(this.Task.buttonslayout, this.Task.buttonslayoutNew);
    }

    getButtType() {
        return this.getElementById("el2")
    }

    setCloseCommentStyle(color, disable) {
        if (this.Page.closeComment_el) {
            this.Page.closeComment_el.style.backgroundColor = color;
            this.Page.closeComment_el.disabled = disable;
        }
    }

    setCloseCommentText(text) {
        if (this.Page.closeComment_virtual)
            this.Page.closeComment_virtual.innerText = text;
    }

    setTechInfoStyle(color, disable) {
        this.Page.TechInfo_el.style.backgroundColor = color;
        this.Page.TechInfo_el.disabled = disable;
    }

    setTechInfoText(text) {
        this.Page.TechInfo_virtual.value = text;
        this.Page.TechInfo_el.value = text;
    }

    getTechInfoNotation() {
        return this.getElementById("tech-info-notation")
    }

    setTechInfoNotation() {
        let TechInfoNotation = this.getTechInfoNotation();
        if (!TechInfoNotation)
            this.Page.TechInfoControl.insertAdjacentHTML("beforeend", pageHandler.generateTechInfoNotation())
    }

    removeTechInfoNotation() {
        let TechInfoNotation = this.getTechInfoNotation();
        if (TechInfoNotation)
            TechInfoNotation.remove()
    }

    genRow(el) {
        if (el != ``)
            return `<div class="grid-layout-row ts-box-sizing hashButtons" id="hashButtons">
                <div class="ts-box-sizing base-edit-with-right-icon base-edit-disabled date-edit datetime-datecontrol">
                    ${el}
                </div>
            </div>`
    }

    genButton(type, el) {
        return `<button class="${type}" title="${el.title}">${el.name}</button>`
    }

    generateButtType() {
        return `
            <div  id="el2" class="grid-layout-row ts-box-sizing">
                <div class="grid-layout-column ts-box-sizing">
                    <div class="control-width-15 control-left control-right">
                        <div id="NNCaseTaskPageDetailedResultIncidentContainer_Label" class="label-wrap">
                            <label class="t-label t-label-is-required t-label-disabled">
                                Определить принадлежность к проблемам
                            </label>
                        </div>
                        <div class="control-wrap">
                            <div class="grid-layout-row ts-box-sizing hashButtons" id="hashButtons" style="margin-top: 10%;">
                                <div class="ts-box-sizing base-edit-with-right-icon base-edit-disabled date-edit datetime-datecontrol">
                                    <button class="type-define" title="Определить тип проблемы">Определить тип проблемы</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}