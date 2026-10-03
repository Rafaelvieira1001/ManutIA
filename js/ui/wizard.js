// Fluxo de diagnóstico em 3 passos: sintomas -> perguntas -> relatório.
import { $, escapeHtml } from "../utils.js";
import { state, resetState } from "../state.js";
import { MACHINES_DATA } from "../data/machines.js";
import { generateQuestions, generateReport } from "../services/aiService.js";
import { FALLBACK_QUESTIONS, FALLBACK_REPORT } from "../services/fallbacks.js";
import { showLoading, hideLoading, showNotification } from "./feedback.js";
import { addToHistory } from "./history.js";

const CARD_BASE = "machine-card glass-panel p-4 rounded-xl text-left hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all group relative overflow-hidden border";
const EMPTY_CHIPS = `<span class="text-xs text-slate-500 italic">Selecione uma máquina acima para ver exemplos...</span>`;

/* ---------- Inicialização ---------- */
export function initWizard() {
    renderMachineGrid();
    $("btn-start-diagnosis").addEventListener("click", startAiDiagnosis);
    $("btn-finish-diagnosis").addEventListener("click", submitQuestionAnswers);
    $("btn-back-step1").addEventListener("click", () => goToStep(1));
    $("btn-change-symptoms").addEventListener("click", resetWizard);
    $("btn-new-diagnosis").addEventListener("click", resetWizard);
    $("btn-print").addEventListener("click", () => window.print());
    goToStep(1);
}

/* ---------- Passo 1: seleção de máquina ---------- */
function renderMachineGrid() {
    const grid = $("machine-grid");
    grid.innerHTML = "";

    Object.entries(MACHINES_DATA).forEach(([name, info]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.machine = name;
        btn.className = `${CARD_BASE} border-slate-800`;
        btn.innerHTML = `
            <div class="w-10 h-10 rounded-lg bg-${info.color}-500/10 border border-${info.color}-500/20 flex items-center justify-center text-${info.color}-400 mb-3 group-hover:scale-110 transition-transform">
                <i class="fa-solid ${info.icon} text-lg"></i>
            </div>
            <h3 class="font-bold text-white text-sm mb-1">${escapeHtml(info.shortName)}</h3>
            <p class="text-xs text-slate-400">${escapeHtml(info.description)}</p>
            <div class="mt-3 text-[11px] font-mono text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Selecionar</span> <i class="fa-solid fa-chevron-right text-[9px]"></i>
            </div>`;
        btn.addEventListener("click", () => selectMachine(name));
        grid.appendChild(btn);
    });
}

export function selectMachine(machineName) {
    state.selectedMachine = machineName;

    document.querySelectorAll(".machine-card").forEach((card) => {
        const active = card.dataset.machine === machineName;
        card.classList.toggle("border-cyan-500", active);
        card.classList.toggle("ring-2", active);
        card.classList.toggle("ring-cyan-500/50", active);
        card.classList.toggle("bg-slate-800", active);
        card.classList.toggle("border-slate-800", !active);
    });

    $("selected-machine-display").value = machineName;
    renderPresetChips(machineName);
}

function renderPresetChips(machineName) {
    const container = $("preset-chips");
    container.innerHTML = "";
    const presets = MACHINES_DATA[machineName]?.presets || [];

    presets.forEach((preset) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 text-slate-300 transition-colors text-left";
        chip.textContent = "+ " + preset;
        chip.addEventListener("click", () => {
            const textarea = $("symptom-input");
            textarea.value = textarea.value.trim() ? `${textarea.value}; ${preset}` : preset;
        });
        container.appendChild(chip);
    });
}

/* ---------- Passo 1 -> 2: perguntas de refinamento ---------- */
async function startAiDiagnosis() {
    if (!state.selectedMachine) {
        showNotification("Por favor, selecione qual das máquinas está com falha.", "warning");
        return;
    }
    state.symptoms = $("symptom-input").value.trim();
    if (!state.symptoms) {
        showNotification("Por favor, descreva os sintomas da falha antes de continuar.", "warning");
        return;
    }

    showLoading("Iniciando Análise Técnica", `A IA está processando os sintomas do equipamento (${state.selectedMachine})...`);

    let data;
    try {
        data = await generateQuestions(state.selectedMachine, state.symptoms);
    } catch (err) {
        console.error("Erro no diagnóstico IA:", err);
        data = FALLBACK_QUESTIONS;
    } finally {
        hideLoading();
    }

    state.questions = data.questions || [];
    renderQuestions();
    goToStep(2);
}

