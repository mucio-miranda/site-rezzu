/**
 * Formulário do diagnóstico (ARQUITETURA.md §7): sem isto o envio nativo continua funcionando.
 *  - guarda UTMs/gclid/fbclid da URL de chegada (sessionStorage "rezzu-origem") e preenche os campos ocultos;
 *  - pré-seleciona o nicho vindo de ?nicho= ou do clique nos cards de Nichos ("rezzu-nicho");
 *  - máscara simples de WhatsApp: (83) 99999-9999;
 *  - trava o botão no envio para evitar duplicidade.
 */
const CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
const NICHOS: Record<string, string> = { saude: "Saúde", alimentacao: "Alimentação", juridico: "Jurídico" };

function lerSessao(chave: string) {
  try {
    return sessionStorage.getItem(chave);
  } catch {
    return null;
  }
}
function gravarSessao(chave: string, valor: string) {
  try {
    sessionStorage.setItem(chave, valor);
  } catch {
    /* navegação privada: segue sem guardar */
  }
}

// origem do visitante: só a primeira chegada da sessão conta
const url = new URL(location.href);
if (!lerSessao("rezzu-origem")) {
  const origem: Record<string, string> = {};
  for (const k of CHAVES) {
    const v = url.searchParams.get(k);
    if (v) origem[k] = v.slice(0, 200);
  }
  gravarSessao("rezzu-origem", JSON.stringify(origem));
}

const form = document.querySelector<HTMLFormElement>("[data-form-diagnostico]");
if (form) {
  const origem = JSON.parse(lerSessao("rezzu-origem") || "{}") as Record<string, string>;
  form.querySelectorAll<HTMLInputElement>("[data-oculto]").forEach((campo) => {
    const nome = campo.dataset.oculto ?? "";
    campo.value = nome === "pagina" ? location.pathname : (origem[nome] ?? "");
  });

  // nicho pré-selecionado
  const nicho = url.searchParams.get("nicho") || lerSessao("rezzu-nicho") || "";
  const select = form.querySelector<HTMLSelectElement>("[data-nicho]");
  if (select && NICHOS[nicho]) select.value = NICHOS[nicho];

  // máscara do WhatsApp (só para digitar; o servidor recebe o que estiver no campo)
  const tel = form.querySelector<HTMLInputElement>("[data-whatsapp]");
  tel?.addEventListener("input", () => {
    const d = tel.value.replace(/\D/g, "").slice(0, 11);
    tel.value =
      d.length > 6
        ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
        : d.length > 2
          ? `(${d.slice(0, 2)}) ${d.slice(2)}`
          : d;
  });

  form.addEventListener("submit", () => {
    const botao = form.querySelector<HTMLButtonElement>("button[type=submit]");
    if (botao) {
      botao.disabled = true;
      botao.querySelector("span")!.textContent = "Enviando…";
    }
  });
}
