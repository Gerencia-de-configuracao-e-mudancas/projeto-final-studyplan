const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();

    const cta = document.getElementById("cta");
    if (cta) {
        cta.addEventListener("click", () => {
            const texto = document.getElementById("textoSobre");
            texto.style.display = texto.style.display === "block" ? "none" : "block";
        });
    }
});

function irPara(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

let timer;
let timeLeft = 25 * 60;
const inputTempo = document.getElementById("tempoPomodoro");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (inputTempo && !timer) {
        timeLeft = parseInt(inputTempo.value) * 60;
        updateDisplay();
    }
    if (timer) return;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alarmSound.play();
            alert("Tempo de foco encerrado! Descanse um pouco.");
        }
    }, 1000);
}

function pausarTempo() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    pausarTempo();
    timeLeft = 25 * 60;
    updateDisplay();
}