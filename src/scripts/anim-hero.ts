/**
 * Hero (MOTION.md §1.2–1.3): tipografia cinética da tese + palco com os 2 capítulos do vídeo se alternando.
 *
 * Entrada (~3 s):
 *  0.0  piso de grade + sobretítulo
 *  0.2  conectivo entra palavra a palavra, em corte seco (como a legenda do vídeo)
 *  0.3  capítulo 01: celular se desenha, perfil e feed se montam, radar, pílulas, pin e ícones
 *  0.9  "PRECISA:" → "POSICIONAMENTO" com pop
 *  2.1  "E FATURAMENTO." → apoio e botões
 * Depois, em ciclo (pausa fora da tela): espera → clarão → capítulo 02 (barras sobem, seta se desenha,
 * testes validam, moedas caem na carteira) → espera → clarão → capítulo 01 de novo…
 * Contínuo: ícones orbitam o radar e o anel tracejado gira devagar.
 *
 * Sem JS, com "reduzir movimento" ou em falha: capítulo 01 montado e parado (ver .anim-espera no Base.astro).
 * Celular/tablet (até 900 px): sem motion; o palco some e entra o vídeo institucional (Hero.astro).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-hero]");
const html = document.documentElement;
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// celular/tablet: hero sem motion (o palco dá lugar ao vídeo institucional; o texto aparece pronto)
const celular = window.matchMedia("(max-width: 900px)").matches;
const liberar = () => html.classList.remove("anim-espera");

// tokens de motion (MOTION.md §2.1)
const POP = { duration: 0.35, ease: "back.out(1.6)" };
const ENTRA = { duration: 0.6, ease: "power3.out" };
const DESENHA = { duration: 0.9, ease: "power2.inOut" };
const CRESCE = { duration: 0.7, ease: "back.out(1.2)" };
const ESPERA = 3.4; // tempo de cada capítulo montado na tela
const ORBITA = { cx: 320, cy: 320, r: 244, volta: 36 }; // igual à CenaPosicionamento; volta em segundos

/** prepara um contorno SVG para "se desenhar": devolve o comprimento para usar em strokeDashoffset */
function tracejar(el: SVGGeometryElement | undefined) {
  if (!el) return 0;
  const L = el.getTotalLength();
  gsap.set(el, { strokeDasharray: L });
  return L;
}

