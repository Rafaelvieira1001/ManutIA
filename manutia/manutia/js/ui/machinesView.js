// Aba "Máquinas Cadastradas": guia rápido de cada equipamento.
import { $, escapeHtml } from "../utils.js";
import { MACHINES_DATA } from "../data/machines.js";

export function initMachinesView({ onDiagnose }) {
    const container = $("machines-info-cards");
    container.innerHTML = "";

    Object.entries(MACHINES_DATA).forEach(([name, info]) => {
        const card = document.createElement("div");
        card.className = "glass-panel p-5 rounded-2xl border border-slate-800 space-y-3";
        card.innerHTML = `
            <div class="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div class="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                    <i class="fa-solid ${info.icon} text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-white text-base">${escapeHtml(name)}</h3>
                    <span class="text-xs text-cyan-400 font-mono">${escapeHtml(info.category)}</span>
                </div>
            </div>
            <div>
                <span class="text-xs font-semibold text-slate-300 block mb-1">Principais Subsistemas Mecânicos/Elétricos:</span>
                <div class="flex flex-wrap gap-1.5">
                    ${info.subsystems.map((s) => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">${escapeHtml(s)}</span>`).join("")}
                </div>
            </div>
            <div class="pt-2">
                <button class="btn-diagnose w-full py-2 bg-slate-800 hover:bg-cyan-900 text-cyan-300 border border-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <i class="fa-solid fa-stethoscope"></i><span>Diagnosticar Esta Máquina</span>
                </button>
            </div>`;
        card.querySelector(".btn-diagnose").addEventListener("click", () => onDiagnose(name));
        container.appendChild(card);
    });
}
