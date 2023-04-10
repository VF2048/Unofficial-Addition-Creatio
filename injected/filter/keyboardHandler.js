class KeyboardHandler {
    constructor(callback) {
        this.keyboardHandler(callback);
    }
    keyState = {};
    keyboardHandler(callback) {
        document.addEventListener("keydown", (e) => {
            this.keyState[e.code] = true;
            if (this.keyState.Backquote && this.keyState.ControlLeft) {
                this.keyState.Backquote, this.keyState.ControlLeft = false;
                callback();
            }
        })
        document.addEventListener("keyup", (e) => {
            this.keyState[e.code] = false;
        })
    }
}