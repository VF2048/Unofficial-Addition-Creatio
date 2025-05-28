class PageHandler {

    constructor(configManager) {
        this.configManager = configManager;
        this.conf = configManager.config;
    }

    ifTask() {
        const elem = this.getCreatioHeader();
        if (elem != null) {
            const regex = /(TASK)\d*/gm;
            if (elem.textContent.match(regex)) {
                return true;
            }
        }
        this.configManager.page.new_visualization = false;
        return false;
    }

    getRequestType() {
        const taskText = this.getNumberRequest();
        const incReg = /(INC)\d*/gm;
        const ritReg = /(RITM)\d*/gm;
        if (taskText.match(incReg))
            return this.configManager.setTask("INC");
        if (taskText.match(ritReg))
            return this.configManager.setTask("RITM");
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
        this.configManager.page.TechInfoContainer.style.width = "100%";
    }

    getCommentField() {
        const TechInfoContainer = this.getElementById(this.configManager.task.TechInfoContainer, this.configManager.task.TechInfoContainerNew);
        const TechInfoControl = this.getElementById(this.configManager.task.TechInfoControl, this.configManager.task.TechInfoControlNew);
        const TechInfo_el = this.getElementById(this.configManager.task.TechInfo_el, this.configManager.task.TechInfo_elNew);
        const TechInfo_virtual = this.getElementById(this.configManager.task.TechInfo_virtual, this.configManager.task.TechInfo_virtualNew);
        const closeComment_el = this.getIframe(this.configManager.task.closeComment_el, this.configManager.task.closeComment_elNew);
        // const closeComment_virtual = this.getElementById(this.configManager.task.closeComment_virtual);
        const closeCodeControl = this.getElementById(this.configManager.task.closeCodeControl, this.configManager.task.closeCodeControlNew);
        const closeCode = this.getElementById(this.configManager.task.closeCode, this.configManager.task.closeCodeNew);
        const complete = this.getElementById(this.configManager.task.complete);
        this.configManager.page.complete = complete;
        this.configManager.page.TechInfoControl = TechInfoControl;
        this.configManager.page.TechInfoContainer = TechInfoContainer;
        this.configManager.page.TechInfo_el = TechInfo_el;
        this.configManager.page.TechInfo_virtual = TechInfo_virtual;
        if (closeComment_el) {
            if (closeComment_el.clientHeight > 0) {
                this.configManager.page.closeComment_el = closeComment_el;
                this.configManager.page.closeComment_virtual = closeComment_el.children[0];
            }
        }
        this.configManager.page.closeCodeControl = closeCodeControl;
        this.configManager.page.closeCode = closeCode;
        if (TechInfoContainer) {
            if (TechInfoContainer.id == this.configManager.task.TechInfoContainer) {
                this.setSizeTechInfo();
                this.configManager.task.TechInfo_find = true;
            }
            if (TechInfoContainer.id == this.configManager.task.TechInfoContainerNew && TechInfoContainer.childElementCount)
                this.configManager.task.TechInfo_find = true;
        }
        else {
            this.configManager.task.TechInfo_find = false;
        }
        if (this.configManager.page.closeComment_el && closeCodeControl && closeCode !== "undefined")
            return true;
        else
            return false;
    }

    select_TechInfo() {
        if (!this.configManager.page.new_visualization) {
            this.configManager.page.new_visualization = true
            const selector = this.getElementById(this.configManager.task.page_selector);
            selector.children[2].click();
            selector.children[0].click();
        }
    }

    to_additional_info_page() {
        const selector = this.getElementById(this.configManager.task.page_selector);
        selector.children[2].click();
    }

    to_main_page() {
        const selector = this.getElementById(this.configManager.task.page_selector);
        selector.children[0].click();
    }

    getOverlay() {
        return this.getElementById("overlay");
    }

    getOverlayComplete() {
        return this.getElementById("overlayComplete");
    }

    generateOverlay() {
        return `<div class="overlay" id="overlay"></div>`;
    }

    generateOverlayComplete() {
        return `<div class="overlay" id="overlayComplete"></div>`;
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

    generateNumberRequestButton() {
        return `<button id="NumberRequestButton">Запросить</button>`
    }

    getNumberRequestButton() {
        return this.getElementById("NumberRequestButton");
    }

    getNumbercontrol() {
        return this.getElementById("NNCaseTaskPageCaseEndUserPhoneContainer_Control");
    }

    getBody() {
        return document.getElementsByTagName("body");
    }

    getHashButtons() {
        return this.getElementById("hashButtons");
    }

    getContact() {
        return this.getElementById("NNCaseTaskPageCaseContactLookupEdit-link-el");
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
            this.configManager.task.overlay = true;
            this.configManager.page.closeCodeControl.insertAdjacentHTML("afterbegin", this.generateOverlay())
            this.configManager.page.closeCode.insertAdjacentHTML("beforeend", this.generateOverlayNotation())
        }
    }

    addNotationKE() {
        if (this.configManager.page.closeCode)
            if (!this.getNotationKE()) {
                this.configManager.page.closeCode.insertAdjacentHTML("beforeend", this.generateNotationKE())
            }
    }

    addNumberRequestButton() {
        if (this.getNumberRequestButton()) return;
        this.getNumbercontrol().insertAdjacentHTML("afterbegin", this.generateNumberRequestButton())
        this.getElementById("NumberRequestButton").onclick = () => {
            const to = this.getContact().innerText;
            const subject = encodeURIComponent(this.configManager.config.mail.subject);
            const body = encodeURIComponent(this.configManager.config.mail.body);
            const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        }
    }

    removeNumberRequestButton() {
        if (!this.getNumberRequestButton()) return;
        this.getNumberRequestButton().remove()
    }

    removeOverlay() {
        this.configManager.task.overlay = false;
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
        return this.configManager.page.TechInfo_virtual.value;
    }

    getCloseFieldText() {
        if (this.configManager.page.closeComment_virtual)
            return this.configManager.page.closeComment_virtual.innerText;
    }

    getCloseFieldTextEl() {
        return this.configManager.page.TechInfo_el.value;
    }

    getButtonslayout() {
        return this.getElementById(this.configManager.task.buttonslayout, this.configManager.task.buttonslayoutNew);
    }

    getButtType() {
        return this.getElementById("el2")
    }

    setCloseCommentStyle(color, disable) {
        if (this.configManager.page.closeComment_el) {
            this.configManager.page.closeComment_el.style.backgroundColor = color;
            this.configManager.page.closeComment_el.disabled = disable;
        }
    }

    setCloseCommentText(text) {
        if (this.configManager.page.closeComment_virtual)
            this.configManager.page.closeComment_virtual.innerText = text;
    }

    setTechInfoStyle(color, disable) {
        this.configManager.page.TechInfo_el.style.backgroundColor = color;
        this.configManager.page.TechInfo_el.disabled = disable;
    }

    setTechInfoText(text) {
        this.configManager.page.TechInfo_virtual.value = text;
        this.configManager.page.TechInfo_el.value = text;
    }

    getTechInfoNotation() {
        return this.getElementById("tech-info-notation")
    }

    setTechInfoNotation() {
        let TechInfoNotation = this.getTechInfoNotation();
        if (!TechInfoNotation)
            this.configManager.page.TechInfoControl.insertAdjacentHTML("beforeend", this.generateTechInfoNotation())
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