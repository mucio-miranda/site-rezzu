# Site REZZU group: arquitetura e guia do projeto

> Documento-base do desenvolvimento. Tudo que é preciso saber para construir, publicar e manter o site.
> Criado em 15/10/2026. Atualize este arquivo quando uma decisão mudar.

---

## 1. Visão geral

| Item | Definição |
|---|---|
| O que é | Site institucional do **REZZU group** (home) + **LPs de nicho** (REZZU Med, REZZU Food; Jurídico "em breve") |
| Objetivo de negócio | Gerar pedidos de **diagnóstico gratuito** (lead qualificado) e direcionar cada visitante para a LP do seu nicho |
| Público | Donos de negócio em João Pessoa (clínicas, restaurantes, empresas locais) |
| Tom | Jovem, amigável, com dado. "Curtida não paga boleto." Nunca inventar números |
| Repositório | GitHub (privado) |
| Hospedagem | Netlify (deploy automático a cada push na `main`, preview a cada Pull Request) |
| Fonte do design | Figma `Rezzu Group` › página Moodboard › frame **"Site REZZU — Home v2"** |
| Fonte dos assets | `Documents\REZZU\SITE\ASSETS\` (masters + PSDs; **fora** do repositório) |
| Gestão de conteúdo | **Sem CMS por enquanto.** Toda a copy fica em arquivos `src/content/*.ts`; editar = alterar o arquivo, commit e push (o Netlify publica sozinho). Ver §4.1 |
| Rastreamento | **Preparado, desligado.** Meta Pixel, Google Ads e GA4 entram depois só com variáveis de ambiente no Netlify, sem mexer em código. Ver §7 |
| LGPD | Banner de consentimento + política de privacidade + consentimento no formulário desde o primeiro deploy público. Ver §12 |

---

## 2. Stack (e por quê)

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | **Astro** (saída 100% estática) | HTML pronto no build = carregamento rápido e ótimo SEO; componentes reaproveitados entre home e LPs; zero JS por padrão |
| Tipografia | **Bebas Neue** (títulos, auto-hospedada) + **Proxima Nova** (texto/impacto, via Adobe Fonts) | Fontes da marca (decisão do cliente) |
| Estilo | **CSS próprio** com variáveis (`tokens.css`) + estilos com escopo nos componentes `.astro` | Controle total do visual premium, sem dependência pesada |
| Animação | **GSAP + ScrollTrigger** | Padrão de mercado para animação por scroll (seção fixa da escada, contadores, revelações); gratuito para uso comercial |
| Imagens | `astro:assets` (`<Image>` / `<Picture>`) | Gera AVIF/WebP em vários tamanhos no build, com `width/height` (sem "pulo" de layout) |
| Formulário | **Netlify Forms** | Sem backend: o Netlify recebe o lead e envia por e-mail; plano grátis cobre 100 envios/mês |
| SEO | `@astrojs/sitemap` + meta/OG por página + dados estruturados (schema.org) | Indexação local ("assessoria de marketing João Pessoa") |
| Qualidade | Prettier + `astro check` | Código padronizado e tipos conferidos antes do deploy |
| Node | **22.12 ou superior** (exigência do Astro 7; máquina atual: 24) | Fixado no Netlify via `NODE_VERSION = "22"` e no `.nvmrc` |

> Versões fixadas (exatas) na Fase 0: astro 7.3.5 · @astrojs/sitemap 3.7.4 · gsap 3.15.0 · @fontsource/bebas-neue 5.3.0 ·
> @fontsource-variable/montserrat 5.3.0 · typescript 6.0.3 · @astrojs/check 0.9.10 · prettier 3.9.9 · prettier-plugin-astro 1.1.0.
> Critério: versão com pelo menos ~2 semanas de lançamento. Atualizar com calma, uma de cada vez, testando o build.

---

## 3. Páginas e rotas

| Rota | Página | Status |
|---|---|---|
| `/` | Home (7 seções do sitemap) | Fase 1 |
| `/med` | LP REZZU Med | Fase 3 |
| `/food` | LP REZZU Food | Fase 3 |
| `/juridico` | "Em breve" + lista de espera | Fase 3 |
| `/obrigado` | Confirmação do formulário (dispara a conversão no Analytics/Pixel) | Fase 2 |
| `/politica-de-privacidade` | LGPD | Fase 4 |
| `/404` | Página não encontrada (no visual da marca) | Fase 4 |

---

## 4. Estrutura de pastas

```
site-rezzu/
├── ARQUITETURA.md            ← este arquivo
├── README.md                 ← como rodar (curto)
├── netlify.toml              ← build, headers, redirects
├── astro.config.mjs
├── package.json
├── .gitignore                ← node_modules, dist, .env, *.psd
├── public/                   ← arquivos servidos como estão
│   ├── favicon.svg           (Z da marca)
│   ├── og/                   (imagens de compartilhamento 1200×630)
│   ├── fonts/                (woff2 auto-hospedadas)
│   └── robots.txt
├── src/
│   ├── styles/
│   │   ├── tokens.css        (cores, fontes, espaçamentos, raios)
│   │   └── global.css        (reset, tipografia base, utilitários)
│   ├── assets/               ← imagens otimizadas no build (vêm de SITE\ASSETS)
│   │   ├── hero/  resultados/  metodo/  fundadores/  nichos/  cta/  marca/
│   ├── content/              ← TODA a copy fica aqui (editar texto sem mexer em layout)
│   │   ├── home.ts
│   │   ├── depoimentos.ts
│   │   ├── nichos.ts
│   │   └── site.ts           (contatos, WhatsApp, redes, endereço)
│   ├── components/
│   │   ├── ui/               Botao, Sobretitulo, Titulo, CardDepoimento, CardNicho, Numero, ZLogo
│   │   ├── layout/           Header, Footer, BannerCookies
│   │   └── secoes/           Hero, Resultados, Depoimentos, Metodo, Sobre, Nichos, CTA
│   ├── layouts/
│   │   └── Base.astro        (head/SEO, fontes, header, footer)
│   ├── scripts/              ← JS das animações (carregado só onde precisa)
│   │   ├── anim-base.ts      (revelações e contadores; respeita "reduzir movimento")
│   │   ├── anim-hero.ts
│   │   ├── anim-metodo.ts    (escada fixa com scroll)
│   │   ├── consentimento.ts  (banner LGPD: guarda e lê a escolha do visitante)
│   │   ├── rastreamento.ts   (Meta Pixel / Google Ads / GA4: só carrega com ID + consentimento)
│   │   └── utm.ts            (guarda UTMs/gclid/fbclid e preenche o formulário)
│   └── pages/
│       ├── index.astro
│       ├── med.astro  food.astro  juridico.astro
│       ├── obrigado.astro  politica-de-privacidade.astro  404.astro
└── scripts/
    └── sincronizar-assets.ps1  ← copia os PNG/WebP prontos de SITE\ASSETS para src/assets
```

### 4.1 Conteúdo sem CMS

- Cada texto do site mora em `src/content/` (ex.: `home.ts` exporta `hero.titulo`, `hero.apoio`, `resultados.numeros[]`).
  Os componentes só leem esses arquivos: **nenhum texto fixo dentro de componente**.
- Para mudar copy, depoimento ou número: editar o `.ts`, `git commit`, `git push`. Em ~1 min o Netlify publica.
- Tipos TypeScript em cada arquivo impedem erro de estrutura (ex.: depoimento sem nome não compila).
- **Se um dia entrar CMS** (Decap, Sanity, Storyblok…), a migração é trocar a origem dos dados de `src/content/*.ts`
  para o CMS. Componentes e layout não mudam. Por isso a separação conteúdo × componente é obrigatória desde já.

**Regra dos assets:** o repositório guarda só versões web (PNG/WebP). PSDs, renders brutos e `_trabalho` ficam em
`Documents\REZZU\SITE\` (pesados demais para o Git). Mudou um asset? Rode `SITE\scripts\regerar_tudo.ps1` e depois
`scripts\sincronizar-assets.ps1`.

---

## 5. Design tokens

```css
:root {
  /* cor */
  --bg: #030303;            /* fundo padrão do site (decisão 15/10/2026) */
  --lima: #A8CC15;          /* cor exata do logo */
  --lima-luz: #C8F03A;      /* só para brilhos/luz */
  --branco: #FFFFFF;
  --texto: #B8B8B8;         /* texto corrido */
  --texto-2: #8F8F8F;       /* legendas */
  --linha: rgb(255 255 255 / .10);
  --vidro: rgb(255 255 255 / .03);
  /* tipo */
  --f-display: "Bebas Neue", "Morganite", Impact, sans-serif;   /* títulos, caixa alta */
  --f-texto: "proxima-nova", "Proxima Nova", "Montserrat", system-ui, sans-serif; /* Proxima via Adobe Fonts */
  /* medidas */
  --container: 1280px;  --gutter: clamp(20px, 5.5vw, 80px);
  --raio: 24px;  --raio-pilula: 999px;
  --secao-y: clamp(80px, 10vw, 120px);
}
```

Regras: lima só em destaque (palavra-chave do título, números, CTA). Títulos em caixa alta, entrelinha 0,92.
Contraste: lima sobre #030303 = AA ✔; cinza #B8B8B8 sobre #030303 = AA ✔.

---

## 6. Seções da home → componentes, assets e animação

| # | Componente | Objetivo | Asset (SITE\ASSETS) | Animação (GSAP) |
|---|---|---|---|---|
| — | `Header` | Navegação + CTA fixo | `z\svg\z-mono-lima.svg` | Fica fixo; ganha fundo desfocado ao rolar |
| 01 | `Hero` | Promessa + CTA em 5 s | `secoes\01-hero-horizonte` + `z\render\z3d-{aberto,meio,fechado}-isolado` | Horizonte "amanhece"; lâminas do Z entram (troca dos 3 estados); título linha a linha; parallax leve |
| 02 | `Resultados` | Prova logo após a promessa | `secoes\02-resultados-crescimento` | Barras sobem em sequência; números contam de 0 até o valor (texto HTML) |
| 03 | `Depoimentos` | Prova social com rosto | `secoes\03-depoimento-*` (referência visual; cards em HTML) | Cards em sequência; borda acende no hover; carrossel com arraste no mobile |
| 04 | `Metodo` | Mecanismo único (5 etapas) | `secoes\metodo\animacao\*` + `posicoes.json` | Seção **fixa** durante o scroll; bola salta de degrau em degrau; degrau acende; porta acende no 5º |
| 05 | `Sobre` | Humanizar (fundadores) | `fotos\tratadas\fundadores-apontando-recorte` | Rim light acende; parallax foto × texto; citação entra com desfoque → nitidez |
| 06 | `Nichos` | Autoidentificação → LP | `secoes\06-nicho-{med,food,juridico}` | Feixe acende no hover; card sobe 4px; Jurídico esmaecido, sem interação |
| 07 | `CTA` | Conversão | `secoes\07-cta-portal` | Porta acende ao entrar; poeira de luz lenta; botão pulsa 1 vez |

**Princípios de animação:** entradas de 0,4–0,8 s, `ease: "power3.out"`; nada em loop agressivo;
`prefers-reduced-motion` → mostra estados finais sem animar; no mobile (< 768px) a escada vira sequência
vertical e parallax/seção fixa são desligados; os scripts de animação carregam só quando a seção aparece.

---

## 7. Conversão: formulário, WhatsApp e rastreamento

**Fluxo do lead:** CTA → formulário do diagnóstico (modal ou seção) → `/obrigado` (+ botão "chamar no WhatsApp").

- **Campos:** nome, WhatsApp, empresa/negócio, nicho (Saúde · Alimentação · Outro), faturamento mensal (faixas), @ do Instagram.
- **Netlify Forms:** `<form name="diagnostico" method="POST" data-netlify="true" netlify-honeypot="campo-bot">` (anti-spam por honeypot).
  Notificação por e-mail configurada no painel do Netlify (Forms › Notifications).
- **WhatsApp:** link `https://wa.me/55DDDNUMERO?text=...` com mensagem pré-preenchida (número em `content/site.ts`).
- **UTMs:** `utm_source/medium/campaign/term/content`, `gclid` (Google Ads) e `fbclid` (Meta) são lidos da URL na
  chegada, guardados em `sessionStorage` e enviados como campos ocultos no formulário (sabemos de qual anúncio veio o lead).

