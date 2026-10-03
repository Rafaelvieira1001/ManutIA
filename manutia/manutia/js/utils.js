// Evita injeção de HTML ao exibir textos vindos da IA ou do usuário.
export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export const $ = (id) => document.getElementById(id);
