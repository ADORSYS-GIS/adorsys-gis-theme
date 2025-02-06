export function addFeatherIconToButton(element: Element | null, iconStr: string) {
    const icon = createIcon(iconStr);
    if (!element) return;

    element.prepend(icon);
}

export function createIcon(icon: string): HTMLElement {
    const languageIcon = document.createElement("i");
    const attr = document.createAttribute("data-feather");
    attr.value = icon;
    languageIcon.attributes.setNamedItem(attr);
    return languageIcon;
}