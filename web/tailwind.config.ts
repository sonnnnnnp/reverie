import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: ['"M PLUS Rounded 1c"', "sans-serif"],
    },
    extend: {
      colors: {
        border:
          "hsl(var(--nextui-divider) / var(--nextui-divider-opacity, var(--tw-bg-opacity)))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwindcss-react-aria-components")({ prefix: "rac" }),
  ],
} satisfies Config;
