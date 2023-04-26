module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals",
    "prettier",
    "plugin:storybook/recommended",
  ],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  rules: {},
};
