      // ── Variante tienda (solo se inserta con --store) ──
      Object.assign(H, {
        // Gancho: el título se ve completo desde el frame 0; la energía la dan el destello (detrás del texto),
        // un punch de escala 1.08 → 1 y un temblor leve cuando la voz dice "Este".
        flashIn: (a) => tl.fromTo(a.sel, { opacity: 0.85 }, { opacity: 0, duration: 0.45, ease: 'power2.out' }, a.at),
        impact(a) {
          tl.fromTo(a.sel, { scale: 1.08 }, { scale: 1, duration: a.dur, ease: 'power2.out' }, a.at);
          tl.to(a.sel, { x: 12, y: -6, duration: F, ease: 'none' }, a.land);
          tl.to(a.sel, { x: -9, y: 5, duration: F, ease: 'none' }, a.land + F);
          tl.to(a.sel, { x: 5, y: -2, duration: F, ease: 'none' }, a.land + 2 * F);
          tl.to(a.sel, { x: 0, y: 0, duration: F, ease: 'none' }, a.land + 3 * F);
        },
        // La pill del gancho se encoge y vuela al lugar del sticker.
        toSticker: (a) => tl.to(a.sel, { y: a.dy, x: a.dx || 0, scale: a.scale, duration: a.dur, ease: 'power3.inOut' }, a.at),
        // Sticker fijo: "respira" (1 → 1.04) en ciclos de 2 s.
        breathe(a) {
          const n = Math.max(0, Math.floor((a.end - a.at) / 1) - 1);
          tl.fromTo(a.sel, { scale: 1 }, { scale: 1.04, duration: 1, ease: 'sine.inOut', yoyo: true, repeat: n }, a.at);
        },
        // Degustación: la hoja del calendario cae y rebota; palabras que laten con la voz.
        calFall: (a) => tl.fromTo(a.sel, { y: -1150, rotation: -14 }, { y: 0, rotation: -3, duration: 0.9, ease: 'bounce.out' }, a.at),
        bump(a) {
          tl.to(a.sel, { scale: 1.14, duration: 0.14, ease: 'power2.out' }, a.at);
          tl.to(a.sel, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, a.at + 0.14);
        },
        fromBelow: (a) => tl.fromTo(a.sel, { y: 520 }, { y: 0, duration: 0.75, ease: 'back.out(1.2)', stagger: a.stagger || 0 }, a.at),
        // Chin-chin: se inclinan desde la base hasta tocarse y vuelven.
        chin(a) {
          tl.fromTo(a.sel, { rotation: 0, transformOrigin: '50% 100%' }, { rotation: a.rot, duration: 0.28, ease: 'power2.in' }, a.at);
          tl.to(a.sel, { rotation: -a.rot * 0.15, duration: 0.3, ease: 'power2.out' }, a.at + 0.28);
          tl.to(a.sel, { rotation: 0, duration: 0.3, ease: 'sine.inOut' }, a.at + 0.58);
        },
        // Cierre: hojas con pop desde abajo; raíces que crecen de arriba hacia abajo (máscara con borde suave).
        sprout: (a) => tl.fromTo(a.sel, { scale: 0.6, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, a.at),
        // la máscara (en tiendas.css) lee --x: borde opaco en X % y transparente en X + 12 %
        rootsGrow: (a) => tl.fromTo(a.sel, { '--x': '-12%', scaleY: 0.92, transformOrigin: '50% 0%' }, { '--x': '100%', scaleY: 1, duration: a.dur, ease: 'power2.out' }, a.at),
        // Póster de cierre: líneas que se dibujan, nombre que sube, datos línea por línea, sello y productos.
        tighten: (a) => tl.fromTo(a.sel, { letterSpacing: '14px', marginRight: '-14px' }, { letterSpacing: '8px', marginRight: '-8px', duration: 0.6, ease: IN }, a.at),
        draw: (a) => tl.fromTo(a.sel, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: a.dur, ease: 'power2.inOut' }, a.at),
        riseIn: (a) => tl.fromTo(a.sel, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: IN }, a.at),
        lineIn: (a) => tl.fromTo(a.sel, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: IN, stagger: a.stagger }, a.at),
        sealDrop: (a) => tl.fromTo(a.sel, { scale: 1.6, rotation: -40, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.6, ease: 'back.out(2.2)' }, a.at),
        riseUp: (a) => tl.fromTo(a.sel, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' }, a.at),
        landBounce(a) {
          tl.fromTo(a.sel, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power2.in' }, a.at);
          tl.to(a.sel, { y: -14, duration: 0.14, ease: 'power2.out' }, a.at + 0.42);
          tl.to(a.sel, { y: 0, duration: 0.3, ease: 'bounce.out' }, a.at + 0.56);
        },
        pinBounce(a) {
          tl.to(a.sel, { y: -22, duration: 0.18, ease: 'power2.out' }, a.at);
          tl.to(a.sel, { y: 0, duration: 0.42, ease: 'bounce.out' }, a.at + 0.18);
        },
      });
