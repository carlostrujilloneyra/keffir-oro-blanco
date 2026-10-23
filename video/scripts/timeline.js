      const tl = gsap.timeline({ paused: true });
      /* Sistema de movimiento (sin frames vacíos: el producto sale hasta 40 % y entra desde 60 %, así cada corte
         pasa de producto a producto): entradas 500–700 ms con expo.out (≈ cubic-bezier(0.16, 1, 0.3, 1)),
         salidas 250–350 ms con power2.in, botellas con un rebote leve (back.out), stagger 60–80 ms. */
      const IN = 'expo.out';
      const OUTE = 'power2.in';
      const SPRING = 'back.out(1.5)';
      const BEAT = 0.5714;
      const MIEL = '#F2B705';
      const F = 1 / 30;
      const $$ = (sel) => gsap.utils.toArray(sel);

      // Ola dentro del texto "KÉFIR": polígono ondulado que sube como líquido.
      function wavePolygon(level, phase) {
        const pts = [];
        for (let i = 0; i <= 16; i++) {
          const x = (i / 16) * 100;
          const y = level + 5 * Math.sin((i / 16) * Math.PI * 3 + phase);
          pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
        }
        return `polygon(${pts.join(', ')}, 100% 110%, 0% 110%)`;
      }

      const H = {
        fade(a) {
          if (document.querySelector(a.sel)) tl.fromTo(a.sel, { opacity: 1 }, { opacity: 0, duration: a.dur, ease: OUTE, immediateRender: false }, a.at);
        },
        exit: (a) => tl.fromTo(a.sel, { scale: 1, opacity: 1 }, { scale: 1.05, opacity: 0.4, duration: a.dur, ease: OUTE, immediateRender: false }, a.at),
        fadeQuick: (a) => tl.fromTo(a.sel, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: OUTE, immediateRender: false }, a.at),
        rise: (a) => tl.fromTo(a.sel, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: a.dur || 0.6, ease: IN }, a.at),
        words: (a) => tl.fromTo(a.sel, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: IN, stagger: 0.07 }, a.at),
        brandIn: (a) => tl.fromTo(a.sel, { y: 30, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: IN }, a.at),
        pop: (a) => tl.fromTo(a.sel, { scale: 0.6, y: 10, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, a.at),
        bottle: (a) => tl.fromTo(a.sel, { y: 60, scale: 0.9, opacity: 0.6 }, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: SPRING, stagger: a.stagger || 0 }, a.at),
        archIn: (a) => tl.fromTo(a.sel, { scaleY: 0.85, opacity: 0, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: 0.6, ease: IN }, a.at),
        float(a) {
          const half = 0.7;
          const n = Math.max(0, Math.floor((a.end - a.at) / half) - 1);
          tl.fromTo(a.sel, { y: 0 }, { y: -3, duration: half, ease: 'sine.inOut', yoyo: true, repeat: n }, a.at);
        },
        // Zoom lento tipo cámara lenta + parallax: fondo, producto y texto a velocidades distintas.
        zoom: (a) => tl.fromTo(a.sel, { scale: a.from }, { scale: a.to, duration: a.dur, ease: 'none' }, a.at),
        slowZoom: (a) => tl.fromTo(a.sel, { scale: 1 }, { scale: a.to, duration: a.dur, ease: 'none' }, a.at),
        parallax: (a) => tl.fromTo(a.sel, { scale: 1 }, { scale: a.to, duration: a.dur, ease: 'none' }, a.at),
        drift: (a) => tl.fromTo(a.sel, { y: 0 }, { y: a.y, duration: a.dur, ease: 'none' }, a.at),
        // Cinta negra: se despliega desde la izquierda con la punta al frente.
        ribbon: (a) => tl.fromTo(a.sel, { xPercent: -105 }, { xPercent: 0, duration: 0.6, ease: IN }, a.at),
        // Brillo especular: una franja de luz recorre la botella una vez.
        shine: (a) => tl.fromTo(a.sel, { backgroundPosition: '100% 0%' }, { backgroundPosition: '0% 0%', duration: 0.9, ease: 'power2.inOut' }, a.at),
        splash(a) {
          tl.fromTo(a.sel, { rotation: -25, scale: 0.6, opacity: 0, transformOrigin: '30% 60%' }, { rotation: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)' }, a.at);
          tl.to(a.sel, { rotation: 3, duration: Math.max(0.2, a.end - a.at - 0.7), ease: 'sine.inOut' }, a.at + 0.7);
        },
        burst: (a) => tl.fromTo(a.sel, { scale: 0.6, rotation: a.rot, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' }, a.at),
        // Frutas que llegan volando y se ordenan alrededor de la botella.
        flyIn: (a) => tl.fromTo(a.sel, { x: a.fx, y: a.fy, rotation: a.rot, scale: 0.7, opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(1.6)' }, a.at),
        // KÉFIR: contorno primero y luego se "llena de líquido" con una máscara ondulada.
        outlineIn: (a) => tl.fromTo(a.sel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, a.at),
        liquid(a) {
          const el = document.querySelector(a.sel);
          const o = { p: 0 };
          tl.set(el, { clipPath: wavePolygon(110, 0) }, 0);
          tl.fromTo(o, { p: 0 }, { p: 1, duration: a.dur, ease: 'power2.out', onUpdate: () => { el.style.clipPath = wavePolygon(110 - o.p * 125, o.p * Math.PI * 4); } }, a.at);
        },
        // Palabra clave que se ilumina cuando la voz la dice.
        glow(a) {
          tl.to(a.sel, { color: a.color || MIEL, scale: 1.08, textShadow: `0 0 18px ${a.color ? 'rgba(47,125,82,0.45)' : 'rgba(242,183,5,0.85)'}`, duration: 0.25, ease: 'power2.out' }, a.at);
          tl.to(a.sel, { scale: 1, textShadow: '0 0 0px rgba(242,183,5,0)', duration: 0.45, ease: 'power2.inOut' }, a.at + 0.35);
        },
        // Vaca o cabra: cada botella entra desde su lado y se encuentran con el splash de leche.
        sideIn: (a) => tl.fromTo(a.sel, { x: a.fx }, { x: 0, duration: 0.55, ease: 'back.out(1.3)' }, a.at),
        meet(a) {
          tl.fromTo(a.sel, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.3, ease: IN }, a.at);
          tl.set(a.hide, { opacity: 0 }, a.at + 0.3);
        },
        // Primera vez: el shot se llena hasta la marca de 30 ml; cada paso con un check dibujado.
        fillShot: (a) => tl.fromTo(a.sel, { attr: { y: 250 } }, { attr: { y: 90 }, duration: 0.9, ease: 'power2.out' }, a.at),
        step: (a) => tl.fromTo(a.sel, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: IN }, a.at),
        check: (a) => tl.fromTo(a.sel, { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, a.at),
        // Frutados: la botella queda en su sitio y cambia de sabor con un fundido.
        xfadeIn: (a) => tl.fromTo(a.sel, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.35, ease: IN }, a.at),
        fadeIn: (a) => tl.fromTo(a.sel, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: IN }, a.at),
        xfadeOut: (a) => tl.fromTo(a.sel, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: 'none', immediateRender: false }, a.at),
        setVar: (a) => tl.set(a.sel, a.vars, a.at),
        // Corte seco (sin fundido): aparece o desaparece en un frame.
        show: (a) => tl.fromTo(a.sel, { opacity: 0 }, { opacity: 1, duration: 0.005, ease: 'none' }, a.at),
        hide: (a) => tl.fromTo(a.sel, { opacity: 1 }, { opacity: 0, duration: 0.005, ease: 'none', immediateRender: false }, a.at),
        // Teaser: destello blanco breve (0.18 s) y las siluetas pasan a color.
        flash(a) {
          tl.fromTo(a.sel, { opacity: 0 }, { opacity: 0.85, duration: 0.06, ease: 'power2.out' }, a.at);
          tl.to(a.sel, { opacity: 0, duration: 0.12, ease: 'power2.in' }, a.at + 0.06);
        },
        colorize: (a) => tl.fromTo(a.sel, { filter: 'brightness(0) drop-shadow(0px 0px 6px rgba(255,214,240,0.7))' }, { filter: 'brightness(1) drop-shadow(0px 0px 0px rgba(255,214,240,0))', duration: 0.25, ease: 'power2.out' }, a.at),
        // Pitahaya: llega inclinada y gira hasta quedar vertical.
        tiltIn: (a) => tl.fromTo(a.sel, { rotation: 0, y: 40, opacity: 0.6 }, { rotation: a.rot, y: 0, opacity: 1, duration: 0.45, ease: IN }, a.at),
        // Cinta que cambia de texto en su sitio: el texto sale hacia arriba y el nuevo entra desde abajo.
        swapIn: (a) => tl.fromTo(a.sel, { yPercent: a.first ? 0 : 110, opacity: a.first ? 1 : 0 }, { yPercent: 0, opacity: 1, duration: a.first ? 0.01 : 0.5, ease: IN }, a.at),
        swapOut: (a) => tl.fromTo(a.sel, { yPercent: 0 }, { yPercent: -110, duration: 0.3, ease: OUTE, immediateRender: false }, a.at),
        // Cinta "SABOR": sticker girado + pincelada que se pinta de izquierda a derecha.
        sabor(a) {
          tl.fromTo(a.sel + ' .sabor-tag', { rotation: -28, scale: 0.4, opacity: 0 }, { rotation: -8, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, a.at);
          tl.fromTo(a.sel + ' .brush path', { strokeDashoffset: 620 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, a.at + 0.1);
          tl.fromTo(a.sel + ' .sabor-name > span', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: IN }, a.at + 0.25);
        },
        // Kombuchas: la tapa salta, la cámara tiembla 2 frames y suben burbujas.
        capPop: (a) => tl.fromTo(a.sel, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 70, y: -480, rotation: 220, opacity: 0, duration: 0.6, ease: 'power2.out' }, a.at),
        shake(a) {
          tl.fromTo(a.sel, { x: 0, y: 0 }, { x: 10, y: -6, duration: F, ease: 'none' }, a.at);
          tl.to(a.sel, { x: -8, y: 5, duration: F, ease: 'none' }, a.at + F);
          tl.to(a.sel, { x: 0, y: 0, duration: F, ease: 'none' }, a.at + 2 * F);
        },
        bubbles(a) {
          const els = $$(a.sel);
          const span = Math.max(0.2, a.end - a.at - 1.4);
          els.forEach((el, i) => {
            const at = a.at + (i / els.length) * span;
            tl.fromTo(el, { y: 0, scale: 0.6 }, { y: -520, scale: 1, duration: 1.4, ease: 'power1.out' }, at);
            tl.fromTo(el, { opacity: 0 }, { opacity: 0.85, duration: 0.3, ease: 'none' }, at);
            tl.fromTo(el, { opacity: 0.85 }, { opacity: 0, duration: 0.3, ease: 'none', immediateRender: false }, at + 1.1);
          });
        },
        drop(a) {
          tl.fromTo(a.sel, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: 'none' }, a.at);
          tl.fromTo(a.sel, { x: 0, scale: 0.5 }, { x: a.dx, scale: 1, duration: a.dur, ease: 'none' }, a.at);
          tl.fromTo(a.sel, { y: 0 }, { y: -a.up, duration: a.dur * 0.35, ease: 'power2.out' }, a.at);
          tl.fromTo(a.sel, { y: -a.up }, { y: a.fall, duration: a.dur * 0.65, ease: 'power2.in', immediateRender: false }, a.at + a.dur * 0.35);
          tl.fromTo(a.sel, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'none', immediateRender: false }, a.at + a.dur - 0.2);
        },
        confetti: (a) => tl.fromTo(a.sel, { y: -80, x: 0, rotation: 0 }, { y: 2060, x: a.drift, rotation: a.rot, duration: a.dur, ease: 'none' }, a.at),
        burstPiece(a) {
          tl.fromTo(a.sel, { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: a.dx, y: a.dy, rotation: a.rot, opacity: 1, duration: 0.6, ease: 'power3.out' }, a.at);
          tl.to(a.sel, { y: a.dy + 520, opacity: 0, duration: 1.1, ease: 'power1.in' }, a.at + 0.6);
        },
        glowBg(a) {
          tl.fromTo(a.sel, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: IN }, a.at);
          const n = Math.max(0, Math.floor((a.end - a.at - 0.8) / 1.1) - 1);
          tl.fromTo(a.sel, { scale: 1 }, { scale: 1.06, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: n, immediateRender: false }, a.at + 0.8);
        },
        // Sorteo: el ticket entra girando y luego se arranca por la línea punteada.
        ticket: (a) => tl.fromTo(a.sel, { rotation: -12, scale: 0.7, y: 30, opacity: 0 }, { rotation: -2, scale: 1, y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.6)' }, a.at),
        tear: (a) => tl.fromTo(a.sel, { rotation: 0, x: 0, y: 0, opacity: 1 }, { rotation: -32, x: -70, y: 260, opacity: 0, duration: 0.8, ease: 'power2.in', transformOrigin: '100% 0%' }, a.at),
        // Cierre: sellos de goma, número por grupos y onda.
        stamp(a) {
          tl.fromTo(a.sel, { scale: 1.4, rotation: -22, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.22, ease: 'power3.in' }, a.at);
          tl.to(a.sel, { x: 6, duration: 0.04, ease: 'none' }, a.at + 0.22);
          tl.to(a.sel, { x: -5, duration: 0.04, ease: 'none' }, a.at + 0.26);
          tl.to(a.sel, { x: 0, duration: 0.04, ease: 'none' }, a.at + 0.3);
        },
        button: (a) => tl.fromTo(a.sel, { scale: 0.6, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, a.at),
        group: (a) => tl.fromTo(a.sel, { y: 30, scale: 0.6, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)' }, a.at),
        ring: (a) => tl.fromTo(a.sel, { scale: 1, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out' }, a.at),
        pulse(a) {
          const n = Math.max(0, Math.floor((a.end - a.at) / BEAT) - 1);
          tl.fromTo(a.sel, { scale: 1 }, { scale: 1.04, duration: BEAT, ease: 'sine.inOut', yoyo: true, repeat: n }, a.at);
        },
        // Ola: una franja de líquido cruza la pantalla de abajo arriba; el corte ocurre cuando pasa por el centro.
        wave: (a) => tl.fromTo(a.sel, { y: 1920, x: 0 }, { y: -760, x: -540, duration: a.dur, ease: 'none' }, a.at),
        // Grano: el patrón cambia de posición cada 2 frames.
        grain(a) {
          const steps = Math.round((a.end - a.at) * 15);
          tl.fromTo(a.sel, { backgroundPosition: '0px 0px' }, { backgroundPosition: `${steps * 97}px ${steps * 61}px`, duration: a.end - a.at, ease: `steps(${steps})` }, a.at);
        },
      };

      for (const a of ANIM) {
        if (!H[a.k]) throw new Error('animación desconocida: ' + a.k);
        H[a.k](a);
      }

      window.__timelines['main'] = tl;
