class OverlayObserver {
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
        const configurationItems = document.querySelectorAll('[id*="NNCaseTaskPerformModalBoxIteClosureCodeContainer_Control"]');

        if (configurationItems.length > 0) {
            configurationItems.forEach(item => {
                this.checkConfigurationItemValue(item);
            });
        }
    }

    checkConfigurationItemValue(itemElement) {
        if (!this.configManager.task.overlay)
            return;

        this.updateElementStyle(itemElement);
    }

    updateElementStyle(itemElement) {
        if (this.pageHandler.getOverlayComplete())
            return;
        itemElement.insertAdjacentHTML("afterbegin", this.pageHandler.generateOverlayComplete())
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}