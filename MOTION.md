# Linguagem de motion do site REZZU

Base: vídeo institucional da REZZU (`SITE\ASSETS\referencias\rezzu-group-institucional.mp4`, 45 s, 720×1280, 30 fps; versão web em `public/video/rezzu-institucional.mp4`),
analisado quadro a quadro (a cada 0,5 s e a 10 fps nos momentos-chave) em 15/10/2026.
Quadros em `SITE\_trabalho\video-ref\`. Este documento manda em toda animação do site.

---

## 1. O que o vídeo faz (análise)

### 1.1 Estrutura narrativa
| Tempo | Bloco | Tratamento |
|---|---|---|
| 0–5 s | Gancho: "E se eu te falar que o Grupo REZZU está se tornando a maior assessoria de marketing aqui da Paraíba?" | Fundador em cor (madeira quente), legenda palavra a palavra |
| 5,5 s | Corte com clarão (film burn/flash de exposição) | Transição de câmera |
| 6–16 s | Tese: "é bem simples: nós entregamos o que o empresário de João Pessoa PRECISA: posicionamento…" | Cor; palavras-chave gigantes |
| 17–22 s | **Capítulo 01/02 · Posicionamento**: "Sua marca no lugar certo" | Motion graphic 100% vetorial |
| 23 s | "E o faturamento" (volta ao fundador) | Ponte |
| 24–30 s | **Capítulo 02/02 · Faturamento**: "Estratégias validadas" → "Dinheiro no bolso" | Motion graphic |
| 30–36 s | Dor: "dinheiro fora investindo em agências tradicionais que não te dão resultado" | **Preto e branco** |
| 36,3 s | Volta à cor (corte seco) | Solução = cor |
| 37–42 s | CTA: "aumentar o teu faturamento e melhorar o teu posicionamento é fácil: vem com o Grupo REZZU" | Fundador aponta para notebook com o logo |
| 42,5–45 s | Assinatura do logo | Clarão + anel de choque + partículas |

**Mensagem central:** REZZU entrega duas coisas, **posicionamento** e **faturamento**, em dois "capítulos" (01/02, 02/02).
A dor (agências tradicionais, dinheiro fora) é em P&B; a solução é em cor e lima.

### 1.2 Tipografia cinética (o elemento mais forte)
- **Três vozes tipográficas**, trocando a cada batida da fala (~0,3–0,6 s):
  1. **Conectivo**: sans pequena, branca ("E se eu te falar", "que o", "aqui da").
  2. **Palavra de sentido**: **serifada itálica, lima**, grande ("*assessoria*", "*referência*", "*simples*", "*posicionamento*", "*faturamento*", "*fácil*").
  3. **Palavra de impacto**: **sans black em caixa alta**, branca ou lima ("REZZU", "PRECISA", "DINHEIRO FORA", "RESULTADO").
- **Empilhamento**: rótulo pequeno em cima + palavra grande embaixo ("Grupo / **REZZU**", "a maior / *assessoria* / de marketing").
- Entrada **seca** (corte, sem fade lento), centralizada no terço inferior. Ritmo rápido: algo muda a cada ~0,5 s.

### 1.3 Motion graphics (capítulos)
Cena comum: fundo quase preto com **brilho radial verde** no centro + **piso de grade em perspectiva** (wireframe lima, fugindo para o horizonte).
Cabeçalho de capítulo: `● POSICIONAMENTO ———— 01 / 02` (bolinha + rótulo minúsculo + linha de progresso que preenche).
Título: **CAIXA ALTA branca** + *itálico serifado lima* ("SUA MARCA / *no lugar certo*", "ESTRATÉGIAS *validadas*", "DINHEIRO NO *bolso*").

**Cena 01 · celular (17–22 s), montagem acumulativa:**
1. Celular em contorno neon lima (3D leve, em perspectiva) aparece.
2. Perfil "se monta": avatar → linhas de texto → grade do feed, **quadradinho a quadradinho** (~0,1 s cada, pop).
3. **Anel de radar** se desenha em volta (traços circulares girando, marcas de mira).
4. Etiquetas em pílula pulam: "✔ POSIÇÃO CERTA", "👤 EMPRESÁRIO".
5. **Pin de mapa** cai com onda elíptica no chão: "JOÃO PESSOA · PB".
6. Ícones sociais (coração, chat, play, usuário) flutuam ao redor.

**Cena 02 · barras (24–30 s):**
1. Barras 3D lima **sobem uma a uma** (crescem da base, com leve overshoot).
2. **Linha com seta se desenha** ligando os topos.
3. Pílulas "TESTE 01 / 02 / 03" aparecem **vazias (contorno)** e depois **preenchem em lima com ✔**: mudança de estado = validação.
4. Título troca ("ESTRATÉGIAS *validadas*" → "DINHEIRO NO *bolso*"), com o antigo apagando.
5. **Moedas caem** com brilhos dentro de uma **carteira "R$"**.

### 1.4 Cor como narrativa
- Cor quente (madeira) = conversa/confiança · **P&B = dor** · lima = solução/resultado.

### 1.5 Transições e assinatura
- Cortes secos; clarão de exposição em troca de câmera.
- Logo final: **raio de luz horizontal** atravessa → **explosão de brilho** → **anel de choque** expandindo → poeira de luz flutuando → logo assenta com halo suave.

---

## 2. Sistema de motion do site (tradução para web)

**Princípio:** tudo **vetorial** (SVG + CSS + GSAP), como no vídeo, e não imagem renderizada. Fica nítido em qualquer tela,
leve e animável peça a peça. Brilho = `filter: drop-shadow()` lima. Renders 3D só onde agregam.

### 2.1 Tokens de motion
| Token | Valor | Uso |
|---|---|---|
| `pop` | 0,35 s · `back.out(1.6)` | quadradinhos, pílulas, ícones, pin |
| `entra` | 0,6 s · `power3.out` | títulos, cards |
| `desenha` | 0,9 s · `power2.inOut` | linhas, anéis, setas (stroke-dashoffset) |
| `cresce` | 0,7 s · `back.out(1.2)`, stagger 0,12 s | barras |
| `troca` | 0,25 s, sem easing | troca de palavra (corte seco, como a legenda) |
| `stagger-curto` | 0,08–0,1 s | montagens acumulativas |

### 2.2 Componentes de motion reutilizáveis
1. **`TextoCinetico`**: frase em 3 vozes (conectivo / *destaque itálico lima* / IMPACTO) com troca por batida.
2. **`CabecalhoCapitulo`**: `● RÓTULO ——— 01 / 02` com a linha de progresso ligada ao scroll da seção.
3. **`PisoGrade`**: piso em perspectiva + brilho radial (fundo de seções-capítulo). CSS puro.
4. **`Pilula`**: estado *vazio* (contorno) → *validado* (lima + ✔).
5. **`AnelRadar`**: círculos/arcos que se desenham e giram devagar.
6. **`Pin`**: queda + onda elíptica.
7. **`Barras3D`**: barras SVG em 3 faces que crescem + linha-seta que se desenha.
8. **`AssinaturaLogo`**: raio + clarão + anel de choque + partículas (fechamento/CTA).
9. **`FiltroDor`**: P&B → cor ligado ao scroll (seção de dor/agências tradicionais).

### 2.3 Tipografia (decisão 15/10/2026)
O vídeo usa uma serifada itálica nas palavras de sentido, mas **no site a tipografia é só da marca**:
- **Títulos (h1/h2, as 3 vozes): só Bebas Neue, num tamanho só.** A diferença é a cor: conectivo e IMPACTO em branco, sentido em lima.
- **Proxima Nova: parágrafos e interface** (apoio, botões, menu, rótulos).

A Instrument Serif foi testada e **descartada** pelo cliente; o h1 com Proxima no conectivo/impacto também.
Proxima Nova na web via Adobe Fonts (`PUBLIC_ADOBE_FONTS_KIT`); sem o kit, fallback Montserrat.

### 2.4 Regras
- Ritmo: montagens acumulativas com stagger curto; nada de fade lento genérico.
- Acionamento por scroll (ScrollTrigger) nas cenas-capítulo; a hero roda sozinha na entrada.
- `prefers-reduced-motion`: mostra a cena **já montada** (estado final), sem movimento.
- Celular: mesmas cenas, menores, sem fixar a seção na tela.

---

## 3. Aplicação na home (proposta)

| Seção | Cena |
|---|---|
| Hero | **Tese da REZZU em texto cinético** ("ENTREGAMOS O QUE O EMPRESÁRIO PRECISA: POSICIONAMENTO E FATURAMENTO.") + **palco com os 2 capítulos em ciclo**: cap. 01 celular (ícones **orbitando** o anel do radar) → clarão → cap. 02 barras subindo + seta + TESTE → ✔ + moedas na carteira R$ → clarão → cap. 01… (sem cabeçalho de capítulo, removido a pedido; feito: `CenaPosicionamento`, `CenaFaturamento`).<br>**Celular/tablet (até 900 px): sem motion.** O texto aparece pronto e o palco dá lugar ao vídeo institucional num quadro igual aos cards de Resultados (toca ao tocar no play; `preload=none`) |
| Resultados | Números +8 anos / +R$700 mil / +20 mi; pode reaproveitar `CenaFaturamento` acionada por scroll |
| Dor (nova, opcional) | "Dinheiro fora em agência tradicional" em **P&B**, virando cor ao rolar |
| Método | **Escada SVG neon** em palco *sticky* (não prende a rolagem): cada etapa que chega ao meio da tela acende o degrau, a bola salta em arco até ele e o capítulo troca `01/05 … 05/05`; no 5º, a porta acende. Celular: palco fixo no topo, etapas rolando por baixo (feito: `CenaEscada`, `Metodo`) |
| Sobre | Foto dos fundadores (recorte) com **luz lima de recorte** que acende atrás e anel se abrindo; a foto sai do escuro; parallax leve da foto × texto; título em texto cinético; parágrafos do desfoque para a nitidez; fatos sobem um a um (feito: `Sobre`) |
| Nichos | Cards REZZU Med · Food · Jurídico com os ícones 3D (cruz, cloche, balança); entram em sequência e o ícone sobe do escuro; no hover o feixe de luz acende, o card sobe 4 px e o ícone brilha; Jurídico "em breve", esmaecido e sem clique (feito: `Nichos`) |
| CTA | **Assinatura do logo** (raio + anel + partículas) + botão |
