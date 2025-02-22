// @ts-check
/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/todo-app" : undefined,
  reactStrictMode: true,
  output: "export",
};
export default config;
