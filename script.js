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