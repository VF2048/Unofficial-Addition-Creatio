class ConfigManager {

    #Ritm = {}

    #Inc = {}

    constructor() {
        this.one = "one";
        this.all = "all";
        this.gray = "gray";
        this.redLines = "redLines";
        this.config = {
            hashLevel: {
                RITM: { start: 1, end: 1 },
                INC: { start: 1, end: 1 },
            },
            hashCount: {
                RITM: 1,
                INC: 1,
            },
            sort: {
                RITM: false,
                INC: false,
            },
            clearButton: {
                RITM: true,
                INC: true,
            },
            hashtags: {},
            enable: true,
            disableComment: {
                RITM: false,
                INC: false,
            },
            Answers: {
                RITM: {},
                INC: {},
            },
            color: {
                RITM: "#00c7000a",
                INC: "#ffebeb",
            },
            disableCommentTheme: this.gray
        };
        this.task = {};
        this.page = {};
    }

    setTask(type) {
        switch (type) {
            case "INC":
                this.task = this.#Inc;
                break;
            case "RITM":
                this.task = this.#Ritm;
                break;
        }
    }

    init(data) {
        this.setDefaultConfig(data);
        this.#Ritm = {
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
            new_visualization: false,
            TechInfo_find: false,
            answer: this.config.Answers.RITM,
            sort: this.config.sort.RITM,
            clearButton: this.config.clearButton.RITM,
            enable: this.config.enable,
            hashtagsLevelStart: this.config.hashLevel.RITM.start,
            hashtagsLevelEnd: this.config.hashLevel.RITM.end,
            hashtagCont: this.config.hashCount.RITM,
            defHashtagCont: this.config.hashCount.RITM,
            disableComment: this.config.disableComment.RITM,
            color: this.config.color.RITM,
        }

        this.#Inc = {
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
            answer: this.config.Answers.INC,
            sort: this.config.sort.INC,
            clearButton: this.config.clearButton.INC,
            enable: this.config.enable,
            hashtagsLevelStart: this.config.hashLevel.INC.start,
            hashtagsLevelEnd: this.config.hashLevel.INC.end,
            hashtagCont: this.config.hashCount.INC,
            defHashtagCont: this.config.hashCount.INC,
            disableComment: this.config.disableComment.INC,
            color: this.config.color.INC,
        }
        this.validateConfig();
    }

    validateConfig() {
        // Проверка обязательных полей
        if (!this.config.hashtags || !Array.isArray(this.config.hashtags)) {
            throw new Error('Invalid hashtags configuration');
        }
    }

    setDefaultConfig(data) {
        this.config.hashtags = data.Hashtags;
        this.config.Answers.RITM = data.AnswersRitm;
        this.config.Answers.INC = data.AnswersINC;
        this.config.mail = data.mail;
        this.config.treeEnable = data.treeEnable;
        this.config.serviceEnable = data.serviceEnable;
    }
}