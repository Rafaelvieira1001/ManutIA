// Toast de notificação e overlay de carregamento.
import { $, escapeHtml } from "../utils.js";

export function showLoading(title, desc) {
    $("loading-title").textContent = title;
    $("loading-desc").textContent = desc;
    $("ai-loading-overlay").classList.remove("hidden");
}

export function hideLoading() {
    $("ai-loading-overlay").classList.add("hidden");
}

export function showNotification(msg, type = "info") {
    const styles = {
        warning: "bg-amber-900 border-amber-500",
        error: "bg-red-900 border-red-500",
        info: "bg-slate-800 border-cyan-500",
    };
    const toast = document.createElement("div");
    toast.className = `fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl text-xs font-semibold text-white shadow-2xl flex items-center gap-2 border ${styles[type] || styles.info}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${escapeHtml(msg)}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