### 7.1 Pixels e tags: preparados agora, ativados depois

O site nasce com o **módulo de rastreamento pronto e desligado**. Ativar uma plataforma = criar a variável no
Netlify (Site configuration › Environment variables) e fazer um novo deploy. **Nenhuma alteração de código.**

| Variável (Netlify) | Plataforma | Exemplo | O que liga |
|---|---|---|---|
| `PUBLIC_META_PIXEL_ID` | Meta Ads (Facebook/Instagram) | `123456789012345` | Pixel base + eventos padrão da Meta |
| `PUBLIC_GOOGLE_ADS_ID` | Google Ads | `AW-123456789` | Tag do Google Ads (gtag) |
| `PUBLIC_GOOGLE_ADS_LABEL_LEAD` | Google Ads, conversão "Lead" | `AbC-D_efG-h12_34` | Conversão no envio do formulário |
| `PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP` | Google Ads, conversão "WhatsApp" | `XyZ...` | Conversão no clique do WhatsApp |
| `PUBLIC_GA4_ID` | Google Analytics 4 (opcional) | `G-XXXXXXX` | Análise de tráfego |

Regras do módulo (`src/scripts/rastreamento.ts`):
- Variável vazia → o script daquela plataforma **não é nem baixado** (zero impacto em desempenho).
- **Nada carrega antes do consentimento** de marketing (§12). Sem aceite: nenhum pixel, nenhum cookie de anúncio.
- Uma única função interna `rastrear(evento, dados)` envia o mesmo evento para todas as plataformas ligadas.
  Os componentes chamam só essa função, nunca o `fbq`/`gtag` direto.
