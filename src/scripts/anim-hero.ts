/**
 * Hero (MOTION.md §1.2): tipografia cinética da tese + foto dos fundadores (V2: o palco foi para o Sobre).
 *
 * Entrada (~3 s):
 *  0.0  piso de grade + sobretítulo
 *  0.2  conectivo entra palavra a palavra, em corte seco (como a legenda do vídeo)
 *  0.3  a foto sai do escuro; o Z de meio-tom e o facho de luz da esquerda se abrem
 *  0.9  "PRECISA:" → "POSICIONAMENTO" com pop
 *  2.1  "E FATURAMENTO." → apoio e botão
 * Contínuo: a luz "respira" (pausa fora da tela) e a foto tem parallax leve ao rolar.
 *
 * Sem JS, com "reduzir movimento" ou em falha: tudo montado e parado (ver .anim-espera no Base.astro).
 * Celular/tablet (até 900 px): sem motion; o texto e a foto aparecem prontos.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-hero]");
const html = document.documentElement;
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// celular/tablet: hero sem motion (o texto e a foto aparecem prontos)
const celular = window.matchMedia("(max-width: 900px)").matches;
const liberar = () => html.classList.remove("anim-espera");

// tokens de motion (MOTION.md §2.1)
const POP = { duration: 0.35, ease: "back.out(1.6)" };
const ENTRA = { duration: 0.6, ease: "power3.out" };

if (!raiz || reduzir || celular) {
  liberar();
} else {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);

  // ---------- entrada ----------
  const entrada = gsap.timeline();
  entrada
    .fromTo(
      q("[data-hero-piso]"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      0,
    )
    // foto: sai do escuro; o Z de meio-tom e o facho de luz se abrem
    .fromTo(
      q("[data-hero-img]"),
      { opacity: 0, y: 30, filter: "brightness(0.4)" },
      { opacity: 1, y: 0, filter: "brightness(1)", duration: 1, ease: "power2.out", clearProps: "filter" },
      0.3,
    )
    .fromTo(
      q("[data-hero-fundo]"),
      { opacity: 0, scale: 1.08 },
      { opacity: 0.2, scale: 1, duration: 1.6, ease: "power2.out" },
      0.4,
    )
    .fromTo(
      q("[data-hero-luz]"),
      { opacity: 0, scaleX: 0.4 },
      { opacity: 1, scaleX: 1, duration: 1.4, ease: "power2.out" },
      0.45,
    )
    .fromTo(q("[data-hero-fade]").slice(0, 1), { opacity: 0, y: 12 }, { opacity: 1, y: 0, ...ENTRA }, 0.05)
    // corte seco, palavra a palavra
    .fromTo(
      q("[data-hero-batida]").slice(0, -1),
      { opacity: 0 },
      { opacity: 1, duration: 0.01, stagger: 0.07 },
      0.2,
    )
    // tese: impacto → sentido
    .fromTo(q("[data-hero-pop]")[0], { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, ...POP }, 0.9)
    .fromTo(
      q("[data-hero-pop]")[1],
      { opacity: 0, scale: 0.88, y: 8 },
      { opacity: 1, scale: 1, y: 0, ...POP, duration: 0.45 },
      1.05,
    )
    // "e faturamento." + apoio e botões
    .fromTo(q("[data-hero-batida]").slice(-1), { opacity: 0 }, { opacity: 1, duration: 0.01 }, 2.1)
    .fromTo(
      q("[data-hero-pop]")[2],
      { opacity: 0, scale: 0.88, y: 8 },
      { opacity: 1, scale: 1, y: 0, ...POP, duration: 0.45 },
      2.2,
    )
    .fromTo(
      q("[data-hero-fade]").slice(1),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, ...ENTRA, stagger: 0.12 },
      2.4,
    );
  liberar();

  // parallax: a foto desce um pouco mais devagar que a página rola
  gsap.to(q("[data-hero-foto]"), {
    y: 60,
    ease: "none",
    scrollTrigger: { trigger: raiz, start: "top top", end: "bottom top", scrub: true },
  });

  // a luz respira devagar (pausa fora da tela)
  const respira = gsap.to(q("[data-hero-luz]"), {
    opacity: 0.7,
    scaleX: 0.92,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2,
  });
  ScrollTrigger.create({
    trigger: raiz,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => (st.isActive ? respira.resume() : respira.pause()),
  });
}
