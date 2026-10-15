// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// URL pública do site (usada no sitemap, canonical e Open Graph).
// Ordem: SITE_URL (definida no Netlify quando houver domínio) → URL (fornecida pelo Netlify no build) → fallback.
const site = process.env.SITE_URL ?? process.env.URL ?? "https://site-rezzu.netlify.app";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" }, // /med.html servido como /med
  integrations: [
    sitemap({
      // páginas utilitárias fora do sitemap
      filter: (page) => !/\/(obrigado|404)$/.test(page.replace(/\/$/, "")),
    }),
  ],
  image: {
    responsiveStyles: true,
  },
});
