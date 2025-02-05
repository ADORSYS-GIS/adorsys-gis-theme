declare module '*.html' {
  const content: string;
  export default content;
}

type MainTheme = "adorsys-light" | "adorsys-dark";

declare interface Window {
  setTheme(theme: MainTheme): void;
}