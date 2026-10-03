// Navegação entre as abas principais.
import { $ } from "../utils.js";

const TABS = ["diag", "history", "machines"];

export function switchTab(tabKey) {
    TABS.forEach((t) => {
        $(`tab-${t}`).classList.toggle("hidden", t !== tabKey);
        $(`tab-btn-${t}`).classList.toggle("is-active", t === tabKey);
    });
}

export function initTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
    switchTab("diag");
}
