import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        black: {
          ...themes.black,
          primary: "#1f1f1f",
        },
      },
      "lofi",
    ],
  },
} satisfies Config;
