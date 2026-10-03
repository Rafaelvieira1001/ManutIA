// Dados de contingência usados quando a API está offline ou atingiu o limite.
export const FALLBACK_QUESTIONS = {
    analysisSummary: "Modo de contingência ativado.",
    questions: [
        {
            id: "q1",
            questionText: "Qual é a leitura da corrente elétrica (A) do motor durante o pico de falha?",
            reasoning: "Identifica se há sobrecarga mecânica ou curto-circuito interno nas bobinas.",
            options: ["Acima do nominal", "Corrente Normal", "Zero / Sem corrente"],
        },
        {
            id: "q2",
            questionText: "O nível de óleo e a lubrificação do sistema estão dentro do nível recomendado?",
            reasoning: "Falta de lubrificação gera travamento mecânico e aquecimento extremo.",
            options: ["Abaixo do mínimo", "Nível correto", "Óleo contaminado / com limalha"],
        },
        {
            id: "q3",
            questionText: "Há registro de vibração excessiva ou ruído de atrito metálico antes da parada?",
            reasoning: "Evidencia folga em rolamento ou quebra de dente de engrenagem.",
            options: ["Sim, barulho de atrito seco", "Não, operação silenciosa", "Vibração intermitente"],
        },
    ],
};

export const FALLBACK_REPORT = {
    rootCauseTitle: "Desgaste de Rolamentos / Sobrecarga Mecânica por Falta de Lubrificação",
    confidencePercentage: "88% (Estimativa Técnica)",
    subsystemAffected: "Conjunto de Transmissão / Rolamento Principal",
    technicalExplanation: "A elevação da corrente acompanhada de ruído anormal indica sobrecarga mecânica decorrente do aumento do atrito interno no rolamento do eixo.",
    stepByStepSolution: [
        "Isolar totalmente a fonte de energia da máquina através do disjuntor principal (Bloqueio LOTO).",
        "Remover as tampas de proteção mecânica para acesso ao conjunto de rolamentos e eixo.",
        "Inspecionar o estado do lubrificante e verificar vestígios de cavitação ou serragem metálica.",
        "Substituir o conjunto de rolamentos danificados e ajustar a folga axial nominal conforme manual.",
        "Reabastecer com lubrificante recomendado e realizar teste em vazio antes da carga total.",
    ],
    safetyRequirements: [
        "Uso obrigatório de Óculos de Segurança, Luvas Nitrílicas e Bota com Biqueira de Aço.",
        "Bloqueio elétrico (Tagout/Lockout) no painel trifásico principal.",
    ],
    suggestedParts: "Rolamento cônico de precisão, Vedante de nitrila e Graxa industrial EP2",
    preventiveAction: "Implementar análise de vibração preditiva e lubrificação quinzenal.",
};
