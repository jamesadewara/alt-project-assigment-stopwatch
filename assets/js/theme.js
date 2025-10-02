class ThemeMode {
    mode = "system";
    constructor() {
        this.mode = this.getStoredMode() || "system";
        this.applyMode(this.mode);
    }
    applyMode(mode) {
        this.mode = mode;
        if (mode === "light") {
            document.body.classList.add("light-mode");
        }
        else if (mode === "dark") {
            document.body.classList.remove("light-mode");
        }
        else {
            const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList.toggle("light-mode", !isSystemDark);
        }
        this.setStoredMode(mode);
    }
    setStoredMode(mode) {
        localStorage.setItem("theme_mode", mode);
    }
    getStoredMode() {
        var currentSavedMode = localStorage.getItem("theme_mode");
        return currentSavedMode;
    }
}
export default ThemeMode;
