import ThemeMode from "./theme.js";
class CounterApp {
    currentCountEventListener = "stop";
    lapData = [];
    overallTime = [0, 0, 0, 0]; // hour, minute, seconds, milliseconds
    lapTime = [0, 0, 0, 0];
    themeMode;
    overallTimeElement = null;
    lapTimeElement = null;
    lapTableElement = null;
    startBtnElement = null;
    stopBtnElement = null;
    lapBtnElement = null;
    resetBtnElement = null;
    timerId = null;
    constructor() {
        this.themeMode = new ThemeMode();
        this.initUI();
        this.lapData = this.getLaps() || [];
        this.updateUI(); // show any saved laps
    }
    initUI() {
        const themeSelect = document.getElementById("theme-select");
        themeSelect?.addEventListener("change", (e) => {
            const target = e.target;
            this.themeMode.applyMode(target.value);
        });
        this.overallTimeElement = document.getElementById("overall-time");
        this.lapTimeElement = document.getElementById("lap-time");
        this.lapTableElement = document.querySelector("#lap-table");
        this.startBtnElement = document.getElementById("start-btn");
        this.startBtnElement?.addEventListener("click", () => this.startCount());
        this.stopBtnElement = document.getElementById("stop-btn");
        this.stopBtnElement?.addEventListener("click", () => this.stopCount());
        this.lapBtnElement = document.getElementById("lap-btn");
        this.lapBtnElement?.addEventListener("click", () => this.lap());
        this.resetBtnElement = document.getElementById("reset-btn");
        this.resetBtnElement?.addEventListener("click", () => this.resetCount());
    }
    padTime(n, digits = 2) {
        return n.toString().padStart(digits, "0");
    }
    formatTime(time) {
        const [h, m, s, ms] = time;
        return `${this.padTime(h)}:${this.padTime(m)}:${this.padTime(s)}.${this.padTime(Math.floor(ms), 3)}`;
    }
    updateButtonVisibility() {
        if (!this.startBtnElement || !this.stopBtnElement || !this.lapBtnElement || !this.resetBtnElement)
            return;
        switch (this.currentCountEventListener) {
            case "start":
                this.startBtnElement.style.display = "none";
                this.resetBtnElement.style.display = "none";
                this.stopBtnElement.style.display = "inline-block";
                this.lapBtnElement.style.display = "inline-block";
                break;
            case "stop":
                this.stopBtnElement.style.display = "none";
                this.lapBtnElement.style.display = "none";
                this.startBtnElement.style.display = "inline-block";
                this.resetBtnElement.style.display = "inline-block";
                break;
            case "reset":
                this.startBtnElement.style.display = "inline-block";
                this.resetBtnElement.style.display = "inline-block";
                this.stopBtnElement.style.display = "none";
                this.lapBtnElement.style.display = "none";
                break;
        }
    }
    updateUI() {
        this.updateButtonVisibility();
        if (this.overallTimeElement) {
            this.overallTimeElement.textContent = this.formatTime(this.overallTime);
        }
        if (this.lapTimeElement) {
            this.lapTimeElement.textContent = this.formatTime(this.lapTime);
        }
        if (this.lapTableElement) {
            const tbody = this.lapTableElement.querySelector("tbody");
            if (tbody) {
                tbody.innerHTML = ""; // erases the previous rows
                for (let i = this.lapData.length - 1; i >= 0; i--) {
                    const lap = this.lapData[i];
                    const row = document.createElement("tr");
                    const idCell = document.createElement("td");
                    idCell.textContent = lap.id;
                    const lapTimeCell = document.createElement("td");
                    lapTimeCell.textContent = lap.lapTime;
                    const overallTimeCell = document.createElement("td");
                    overallTimeCell.textContent = lap.overallTime;
                    row.appendChild(idCell);
                    row.appendChild(lapTimeCell);
                    row.appendChild(overallTimeCell);
                    tbody.appendChild(row);
                }
            }
        }
    }
    incrementTime(time, msToAdd) {
        let [h, m, s, ms] = time;
        ms += msToAdd;
        if (ms >= 1000) {
            s += Math.floor(ms / 1000);
            ms %= 1000;
        }
        if (s >= 60) {
            m += Math.floor(s / 60);
            s %= 60;
        }
        if (m >= 60) {
            h += Math.floor(m / 60);
            m %= 60;
        }
        return [h, m, s, ms];
    }
    startCount() {
        this.currentCountEventListener = "start";
        if (this.timerId !== null)
            return;
        let lastTimestamp = performance.now();
        this.timerId = window.setInterval(() => {
            const now = performance.now();
            const diffMs = now - lastTimestamp;
            lastTimestamp = now;
            this.overallTime = this.incrementTime(this.overallTime, diffMs);
            this.lapTime = this.incrementTime(this.lapTime, diffMs);
            this.updateUI();
            // shows the updated ui in real time
        }, 10);
    }
    stopCount() {
        this.currentCountEventListener = "stop";
        if (this.timerId !== null) {
            //stops the interval
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    resetCount() {
        this.currentCountEventListener = "reset";
        this.stopCount();
        this.overallTime = [0, 0, 0, 0];
        this.lapTime = [0, 0, 0, 0];
        this.lapData = [];
        this.updateUI();
        //to erase the laps data and update the table ui
        localStorage.removeItem("laps_data");
    }
    lap() {
        const lapId = (this.lapData.length + 1).toString();
        const newLap = {
            id: lapId,
            lapTime: this.formatTime(this.lapTime),
            overallTime: this.formatTime(this.overallTime),
        };
        this.lapData.push(newLap);
        this.lapTime = [0, 0, 0, 0];
        this.updateUI();
        localStorage.setItem("laps_data", JSON.stringify(this.lapData));
    }
    getLaps() {
        const data = localStorage.getItem("laps_data");
        if (!data)
            return null;
        try {
            return JSON.parse(data);
        }
        catch {
            return null;
        }
    }
}
// Initialize the app
const app = new CounterApp();
