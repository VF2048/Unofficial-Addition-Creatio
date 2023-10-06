class PageHandler {

    Task;

    Ritm = {
        type: "Ritm",
        max: "maxElemRITM",
        closeComment_el: "NNCaseTaskPageDetailedResultMemoEdit-el",
        closeComment_virtual: "NNCaseTaskPageDetailedResultMemoEdit-virtual",
        closeCode: "NNCaseTaskPageIteClosureCodeComboBoxEdit-el",
        buttonslayout: "NNCaseTaskPageInformationClosedAndPausedGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultContainer",
        answer: conf.Answers.RITM,
        sort: conf.sort.RITM,
        hashtagsLevelStart: conf.hashLevel.RITM.start,
        hashtagsLevelEnd: conf.hashLevel.RITM.end,
        hashtagCont: conf.hashCount.RITM,
        defHashtagCont: conf.hashCount.RITM,
        disableComment: conf.disableComment.RITM,
        color: conf.color.RITM,
    }

    Inc = {
        type: "Inc",
        max: "maxElemINC",
        closeComment_el: "NNCaseTaskPageDetailedResultIncidentMemoEdit-el",
        closeComment_virtual: "NNCaseTaskPageDetailedResultIncidentMemoEdit-virtual",
        closeCode: "NNCaseTaskPageIteClosureCodeIncidentContainer_Control",
        buttonslayout: "NNCaseTaskPageInformationClosedAndPausedIncidentGridLayoutGridLayout-item-NNCaseTaskPageDetailedResultIncidentContainer",
        answer: conf.Answers.INC,
        sort: conf.sort.INC,
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
            return this.setTask(this.Inc);
        if (taskText.match(ritReg))
            return this.setTask(this.Ritm);
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

    getCommentField() {
        const closeComment_el = this.getElementById(Task.closeComment_el);
        const closeComment_virtual = this.getElementById(Task.closeComment_virtual);
        const closeCode = this.getElementById(Task.closeCode);
        this.Page.closeComment_el = closeComment_el;
        this.Page.closeComment_virtual = closeComment_virtual;
        this.Page.closeCode = closeCode;
        return { closeComment_el, closeComment_virtual, closeCode };
    }

    getOverlay() {
        return this.getElementById("overlay");
    }

    generateOverlay() {
        return `<div class="overlay" id="overlay"></div>`;
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
        if (!this.getOverlay())
            this.Page.closeCode.insertAdjacentHTML("afterbegin", pageHandler.generateOverlay())
    }

    removeOverlay() {
        let overlay = this.getOverlay();
        if (overlay)
            overlay.remove();
    }

    getElementById(id) {
        return document.getElementById(id);
    }

    getCloseFieldText() {
        return this.Page.closeComment_virtual.value;
    }

    getCloseFieldTextEl() {
        return this.Page.closeComment_el.value;
    }

    getButtonslayout() {
        return this.getElementById(this.Task.buttonslayout);
    }

    getButtType(){
        return this.getElementById("el2")
    }

    setCloseCommentStyle(color, disable) {
        this.Page.closeComment_el.style.backgroundColor = color;
        this.Page.closeComment_el.disabled = disable;
    }

    setCloseCommentText(text) {
        this.Page.closeComment_virtual.value = text;
        this.Page.closeComment_el.value = text;
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