- **Google Consent Mode v2:** a tag do Google carrega com tudo negado (`ad_storage`, `ad_user_data`,
  `ad_personalization`, `analytics_storage` = `denied`) e vira `granted` quando a pessoa aceita.
- **Meta:** `fbq('consent', 'revoke')` antes do aceite; `fbq('consent', 'grant')` depois.

Mapa de eventos (já disparados pelo site, prontos para quando as plataformas forem ligadas):

| Momento | Evento interno | Meta Pixel | Google Ads | GA4 |
|---|---|---|---|---|
| Qualquer página | `pagina` | `PageView` | (tag base) | `page_view` |
| Clique em CTA de diagnóstico | `clique_cta` | `Contact`* | — | `clique_cta` |
| Abrir formulário | `inicio_formulario` | `InitiateCheckout`* | — | `begin_form` |
| Chegar em `/obrigado` (lead enviado) | `lead` | **`Lead`** | **conversão "Lead"** | `generate_lead` |
| Clique no WhatsApp | `clique_whatsapp` | `Contact` | **conversão "WhatsApp"** | `clique_whatsapp` |
| Clique para LP Med/Food | `clique_nicho` | `ViewContent` (content_name = nicho) | — | `clique_nicho` |

\* opcional; pode ser desligado no módulo.

