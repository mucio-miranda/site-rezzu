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
