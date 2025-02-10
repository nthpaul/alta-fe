import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "eslint:recommended"],
    plugins: [],
    rules: {
      "react/jsx-sort-props": ["error", { callbacksLast: true }],
      semi: ["error", "always"],
    },
  }),
];

export default eslintConfig;