**Configuração do lado das plataformas (quando for ativar):**
- **Meta:** Gerenciador de Eventos › criar Pixel › copiar o ID › colar em `PUBLIC_META_PIXEL_ID`. Verificar o domínio
  (Configurações do negócio › Domínios; a verificação por meta-tag fica pronta em `content/site.ts → metaVerificacao`).
  Configurar o evento `Lead` como otimização das campanhas.
- **Google Ads:** Metas › Conversões › nova conversão "Site" › método **tag do Google** › copiar `AW-…` e o rótulo da
  conversão (Lead, WhatsApp) para as variáveis acima.
- Testar com **Meta Pixel Helper** e **Google Tag Assistant** em um deploy de preview antes de produção.

**Futuro (não incluso agora):** API de Conversões da Meta e conversões avançadas do Google (envio pelo servidor, mais
precisão com bloqueadores de anúncio). Caminho previsto: uma **Netlify Function** acionada pelo envio do formulário.
Exige token de acesso guardado como variável **secreta** (sem o prefixo `PUBLIC_`).
O Google Tag Manager também é compatível, mas não é necessário: o módulo próprio é mais leve e já cobre os eventos.

---

## 8. SEO e compartilhamento

- `<title>` e `description` por página (em `content/`), `canonical`, `lang="pt-BR"`.
- Open Graph/Twitter com imagem 1200×630 por página (`public/og/`).
- Dados estruturados `ProfessionalService` (nome, cidade João Pessoa-PB, área de atuação, redes) na home.
- `sitemap.xml` automático + `robots.txt`.
- Palavras-alvo: "assessoria de marketing João Pessoa", "marketing para clínicas João Pessoa", "marketing para restaurantes João Pessoa".

---

## 9. Desempenho e acessibilidade (metas)

| Métrica | Meta |
|---|---|
| Lighthouse (mobile) | ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO |
| LCP (imagem da hero) | < 2,5 s em 4G; hero ≤ 150 KB em AVIF, `fetchpriority="high"` |
| JS na home | < 80 KB (GSAP só onde há animação) |
| CLS | < 0,1 (toda imagem com dimensões) |
| Fontes | woff2 auto-hospedadas, `font-display: swap`, pré-carregar só a do título |
| Acessibilidade | foco visível, `alt` em imagens com conteúdo (decorativas com `alt=""`), botões com texto, contraste AA |

