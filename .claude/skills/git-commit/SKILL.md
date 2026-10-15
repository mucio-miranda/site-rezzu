---
name: git-commit
description: Padrão de commits do site REZZU group (Astro → GitHub → Netlify). Use SEMPRE que houver mudanças prontas para versionar — ao concluir uma seção, um componente, um ajuste de copy ou um bloco de trabalho coerente. O agente PROPÕE a mensagem no padrão definido, ESPERA o ok do usuário, commita localmente e NUNCA dá push (o push é sempre manual: push na main publica em produção no Netlify). Acione mesmo que o usuário não peça "commita" explicitamente — sugerir o commit no momento certo é parte do fluxo.
user-invocable: false
---

# git-commit

Padrão de commits do site REZZU group. Mantém o histórico limpo, legível e seguro para um repositório que
**publica sozinho**: todo push na `main` vira deploy de produção no Netlify. Duas regras inegociáveis:

1. **Nunca dar `git push`.** O push é exclusivamente manual, feito pelo usuário. O agente só commita localmente.
2. **Sempre propor a mensagem e esperar o "ok"** antes de rodar `git commit`. Nada de commit sem aprovação explícita.

## Fluxo

1. Quando houver mudanças prontas (seção concluída, componente finalizado, copy revisada, bloco coerente), proponha o
   commit — mesmo que o usuário não tenha pedido.
2. Rode `git status` e `git diff --staged`. Se nada estiver staged, mostre o que mudou e proponha o `git add` só dos
   arquivos relevantes (nunca `git add -A` às cegas).
3. **Confira antes de propor** (bloqueie o commit e avise se encontrar):
   - arquivos que não podem ir para o repositório: `node_modules/`, `dist/`, `.env*`, `*.psd`, `_trabalho/`;
   - imagem nova pesada (> 1 MB) em `src/assets/` ou `public/` — sugerir versão web antes;
   - ID ou token colado no código: IDs de pixel/tag vão em variável `PUBLIC_*` no Netlify; segredo nunca vai no código.
4. Apresente a **mensagem proposta** no padrão abaixo + a lista de arquivos que entram.
5. Pergunte explicitamente: **"Commito assim?"**
6. Só rode `git commit` após o "ok". Se o usuário ajustar a mensagem, use a versão dele.
7. **Nunca** rode `git push`. Se o usuário quiser publicar, lembre: push em branch `feat/*` gera **preview** no
   Netlify (via Pull Request); push/merge na `main` vai **direto para produção**.

## Estrutura da mensagem

```
[emoji] [tipo]: [mensagem curta em letras minúsculas]
```

| Emoji | Tipo | Quando usar |
|---|---|---|
| ✨ | feature | Nova funcionalidade: seção, componente, página, LP, animação |
| 🐛 | fix | Correção de bug ou erro (layout quebrado, link errado, animação travando) |
| ✏️ | content | **Só copy/conteúdo** em `src/content/` (textos, depoimentos, números, links de WhatsApp). Sem CMS, é o tipo mais comum no dia a dia |
| 🖼️ | assets | Imagens, ícones, fontes, OG images (entrada ou atualização em `src/assets/`, `public/`) |
| 🎨 | style | Mudança visual sem alterar lógica (CSS, tokens, espaçamento, responsivo) |
| 📈 | tracking | Rastreamento e LGPD: banner de cookies, módulo de pixels, eventos, UTMs, política de privacidade |
| 🔍 | seo | Meta tags, Open Graph, schema.org, sitemap, robots |
| ⚡ | perf | Melhora de desempenho (imagens, carregamento de script, Lighthouse) |
| ♻️ | refactor | Refatoração que não corrige bug nem cria feature |
| 📝 | docs | Só documentação (`ARQUITETURA.md`, `README.md`, skills) |
| 🚀 | deploy | Netlify (`netlify.toml`), headers, redirects, domínio, configuração de build |
| 🔒️ | security | Correção de vulnerabilidade ou cabeçalho de segurança |
| 🧹 | chore | Dependências, estrutura de pastas, configuração de ferramentas, manutenção |
| 🐉 | epic | Entrega grande: lançamento do site, nova LP completa, merge de branch longa |

Regras de desempate:
- Texto mudou e nada mais → `✏️ content`. Texto **e** layout → dois commits (`✏️ content` + `🎨 style`).
- Ajuste visual simples (cor, espaçamento, pequeno ajuste de UI) → `🎨 style`.
- Ligar pixel por variável no Netlify **não gera commit** (é configuração no painel). Mudar o módulo de rastreamento → `📈 tracking`.

## Contexto do projeto

- Projeto: `Documents\REZZU\site-rezzu\` (Astro estático). Fonte da verdade: `ARQUITETURA.md`.
- Assets masters e PSDs ficam **fora** do repositório (`Documents\REZZU\SITE\`). Só versões web entram no Git.
- Fluxo de branches:
  - `main` → produção (cada push publica no Netlify). Protegida.
  - `feat/<assunto>` → trabalho; Pull Request para `main` gera **deploy preview** para revisar antes.
- O agente **nunca** empurra para nenhuma branch e nunca abre/mescla Pull Request sem pedido explícito.

## Boas práticas

- **Seja direto:** a mensagem diz *o que* foi feito, não *como*. Curta (até ~70 caracteres).
- **Imperativo/presente:** `fix: corrige X`, não `corrigido` nem `corrigindo`.
- **Um propósito por commit:** não misture `feature` com `fix` ou `content` com `style`. Se o trabalho tem dois
  propósitos, proponha **dois commits** (staging seletivo com `git add <arquivos>` de cada grupo).
- **Minúsculas** na mensagem após o tipo (nomes próprios como REZZU, Netlify e GSAP podem manter a grafia).
- **Sem assinatura** de ferramenta ou agente na mensagem nem no corpo (nada de `Co-Authored-By`, "gerado por" etc.).
- Não cite número de fase/tarefa na mensagem ("da fase 1") — a mensagem descreve o trabalho.

## Exemplos no contexto da REZZU

```
🧹 chore: cria projeto astro com estrutura de pastas
🎨 style: define tokens de cor e tipografia da marca
✨ feature: implementa seção hero com horizonte e z 3d
✨ feature: adiciona escada do método com scroll fixo no gsap
✏️ content: atualiza números da seção de resultados
✏️ content: troca depoimentos genéricos pelos reais da REZZU Med
🖼️ assets: adiciona fotos tratadas dos fundadores em webp
📈 tracking: cria banner de consentimento lgpd
📈 tracking: prepara módulo de meta pixel e google ads por variável de ambiente
🔍 seo: adiciona schema de professional service na home
⚡ perf: carrega gsap só quando a seção do método aparece
🚀 deploy: configura netlify.toml com cache e cabeçalhos de segurança
🐛 fix: corrige corte do título da hero no mobile
🐉 epic: lança a primeira versão do site
```

## Exemplo de proposta ao usuário

> Mudanças prontas para commit (seção Resultados):
> - `src/components/secoes/Resultados.astro`, `src/content/home.ts`, `src/assets/resultados/crescimento.webp`
>
> Conferido: sem `.env`, sem PSD, imagem com 148 KB.
>
> **Mensagem proposta:**
> `✨ feature: implementa seção de resultados com barras de crescimento`
>
> **Commito assim?** (lembrando: não dou push — e push na `main` publica direto em produção)
