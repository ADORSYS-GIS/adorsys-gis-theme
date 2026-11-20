import "./css/global.scss";
import "./css/layout.scss";
import "./libs/code";
import { addFeatherIconToButton } from "./libs/utils";

window.addEventListener("load", () => {
    const languageButton = document.querySelector("#kc-current-locale-link");
    addFeatherIconToButton(languageButton, "globe");

    replaceWrongCheckboxes();
});

window.addEventListener("load", async () => {
    await import("feather-icons").then(({ default: feather }) => {
        feather.replace();
    });
    console.log("Libs loaded");
});

function replaceWrongCheckboxes() {
    const wrongCheckBoxes = document.querySelectorAll("div.checkbox") as NodeListOf<HTMLElement>;
    for (const element of wrongCheckBoxes) {
        const checkBox = element.querySelector("input");
        if (!checkBox) continue;

        checkBox.classList.add("checkbox");

        const registerSpan = document.createElement("span");
        registerSpan.innerText = element.innerText.trim();
        registerSpan.classList.add("label-text", "ml-2");

        const label = document.createElement("label");
        label.classList.add("cursor-pointer", "label");
        label.appendChild(checkBox);
        label.appendChild(registerSpan);

        if (element.parentNode) {
            element.parentNode.replaceChild(label, element);
        }
    }
}