---

## 10. GitHub

- Repositório: **https://github.com/mucio-miranda/site-rezzu** (remoto `origin`).
- Branches: `main` = produção (protegida). Trabalho em `feat/<assunto>` → Pull Request → preview do Netlify → merge.
- Commits: padrão da skill **`.claude/skills/git-commit`** (`[emoji] [tipo]: mensagem em minúsculas`, ex.:
  `✨ feature: implementa seção hero`). O agente propõe, espera o "ok", commita local e **nunca dá push**.
- **Nunca** subir: `node_modules/`, `dist/`, `.env`, `*.psd`, `_trabalho/`.
- `gh` (GitHub CLI) não está instalado nesta máquina: criar o repositório pelo site do GitHub e ligar com
  `git remote add origin ...` (ou instalar o `gh` se preferir fazer pelo terminal).

## 11. Netlify

1. Netlify › *Add new site* › *Import from Git* › GitHub › `rezzu-site`.
2. Build: comando `npm run build`, pasta de publicação `dist` (já definidos no `netlify.toml`).
3. Variáveis de ambiente: `NODE_VERSION` já vem do `netlify.toml` (22). Rastreamento (opcionais, quando for ativar): ver tabela §7.1.
   Variáveis `PUBLIC_*` vão para o navegador (IDs de pixel são públicos por natureza); **tokens e segredos nunca
   levam `PUBLIC_`**. Após criar ou alterar uma variável: *Deploys › Trigger deploy*.
