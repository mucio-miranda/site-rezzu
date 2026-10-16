/**
 * Copy da home. Sem CMS: edite aqui, commit e push (ARQUITETURA.md §4.1).
 * Regras: tom jovem e com dado; nunca inventar números; destaque em lima só na palavra-chave.
 */

export const navegacao = [
  { rotulo: "Resultados", href: "#resultados" },
  { rotulo: "Método", href: "#metodo" },
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Nichos", href: "#nichos" },
  { rotulo: "Contato", href: "#contato" },
] as const;

export const ctaPrincipal = {
  rotulo: "Diagnóstico gratuito",
  href: "#diagnostico",
} as const;

/**
 * Hero = a tese do vídeo institucional (MOTION.md §1.1), em tipografia cinética de 3 vozes,
 * toda em Bebas Neue no mesmo tamanho: conectivo e IMPACTO em branco · sentido em lima.
 * Lida inteira: "Entregamos o que o empresário precisa: posicionamento e faturamento."
 */
export const hero = {
  sobretitulo: "Grupo REZZU · Assessoria de marketing 360°",
  tese: {
    conectivo: "Entregamos o que o empresário",
    impacto: "precisa:",
    sentido1: "posicionamento",
    ligacao: "e",
    sentido2: "faturamento.",
  },
  apoio:
    "Sua marca no lugar certo, com produção própria do roteiro ao tráfego. E o resultado aparecendo no caixa, não só nas curtidas.",
  ctaPrimario: { rotulo: "Quero meu diagnóstico gratuito", href: "#diagnostico" },
  ctaSecundario: { rotulo: "Ver o Método REZZU", href: "#metodo" },
  /** palco da hero: os 2 capítulos do vídeo se alternando (01 celular · 02 barras) */
  cena: {
    capitulos: ["Posicionamento", "Faturamento"],
    posicionamento: {
      posicao: "Posicionamento",
      publico: "Empresário",
      local: "João Pessoa · PB",
    },
    faturamento: {
      testes: ["Teste 01", "Teste 02", "Teste 03"],
      moeda: "R$",
    },
    descricao:
      "Ilustração em dois capítulos: primeiro um perfil de rede social se montando dentro de um celular, cercado por um radar, com as marcações posicionamento, empresário e João Pessoa; depois barras de crescimento subindo, testes sendo validados e moedas caindo numa carteira.",
  },
} as const;

/**
 * 02 · Resultados: só números aprovados (+8 anos, +R$700 mil, +20 mi). Nunca inventar outros.
 * O número fica no HTML (SEO/acessibilidade); a animação só conta de 0 até ele.
 * Cada número tem uma mini cena vetorial (MOTION.md §3): tempo · moedas · views.
 */
export const resultados = {
  sobretitulo: "Resultados",
  titulo: { conectivo: "Resultado a gente mostra em", sentido: "número." },
  numeros: [
    {
      cena: "tempo",
      rotulo: "Mercado",
      prefixo: "+",
      valor: 8,
      sufixo: "anos",
      legenda: "de mercado, em João Pessoa",
    },
    // PENDENTE: confirmar se é faturamento gerado para os clientes ou da própria REZZU (legenda do Figma)
    {
      cena: "moedas",
      rotulo: "Faturamento",
      prefixo: "+R$",
      valor: 700,
      sufixo: "mil",
      legenda: "faturados pelos nossos clientes",
    },
    {
      cena: "views",
      rotulo: "Alcance",
      prefixo: "+",
      valor: 20,
      sufixo: "mi",
      legenda: "de visualizações geradas",
    },
  ],
} as const;

/**
 * 04 · Método REZZU: o mecanismo único, em 5 degraus (MOTION.md §3).
 * A escada é SVG neon; a bola (a marca do cliente) sobe um degrau por etapa conforme o scroll.
 */
export const metodo = {
  sobretitulo: "Método REZZU",
  titulo: { conectivo: "5 degraus entre o seu perfil e o", sentido: "seu caixa." },
  etapas: [
    {
      nome: "Diagnóstico",
      descricao: "Entender o que a marca realmente precisa antes de qualquer estratégia.",
    },
    {
      nome: "Imersão",
      descricao: "Deixar de ver um negócio e enxergar uma identidade: história, público, linguagem.",
    },
    {
      nome: "Setup estratégico",
      descricao: "Transformar informação em direção: linhas editoriais, visual, formatos.",
    },
    { nome: "Execução", descricao: "Vídeo, foto, design e tráfego, tudo produzido pelo nosso time." },
    { nome: "Otimização", descricao: "Medir, ajustar e crescer de novo. O trabalho não acaba na entrega." },
  ],
  descricaoCena:
    "Ilustração: escada de cinco degraus em neon verde; uma bola sobe degrau por degrau até uma porta iluminada no topo.",
} as const;