function renderQuestions() {
    $("step2-machine-title").textContent = state.selectedMachine;
    $("step2-symptoms-summary").textContent = `Sintomas: "${state.symptoms}"`;

    const container = $("questions-container");
    container.innerHTML = "";

    if (state.questions.length === 0) {
        container.innerHTML = `<p class="text-sm text-slate-400">Nenhuma pergunta adicional necessária. Clique em Concluir Diagnóstico.</p>`;
        return;
    }

    state.questions.forEach((q, idx) => {
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3";

        const optionsHTML = (q.options || []).length
            ? `<div class="flex flex-wrap gap-2 mt-2">${q.options.map((opt) => `
                <button type="button" data-value="${escapeHtml(opt)}"
                        class="q-opt-btn text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900 border border-slate-700 text-slate-200 font-medium transition-all">
                    ${escapeHtml(opt)}
                </button>`).join("")}</div>`
            : "";

        card.innerHTML = `
            <div class="flex justify-between items-start gap-2">
                <span class="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Pergunta ${idx + 1}</span>
                ${q.reasoning ? `<span class="text-[11px] text-slate-400 italic"><i class="fa-solid fa-circle-question mr-1"></i>${escapeHtml(q.reasoning)}</span>` : ""}
            </div>
            <p class="text-sm font-semibold text-white">${escapeHtml(q.questionText)}</p>
            ${optionsHTML}
            <input type="text" id="q-input-${escapeHtml(q.id)}" placeholder="Ou digite detalhes específicos da resposta..."
                   class="w-full mt-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 outline-none">`;

        card.querySelectorAll(".q-opt-btn").forEach((btn) => {
            btn.addEventListener("click", () => setAnswer(q.id, btn));
        });
        container.appendChild(card);
    });
}

function setAnswer(questionId, btn) {
    const input = document.getElementById(`q-input-${questionId}`);
    if (input) input.value = btn.dataset.value;

    btn.parentElement.querySelectorAll(".q-opt-btn").forEach((b) => {
        const selected = b === btn;
        b.classList.toggle("bg-cyan-600", selected);
        b.classList.toggle("text-white", selected);
        b.classList.toggle("bg-slate-800", !selected);
        b.classList.toggle("text-slate-200", !selected);
    });
}

/* ---------- Passo 2 -> 3: relatório final ---------- */
async function submitQuestionAnswers() {
    const answersSummary = state.questions.map((q, idx) => {
        const val = document.getElementById(`q-input-${q.id}`)?.value.trim() || "Não informado";
        return `P${idx + 1}: ${q.questionText} -> Resposta: ${val}`;
    }).join("\n");

    showLoading("Processando Diagnóstico Final", "Sintetizando causa raiz e gerando procedimento passo a passo...");

    let report;
    try {
        report = await generateReport(state.selectedMachine, state.symptoms, answersSummary);
    } catch (err) {
        console.error("Erro no relatório final:", err);
        report = FALLBACK_REPORT;
    } finally {
        hideLoading();
    }

    renderReport(report, state.selectedMachine);
    addToHistory({ machine: state.selectedMachine, symptoms: state.symptoms, report });
    goToStep(3);
}

/** Exibe um relatório (novo ou vindo do histórico). */
export function renderReport(report, machineName) {
    $("report-machine-name").textContent = machineName;
    $("report-confidence-badge").textContent = `Confiança: ${report.confidencePercentage || "90%"}`;
    $("report-timestamp").textContent = `Data do Diagnóstico: ${new Date().toLocaleString("pt-BR")} - ID: #DIAG-${Math.floor(1000 + Math.random() * 9000)}`;
    $("report-root-cause-title").textContent = report.rootCauseTitle || "Causa Raiz Indeterminada";
    $("report-technical-explanation").textContent = report.technicalExplanation || "Sem descrição disponível.";
    $("report-subsystem").textContent = report.subsystemAffected || "Geral";
    $("report-parts").textContent = report.suggestedParts || "Nenhuma especificada";
    $("report-preventive-action").textContent = report.preventiveAction || "Manter rotina regular de inspeção e lubrificação.";

    const stepsList = $("report-solution-steps");
    stepsList.innerHTML = "";
    (report.stepByStepSolution || []).forEach((step, idx) => {
        const li = document.createElement("li");
        li.className = "flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800";
        li.innerHTML = `
            <span class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
            <span class="text-xs sm:text-sm text-slate-200 leading-relaxed">${escapeHtml(step)}</span>`;
        stepsList.appendChild(li);
    });

    const safetyList = $("report-safety-list");
    safetyList.innerHTML = "";
    const safety = report.safetyRequirements?.length
        ? report.safetyRequirements
        : ["Desligar a chave geral e aplicar cartão de bloqueio LOTO antes da intervenção."];
    safety.forEach((req) => {
        const li = document.createElement("li");
        li.textContent = req;
        safetyList.appendChild(li);
    });
}

/* ---------- Navegação do wizard ---------- */
export function goToStep(stepNum) {
    state.currentStep = stepNum;
    [1, 2, 3].forEach((i) => {
        $(`wizard-step-${i}`).classList.toggle("hidden", i !== stepNum);
        const pill = $(`step-pill-${i}`);
        pill.classList.toggle("step-active", i <= stepNum);
        pill.classList.toggle("step-inactive", i > stepNum);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function resetWizard() {
    resetState();
    $("selected-machine-display").value = "Nenhuma máquina selecionada";
    $("symptom-input").value = "";
    $("preset-chips").innerHTML = EMPTY_CHIPS;
    document.querySelectorAll(".machine-card").forEach((card) => {
        card.classList.remove("border-cyan-500", "ring-2", "ring-cyan-500/50", "bg-slate-800");
        card.classList.add("border-slate-800");
    });
    goToStep(1);
}
