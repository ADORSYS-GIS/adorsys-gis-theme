import daisyui from "daisyui";

/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{ts,js,html,scss,tsx,jsx}", "./data/**/theme.properties"],
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                "adorsys-stock": {
                    "primary": "#144587",
                    "secondary": "#25A8DB",
                    "accent": "#F6A42B",
                    "neutral": "#101828",
                    "base-100": "#FFFFFF",
                    "info": "#25A8DB",
                    "success": "#90D033",
                    "warning": "#FFCB1D",
                    "error": "#B42318",
                    "dark-80": "#28333B",
                    "dark-50": "#878D92",
                    "dark-20": "#F8F9F9"
                }
            }
        ]
    }
};
