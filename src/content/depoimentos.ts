/**
 * 03 · Depoimentos. Sem CMS: edite aqui (ARQUITETURA.md §4.1).
 *
 * REAIS (19/10/2026): falas transcritas das legendas dos vídeos de depoimento publicados no @rezzugroup
 * (pasta REZZU\Depoimentos). Trechos editados só para caber no card (cortes marcados com "…"), sem mudar o sentido.
 * Foto: quadro do próprio vídeo. LGPD: os clientes gravaram e autorizaram a publicação no Instagram da REZZU;
 * o ideal é ter também a autorização por escrito para uso no site.
 *
 * Roteiro de cada card (anima nessa ordem, do P&B para a cor): antes → virada → resultado (sublinhado).
 * 4º vídeo (20260922_DdmrJY_pBKC, clínica "IDA"): falta o nome da cliente para entrar aqui.
 */
import ednilma from "../assets/depoimentos/ednilma-barbosa.webp";
import gracinara from "../assets/depoimentos/gracinara.webp";
import docVet from "../assets/depoimentos/gabriel-docvet.webp";

export interface Depoimento {
  provisorio: boolean;
  /** braço da REZZU que atendeu */
  selo: "REZZU MED" | "REZZU FOOD" | "REZZU GROUP";
  antes: string;
  virada: string;
  resultado: string;
  nome: string;
  /** "Negócio · Segmento · Cidade" */
  negocio: string;
  /** foto em src/assets/depoimentos/ (quadrada, mín. 160 px); sem foto, usa as iniciais */
  foto?: ImageMetadata;
  /** link do vídeo do depoimento (Instagram) */
  video?: string;
}

export const depoimentosCabecalho = {
  sobretitulo: "Depoimentos",
  titulo: { conectivo: "Quem decidiu,", sentido: "conta." },
} as const;

export const depoimentos: Depoimento[] = [
  {
    provisorio: false,
    selo: "REZZU MED",
    antes:
      "Todo profissional precisa entender que o posicionamento faz toda a diferença na hora de um paciente chegar até você.",
    virada: "Na REZZU a gente encontrou a parceria, a responsabilidade e o trabalho que esperava.",
    resultado: "Dá um pulinho no meu Instagram e você vai ver a grande diferença do antes e do depois.",
    nome: "Dra. Ednilma Barbosa",
    negocio: "@draednilmabarbosa · Saúde e estética",
    foto: ednilma,
    video: "https://www.instagram.com/reel/DeSjqQTp0R2/",
  },
  {
    provisorio: false,
    selo: "REZZU MED",
    antes: "Estamos juntos há pouco tempo, mas já posso sentir o compromisso dos meninos.",
    virada:
      "Eu pego no pé deles mesmo, e ainda assim continuam atenciosos, gentis e fazendo um trabalho de alta performance.",
    resultado: "Nós vamos crescer muito ainda juntos.",
    nome: "Dra. Gracinara Lima",
    negocio: "@dragracinaralima · Saúde",
    foto: gracinara,
    video: "https://www.instagram.com/reel/DdrxgwepRok/",
  },
  {
    provisorio: false,
    selo: "REZZU GROUP",
    antes: "Sem marketing, o empresário não cresce. A gente não tem a ideia pra fazer conteúdo, vídeos…",
    virada: "O pessoal da REZZU tá comigo há quase três meses.",
    resultado: "O engajamento no Instagram cresceu e o faturamento melhorou. Indico sempre.",
    nome: "Gabriel Dantas",
    negocio: "Médico veterinário · Doc Vet",
    foto: docVet,
    video: "https://www.instagram.com/reel/DctdC5XB-Zb/",
  },
];
