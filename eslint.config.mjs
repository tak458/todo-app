import { FlatCompat } from "@eslint/eslintrc";
import jest from "eslint-plugin-jest";
import storybook from "eslint-plugin-storybook";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    plugins: {
      jest,
    },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {},
  },
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
