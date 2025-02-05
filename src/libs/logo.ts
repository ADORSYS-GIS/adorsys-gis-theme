import logoTemplate from '../templates/logo.html';

function addLogo() {
    const headerWrapper = document.querySelector<HTMLDivElement>('#kc-page-title');
    if (!headerWrapper) return;
    headerWrapper.insertAdjacentHTML('afterend', logoTemplate);
}

window.addEventListener("load", async () => {
    addLogo();
});