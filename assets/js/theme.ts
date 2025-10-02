export type Theme = "light" | "dark" | "system";

class ThemeMode{
    mode: Theme = "system";

    constructor(){
        this.mode = this.getStoredMode() || "system";
        this.applyMode(this.mode);
    }

    applyMode(mode:Theme){
        this.mode = mode;
                if (mode === "light") {
            document.body.classList.add("light-mode");
        } else if (mode === "dark") {
            document.body.classList.remove("light-mode");
        } else {
            const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList.toggle("light-mode", !isSystemDark);
        }

        this.setStoredMode(mode);
    }

    private setStoredMode(mode:Theme){
        localStorage.setItem("theme_mode", mode);
    }

    private getStoredMode():Theme|null{
        var currentSavedMode = localStorage.getItem("theme_mode") as Theme | null;
        return currentSavedMode;
    }
}

export default ThemeMode;