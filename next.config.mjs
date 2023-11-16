// @ts-check
/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/todo-app" : undefined,
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
};
export default config;
