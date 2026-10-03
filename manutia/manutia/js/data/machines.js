// Base de conhecimento das máquinas. Para cadastrar uma nova, basta adicionar um item aqui.
export const MACHINES_DATA = {
    "Fresadora Kone-KFU": {
        shortName: "Fresadora Kone-KFU",
        description: "Fresadora Universal Industrial com caixa de engrenagens e avanço mecânico.",
        category: "Usinagem Convencional",
        icon: "fa-gears",
        color: "indigo",
        presets: [
            "Barulho alto na caixa de engrenagens do Spindle",
            "Avanço automático da mesa travado",
            "Superaquecimento no motor principal da fresa",
            "Folga excessiva nos eixos X/Y durante usinagem",
        ],
        subsystems: ["Caixa de Velocidades", "Eixo Árvore (Spindle)", "Mesa Longitudinal/Transversal", "Sistema de Refrigeração", "Painel Elétrico Trifásico"],
    },
    "Furadeira de Bancada Kone Z5030": {
        shortName: "Furadeira Kone Z5030",
        description: "Furadeira de bancada/coluna pesada para furação e roscamento industrial.",
        category: "Furação e Roscamento",
        icon: "fa-bore-hole",
        color: "blue",
        presets: [
            "Motor elétrico zumbindo mas mandril não gira",
            "Correia patinando ao aplicar carga de furação",
            "Eixo árvore travando no retorno da mola",
            "Vibração intensa no cabeçote em rotações altas",
        ],
        subsystems: ["Polias e Correias de Transmissão", "Mecanismo de Retorno da Mola", "Motor Elétrico Indução", "Chave Reversora / Contatora"],
    },
    "Compressor de Parafuso SRP 2005": {
        shortName: "Compressor SRP 2005",
        description: "Compressor rotativo de parafuso para ar comprimido contínuo.",
        category: "Geração de Ar Comprimido",
        icon: "fa-wind",
        color: "emerald",
        presets: [
            "Compressor desligando por alta temperatura (acima de 100°C)",
            "Ar comprimido com excesso de óleo na rede",
            "Compressor trabalha em alívio e não pressuriza",
            "Vazamento constante na válvula de segurança",
        ],
        subsystems: ["Unidade Compressora de Parafuso", "Filtro de Óleo & Separador de Ar/Óleo", "Válvula de Admissão/Alívio", "Trocador de Calor / Radiador", "Transdutor de Pressão"],
    },
    "Torno convencional Tormax 30": {
        shortName: "Torno Tormax 30",
        description: "Torno mecânico convencional de usinagem e torneamento de precisão.",
        category: "Torneamento Convencional",
        icon: "fa-dharmachakra",
        color: "amber",
        presets: [
            "Alavanca de troca de marcha escapando em corte pesado",
            "Placa do torno girando sem força mecânica",
            "Vara de avanço automática não engrena",
            "Freio mecânico do motor sem resposta",
        ],
        subsystems: ["Cabeçote Fixo & Engrenagens", "Caixa Norton", "Carro Principal e Avental", "Placa Universal 3 Castanhas", "Sistema de Fricção / Freio"],
    },
    "Torno CNC ROMI": {
        shortName: "Torno CNC ROMI",
        description: "Torno computadorizado CNC automatizado de alto desempenho.",
        category: "Usinagem Computadorizada",
        icon: "fa-display",
        color: "cyan",
        presets: [
            "Alarme de sobrecarga Servo Motor no eixo Z (Overload)",
            "Torre porta-ferramentas não indexa ou trava na troca",
            "Erro de Encoder de Posição do Eixo Árvore",
            "Pressão hidráulica da castanha insuficiente",
        ],
        subsystems: ["Comando Numérico Computadorizado (CNC)", "Servo Drives & Servomotores", "Torre Hidráulica / Elétrica", "Unidade Hidráulica de Fixação", "Réguas Ópticas e Encoders"],
    },
};

export const MACHINE_NAMES = Object.keys(MACHINES_DATA);
