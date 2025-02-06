import { createIcon } from "./utils";

function addCopyButton() {
    const code = document.querySelector<HTMLInputElement>("#code");
    if (!code) return;
    if (!code.value) return;
    code.classList.remove('form-control')
    code.classList.add('input', 'input-bordered', 'join-item', 'w-full');

    const parentElement = code.parentElement;
    if (!parentElement) return;
    
    const newParentDiv = document.createElement("div");
    newParentDiv.classList.add("my-4");
    parentElement.replaceChild(newParentDiv, code);
    
    const newDiv = document.createElement("div");
    newDiv.appendChild(code);
    newDiv.classList.add("join", "w-full", "join-horizontal");
    newDiv.id = "code-wrapper";
    newParentDiv.appendChild(newDiv);
    
    const newButton = document.createElement("button");
    newDiv.appendChild(newButton);
    newButton.classList.add("btn", "btn-outline", "btn-primary", "join-item");
    newButton.appendChild(createIcon("clipboard"));
    newButton.addEventListener("click", () => {
        const code = document.querySelector<HTMLInputElement>("#code");
        if (!code) return;
        if (!code.value) return;
        
        navigator.clipboard.writeText(code.value);
    });

}

window.addEventListener("load", async () => {
    addCopyButton();
});