/**
 * Cabeçalhos de seção (CabecalhoSecao.astro): ao rolar até cada um, o sobretítulo sobe,
 * as palavras entram em corte seco (como a legenda do vídeo) e a palavra de sentido entra com pop.
 * Sem JS ou com "reduzir movimento": o título aparece pronto.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cabecalhos = document.querySelectorAll<HTMLElement>("[data-cabecalho]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cabecalhos.length && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  cabecalhos.forEach((cab) => {
    const q = gsap.utils.selector(cab);
    gsap
      .timeline({ scrollTrigger: { trigger: cab, start: "top 80%", once: true } })
      .from(q("[data-cab-fade]"), { opacity: 0, y: 12, duration: 0.6, ease: "power3.out" })
      .from(q("[data-cab-batida]"), { opacity: 0, duration: 0.01, stagger: 0.08 }, 0.15)
      .from(
        q("[data-cab-pop]"),
        { opacity: 0, scale: 0.88, y: 8, transformOrigin: "0% 70%", duration: 0.45, ease: "back.out(1.6)" },
        ">0.05",
      );
  });
}
