// Estado compartilhado do wizard de diagnóstico.
export const state = {
    currentStep: 1,
    selectedMachine: "",
    symptoms: "",
    questions: [],
};

export function resetState() {
    state.currentStep = 1;
    state.selectedMachine = "";
    state.symptoms = "";
    state.questions = [];
}
