// Configurações globais da aplicação.
// ATENÇÃO: nunca publique uma chave de API real em código de front-end.
// Em produção, use um servidor intermediário (proxy) e deixe a chave lá.

export const API_KEY = "";
export const MODEL = "gemini-3-flash-preview";
export const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

export const HISTORY_STORAGE_KEY = "manutia_history";
export const HISTORY_MAX_ITEMS = 20;
