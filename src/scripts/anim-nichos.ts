/**
 * 06 · Nichos: cards entram em sequência ao rolar (o ícone sobe do escuro com o feixe de luz).
 * Clique: guarda o nicho escolhido para o formulário do diagnóstico ("rezzu-nicho" no sessionStorage).
 * Sem JS ou com "reduzir movimento": tudo visível e parado.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-nichos]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz) {
  raiz.querySelectorAll<HTMLAnchorElement>("a[data-nicho]").forEach((a) =>
    a.addEventListener("click", () => {
      try {
        sessionStorage.setItem("rezzu-nicho", a.dataset.nicho ?? "");
      } catch {
        /* navegação privada: segue sem guardar */
      }
    }),
  );
}

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const lado = window.matchMedia("(min-width: 901px)").matches;
  raiz.querySelectorAll<HTMLElement>("[data-nicho-card]").forEach((card, i) => {
    const q = gsap.utils.selector(card);
    gsap
      .timeline({
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
        delay: lado ? i * 0.14 : 0,
      })
      .from(card, { opacity: 0, y: 28, duration: 0.55, ease: "power3.out", clearProps: "opacity" })
      .from(
        q("img"),
        { y: 18, filter: "brightness(0.2)", duration: 0.8, ease: "power2.out", clearProps: "filter" },
        0.1,
      );
  });
}
