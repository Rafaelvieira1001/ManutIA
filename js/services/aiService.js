// Única camada que fala com a API de IA. Se trocar de provedor, só este arquivo muda.
import { API_URL } from "../config.js";
import {
    questionsSystemPrompt, questionsUserPrompt, QUESTIONS_SCHEMA,
    reportSystemPrompt, reportUserPrompt, REPORT_SCHEMA,
} from "./prompts.js";

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.ok) return res;
        } catch (e) {
            if (i === retries - 1) throw e;
        }
        await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
    }
    throw new Error("Falha ao comunicar com o serviço de IA após várias tentativas.");
}

async function callModel({ systemPrompt, userPrompt, schema }) {
    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json", responseSchema: schema },
    };

    const response = await fetchWithRetry(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const result = await response.json();
    const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonText) throw new Error("Resposta inválida recebida do serviço de IA.");
    return JSON.parse(jsonText);
}

/** Passo 1 -> 2: gera as perguntas de refinamento. */
export function generateQuestions(machine, symptoms) {
    return callModel({
        systemPrompt: questionsSystemPrompt(),
        userPrompt: questionsUserPrompt(machine, symptoms),
        schema: QUESTIONS_SCHEMA,
    });
}

/** Passo 2 -> 3: gera o relatório final de causa raiz. */
export function generateReport(machine, symptoms, answersSummary) {
    return callModel({
        systemPrompt: reportSystemPrompt(machine),
        userPrompt: reportUserPrompt(machine, symptoms, answersSummary),
        schema: REPORT_SCHEMA,
    });
}
