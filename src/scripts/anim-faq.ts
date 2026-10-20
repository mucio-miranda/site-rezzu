/**
 * 09 · FAQ: ao chegar na seção, o apoio e o botão sobem e as perguntas entram em sequência.
 * O título usa a animação do CabecalhoSecao. Sem JS ou com "reduzir movimento": tudo visível e parado.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-faq]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);

  gsap
    .timeline({ scrollTrigger: { trigger: raiz, start: "top 75%", toggleActions: "play none none none" } })
    .from(q("[data-faq-apoio]"), { opacity: 0, y: 14, duration: 0.6, ease: "power3.out", stagger: 0.12 }, 0.3)
    .from(
      q("[data-faq-item]"),
      { opacity: 0, y: 18, duration: 0.5, ease: "power3.out", stagger: 0.08, clearProps: "transform" },
      0.15,
    );
}
