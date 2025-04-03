import { FlatCompat } from "@eslint/eslintrc";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
  }),
  eslintConfigPrettier,
  {
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
