import { site } from "./site";
/**
 * Copy da home. Sem CMS: edite aqui, commit e push (ARQUITETURA.md §4.1).
 * Regras: tom jovem e com dado; nunca inventar números; destaque em lima só na palavra-chave.
 */

export const navegacao = [
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Resultados", href: "#resultados" },
  { rotulo: "Método", href: "#metodo" },
  { rotulo: "Nichos", href: "#nichos" },
  { rotulo: "Contato", href: "#diagnostico" },
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
  /** foto dos fundadores (V2: veio do Sobre; sem a legenda de vidro) */
  altFoto:
    "Os dois fundadores do Grupo REZZU, de camisa preta, em pé lado a lado e de braços cruzados, iluminados por uma luz verde-limão vinda da esquerda.",
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
    // confirmado pelo usuário em 18/10/2026: faturamento mensal dos clientes
    {
      cena: "moedas",
      rotulo: "Faturamento",
      prefixo: "+R$",
      valor: 700,
      sufixo: "mil",
      legenda: "faturados mensalmente pelos nossos clientes",
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

/**
 * 05 · Sobre: humanizar (fundadores). PENDENTE: confirmar a história com Gabriel e Thyago (ARQUITETURA.md §13, item 5).
 * O texto abaixo vem da análise de posicionamento e é proposta; não publicar sem a confirmação.
 * Números: só os aprovados (+8 anos).
 */
export const sobre = {
  sobretitulo: "Sobre o Grupo REZZU",
  titulo: { conectivo: "Um time, uma obsessão: marketing que", sentido: "paga as contas." },
  paragrafos: [
    "A REZZU nasceu em João Pessoa atendendo negócios de todos os tipos. Com o tempo, a maior parte da carteira passou a ser de saúde e alimentação, e a especialização virou estrutura: REZZU Med, REZZU Food e, em breve, REZZU Jurídico.",
    "Os fundadores acompanham cada conta de perto. Estratégia, roteiro, gravação, design e tráfego ficam dentro de casa, sob a mesma responsabilidade: fazer o investimento do cliente voltar para o caixa.",
  ],
  fatos: [
    { valor: "+8 anos", rotulo: "de mercado" },
    { valor: "Produção própria", rotulo: "do roteiro ao tráfego" },
    { valor: "João Pessoa", rotulo: "Paraíba" },
  ],
  /** palco do Sobre (V2: veio da hero): os 2 capítulos do vídeo se alternando (01 celular · 02 barras) */
  cena: {
    posicionamento: {
      posicao: "Posicionamento",
      publico: "Empresário",
      local: "João Pessoa · PB",
    },
    faturamento: {
      rotulo: "Faturamento",
      testes: ["Teste 01", "Teste 02", "Teste 03"],
      moeda: "R$",
    },
    descricao:
      "Ilustração em dois capítulos: primeiro um perfil de rede social se montando dentro de um celular, cercado por um radar, com as marcações posicionamento, empresário e João Pessoa; depois barras de crescimento subindo, testes sendo validados e moedas caindo numa carteira.",
  },
  /** celular: no lugar do palco animado, o vídeo institucional num quadro igual aos cards de Resultados */
  video: {
    rotulo: "Conheça",
    duracao: "0:45",
    chamada: "Assista: o que o Grupo REZZU entrega",
    src: "/video/rezzu-institucional.mp4",
    capa: "/video/rezzu-institucional-capa.jpg",
    descricao: "Vídeo institucional do Grupo REZZU, com um dos fundadores apresentando a assessoria.",
  },
} as const;

/**
 * 06 · Nichos: autoidentificação. As LPs /med e /food ainda não existem: por enquanto o botão leva ao
 * Instagram de cada braço (@rezzu.med e @rezzufood), em nova aba. Quando a LP existir, troque `href`.
 * Copy da análise de posicionamento (proposta, validar).
 */
export const nichos = {
  sobretitulo: "Nichos",
  titulo: { conectivo: "Especialistas no", sentido: "seu mercado." },
  itens: [
    {
      id: "med",
      nome: "REZZU Med",
      publico: "Saúde",
      texto: "Clínicas e profissionais de saúde que querem agenda cheia sem ferir a ética.",
      botao: "Conhecer a REZZU Med",
      nicho: "saude",
      href: site.redes.instagramMed,
      emBreve: false,
    },
    {
      id: "food",
      nome: "REZZU Food",
      publico: "Alimentação",
      texto: "Restaurantes, pizzarias e deliveries que querem pedido, não curtida.",
      botao: "Conhecer a REZZU Food",
      nicho: "alimentacao",
      href: site.redes.instagramFood,
      emBreve: false,
    },
    {
      id: "juridico",
      nome: "REZZU Jurídico",
      publico: "Advocacia",
      texto: "Escritórios e advogados que querem autoridade e o cliente certo, dentro das regras da OAB.",
      botao: "Em breve",
      nicho: "juridico",
      href: "",
      emBreve: true,
    },
  ],
} as const;

/**
 * 07 · CTA: conversão. Formulário do diagnóstico (Netlify Forms, ARQUITETURA.md §7 e §12.3) → /obrigado.
 * Copy da análise de posicionamento (proposta, validar). Faixas de faturamento: sugestão, confirmar com a REZZU.
 */
export const cta = {
  sobretitulo: "Diagnóstico gratuito",
  titulo: { conectivo: "A porta está", sentido: "aberta." },
  apoio:
    "Em 45 minutos olhamos seu perfil, sua comunicação e seus gargalos e te entregamos um plano claro, mesmo que você não feche com a gente.",
  entregas: [
    "Análise do seu posicionamento e do seu perfil",
    "Os gargalos que travam o seu faturamento hoje",
    "Um plano de ação claro, por escrito",
  ],
  formulario: {
    titulo: "Agende seu diagnóstico",
    aviso: "Leva menos de 1 minuto. Retornamos pelo WhatsApp.",
    nichos: ["Saúde", "Alimentação", "Jurídico", "Outro"],
    faturamento: [
      "Até R$ 20 mil",
      "De R$ 20 mil a R$ 50 mil",
      "De R$ 50 mil a R$ 100 mil",
      "Acima de R$ 100 mil",
    ],
    consentimento: "Concordo em ser contatado pela REZZU e li a",
    botao: "Agendar meu diagnóstico",
  },
} as const;

/**
 * 08 · Para quem é: filtro (checklist). Inspirado em "Não é para todo mundo. E tá tudo bem."
 * Copy proposta a partir do posicionamento e dos nichos (validar com a REZZU). Sem números.
 */
export const paraQuem = {
  sobretitulo: "Para quem é",
  titulo: { conectivo: "Não é pra todo mundo. E tá", sentido: "tudo bem." },
  apoio:
    "Trabalhamos com quem entende que posicionamento e faturamento se constroem com compromisso dos dois lados. Se você procura atalho ou milagre de seguidores, aqui não é o lugar.",
  itens: [
    "Clínicas, consultórios e profissionais de saúde que querem agenda cheia sem ferir a ética.",
    "Restaurantes, pizzarias e deliveries que querem pedido, não curtida.",
    "Empresários que querem um time só cuidando de tudo, do roteiro ao tráfego.",
    "Marcas que querem ser a referência do seu mercado, e não mais uma no feed.",
    "Quem enxerga marketing como investimento e quer ver o retorno no caixa.",
  ],
} as const;

/**
 * 09 · FAQ: objeções antes de agendar. Respostas só com o que já está no site (método, diagnóstico, nichos,
 * produção própria); nada de prazos ou números novos. Copy proposta: validar com a REZZU.
 * Também vira dados estruturados FAQPage (SEO) no componente Faq.astro.
 */
export const faq = {
  sobretitulo: "Dúvidas frequentes",
  titulo: { conectivo: "Tire suas dúvidas antes de", sentido: "começar." },
  apoio: "Não achou a sua? Pergunte no diagnóstico: é gratuito e sem compromisso.",
  botao: "Quero meu diagnóstico gratuito",
  perguntas: [
    {
      pergunta: "Para quais negócios a REZZU é indicada?",
      resposta:
        "Principalmente saúde (REZZU Med) e alimentação (REZZU Food); o REZZU Jurídico chega em breve. Também atendemos outros segmentos: no diagnóstico a gente mostra, com honestidade, se faz sentido para o seu caso.",
    },
    {
      pergunta: "Já tenho alguém cuidando do meu Instagram. Por que a REZZU?",
      resposta:
        "Postar não é se posicionar. A REZZU assume estratégia, roteiro, gravação, design e tráfego com um time só, comprometido com o seu faturamento, e não com a quantidade de posts.",
    },
    {
      pergunta: "Como funciona o diagnóstico gratuito?",
      resposta:
        "Você preenche o formulário e a gente retorna pelo WhatsApp para marcar. Em 45 minutos olhamos seu perfil, sua comunicação e seus gargalos e entregamos um plano de ação por escrito, mesmo que você não feche com a gente.",
    },
    {
      pergunta: "O que diferencia a REZZU de uma agência comum?",
      resposta:
        "Especialização por mercado (Med, Food e Jurídico), produção própria do roteiro ao tráfego, um método em 5 etapas, do diagnóstico à otimização, e os fundadores acompanhando cada conta de perto.",
    },
    {
      pergunta: "Quanto tempo leva para os resultados aparecerem?",
      resposta:
        "Depende do ponto de partida e do objetivo. Ações de tráfego costumam gerar movimento mais rápido; posicionamento se constrói mês a mês. No diagnóstico a gente mostra o que esperar no seu caso.",
    },
    {
      pergunta: "Vocês garantem resultado de vendas?",
      resposta:
        "Ninguém sério garante número de vendas, porque ele também depende de produto, preço e atendimento. O que a gente garante é método, execução própria e acompanhamento de perto, medindo e ajustando o tempo todo.",
    },
  ],
} as const;
