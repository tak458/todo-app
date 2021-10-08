module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next", "next/core-web-vitals", "prettier"],
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  rules: {
    "no-redeclare": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
};
