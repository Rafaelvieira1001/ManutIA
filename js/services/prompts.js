// Prompts e schemas JSON enviados à IA. Ajustar aqui muda o comportamento do diagnóstico.
import { MACHINE_NAMES } from "../data/machines.js";

export function questionsSystemPrompt() {
    return `Você é um Engenheiro de Manutenção Industrial Sênior especialista em diagnóstico de falhas para máquinas ferramentas e compressores.
Sua tarefa é analisar os sintomas informados pelo operador e formular entre 3 a 5 PERGUNTAS TÉCNICAS E OBJETIVAS de múltipla escolha ou resposta rápida para investigar a causa raiz.
MÁQUINAS PERMITIDAS: ${MACHINE_NAMES.join(", ")}.
RESTRIÇÃO: Você DEVE estritamente responder apenas sobre manutenção industrial das máquinas citadas. Se o usuário tentar puxar assuntos alheios à manutenção, recuse no diagnóstico.

Exemplos de parâmetros a perguntar se relevantes para o sintoma: corrente elétrica (A), tensão (V), temperatura de operação (°C), pressão do fluido/ar (Bar), presença de limalha no óleo, códigos de alarme na IHM, ruídos característicos, desgaste da ferramenta.

Você DEVE retornar a resposta estritamente no formato JSON respeitando o schema fornecido.`;
}

export function questionsUserPrompt(machine, symptoms) {
    return `Máquina Escolhida: ${machine}
Sintomas Relatados pelo Operador: "${symptoms}"

Elabore as melhores perguntas técnicas para que o operador verifique na máquina antes de fechar o diagnóstico de causa raiz.`;
}

export const QUESTIONS_SCHEMA = {
    type: "OBJECT",
    properties: {
        analysisSummary: { type: "STRING", description: "Breve análise inicial do cenário" },
        questions: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    id: { type: "STRING" },
                    questionText: { type: "STRING" },
                    reasoning: { type: "STRING", description: "Por que esta pergunta é importante para a investigação" },
                    options: {
                        type: "ARRAY",
                        items: { type: "STRING" },
                        description: "Opções sugestivas de resposta ex: 'Sim, acima de 85°C', 'Não', 'Normal'",
                    },
                },
                required: ["id", "questionText", "options"],
            },
        },
    },
    required: ["analysisSummary", "questions"],
};

export function reportSystemPrompt(machine) {
    return `Você é um especialista em Manutenção Preditiva e Corretiva Industrial.
Analise a máquina: "${machine}", os sintomas iniciais e as respostas das perguntas de refinamento.
Determine a CAUSA RAIZ provável e elabore o PASSO A PASSO técnico de como resolvê-la com segurança.
Você DEVE obrigatoriamente limitar suas respostas ao universo de manutenção mecânica/elétrica industrial.
Forneça a resposta estritamente no formato JSON respeitando o schema fornecido.`;
}

export function reportUserPrompt(machine, symptoms, answersSummary) {
    return `Máquina: ${machine}
Sintomas Iniciais: "${symptoms}"

Respostas às Perguntas de Diagnóstico:
${answersSummary}

Gere o diagnóstico final com causa raiz, explicação técnica, passos de correção, EPIs/LOTO e ações preventivas.`;
}

export const REPORT_SCHEMA = {
    type: "OBJECT",
    properties: {
        rootCauseTitle: { type: "STRING", description: "Título claro da Causa Raiz" },
        confidencePercentage: { type: "STRING", description: "Ex: 92% (Alta Certeza)" },
        subsystemAffected: { type: "STRING", description: "Subsistema ex: Sistema Elétrico / Contatora K1" },
        technicalExplanation: { type: "STRING", description: "Explicação técnica detalhada do porquê a falha ocorre" },
        stepByStepSolution: { type: "ARRAY", items: { type: "STRING" }, description: "Lista de passos sequenciais para realizar a manutenção" },
        safetyRequirements: { type: "ARRAY", items: { type: "STRING" }, description: "Requisitos de EPI, Lockout/Tagout (LOTO), bloqueio de energias perigosas" },
        suggestedParts: { type: "STRING", description: "Peças de reposição ou consumíveis necessários" },
        preventiveAction: { type: "STRING", description: "Como evitar recorrência no plano de manutenção" },
    },
    required: ["rootCauseTitle", "confidencePercentage", "subsystemAffected", "technicalExplanation", "stepByStepSolution", "safetyRequirements", "suggestedParts", "preventiveAction"],
};
