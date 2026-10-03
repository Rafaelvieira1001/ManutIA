// Persistência do histórico (localStorage). Trocar por banco/API no futuro = alterar só aqui.
import { HISTORY_STORAGE_KEY, HISTORY_MAX_ITEMS } from "../config.js";

export function loadHistory() {
    try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

export function saveHistory(items) {
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items.slice(0, HISTORY_MAX_ITEMS)));
    } catch (e) { /* storage indisponível: ignora */ }
}

export function clearStoredHistory() {
    try { localStorage.removeItem(HISTORY_STORAGE_KEY); } catch (e) { /* ignora */ }
}
