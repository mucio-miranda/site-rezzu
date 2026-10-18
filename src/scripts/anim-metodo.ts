/**
 * 04 · Método (MOTION.md §3): conforme cada etapa chega ao meio da tela,
 *  - o degrau dela acende (e os anteriores ficam acesos), a etapa ganha destaque;
 *  - a bola salta em arco até o degrau, com sombra acompanhando e "amassadinha" ao pousar;
 *  - o capítulo troca em corte seco (● ETAPA ——— 0N / 05) e a linha enche junto com a rolagem;
 *  - no 5º degrau, a porta do topo acende.
 * Voltando a rolagem, tudo desfaz na ordem inversa. Sem JS ou com "reduzir movimento": estado final
 * (tudo aceso, bola no topo, porta acesa, todas as etapas legíveis).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const raiz = document.querySelector<HTMLElement>("[data-metodo]");
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (raiz && !reduzir) {
  gsap.registerPlugin(ScrollTrigger);
  const svg = raiz.querySelector<SVGSVGElement>(".esc");
  const degraus = Array.from(raiz.querySelectorAll<SVGGElement>("[data-esc-degrau]"));
  const bola = raiz.querySelector<SVGGElement>("[data-esc-bola]");
  const sombra = raiz.querySelector<SVGEllipseElement>("[data-esc-sombra]");
  const porta = raiz.querySelector<SVGGElement>("[data-esc-porta]");
  const etapas = Array.from(raiz.querySelectorAll<HTMLElement>("[data-etapa]"));
  const lista = raiz.querySelector<HTMLElement>("[data-metodo-etapas]");
  const rotulos = Array.from(raiz.querySelectorAll<HTMLElement>("[data-capitulo-rotulo]"));
  const nums = Array.from(raiz.querySelectorAll<HTMLElement>("[data-capitulo-num]"));
  const progresso = raiz.querySelector<HTMLElement>("[data-capitulo-progresso]");

  if (svg && bola && sombra && degraus.length) {
    raiz.setAttribute("data-js", "");
    svg.setAttribute("data-js", "");

    // centro da bola em cada degrau; a sombra fica 17 px abaixo (na face de cima do degrau)
    const pos = degraus.map((d) => ({ x: Number(d.dataset.cx), y: Number(d.dataset.cy) }));
    const b = { ...pos[0] };
    const corpoBola = bola.firstElementChild;
    const pousar = (x: number, y: number, chaoY: number, alturaSalto = 0) => {
      bola.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      sombra.setAttribute("cx", x.toFixed(1));
      sombra.setAttribute("cy", chaoY.toFixed(1));
      // sombra encolhe e clareia quando a bola está alta
      const k = Math.max(0.35, 1 - alturaSalto / 120);
      sombra.setAttribute("rx", (18 * k).toFixed(1));
      sombra.setAttribute("opacity", k.toFixed(2));
    };

    let atual = -1;
    let salto: gsap.core.Timeline | null = null;

    const marcar = (el: Element | undefined, attr: string, sim: boolean) => {
      if (!el) return;
      if (sim) el.setAttribute(attr, "");
      else el.removeAttribute(attr);
    };

    function irPara(i: number) {
      if (i === atual) return;
      const primeira = atual < 0;
      atual = i;

      degraus.forEach((d, k) => {
        marcar(d, "data-aceso", k <= i);
        marcar(d, "data-atual", k === i);
      });
      marcar(porta ?? undefined, "data-aceso", i === degraus.length - 1);
      etapas.forEach((e, k) => marcar(e, "data-ativa", k === i));
      // capítulo: corte seco
      rotulos.forEach((r, k) => gsap.set(r, { opacity: k === i ? 1 : 0 }));
      nums.forEach((n, k) => gsap.set(n, { opacity: k === i ? 1 : 0 }));

      const fim = pos[i];
      if (primeira) {
        gsap.set(corpoBola, { scaleX: 1, scaleY: 1 });
        Object.assign(b, fim);
        pousar(b.x, b.y, b.y + 17);
        return;
      }

      // salto em arco (bezier quadrática) do ponto atual até o degrau
      // se um salto anterior for interrompido no meio da "amassadinha", a bola volta ao tamanho exato
      salto?.kill();
      gsap.set(corpoBola, { scaleX: 1, scaleY: 1 });
      const ini = { ...b };
      const pico = Math.min(ini.y, fim.y) - 64;
      const t = { v: 0 };
      salto = gsap
        .timeline()
        .to(t, {
          v: 1,
          duration: 0.55,
          ease: "power1.inOut",
          onUpdate: () => {
            const u = t.v;
            b.x = ini.x + (fim.x - ini.x) * u;
            b.y = (1 - u) * (1 - u) * ini.y + 2 * (1 - u) * u * pico + u * u * fim.y;
            const chao = ini.y + (fim.y - ini.y) * u + 17;
            pousar(b.x, b.y, chao, chao - 17 - b.y);
          },
        })
        // amassadinha ao pousar; termina sempre em escala 1 (mesma altura e largura em todo degrau)
        .to(corpoBola, {
          scaleY: 0.82,
          scaleX: 1.12,
          transformOrigin: "50% 100%",
          duration: 0.08,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        })
        .set(corpoBola, { scaleX: 1, scaleY: 1 });
    }

    irPara(0);

    // etapa que cruza o meio da tela vira a atual
    etapas.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (st) => {
          if (st.isActive) irPara(i);
        },
      });
    });
    // linha do capítulo acompanha a rolagem da lista
    if (lista && progresso) {
      gsap.set(progresso, { scaleX: 0 });
      ScrollTrigger.create({
        trigger: lista,
        start: "top 55%",
        end: "bottom 55%",
        onUpdate: (st) => gsap.set(progresso, { scaleX: st.progress }),
      });
    }

    // entrada do palco
    gsap.from(svg, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: raiz, start: "top 70%", once: true },
    });
  }
}
