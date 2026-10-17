/**
 * Dados gerais do site (contatos, redes, SEO padrão).
 * Sem CMS: para mudar, edite aqui, faça commit e push (ARQUITETURA.md §4.1).
 * Campos com "PENDENTE" aguardam informação do cliente (ARQUITETURA.md §13).
 */
export const site = {
  nome: "REZZU group",
  descricao:
    "Assessoria de marketing 360° em João Pessoa. Posicionamento, conteúdo e tráfego com produção própria, focados no que vira faturamento.",
  cidade: "João Pessoa",
  uf: "PB",
  idioma: "pt-BR",
  assinatura: "O futuro da sua empresa começa na decisão que você toma agora.",
  /** texto alternativo da imagem de compartilhamento (public/og/padrao.jpg, gerada por SITE/scripts/15_og_imagem.py) */
  ogAlt:
    "REZZU: entregamos o que o empresário precisa, posicionamento e faturamento. Assessoria de marketing 360° em João Pessoa, PB.",

  contato: {
    whatsapp: "", // PENDENTE: só dígitos com DDI e DDD, ex.: "5583999999999"
    whatsappMensagem: "Olá! Vim pelo site e quero meu diagnóstico gratuito.",
    email: "", // PENDENTE: e-mail comercial
  },

  redes: {
    instagram: "", // PENDENTE
    instagramMed: "", // PENDENTE
    instagramFood: "https://www.instagram.com/rezzufood",
  },

  legal: {
    razaoSocial: "", // PENDENTE (rodapé e política de privacidade)
    cnpj: "", // PENDENTE
    emailEncarregadoLgpd: "", // PENDENTE (canal do titular, LGPD)
  },

  /** Meta-tag de verificação de domínio da Meta (Configurações do negócio > Domínios). Vazio = não renderiza. */
  metaVerificacao: "",
} as const;

export type Site = typeof site;
