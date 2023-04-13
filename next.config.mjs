// @ts-check
/** @type {import("next").NextConfig} */
const config = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/todo-app" : undefined,
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
