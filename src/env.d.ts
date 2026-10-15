/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Meta Pixel (ex.: 123456789012345). Vazio = desligado. */
  readonly PUBLIC_META_PIXEL_ID?: string;
  /** Google Ads (ex.: AW-123456789). Vazio = desligado. */
  readonly PUBLIC_GOOGLE_ADS_ID?: string;
  /** Rótulo da conversão "Lead" no Google Ads. */
  readonly PUBLIC_GOOGLE_ADS_LABEL_LEAD?: string;
  /** Rótulo da conversão "WhatsApp" no Google Ads. */
  readonly PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP?: string;
  /** Google Analytics 4 (ex.: G-XXXXXXX). Vazio = desligado. */
  readonly PUBLIC_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
