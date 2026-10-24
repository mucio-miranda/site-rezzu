/**
 * 07 · CTA (ARQUITETURA.md §6): ao chegar na seção, o texto e o formulário entram e o botão pulsa uma vez;
 * a porta de luz (abaixo deles) acende (escuro → luz) quando ela própria aparece. A poeira de luz é CSS (some com "reduzir movimento").
 * Sem JS ou com "reduzir movimento": tudo visível e parado.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-cta]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);
  gsap
    .timeline({ scrollTrigger: { trigger: raiz, start: "top 75%", toggleActions: "play none none none" } })
    .from(q("[data-cta-entra]"), { opacity: 0, y: 22, duration: 0.6, ease: "power3.out", stagger: 0.1 }, 0.1)
    .fromTo(
      q("[data-cta-botao]"),
      { boxShadow: "0 0 0 0 rgba(168,204,21,0.6)" },
      {
        boxShadow: "0 0 0 18px rgba(168,204,21,0)",
        duration: 1.1,
        ease: "power2.out",
        clearProps: "boxShadow",
      },
      1.1,
    );

  gsap.from(q("[data-cta-portal]"), {
    filter: "brightness(0.15)",
    scale: 1.06,
    duration: 1.4,
    ease: "power2.out",
    clearProps: "filter",
    scrollTrigger: { trigger: q("[data-cta-visual]")[0], start: "top 80%", toggleActions: "play none none none" },
  });
}
