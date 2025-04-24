class NumberObserver {
    constructor(configManager, pageHandler) {
        this.configManager = configManager;
        this.pageHandler = pageHandler;
        this.observer = null;
        this.observedElement = document;
        this.observerConfig = {
            attributes: false,
            childList: true,
            subtree: true
        };
        this.initObserver();
    }

    initObserver() {
        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.startObservation();
    }

    startObservation() {
        try {
            this.observer.observe(this.observedElement, this.observerConfig);
        } catch (error) {
            console.error('Failed to start observation:', error);
        }
    }

    handleMutations() {
        const configurationItems = document.querySelectorAll('[id*="NNCaseTaskPageCaseEndUserPhoneTextEdit-el"]');

        if (configurationItems.length > 0) {
            configurationItems.forEach(item => {
                this.checkConfigurationItemValue(item);
            });
        }
    }

    checkConfigurationItemValue(itemElement) {
        const valueElements = document.querySelectorAll('[id*="NNCaseTaskPageCaseEndUserPhoneTextEdit-el"]');

        if (valueElements.length === 0 || Object.keys(this.configManager.task).length === 0) {
            return;
        }

        valueElements.forEach(valueElement => {
            this.updateElementStyle(itemElement, valueElement);
        });
    }

    updateElementStyle(itemElement, valueElement) {
        if (valueElement.value.trim() !== "") {
            this.pageHandler.removeNumberRequestButton();
        } else {
            this.pageHandler.addNumberRequestButton();
        }
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}