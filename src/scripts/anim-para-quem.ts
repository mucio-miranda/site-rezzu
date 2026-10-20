/**
 * 08 · Para quem é: ao chegar na seção, o apoio sobe e os itens entram um a um; o check de cada item se desenha.
 * O título usa a animação do CabecalhoSecao. Sem JS ou com "reduzir movimento": tudo visível e parado.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-para-quem]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);
  const tracos = Array.from(raiz.querySelectorAll<SVGPathElement>("[data-pq-traco]"));
  tracos.forEach((t) => gsap.set(t, { strokeDasharray: t.getTotalLength() }));

  gsap
    .timeline({ scrollTrigger: { trigger: raiz, start: "top 75%", toggleActions: "play none none none" } })
    .from(q("[data-pq-apoio]"), { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" }, 0.3)
    .from(q("[data-pq-item]"), { opacity: 0, x: 24, duration: 0.55, ease: "power3.out", stagger: 0.1 }, 0.15)
    .from(
      tracos,
      { strokeDashoffset: (_, t: SVGPathElement) => t.getTotalLength(), duration: 0.4, ease: "power2.out", stagger: 0.1 },
      0.45,
    );
}
