/**
 * 03 · Depoimentos (MOTION.md §1.4): cada card entra em P&B, como a "dor" do vídeo, e acende na cor
 * conforme a história anda: antes → virada → resultado (sublinhado lima se desenha) → pessoa.
 * Desktop: os 3 entram em sequência. Celular (carrossel): cada um anima ao entrar na tela.
 * Sem JS ou com "reduzir movimento": cards já em cor e completos.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-depoimentos]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const lado = window.matchMedia("(min-width: 901px)").matches;

  raiz.querySelectorAll<HTMLElement>("[data-dep]").forEach((card, i) => {
    const q = gsap.utils.selector(card);
    const corpo = q(".dep__corpo");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 82%", once: true },
      delay: lado ? i * 0.18 : 0,
    });
    tl.from(card, { opacity: 0, y: 32, duration: 0.6, ease: "power3.out" })
      // P&B → cor (dor → solução)
      .fromTo(
        corpo,
        { filter: "grayscale(1) brightness(0.7)" },
        { filter: "grayscale(0) brightness(1)", duration: 1.2, ease: "power1.inOut", clearProps: "filter" },
        0.9,
      )
      .from(
        q("[data-dep-aspas]"),
        { opacity: 0, scale: 0.4, transformOrigin: "0% 50%", duration: 0.4, ease: "back.out(2)" },
        0.15,
      )
      .from(
        q("[data-dep-parte]"),
        { opacity: 0, y: 6, duration: 0.45, ease: "power2.out", stagger: 0.45 },
        0.3,
      )
      .from(
        q("[data-dep-resultado]"),
        { backgroundSize: "0% 2px", duration: 0.7, ease: "power2.inOut" },
        1.45,
      )
      .from(q("[data-dep-pessoa]"), { opacity: 0, x: -10, duration: 0.5, ease: "power3.out" }, 1.7);
  });
}
