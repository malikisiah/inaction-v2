import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
// import themes from "daisyui/src/theming/themes";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisyui, forms],
  daisyui: {
    themes: ["autumn"],
  },
} satisfies Config;
