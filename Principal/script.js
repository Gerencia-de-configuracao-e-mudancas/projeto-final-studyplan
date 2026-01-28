document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    carregarTarefas();

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
let timeLeft;
let isWorking = true;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('pomodoroStatus');
const inputFoco = document.getElementById("tempoPomodoro");
const inputPausa = document.getElementById("tempoPausa");
const somAlarme = document.getElementById("audioAlarme");
const modal = document.getElementById("pomodoroModal");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return;

    if (somAlarme) {
        somAlarme.play().then(() => { somAlarme.pause(); somAlarme.currentTime = 0; }).catch(() => {});
    }

    if (timeLeft === undefined || timeLeft === null) {
        timeLeft = parseInt(inputFoco.value) * 60;
    }

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;

            if (somAlarme) {
                somAlarme.currentTime = 0;
                somAlarme.play();
            }

            if (isWorking) {
                document.getElementById("modalTitulo").textContent = "Foco Encerrado!";
                document.getElementById("modalMensagem").textContent = "Muito bem! Agora descanse um pouco.";
            } else {
                document.getElementById("modalTitulo").textContent = "Pausa Encerrada!";
                document.getElementById("modalMensagem").textContent = "Hora de voltar ao trabalho!";
            }

            modal.style.display = "flex";
        }
    }, 1000);
}

function fecharModal() {
    modal.style.display = "none";
    
    if (somAlarme) {
        somAlarme.pause();
        somAlarme.currentTime = 0;
    }

    if (isWorking) {
        isWorking = false;
        statusDisplay.textContent = "Timer Pomodoro (Pausa)";
        statusDisplay.style.color = "#4ca832";
        timeLeft = parseInt(inputPausa.value) * 60;
    } else {
        isWorking = true;
        statusDisplay.textContent = "Timer Pomodoro (Foco)";
        statusDisplay.style.color = "#c7f2ff";
        timeLeft = parseInt(inputFoco.value) * 60;
    }
    
    updateDisplay();
    startTimer();
}

function pausarTempo() {
    clearInterval(timer);
    timer = null;
    if (somAlarme) somAlarme.pause();
}

function resetTimer() {
    pausarTempo();
    isWorking = true;
    timeLeft = parseInt(inputFoco.value) * 60;
    statusDisplay.textContent = "Timer Pomodoro (Foco)";
    statusDisplay.style.color = "#c7f2ff";
    updateDisplay();
}

const formStudy = document.getElementById('formStudy');
const studyBody = document.getElementById('studyBody');

formStudy.addEventListener('submit', (e) => {
    e.preventDefault();

    const dia = document.getElementById('diaSemana').value;
    const materia = document.getElementById('materia').value;
    const horario = document.getElementById('horario').value;

    const novoItem = { dia, materia, horario };
    
    const planos = JSON.parse(localStorage.getItem('studyPlan')) || [];
    planos.push(novoItem);
    planos.sort((a, b) => a.horario.localeCompare(b.horario));
    
    localStorage.setItem('studyPlan', JSON.stringify(planos));

    formStudy.reset();
    carregarDados();
    alert("✅ Aula adicionada ao seu cronograma semanal!");
});

function carregarDados() {
    const planos = JSON.parse(localStorage.getItem('studyPlan')) || [];
    studyBody.innerHTML = '';

    planos.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.dia}</td>
            <td>${item.materia}</td>
            <td>${item.horario}</td>
            <td><button class="btn-delete-row" onclick="excluirItem(${index})">Excluir</button></td>
        `;
        studyBody.appendChild(row);
    });
}

function excluirItem(index) {
    if (confirm("Deseja remover este horário do cronograma?")) {
        const planos = JSON.parse(localStorage.getItem('studyPlan')) || [];
        planos.splice(index, 1);
        localStorage.setItem('studyPlan', JSON.stringify(planos));
        carregarDados();
        alert("🗑️ Removido com sucesso.");
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert("⚠️ Digite uma meta antes de adicionar.");
        return;
    }

    const tarefas = JSON.parse(localStorage.getItem('todoList')) || [];
    tarefas.push({ text: taskText, completed: false });
    localStorage.setItem('todoList', JSON.stringify(tarefas));

    input.value = '';
    carregarTarefas();
    alert("✅ Meta adicionada!");
}

function carregarTarefas() {
    const taskList = document.getElementById('taskList');
    const tarefas = JSON.parse(localStorage.getItem('todoList')) || [];
    
    taskList.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        if (tarefa.completed) li.classList.add('completed');

        li.innerHTML = `
            <span onclick="toggleTarefa(${index})">${tarefa.text}</span>
            <button class="btn-delete" onclick="removerTarefa(${index})">×</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTarefa(index) {
    const tarefas = JSON.parse(localStorage.getItem('todoList')) || [];
    tarefas[index].completed = !tarefas[index].completed;
    localStorage.setItem('todoList', JSON.stringify(tarefas));
    carregarTarefas();
}

function removerTarefa(index) {
    if (confirm("Deseja excluir esta meta?")) {
        const tarefas = JSON.parse(localStorage.getItem('todoList')) || [];
        tarefas.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(tarefas));
        carregarTarefas();
        alert("🗑️ Meta removida.");
    }
}