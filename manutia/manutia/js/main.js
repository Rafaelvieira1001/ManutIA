// Ponto de entrada: inicializa os módulos e conecta um ao outro.
import { initTabs, switchTab } from "./ui/tabs.js";
import { initWizard, renderReport, goToStep, selectMachine } from "./ui/wizard.js";
import { initHistory } from "./ui/history.js";
import { initMachinesView } from "./ui/machinesView.js";
import { state } from "./state.js";

window.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initWizard();

    initHistory({
        onOpen: (report, machine) => {
            state.selectedMachine = machine;
            renderReport(report, machine);
            switchTab("diag");
            goToStep(3);
        },
    });

    initMachinesView({
        onDiagnose: (machine) => {
            switchTab("diag");
            goToStep(1);
            selectMachine(machine);
        },
    });
});