if (!raiz || reduzir || celular) {
  liberar();
} else {
  gsap.registerPlugin(ScrollTrigger);
  const q = gsap.utils.selector(raiz);
  const c1 = (nome: string) => q(`[data-cap="0"] [data-cena="${nome}"]`);
  const c2 = (nome: string) => q(`[data-cap="1"] [data-fat="${nome}"]`);

  const cenas = [q('[data-cap="0"]')[0], q('[data-cap="1"]')[0]];
  const clarao = q("[data-palco-clarao]");

  const geo = (sel: string) => raiz.querySelector<SVGGeometryElement>(sel) ?? undefined;
  const celular = geo('[data-cap="0"] [data-cena="celular"]');
  const radar = geo('[data-cap="0"] [data-cena="radar"]');
  const seta = geo('[data-cap="1"] [data-fat="seta"]');
  const Lcelular = tracejar(celular);
  const Lradar = tracejar(radar);
  const Lseta = tracejar(seta);

  /** capítulo 01: o celular e o perfil se montando (offsets relativos a t) */
  function montarPosicionamento(tl: gsap.core.Timeline, t: number) {
    tl.from(celular ?? [], { strokeDashoffset: Lcelular, ...DESENHA, duration: 1.1 }, t)
      .from(celular ?? [], { fillOpacity: 0, duration: 0.6 }, t + 0.6)
      .from(
        q('[data-cap="0"] [data-cena="perfil"] > *'),
        { opacity: 0, scale: 0, transformOrigin: "0% 50%", ...POP, stagger: 0.08 },
        t + 0.7,
      )
      .from(c1("stats"), { opacity: 0, duration: 0.3 }, t + 0.9)
      .from(
        c1("celula"),
        {
          opacity: 0,
          scale: 0.2,
          transformOrigin: "50% 50%",
          ...POP,
          stagger: { each: 0.07, from: "random" },
        },
        t + 0.85,
      )
      .from(c1("post"), { opacity: 0, duration: 0.4 }, t + 1.4)
      .from(radar ?? [], { strokeDashoffset: Lradar, ...DESENHA }, t + 1.25)
      .from(c1("radar-anel"), { opacity: 0, duration: 0.8, ease: "power2.out" }, t + 1.3)
      .from(c1("mira"), { opacity: 0, scale: 1.15, svgOrigin: "320 320", duration: 0.5 }, t + 1.4)
      .from(
        c1("pilula"),
        { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", ...POP, stagger: 0.14 },
        t + 1.5,
      )
      .from(c1("pin"), { opacity: 0, y: -70, duration: 0.55, ease: "bounce.out" }, t + 1.65)
      .from(
        c1("pin-onda"),
        { opacity: 0, scale: 0.2, transformOrigin: "50% 50%", duration: 0.6, ease: "power2.out" },
        t + 2.05,
      )
      .from(
        c1("icone"),
        { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", ...POP, stagger: 0.1 },
        t + 1.75,
      );
  }

  /** capítulo 02: barras sobem, seta se desenha, testes validam, moedas caem na carteira */
  function montarFaturamento(tl: gsap.core.Timeline, t: number) {
    tl.from(c2("chao"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5, ease: "power2.out" }, t)
      .from(c2("barra"), { scaleY: 0, transformOrigin: "50% 100%", ...CRESCE, stagger: 0.12 }, t + 0.15)
      .from(c2("teste"), { opacity: 0, scale: 0.6, transformOrigin: "0% 50%", ...POP, stagger: 0.1 }, t + 0.2)
      .from(seta ?? [], { strokeDashoffset: Lseta, ...DESENHA }, t + 0.85)
      .from(c2("seta-ponta"), { opacity: 0, scale: 0, transformOrigin: "50% 50%", ...POP }, t + 1.7)
      .from(c2("pilula"), { opacity: 0, scale: 0.6, transformOrigin: "0% 50%", ...POP }, t + 1.85)
      // vazia (contorno) → validada (lima + ✔)
      .from(
        c2("teste-ok"),
        {
          opacity: 0,
          scale: 0.9,
          transformOrigin: "50% 50%",
          duration: 0.3,
          ease: "back.out(2)",
          stagger: 0.28,
        },
        t + 1.0,
      )
      .from(c2("carteira"), { opacity: 0, y: 24, ...ENTRA }, t + 1.4)
      .from(c2("moeda"), { opacity: 0, y: -130, duration: 0.5, ease: "power2.in", stagger: 0.2 }, t + 1.8);
    // a carteira "engole" cada moeda
    c2("moeda").forEach((_, i) => {
      tl.to(
        c2("carteira"),
        { scale: 1.06, transformOrigin: "50% 60%", duration: 0.08, yoyo: true, repeat: 1 },
        t + 2.28 + i * 0.2,
      );
    });
    tl.from(
      c2("brilho"),
      { opacity: 0, scale: 0, rotation: -90, transformOrigin: "50% 50%", ...POP, stagger: 0.12 },
      t + 2.6,
    );
  }

  // ---------- entrada ----------
  const entrada = gsap.timeline();
  entrada
    .set(q("[data-hero-cena]"), { opacity: 1 }, 0)
    .fromTo(
      q("[data-hero-piso]"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      0,
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
  montarPosicionamento(entrada, 0.3);
  liberar();

  // ---------- ciclo de capítulos ----------
  let atual: gsap.core.Animation | null = null;
  let naTela = true;

  function agendar(proximo: number) {
    atual = gsap.delayedCall(ESPERA, () => irPara(proximo));
    if (!naTela) atual.pause();
  }

  function irPara(n: number) {
    const sai = 1 - n;
    const tl = gsap.timeline({ onComplete: () => agendar(sai) });
    // clarão (film burn do vídeo) e corte seco no meio dele
    tl.fromTo(clarao, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "power1.in" }, 0)
      .set(cenas[sai], { autoAlpha: 0 }, 0.1)
      .set(cenas[n], { autoAlpha: 1 }, 0.1)
      .to(clarao, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.1);
    (n === 0 ? montarPosicionamento : montarFaturamento)(tl, 0.12);
    atual = tl;
  }

  entrada.eventCallback("onComplete", () => agendar(1));

  // ---------- contínuo: órbita dos ícones e anel girando ----------
  const orbitas = c1("orbita").map((el) => ({ el, base: Number(el.getAttribute("data-angulo")) || 0 }));
  const giro = { a: 0 };
  const orbita = gsap.to(giro, {
    a: 360,
    duration: ORBITA.volta,
    ease: "none",
    repeat: -1,
    onUpdate: () => {
      for (const { el, base } of orbitas) {
        const rad = ((base + giro.a) * Math.PI) / 180;
        const x = ORBITA.cx + ORBITA.r * Math.cos(rad) - 22;
        const y = ORBITA.cy + ORBITA.r * Math.sin(rad) - 22;
        el.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      }
    },
  });
  const anel = gsap.to(c1("radar-anel"), {
    rotation: -360,
    svgOrigin: "320 320",
    duration: 60,
    ease: "none",
    repeat: -1,
  });

  // pausa tudo que é contínuo quando a hero sai da tela
  ScrollTrigger.create({
    trigger: raiz,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => {
      naTela = st.isActive;
      for (const a of [orbita, anel, atual]) {
        if (!a) continue;
        if (naTela) a.resume();
        else a.pause();
      }
    },
  });
}
