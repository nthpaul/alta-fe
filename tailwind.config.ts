import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  important: true,
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "alta-gray": {
          "25": "#FAFAFA",
          "50": "#F8F8F8",
          "100": "#F1F1F1",
          "200": "#E1E1E1",
          "300": "#D1D1D1",
          "400": "#B1B1B1",
          "500": "#919191",
          "600": "#828282",
          "700": "#565656",
          "800": "#424242",
          "900": "#2C2C2C",
        },
        "alta-black": "#171717",
        "alta-white": "#F8F8F8",
        border: "hsl(var(--border))",
      },
      boxShadow: {
        "2xl": "0px 24px 48px -12px rgba(17, 25, 39, 0.18)",
        "3xl": "0px 32px 64px -12px rgba(17, 25, 39, 0.14)",
        lg: "0px 12px 16px -4px rgba(17, 25, 39, 0.08), 0px 4px 6px -2px rgba(17, 25, 39, 0.03)",
        md: "0px 4px 8px -2px rgba(17, 25, 39, 0.1), 0px 2px 4px -2px rgba(17, 25, 39, 0.06)",
        sm: "0px 1px 3px rgba(17, 25, 39, 0.1), 0px 1px 2px rgba(17, 25, 39, 0.06)",
        xl: "0px 20px 24px -4px rgba(17, 25, 39, 0.08), 0px 8px 8px -4px rgba(17, 25, 39, 0.03)",
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      },
    },
    fontFamily: {
      sans: ["Assistant", "sans-serif"],
      serif: ["DM Serif Text", "serif"],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.serif],
      system: [
        "-apple-system",
        "system-ui",
        "Inter",
        "Segoe UI",
        "Noto Sans",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
    },
  },
} satisfies Config;
