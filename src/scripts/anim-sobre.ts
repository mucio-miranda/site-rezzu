/**
 * 05 · Sobre (ARQUITETURA.md §6): ao chegar na seção,
 *  - a foto sai do escuro (brilho baixo → normal) enquanto o facho de luz da esquerda se abre;
 *  - os parágrafos entram do desfoque para a nitidez; os fatos sobem um a um.
 * Contínuo: parallax leve (a foto anda mais devagar que o texto) e a luz "respira".
 * O título usa a animação do CabecalhoSecao. Sem JS ou com "reduzir movimento": tudo visível e parado.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-sobre]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);

  const entrada = gsap.timeline({ scrollTrigger: { trigger: raiz, start: "top 72%", once: true } });
  entrada
    .from(
      q("[data-sobre-img]"),
      {
        opacity: 0,
        y: 30,
        filter: "brightness(0.15)",
        duration: 1.2,
        ease: "power2.out",
        clearProps: "filter",
      },
      0,
    )
    .from(q("[data-sobre-fundo]"), { opacity: 0, scale: 1.08, duration: 1.6, ease: "power2.out" }, 0.1)
    .from(q("[data-sobre-luz]"), { opacity: 0, scaleX: 0.4, duration: 1.4, ease: "power2.out" }, 0.25)
    .from(
      q("[data-sobre-p]"),
      {
        opacity: 0,
        y: 12,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.18,
        clearProps: "filter",
      },
      0.6,
    )
    .from(
      q("[data-sobre-fato]"),
      { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", stagger: 0.12 },
      1.0,
    );

  // parallax: a foto sobe menos que a página rola
  gsap.fromTo(
    q("[data-sobre-foto]"),
    { y: 40 },
    {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: raiz, start: "top bottom", end: "bottom top", scrub: true },
    },
  );

  // a luz respira devagar (pausa fora da tela)
  const respira = gsap.to(q("[data-sobre-luz]"), {
    opacity: 0.7,
    scaleX: 0.92,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1.8,
  });
  ScrollTrigger.create({
    trigger: raiz,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => (st.isActive ? respira.resume() : respira.pause()),
  });
}