4. Forms: ativar *Form detection*; configurar notificação de e-mail.
5. Domínio: adicionar o domínio próprio, HTTPS automático (Let's Encrypt), redirecionar `www` → domínio raiz.

`netlify.toml` previsto:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

> Se no futuro entrar uma Content-Security-Policy (CSP), liberar os domínios dos pixels:
> `connect.facebook.net`, `www.facebook.com`, `www.googletagmanager.com`, `www.google-analytics.com`,
> `googleads.g.doubleclick.net`, `www.google.com`.

---

## 12. LGPD (Lei 13.709/2018)

Obrigatório **antes do primeiro deploy público** (o preview pode ir sem).

### 12.1 Dados que o site trata

| Dado | Onde | Finalidade | Base legal |
|---|---|---|---|
| Nome, WhatsApp, empresa, nicho, faturamento, @ | Formulário do diagnóstico | Retorno comercial e diagnóstico | Consentimento (art. 7º, I) |
| UTMs, gclid, fbclid | Formulário (oculto) | Saber a origem do lead | Legítimo interesse (art. 7º, IX), informado na política |
| Cookies de medição (GA4) | Navegador | Estatísticas de uso | Consentimento |
| Cookies de anúncio (Meta, Google Ads) | Navegador | Medir e otimizar campanhas | Consentimento |
| Preferência de cookies | `localStorage` do visitante | Lembrar a escolha | Necessário ao funcionamento |

### 12.2 Banner de consentimento (componente `BannerCookies` + `consentimento.ts`)

- Aparece na primeira visita, sem cobrir o conteúdo todo. Três ações: **Aceitar todos**, **Recusar não essenciais** e
  **Personalizar** (categorias: Necessários [sempre ativos] · Medição · Marketing).
- "Recusar" tem o **mesmo destaque** que "Aceitar" (sem truque visual).
- Até a escolha: **nenhum** script de terceiros carrega (§7.1).
- Escolha salva em `localStorage` (`rezzu-consentimento`: versão, data, categorias) e **pedida de novo após 12 meses**
  ou quando a versão da política mudar.
- Link fixo **"Preferências de cookies"** no rodapé para mudar a escolha a qualquer momento (revogação tão fácil quanto o aceite).
- Revogar marketing → `fbq('consent','revoke')`, Consent Mode volta para `denied`, e os cookies de anúncio
  conhecidos (`_fbp`, `_gcl_*`, `_ga*`) são apagados.

### 12.3 Formulário

- Checkbox **não marcado por padrão**: "Concordo em ser contatado pela REZZU e li a [Política de Privacidade]."
  O envio fica bloqueado sem o aceite.
- Só os campos necessários; nada de dado sensível (saúde etc.).
- Netlify Forms guarda os envios no painel do Netlify, em servidores fora do Brasil. Isso é informado na política
  (transferência internacional, art. 33). Exportar e apagar leads antigos periodicamente (prazo definido na política).

### 12.4 Página `/politica-de-privacidade`

Conteúdo mínimo: identificação do controlador (razão social, CNPJ, endereço, e-mail); dados coletados (tabela §12.1);
finalidades e bases legais; cookies e como gerenciá-los; com quem compartilhamos (Netlify, Meta, Google, quando
ativos); transferência internacional; prazo de retenção; direitos do titular (acesso, correção, exclusão,
portabilidade, revogação do consentimento) e **canal para exercê-los** (e-mail do encarregado/DPO); data da última
atualização e versão.

> O texto final da política deve ser revisado pela REZZU ou por um advogado. O site entrega a estrutura e um rascunho.

### 12.5 Checklist LGPD de lançamento
- [ ] Nenhum cookie de terceiros antes do aceite (conferir em DevTools › Application › Cookies).
- [ ] "Recusar" funciona e é persistido.
- [ ] Link "Preferências de cookies" no rodapé reabre o banner.
- [ ] Checkbox do formulário obrigatório e desmarcado.
- [ ] Política publicada, com CNPJ e e-mail de contato preenchidos.
- [ ] Ao ligar um pixel novo: conferir que só dispara após o aceite.

---

## 13. Pendências (decisões do cliente)

| # | Pendência | Impacto |
|---|---|---|
| 1 | **Domínio** (ex.: rezzugroup.com.br?) | SEO, e-mails, Netlify |
| 2 | **Proxima Nova na web**: criar um *Web Project* no Adobe Fonts (incluso no Creative Cloud) com Proxima Nova (Regular, Semibold, Black) para o domínio e colar o ID em `PUBLIC_ADOBE_FONTS_KIT` no Netlify. Sem isso, o texto aparece em Montserrat | Tipografia |
| 3 | Número de **WhatsApp** comercial e e-mail que recebe os leads | Conversão |
| 4 | **Depoimentos reais** (texto + foto + autorização) | Seção 03 |
| 5 | Confirmar a **história do Sobre** com Gabriel e Thyago | Seção 05 |
| 6 | IDs de **Meta Pixel**, **Google Ads** (ID + rótulos de conversão) e, se quiser, **GA4**. Podem vir **depois do lançamento** (§7.1) | Rastreamento |
| 6b | E-mail do **encarregado (DPO)** / canal LGPD | Política de privacidade |
| 7 | Redes sociais oficiais (Instagram do group, Med, Food) | Rodapé, schema |
| 8 | Copy das LPs Med e Food (base: documentos dos braços no Drive) | Fase 3 |
| 9 | Remover ou manter o logo da Apple na foto "apontando" | Seção 05 |
| 10 | CNPJ / razão social para o rodapé e a política de privacidade | Rodapé, LGPD |

---

## 14. Roteiro de desenvolvimento

| Fase | Entrega | Pronto quando |
|---|---|---|
| **0 · Base** | Projeto Astro, tokens, fontes, `netlify.toml`, repositório no GitHub, primeiro deploy (página em branco) no Netlify | URL de preview no ar |
| **1 · Home estática** | 7 seções + header/footer, responsivo, sem animação, copy de `content/` | Igual ao Figma "Home v2" em desktop e mobile |
| **2 · Conversão + LGPD** | Formulário Netlify com consentimento, `/obrigado`, WhatsApp, UTMs, banner de cookies, módulo de rastreamento (desligado), política de privacidade | Lead de teste chega no e-mail; nenhum cookie de terceiros sem aceite |
| **3 · Animações** | GSAP: hero, contadores, escada fixa, revelações; "reduzir movimento" | 60 fps no desktop, sem travar no mobile |
| **4 · LPs** | `/med`, `/food`, `/juridico` reaproveitando componentes | LPs no ar com CTA próprio |
| **5 · SEO e QA** | Meta/OG, schema, sitemap, 404, Lighthouse ≥ 90, checklist LGPD (§12.5) | Checklist de lançamento ok |
| **6 · Lançamento** | Domínio, HTTPS | Site no domínio oficial |
| **Depois** | Ligar Meta Pixel e Google Ads (só variáveis, §7.1); opcional: API de Conversões; opcional: CMS (§4.1) | Eventos aparecendo no Gerenciador de Eventos / Google Ads |

---

## 15. Comandos (depois da Fase 0)

```bash
npm install          # instalar dependências
npm run dev          # servidor local em http://localhost:4321
npm run build        # gerar o site em dist/ (o mesmo que o Netlify roda)
npm run preview      # ver o build localmente
```
