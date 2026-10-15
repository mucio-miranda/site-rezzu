# site-rezzu

Site institucional e LPs do **REZZU group**: Astro (estático) → GitHub → Netlify.

**Tudo sobre o projeto (stack, estrutura, LGPD, pixels, deploy, pendências): [ARQUITETURA.md](ARQUITETURA.md).**

## Rodar localmente

Requer **Node 22.12+**.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/ (o mesmo que o Netlify roda)
npm run preview    # serve o dist/ localmente
npm run check      # confere tipos e componentes
npm run format     # formata o código (Prettier)
```

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Textos, números, depoimentos, contatos | `src/content/*.ts` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Imagens | gerar em `Documents\REZZU\SITE` e rodar `scripts\sincronizar-assets.ps1` |
| Pixels (Meta, Google Ads, GA4) | variáveis no Netlify (ver `.env.example` e ARQUITETURA.md §7.1) |

## Publicação

- Push/merge na `main` → **produção** no Netlify.
- Branch `feat/*` + Pull Request → **deploy preview** para revisar antes.
- Commits seguem a skill `.claude/skills/git-commit` (o agente nunca dá push).
