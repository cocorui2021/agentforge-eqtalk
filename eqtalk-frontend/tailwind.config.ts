
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1"
      }
    }
  },
  plugins: []
};
export default config;
