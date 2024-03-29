// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  // reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "www.datocms-assets.com",
      "www.tranquility.gg",
      "via.placeholder.com",
      "cdn.discordapp.com",
      "media.discordapp.net",
      "drive.google.com",
    ],
  },
};
export default config;
