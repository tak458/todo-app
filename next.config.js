// @ts-check
/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/todo-app" : undefined,
  reactStrictMode: true,
};
