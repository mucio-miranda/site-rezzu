/**
 * 02 · Resultados (MOTION.md §2–3), acionada pelo scroll, sem fixar a seção.
 *  título: palavras em corte seco → "NÚMERO." com pop
 *  cada card (ao entrar): sobe, a linha do capítulo enche, a mini cena se monta e o número conta de 0 até o valor
 *  contínuo (só com a seção na tela): pulso no último marco, brilhos das moedas, ondas e partículas do play
 * Sem JS ou com "reduzir movimento": tudo aparece montado, com o valor final (que já está no HTML).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-resultados]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// tokens de motion (MOTION.md §2.1)
const POP = { duration: 0.35, ease: "back.out(1.6)" };
const ENTRA = { duration: 0.6, ease: "power3.out" };
const DESENHA = { duration: 0.9, ease: "power2.inOut" };

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);
  const loops: gsap.core.Animation[] = [];
  let naTela = false;
  const ligar = (a: gsap.core.Animation) => {
    loops.push(a);
    if (!naTela) a.pause();
  };

  // ---------- título ----------
  gsap
    .timeline({ scrollTrigger: { trigger: raiz, start: "top 75%", once: true } })
    .from(q("[data-res-fade]"), { opacity: 0, y: 12, ...ENTRA })
    .from(q("[data-res-batida]"), { opacity: 0, duration: 0.01, stagger: 0.08 }, 0.15)
    .from(
      q("[data-res-pop]"),
      { opacity: 0, scale: 0.88, y: 8, transformOrigin: "0% 70%", ...POP, duration: 0.45 },
      ">0.05",
    );

  // ---------- mini cenas ----------
  function montarCena(svg: Element, tl: gsap.core.Timeline, t: number) {
    const m = (nome: string) => Array.from(svg.querySelectorAll(`[data-mc="${nome}"]`));
    const tipo = svg.getAttribute("data-mc-tipo");

    if (tipo === "tempo") {
      const curva = m("curva")[0] as SVGGeometryElement | undefined;
      const L = curva?.getTotalLength() ?? 0;
      if (curva) gsap.set(curva, { strokeDasharray: L });
      tl.from(m("linha"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5, ease: "power2.out" }, t)
        .from(
          m("marco"),
          { scaleY: 0, opacity: 0, transformOrigin: "50% 100%", ...POP, stagger: 0.1 },
          t + 0.15,
        )
        .from(curva ?? [], { strokeDashoffset: L, ...DESENHA }, t + 0.5)
        .from(m("pulso"), { opacity: 0, duration: 0.2 }, t + 1.3);
      return () =>
        gsap.fromTo(
          m("pulso"),
          { scale: 1, opacity: 0.9 },
          {
            scale: 2.6,
            opacity: 0,
            transformOrigin: "50% 50%",
            duration: 1.6,
            ease: "power2.out",
            repeat: -1,
          },
        );
    }

    if (tipo === "moedas") {
      tl.from(m("moeda"), { opacity: 0, y: -40, duration: 0.45, ease: "bounce.out", stagger: 0.07 }, t).from(
        m("brilho"),
        { opacity: 0, scale: 0, rotation: -90, transformOrigin: "50% 50%", ...POP, stagger: 0.12 },
        t + 1.0,
      );
      return () =>
        gsap.to(m("brilho"), {
          scale: 0.55,
          opacity: 0.5,
          transformOrigin: "50% 50%",
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        });
    }

    // views
    tl.from(m("play"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", ...POP, duration: 0.5 }, t).from(
      m("particula"),
      { opacity: 0, scale: 0, transformOrigin: "50% 50%", ...POP, stagger: 0.1 },
      t + 0.35,
    );
    return () => {
      const tl2 = gsap.timeline({ repeat: -1 });
      tl2.fromTo(
        m("onda"),
        { scale: 1, opacity: 0.7 },
        {
          scale: 2.3,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 2.4,
          ease: "power1.out",
          stagger: 0.8,
        },
        0,
      );
      tl2.fromTo(
        m("particula"),
        { y: 0, opacity: 1 },
        { y: -26, opacity: 0, duration: 1.6, ease: "power1.out", stagger: { each: 0.5, repeat: -1 } },
        0,
      );
      return tl2;
    };
  }

  // ---------- cards ----------
  q("[data-res-card]").forEach((card, i) => {
    const valorEl = card.querySelector<HTMLElement>("[data-res-valor]");
    const valor = Number(valorEl?.dataset.resValor) || 0;
    const svg = card.querySelector("[data-mc-tipo]");
    const contador = { v: 0 };

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 85%", once: true },
      delay: i * 0.12, // os 3 lado a lado entram em sequência
    });
    tl.from(card, { opacity: 0, y: 32, ...ENTRA })
      .from(
        card.querySelector("[data-res-progresso]"),
        { scaleX: 0, duration: 1.4, ease: "power1.inOut" },
        0.1,
      )
      .fromTo(
        contador,
        { v: 0 },
        {
          v: valor,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (valorEl) valorEl.textContent = String(Math.round(contador.v));
          },
        },
        0.25,
      );
    if (svg) {
      const loop = montarCena(svg, tl, 0.2);
      tl.eventCallback("onComplete", () => ligar(loop()));
    }
  });

  // pausa o que é contínuo quando a seção sai da tela
  ScrollTrigger.create({
    trigger: raiz,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => {
      naTela = st.isActive;
      for (const a of loops) {
        if (naTela) a.resume();
        else a.pause();
      }
    },
  });
}
