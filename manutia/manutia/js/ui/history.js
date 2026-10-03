// Aba de histórico: lista, salva e limpa diagnósticos.
import { $, escapeHtml } from "../utils.js";
import { loadHistory, saveHistory, clearStoredHistory } from "../services/storageService.js";
import { showNotification } from "./feedback.js";

let items = [];
let onOpenReport = () => {};

export function initHistory({ onOpen }) {
    onOpenReport = onOpen;
    items = loadHistory();
    $("btn-clear-history").addEventListener("click", clearHistory);
    renderHistory();
}

export function addToHistory({ machine, symptoms, report }) {
    items.unshift({
        id: "DIAG-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleString("pt-BR"),
        machine,
        symptoms,
        rootCause: report.rootCauseTitle,
        report,
    });
    saveHistory(items);
    renderHistory();
}

function clearHistory() {
    items = [];
    clearStoredHistory();
    renderHistory();
    showNotification("Histórico apagado com sucesso.");
}

function renderHistory() {
    const container = $("history-list-container");
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-slate-500">
                <i class="fa-solid fa-folder-open text-3xl mb-2"></i>
                <p class="text-sm">Nenhum diagnóstico registrado no histórico local.</p>
            </div>`;
        return;
    }

    items.forEach((item) => {
        const symptoms = item.symptoms || "";
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3";
        card.innerHTML = `
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-cyan-400">${escapeHtml(item.machine)}</span>
                    <span class="text-[10px] text-slate-500 font-mono">${escapeHtml(item.date)}</span>
                </div>
                <h4 class="text-sm font-bold text-white">${escapeHtml(item.rootCause)}</h4>
                <p class="text-xs text-slate-400 italic">Sintomas: "${escapeHtml(symptoms.substring(0, 80))}${symptoms.length > 80 ? "..." : ""}"</p>
            </div>
            <button class="btn-open px-3 py-1.5 bg-slate-800 hover:bg-cyan-900 text-cyan-300 border border-slate-700 text-xs font-semibold rounded-lg transition-colors shrink-0">
                Ver Relatório Completo
            </button>`;
        card.querySelector(".btn-open").addEventListener("click", () => onOpenReport(item.report, item.machine));
        container.appendChild(card);
    });
}
