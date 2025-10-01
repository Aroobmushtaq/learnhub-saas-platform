// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "#E5E7EB", // gray-200
        input: "#F9FAFB", // gray-50
        ring: "#3B82F6", // blue-500
        background: "#FFFFFF", // white
        foreground: "#111827", // gray-900

        primary: {
          DEFAULT: "#2563EB", // blue-600
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6B7280", // gray-500
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626", // red-600
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6", // gray-100
          foreground: "#6B7280", // gray-500
        },
        accent: {
          DEFAULT: "#10B981", // green-500
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        sidebar: {
          DEFAULT: "#1F2937", // gray-800
          foreground: "#F9FAFB", // gray-50
          primary: "#2563EB", // blue-600
          "primary-foreground": "#FFFFFF",
          accent: "#10B981", // green
          "accent-foreground": "#FFFFFF",
          border: "#374151", // gray-700
          ring: "#3B82F6", // blue-500
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
