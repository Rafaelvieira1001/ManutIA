// Configurações globais da aplicação.
// ATENÇÃO: nunca publique uma chave de API real em código de front-end.
// Em produção, use um servidor intermediário (proxy) e deixe a chave lá.

<<<<<<< HEAD
<<<<<<< HEAD
export const API_KEY = "AQ.Ab8RN6JTRZ9hU0MXn-wnGjGW8djFIxb3fVVzZWPZB4mdbtmBhw";
export const MODEL = "gemini-3-flash-preview";
=======
export const API_KEY = "AQ.Ab8RN6IQDVsCqd1rAsyv21D6GFTIyOkM6UwYzKxvx9h4PIcnQA";
export const MODEL = "gemini-3.5-flash";
>>>>>>> 28a3907da1e2f92f0d84bd73f98c979d8630cda8
=======
export const API_KEY = "AQ.Ab8RN6IQDVsCqd1rAsyv21D6GFTIyOkM6UwYzKxvx9h4PIcnQA";
export const MODEL = "gemini-3.5-flash";
>>>>>>> 28a3907da1e2f92f0d84bd73f98c979d8630cda8
export const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

export const HISTORY_STORAGE_KEY = "manutia_history";
export const HISTORY_MAX_ITEMS = 20;
