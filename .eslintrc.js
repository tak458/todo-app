module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next", "next/core-web-vitals", "prettier"],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  rules: {},
};
