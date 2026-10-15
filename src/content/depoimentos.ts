/**
 * 03 · Depoimentos. Sem CMS: edite aqui (ARQUITETURA.md §4.1).
 *
 * ⚠ PROVISÓRIOS: textos de exemplo, NÃO são de clientes reais. Não publicar assim.
 * Para trocar pelos reais (pendência 4 da ARQUITETURA): texto + nome + negócio + foto
 * + AUTORIZAÇÃO POR ESCRITO do cliente para uso de nome e imagem (LGPD).
 * Ao trocar, mude `provisorio` para false: o selo "provisório" some do card.
 *
 * Roteiro de cada depoimento (o card anima nessa ordem, do P&B para a cor, como no vídeo):
 *   antes (a dor) → virada (o que a REZZU fez) → resultado (o que mudou). Sem números inventados.
 */

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
}

export const depoimentosCabecalho = {
  sobretitulo: "Depoimentos",
  titulo: { conectivo: "Quem decidiu,", sentido: "conta." },
} as const;

export const depoimentos: Depoimento[] = [
  {
    provisorio: true,
    selo: "REZZU MED",
    antes: "A clínica vivia de indicação e a agenda oscilava todo mês.",
    virada: "A REZZU reposicionou o perfil e passou a cuidar dos vídeos e do tráfego.",
    resultado: "Hoje chega paciente que já conhece o nosso trabalho.",
    nome: "Nome do cliente",
    negocio: "Clínica · Especialidade · João Pessoa",
  },
  {
    provisorio: true,
    selo: "REZZU FOOD",
    antes: "A gente postava todo dia, mas o salão não enchia.",
    virada: "Com roteiro, gravação e anúncio na mesma mão,",
    resultado: "o movimento apareceu e o delivery virou canal de venda.",
    nome: "Nome do cliente",
    negocio: "Restaurante · Segmento · João Pessoa",
  },
  {
    provisorio: true,
    selo: "REZZU GROUP",
    antes: "Já tinha passado por agência que só entregava relatório bonito.",
    virada: "A REZZU montou a estratégia comigo e acompanhou de perto.",
    resultado: "O resultado apareceu no caixa, não só nas curtidas.",
    nome: "Nome do cliente",
    negocio: "Empresa · Segmento · João Pessoa",
  },
];
